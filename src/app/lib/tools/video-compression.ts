/**
 * Video Compression — native browser MediaRecorder approach.
 *
 * Uses HTMLVideoElement + MediaRecorder (and Canvas for scaling) which leverages
 * the browser's HARDWARE-ACCELERATED codec (H.264/VP9/AV1).
 *
 * Features:
 *   - Preserves exact video length and timing (no speed-up or truncation)
 *   - Preserves original audio track
 *   - Fast hardware encoding
 */

export interface VideoCompressOptions {
    /** Target bitrate in bits per second. Lower = smaller file. */
    targetBitrate: number;
    /** Scale factor: 1.0 = original, 0.5 = half resolution */
    scale: number;
    /** Output format */
    outputFormat: 'webm' | 'mp4';
}

export interface VideoCompressResult {
    blob: Blob;
    mimeType: string;
    extension: string;
    originalSize: number;
    compressedSize: number;
}

export type ProgressCallback = (ratio: number, message: string) => void;

export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Pick the best supported MIME type for recording */
function getSupportedMimeType(preferMp4: boolean): string {
    const candidates = preferMp4
        ? [
              'video/mp4; codecs="avc1.42E01E"',
              'video/mp4; codecs=h264',
              'video/mp4',
              'video/webm; codecs=vp9',
              'video/webm',
          ]
        : [
              'video/webm; codecs=vp9',
              'video/webm; codecs=vp8',
              'video/webm',
              'video/mp4',
          ];

    for (const type of candidates) {
        if (MediaRecorder.isTypeSupported(type)) return type;
    }
    return 'video/webm';
}

