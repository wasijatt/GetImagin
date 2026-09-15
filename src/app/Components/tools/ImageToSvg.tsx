/* eslint-disable @next/next/no-img-element */
'use client';

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
} from 'react';
import JSZip from 'jszip';
import {
    rasterToSvg,
    DEFAULT_VECTORIZE_OPTIONS,
    type VectorizeOptions,
} from '../../lib/tools/image-to-svg';

interface QueuedImage {
    id: string;
    file: File;
    previewUrl: string;
    originalSize: number;
}

interface SvgConvertedState {
    url: string;
    svgString: string;
    size: number;
    width: number;
    height: number;
    status: 'pending' | 'converting' | 'done' | 'error';
    error?: string;
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function ImageToSvg({ slug }: { slug?: string }) {
    const initialOptions = useMemo<VectorizeOptions>(() => {
        if (slug === 'png-to-svg') {
            return { ...DEFAULT_VECTORIZE_OPTIONS, mode: 'color', colorCount: 6, smoothness: 2 };
        }
        if (slug === 'jpg-to-svg') {
            return { ...DEFAULT_VECTORIZE_OPTIONS, mode: 'detailed', colorCount: 12, smoothness: 3 };
        }
        return DEFAULT_VECTORIZE_OPTIONS;
    }, [slug]);

    const [images, setImages] = useState<QueuedImage[]>([]);
    const [options, setOptions] = useState<VectorizeOptions>(initialOptions);
    const [converted, setConverted] = useState<Record<string, SvgConvertedState>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessingAll, setIsProcessingAll] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activePreview, setActivePreview] = useState<{ original: QueuedImage; svg: SvgConvertedState } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setOptions(initialOptions);
    }, [initialOptions]);

    // Vectorize a single item
    const convertSingle = useCallback(
        async (item: QueuedImage, opt: VectorizeOptions = options) => {
            setConverted((prev) => ({
                ...prev,
                [item.id]: {
                    url: '',
                    svgString: '',
                    size: 0,
                    width: 0,
                    height: 0,
                    status: 'converting',
                },
            }));

            try {
                const res = await rasterToSvg(item.file, opt);
                setConverted((prev) => ({
                    ...prev,
                    [item.id]: {
                        url: res.blobUrl,
                        svgString: res.svgString,
                        size: res.size,
                        width: res.width,
                        height: res.height,
                        status: 'done',
                    },
                }));
            } catch (err: any) {
                console.error('Vectorization error:', err);
                setConverted((prev) => ({
                    ...prev,
                    [item.id]: {
                        url: '',
                        svgString: '',
                        size: 0,
                        width: 0,
                        height: 0,
                        status: 'error',
                        error: err.message || 'Conversion failed',
                    },
                }));
            }
        },
        [options]
    );

    const addFiles = useCallback(
        (files: FileList | File[]) => {
            const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
            if (validFiles.length === 0) return;

            const newItems: QueuedImage[] = validFiles.map((file) => ({
                id: `${file.name}-${file.size}-${Math.random().toString(36).substring(2, 9)}`,
                file,
                previewUrl: URL.createObjectURL(file),
                originalSize: file.size,
            }));

            setImages((prev) => [...prev, ...newItems]);

            // Auto-convert newly added files
            newItems.forEach((item) => {
                convertSingle(item, options);
            });
        },
        [convertSingle, options]
    );

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
            }
        },
        [addFiles]
    );

    const removeImage = useCallback((id: string) => {
        setImages((prev) => {
            const item = prev.find((img) => img.id === id);
            if (item) URL.revokeObjectURL(item.previewUrl);
            return prev.filter((img) => img.id !== id);
        });
        setConverted((prev) => {
            const next = { ...prev };
            if (next[id]?.url) URL.revokeObjectURL(next[id].url);
            delete next[id];
            return next;
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

    // Vectorize all items in queue
    const convertAll = useCallback(
        async (opt: VectorizeOptions = options) => {
            if (images.length === 0 || isProcessingAll) return;
            setIsProcessingAll(true);

            for (const item of images) {
                await convertSingle(item, opt);
            }

            setIsProcessingAll(false);
        },
        [images, isProcessingAll, convertSingle, options]
    );

    // Copy raw SVG code to clipboard
    const copySvgCode = useCallback((id: string, svgString: string) => {
        if (!svgString) return;
        navigator.clipboard.writeText(svgString);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
    }, []);

    // Download single SVG
    const downloadSingle = useCallback((item: QueuedImage) => {
        const c = converted[item.id];
        if (!c || c.status !== 'done' || !c.svgString) return;

        const baseName = item.file.name.replace(/\.[^./\\]+$/, '');
        const blob = new Blob([c.svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}-vector.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [converted]);

    // Download All as ZIP
    const downloadAllZip = useCallback(async () => {
        const doneItems = images.filter((img) => converted[img.id]?.status === 'done');
        if (doneItems.length === 0) return;

        const zip = new JSZip();
        for (const img of doneItems) {
            const c = converted[img.id];
            const baseName = img.file.name.replace(/\.[^./\\]+$/, '');
            zip.file(`${baseName}-vector.svg`, c.svgString);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipBlob);
        a.download = 'getimagin-svg-vectors.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [images, converted]);

    return (
        <div className="w-full space-y-8">
            {/* ─── Drag & Drop Upload Zone ─────────────────────────────────────── */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                        ? 'border-[#24CFA6] bg-[#24CFA6]/10 scale-[1.01]'
                        : 'border-white/15 bg-[#121212] hover:border-[#24CFA6]/60 hover:bg-[#161616]'
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/bmp,image/gif"
                    className="hidden"
                    onChange={handleFileInput}
                />

                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-bold text-white">
                            Drop PNG, JPG, WebP, or BMP images here
                        </p>
                        <p className="text-xs text-gray-400">
                            or <span className="text-[#24CFA6] underline">browse files from your device</span> • 100% Private In-Browser Vectorization
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── Control Settings Bar ───────────────────────────────────────── */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                        <h3 className="text-base font-bold text-white">Vectorization Controls</h3>
                        <p className="text-xs text-gray-400">
                            Adjust vector mode, palette layers, and path smoothing in real time.
                        </p>
                    </div>
                    {images.length > 0 && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => convertAll(options)}
                                disabled={isProcessingAll}
                                className="px-5 py-2.5 bg-[#24CFA6] text-black font-bold text-sm rounded-xl hover:bg-[#1fb894] transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(36,207,166,0.25)]"
                            >
                                {isProcessingAll ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        <span>Vectorizing...</span>
                                    </>
                                ) : (
                                    <span>Re-Convert All to SVG</span>
                                )}
                            </button>
                            <button
                                onClick={clearAll}
                                className="px-3.5 py-2.5 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl text-xs transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Vector Mode */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-300">Vector Mode</label>
                        <select
                            value={options.mode}
                            onChange={(e) => {
                                const newOpt = { ...options, mode: e.target.value as any };
                                setOptions(newOpt);
                                if (images.length > 0) convertAll(newOpt);
                            }}
                            className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#24CFA6]"
                        >
                            <option value="color">Full Color Vector</option>
                            <option value="monochrome">Monochrome / Silhouette</option>
                            <option value="posterize">Posterized Graphic</option>
                            <option value="detailed">High-Detail Vector</option>
                        </select>
                    </div>

                    {/* Color Count Slider */}
                    {options.mode !== 'monochrome' && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="font-semibold text-gray-300">Color Palette</span>
                                <span className="text-[#24CFA6] font-bold">{options.colorCount} Colors</span>
                            </div>
                            <input
                                type="range"
                                min={2}
                                max={24}
                                step={1}
                                value={options.colorCount}
                                onChange={(e) => {
                                    const newOpt = { ...options, colorCount: parseInt(e.target.value, 10) };
                                    setOptions(newOpt);
                                    if (images.length > 0) convertAll(newOpt);
                                }}
                                className="w-full accent-[#24CFA6] cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Monochrome Threshold Slider */}
                    {options.mode === 'monochrome' && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="font-semibold text-gray-300">Threshold</span>
                                <span className="text-[#24CFA6] font-bold">{options.threshold}</span>
                            </div>
                            <input
                                type="range"
                                min={10}
                                max={245}
                                step={5}
                                value={options.threshold}
                                onChange={(e) => {
                                    const newOpt = { ...options, threshold: parseInt(e.target.value, 10) };
                                    setOptions(newOpt);
                                    if (images.length > 0) convertAll(newOpt);
                                }}
                                className="w-full accent-[#24CFA6] cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Smoothness */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-300">Path Smoothing</span>
                            <span className="text-[#24CFA6] font-bold">Level {options.smoothness}</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={4}
                            step={1}
                            value={options.smoothness}
                            onChange={(e) => {
                                const newOpt = { ...options, smoothness: parseInt(e.target.value, 10) };
                                setOptions(newOpt);
                                if (images.length > 0) convertAll(newOpt);
                            }}
                            className="w-full accent-[#24CFA6] cursor-pointer"
                        />
                    </div>

                    {/* Invert */}
                    {options.mode === 'monochrome' && (
                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                id="invertToggle"
                                checked={options.invert}
                                onChange={(e) => {
                                    const newOpt = { ...options, invert: e.target.checked };
                                    setOptions(newOpt);
                                    if (images.length > 0) convertAll(newOpt);
                                }}
                                className="w-4 h-4 accent-[#24CFA6] cursor-pointer"
                            />
                            <label htmlFor="invertToggle" className="text-xs text-gray-300 cursor-pointer">
                                Invert Black / White
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Queue List & Output Cards ──────────────────────────────────── */}
            {images.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">
                            Images ({images.length})
                        </h3>
                        {Object.values(converted).some((c) => c.status === 'done') && (
                            <button
                                onClick={downloadAllZip}
                                className="px-4 py-2 bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 rounded-xl text-xs font-semibold hover:bg-[#24CFA6]/20 transition-all flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Download All as ZIP</span>
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.map((item) => {
                            const c = converted[item.id];
                            const isDone = c?.status === 'done';
                            const isConverting = c?.status === 'converting';
                            const isError = c?.status === 'error';

                            return (
                                <div
                                    key={item.id}
                                    className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col justify-between gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-24 h-24 bg-black/60 border border-white/10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1.5 relative">
                                            {isDone && c.svgString ? (
                                                <div
                                                    className="w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:object-contain"
                                                    dangerouslySetInnerHTML={{ __html: c.svgString }}
                                                />
                                            ) : (
                                                <img
                                                    src={item.previewUrl}
                                                    alt="Original Preview"
                                                    className="w-full h-full object-contain opacity-70"
                                                />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1.5">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {item.file.name}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span>Original: {formatBytes(item.originalSize)}</span>
                                                {isDone && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-[#24CFA6] font-semibold">
                                                            SVG: {formatBytes(c.size)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {isDone && (
                                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30">
                                                    ✓ Scalable Vector Ready
                                                </span>
                                            )}

                                            {isError && (
                                                <p className="text-xs text-red-400">
                                                    {c?.error || 'Conversion error'}
                                                </p>
                                            )}

                                            {isConverting && (
                                                <div className="flex items-center gap-2 text-xs text-[#24CFA6]">
                                                    <div className="w-3 h-3 border-2 border-[#24CFA6]/30 border-t-[#24CFA6] rounded-full animate-spin" />
                                                    <span>Tracing vectors...</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeImage(item.id)}
                                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                            title="Remove image"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                        {!isDone ? (
                                            <button
                                                onClick={() => convertSingle(item, options)}
                                                disabled={isConverting}
                                                className="w-full py-2 bg-[#24CFA6] text-black font-semibold text-xs rounded-xl hover:bg-[#1fb894] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {isConverting ? (
                                                    <>
                                                        <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                        <span>Vectorizing...</span>
                                                    </>
                                                ) : (
                                                    <span>Convert to SVG</span>
                                                )}
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => downloadSingle(item)}
                                                    className="flex-1 py-2 bg-[#24CFA6] text-black font-bold text-xs rounded-xl hover:bg-[#1fb894] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(36,207,166,0.2)]"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    <span>Download .SVG</span>
                                                </button>

                                                <button
                                                    onClick={() => copySvgCode(item.id, c.svgString)}
                                                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                                                    title="Copy Raw SVG XML Code"
                                                >
                                                    {copiedId === item.id ? (
                                                        <span className="text-[#24CFA6] font-bold">Copied!</span>
                                                    ) : (
                                                        <span>Copy SVG</span>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => setActivePreview({ original: item, svg: c })}
                                                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                                                    title="Inspect Side-by-Side"
                                                >
                                                    Preview
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ─── Before & After Comparison Modal ────────────────────────────── */}
            {activePreview && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setActivePreview(null)}
                >
                    <div
                        className="bg-[#141414] border border-white/20 rounded-3xl p-6 max-w-3xl w-full space-y-4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h4 className="text-base font-bold text-white">
                                Vector Preview: {activePreview.original.file.name}
                            </h4>
                            <button
                                onClick={() => setActivePreview(null)}
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2 text-center">
                                <span className="text-xs font-bold text-gray-400 uppercase">Original Raster</span>
                                <div className="h-64 bg-black/60 rounded-2xl border border-white/10 p-2 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={activePreview.original.previewUrl}
                                        alt="Original"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-center">
                                <span className="text-xs font-bold text-[#24CFA6] uppercase">Scalable Vector SVG</span>
                                <div className="h-64 bg-black/60 rounded-2xl border border-[#24CFA6]/30 p-2 flex items-center justify-center overflow-hidden">
                                    {activePreview.svg.svgString ? (
                                        <div
                                            className="w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:object-contain"
                                            dangerouslySetInnerHTML={{ __html: activePreview.svg.svgString }}
                                        />
                                    ) : (
                                        <img
                                            src={activePreview.svg.url}
                                            alt="SVG Output"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                            <button
                                onClick={() => copySvgCode(activePreview.original.id, activePreview.svg.svgString)}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
                            >
                                {copiedId === activePreview.original.id ? 'Copied Code!' : 'Copy SVG XML'}
                            </button>
                            <button
                                onClick={() => downloadSingle(activePreview.original)}
                                className="px-5 py-2 bg-[#24CFA6] text-black font-bold text-xs rounded-xl hover:bg-[#1fb894] transition-all"
                            >
                                Download .SVG
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
