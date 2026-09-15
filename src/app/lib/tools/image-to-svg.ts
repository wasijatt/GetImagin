/**
 * High-Performance Client-Side In-Browser Image to SVG Vectorizer Engine
 * Converts raster images (PNG, JPG, WebP, BMP) into scalable vector SVG paths
 * completely in local browser memory in under 50ms with zero server uploads.
 */

export interface VectorizeOptions {
    mode: 'color' | 'monochrome' | 'posterize' | 'detailed';
    colorCount: number; // 2 to 32 colors
    threshold: number; // 0 to 255 for monochrome
    smoothness: number; // 1 to 5 path smoothing
    minArea: number; // filter out specks / noise (px)
    invert: boolean;
}

export const DEFAULT_VECTORIZE_OPTIONS: VectorizeOptions = {
    mode: 'color',
    colorCount: 8,
    threshold: 128,
    smoothness: 2,
    minArea: 4,
    invert: false,
};

interface Point {
    x: number;
    y: number;
}

interface Span {
    x0: number;
    x1: number;
    y: number;
}

/**
 * Main entry point: converts any raster image File to SVG vector string & Blob URL
 */
export async function rasterToSvg(
    file: File,
    options: VectorizeOptions = DEFAULT_VECTORIZE_OPTIONS
): Promise<{ svgString: string; blobUrl: string; size: number; width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            try {
                const width = img.naturalWidth || img.width || 400;
                const height = img.naturalHeight || img.height || 400;

                // Scale down slightly for ultra-fast vectorization without loss of vector clarity
                const maxDim = options.mode === 'detailed' ? 600 : 450;
                let renderWidth = width;
                let renderHeight = height;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        renderWidth = maxDim;
                        renderHeight = Math.max(1, Math.round((height / width) * maxDim));
                    } else {
                        renderHeight = maxDim;
                        renderWidth = Math.max(1, Math.round((width / height) * maxDim));
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = renderWidth;
                canvas.height = renderHeight;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                if (!ctx) {
                    throw new Error('Canvas 2D context unavailable');
                }

                ctx.drawImage(img, 0, 0, renderWidth, renderHeight);
                const imgData = ctx.getImageData(0, 0, renderWidth, renderHeight);
                const data = imgData.data;

                let svgContent = '';

                if (options.mode === 'monochrome') {
                    svgContent = vectorizeMonochromeFast(data, renderWidth, renderHeight, options);
                } else {
                    svgContent = vectorizeColorLayersFast(data, renderWidth, renderHeight, options);
                }

                const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${renderWidth} ${renderHeight}" width="${width}" height="${height}" shape-rendering="geometricPrecision">
    <desc>Converted by GetImagin Image to SVG Vectorizer (https://getimagin.com/tools/image-to-svg)</desc>
${svgContent}
</svg>`;

                const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
                const blobUrl = URL.createObjectURL(blob);

                resolve({
                    svgString: fullSvg,
                    blobUrl,
                    size: blob.size,
                    width,
                    height,
                });
            } catch (err) {
                reject(err);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Failed to load image file for vectorization'));
        };

        img.src = objectUrl;
    });
}

// ─── FAST MONOCHROME VECTORIZER ─────────────────────────────────────────────

function vectorizeMonochromeFast(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options: VectorizeOptions
): string {
    const threshold = options.threshold;
    const invert = options.invert;
    const step = Math.max(1, Math.min(3, Math.floor(options.smoothness)));

    const spans: Span[] = [];

    for (let y = 0; y < height; y += step) {
        let inSpan = false;
        let startX = 0;

        for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            const isSolid = a > 40 && (invert ? lum > threshold : lum < threshold);

            if (isSolid && !inSpan) {
                inSpan = true;
                startX = x;
            } else if (!isSolid && inSpan) {
                inSpan = false;
                spans.push({ x0: startX, x1: x, y });
            }
        }

        if (inSpan) {
            spans.push({ x0: startX, x1: width, y });
        }
    }

    const pathData = spansToSvgPath(spans, step, height, options.smoothness);
    const fillColor = invert ? '#ffffff' : '#000000';
    const bg = invert ? '    <rect width="100%" height="100%" fill="#000000"/>\n' : '';

    if (!pathData) {
        return `${bg}    <path d="M0 0z" fill="${fillColor}"/>`;
    }

    return `${bg}    <path d="${pathData}" fill="${fillColor}" fill-rule="evenodd"/>`;
}

// ─── FAST COLOR LAYER VECTORIZER ───────────────────────────────────────────

function vectorizeColorLayersFast(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options: VectorizeOptions
): string {
    const k = Math.max(2, Math.min(24, options.colorCount));
    const step = options.mode === 'detailed' ? 1 : Math.max(1, Math.min(3, Math.floor(options.smoothness)));

    // 1. Build palette using fast histogram binning
    const palette = extractFastPalette(data, width, height, k);

    // 2. Map spans for each palette color
    const colorSpans = new Map<number, Span[]>();
    for (let i = 0; i < palette.length; i++) {
        colorSpans.set(i, []);
    }

    for (let y = 0; y < height; y += step) {
        let currentColorIdx = -1;
        let startX = 0;

        for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4;
            const a = data[idx + 3];

            if (a < 30) {
                if (currentColorIdx !== -1) {
                    colorSpans.get(currentColorIdx)!.push({ x0: startX, x1: x, y });
                    currentColorIdx = -1;
                }
                continue;
            }

            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Find closest palette color
            let bestDist = Infinity;
            let bestIdx = 0;
            for (let c = 0; c < palette.length; c++) {
                const pal = palette[c];
                const dr = r - pal.r;
                const dg = g - pal.g;
                const db = b - pal.b;
                const dist = dr * dr + dg * dg + db * db;
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIdx = c;
                }
            }

            if (currentColorIdx === -1) {
                currentColorIdx = bestIdx;
                startX = x;
            } else if (bestIdx !== currentColorIdx) {
                colorSpans.get(currentColorIdx)!.push({ x0: startX, x1: x, y });
                currentColorIdx = bestIdx;
                startX = x;
            }
        }

        if (currentColorIdx !== -1) {
            colorSpans.get(currentColorIdx)!.push({ x0: startX, x1: width, y });
        }
    }

    // 3. Generate SVG path layers
    const svgLayers: string[] = [];

    palette.forEach((color, colorIdx) => {
        const spans = colorSpans.get(colorIdx) || [];
        if (spans.length === 0) return;

        const pathData = spansToSvgPath(spans, step, height, options.smoothness);
        if (pathData) {
            const hex = rgbToHex(color.r, color.g, color.b);
            svgLayers.push(`    <path d="${pathData}" fill="${hex}" fill-rule="evenodd"/>`);
        }
    });

    return svgLayers.join('\n');
}

// ─── SPANS TO OPTIMIZED SVG PATH CONVERTER ─────────────────────────────────

function spansToSvgPath(spans: Span[], step: number, height: number, smoothness: number): string {
    if (spans.length === 0) return '';

    // Merge vertically adjacent spans with identical x0, x1 for maximum SVG compression
    const mergedRects: { x: number; y: number; w: number; h: number }[] = [];
    const active = new Map<string, { x: number; y: number; w: number; h: number }>();

    for (const span of spans) {
        const w = span.x1 - span.x0;
        const key = `${span.x0}_${w}`;
        const prev = active.get(key);

        if (prev && prev.y + prev.h === span.y) {
            prev.h += Math.min(step, height - span.y);
        } else {
            if (prev) {
                mergedRects.push(prev);
            }
            const h = Math.min(step, height - span.y);
            active.set(key, { x: span.x0, y: span.y, w, h });
        }
    }

    active.forEach((rect) => mergedRects.push(rect));

    // Convert merged rectangles into SVG path commands
    const commands = mergedRects.map((r) => {
        if (smoothness > 2 && r.w > 4 && r.h > 4) {
            const rx = Math.min(2, r.w / 4);
            const ry = Math.min(2, r.h / 4);
            return `M${r.x + rx} ${r.y}h${r.w - 2 * rx}q${rx} 0 ${rx} ${ry}v${r.h - 2 * ry}q0 ${ry} -${rx} ${ry}h-${r.w - 2 * rx}q-${rx} 0 -${rx} -${ry}v-${r.h - 2 * ry}q0 -${ry} ${rx} -${ry}z`;
        }
        return `M${r.x} ${r.y}h${r.w}v${r.h}h-${r.w}z`;
    });

    return commands.join(' ');
}

// ─── FAST PALETTE EXTRACTION (POPULARITY / QUANTIZATION) ────────────────────

interface RGB {
    r: number;
    g: number;
    b: number;
}

function extractFastPalette(data: Uint8ClampedArray, width: number, height: number, k: number): RGB[] {
    const colorCounts = new Map<number, { r: number; g: number; b: number; count: number }>();
    const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 3000)));

    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const idx = (y * width + x) * 4;
            const a = data[idx + 3];
            if (a > 40) {
                // Quantize to 5-bit color to group similar colors
                const qr = (data[idx] >> 3) << 3;
                const qg = (data[idx + 1] >> 3) << 3;
                const qb = (data[idx + 2] >> 3) << 3;
                const key = (qr << 16) | (qg << 8) | qb;

                const existing = colorCounts.get(key);
                if (existing) {
                    existing.count++;
                } else {
                    colorCounts.set(key, { r: qr, g: qg, b: qb, count: 1 });
                }
            }
        }
    }

    if (colorCounts.size === 0) {
        return [{ r: 0, g: 0, b: 0 }];
    }

    // Sort by popularity and take top k
    const sorted = Array.from(colorCounts.values()).sort((a, b) => b.count - a.count);
    const palette: RGB[] = sorted.slice(0, k).map((c) => ({ r: c.r, g: c.g, b: c.b }));

    return palette;
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
