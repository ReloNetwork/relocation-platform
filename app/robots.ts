import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.therelonetwork.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/client/',
          '/supplier/',
          '/partner-dashboard/',
        ],
      },
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'GoogleOther',
        ],
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
