export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getimagin.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 