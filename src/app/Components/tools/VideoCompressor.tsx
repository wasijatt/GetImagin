'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    compressVideo,
    formatBytes,
    qualityPctToBitrate,
    type VideoCompressOptions,
    type VideoCompressResult,
} from '../../lib/tools/video-compression';

type VideoStatus = 'idle' | 'compressing' | 'done' | 'error';

interface CompressedVideo {
    result: VideoCompressResult;
    url: string;
}

function qualityLabel(pct: number): { text: string; color: string } {
    if (pct >= 80) return { text: 'High Quality', color: 'text-blue-400' };
    if (pct >= 50) return { text: 'Balanced', color: 'text-[#24CFA6]' };
    if (pct >= 25) return { text: 'Smaller File', color: 'text-yellow-400' };
    return { text: 'Max Compression', color: 'text-red-400' };
}

const SCALE_OPTIONS = [
    { value: 1.0, label: '100%', sub: 'Original' },
    { value: 0.75, label: '75%', sub: 'HD' },
    { value: 0.5, label: '50%', sub: 'Half' },
    { value: 0.25, label: '25%', sub: 'Quarter' },
];

const FORMAT_OPTIONS = [
    { id: 'mp4' as const, label: 'MP4', desc: 'Best compatibility' },
    { id: 'webm' as const, label: 'WebM', desc: 'Smaller on web' },
];

