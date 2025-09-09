/**
 * Relo Network - Core Schema Markup
 * Enhanced structured data using schema-dts for maximum AI citation potential
 */

import { 
  Organization, 
  WebSite, 
  BreadcrumbList, 
  Service, 
  LocalBusiness,
  WithContext
} from 'schema-dts'

// Core organization schema for Relo Network
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://askrelo.com/#organization',
  name: 'Relo Network',
  legalName: 'Relo Network Limited',
  alternateName: ['Relo Network London', 'London Relocation Network', 'Relo'],
  description: 'London\'s premier luxury relocation network connecting discerning clients with vetted service providers across all 33 boroughs. Established 2024 with 200+ premium partners and 96.4% satisfaction rate.',
  
  // Founding and business information
  foundingDate: '2024-01-01',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      addressCountry: 'GB'
    }
  },
  
  // Visual identity
  url: 'https://askrelo.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://askrelo.com/images/relo-network-logo-luxury.png',
    width: 400,
    height: 200,
    caption: 'Relo Network - Luxury London Relocation Services'
  },
  image: [
    {
      '@type': 'ImageObject',
      url: 'https://askrelo.com/images/london-luxury-skyline.jpg',
      width: 1200,
      height: 630,
      caption: 'London Premium Relocation Services'
    }
  ],
  
  // Business identity
  slogan: 'Relocate to London. Effortlessly.',
  mission: 'To provide London\'s most sophisticated relocation network, ensuring every client\'s transition is seamless, luxurious, and stress-free through vetted partnerships and AI-powered concierge service.',
  
  // Contact information
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 King Street',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    postalCode: 'EC2V 8AU',
    addressCountry: 'GB'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-3807-0808',
      contactType: 'customer service',
      email: 'hello@askrelo.com',
      availableLanguage: ['English', 'French', 'German', 'Spanish'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59',
        description: '24/7 AI Concierge Service'
      }
    }
  ],
  
  // Performance metrics
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5.0,
    worstRating: 1.0
  },
  
  // Social proof
  sameAs: [
    'https://linkedin.com/company/relo-network',
    'https://twitter.com/ReloNetwork',
    'https://instagram.com/relo.network'
  ],
  
  // Business credentials
  memberOf: [
    {
      '@type': 'Organization',
      name: 'Association of Relocation Professionals (ARP)',
      url: 'https://arp-relocation.com'
    },
    {
      '@type': 'Organization', 
      name: 'London Chamber of Commerce',
      url: 'https://londonchamber.co.uk'
    }
  ]
}

// Website schema with sitelinks search box
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://askrelo.com/#website',
  name: 'Relo Network',
  alternateName: 'London\'s Premier Luxury Relocation Network',
  description: 'Access London\'s most exclusive relocation network with 200+ vetted service providers, AI concierge support, and seamless luxury relocations across all 33 boroughs.',
  url: 'https://askrelo.com',
  publisher: {
    '@id': 'https://askrelo.com/#organization'
  },
  
  // Enhanced search functionality
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://askrelo.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  ],
  
  // Site navigation
  hasPart: [
    {
      '@type': 'WebPage',
      '@id': 'https://askrelo.com/#homepage',
      name: 'Home - Relo Network',
      url: 'https://askrelo.com',
      description: 'London\'s premier luxury relocation network homepage'
    },
    {
      '@type': 'WebPage',
      '@id': 'https://askrelo.com/partners#webpage',
      name: 'Partners - Join Our Network',
      url: 'https://askrelo.com/partners',
      description: 'Join London\'s exclusive relocation partner network'
    },
    {
      '@type': 'WebPage',
      '@id': 'https://askrelo.com/corporate#webpage',
      name: 'Corporate - Executive Relocation Services',
      url: 'https://askrelo.com/corporate',
      description: 'Fortune 500-trusted corporate relocation services'
    },
    {
      '@type': 'WebPage',
      '@id': 'https://askrelo.com/directory#webpage',
      name: 'Directory - Service Provider Access',
      url: 'https://askrelo.com/directory',
      description: 'Access directory of vetted London service providers'
    }
  ]
}

// BreadcrumbList schema for navigation
export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
})

