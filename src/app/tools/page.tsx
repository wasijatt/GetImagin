import React from "react";
import { Metadata } from "next";
import Header from "../Components/Header";
import ToolsHub from "../Components/tools/ToolsHub";
import { ToolData } from "../Components/tools/ToolCard";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getimagin.com'),
    title: "Free Online Image & Video Creative Tools Suite — 100% Private | Get Imagin",
    description: "Explore our free collection of browser-based creative tools: Image Compressors, SVG Vectorizers, Format Converters, Video Compressors, and Media Enhancers. Fast, batch-ready, with zero server uploads.",
    keywords: [
        "free online tools",
        "image tools",
        "video tools",
        "image compressor",
        "png to svg converter",
        "jpg to svg",
        "webp to png converter",
        "video compressor",
        "mp4 compressor under 25mb",
        "image enhancer",
        "video enhancer",
        "client side tools",
        "browser creative tools"
    ],
    alternates: {
        canonical: "https://getimagin.com/tools",
    },
    openGraph: {
        title: "Free Online Image & Video Creative Tools Suite — Get Imagin",
        description: "Fast, 100% private in-browser tools to compress, convert, vectorize, and enhance images and videos with zero server uploads.",
        url: "https://getimagin.com/tools",
        siteName: "Get Imagin Creative Tools",
        images: [
            {
                url: "/HeaderLogo/Getimagin.png",
                width: 1200,
                height: 630,
                alt: "Get Imagin Tools Suite",
            },
        ],
    },
};

