import Link from "next/link";
import React from "react";
import ToolCard, { ToolData } from "../Components/tools/ToolCard"
import Header from "../Components/Header";


const TOOLS: ToolData[] = [
    {
        title: "Image Compressor",
        description: "Compress JPEG, PNG, and WebP images locally in your browser with no quality loss. Safe, fast, and completely private.",
        href: "/tools/image-compressor",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Image Format Converter",
        description: "Convert images between JPEG, PNG, WebP, BMP, and AVIF formats easily in your browser without uploading to any server.",
        href: "/tools/image-converter",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        )
    },
    {
        title: "Video Compressor",
        description: "Compress MP4, MOV, WebM and other videos directly in your browser — no uploads, 100% private and blazing fast.",
        href: "/tools/video-compressor",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Image Enhancer",
        description: "Sharpen images, boost colors, adjust brightness/contrast, and apply tone presets with real-time before/after preview.",
        href: "/tools/image-enhancer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    },
    {
        title: "Video Enhancer",
        description: "Enhance video lighting, color saturation, and contrast in real-time directly inside your browser using hardware acceleration.",
        href: "/tools/video-enhancer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    }
];

export default function ToolPage() {
    return (
        <>
            <Header />
            <main className="bg-black min-h-screen text-white  flex flex-col items-center gap-12 px-5">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                        Our Tools
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        A collection of utilities designed to help you work faster and better.
                    </p>
                </div>

                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                    {TOOLS.map((tool, index) => (
                        <ToolCard key={index} tool={tool} />
                    ))}
                </div>
            </main>
        </>
    )
}