// Service schema for relocation services
export const serviceSchema: WithContext<Service> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://askrelo.com/#relocation-service',
  name: 'London Luxury Relocation Services',
  description: 'Comprehensive luxury relocation services connecting clients with vetted London service providers. AI-powered matching, white-glove concierge support, and seamless relocations across all 33 boroughs.',
  
  provider: {
    '@id': 'https://askrelo.com/#organization'
  },
  
  serviceType: 'Relocation and Concierge Services',
  category: [
    'Professional Services',
    'International Relocation', 
    'Corporate Services',
    'Concierge Services'
  ],
  
  // Service area coverage
  areaServed: [
    {
      '@type': 'City',
      name: 'London',
      sameAs: 'https://en.wikipedia.org/wiki/London'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Greater London',
      sameAs: 'https://en.wikipedia.org/wiki/Greater_London'
    }
  ],
  
  // Service features
  availableChannel: [
    {
      '@type': 'ServiceChannel',
      name: '24/7 AI Concierge',
      description: 'Industry-leading AI-powered concierge service with instant response times',
      availableLanguage: ['English', 'French', 'German', 'Spanish']
    },
    {
      '@type': 'ServiceChannel',
      name: 'Premium Partner Network',
      description: 'Access to 200+ vetted luxury service providers across London'
    }
  ],
  
  // Service offerings
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relo Network Service Access',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Essential Directory Access',
        description: 'Free access to basic partner listings and London area guides',
        price: '0',
        priceCurrency: 'GBP',
        availability: 'InStock'
      },
      {
        '@type': 'Offer', 
        name: 'Premium Directory Access',
        description: 'Full contact details, reviews, and advanced partner search',
        price: '47',
        priceCurrency: 'GBP',
        availability: 'InStock'
      },
      {
        '@type': 'Offer',
        name: 'VIP Concierge Service',
        description: 'Personal matching service with dedicated account management',
        price: '147',
        priceCurrency: 'GBP',
        availability: 'InStock'
      }
    ]
  },
  
  // Performance metrics
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5.0,
    worstRating: 1.0
  }
}

// LocalBusiness schema for London market focus
export const localBusinessSchema: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://askrelo.com/#local-business',
  name: 'Relo Network London',
  description: 'London\'s premier luxury relocation network with comprehensive coverage across all 33 London boroughs. Connecting discerning clients with vetted service providers.',
  
  // Location and contact
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 King Street',
    addressLocality: 'London',
    addressRegion: 'Greater London', 
    postalCode: 'EC2V 8AU',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5074,
    longitude: -0.1278
  },
  telephone: '+44-20-3807-0808',
  email: 'hello@askrelo.com',
  url: 'https://askrelo.com',
  
  // Business hours
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ],
    opens: '00:00',
    closes: '23:59',
    description: '24/7 AI Concierge Service Available'
  },
  
  // Business category and services
  '@id': 'https://askrelo.com/#organization',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5.0
  },
  
  // Service area
  areaServed: [
    'London',
    'Greater London',
    'City of London',
    'Westminster',
    'Camden',
    'Islington',
    'Hackney',
    'Tower Hamlets',
    'Greenwich',
    'Lewisham',
    'Southwark',
    'Lambeth',
    'Wandsworth',
    'Hammersmith and Fulham',
    'Kensington and Chelsea',
    'Brent',
    'Ealing',
    'Hounslow',
    'Richmond upon Thames',
    'Kingston upon Thames',
    'Merton',
    'Sutton',
    'Croydon',
    'Bromley',
    'Bexley',
    'Havering',
    'Barking and Dagenham',
    'Redbridge',
    'Newham',
    'Waltham Forest',
    'Haringey',
    'Enfield',
    'Barnet',
    'Harrow',
    'Hillingdon'
  ],
  
  priceRange: '£0-£147 (monthly access fees)',
  paymentAccepted: 'Credit Card, Bank Transfer, Corporate Billing'
}

// Export all core schemas
export const getAllCoreSchemas = () => [
  organizationSchema,
  websiteSchema,
  serviceSchema,
  localBusinessSchema
]

// Export schema creation utilities
export { createBreadcrumbSchema }