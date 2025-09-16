/**
 * Relo Network - Luxury SEO Configuration
 * Sophisticated meta tag management maintaining premium brand positioning
 */

import { DefaultSeoProps } from 'next-seo'

// Luxury brand constants
export const BRAND_CONFIG = {
  name: 'Relo Network',
  tagline: 'Relocate to London. Effortlessly.',
  description: 'London\'s most exclusive relocation network. Vetted experts, elite services, and a 24/7 AI concierge - one accountable partner from landing to "I live here."',
  url: 'https://relocation-platform.vercel.app',
  logo: {
    url: '/images/logo-luxury.png',
    width: 1200,
    height: 630,
    alt: 'Relo Network - Luxury London Relocation Services'
  },
  colors: {
    primary: '#0B1B2B',  // Deep Navy
    accent: '#C9A24A',   // Premium Gold
    background: '#FAFAF9' // Warm White
  },
  social: {
    twitter: '@ReloNetwork',
    linkedin: 'relo-network'
  }
} as const

// Default SEO configuration with luxury positioning
export const DEFAULT_SEO: DefaultSeoProps = {
  titleTemplate: '%s | Relo Network - Luxury London Relocation',
  defaultTitle: 'Relo Network - Relocate to London. Effortlessly.',
  description: BRAND_CONFIG.description,
  canonical: BRAND_CONFIG.url,
  
  // Open Graph configuration with premium aesthetic
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BRAND_CONFIG.url,
    siteName: BRAND_CONFIG.name,
    title: BRAND_CONFIG.name + ' - ' + BRAND_CONFIG.tagline,
    description: BRAND_CONFIG.description,
    images: [
      {
        url: `${BRAND_CONFIG.url}/images/og-luxury-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Relo Network - London\'s Premier Relocation Network',
        type: 'image/jpeg'
      },
      {
        url: `${BRAND_CONFIG.url}/images/og-london-skyline.jpg`,
        width: 1200,
        height: 630,
        alt: 'London Skyline - Luxury Relocation Destination',
        type: 'image/jpeg'
      }
    ]
  },

  // Twitter Cards with premium branding
  twitter: {
    handle: BRAND_CONFIG.social.twitter,
    site: BRAND_CONFIG.social.twitter,
    cardType: 'summary_large_image'
  },

  // Additional meta tags for luxury positioning
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: BRAND_CONFIG.colors.primary
    },
    {
      name: 'msapplication-TileColor',
      content: BRAND_CONFIG.colors.primary
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    },
    {
      name: 'keywords',
      content: 'London relocation, luxury relocation services, corporate relocation, international moving London, expatriate services, premium relocation, London property search, visa services, relocation concierge, executive relocation'
    },
    {
      name: 'author',
      content: 'Relo Network'
    },
    {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    }
  ],

  // Link tags for enhanced SEO
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'canonical',
      href: BRAND_CONFIG.url
    }
  ]
}

// Page-specific SEO configurations maintaining luxury tone
export const PAGE_SEO_CONFIG = {
  home: {
    title: 'Relo Network - Relocate to London. Effortlessly.',
    description: 'London\'s most exclusive relocation network. Join our founding member programme and secure 50% off launch rates. Limited to 100 members.',
    keywords: 'luxury London relocation, exclusive relocation network, founding member programme, premium relocation services',
    ogTitle: 'London\'s Most Exclusive Relocation Network',
    ogDescription: 'Vetted experts, elite services, and a 24/7 AI concierge. Join our exclusive founding member programme.'
  },
  
  partners: {
    title: 'Join London\'s Premier Relocation Network',
    description: 'Connect with high-value London relocations. Featured Partnership at £375/month with 50% founding discount. Join 47 exclusive partners already earning revenue.',
    keywords: 'relocation partner network, London relocation leads, premium business opportunity, relocation services partnership',
    ogTitle: 'Premium Partner Network - Relo Network',
    ogDescription: 'Join London\'s most exclusive relocation partner network. Generate £2.3M+ revenue with vetted leads.'
  },

  corporate: {
    title: 'Corporate Relocation Solutions for Global Talent',
    description: 'White-glove corporate relocation services in London. Managed service from £8,500 per employee. 95% success rate, 30-day average completion.',
    keywords: 'corporate relocation London, employee relocation services, executive relocation, international talent mobility',
    ogTitle: 'Corporate Relocation Excellence',
    ogDescription: 'End employee relocation stress with our white-glove service. Everything from home finding to school placement.'
  },

  concierge: {
    title: '24/7 London Relocation Concierge - AI Assistant',
    description: 'Speak naturally to our AI concierge for instant London relocation advice. 2.3s response time, 47K+ properties, 98% accuracy. Professional, Free Trial, Concierge tiers.',
    keywords: 'AI relocation assistant, London property search, voice concierge, relocation AI, London neighborhoods',
    ogTitle: 'Your 24/7 London Relocation Concierge',
    ogDescription: 'AI-powered relocation assistant with instant expert advice on London properties and neighborhoods.'
  },

  directory: {
    title: 'Premium London Relocation Service Directory',
    description: 'Exclusive directory of 150+ vetted London relocation partners. Every provider is personally screened and monitored. Premium £47/month, VIP £147/month.',
    keywords: 'London relocation services, vetted relocation providers, premium service directory, London moving services',
    ogTitle: 'London\'s Premier Relocation Directory',
    ogDescription: 'Access exclusive directory of vetted, premium relocation service providers across London.'
  }
} as const

// SEO utility functions
export const generatePageTitle = (page: keyof typeof PAGE_SEO_CONFIG, customTitle?: string): string => {
  if (customTitle) return `${customTitle} | ${BRAND_CONFIG.name}`
  return PAGE_SEO_CONFIG[page].title
}

export const generateCanonicalUrl = (path: string): string => {
  return `${BRAND_CONFIG.url}${path === '/' ? '' : path}`
}

export const generateOpenGraphUrl = (path: string): string => {
  const baseUrl = BRAND_CONFIG.url
  const ogPath = path === '/' ? '/og-home.jpg' : `/og${path.replace(/\//g, '-')}.jpg`
  return `${baseUrl}/images${ogPath}`
}