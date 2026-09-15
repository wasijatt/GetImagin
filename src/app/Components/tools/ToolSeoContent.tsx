'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ToolSeoConfig, TOOL_SEO_DATA } from '../../lib/tools/toolSeoData';

interface ToolSeoContentProps {
    config: ToolSeoConfig;
}

export default function ToolSeoContent({ config }: ToolSeoContentProps) {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex((prev) => (prev === index ? null : index));
    };

    return (
        <article className="w-full max-w-5xl mx-auto mt-16 text-white space-y-16">
            {/* ─── 1. Key Value Proposition & Feature Highlights ──────────────── */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                        <span className="inline-block px-3 py-1 bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 text-xs font-semibold rounded-full tracking-wider uppercase">
                            {config.badgeText}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 tracking-tight text-white">
                            Why Choose {config.title}?
                        </h2>
                    </div>
                    <p className="text-sm text-gray-400 max-w-md">
                        {config.shortPitch}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {config.features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-[#121212]/80 border border-white/10 hover:border-[#24CFA6]/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(36,207,166,0.15)] group"
                        >
                            <div>
                                {feature.highlight && (
                                    <span className="text-[11px] font-bold text-[#24CFA6] tracking-wider uppercase">
                                        {feature.highlight}
                                    </span>
                                )}
                                <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-[#24CFA6] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 2. Step-by-Step How-To Guide ───────────────────────────────── */}
            <section className="bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-10 space-y-8">
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#24CFA6]">
                        Quick Tutorial
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        How to Use {config.title} in 4 Easy Steps
                    </h2>
                    <p className="text-sm text-gray-400">
                        Follow this quick guide to achieve optimal results directly in your web browser.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {config.howToSteps.map((step) => (
                        <div
                            key={step.stepNumber}
                            className="bg-[#181818] border border-white/5 hover:border-white/20 rounded-2xl p-5 flex gap-4 transition-all"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 font-bold flex items-center justify-center shrink-0 text-base">
                                {step.stepNumber}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white mb-1">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 3. In-Depth Comprehensive Guide / Blog Section ────────────── */}
            <section className="space-y-8">
                <div className="space-y-3">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                        {config.deepDiveArticle.introHeading}
                    </h2>
                    {config.deepDiveArticle.introParagraphs.map((para, i) => (
                        <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>

                {/* Technical architecture */}
                <div className="bg-[#141414] border-l-4 border-[#24CFA6] p-6 md:p-8 rounded-r-2xl space-y-3">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#24CFA6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {config.deepDiveArticle.technicalHeading}
                    </h3>
                    {config.deepDiveArticle.technicalParagraphs.map((para, i) => (
                        <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>

                {/* Use Cases Cards */}
                <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                        {config.deepDiveArticle.useCasesHeading}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {config.deepDiveArticle.useCases.map((uc, i) => (
                            <div key={i} className="bg-[#121212] border border-white/10 rounded-2xl p-5 space-y-2">
                                <h4 className="text-sm md:text-base font-semibold text-[#24CFA6]">
                                    {uc.title}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                                    {uc.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro Tips Box */}
                <div className="bg-[#10201c]/80 border border-[#24CFA6]/30 rounded-2xl p-6 space-y-3">
                    <h3 className="text-base font-bold text-[#24CFA6] flex items-center gap-2 uppercase tracking-wide">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {config.deepDiveArticle.proTipsHeading}
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                        {config.deepDiveArticle.proTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#24CFA6] font-bold">✓</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── 4. Comparison Table (GetImagin vs Cloud Uploaders) ─────────── */}
            <section className="space-y-6">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        {config.comparison.title}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {config.comparison.subtitle}
                    </p>
                </div>

                <div className="overflow-x-auto border border-white/10 rounded-2xl">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                        <thead>
                            <tr className="bg-[#181818] border-b border-white/10 text-gray-300">
                                <th className="py-3.5 px-4 font-semibold">Key Feature</th>
                                <th className="py-3.5 px-4 font-semibold text-[#24CFA6] bg-[#24CFA6]/10">
                                    GetImagin (Client-Side)
                                </th>
                                <th className="py-3.5 px-4 font-semibold text-gray-400">
                                    Traditional Cloud Sites
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-[#111]">
                            {config.comparison.rows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4 font-medium text-white">
                                        {row.feature}
                                    </td>
                                    <td className="py-3 px-4 text-[#24CFA6] font-medium bg-[#24CFA6]/5">
                                        {row.getImagin}
                                    </td>
                                    <td className="py-3 px-4 text-gray-400">
                                        {row.traditionalCloud}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ─── 5. Frequently Asked Questions (FAQ) ────────────────────────── */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#24CFA6]">
                        Got Questions?
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-400">
                        Everything you need to know about performance, privacy, and supported formats.
                    </p>
                </div>

                <div className="space-y-3">
                    {config.faqs.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-white hover:text-[#24CFA6] transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 shrink-0 text-[#24CFA6] transform transition-transform duration-200 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ─── 6. Related Tools Cross-Links (Internal Linking) ────────────── */}
            {config.relatedSlugs && config.relatedSlugs.length > 0 && (
                <section className="space-y-6 pt-6 border-t border-white/10">
                    <div className="space-y-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                            Explore More Free Creative Tools
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400">
                            Boost your media workflow with other fast, private, browser-based utilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {config.relatedSlugs.map((slug) => {
                            const related = TOOL_SEO_DATA[slug];
                            if (!related) return null;
                            return (
                                <Link
                                    key={slug}
                                    href={`/tools/${slug}`}
                                    className="bg-[#141414] border border-white/10 hover:border-[#24CFA6] rounded-2xl p-5 flex flex-col justify-between group transition-all"
                                >
                                    <div>
                                        <span className="text-[10px] text-[#24CFA6] font-bold uppercase tracking-wider">
                                            Free Tool
                                        </span>
                                        <h4 className="text-base font-bold text-white mt-1 group-hover:text-[#24CFA6] transition-colors">
                                            {related.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                            {related.shortPitch}
                                        </p>
                                    </div>
                                    <span className="text-xs text-[#24CFA6] font-semibold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Launch Tool →
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </article>
    );
}