const TOOLS: ToolData[] = [
    // ── Image Tools ──────────────────────────────────────────────────────────
    {
        title: "Image Compressor",
        description: "Compress JPEG, PNG, and WebP images locally in your browser with zero quality loss. Fast, batch-ready, and 100% private.",
        href: "/tools/image-compressor",
        category: "image",
        badge: "Lossless Compression",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Image Format Converter",
        description: "Convert images between WebP, PNG, JPG, AVIF, and BMP formats in your browser without uploading to any server.",
        href: "/tools/image-converter",
        category: "image",
        badge: "Multi-Format",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        )
    },
    {
        title: "Image to SVG Vectorizer",
        description: "Vectorize PNG, JPG, WebP, and BMP raster graphics into infinitely scalable SVG paths with color quantization.",
        href: "/tools/image-to-svg",
        category: "image",
        badge: "Vector Graphic",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        )
    },
    {
        title: "PNG to SVG Converter",
        description: "Transform transparent PNG logos, illustrations, and icons into crisp, scalable SVG vector graphics.",
        href: "/tools/png-to-svg",
        category: "image",
        badge: "PNG Vectorizer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        )
    },
    {
        title: "JPG to SVG Converter",
        description: "Convert high-resolution JPEG photos and drawings into mathematical SVG vector paths with smart smoothing.",
        href: "/tools/jpg-to-svg",
        category: "image",
        badge: "JPG Vectorizer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "WebP to PNG Converter",
        description: "Convert next-gen WebP images back to lossless PNG with full alpha channel transparency support.",
        href: "/tools/webp-to-png",
        category: "image",
        badge: "Transparency Safe",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        )
    },
    {
        title: "PNG to WebP Converter",
        description: "Slash image file sizes up to 70% by converting heavy PNG files into lightweight, fast-loading WebP.",
        href: "/tools/png-to-webp",
        category: "image",
        badge: "Speed Optimizer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "JPG to PNG Converter",
        description: "Convert JPEG photography into uncompressed lossless PNG format ready for Photoshop and graphic design.",
        href: "/tools/jpg-to-png",
        category: "image",
        badge: "Format Switch",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "PNG to JPG Converter",
        description: "Convert transparent or heavy PNG images to universal JPG format with custom background color options.",
        href: "/tools/png-to-jpg",
        category: "image",
        badge: "Universal JPG",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        )
    },
    {
        title: "Compress JPEG Online",
        description: "Drastically reduce JPG/JPEG file sizes for websites, portfolios, and email attachments without blurriness.",
        href: "/tools/compress-jpeg",
        category: "image",
        badge: "JPEG Optimizer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    },
    {
        title: "Compress PNG Online",
        description: "Shrink massive transparent PNG assets up to 80% while retaining razor-sharp UI edges and text.",
        href: "/tools/compress-png",
        category: "image",
        badge: "PNG Optimizer",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Image Enhancer & Sharpener",
        description: "Sharpen soft images, boost colors, adjust brightness/contrast, and apply tone presets with real-time before/after preview.",
        href: "/tools/image-enhancer",
        category: "image",
        badge: "Photo Polish",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    },

    // ── Video Tools ──────────────────────────────────────────────────────────
    {
        title: "Video Compressor",
        description: "Compress MP4, MOV, WebM and other videos directly in your browser — no uploads, 100% private and blazing fast.",
        href: "/tools/video-compressor",
        category: "video",
        badge: "GPU Accelerated",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "MP4 Video Compressor",
        description: "Compress MP4 clips under 25MB and 8MB for Discord, WhatsApp, and Gmail attachments with instant bitrate control.",
        href: "/tools/mp4-compressor",
        category: "video",
        badge: "Discord / Gmail Under 25MB",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "MOV to MP4 Converter",
        description: "Convert Apple QuickTime MOV recordings into universally playable MP4 format with hardware acceleration.",
        href: "/tools/mov-to-mp4",
        category: "video",
        badge: "Universal Playback",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        )
    },
    {
        title: "Video Enhancer & Color Grader",
        description: "Enhance video lighting, color saturation, and contrast in real-time directly inside your browser using hardware acceleration.",
        href: "/tools/video-enhancer",
        category: "video",
        badge: "Lighting & Color",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },

    // ── Pakistan Utility Bill Checkers ────────────────────────────────────────
    {
        title: "MEPCO Online Bill Checker",
        description: "Check, view, and print Multan Electric Power Company (MEPCO) duplicate electricity bills online with reference number.",
        href: "/tools/mepco-bill-checker",
        category: "bills",
        badge: "Multan / South Punjab",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "LESCO Online Bill Checker",
        description: "Check Lahore Electric Supply Company (LESCO) duplicate electricity bill online. Supports Lahore, Kasur, Okara & Sheikhupura.",
        href: "/tools/lesco-bill-checker",
        category: "bills",
        badge: "Lahore / Kasur / Okara",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "FESCO Online Bill Checker",
        description: "Check Faisalabad Electric Supply Company (FESCO) duplicate electricity bill online. Covers Faisalabad, Sargodha, and Jhang.",
        href: "/tools/fesco-bill-checker",
        category: "bills",
        badge: "Faisalabad / Sargodha",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "IESCO Online Bill Checker",
        description: "Check Islamabad Electric Supply Company (IESCO) duplicate bill online for Islamabad, Rawalpindi, Chakwal, and Jhelum.",
        href: "/tools/iesco-bill-checker",
        category: "bills",
        badge: "Islamabad / Rawalpindi",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "K-Electric Online Bill Checker",
        description: "View and verify Karachi K-Electric duplicate electricity bill online using your 13-digit account number.",
        href: "/tools/kelectric-bill-checker",
        category: "bills",
        badge: "Karachi / Hub",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "GEPCO Online Bill Checker",
        description: "Check Gujranwala Electric Power Company (GEPCO) duplicate bill online for Gujranwala, Sialkot, and Gujrat.",
        href: "/tools/gepco-bill-checker",
        category: "bills",
        badge: "Gujranwala / Sialkot",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "PESCO Online Bill Checker",
        description: "Check Peshawar Electric Supply Company (PESCO) duplicate electricity bill online for Peshawar, Mardan, and KPK regions.",
        href: "/tools/pesco-bill-checker",
        category: "bills",
        badge: "Peshawar / KPK",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "SNGPL Sui Gas Bill Checker",
        description: "Check Sui Northern Gas Pipelines Limited (SNGPL) duplicate gas bill online with your 11-digit consumer number.",
        href: "/tools/sngpl-bill-checker",
        category: "bills",
        badge: "Punjab / KP / Islamabad",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
        )
    },
    {
        title: "SSGC Sui Gas Bill Checker",
        description: "Check Sui Southern Gas Company (SSGC) duplicate gas bill online with your 10-digit customer number for Sindh & Balochistan.",
        href: "/tools/ssgc-bill-checker",
        category: "bills",
        badge: "Sindh / Balochistan",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
        )
    },
    {
        title: "Electricity Bill & Unit Calculator",
        description: "Universal electricity duplicate bill check for all DISCOs with NEPRA tariff slab and unit cost calculator.",
        href: "/tools/electricity-bill-checker",
        category: "bills",
        badge: "All DISCOs + Calculator",
        popular: true,
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Sui Gas Bill Checker (Pakistan)",
        description: "Universal Sui Gas bill duplicate lookup for SNGPL & SSGC with consumer history and tariff slab estimator.",
        href: "/tools/gas-bill-checker",
        category: "bills",
        badge: "SNGPL & SSGC",
        icon: (
            <svg className="w-6 h-6 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
        )
    }
];

