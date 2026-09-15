import Link from "next/link";
import React from "react";

export interface ToolData {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    category?: 'image' | 'video' | 'bills';
    badge?: string;
    popular?: boolean;
}

const ToolCard = ({ tool }: { tool: ToolData }) => {
    return (
        <Link
            href={tool.href}
            className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-[#24CFA6]/20 bg-[#0d0d0d] hover:bg-[#131313] hover:border-[#24CFA6]/80 transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#24CFA6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center border border-[#24CFA6]/30 group-hover:border-[#24CFA6] group-hover:shadow-[0_0_15px_rgba(36,207,166,0.35)] transition-all duration-300">
                        {tool.icon}
                    </div>

                    <div className="flex items-center gap-2">
                        {tool.popular && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#24CFA6] text-black uppercase tracking-wider">
                                Popular
                            </span>
                        )}
                        {tool.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30">
                                {tool.badge}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-[#24CFA6] transition-colors">
                        {tool.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
                        {tool.description}
                    </p>
                </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#24CFA6]/80 group-hover:text-[#24CFA6] transition-colors">
                <span>Launch Tool</span>
                <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </Link>
    );
};

export default ToolCard;