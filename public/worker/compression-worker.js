// Runs in its own thread so compressing large/many images never blocks the UI.
// Loaded via `new Worker('/workers/compression-worker.js')` — must live in /public
// because it needs a stable static URL regardless of the bundler in use.

self.onmessage = async (event) => {
    const { id, file, quality, mimeType } = event.data;

    try {
        if (typeof OffscreenCanvas === 'undefined' || typeof createImageBitmap === 'undefined') {
            // Let the main thread know it must fall back to a <canvas>-based path.
            self.postMessage({ id, ok: false, unsupported: true });
            return;
        }

        const bitmap = await createImageBitmap(file);
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            self.postMessage({ id, ok: false, unsupported: true });
            return;
        }

        // Flatten transparency onto white when encoding to a format with no alpha
        // channel (JPEG), so we don't end up with black backgrounds.
        if (mimeType === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        const blob = await canvas.convertToBlob({ type: mimeType, quality });

        self.postMessage({
            id,
            ok: true,
            blob,
            width: canvas.width,
            height: canvas.height,
        });
    } catch (err) {
        self.postMessage({ id, ok: false, error: err instanceof Error ? err.message : String(err) });
    }
};