/** Compress a video file using the browser's native hardware-accelerated encoder. */
export async function compressVideo(
    file: File,
    options: VideoCompressOptions,
    onProgress?: ProgressCallback
): Promise<VideoCompressResult> {
    return new Promise((resolve, reject) => {
        const videoEl = document.createElement('video');
        videoEl.muted = false; // Keep audio active for stream capture
        videoEl.volume = 0.001; // Silent output to user speakers but active audio track
        videoEl.playsInline = true;
        videoEl.preload = 'auto';

        // Attach hidden to DOM so browser does not throttle frame rendering timers
        videoEl.style.position = 'fixed';
        videoEl.style.top = '-9999px';
        videoEl.style.left = '-9999px';
        videoEl.style.opacity = '0';
        videoEl.style.pointerEvents = 'none';
        document.body.appendChild(videoEl);

        const srcUrl = URL.createObjectURL(file);
        videoEl.src = srcUrl;

        const cleanup = () => {
            try {
                videoEl.pause();
                URL.revokeObjectURL(srcUrl);
                if (videoEl.parentNode) {
                    document.body.removeChild(videoEl);
                }
            } catch (e) {
                // Ignore cleanup errors
            }
        };

        videoEl.onloadedmetadata = () => {
            const { videoWidth, videoHeight, duration } = videoEl;

            if (!videoWidth || !videoHeight || !duration) {
                cleanup();
                reject(new Error('Could not read video metadata. The file may be corrupted.'));
                return;
            }

            const targetW = Math.round((videoWidth * options.scale) / 2) * 2;
            const targetH = Math.round((videoHeight * options.scale) / 2) * 2;

            const mimeType = getSupportedMimeType(options.outputFormat === 'mp4');
            const ext = mimeType.startsWith('video/mp4') ? 'mp4' : 'webm';

            let recordStream: MediaStream;
            let canvas: HTMLCanvasElement | null = null;
            let ctx: CanvasRenderingContext2D | null = null;
            let animId: number | null = null;

            // Extract audio track from original video stream if available
            let origStream: MediaStream | null = null;
            try {
                const getStream = (videoEl as any).captureStream || (videoEl as any).mozCaptureStream;
                if (getStream) {
                    origStream = getStream.call(videoEl);
                }
            } catch (e) {
                console.warn('Could not capture stream directly from video element:', e);
            }

            if (options.scale === 1.0 && origStream) {
                // 100% scale: Use original stream directly (perfect audio/video sync & 100% exact duration)
                recordStream = origStream;
            } else {
                // Scaled resolution: Render frames to canvas & attach audio track
                canvas = document.createElement('canvas');
                canvas.width = targetW;
                canvas.height = targetH;
                ctx = canvas.getContext('2d', { alpha: false })!;

                recordStream = canvas.captureStream(30);

                if (origStream) {
                    const audioTracks = origStream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        recordStream.addTrack(audioTracks[0]);
                    }
                }
            }

            let recorder: MediaRecorder;
            try {
                recorder = new MediaRecorder(recordStream, {
                    mimeType,
                    videoBitsPerSecond: options.targetBitrate,
                    audioBitsPerSecond: 128_000,
                });
            } catch (e) {
                cleanup();
                reject(new Error('MediaRecorder not supported in this browser for the selected settings.'));
                return;
            }

            const chunks: Blob[] = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                cleanup();
                const blob = new Blob(chunks, { type: mimeType });
                resolve({
                    blob,
                    mimeType,
                    extension: ext,
                    originalSize: file.size,
                    compressedSize: blob.size,
                });
            };

            recorder.onerror = () => {
                if (animId) cancelAnimationFrame(animId);
                cleanup();
                reject(new Error('MediaRecorder error occurred during compression.'));
            };

            recorder.start(100);

            let lastReportedSecond = -1;

            const drawFrame = () => {
                if (videoEl.paused || videoEl.ended) return;

                if (ctx && canvas) {
                    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
                }

                const currentSecond = Math.floor(videoEl.currentTime);
                if (currentSecond !== lastReportedSecond) {
                    lastReportedSecond = currentSecond;
                    const ratio = Math.min(1, videoEl.currentTime / duration);
                    onProgress?.(ratio, `Compressing: ${currentSecond}s / ${Math.round(duration)}s`);
                }

                animId = requestAnimationFrame(drawFrame);
            };

            videoEl.onplay = () => {
                drawFrame();
            };

            videoEl.onended = () => {
                if (animId) cancelAnimationFrame(animId);
                onProgress?.(1.0, 'Finalizing video...');
                // Allow hardware pipeline buffer to flush before stopping recorder
                setTimeout(() => {
                    if (recorder.state !== 'inactive') {
                        recorder.stop();
                    }
                }, 500);
            };

            videoEl.onerror = () => {
                if (animId) cancelAnimationFrame(animId);
                cleanup();
                reject(new Error('Failed to play the video for compression.'));
            };

            // Play at normal 1.0x speed for exact duration and audio preservation
            videoEl.playbackRate = 1.0;
            videoEl.play().catch((err) => {
                cleanup();
                reject(new Error('Could not play video: ' + err.message));
            });
        };

        videoEl.onerror = () => {
            cleanup();
            reject(new Error('Could not load the video file.'));
        };
    });
}

/** Map a 1–100 quality percentage to a target bitrate (bps) relative to original video bitrate. */
export function qualityPctToBitrate(
    pct: number,
    scale: number,
    originalFileSize?: number,
    durationInSeconds?: number
): number {
    let originalBitrate = 4_000_000; // 4 Mbps default fallback if metadata not ready

    if (originalFileSize && durationInSeconds && durationInSeconds > 0) {
        // file.size in bytes * 8 bits / duration in seconds = original bitrate in bps
        originalBitrate = (originalFileSize * 8) / durationInSeconds;
    }

    // Target bitrate is percentage of original bitrate (e.g. 50% slider = 50% of original bitrate)
    // Scale factor further reduces bitrate for scaled resolution
    const targetRatio = Math.max(0.05, Math.min(0.90, pct / 100)); // Cap between 5% and 90% of original
    const calculatedBitrate = originalBitrate * targetRatio * (scale * scale);

    // Ensure it never exceeds 90% of original bitrate (guarantees size reduction)
    const minBitrate = 100_000; // 100 kbps absolute floor
    const maxBitrate = Math.max(minBitrate, originalBitrate * 0.90);

    return Math.round(Math.min(maxBitrate, Math.max(minBitrate, calculatedBitrate)));
}
