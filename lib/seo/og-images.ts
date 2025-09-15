/**
 * Open Graph Image Generator for Luxury Branding
 * Maintains navy #0B1B2B and gold #C9A24A color scheme
 */

export interface OGImageOptions {
  title: string
  description?: string
  type?: 'website' | 'article' | 'profile'
  theme?: 'luxury' | 'corporate' | 'directory'
}

export const generateOGImageUrl = (options: OGImageOptions): string => {
  const { title, description, type = 'website', theme = 'luxury' } = options
  
  const params = new URLSearchParams({
    title: title.substring(0, 60), // Optimal length for OG titles
    description: description?.substring(0, 160) || '', // Optimal length for OG descriptions
    type,
    theme,
    brand: 'relo-network',
    colors: 'navy-gold' // Our signature color scheme
  })
  
  return `https://askrelo.com/api/og?${params.toString()}`
}

export const defaultOGImages = {
  homepage: {
    url: 'https://askrelo.com/og/homepage-luxury.png',
    width: 1200,
    height: 630,
    alt: 'Relo Network - London\'s Most Exclusive Relocation Network',
    type: 'image/png'
  },
  corporate: {
    url: 'https://askrelo.com/og/corporate-executive.png',
    width: 1200,
    height: 630,
    alt: 'Corporate Executive Relocations - Fortune 500 Trusted',
    type: 'image/png'
  },
  partners: {
    url: 'https://askrelo.com/og/partners-network.png',
    width: 1200,
    height: 630,
    alt: 'Join Relo Network - Premium Partner Program',
    type: 'image/png'
  },
  directory: {
    url: 'https://askrelo.com/og/directory-access.png',
    width: 1200,
    height: 630,
    alt: 'London Partner Directory - Vetted Service Providers',
    type: 'image/png'
  },
  concierge: {
    url: 'https://askrelo.com/og/ai-concierge.png',
    width: 1200,
    height: 630,
    alt: 'Ask Relo AI Concierge - London Property Search',
    type: 'image/png'
  }
} as const

export const socialImageSpecs = {
  openGraph: {
    width: 1200,
    height: 630,
    aspectRatio: '1.91:1'
  },
  twitter: {
    width: 1200,
    height: 675,
    aspectRatio: '16:9'
  },
  linkedin: {
    width: 1200,
    height: 627,
    aspectRatio: '1.91:1'
  },
  instagram: {
    width: 1080,
    height: 1080,
    aspectRatio: '1:1'
  }
} as const

export const luxuryBrandColors = {
  primary: '#0B1B2B',    // Deep navy - authority and trust
  accent: '#C9A24A',     // Luxury gold - premium positioning
  background: '#FAFAF9', // Sophisticated off-white
  text: {
    primary: '#0B1B2B',
    secondary: '#6B7280',
    inverse: '#FFFFFF'
  },
  gradients: {
    luxury: 'linear-gradient(135deg, #0B1B2B 0%, #C9A24A 100%)',
    corporate: 'linear-gradient(135deg, #0B1B2B 0%, #1E293B 100%)',
    gold: 'linear-gradient(135deg, #C9A24A 0%, #D4AF37 100%)'
  }
} as const