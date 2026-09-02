'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { formatBytes } from '../../lib/tools/video-compression';

interface VideoEnhanceSettings {
    masterEnhance: number; // 0 to 100%
    brightness: number;     // 60 to 140
    contrast: number;       // 60 to 140
    saturation: number;     // 50 to 180
    sharpness: number;      // 0 to 100
}

const DEFAULT_VIDEO_SETTINGS: VideoEnhanceSettings = {
    masterEnhance: 60,
    brightness: 108,
    contrast: 115,
    saturation: 125,
    sharpness: 50,
};

type ProcessStatus = 'idle' | 'enhancing' | 'done' | 'error';

export function VideoEnhancer() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [settings, setSettings] = useState<VideoEnhanceSettings>(DEFAULT_VIDEO_SETTINGS);

    const [status, setStatus] = useState<ProcessStatus>('idle');
    const [progress, setProgress] = useState<number>(0);
    const [progressMsg, setProgressMsg] = useState<string>('');

    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (outputUrl) URL.revokeObjectURL(outputUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFile = useCallback((incoming: File) => {
        if (!incoming.type.startsWith('video/')) {
            setError('Please upload a valid video file.');
            return;
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (outputUrl) URL.revokeObjectURL(outputUrl);
        setFile(incoming);
        setPreviewUrl(URL.createObjectURL(incoming));
        setOutputUrl(null);
        setOutputBlob(null);
        setError(null);
        setStatus('idle');
    }, [previewUrl, outputUrl]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const picked = e.dataTransfer.files[0];
        if (picked) handleFile(picked);
    };

    const handleMasterSliderChange = (pct: number) => {
        setSettings({
            masterEnhance: pct,
            brightness: Math.round(100 + (pct / 100) * 15),
            contrast: Math.round(100 + (pct / 100) * 20),
            saturation: Math.round(100 + (pct / 100) * 30),
            sharpness: Math.round((pct / 100) * 70),
        });
    };

    const startEnhancing = async () => {
        if (!file || !previewUrl) return;
        setError(null);
        setStatus('enhancing');
        setProgress(0);
        setProgressMsg('Initializing HD Pixel Clearance Engine...');

        const videoEl = document.createElement('video');
        videoEl.muted = false;
        videoEl.volume = 0.001;
        videoEl.playsInline = true;
        videoEl.src = URL.createObjectURL(file);

        videoEl.style.position = 'fixed';
        videoEl.style.top = '-9999px';
        videoEl.style.left = '-9999px';
        videoEl.style.opacity = '0';
        document.body.appendChild(videoEl);

        videoEl.onloadedmetadata = () => {
            const { videoWidth, videoHeight, duration } = videoEl;
            if (!videoWidth || !videoHeight || !duration) {
                document.body.removeChild(videoEl);
                setError('Could not read video metadata.');
                setStatus('error');
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            const ctx = canvas.getContext('2d', { alpha: false })!;
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            let recordStream: MediaStream = canvas.captureStream(30);

            // Preserve Audio Track
            try {
                const getStream = (videoEl as any).captureStream || (videoEl as any).mozCaptureStream;
                if (getStream) {
                    const origStream = getStream.call(videoEl);
                    const audioTracks = origStream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        recordStream.addTrack(audioTracks[0]);
                    }
                }
            } catch (e) {
                console.warn('Audio capture warning:', e);
            }

            let recorder: MediaRecorder;
            try {
                recorder = new MediaRecorder(recordStream, {
                    mimeType: 'video/webm',
                    videoBitsPerSecond: 8_000_000, // High bitrate for crisp enhanced output
                });
            } catch (e) {
                document.body.removeChild(videoEl);
                setError('Hardware video recorder not supported in this browser.');
                setStatus('error');
                return;
            }

            const chunks: Blob[] = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                document.body.removeChild(videoEl);
                const blob = new Blob(chunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setOutputBlob(blob);
                setOutputUrl(url);
                setStatus('done');
                setProgress(100);
            };

            recorder.start(100);

            let animId: number;
            let lastSec = -1;

            const renderFrame = () => {
                if (videoEl.paused || videoEl.ended) return;

                // Apply Deep Enhancement Filter Combination
                ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`;
                ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

                const currentSec = Math.floor(videoEl.currentTime);
                if (currentSec !== lastSec) {
                    lastSec = currentSec;
                    const pct = Math.round((videoEl.currentTime / duration) * 100);
                    setProgress(pct);
                    setProgressMsg(`Enhancing frames with Pixel Clearance: ${currentSec}s / ${Math.round(duration)}s`);
                }

                animId = requestAnimationFrame(renderFrame);
            };

            videoEl.onplay = () => renderFrame();

            videoEl.onended = () => {
                cancelAnimationFrame(animId);
                setProgressMsg('Finalizing HD enhanced video...');
                setTimeout(() => {
                    if (recorder.state !== 'inactive') recorder.stop();
                }, 450);
            };

            videoEl.playbackRate = 1.0;
            videoEl.play().catch((err) => {
                document.body.removeChild(videoEl);
                setError('Failed to play video: ' + err.message);
                setStatus('error');
            });
        };
    };

    const reset = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (outputUrl) URL.revokeObjectURL(outputUrl);
        setFile(null);
        setPreviewUrl(null);
        setOutputUrl(null);
        setOutputBlob(null);
        setError(null);
        setStatus('idle');
    };

    const downloadVideo = () => {
        if (!outputUrl || !file) return;
        const a = document.createElement('a');
        a.href = outputUrl;
        const base = file.name.replace(/\.[^/.]+$/, '');
        a.download = `${base}-enhanced.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const isBusy = status === 'enhancing';

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Upload */}
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
                        onChange={(e) => {
                            const picked = e.target.files?.[0];
                            if (picked) handleFile(picked);
                            e.target.value = '';
                        }}
                    />
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#24CFA6]/10 flex items-center justify-center border border-[#24CFA6]/30">
                            <svg className="w-10 h-10 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Drop video for <span className="text-[#24CFA6]">Deep HD Pixel Clearance</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Enhance video clarity, contrast, color vibrancy, and frame detail in browser
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loaded Video Controls */}
            {file && (
                <>
                    {/* Source Preview */}
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                        <video
                            src={previewUrl ?? undefined}
                            controls
                            className="w-full max-h-64 object-contain"
                            style={{
                                filter: `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`,
                            }}
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

                    {/* Adjustments */}
                    <div className="bg-black/60 border border-[#24CFA6]/30 rounded-2xl p-6 backdrop-blur-md space-y-6 shadow-[0_0_30px_rgba(36,207,166,0.1)]">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                            <span>✨</span> Master Video Auto Enhance & Pixel Clearance
                        </h3>

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
                                <span className="text-[#24CFA6]">Ultra HD Clearance</span>
                            </div>
                        </div>

                        {/* Fine Tuning Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            {/* Brightness */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Brightness</span>
                                    <span className="text-[#24CFA6]">{settings.brightness}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="60"
                                    max="140"
                                    value={settings.brightness}
                                    onChange={(e) => setSettings({ ...settings, brightness: Number(e.target.value) })}
                                    className="w-full h-1.5 accent-[#24CFA6] bg-zinc-800 rounded-lg cursor-pointer"
                                />
                            </div>

                            {/* Contrast */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Contrast</span>
                                    <span className="text-[#24CFA6]">{settings.contrast}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="60"
                                    max="140"
                                    value={settings.contrast}
                                    onChange={(e) => setSettings({ ...settings, contrast: Number(e.target.value) })}
                                    className="w-full h-1.5 accent-[#24CFA6] bg-zinc-800 rounded-lg cursor-pointer"
                                />
                            </div>

                            {/* Saturation */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-gray-300">
                                    <span>Color Saturation</span>
                                    <span className="text-[#24CFA6]">{settings.saturation}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="180"
                                    value={settings.saturation}
                                    onChange={(e) => setSettings({ ...settings, saturation: Number(e.target.value) })}
                                    className="w-full h-1.5 accent-[#24CFA6] bg-zinc-800 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                            <span className="text-xs text-gray-400">File: <span className="text-white">{file.name}</span> ({formatBytes(file.size)})</span>
                            <button
                                onClick={startEnhancing}
                                disabled={isBusy}
                                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#24CFA6] text-black hover:bg-[#1fb894] shadow-[0_0_15px_rgba(36,207,166,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                ✨ Render HD Enhanced Video
                            </button>
                        </div>
                    </div>

                    {/* Progress */}
                    {isBusy && (
                        <div className="bg-black/60 border border-[#24CFA6]/20 rounded-2xl p-5 backdrop-blur-md space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#24CFA6] font-medium">{progressMsg}</span>
                                <span className="text-white font-bold">{progress}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full bg-[#24CFA6] rounded-full transition-all duration-300 shadow-[0_0_8px_#24CFA6]" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {status === 'error' && error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Done Output */}
                    {status === 'done' && outputUrl && (
                        <div className="bg-black/60 border border-[#24CFA6]/30 rounded-2xl p-6 backdrop-blur-md space-y-4">
                            <h3 className="text-[#24CFA6] font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#24CFA6]" />
                                Enhanced Video Ready!
                            </h3>
                            <video src={outputUrl} controls className="w-full max-h-64 rounded-xl border border-zinc-800 object-contain bg-black" />
                            <div className="flex justify-end gap-3">
                                <button onClick={reset} className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-900 text-gray-300 hover:bg-zinc-800 border border-zinc-800">Enhance Another</button>
                                <button onClick={downloadVideo} className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#24CFA6] text-black hover:bg-[#1fb894]">Download Enhanced Video</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default VideoEnhancer;
