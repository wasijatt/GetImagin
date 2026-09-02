'use client';

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
    BASE_FORMATS,
    CONDITIONAL_FORMATS,
    convertToFormat,
    detectAvifSupport,
    formatBytes,
    terminateCompressionPool,
    type FormatOption,
    type EncodeResult,
} from '../../lib/tools/image-conversion';
import BeforeAfterModal from './BeforeAfterModal';

interface QueuedImage {
    id: string;
    file: File;
    previewUrl: string;
    originalSize: number;
}

interface ConvertedState {
    url: string;
    size: number;
    mimeType: string;
    extension: string;
    status: 'pending' | 'done' | 'error';
    error?: string;
}

function swapExtension(name: string, ext: string): string {
    const base = name.replace(/\.[^./\\]+$/, '');
    return `${base}-converted.${ext}`;
}

export function ImageConverter() {
    const [images, setImages] = useState<QueuedImage[]>([]);
    const [targetFormat, setTargetFormat] = useState<FormatOption>(BASE_FORMATS[0]); // JPEG default
    const [availableFormats, setAvailableFormats] = useState<FormatOption[]>(BASE_FORMATS);
    const [quality, setQuality] = useState<number>(85);
    const [converted, setConverted] = useState<Record<string, ConvertedState>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [previewItem, setPreviewItem] = useState<{ img: QueuedImage; c: ConvertedState } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Check for AVIF browser encoding support on mount
    useEffect(() => {
        detectAvifSupport().then((hasAvif) => {
            if (hasAvif) {
                setAvailableFormats([...BASE_FORMATS, ...CONDITIONAL_FORMATS]);
            }
        });
    }, []);

    // Cleanup worker pool & Blob URLs on unmount
    useEffect(() => {
        return () => {
            terminateCompressionPool();
        };
    }, []);

    const addFiles = useCallback((files: FileList | File[]) => {
        const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
        if (validFiles.length === 0) return;

        const newItems: QueuedImage[] = validFiles.map((file) => ({
            id: `${file.name}-${file.size}-${Math.random().toString(36).substring(2, 9)}`,
            file,
            previewUrl: URL.createObjectURL(file),
            originalSize: file.size,
        }));

        setImages((prev) => [...prev, ...newItems]);
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.length) {
                addFiles(e.dataTransfer.files);
            }
        },
        [addFiles]
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                addFiles(e.target.files);
                e.target.value = '';
            }
        },
        [addFiles]
    );

    const removeImage = useCallback((id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
        setConverted((prev) => {
            const copy = { ...prev };
            if (copy[id]?.url) URL.revokeObjectURL(copy[id].url);
            delete copy[id];
            return copy;
        });
    }, []);

    const clearAll = useCallback(() => {
        images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        Object.values(converted).forEach((c) => {
            if (c.url) URL.revokeObjectURL(c.url);
        });
        setImages([]);
        setConverted({});
    }, [images, converted]);

    // Process conversion for an image
    const processImage = useCallback(
        async (img: QueuedImage) => {
            setConverted((prev) => ({
                ...prev,
                [img.id]: {
                    url: '',
                    size: 0,
                    mimeType: targetFormat.mimeType,
                    extension: targetFormat.extension,
                    status: 'pending',
                },
            }));

            try {
                const res: EncodeResult = await convertToFormat(img.file, targetFormat, quality);
                const url = URL.createObjectURL(res.blob);

                setConverted((prev) => {
                    if (prev[img.id]?.url) URL.revokeObjectURL(prev[img.id].url);
                    return {
                        ...prev,
                        [img.id]: {
                            url,
                            size: res.blob.size,
                            mimeType: targetFormat.mimeType,
                            extension: targetFormat.extension,
                            status: 'done',
                        },
                    };
                });
            } catch (err: any) {
                setConverted((prev) => ({
                    ...prev,
                    [img.id]: {
                        url: '',
                        size: 0,
                        mimeType: targetFormat.mimeType,
                        extension: targetFormat.extension,
                        status: 'error',
                        error: err?.message || 'Conversion failed',
                    },
                }));
            }
        },
        [targetFormat, quality]
    );

    // Auto trigger conversion whenever targetFormat, quality, or images change
    useEffect(() => {
        images.forEach((img) => {
            processImage(img);
        });
    }, [images, targetFormat, quality, processImage]);

    const totalOriginal = useMemo(
        () => images.reduce((acc, img) => acc + img.originalSize, 0),
        [images]
    );

    const totalConverted = useMemo(
        () =>
            Object.values(converted).reduce(
                (acc, c) => (c.status === 'done' ? acc + c.size : acc),
                0
            ),
        [converted]
    );

    const downloadSingle = (img: QueuedImage, c: ConvertedState) => {
        if (!c.url) return;
        const a = document.createElement('a');
        a.href = c.url;
        a.download = swapExtension(img.file.name, c.extension);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadAll = () => {
        images.forEach((img) => {
            const c = converted[img.id];
            if (c && c.status === 'done') {
                downloadSingle(img, c);
            }
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Upload Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                        ? 'border-[#24CFA6] bg-[#24CFA6]/10 scale-[1.01]'
                        : 'border-[#24CFA6]/30 bg-black/40 hover:border-[#24CFA6]/60 hover:bg-[#24CFA6]/5'
                }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    multiple
                    accept="image/*"
                    className="hidden"
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
                            Supports PNG, JPEG, WebP, BMP, AVIF, GIF, SVG
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            {images.length > 0 && (
                <div className="bg-black/60 border border-[#24CFA6]/20 rounded-2xl p-6 backdrop-blur-md space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Format Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Target Format</label>
                            <div className="flex flex-wrap gap-2">
                                {availableFormats.map((fmt) => (
                                    <button
                                        key={fmt.id}
                                        onClick={() => setTargetFormat(fmt)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                            targetFormat.id === fmt.id
                                                ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.4)]'
                                                : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                                        }`}
                                    >
                                        {fmt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quality Slider (if format supports quality) */}
                        {targetFormat.supportsQuality && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <label className="font-medium text-gray-300">Quality</label>
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
                        )}
                    </div>

                    {/* Summary & Global Actions */}
                    <div className="flex flex-wrap justify-between items-center pt-4 border-t border-zinc-800 gap-4">
                        <div className="text-sm text-gray-400">
                            Total Original: <span className="text-white font-medium">{formatBytes(totalOriginal)}</span>
                            {totalConverted > 0 && (
                                <>
                                    {' '}
                                    ➔ Converted: <span className="text-[#24CFA6] font-medium">{formatBytes(totalConverted)}</span>
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
                                onClick={downloadAll}
                                className="px-5 py-2 rounded-xl text-sm font-medium bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_15px_rgba(36,207,166,0.3)] transition-all flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Images List */}
            {images.length > 0 && (
                <div className="space-y-3">
                    {images.map((img) => {
                        const c = converted[img.id];
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
                                            {c?.status === 'done' && (
                                                <span className="text-[#24CFA6] ml-2">
                                                    ➔ {formatBytes(c.size)} ({targetFormat.label})
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {c?.status === 'pending' && (
                                        <span className="text-xs text-[#24CFA6] animate-pulse">Converting...</span>
                                    )}
                                    {c?.status === 'error' && (
                                        <span className="text-xs text-red-400">{c.error || 'Failed'}</span>
                                    )}
                                    {c?.status === 'done' && (
                                        <>
                                            <button
                                                onClick={() => setPreviewItem({ img, c })}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-white border border-zinc-700 hover:border-[#24CFA6] hover:text-[#24CFA6] transition-all flex items-center gap-1.5"
                                            >
                                                <svg className="w-3.5 h-3.5 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => downloadSingle(img, c)}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 hover:bg-[#24CFA6] hover:text-black transition-all"
                                            >
                                                Download
                                            </button>
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
                fileName={previewItem?.img.file.name || ''}
                originalUrl={previewItem?.img.previewUrl || ''}
                originalSize={previewItem?.img.originalSize || 0}
                processedUrl={previewItem?.c.url || ''}
                processedSize={previewItem?.c.size || 0}
                processedFormatLabel={targetFormat.label}
            />
        </div>
    );
}

export default ImageConverter;
