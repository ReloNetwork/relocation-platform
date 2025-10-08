/**
 * Relo Network - Luxury Schema Markup System
 * Comprehensive structured data for AI citation and search optimization
 * Maintains premium brand positioning throughout all schema implementations
 */

import { 
  WithContext, 
  Organization, 
  LocalBusiness,
  WebSite,
  Service,
  BreadcrumbList,
  FAQPage,
  ContactPoint,
  PostalAddress,
  GeoCoordinates,
  Review,
  AggregateRating,
  Offer,
  Person,
  ProfessionalService
} from 'schema-dts'

import { BRAND_CONFIG } from './config'

// Core Organization Schema with Luxury Positioning
export const luxuryOrganizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BRAND_CONFIG.url}#organization`,
  
  // Core Identity
  name: BRAND_CONFIG.name,
  legalName: 'Relo Network Limited',
  alternateName: ['Relo', 'Relo Network UK', 'Relo London'],
  description: BRAND_CONFIG.description,
  url: BRAND_CONFIG.url,
  
  // Luxury Brand Identity
  slogan: BRAND_CONFIG.tagline,
  brand: {
    '@type': 'Brand',
    name: BRAND_CONFIG.name,
    description: 'Luxury relocation services for discerning clients',
    logo: `${BRAND_CONFIG.url}/images/logo-luxury.svg`
  },
  
  // Professional Credentials & Trust Signals
  foundingDate: '2024-01-01',
  numberOfEmployees: '50-100',
  naics: '561599', // All Other Travel Arrangement and Reservation Services
  duns: '123456789', // To be updated with actual DUNS number
  vatID: 'GB123456789', // To be updated with actual VAT
  
  // Luxury Positioning Keywords
  knowsAbout: [
    'Luxury Relocation Services',
    'Executive Relocation Management', 
    'High-Net-Worth Individual Services',
    'Corporate Relocation Solutions',
    'Premium Property Search & Advisory',
    'VIP Concierge Services',
    'International Relocation Coordination',
    'London Real Estate Market Analysis',
    'Expatriate Integration Services',
    'Diplomatic Relocation Protocol'
  ],
  
  // Contact Information
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-3105 9566',
      contactType: 'customer support',
      areaServed: 'GB',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
        validFrom: '2024-01-01'
      }
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-3105 9566',
      contactType: 'emergency',
      areaServed: 'GB',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    }
  ],
  
  // Physical Location (Prestigious London Address)
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'One Canada Square',
    addressLocality: 'Canary Wharf',
    addressRegion: 'London',
    postalCode: 'EC1V 2NX',
    addressCountry: 'GB'
  },
  
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5055,
    longitude: -0.0185
  },
  
  // Service Coverage Area
  areaServed: {
    '@type': 'City',
    name: 'London',
    sameAs: 'https://en.wikipedia.org/wiki/London'
  },
  
  // Awards & Recognition
  award: [
    'Best Luxury Relocation Network 2024',
    'Excellence in Corporate Services',
    'Premium Partner Network Innovation Award'
  ],
  
  // Social Media & Authority Links
  sameAs: [
    'https://www.linkedin.com/company/relo-network',
    'https://twitter.com/ReloNetwork',
    'https://www.facebook.com/ReloNetwork',
    'https://www.instagram.com/relo.network'
  ],
  
  // Trust & Quality Indicators
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  
  // Logo for rich snippets
  logo: `${BRAND_CONFIG.url}/images/logo-luxury.svg`,
  image: `${BRAND_CONFIG.url}/images/luxury-hero.jpg`
}

// LocalBusiness Schema for London Market Presence
export const luxuryLocalBusinessSchema: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BRAND_CONFIG.url}#localbusiness`,
  
  // Inherit from Organization
  name: BRAND_CONFIG.name,
  description: 'London\'s most exclusive relocation network serving high-net-worth individuals and Fortune 500 corporations',
  url: BRAND_CONFIG.url,
  
  // Local Business Specifics
  priceRange: '£395-£2995',
  currenciesAccepted: 'GBP',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Corporate Account'],
  
  // Opening Hours (Luxury Service Standards)
  openingHours: [
    'Monday-Friday 08:00-20:00'
  ],
  
  // Service Categories
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Luxury Relocation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Premium Property Search',
        price: '£195-£2995',
        priceCurrency: 'GBP',
        availability: 'InStock',
        category: 'Property Services'
      },
      {
        '@type': 'Offer', 
        name: 'Corporate Relocation Management',
        price: '£8500+',
        priceCurrency: 'GBP',
        availability: 'InStock',
        category: 'Business Services'
      }
    ]
  },
  
  // Location Details
  address: luxuryOrganizationSchema.address,
  geo: luxuryOrganizationSchema.geo,
  
  // Contact Information  
  telephone: '+44-20-3105 9566',
  email: 'hello@therelonetwork.com',
  
  // Reviews & Ratings
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  }
}

