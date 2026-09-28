import { MetadataRoute } from 'next';
import { getAllPostSlugs } from './lib/api';
import { TOOL_SEO_DATA } from './lib/tools/toolSeoData';

function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    return 'https://get-imagin-1j2q.vercel.app';
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getBaseUrl();
    const currentDate = new Date();

    // 1. Static Marketing & Landing Pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/works`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/Services`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/AboutUs`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/ContactUs`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/PrivacyPolicy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // 2. Case Studies & Portfolio Works
    const workSlugs = [
        'Cynetic',
        'Likhon',
        'MrFranky',
        'PascoPastry',
        'Pokruszone',
        'Transcend',
    ];
    const workPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
        url: `${baseUrl}/works/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // 3. Dynamic Tool Pages (High Search Volume & SEO Priority)
    const toolPages: MetadataRoute.Sitemap = Object.keys(TOOL_SEO_DATA).map((slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // 4. Dynamic Blog Pages
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const blogSlugs = getAllPostSlugs();
        blogPages = blogSlugs.map((slug) => ({
            url: `${baseUrl}/blogs/${slug}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.75,
        }));
    } catch {
        blogPages = [];
    }

    return [...staticPages, ...workPages, ...toolPages, ...blogPages];
}
