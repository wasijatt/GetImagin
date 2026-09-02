'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BeforeAfterModal from './BeforeAfterModal';

interface EnhanceSettings {
    masterEnhance: number; // 0 to 100%
    brightness: number;     // 50 to 150
    contrast: number;       // 50 to 150
    saturation: number;     // 0 to 200
    sharpness: number;      // 0 to 100
    upscale: number;        // 1.0, 1.5, 2.0x
}

const DEFAULT_SETTINGS: EnhanceSettings = {
    masterEnhance: 60,
    brightness: 108,
    contrast: 115,
    saturation: 120,
    sharpness: 50,
    upscale: 1.5,
};

const PRESETS = [
    {
        name: '⚡ Auto Deep Enhance',
        settings: { masterEnhance: 75, brightness: 110, contrast: 120, saturation: 125, sharpness: 65, upscale: 1.5 },
    },
    {
        name: '🔍 2x Ultra Clarity',
        settings: { masterEnhance: 100, brightness: 112, contrast: 125, saturation: 130, sharpness: 90, upscale: 2.0 },
    },
    {
        name: '🎨 Vibrant & Sharp',
        settings: { masterEnhance: 60, brightness: 105, contrast: 120, saturation: 150, sharpness: 55, upscale: 1.5 },
    },
    {
        name: '🖤 Monochromatic High-Res',
        settings: { masterEnhance: 80, brightness: 100, contrast: 150, saturation: 0, sharpness: 70, upscale: 2.0 },
    },
];

