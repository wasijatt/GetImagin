'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Spinner = () => (
    <div className="w-full flex justify-center py-20">
        <div className="w-10 h-10 rounded-full border-2 border-[#24CFA6]/30 border-t-[#24CFA6] animate-spin" />
    </div>
);

const ImageCompressor = dynamic(() => import('./ImageCompressor'), {
    ssr: false,
    loading: () => <Spinner />,
});

const ImageConverter = dynamic(() => import('./ImageConverter'), {
    ssr: false,
    loading: () => <Spinner />,
});

const VideoCompressor = dynamic(() => import('./VideoCompressor'), {
    ssr: false,
    loading: () => <Spinner />,
});

const ImageEnhancer = dynamic(() => import('./ImageEnhancer'), {
    ssr: false,
    loading: () => <Spinner />,
});

const VideoEnhancer = dynamic(() => import('./VideoEnhancer'), {
    ssr: false,
    loading: () => <Spinner />,
});

const CLIENT_TOOLS: Record<string, React.ComponentType> = {
    'image-compressor': ImageCompressor,
    'image-converter': ImageConverter,
    'video-compressor': VideoCompressor,
    'image-enhancer': ImageEnhancer,
    'video-enhancer': VideoEnhancer,
};

export default function ToolClientContainer({ slug }: { slug: string }) {
    const ToolComponent = CLIENT_TOOLS[slug];
    if (!ToolComponent) return null;
    return <ToolComponent />;
}
