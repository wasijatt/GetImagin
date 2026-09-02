'use client';
import Image from 'next/image';
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    memo,
    type ChangeEvent,
    type DragEvent,
} from 'react';
import {
    compressImage,
    detectAlpha,
    formatBytes,
    terminateCompressionPool,
    type OutputFormat,
} from '../../lib/tools/image-compression';
import BeforeAfterModal from './BeforeAfterModal';

interface QueuedImage {
    id: string;
    file: File;
    previewUrl: string;
    originalSize: number;
    hasAlpha: boolean;
}

interface CompressedState {
    url: string;
    size: number;
    mimeType: string;
    status: 'pending' | 'done' | 'error';
}

const EXT_BY_MIME: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
};

function swapExtension(name: string, mimeType: string): string {
    const ext = EXT_BY_MIME[mimeType] ?? 'jpg';
    const base = name.replace(/\.[^./\\]+$/, '');
    return `${base}-compressed.${ext}`;
}

/** Debounces the slider so we don't re-run compression on every pixel of drag. */
function useDebouncedValue<T>(value: T, delayMs: number): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(t);
    }, [value, delayMs]);
    return debounced;
}

const FORMAT_OPTIONS: { id: OutputFormat; label: string }[] = [
    { id: 'auto', label: 'Auto (Recommended)' },
    { id: 'jpeg', label: 'JPEG' },
    { id: 'webp', label: 'WebP' },
    { id: 'png', label: 'PNG' },
];