export default function ToolPage() {
    const hubSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Get Imagin Creative Media Tools Suite",
        "description": "Free browser-based media optimization tools for compressing, converting, vectorizing, and enhancing photos and videos.",
        "url": "https://getimagin.com/tools",
        "hasPart": TOOLS.map((t) => ({
            "@type": "WebApplication",
            "name": t.title,
            "description": t.description,
            "url": `https://getimagin.com${t.href}`,
            "operatingSystem": "All",
            "applicationCategory": "MultimediaApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
            />
            <Header />
            <main className="bg-black min-h-screen text-white flex flex-col items-center gap-10 px-4 sm:px-6 pb-24">
                {/* ─── Hero Header ─── */}
                <div className="text-center space-y-4 pt-8 max-w-3xl mx-auto">
                    <span className="px-3.5 py-1 bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 text-xs font-semibold rounded-full tracking-wider uppercase inline-block">
                        100% Free &amp; In-Browser
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white">
                        Free Creative Tools
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                        A curated suite of high-speed media utilities to compress, convert, vectorize, and enhance your digital content — 100% private with zero server uploads.
                    </p>
                </div>

                {/* ─── Highlights Bar ─── */}
                <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
                        <div className="text-2xl font-bold text-[#24CFA6]">0 Server Uploads</div>
                        <div className="text-xs text-gray-400 mt-1">100% Client-Side Private Processing</div>
                    </div>
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
                        <div className="text-2xl font-bold text-[#24CFA6]">Lightning Fast</div>
                        <div className="text-xs text-gray-400 mt-1">Hardware &amp; Canvas Accelerated</div>
                    </div>
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-4">
                        <div className="text-2xl font-bold text-[#24CFA6]">Free Forever</div>
                        <div className="text-xs text-gray-400 mt-1">No Sign-up, No Watermarks, No Limits</div>
                    </div>
                </div>

                {/* ─── Interactive Tabbed Tools Hub ─── */}
                <ToolsHub tools={TOOLS} />

                {/* ─── SEO Overview Guide Section ─── */}
                <div className="w-full max-w-5xl mt-10 bg-[#101010] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Why Choose GetImagin Free Browser Utilities?
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        Most online image and video converters require uploading confidential files to remote cloud servers, which exposes private data, consumes cellular bandwidth, and creates long processing queues. GetImagin redefines web utilities by running modern Canvas, WebGL, and client-side processing directly inside your browser memory.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-[#24CFA6]">Optimized for Core Web Vitals</h3>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                Compress and convert assets to modern WebP, AVIF, and clean SVG paths to accelerate your website load times, boost Google PageSpeed scores, and elevate SEO rankings.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-[#24CFA6]">Enterprise-Grade Privacy</h3>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                Confidential design drafts, client photography, and proprietary videos remain securely on your computer at all times with zero network transmission.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}