export function VideoCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<VideoStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [progressMsg, setProgressMsg] = useState('');
    const [output, setOutput] = useState<CompressedVideo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [qualityPct, setQualityPct] = useState(60); // 1–100
    const [scale, setScale] = useState(1.0);
    const [outputFormat, setOutputFormat] = useState<'mp4' | 'webm'>('mp4');
    const [videoDuration, setVideoDuration] = useState<number>(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (output?.url) URL.revokeObjectURL(output.url);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFile = useCallback((incoming: File) => {
        if (!incoming.type.startsWith('video/')) {
            setError('Please upload a valid video file (MP4, MOV, WebM, MKV, AVI).');
            return;
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (output?.url) URL.revokeObjectURL(output.url);
        setFile(incoming);
        setPreviewUrl(URL.createObjectURL(incoming));
        setOutput(null);
        setError(null);
        setStatus('idle');
        setProgress(0);
    }, [previewUrl, output]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFile(dropped);
    }, [handleFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (picked) handleFile(picked);
        e.target.value = '';
    };

    const startCompression = async () => {
        if (!file) return;
        setError(null);
        setOutput(null);
        setStatus('compressing');
        setProgress(0);
        setProgressMsg('Starting...');

        const bitrate = qualityPctToBitrate(qualityPct, scale, file.size, videoDuration);
        const opts: VideoCompressOptions = { targetBitrate: bitrate, scale, outputFormat };

        try {
            const result = await compressVideo(file, opts, (ratio, msg) => {
                setProgress(Math.round(ratio * 100));
                setProgressMsg(msg);
            });
            const url = URL.createObjectURL(result.blob);
            setOutput({ result, url });
            setStatus('done');
            setProgress(100);
        } catch (err: any) {
            setError(err?.message || 'Compression failed. Try a different format or quality.');
            setStatus('error');
        }
    };

    const downloadOutput = () => {
        if (!output || !file) return;
        const a = document.createElement('a');
        a.href = output.url;
        const base = file.name.replace(/\.[^./\\]+$/, '');
        a.download = `${base}-compressed.${output.result.extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const reset = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (output?.url) URL.revokeObjectURL(output.url);
        setFile(null);
        setPreviewUrl(null);
        setOutput(null);
        setError(null);
        setStatus('idle');
        setProgress(0);
    };

    const isBusy = status === 'compressing';
    const savingPercent = output
        ? Math.round((1 - output.result.compressedSize / output.result.originalSize) * 100)
        : 0;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Dropzone */}
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
                        accept="video/*"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#24CFA6]/10 flex items-center justify-center border border-[#24CFA6]/30">
                            <svg className="w-10 h-10 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Drop your video here or <span className="text-[#24CFA6]">browse</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Supports MP4, MOV, WebM, MKV, AVI — compressed instantly in your browser
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#24CFA6]/70 bg-[#24CFA6]/5 border border-[#24CFA6]/20 rounded-full px-4 py-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Hardware-accelerated · No uploads · 100% private
                        </div>
                    </div>
                </div>
            )}

            {/* File Loaded */}
            {file && (
                <>
                    {/* Video Preview */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                        <video
                            src={previewUrl ?? undefined}
                            controls
                            onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
                            className="w-full max-h-64 object-contain"
                        />
                        {!isBusy && (
                            <button
                                onClick={reset}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-zinc-700 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="bg-black/60 border border-[#24CFA6]/20 rounded-2xl p-6 backdrop-blur-md space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Quality Slider */}
                            <div className="space-y-3 md:col-span-1">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">Compression Quality</label>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                                            qualityPct >= 80
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                : qualityPct >= 50
                                                ? 'bg-[#24CFA6]/10 text-[#24CFA6] border-[#24CFA6]/30'
                                                : qualityPct >= 25
                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                                        }`}>
                                            {qualityLabel(qualityPct).text}
                                        </span>
                                        <span className="text-[#24CFA6] font-bold text-sm">{qualityPct}%</span>
                                    </div>
                                </div>

                                {/* Gradient Track Slider */}
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={qualityPct}
                                        disabled={isBusy}
                                        onChange={(e) => setQualityPct(Number(e.target.value))}
                                        className="w-full h-2 rounded-full cursor-pointer accent-[#24CFA6] disabled:opacity-40"
                                        style={{
                                            background: `linear-gradient(to right, #ef4444 0%, #eab308 25%, #24CFA6 60%, #3b82f6 100%)`,
                                        }}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Max Compression</span>
                                        <span>Best Quality</span>
                                    </div>
                                </div>

                                {/* Bitrate display */}
                                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center">
                                    <p className="text-xs text-gray-400">Target Bitrate</p>
                                    <p className="text-[#24CFA6] font-bold">
                                        {qualityPctToBitrate(qualityPct, scale, file.size, videoDuration) >= 1_000_000
                                            ? `${(qualityPctToBitrate(qualityPct, scale, file.size, videoDuration) / 1_000_000).toFixed(1)} Mbps`
                                            : `${(qualityPctToBitrate(qualityPct, scale, file.size, videoDuration) / 1000).toFixed(0)} kbps`
                                        }
                                    </p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">
                                        Est. ~{Math.round(100 - (qualityPctToBitrate(qualityPct, scale, file.size, videoDuration) / Math.max(1, (file.size * 8) / Math.max(1, videoDuration))) * 100)}% size reduction
                                    </p>
                                </div>
                            </div>

                            {/* Resolution Scale */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Resolution</label>
                                <div className="flex flex-col gap-1.5">
                                    {SCALE_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setScale(opt.value)}
                                            disabled={isBusy}
                                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                                scale === opt.value
                                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_12px_rgba(36,207,166,0.4)]'
                                                    : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                                            }`}
                                        >
                                            <span>{opt.label}</span>
                                            <span className={`text-xs ${scale === opt.value ? 'text-black/60' : 'text-gray-500'}`}>{opt.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Output Format */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Output Format</label>
                                <div className="flex flex-col gap-1.5">
                                    {FORMAT_OPTIONS.map((fmt) => (
                                        <button
                                            key={fmt.id}
                                            onClick={() => setOutputFormat(fmt.id)}
                                            disabled={isBusy}
                                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                                outputFormat === fmt.id
                                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_12px_rgba(36,207,166,0.4)]'
                                                    : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800'
                                            }`}
                                        >
                                            <span>{fmt.label}</span>
                                            <span className={`text-xs ${outputFormat === fmt.id ? 'text-black/60' : 'text-gray-500'}`}>{fmt.desc}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* File info */}
                                <div className="mt-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                                    <p className="text-xs text-gray-400">Source file</p>
                                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-[#24CFA6] text-xs font-medium">{formatBytes(file.size)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Compress Button */}
                        <div className="pt-4 border-t border-zinc-800 flex justify-end">
                            <button
                                onClick={startCompression}
                                disabled={isBusy}
                                className="px-8 py-3 rounded-xl text-sm font-semibold bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_20px_rgba(36,207,166,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isBusy ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Compressing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Compress Video
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Progress */}
                    {isBusy && (
                        <div className="bg-black/60 border border-[#24CFA6]/20 rounded-2xl p-5 backdrop-blur-md space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#24CFA6] font-medium">{progressMsg}</span>
                                <span className="text-white font-bold">{progress}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                <div
                                    className="h-full bg-[#24CFA6] rounded-full transition-all duration-300 shadow-[0_0_8px_#24CFA6]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500">Encoding with your browser&apos;s hardware codec — no uploads, 100% private.</p>
                        </div>
                    )}

                    {/* Error */}
                    {status === 'error' && error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-red-400 text-sm space-y-2">
                            <p><span className="font-semibold">Error: </span>{error}</p>
                            <button onClick={reset} className="text-xs underline text-gray-400 hover:text-white">Start over</button>
                        </div>
                    )}

                    {/* Result */}
                    {status === 'done' && output && (
                        <div className="bg-black/60 border border-[#24CFA6]/30 rounded-2xl p-6 backdrop-blur-md space-y-5">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#24CFA6] shadow-[0_0_8px_#24CFA6]" />
                                <h3 className="text-[#24CFA6] font-semibold text-lg">Compression Complete!</h3>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                                    <p className="text-xs text-gray-400 mb-1">Original</p>
                                    <p className="text-white font-bold text-lg">{formatBytes(output.result.originalSize)}</p>
                                </div>
                                <div className="bg-[#24CFA6]/10 rounded-xl p-4 border border-[#24CFA6]/30 flex flex-col items-center justify-center">
                                    <p className={`font-black text-2xl ${savingPercent > 0 ? 'text-[#24CFA6]' : 'text-amber-400'}`}>
                                        {savingPercent > 0 ? `-${savingPercent}%` : `+${Math.abs(savingPercent)}%`}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{savingPercent > 0 ? 'saved' : 'larger'}</p>
                                </div>
                                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                                    <p className="text-xs text-gray-400 mb-1">Compressed</p>
                                    <p className="text-[#24CFA6] font-bold text-lg">{formatBytes(output.result.compressedSize)}</p>
                                </div>
                            </div>

                            {/* Output preview */}
                            <video
                                src={output.url}
                                controls
                                className="w-full max-h-60 rounded-xl border border-zinc-800 bg-black object-contain"
                            />

                            {/* Actions */}
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all"
                                >
                                    Compress Another
                                </button>
                                <button
                                    onClick={downloadOutput}
                                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_15px_rgba(36,207,166,0.3)] transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default VideoCompressor;
