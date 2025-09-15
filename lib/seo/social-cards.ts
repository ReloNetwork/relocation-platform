/**
 * Social Media Card Configuration for Luxury Branding
 * Twitter Cards, LinkedIn, and other social platform optimization
 */

export interface SocialCardConfig {
  title: string
  description: string
  image: string
  imageAlt: string
  type?: 'summary' | 'summary_large_image' | 'app' | 'player'
  creator?: string
  site?: string
}

export const defaultTwitterCard: SocialCardConfig = {
  title: 'Relo Network - London\'s Most Exclusive Relocation Network',
  description: 'Luxury executive relocations, Fortune 500 corporate services, and AI-powered property search. Join London\'s premier relocation network.',
  image: 'https://askrelo.com/twitter-card-luxury.png',
  imageAlt: 'Relo Network - London\'s Premier Relocation Partner',
  type: 'summary_large_image',
  creator: '@ReloNetwork',
  site: '@ReloNetwork'
}

export const socialCardsByPage = {
  homepage: {
    title: 'Relo Network - London\'s Most Exclusive Relocation Network',
    description: 'Join London\'s premier luxury relocation network. Executive relocations, corporate services, and AI-powered property search trusted by Fortune 500.',
    image: 'https://askrelo.com/social/homepage-luxury.png',
    imageAlt: 'Relo Network - Luxury London Relocations',
    type: 'summary_large_image' as const
  },
  corporate: {
    title: 'Corporate Executive Relocations - Fortune 500 Trusted',
    description: '94% success rate with C-suite executives. £47M+ documented ROI. London\'s premier corporate relocation partner for enterprise clients.',
    image: 'https://askrelo.com/social/corporate-executive.png',
    imageAlt: 'Corporate Executive Relocations by Relo Network',
    type: 'summary_large_image' as const
  },
  partners: {
    title: 'Join Relo Network Partner Program - Premium Opportunities',
    description: 'Generate £47k+ annually with our Lead Machine. Market Domination tier offers 650% ROI. Join London\'s most exclusive partner network.',
    image: 'https://askrelo.com/social/partners-network.png',
    imageAlt: 'Relo Network Partner Program',
    type: 'summary_large_image' as const
  },
  directory: {
    title: 'London Partner Directory - Vetted Service Providers',
    description: 'Access 200+ vetted service providers across 33 London boroughs. Premium, VIP access tiers available for comprehensive relocation support.',
    image: 'https://askrelo.com/social/directory-access.png',
    imageAlt: 'London Partner Directory by Relo Network',
    type: 'summary_large_image' as const
  },
  concierge: {
    title: 'Ask Relo AI Concierge - London Property Search',
    description: 'AI-powered London property search and relocation assistance. From £195/mo for quick start to £2,995 for executive service.',
    image: 'https://askrelo.com/social/ai-concierge.png',
    imageAlt: 'Ask Relo AI Concierge Service',
    type: 'summary_large_image' as const
  },
  waitlist: {
    title: 'Join the Waitlist - Exclusive Access to Relo Network',
    description: 'Be among the first to access London\'s most exclusive relocation network. Priority access, founding member rates, white-glove service.',
    image: 'https://askrelo.com/social/waitlist-exclusive.png',
    imageAlt: 'Join Relo Network Waitlist - Exclusive Access',
    type: 'summary_large_image' as const
  }
} as const

export const linkedInCardConfig = {
  title: 'Relo Network - London\'s Premier Executive Relocation Partner',
  description: 'Trusted by Fortune 500 companies for C-suite relocations. 94% success rate, £47M+ documented ROI. Join London\'s most exclusive relocation network.',
  image: 'https://askrelo.com/linkedin-card-professional.png',
  imageAlt: 'Relo Network - Professional Executive Relocations'
}

export const facebookCardConfig = {
  title: 'Relo Network - London\'s Most Exclusive Relocation Network',
  description: 'Luxury executive relocations and corporate services. AI-powered property search, vetted service providers, and white-glove concierge support.',
  image: 'https://askrelo.com/facebook-card-luxury.png',
  imageAlt: 'Relo Network - Luxury London Relocations'
}

export const generateSocialMetaTags = (config: SocialCardConfig) => [
  // Twitter Card tags
  { name: 'twitter:card', content: config.type || 'summary_large_image' },
  { name: 'twitter:site', content: config.site || '@ReloNetwork' },
  { name: 'twitter:creator', content: config.creator || '@ReloNetwork' },
  { name: 'twitter:title', content: config.title },
  { name: 'twitter:description', content: config.description },
  { name: 'twitter:image', content: config.image },
  { name: 'twitter:image:alt', content: config.imageAlt },
  
  // Open Graph tags (used by LinkedIn, Facebook, etc.)
  { property: 'og:title', content: config.title },
  { property: 'og:description', content: config.description },
  { property: 'og:image', content: config.image },
  { property: 'og:image:alt', content: config.imageAlt },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'en_GB' },
  
  // Additional social optimization
  { name: 'application-name', content: 'Relo Network' },
  { name: 'apple-mobile-web-app-title', content: 'Relo Network' },
  { name: 'msapplication-tooltip', content: 'London\'s Premier Relocation Network' }
]

export const socialBrandColors = {
  twitter: '#1DA1F2',
  linkedin: '#0A66C2', 
  facebook: '#1877F2',
  instagram: '#E4405F',
  whatsapp: '#25D366'
} as const

// Luxury brand messaging for social platforms
export const luxuryMessaging = {
  taglines: [
    'London\'s Most Exclusive Relocation Network',
    'Where Fortune 500 Companies Trust Their Relocations',
    'Luxury Relocations, Redefined',
    'The Art of Executive Relocation'
  ],
  valueProps: [
    '94% Success Rate with C-Suite Executives',
    '£47M+ Documented Client ROI',
    'Trusted by Fortune 500 Companies',
    '200+ Vetted Service Providers',
    'AI-Powered Property Search',
    'White-Glove Concierge Service'
  ],
  callToActions: [
    'Join London\'s Premier Network',
    'Experience Luxury Relocations', 
    'Get Executive-Level Service',
    'Access Exclusive Partners'
  ]
} as const