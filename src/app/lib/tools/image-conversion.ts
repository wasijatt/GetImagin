/**
 * Image Format Converter — conversion logic.
 *
 * Independent from the compressor tool: imports only the shared worker pool,
 * not any compressor-specific code. Drop this file in on its own if the
 * converter is the only one of the two tools you're adding.
 */

import { compressImage, terminateCompressionPool, formatBytes, type CompressionResult, type OutputFormat } from './image-compression';

export type EncodeResult = CompressionResult;
export { terminateCompressionPool, formatBytes };

export interface FormatOption {
    id: string;
    label: string;
    mimeType: string;
    extension: string;
    supportsQuality: boolean;
}

/** Formats every evergreen browser can produce: WebP/JPEG/PNG via <canvas>, BMP via our own encoder. */
export const BASE_FORMATS: FormatOption[] = [
    { id: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg', extension: 'jpg', supportsQuality: true },
    { id: 'png', label: 'PNG', mimeType: 'image/png', extension: 'png', supportsQuality: false },
    { id: 'webp', label: 'WebP', mimeType: 'image/webp', extension: 'webp', supportsQuality: true },
    { id: 'bmp', label: 'BMP', mimeType: 'image/bmp', extension: 'bmp', supportsQuality: false },
];

/** Only offer this if the visitor's browser can actually encode it — see detectAvifSupport(). */
export const CONDITIONAL_FORMATS: FormatOption[] = [
    { id: 'avif', label: 'AVIF', mimeType: 'image/avif', extension: 'avif', supportsQuality: true },
];

let avifSupportPromise: Promise<boolean> | null = null;

/** AVIF encode support is inconsistent across browsers, so we check once instead of assuming. */
export function detectAvifSupport(): Promise<boolean> {
    if (typeof document === 'undefined') return Promise.resolve(false);
    if (!avifSupportPromise) {
        avifSupportPromise = new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            canvas.toBlob((blob) => resolve(!!blob && blob.type === 'image/avif'), 'image/avif', 0.5);
        });
    }
    return avifSupportPromise;
}

/** Converts one file to one target format. Quality is 1–100 and ignored for lossless formats. */
export async function convertToFormat(
    file: File,
    target: FormatOption,
    quality: number
): Promise<EncodeResult> {
    return compressImage(file, {
        quality,
        format: target.id as OutputFormat,
    });
}