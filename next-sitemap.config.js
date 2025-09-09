/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://askrelo.com',
  generateRobotsFile: true,
  sitemapSize: 5000,
  
  // Enhanced robots.txt for AI crawlers and luxury positioning
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/account/',
          '/_next/',
          '/static/',
          '/tmp/'
        ]
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 2
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 2
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/'
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        crawlDelay: 2
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/'
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/'
      }
    ],
    additionalSitemaps: [
      'https://askrelo.com/sitemap-partners.xml',
      'https://askrelo.com/sitemap-directory.xml',
      'https://askrelo.com/sitemap-areas.xml'
    ],
    additionalPaths: async () => [
      {
        loc: '/partners',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/corporate', 
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/directory',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        loc: '/concierge',
        changefreq: 'daily', 
        priority: 0.7,
        lastmod: new Date().toISOString()
      }
    ]
  },
  
  // Priority-based URL configuration
  transform: async (config, path) => {
    // High priority pages (luxury positioning)
    const highPriorityPages = [
      '/',
      '/partners',
      '/corporate',
      '/directory'
    ]
    
    // Medium priority pages
    const mediumPriorityPages = [
      '/concierge',
      '/join-waitlist'
    ]
    
    let priority = 0.5
    let changefreq = 'monthly'
    
    if (highPriorityPages.includes(path)) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (mediumPriorityPages.includes(path)) {
      priority = 0.7
      changefreq = 'weekly'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      
      // Enhanced meta for luxury positioning
      alternateRefs: [
        {
          href: `https://askrelo.com${path}`,
          hreflang: 'en-GB'
        },
        {
          href: `https://askrelo.com${path}`,
          hreflang: 'en'
        }
      ]
    }
  },
  
  // Exclude paths that shouldn't be indexed
  exclude: [
    '/api/*',
    '/admin/*',
    '/404',
    '/500',
    '/_next/*',
    '/test/*'
  ],
  
  // Additional sitemap configuration
  generateIndexSitemap: true,
  outDir: './apps/askrelo/public'
}