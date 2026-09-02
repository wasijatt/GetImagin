import React from 'react';
import Link from 'next/link';
import Header from '../../Components/Header';
import ToolClientContainer from '../../Components/tools/ToolClientContainer';

// ─── Metadata & Static Tool Registry ─────────────────────────────────────────

interface ToolConfig {
    title: string;
    description: string;
}

const TOOL_REGISTRY: Record<string, ToolConfig> = {
    'image-compressor': {
        title: 'Image Compressor',
        description:
            'Compress JPEG, PNG, and WebP images locally in your browser with zero quality loss. Fast, private, and offline-capable.',
    },
    'image-converter': {
        title: 'Image Format Converter',
        description:
            'Convert images between JPEG, PNG, WebP, BMP, and AVIF formats seamlessly directly in your browser.',
    },
    'video-compressor': {
        title: 'Video Compressor',
        description:
            'Compress MP4, MOV, WebM and other video formats directly in your browser — no uploads, 100% private.',
    },
    'image-enhancer': {
        title: 'Image Enhancer',
        description:
            'Enhance photo clarity, brightness, contrast, and sharpness instantly in your browser with real-time before/after comparison.',
    },
    'video-enhancer': {
        title: 'Video Enhancer',
        description:
            'Enhance video lighting, contrast, and color vibrancy directly in your browser using hardware acceleration.',
    },
};

// ─── Static Params for Vercel Deployment Prerendering ──────────────────────

export async function generateStaticParams() {
    return Object.keys(TOOL_REGISTRY).map((slug) => ({ slug }));
}

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

// ─── Page Component ─────────────────────────────────────────────────────────

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

                {/* Tool Component Container — rendered client-side without SSR */}
                <div className="w-full max-w-5xl">
                    <ToolClientContainer slug={slug} />
                </div>
            </main>
        </>
    );
}
