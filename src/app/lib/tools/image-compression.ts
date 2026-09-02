/**
 * Image compression core.
 *
 * - Prefers a pool of Web Workers (OffscreenCanvas) so compressing several
 *   large images never janks the UI thread or blocks slider input.
 * - Falls back to an in-page <canvas> automatically on browsers/environments
 *   where OffscreenCanvas isn't available (e.g. older Safari).
 * - Pool size is capped at `navigator.hardwareConcurrency`, so we don't
 *   spin up more OS threads than the device actually has cores for.
 */

export type OutputFormat = 'auto' | 'jpeg' | 'webp' | 'png' | 'bmp' | 'avif';

export interface CompressionResult {
    blob: Blob;
    width: number;
    height: number;
    mimeType: string;
}

export interface CompressOptions {
    /** 1–100, matches the UI's "compression level" slider. */
    quality: number;
    format: OutputFormat;
    /** Best-effort hint used only by 'auto' format selection. */
    hasAlpha?: boolean;
}

function resolveMimeType(file: File, format: OutputFormat, hasAlpha: boolean): string {
    if (format === 'jpeg') return 'image/jpeg';
    if (format === 'webp') return 'image/webp';
    if (format === 'png') return 'image/png';
    if (format === 'bmp') return 'image/bmp';
    if (format === 'avif') return 'image/avif';

    // auto: keep transparency alive via WebP, otherwise JPEG gives the best
    // size/quality ratio for photographic content.
    if (file.type === 'image/png' && hasAlpha) return 'image/webp';
    if (file.type === 'image/gif' || file.type === 'image/svg+xml') return file.type;
    return 'image/jpeg';
}

/** Cheap heuristic: sample the corners/center of a PNG for any translucent pixel. */
export async function detectAlpha(file: File): Promise<boolean> {
    if (file.type !== 'image/png') return false;
    try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        const size = 32; // downsample — we only need a yes/no signal, not precision
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return true; // assume alpha if we can't check; safer default
        ctx.drawImage(bitmap, 0, 0, size, size);
        bitmap.close();
        const { data } = ctx.getImageData(0, 0, size, size);
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 255) return true;
        }
        return false;
    } catch {
        return true;
    }
}

// ---------- main-thread fallback ----------

async function compressOnMainThread(
    file: File,
    mimeType: string,
    quality: number
): Promise<CompressionResult> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Encoding failed'))),
            mimeType,
            quality
        );
    });

    return { blob, width: canvas.width, height: canvas.height, mimeType };
}

// ---------- worker pool ----------

interface PendingJob {
    resolve: (r: CompressionResult) => void;
    reject: (e: Error) => void;
    file: File;
    mimeType: string;
    quality: number;
}

class CompressionPool {
    private workers: Worker[] = [];
    private nextWorker = 0;
    private pending = new Map<number, PendingJob>();
    private jobId = 0;
    private supported = true;

    private ensureWorkers() {
        if (this.workers.length > 0 || typeof window === 'undefined') return;
        if (!('Worker' in window)) {
            this.supported = false;
            return;
        }
        const concurrency = Math.max(1, Math.min(navigator.hardwareConcurrency || 2, 4));
        for (let i = 0; i < concurrency; i++) {
            const worker = new Worker('/worker/compression-worker.js');
            worker.onmessage = (e) => this.handleMessage(e.data);
            this.workers.push(worker);
        }
    }

    private handleMessage(data: any) {
        const job = this.pending.get(data.id);
        if (!job) return;
        this.pending.delete(data.id);

        if (data.unsupported) {
            this.supported = false;
            compressOnMainThread(job.file, job.mimeType, job.quality)
                .then(job.resolve)
                .catch(job.reject);
            return;
        }
        if (!data.ok) {
            job.reject(new Error(data.error || 'Compression failed'));
            return;
        }
        job.resolve({
            blob: data.blob,
            width: data.width,
            height: data.height,
            mimeType: job.mimeType,
        });
    }

    async compress(file: File, mimeType: string, quality: number): Promise<CompressionResult> {
        this.ensureWorkers();

        if (!this.supported || this.workers.length === 0) {
            return compressOnMainThread(file, mimeType, quality);
        }

        const id = this.jobId++;
        const worker = this.workers[this.nextWorker];
        this.nextWorker = (this.nextWorker + 1) % this.workers.length;

        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject, file, mimeType, quality });
            worker.postMessage({ id, file, quality, mimeType });
        });
    }

    terminate() {
        this.workers.forEach((w) => w.terminate());
        this.workers = [];
        this.pending.clear();
    }
}

// Singleton — reused across every compress() call in the app so we don't pay
// worker spin-up cost per image or per slider tick.
let pool: CompressionPool | null = null;
function getPool(): CompressionPool {
    if (!pool) pool = new CompressionPool();
    return pool;
}

export async function compressImage(
    file: File,
    options: CompressOptions
): Promise<CompressionResult> {
    const mimeType = resolveMimeType(file, options.format, options.hasAlpha ?? false);
    const quality = Math.min(1, Math.max(0.01, options.quality / 100));

    // SVGs and GIFs: re-encoding via canvas either loses animation or gains
    // nothing (SVG is already text/vector), so pass them through untouched.
    if (mimeType === 'image/gif' || mimeType === 'image/svg+xml') {
        return { blob: file, width: 0, height: 0, mimeType: file.type };
    }

    return getPool().compress(file, mimeType, quality);
}

export function terminateCompressionPool() {
    pool?.terminate();
    pool = null;
}

export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}