/**
 * Relo Network - Structured Data Schema Configuration
 * Premium schema markup for maximum SEO and AI discoverability
 */

import { Thing, WithContext, Organization, LocalBusiness, WebSite, BreadcrumbList, Service, Offer, Review, AggregateRating } from 'schema-dts'

// Base organization schema with luxury positioning
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://relocation-platform.vercel.app/#organization',
  name: 'Relo Network',
  alternateName: 'Relo Network London',
  description: 'London\'s most exclusive relocation network providing luxury relocation services for discerning professionals and corporations.',
  url: 'https://relocation-platform.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://relocation-platform.vercel.app/images/logo-luxury.png',
    width: 400,
    height: 200
  },
  image: {
    '@type': 'ImageObject',
    url: 'https://relocation-platform.vercel.app/images/relo-network-hero.jpg',
    width: 1200,
    height: 630
  },
  foundingDate: '2024',
  founders: {
    '@type': 'Person',
    name: 'Relo Network Founding Team'
  },
  slogan: 'Relocate to London. Effortlessly.',
  brand: {
    '@type': 'Brand',
    name: 'Relo Network'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@relo-network.com',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://linkedin.com/company/relo-network',
    'https://twitter.com/ReloNetwork'
  ]
}

// Local business schema for London market dominance
export const localBusinessSchema: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://relocation-platform.vercel.app/#localbusiness',
  name: 'Relo Network',
  description: 'Premium relocation services for London. Vetted experts, elite services, and 24/7 AI concierge support.',
  url: 'https://relocation-platform.vercel.app',
  telephone: '+44-20-XXXX-XXXX',
  email: 'hello@relo-network.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'London Financial District',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5074,
    longitude: -0.1278
  },
  openingHours: 'Mo-Su 00:00-24:00',
  priceRange: '££££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Credit Card, Bank Transfer, Stripe',
  areaServed: {
    '@type': 'City',
    name: 'London',
    sameAs: 'https://en.wikipedia.org/wiki/London'
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278
    },
    geoRadius: 50000
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 96,
    bestRating: 5,
    worstRating: 1
  }
}

// Website schema with sitelinks search box
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://relocation-platform.vercel.app/#website',
  url: 'https://relocation-platform.vercel.app',
  name: 'Relo Network - London Relocation Services',
  description: 'London\'s most exclusive relocation network',
  publisher: {
    '@id': 'https://relocation-platform.vercel.app/#organization'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://relocation-platform.vercel.app/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'en-GB'
}

// Service schemas for different offerings
export const relocationServiceSchema: WithContext<Service> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://relocation-platform.vercel.app/#relocation-service',
  name: 'Luxury London Relocation Services',
  description: 'Comprehensive relocation services for high-net-worth individuals and corporations moving to London.',
  provider: {
    '@id': 'https://relocation-platform.vercel.app/#organization'
  },
  areaServed: {
    '@type': 'City',
    name: 'London'
  },
  serviceType: 'Relocation Services',
  category: 'Professional Services',
  offers: [
    {
      '@type': 'Offer',
      name: 'Managed Relocation Service',
      description: 'Full-service relocation coordination for individuals',
      price: '8500',
      priceCurrency: 'GBP',
      priceValidUntil: '2025-12-31',
      availability: 'InStock',
      validFrom: '2024-01-01',
      seller: {
        '@id': 'https://relocation-platform.vercel.app/#organization'
      }
    },
    {
      '@type': 'Offer',
      name: 'Enterprise Relocation Service',
      description: 'White-glove corporate relocation for executives',
      price: '15000',
      priceCurrency: 'GBP',
      priceValidUntil: '2025-12-31',
      availability: 'InStock',
      validFrom: '2024-01-01',
      seller: {
        '@id': 'https://relocation-platform.vercel.app/#organization'
      }
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relo Network Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Individual Relocation',
        description: 'Personal relocation services for individuals and families'
      },
      {
        '@type': 'OfferCatalog', 
        name: 'Corporate Relocation',
        description: 'Enterprise relocation solutions for businesses'
      },
      {
        '@type': 'OfferCatalog',
        name: 'AI Concierge Service',
        description: '24/7 AI-powered relocation assistance'
      }
    ]
  }
}

