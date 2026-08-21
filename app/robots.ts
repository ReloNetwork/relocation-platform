import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const base = 'https://www.therelonetwork.com';
  const privateRoutes = [
    '/api/',
    '/account/',
    '/admin/',
    '/auth/',
    '/case/',
    '/checkout/',
    '/client/',
    '/dashboard/',
    '/login',
    '/onboarding/',
    '/partner-dashboard/',
    '/supplier/',
  ];
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privateRoutes,
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
        disallow: privateRoutes,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
