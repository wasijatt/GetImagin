'use client';

import React, { useState, useMemo } from 'react';
import ToolCard, { ToolData } from './ToolCard';

interface ToolsHubProps {
    tools: ToolData[];
}

export default function ToolsHub({ tools }: ToolsHubProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video' | 'bills'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Tokenized search helper
    const matchesQuery = (tool: ToolData, query: string): boolean => {
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) return true;

        const tokens = cleanQuery.split(/\s+/).filter(Boolean);
        const searchableText = [
            tool.title,
            tool.description,
            tool.badge || '',
            tool.href,
            tool.category || '',
        ]
            .join(' ')
            .toLowerCase();

        // Every token must be present in the searchable text
        return tokens.every((token) => searchableText.includes(token));
    };

    // Global matching counts for each category
    const categoryMatches = useMemo(() => {
        const allMatches = tools.filter((t) => matchesQuery(t, searchQuery));
        return {
            all: allMatches.length,
            image: allMatches.filter((t) => t.category === 'image').length,
            video: allMatches.filter((t) => t.category === 'video').length,
            bills: allMatches.filter((t) => t.category === 'bills').length,
        };
    }, [tools, searchQuery]);

    // Filtered tools based on active tab and search query
    const filteredTools = useMemo(() => {
        return tools.filter((tool) => {
            const matchesCategory =
                activeTab === 'all' ||
                (activeTab === 'image' && tool.category === 'image') ||
                (activeTab === 'video' && tool.category === 'video') ||
                (activeTab === 'bills' && tool.category === 'bills');

            return matchesCategory && matchesQuery(tool, searchQuery);
        });
    }, [tools, activeTab, searchQuery]);

    const isSearching = searchQuery.trim().length > 0;

    const quickKeywords = [
        { label: '⚡ MEPCO Bill', query: 'mepco' },
        { label: '⚡ LESCO Bill', query: 'lesco' },
        { label: '🔥 SNGPL Gas', query: 'sngpl' },
        { label: '⚡ K-Electric', query: 'kelectric' },
        { label: '🖼️ PNG to SVG', query: 'png svg' },
        { label: '🎬 MP4 Compress', query: 'mp4' },
        { label: '⚡ Tariff Calculator', query: 'calculator' },
    ];

    return (
        <div className="w-full max-w-5xl space-y-6">
            {/* ─── Top Control Bar: Tabs & Search ─────────────────────────────── */}
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl space-y-4 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => setActiveTab('all')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                                activeTab === 'all'
                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.35)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span>All Tools</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    activeTab === 'all'
                                        ? 'bg-black/20 text-black'
                                        : 'bg-white/10 text-gray-400'
                                }`}
                            >
                                {isSearching ? categoryMatches.all : tools.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('image')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                                activeTab === 'image'
                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.35)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Image Tools</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    activeTab === 'image'
                                        ? 'bg-black/20 text-black'
                                        : 'bg-white/10 text-gray-400'
                                }`}
                            >
                                {isSearching ? categoryMatches.image : tools.filter((t) => t.category === 'image').length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('video')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                                activeTab === 'video'
                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.35)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Video Tools</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    activeTab === 'video'
                                        ? 'bg-black/20 text-black'
                                        : 'bg-white/10 text-gray-400'
                                }`}
                            >
                                {isSearching ? categoryMatches.video : tools.filter((t) => t.category === 'video').length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('bills')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                                activeTab === 'bills'
                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_15px_rgba(36,207,166,0.35)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Bill Checkers</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    activeTab === 'bills'
                                        ? 'bg-black/20 text-black'
                                        : 'bg-white/10 text-gray-400'
                                }`}
                            >
                                {isSearching ? categoryMatches.bills : tools.filter((t) => t.category === 'bills').length}
                            </span>
                        </button>
                    </div>

                    {/* Prominent Aligned Search Input */}
                    <div className="relative w-full lg:w-80 shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg
                                className="w-4 h-4 text-[#24CFA6]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search tools (e.g. mepco, svg, mp4)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#181818] border border-white/15 focus:border-[#24CFA6] rounded-2xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#24CFA6] transition-all shadow-inner"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                                title="Clear search"
                            >
                                <div className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[10px] font-bold">
                                    ✕
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Keyword Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-white/5 scrollbar-none text-xs">
                    <span className="text-gray-500 text-[11px] font-medium shrink-0">Popular:</span>
                    <div className="flex items-center gap-1.5 flex-nowrap">
                        {quickKeywords.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => {
                                    setSearchQuery(item.query);
                                    setActiveTab('all');
                                }}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shrink-0 cursor-pointer border ${
                                    searchQuery.toLowerCase() === item.query.toLowerCase()
                                        ? 'bg-[#24CFA6]/20 border-[#24CFA6] text-[#24CFA6]'
                                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Search Status Bar (When actively searching) ─────────────── */}
            {isSearching && (
                <div className="flex items-center justify-between bg-[#141414] border border-white/10 px-4 py-2.5 rounded-2xl text-xs text-gray-300">
                    <div>
                        Found <strong className="text-[#24CFA6]">{filteredTools.length}</strong> {filteredTools.length === 1 ? 'tool' : 'tools'} matching &quot;{searchQuery}&quot; in{' '}
                        <span className="text-white font-medium capitalize">
                            {activeTab === 'all' ? 'All Tools' : activeTab === 'image' ? 'Image Tools' : activeTab === 'video' ? 'Video Tools' : 'Bill Checkers'}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            setActiveTab('all');
                        }}
                        className="text-[#24CFA6] hover:underline font-semibold cursor-pointer"
                    >
                        Clear Filter
                    </button>
                </div>
            )}

            {/* ─── Tool Cards Grid ────────────────────────────────────────────── */}
            {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {filteredTools.map((tool, index) => (
                        <ToolCard key={tool.href || index} tool={tool} />
                    ))}
                </div>
            ) : (
                /* ─── Smart No Results State with Cross-Category Suggestions ─── */
                <div className="text-center py-16 bg-[#111111] border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#24CFA6]/10 border border-[#24CFA6]/20 flex items-center justify-center text-[#24CFA6]">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white">No tools found</h3>
                        <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
                            No tools matched &quot;<span className="text-white font-medium">{searchQuery}</span>&quot; in{' '}
                            {activeTab === 'all'
                                ? 'the entire suite'
                                : activeTab === 'image'
                                ? 'Image Tools'
                                : activeTab === 'video'
                                ? 'Video Tools'
                                : 'Bill Checkers'}.
                        </p>
                    </div>

                    {/* If matches exist in other tabs, show instant shortcut */}
                    {categoryMatches.all > 0 && activeTab !== 'all' && (
                        <div className="pt-2">
                            <p className="text-xs text-gray-400 mb-3">
                                Good news! Found <span className="text-[#24CFA6] font-bold">{categoryMatches.all} results</span> in other categories:
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('all')}
                                    className="px-4 py-2 bg-[#24CFA6] text-black text-xs font-bold rounded-xl hover:bg-[#1fb894] transition-all cursor-pointer shadow-[0_0_12px_rgba(36,207,166,0.3)]"
                                >
                                    View All ({categoryMatches.all}) Results
                                </button>
                                {categoryMatches.bills > 0 && activeTab !== 'bills' && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('bills')}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                    >
                                        View Bill Checkers ({categoryMatches.bills})
                                    </button>
                                )}
                                {categoryMatches.image > 0 && activeTab !== 'image' && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('image')}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                    >
                                        View Image Tools ({categoryMatches.image})
                                    </button>
                                )}
                                {categoryMatches.video > 0 && activeTab !== 'video' && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('video')}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                    >
                                        View Video Tools ({categoryMatches.video})
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {categoryMatches.all === 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setActiveTab('all');
                            }}
                            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer"
                        >
                            Reset Search &amp; Show All Tools
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