export function ImageEnhancer() {
    const [file, setFile] = useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
    const [enhancedBlob, setEnhancedBlob] = useState<Blob | null>(null);

    const [settings, setSettings] = useState<EnhanceSettings>(DEFAULT_SETTINGS);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processProgress, setProcessProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (originalUrl) URL.revokeObjectURL(originalUrl);
            if (enhancedUrl) URL.revokeObjectURL(enhancedUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const processImage = useCallback(async (sourceFile: File, cfg: EnhanceSettings) => {
        setIsProcessing(true);
        setProcessProgress(20);

        const img = new Image();
        const url = URL.createObjectURL(sourceFile);
        img.src = url;

        img.onload = () => {
            setProcessProgress(50);

            // Calculate Upscaled Canvas Dimensions
            const targetW = Math.round(img.naturalWidth * cfg.upscale);
            const targetH = Math.round(img.naturalHeight * cfg.upscale);

            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d')!;

            // Enable High-Quality Resampling for Pixel Clearance
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Apply Color, Contrast & Brightness Filters
            ctx.filter = `brightness(${cfg.brightness}%) contrast(${cfg.contrast}%) saturate(${cfg.saturation}%)`;
            ctx.drawImage(img, 0, 0, targetW, targetH);

            setProcessProgress(75);

            // Deep Pixel Sharpening / Unsharp Mask Algorithm
            if (cfg.sharpness > 0) {
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                const w = canvas.width;
                const h = canvas.height;
                const amount = (cfg.sharpness / 100) * 0.7;

                // 3x3 High-Pass Sharpen Kernel for Pixel Clearance
                const k = [
                    0, -amount, 0,
                    -amount, 1 + 4 * amount, -amount,
                    0, -amount, 0
                ];

                const output = ctx.createImageData(w, h);
                const dst = output.data;

                for (let y = 1; y < h - 1; y++) {
                    for (let x = 1; x < w - 1; x++) {
                        const idx = (y * w + x) * 4;

                        let r = 0, g = 0, b = 0;
                        let ki = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                const nIdx = ((y + dy) * w + (x + dx)) * 4;
                                const wt = k[ki++];
                                r += data[nIdx] * wt;
                                g += data[nIdx + 1] * wt;
                                b += data[nIdx + 2] * wt;
                            }
                        }

                        dst[idx] = Math.min(255, Math.max(0, r));
                        dst[idx + 1] = Math.min(255, Math.max(0, g));
                        dst[idx + 2] = Math.min(255, Math.max(0, b));
                        dst[idx + 3] = data[idx + 3];
                    }
                }

                ctx.putImageData(output, 0, 0);
            }

            setProcessProgress(95);

            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(url);
                    if (blob) {
                        if (enhancedUrl) URL.revokeObjectURL(enhancedUrl);
                        setEnhancedBlob(blob);
                        setEnhancedUrl(URL.createObjectURL(blob));
                    }
                    setProcessProgress(100);
                    setIsProcessing(false);
                },
                'image/png',
                0.95
            );
        };
    }, [enhancedUrl]);

    const handleFile = (incoming: File) => {
        if (!incoming.type.startsWith('image/')) return;
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        setFile(incoming);
        setOriginalUrl(URL.createObjectURL(incoming));
        setSettings(DEFAULT_SETTINGS);
        processImage(incoming, DEFAULT_SETTINGS);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const picked = e.dataTransfer.files[0];
        if (picked) handleFile(picked);
    };

    // Master Auto Enhance Slider change handler
    const handleMasterSliderChange = (pct: number) => {
        const next: EnhanceSettings = {
            masterEnhance: pct,
            brightness: Math.round(100 + (pct / 100) * 15),
            contrast: Math.round(100 + (pct / 100) * 25),
            saturation: Math.round(100 + (pct / 100) * 30),
            sharpness: Math.round((pct / 100) * 80),
            upscale: pct > 70 ? 2.0 : pct > 35 ? 1.5 : 1.0,
        };
        setSettings(next);
        if (file) processImage(file, next);
    };

    const updateSetting = (key: keyof EnhanceSettings, value: number) => {
        const next = { ...settings, [key]: value };
        setSettings(next);
        if (file) processImage(file, next);
    };

    const applyPreset = (presetSettings: EnhanceSettings) => {
        setSettings(presetSettings);
        if (file) processImage(file, presetSettings);
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        if (file) processImage(file, DEFAULT_SETTINGS);
    };

    const downloadEnhanced = () => {
        if (!enhancedUrl || !file) return;
        const a = document.createElement('a');
        a.href = enhancedUrl;
        const base = file.name.replace(/\.[^/.]+$/, '');
        a.download = `${base}-deep-enhanced.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Upload Zone */}
            {!file && (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                            ? 'border-[#24CFA6] bg-[#24CFA6]/10 scale-[1.01]'
                            : 'border-[#24CFA6]/30 bg-black/40 hover:border-[#24CFA6]/60 hover:bg-[#24CFA6]/5'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const picked = e.target.files?.[0];
                            if (picked) handleFile(picked);
                            e.target.value = '';
                        }}
                    />
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#24CFA6]/10 flex items-center justify-center border border-[#24CFA6]/30">
                            <svg className="w-10 h-10 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Drop image for <span className="text-[#24CFA6]">Deep Pixel Clearance & Upscale</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Sharpen low-res pixels, boost contrast, and enhance details in high-definition
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loaded Workspace */}
            {file && originalUrl && (
                <>
                    {/* Master Auto Enhance Progress Bar / Controls */}
                    <div className="bg-black/60 border border-[#24CFA6]/30 rounded-2xl p-6 backdrop-blur-md space-y-6 shadow-[0_0_30px_rgba(36,207,166,0.1)]">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>✨</span> Master Auto Enhance & Pixel Clearance
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">Drag master slider to auto-enhance pixels, clarity, and resolution</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={resetSettings}
                                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-gray-300 border border-zinc-800 transition-all"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 hover:bg-[#24CFA6]/20 transition-all"
                                >
                                    🔍 Compare Before/After
                                </button>
                            </div>
                        </div>

                        {/* Master Auto Enhance Slider */}
                        <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                            <div className="flex justify-between items-center text-sm font-semibold">
                                <span className="text-white">Auto Enhance Level</span>
                                <span className="text-[#24CFA6] font-bold text-base">{settings.masterEnhance}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={settings.masterEnhance}
                                onChange={(e) => handleMasterSliderChange(Number(e.target.value))}
                                className="w-full h-2.5 rounded-full cursor-pointer accent-[#24CFA6]"
                                style={{
                                    background: `linear-gradient(to right, #24CFA6 0%, #24CFA6 ${settings.masterEnhance}%, #27272a ${settings.masterEnhance}%, #27272a 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Original</span>
                                <span>Balanced</span>
                                <span className="text-[#24CFA6]">2x Ultra Pixel Clearance</span>
                            </div>
                        </div>

                        {/* Rendering Progress Bar */}
                        {isProcessing && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-[#24CFA6] font-medium">
                                    <span>Rendering Deep Pixel Clearance...</span>
                                    <span>{processProgress}%</span>
                                </div>
                                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#24CFA6] transition-all duration-300 shadow-[0_0_8px_#24CFA6]"
                                        style={{ width: `${processProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Presets */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Enhancement Modes</label>
                            <div className="flex flex-wrap gap-2">
                                {PRESETS.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => applyPreset(p.settings)}
                                        className="px-3 py-2 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-gray-200 border border-zinc-800 hover:border-[#24CFA6]/40 transition-all"
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fine Tuning Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            {/* Sharpness */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Pixel Sharpness</span>
                                    <span className="text-[#24CFA6]">{settings.sharpness}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.sharpness}
                                    onChange={(e) => updateSetting('sharpness', Number(e.target.value))}
                                    className="w-full h-1.5 accent-[#24CFA6] bg-zinc-800 rounded-lg cursor-pointer"
                                />
                            </div>

                            {/* Resolution Upscale */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Upscale Resolution</span>
                                    <span className="text-[#24CFA6] font-bold">{settings.upscale}x</span>
                                </div>
                                <div className="flex gap-2">
                                    {[1.0, 1.5, 2.0].map((sc) => (
                                        <button
                                            key={sc}
                                            onClick={() => updateSetting('upscale', sc)}
                                            className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                settings.upscale === sc
                                                    ? 'bg-[#24CFA6] text-black'
                                                    : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                                            }`}
                                        >
                                            {sc}x
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Saturation */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Color Vibrance</span>
                                    <span className="text-[#24CFA6]">{settings.saturation}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.saturation}
                                    onChange={(e) => updateSetting('saturation', Number(e.target.value))}
                                    className="w-full h-1.5 accent-[#24CFA6] bg-zinc-800 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                            <button
                                onClick={() => setFile(null)}
                                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-all"
                            >
                                Choose Different Image
                            </button>

                            <button
                                onClick={downloadEnhanced}
                                disabled={isProcessing || !enhancedUrl}
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_15px_rgba(36,207,166,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Enhanced Image
                            </button>
                        </div>
                    </div>

                    {/* Preview Box */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-center min-h-[350px]">
                        <img
                            src={enhancedUrl || originalUrl}
                            alt="Enhanced Preview"
                            className="max-h-[500px] w-auto object-contain rounded-xl"
                        />
                    </div>
                </>
            )}

            {/* Before / After Comparison Modal */}
            {originalUrl && enhancedUrl && file && (
                <BeforeAfterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    fileName={file.name}
                    originalUrl={originalUrl}
                    originalSize={file.size}
                    processedUrl={enhancedUrl}
                    processedSize={enhancedBlob?.size || file.size}
                    processedFormatLabel={`${settings.upscale}x Enhanced`}
                />
            )}
        </div>
    );
}

export default ImageEnhancer;
