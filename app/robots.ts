import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';
export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