// Partner network service schema
export const partnerNetworkSchema: WithContext<Service> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://relocation-platform.vercel.app/#partner-network',
  name: 'London Relocation Partner Network',
  description: 'Exclusive partner network connecting vetted service providers with high-value London relocations.',
  provider: {
    '@id': 'https://relocation-platform.vercel.app/#organization'
  },
  serviceOutput: {
    '@type': 'Thing',
    name: 'Qualified Relocation Leads'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Featured Partner',
      description: 'Priority directory placement with advanced analytics',
      price: '375',
      priceCurrency: 'GBP',
      billingIncrement: 'Month',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: 1,
        unitText: 'monthly subscription'
      }
    }
  ]
}

// Breadcrumb schema generator
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

// FAQ schema for common relocation questions
export const faqSchema: WithContext<any> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does London relocation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional London relocations typically take 30-45 days with our managed service, ensuring all visa, housing, and settling requirements are met efficiently.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is included in your relocation service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our comprehensive service includes home search and viewings, school placement, visa support, banking setup, utility connections, and 6-month post-arrival support.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does London relocation cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our managed relocation service starts at £8,500 per employee. Enterprise white-glove service for executives begins at £15,000. All founding members receive 50% discount.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide corporate relocation services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in corporate relocations with a 95% success rate. We handle everything from talent acquisition support to executive family relocations.'
      }
    }
  ]
}

// Review schema for testimonials
export const generateReviewSchema = (reviews: Array<{
  author: string
  rating: number
  text: string
  date: string
}>): WithContext<any> => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Relo Network Relocation Services',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  },
  review: reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    datePublished: review.date,
    description: review.text,
    reviewRating: {
      '@type': 'Rating',
      bestRating: 5,
      ratingValue: review.rating,
      worstRating: 1
    }
  }))
})

// How-to schema for relocation process
export const howToRelocateSchema: WithContext<any> = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Relocate to London with Relo Network',
  description: 'Complete guide to relocating to London with professional support',
  image: 'https://relocation-platform.vercel.app/images/london-relocation-guide.jpg',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'GBP',
    value: '8500'
  },
  totalTime: 'P45D',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Initial Consultation',
      text: 'Schedule your complimentary consultation with our London relocation experts',
      url: 'https://relocation-platform.vercel.app/corporate'
    },
    {
      '@type': 'HowToStep',
      name: 'Visa & Legal Requirements',
      text: 'Our partners handle all visa applications and legal documentation required for your move',
      url: 'https://relocation-platform.vercel.app/directory'
    },
    {
      '@type': 'HowToStep',
      name: 'Home Search & Viewings',
      text: 'Access our exclusive property portfolio with accompanied viewings in your preferred London areas',
      url: 'https://relocation-platform.vercel.app/concierge'
    },
    {
      '@type': 'HowToStep',
      name: 'Post-Arrival Support',
      text: 'Comprehensive settling support including banking, schools, utilities, and local integration',
      url: 'https://relocation-platform.vercel.app/partners'
    }
  ]
}

export type SchemaType = 'organization' | 'localBusiness' | 'website' | 'service' | 'breadcrumb' | 'faq' | 'review' | 'howTo'

// Schema utility functions
export const getSchemaForPage = (page: string): WithContext<Thing>[] => {
  const baseSchemas = [organizationSchema, websiteSchema, localBusinessSchema]
  
  switch (page) {
    case '/':
      return [...baseSchemas, faqSchema, howToRelocateSchema]
    case '/partners':
      return [...baseSchemas, partnerNetworkSchema]
    case '/corporate':
      return [...baseSchemas, relocationServiceSchema]
    case '/concierge':
      return [...baseSchemas, relocationServiceSchema]
    case '/directory':
      return [...baseSchemas, partnerNetworkSchema]
    default:
      return baseSchemas
  }
}