export function ImageCompressor() {
    const [images, setImages] = useState<QueuedImage[]>([]);
    const [results, setResults] = useState<Record<string, CompressedState>>({});
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState<OutputFormat>('auto');
    const [isDragging, setIsDragging] = useState(false);
    const [zipping, setZipping] = useState(false);
    const [zipError, setZipError] = useState<string | null>(null);

    const debouncedQuality = useDebouncedValue(quality, 200);
    const [previewItem, setPreviewItem] = useState<{ image: QueuedImage; result: CompressedState } | null>(null);
    const generationRef = useRef(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cleanup worker pool & Blob URLs on unmount
    useEffect(() => {
        return () => {
            terminateCompressionPool();
            images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
            Object.values(results).forEach((r) => r.url && URL.revokeObjectURL(r.url));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addFiles = useCallback(async (fileList: FileList | File[]) => {
        const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
        if (incoming.length === 0) return;

        const prepared: QueuedImage[] = await Promise.all(
            incoming.map(async (file) => ({
                id: `${file.name}-${file.size}-${Math.random().toString(36).substring(2, 9)}`,
                file,
                previewUrl: URL.createObjectURL(file),
                originalSize: file.size,
                hasAlpha: await detectAlpha(file),
            }))
        );

        setImages((prev) => [...prev, ...prepared]);
    }, []);

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) addFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
    };

    const removeImage = (id: string) => {
        setImages((prev) => {
            const target = prev.find((i) => i.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((i) => i.id !== id);
        });
        setResults((prev) => {
            const next = { ...prev };
            if (next[id]?.url) URL.revokeObjectURL(next[id].url);
            delete next[id];
            return next;
        });
    };

    const clearAll = useCallback(() => {
        images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        Object.values(results).forEach((r) => {
            if (r.url) URL.revokeObjectURL(r.url);
        });
        setImages([]);
        setResults({});
    }, [images, results]);

    // Re-run compression whenever the image set, quality, or format changes.
    useEffect(() => {
        if (images.length === 0) return;
        const generation = ++generationRef.current;

        setResults((prev) => {
            const next = { ...prev };
            images.forEach((img) => {
                next[img.id] = { ...(next[img.id] ?? { url: '', size: 0, mimeType: '' }), status: 'pending' };
            });
            return next;
        });

        images.forEach(async (img) => {
            try {
                const result = await compressImage(img.file, {
                    quality: debouncedQuality,
                    format,
                    hasAlpha: img.hasAlpha,
                });
                if (generationRef.current !== generation) return;

                setResults((prev) => {
                    if (prev[img.id]?.url) URL.revokeObjectURL(prev[img.id].url);
                    return {
                        ...prev,
                        [img.id]: {
                            url: URL.createObjectURL(result.blob),
                            size: result.blob.size,
                            mimeType: result.mimeType,
                            status: 'done',
                        },
                    };
                });
            } catch {
                if (generationRef.current !== generation) return;
                setResults((prev) => ({
                    ...prev,
                    [img.id]: { url: '', size: 0, mimeType: '', status: 'error' },
                }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, debouncedQuality, format]);

    const totals = useMemo(() => {
        const originalTotal = images.reduce((sum, i) => sum + i.originalSize, 0);
        const compressedTotal = images.reduce((sum, i) => sum + (results[i.id]?.size ?? 0), 0);
        const anyDone = images.some((i) => results[i.id]?.status === 'done');
        return { originalTotal, compressedTotal, anyDone };
    }, [images, results]);

    const handleDownloadAll = async () => {
        setZipError(null);
        setZipping(true);
        try {
            const { default: JSZip } = await import('jszip');
            const zip = new JSZip();
            await Promise.all(
                images.map(async (img) => {
                    const result = results[img.id];
                    if (!result || result.status !== 'done') return;
                    const blob = await fetch(result.url).then((r) => r.blob());
                    zip.file(swapExtension(img.file.name, result.mimeType), blob);
                })
            );
            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed-images.zip';
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            // Fallback download one by one if jszip is not present
            images.forEach((img) => {
                const res = results[img.id];
                if (res?.status === 'done' && res.url) {
                    const a = document.createElement('a');
                    a.href = res.url;
                    a.download = swapExtension(img.file.name, res.mimeType);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            });
        } finally {
            setZipping(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Dropzone */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                        ? 'border-[#24CFA6] bg-[#24CFA6]/10 scale-[1.01]'
                        : 'border-[#24CFA6]/30 bg-black/40 hover:border-[#24CFA6]/60 hover:bg-[#24CFA6]/5'
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                />

                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#24CFA6]/10 flex items-center justify-center border border-[#24CFA6]/30">
                        <svg
                            className="w-8 h-8 text-[#24CFA6]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white">
                            Drop images here or <span className="text-[#24CFA6]">browse</span>
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Supports JPEG, PNG, WebP, GIF
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            {images.length > 0 && (
                <div className="bg-black/60 border border-[#24CFA6]/20 rounded-2xl p-6 backdrop-blur-md space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Output Format */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Output Format</label>
                            <div className="flex flex-wrap gap-2">
                                {FORMAT_OPTIONS.map((fmt) => (
                                    <button
                                        key={fmt.id}
                                        onClick={() => setFormat(fmt.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                            format === fmt.id
                                                ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.4)]'
                                                : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                                        }`}
                                    >
                                        {fmt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Compression Quality Slider */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <label className="font-medium text-gray-300">Compression Quality</label>
                                <span className="text-[#24CFA6] font-semibold">{quality}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-[#24CFA6] cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Summary & Global Actions */}
                    <div className="flex flex-wrap justify-between items-center pt-4 border-t border-zinc-800 gap-4">
                        <div className="text-sm text-gray-400">
                            {totals.anyDone && (
                                <>
                                    Total Original: <span className="text-white font-medium">{formatBytes(totals.originalTotal)}</span>
                                    {' '}➔ Compressed: <span className="text-[#24CFA6] font-medium">{formatBytes(totals.compressedTotal)}</span>
                                    {' '}
                                    <span className="text-[#24CFA6] font-semibold">
                                        (-{Math.round((1 - totals.compressedTotal / totals.originalTotal) * 100)}%)
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={handleDownloadAll}
                                disabled={!totals.anyDone || zipping}
                                className="px-5 py-2 rounded-xl text-sm font-medium bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_15px_rgba(36,207,166,0.3)] transition-all flex items-center gap-2 disabled:opacity-40"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {zipping ? 'Zipping...' : 'Download All'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Images List */}
            {images.length > 0 && (
                <div className="space-y-3">
                    {images.map((img) => {
                        const res = results[img.id];
                        const reduction =
                            res?.status === 'done' ? Math.round((1 - res.size / img.originalSize) * 100) : null;

                        return (
                            <div
                                key={img.id}
                                className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-zinc-800 hover:border-[#24CFA6]/40 transition-all gap-4"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <img
                                        src={img.previewUrl}
                                        alt={img.file.name}
                                        className="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{img.file.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {formatBytes(img.originalSize)}
                                            {res?.status === 'done' && (
                                                <span className="text-[#24CFA6] ml-2">
                                                    ➔ {formatBytes(res.size)}{' '}
                                                    <span className="font-semibold">
                                                        ({reduction && reduction > 0 ? '-' : ''}{reduction}%)
                                                    </span>
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {res?.status === 'pending' && (
                                        <span className="text-xs text-[#24CFA6] animate-pulse">Compressing...</span>
                                    )}
                                    {res?.status === 'error' && (
                                        <span className="text-xs text-red-400">Compression failed</span>
                                    )}
                                    {res?.status === 'done' && (
                                        <>
                                            <button
                                                onClick={() => setPreviewItem({ image: img, result: res })}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-white border border-zinc-700 hover:border-[#24CFA6] hover:text-[#24CFA6] transition-all flex items-center gap-1.5"
                                            >
                                                <svg className="w-3.5 h-3.5 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Preview
                                            </button>
                                            <a
                                                href={res.url}
                                                download={swapExtension(img.file.name, res.mimeType)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 hover:bg-[#24CFA6] hover:text-black transition-all"
                                            >
                                                Download
                                            </a>
                                        </>
                                    )}

                                    <button
                                        onClick={() => removeImage(img.id)}
                                        className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Before / After Preview Modal */}
            <BeforeAfterModal
                isOpen={!!previewItem}
                onClose={() => setPreviewItem(null)}
                fileName={previewItem?.image.file.name || ''}
                originalUrl={previewItem?.image.previewUrl || ''}
                originalSize={previewItem?.image.originalSize || 0}
                processedUrl={previewItem?.result.url || ''}
                processedSize={previewItem?.result.size || 0}
                processedFormatLabel="Compressed"
            />
        </div>
    );
}

export default ImageCompressor;