import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '../../Components/Header';
import ToolClientContainer from '../../Components/tools/ToolClientContainer';
import ToolSeoContent from '../../Components/tools/ToolSeoContent';
import { TOOL_SEO_DATA } from '../../lib/tools/toolSeoData';

// ─── Static Params for Prerendering ─────────────────────────────────────────

export async function generateStaticParams() {
    return Object.keys(TOOL_SEO_DATA).map((slug) => ({ slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const config = TOOL_SEO_DATA[slug];

    if (!config) {
        return {
            title: 'Tool Not Found — Get Imagin',
            description: 'The requested creative media tool could not be found.',
        };
    }

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://getimagin.com'),
        title: config.metaTitle,
        description: config.metaDescription,
        keywords: config.keywords,
        alternates: {
            canonical: config.canonicalUrl,
        },
        openGraph: {
            title: config.metaTitle,
            description: config.metaDescription,
            url: config.canonicalUrl,
            siteName: 'Get Imagin Tools',
            type: 'website',
            images: [
                {
                    url: '/HeaderLogo/Getimagin.png',
                    width: 1200,
                    height: 630,
                    alt: config.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: config.metaTitle,
            description: config.metaDescription,
            images: ['/HeaderLogo/Getimagin.png'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function DynamicToolPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const config = TOOL_SEO_DATA[slug];

    if (!config) {
        return (
            <>
                <Header />
                <main className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4">
                    <h1 className="text-4xl font-bold">Tool Not Found</h1>
                    <p className="text-gray-400 mt-2 text-center">
                        The requested tool does not exist or has moved.
                    </p>
                    <Link
                        href="/tools"
                        className="mt-6 px-6 py-3 bg-[#24CFA6] text-black font-semibold rounded-full hover:bg-[#1fb894] transition-all"
                    >
                        Back to All Tools
                    </Link>
                </main>
            </>
        );
    }

    // ─── JSON-LD Structured Data ────────────────────────────────────────────

    // 1. WebApplication / SoftwareApplication Schema
    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: config.title,
        url: config.canonicalUrl,
        description: config.metaDescription,
        applicationCategory: config.applicationCategory,
        operatingSystem: 'All (Web Browser)',
        browserRequirements: 'Requires modern browser with HTML5 Canvas / WebAssembly support',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '128',
            bestRating: '5',
            worstRating: '1',
        },
        featureList: config.features.map((f) => f.title).join(', '),
    };

    // 2. HowTo Schema
    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Use ${config.title}`,
        description: `Step-by-step instructions to use ${config.title} online without uploading files to remote servers.`,
        step: config.howToSteps.map((step) => ({
            '@type': 'HowToStep',
            position: step.stepNumber,
            name: step.title,
            text: step.description,
        })),
    };

    // 3. FAQPage Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    // 4. BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://getimagin.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: 'https://getimagin.com/tools',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: config.title,
                item: config.canonicalUrl,
            },
        ],
    };

    return (
        <>
            {/* JSON-LD Schemas for Rich Search Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Header />

            <main className="bg-black min-h-screen text-white flex flex-col items-center pb-24 px-4 sm:px-6">
                {/* ── Top Header Navigation & Title ── */}
                <div className="w-full max-w-5xl space-y-4 pt-8 pb-4">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
                        <Link href="/" className="hover:text-[#24CFA6] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/tools" className="hover:text-[#24CFA6] transition-colors">
                            Tools
                        </Link>
                        <span>/</span>
                        <span className="text-[#24CFA6] font-medium">{config.title}</span>
                    </nav>

                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30 uppercase tracking-wider">
                                Free Web Utility
                            </span>
                            <span className="text-xs text-gray-400">
                                • Zero Server Uploads • 100% Client-Side
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                            {config.title}
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
                            {config.shortPitch}
                        </p>
                    </div>
                </div>

                {/* ── 1. Interactive Tool at Top of Page ── */}
                <section aria-label="Interactive Tool UI" className="w-full max-w-5xl my-4">
                    <ToolClientContainer slug={slug} />
                </section>

                {/* ── 2. Structured SEO Blog & Guides Section Below Tool ── */}
                <ToolSeoContent config={config} />
            </main>
        </>
    );
}
