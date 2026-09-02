import Link from "next/link";
import React from "react";

export interface ToolData {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}
const ToolCard = ({ tool }: { tool: ToolData }) => {
    return (
        <Link
            href={tool.href}
            className="group relative flex flex-col justify-between p-8 rounded-3xl rounded-bl-none rounder-tr-none border border-[#24CFA6]/20 bg-black hover:bg-[#24CFA6]/5 hover:border-[#24CFA6]/90 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#24CFA6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-[#24CFA6]/30 group-hover:border-[#24CFA6] group-hover:shadow-[0_0_15px_rgba(36,207,166,0.5)] transition-all duration-300">
                    {tool.icon}
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#24CFA6] transition-colors">
                        {tool.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {tool.description}
                    </p>
                </div>
            </div>

            <div className="relative z-10 mt-8 flex items-center text-sm font-medium text-[#24CFA6]/70 group-hover:text-[#24CFA6] transition-colors">
                {/* <span>Open Tool</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg> */}


            </div>
        </Link>
    );
}





export default ToolCard;