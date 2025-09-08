/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://relocation-platform.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Since we don't have thousands of pages yet
  exclude: [
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/test/*',
    '/_*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/test/',
          '/_next/',
          '/*.json$',
          '/_*'
        ]
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/'
        ]
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/'
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/'
      }
    ],
    additionalSitemaps: [
      'https://relocation-platform.vercel.app/sitemap-blog.xml', // Future blog sitemap
      'https://relocation-platform.vercel.app/sitemap-areas.xml'  // Future London areas sitemap
    ]
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    const priorities = {
      '/': 1.0,
      '/partners': 0.9,
      '/corporate': 0.9,
      '/concierge': 0.9,
      '/directory': 0.8,
      '/join-waitlist': 0.7
    }

    const changeFreqs = {
      '/': 'daily',
      '/partners': 'weekly',
      '/corporate': 'weekly',
      '/concierge': 'weekly',
      '/directory': 'weekly',
      '/join-waitlist': 'monthly'
    }

    return {
      loc: path,
      changefreq: changeFreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'en-GB'
        },
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'x-default'
        }
      ]
    }
  },
  additionalPaths: async (config) => {
    // Add any dynamic paths that Next.js might not automatically discover
    return [
      await config.transform(config, '/partners/featured'),
      await config.transform(config, '/partners/exclusive'),
      await config.transform(config, '/corporate/roi-calculator'),
      await config.transform(config, '/concierge/demo'),
      await config.transform(config, '/directory/premium')
    ]
  }
}