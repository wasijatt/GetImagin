import { MetadataRoute } from 'next';
import { getAllPostSlugs } from './lib/api';
import { TOOL_SEO_DATA } from './lib/tools/toolSeoData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getimagin.com';
    const currentDate = new Date();

    // 1. Static Marketing & Landing Pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
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
            priority: 0.8,
        },
        {
            url: `${baseUrl}/Services`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
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

    // 2. Dynamic Tool Pages (High SEO Priority)
    const toolPages: MetadataRoute.Sitemap = Object.keys(TOOL_SEO_DATA).map((slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // 3. Dynamic Blog Pages
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
        // Fallback gracefully if directory is empty during certain build steps
        blogPages = [];
    }

    return [...staticPages, ...toolPages, ...blogPages];
}
