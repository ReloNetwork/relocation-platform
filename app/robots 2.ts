import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://askrelo.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '*.pdf',
          '/temp/'
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'PerplexityBot', 
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        crawlDelay: 2,
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}