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

const ImageToSvg = dynamic(() => import('./ImageToSvg'), {
    ssr: false,
    loading: () => <Spinner />,
});

const BillChecker = dynamic(() => import('./BillChecker'), {
    ssr: false,
    loading: () => <Spinner />,
});

const CLIENT_TOOLS: Record<string, React.ComponentType<{ slug?: string }>> = {
    // General Core Tools
    'image-compressor': ImageCompressor,
    'image-converter': ImageConverter,
    'video-compressor': VideoCompressor,
    'image-enhancer': ImageEnhancer,
    'video-enhancer': VideoEnhancer,
    'image-to-svg': ImageToSvg,

    // Dedicated Format-Specific Image Tools (High SEO Value)
    'png-to-svg': ImageToSvg,
    'jpg-to-svg': ImageToSvg,
    'webp-to-svg': ImageToSvg,
    'webp-to-png': ImageConverter,
    'png-to-webp': ImageConverter,
    'jpg-to-png': ImageConverter,
    'png-to-jpg': ImageConverter,
    'compress-jpeg': ImageCompressor,
    'compress-png': ImageCompressor,

    // Dedicated Format-Specific Video Tools (High SEO Value)
    'mp4-compressor': VideoCompressor,
    'mov-to-mp4': VideoCompressor,

    // Dedicated Pakistan Utility Bill Checkers & Duplicate Bill Tools
    'mepco-bill-checker': BillChecker,
    'lesco-bill-checker': BillChecker,
    'fesco-bill-checker': BillChecker,
    'iesco-bill-checker': BillChecker,
    'kelectric-bill-checker': BillChecker,
    'gepco-bill-checker': BillChecker,
    'pesco-bill-checker': BillChecker,
    'sngpl-bill-checker': BillChecker,
    'ssgc-bill-checker': BillChecker,
    'electricity-bill-checker': BillChecker,
    'gas-bill-checker': BillChecker,
};

export default function ToolClientContainer({ slug }: { slug: string }) {
    const ToolComponent = CLIENT_TOOLS[slug];
    if (!ToolComponent) return null;
    return <ToolComponent slug={slug} />;
}
