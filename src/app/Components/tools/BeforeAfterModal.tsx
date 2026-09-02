'use client';

import React, { useState } from 'react';
import { formatBytes } from '../../lib/tools/image-compression';
import Image from 'next/image';

interface BeforeAfterModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileName: string;
    originalUrl: string;
    originalSize: number;
    processedUrl: string;
    processedSize: number;
    processedFormatLabel?: string;
}

export function BeforeAfterModal({
    isOpen,
    onClose,
    fileName,
    originalUrl,
    originalSize,
    processedUrl,
    processedSize,
    processedFormatLabel,
}: BeforeAfterModalProps) {
    const [viewMode, setViewMode] = useState<'side-by-side' | 'toggle' | 'slider'>('side-by-side');
    const [activeTab, setActiveTab] = useState<'original' | 'processed'>('processed');
    const [sliderPos, setSliderPos] = useState<number>(50);

    if (!isOpen) return null;

    const savedBytes = originalSize - processedSize;
    const percentSaved = originalSize > 0 ? ((savedBytes / originalSize) * 100).toFixed(1) : 0;
    const isSmaller = savedBytes > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-zinc-950 border border-[#24CFA6]/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(36,207,166,0.15)] flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-black/40">
                    <div>
                        <h2 className="text-xl font-bold text-white truncate max-w-md">{fileName}</h2>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                            <span>Before: <strong className="text-white">{formatBytes(originalSize)}</strong></span>
                            <span>➔</span>
                            <span>
                                After: <strong className="text-[#24CFA6]">{formatBytes(processedSize)}</strong>
                                {processedFormatLabel && ` (${processedFormatLabel})`}
                            </span>
                            {processedSize > 0 && (
                                <span className={`px-2 py-0.5 rounded-full font-medium ${isSmaller ? 'bg-[#24CFA6]/10 text-[#24CFA6]' : 'bg-amber-500/10 text-amber-400'}`}>
                                    {isSmaller ? `-${percentSaved}%` : `+${Math.abs(Number(percentSaved))}%`}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mode Switcher */}
                    <div className="flex items-center gap-2">
                        <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
                            <button
                                onClick={() => setViewMode('side-by-side')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    viewMode === 'side-by-side' ? 'bg-[#24CFA6] text-black font-semibold' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Side-by-Side
                            </button>
                            <button
                                onClick={() => setViewMode('slider')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    viewMode === 'slider' ? 'bg-[#24CFA6] text-black font-semibold' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Split Slider
                            </button>
                            <button
                                onClick={() => setViewMode('toggle')}
                                className={`px-3 py-1.5 rounded-lg transition-all ${
                                    viewMode === 'toggle' ? 'bg-[#24CFA6] text-black font-semibold' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Toggle View
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Size Ratio Progress Bar */}
                {originalSize > 0 && processedSize > 0 && (
                    <div className="w-full bg-zinc-900 h-1.5 relative overflow-hidden">
                        <div
                            className="h-full bg-[#24CFA6] transition-all duration-500 shadow-[0_0_10px_#24CFA6]"
                            style={{
                                width: `${Math.max(2, Math.min(100, (processedSize / originalSize) * 100))}%`,
                            }}
                        />
                    </div>
                )}

                {/* Viewport Area */}
                <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-black/60 relative min-h-[350px]">
                    {/* Mode 1: Side by Side */}
                    {viewMode === 'side-by-side' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full items-center justify-center">
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">Original (Before)</span>
                                <div className="relative border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/50 max-h-[50vh] flex items-center justify-center p-2">
                                    <Image src={originalUrl} alt="Original" className="max-h-[45vh] w-auto object-contain rounded-lg" />
                                </div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#24CFA6] bg-[#24CFA6]/10 border border-[#24CFA6]/30 px-3 py-1 rounded-full">Processed (After)</span>
                                <div className="relative border border-[#24CFA6]/30 rounded-2xl overflow-hidden bg-zinc-900/50 max-h-[50vh] flex items-center justify-center p-2">
                                    <Image src={processedUrl || originalUrl} alt="Processed" className="max-h-[45vh] w-auto object-contain rounded-lg" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mode 2: Toggle View */}
                    {viewMode === 'toggle' && (
                        <div className="flex flex-col items-center space-y-4 w-full">
                            <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
                                <button
                                    onClick={() => setActiveTab('original')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        activeTab === 'original' ? 'bg-white text-black font-semibold' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    Before ({formatBytes(originalSize)})
                                </button>
                                <button
                                    onClick={() => setActiveTab('processed')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        activeTab === 'processed' ? 'bg-[#24CFA6] text-black font-semibold' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    After ({formatBytes(processedSize)})
                                </button>
                            </div>

                            <div className="relative border border-zinc-800 rounded-2xl overflow-hidden max-h-[55vh] flex items-center justify-center p-2 bg-zinc-900/50">
                                <Image
                                    src={activeTab === 'original' ? originalUrl : (processedUrl || originalUrl)}
                                    alt="Preview"
                                    className="max-h-[50vh] w-auto object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Mode 3: Split Slider */}
                    {viewMode === 'slider' && (
                        <div className="relative w-full max-w-2xl h-[50vh] overflow-hidden rounded-2xl border border-zinc-800 select-none bg-zinc-900/50 flex items-center justify-center">
                            {/* Processed (After) Image */}
                            <Image
                                src={processedUrl || originalUrl}
                                alt="After"
                                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                            />

                            {/* Original (Before) Image overlaid with clip path */}
                            <div
                                className="absolute inset-0 overflow-hidden pointer-events-none"
                                style={{ width: `${sliderPos}%` }}
                            >
                                <Image
                                    src={originalUrl}
                                    alt="Before"
                                    className="absolute inset-0 w-full h-full object-contain pointer-events-none max-w-none"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>

                            {/* Slider Line Divider */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-[#24CFA6] shadow-[0_0_10px_#24CFA6] cursor-ew-resize flex items-center justify-center z-20"
                                style={{ left: `${sliderPos}%` }}
                            >
                                <div className="w-8 h-8 rounded-full bg-[#24CFA6] text-black font-bold flex items-center justify-center text-xs shadow-lg">
                                    ↔
                                </div>
                            </div>

                            {/* Transparent Input Range Overlay */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPos}
                                onChange={(e) => setSliderPos(Number(e.target.value))}
                                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                            />

                            {/* Labels */}
                            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                                Before
                            </div>
                            <div className="absolute top-3 right-3 bg-[#24CFA6]/80 text-black text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                                After
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BeforeAfterModal;