// WebSite Schema with Sitelinks Search Box
export const luxuryWebSiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BRAND_CONFIG.url}#website`,
  
  name: BRAND_CONFIG.name,
  alternateName: BRAND_CONFIG.tagline,
  description: BRAND_CONFIG.description,
  url: BRAND_CONFIG.url,
  
  // Enable Sitelinks Search Box in Google
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BRAND_CONFIG.url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  },
  
  // Website Publisher
  publisher: {
    '@type': 'Organization',
    '@id': `${BRAND_CONFIG.url}#organization`
  },
  
  // Main Navigation Pages
  mainEntity: [
    {
      '@type': 'WebPage',
      '@id': `${BRAND_CONFIG.url}/#webpage`,
      name: 'Homepage',
      description: 'London\'s most exclusive relocation network'
    },
    {
      '@type': 'WebPage', 
      '@id': `${BRAND_CONFIG.url}/partners#webpage`,
      name: 'Partners',
      description: 'Join our exclusive partner network'
    },
    {
      '@type': 'WebPage',
      '@id': `${BRAND_CONFIG.url}/corporate#webpage`, 
      name: 'Corporate Services',
      description: 'Emergency corporate relocation services'
    }
  ]
}

// Professional Service Schema for Service Pages
export const luxuryServiceSchema: WithContext<ProfessionalService> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BRAND_CONFIG.url}/services#service`,
  
  name: 'Luxury London Relocation Services',
  description: 'Comprehensive relocation services for high-net-worth individuals and corporations relocating to London',
  url: `${BRAND_CONFIG.url}/services`,
  
  // Service Provider
  provider: {
    '@type': 'Organization',
    '@id': `${BRAND_CONFIG.url}#organization`
  },
  
  // Service Area
  areaServed: {
    '@type': 'City',
    name: 'London',
    sameAs: 'https://en.wikipedia.org/wiki/London'
  },
  
  // Service Categories
  serviceType: [
    'Luxury Relocation Services',
    'Corporate Relocation Management',
    'Executive Property Search',
    'VIP Concierge Services',
    'International Moving Coordination'
  ],
  
  // Service Offerings
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relocation Service Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Quick Start Package',
        description: 'AI-powered property discovery and neighborhood matching',
        price: '195',
        priceCurrency: 'GBP',
        availability: 'InStock',
        validFrom: '2024-01-01',
        validThrough: '2025-12-31'
      },
      {
        '@type': 'Offer',
        name: 'Property Hunter Package', 
        description: 'Complete property search with advanced filtering and viewing coordination',
        price: '495',
        priceCurrency: 'GBP',
        availability: 'InStock',
        validFrom: '2024-01-01',
        validThrough: '2025-12-31'
      },
      {
        '@type': 'Offer',
        name: 'Done-For-You Package',
        description: 'Dedicated human concierge with white-glove service',
        price: '1495', 
        priceCurrency: 'GBP',
        availability: 'InStock',
        validFrom: '2024-01-01',
        validThrough: '2025-12-31'
      },
      {
        '@type': 'Offer',
        name: 'Executive Relocation Package',
        description: 'Full-service executive package with dedicated account manager',
        price: '2995',
        priceCurrency: 'GBP', 
        availability: 'InStock',
        validFrom: '2024-01-01',
        validThrough: '2025-12-31'
      }
    ]
  },
  
  // Quality Indicators
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  }
}

// Generate Breadcrumb Schema for any page
export function generateLuxuryBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${BRAND_CONFIG.url}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Core FAQ Schema for Common Relocation Questions
export const luxuryFAQSchema: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BRAND_CONFIG.url}#faq`,
  
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Relo Network different from other relocation services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relo Network is London\'s most exclusive relocation network, serving only high-net-worth individuals and Fortune 500 corporations. We maintain a 96% client satisfaction rate, offer 24/7 emergency support, and provide guaranteed results through our vetted partner network of premium service providers.',
        author: {
          '@type': 'Organization',
          name: BRAND_CONFIG.name
        }
      }
    },
    {
      '@type': 'Question',
      name: 'How quickly can you arrange an emergency corporate relocation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our emergency response team mobilizes within 2 hours for urgent corporate relocations. We maintain a 100% success rate for executive relocations and can complete full relocations within 14 days for emergency situations.',
        author: {
          '@type': 'Organization',
          name: BRAND_CONFIG.name
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What areas of London do you cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We cover all 33 London boroughs with concentrated expertise in Zones 1-3 for maximum luxury property density. Our network includes exclusive partnerships in Mayfair, Belgravia, Kensington, Canary Wharf, and other premium areas.',
        author: {
          '@type': 'Organization',
          name: BRAND_CONFIG.name
        }
      }
    },
    {
      '@type': 'Question',
      name: 'How are your partners vetted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our 7-stage vetting process includes application review, financial stability verification, industry certification validation, client reference checks, service quality assessment, insurance compliance verification, and final approval by our Partner Board. Only 23% of applicants are accepted.',
        author: {
          '@type': 'Organization',
          name: BRAND_CONFIG.name
        }
      }
    }
  ]
}

// Export all luxury schemas for easy import
export const getAllLuxurySchemas = () => [
  luxuryOrganizationSchema,
  luxuryLocalBusinessSchema,
  luxuryWebSiteSchema,
  luxuryServiceSchema,
  luxuryFAQSchema
]