'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-5 space-y-4">
            <h2 className="text-3xl font-bold text-[#24CFA6]">Something went wrong!</h2>
            <p className="text-gray-400 text-sm max-w-md text-center">
                {error.message || 'An unexpected error occurred.'}
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-2.5 bg-[#24CFA6] text-black font-semibold rounded-full hover:bg-[#1fb894] transition-all"
                >
                    Try again
                </button>
                <Link
                    href="/tools"
                    className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-full hover:bg-zinc-800 transition-all"
                >
                    Back to Tools
                </Link>
            </div>
        </div>
    );
}
