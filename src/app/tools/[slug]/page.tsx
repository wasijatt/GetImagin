import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Header from '../../Components/Header';

// ─── Dynamic imports with ssr:false ────────────────────────────────────────
// Keeping tool components out of the server bundle prevents webpack from
// trying to resolve their vendor chunks server-side (react-icons, etc.)
// and eliminates the "Cannot find module './vendor-chunks/…'" errors.

const Spinner = () => (
    <div className="w-full flex justify-center py-20">
        <div className="w-10 h-10 rounded-full border-2 border-[#24CFA6]/30 border-t-[#24CFA6] animate-spin" />
    </div>
);

const ImageCompressor = dynamic(
    () => import('../../Components/tools/ImageCompressor').then((m) => m.default ?? m),
    { ssr: true, loading: () => <Spinner /> }
);

const ImageConverter = dynamic(
    () => import('../../Components/tools/ImageConverter').then((m) => m.default ?? m),
    { ssr: true, loading: () => <Spinner /> }
);

const VideoCompressor = dynamic(
    () => import('../../Components/tools/VideoCompressor').then((m) => m.default ?? m),
    { ssr: true, loading: () => <Spinner /> }
);

const ImageEnhancer = dynamic(
    () => import('../../Components/tools/ImageEnhancer').then((m) => m.default ?? m),
    { ssr: true, loading: () => <Spinner /> }
);

const VideoEnhancer = dynamic(
    () => import('../../Components/tools/VideoEnhancer').then((m) => m.default ?? m),
    { ssr: true, loading: () => <Spinner /> }
);

// ─── Registry ───────────────────────────────────────────────────────────────
// Store metadata + a component reference — NOT pre-instantiated JSX.
// The component is rendered inside the page function body, not at module scope.

interface ToolConfig {
    title: string;
    description: string;
    Component: React.ComponentType;
}

const TOOL_REGISTRY: Record<string, ToolConfig> = {
    'image-compressor': {
        title: 'Image Compressor',
        description:
            'Compress JPEG, PNG, and WebP images locally in your browser with zero quality loss. Fast, private, and offline-capable.',
        Component: ImageCompressor,
    },
    'image-converter': {
        title: 'Image Format Converter',
        description:
            'Convert images between JPEG, PNG, WebP, BMP, and AVIF formats seamlessly directly in your browser.',
        Component: ImageConverter,
    },
    'video-compressor': {
        title: 'Video Compressor',
        description:
            'Compress MP4, MOV, WebM and other video formats directly in your browser — no uploads, 100% private.',
        Component: VideoCompressor,
    },
    'image-enhancer': {
        title: 'Image Enhancer',
        description:
            'Enhance photo clarity, brightness, contrast, and sharpness instantly in your browser with real-time before/after comparison.',
        Component: ImageEnhancer,
    },
    'video-enhancer': {
        title: 'Video Enhancer',
        description:
            'Enhance video lighting, contrast, and color vibrancy directly in your browser using hardware acceleration.',
        Component: VideoEnhancer,
    },
};

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = TOOL_REGISTRY[slug];
    if (!tool) return { title: 'Tool Not Found' };
    return {
        title: `${tool.title} — Get Imagin Tools`,
        description: tool.description,
    };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function DynamicToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = TOOL_REGISTRY[slug];

    if (!tool) {
        return (
            <>
                <Header />
                <main className="bg-black min-h-screen text-white flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">Tool Not Found</h1>
                    <p className="text-gray-400 mt-2">The requested tool does not exist.</p>
                    <Link
                        href="/tools"
                        className="mt-6 px-6 py-3 bg-[#24CFA6] text-black font-semibold rounded-full hover:bg-[#1fb894] transition-all"
                    >
                        Back to Tools
                    </Link>
                </main>
            </>
        );
    }

    const { Component } = tool;

    return (
        <>
            <Header />
            <main className="bg-black min-h-screen text-white flex flex-col items-center pb-20 px-5 space-y-10">
                {/* Back button & Title Header */}
                <div className="w-full max-w-5xl space-y-4 pt-10">
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 text-sm text-[#24CFA6] hover:underline"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Tools
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            {tool.title}
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            {tool.description}
                        </p>
                    </div>
                </div>

                {/* Tool Component — rendered client-side */}
                <div className="w-full max-w-5xl">
                    <Component />
                </div>
            </main>
        </>
    );
}
