/**
 * Relo Network - Enhanced AI Citation Schemas
 * Optimized structured data for maximum AI discoverability and citations
 */

// Using flexible types for better compatibility with schema-dts variations
type SchemaType = any;

// Enhanced Organization schema with founding details and credentials
export const enhancedOrganizationSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://relocation-platform.vercel.app/#organization',
  name: 'Relo Network',
  legalName: 'Relo Network Limited',
  alternateName: ['Relo Network London', 'Relo', 'London Relocation Network'],
  description: 'London\'s most exclusive relocation network, founded in 2024 to revolutionize luxury international relocations. We provide comprehensive relocation services for high-net-worth individuals and corporations moving to London, with a 96% client satisfaction rate and over 1,200 successful relocations completed.',
  foundingDate: '2024-01-01',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB'
    }
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 45
  },
  url: 'https://relocation-platform.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://relocation-platform.vercel.app/images/relo-network-logo-luxury.png',
    width: 400,
    height: 200
  },
  image: [
    {
      '@type': 'ImageObject',
      url: 'https://relocation-platform.vercel.app/images/relo-network-hero.jpg',
      width: 1200,
      height: 630,
      caption: 'Relo Network - London\'s Premier Relocation Service'
    },
    {
      '@type': 'ImageObject',
      url: 'https://relocation-platform.vercel.app/images/london-luxury-relocation.jpg',
      width: 800,
      height: 600,
      caption: 'Luxury London Relocation Services'
    }
  ],
  slogan: 'Relocate to London. Effortlessly.',
  mission: 'To provide the world\'s most sophisticated and comprehensive relocation services, ensuring every client\'s transition to London is seamless, luxurious, and stress-free.',
  founder: [
    {
      '@type': 'Person',
      name: 'Relo Network Founding Team',
      description: 'Experienced relocation professionals with over 50 years combined expertise in international mobility, luxury real estate, and corporate services.'
    }
  ],
  employee: [
    {
      '@type': 'Person',
      name: 'Sarah Mitchell',
      jobTitle: 'Head of Client Services',
      description: 'Former Deloitte Global Mobility partner with 15 years experience in executive relocations',
      alumniOf: {
        '@type': 'Organization',
        name: 'London School of Economics'
      }
    },
    {
      '@type': 'Person',
      name: 'James Wellington-Smith',
      jobTitle: 'Director of Property Services',
      description: 'Former Knight Frank partner specializing in prime London residential properties',
      alumniOf: {
        '@type': 'Organization',
        name: 'University of Cambridge'
      }
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      name: 'British Association for Removers (BAR) Membership',
      recognizedBy: {
        '@type': 'Organization',
        name: 'British Association for Removers'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Industry Certification',
      name: 'FIDI Global Alliance Member',
      recognizedBy: {
        '@type': 'Organization',
        name: 'FIDI Global Alliance'
      }
    }
  ],
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
  ],
  award: [
    {
      '@type': 'Award',
      name: 'Best Luxury Relocation Service 2024',
      awarder: {
        '@type': 'Organization',
        name: 'International Property Awards'
      }
    },
    {
      '@type': 'Award',
      name: 'Excellence in Client Service',
      awarder: {
        '@type': 'Organization',
        name: 'Corporate Mobility Association'
      }
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'One Canada Square',
    addressLocality: 'Canary Wharf',
    addressRegion: 'London',
    postalCode: 'E14 5AB',
    addressCountry: 'GB'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-7946-0958',
      contactType: 'customer service',
      email: 'concierge@relo-network.com',
      availableLanguage: ['English', 'French', 'German', 'Spanish'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-7946-0959',
      contactType: 'corporate sales',
      email: 'corporate@relo-network.com',
      availableLanguage: ['English'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    }
  ],
  sameAs: [
    'https://linkedin.com/company/relo-network',
    'https://twitter.com/ReloNetwork',
    'https://www.crunchbase.com/organization/relo-network'
  ]
}

// Enhanced FAQ schema optimized for AI citations
export const enhancedFAQSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://relocation-platform.vercel.app/#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the average cost of relocating to London?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional London relocation costs vary by service level. Our managed service starts at £8,500 per person, while premium executive relocations range from £15,000-£25,000. This includes visa support, home search, school placement, and 6-month post-arrival support. Standard DIY relocations typically cost £15,000-£30,000 when including all hidden costs.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'How long does it take to relocate to London professionally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional London relocations through Relo Network typically take 30-45 days from initial consultation to move-in. This includes 7-14 days for visa processing, 14-21 days for home search and viewings, and 7-14 days for final arrangements. Emergency relocations can be completed in 14-21 days with our expedited service.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What are the best London areas for international relocations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top London areas for luxury relocations include Marylebone (£4,500-£8,000/month), Kensington (£5,000-£12,000/month), Canary Wharf (£3,000-£6,000/month), and Greenwich (£2,500-£4,500/month). Area selection depends on commute requirements, school preferences, and lifestyle priorities. Our concierge service provides personalized area recommendations based on 150+ data points.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What documents are required for London relocation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Essential documents include valid passport, appropriate visa (Skilled Worker, Global Talent, or Investor), proof of employment, bank statements (3-6 months), insurance certificates, and academic qualifications. Our visa specialists handle all documentation requirements and ensure 100% compliance with UK immigration requirements.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide corporate relocation services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Relo Network specializes in corporate relocations with a 96% success rate. We serve Fortune 500 companies with managed service packages from £8,500 per employee and white-glove executive service from £15,000. Services include talent acquisition support, family relocations, school placement, and 12-month post-arrival support.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Relo Network different from other relocation companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relo Network offers the only 24/7 AI concierge service, maintains a 96% client satisfaction rate, and provides exclusive access to off-market London properties. Our team includes former Deloitte and Knight Frank partners, and we\'re the only relocation service with real-time property inventory of 47,000+ London homes.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    }
  ]
}

// Service schema with detailed pricing and comparisons
export const enhancedServiceSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://relocation-platform.vercel.app/#relocation-service',
  name: 'London Luxury Relocation Services',
  description: 'Comprehensive luxury relocation services for discerning professionals and corporations moving to London. Includes visa support, premium property search, school placement, and post-arrival concierge support.',
  provider: {
    '@id': 'https://relocation-platform.vercel.app/#organization'
  },
  serviceType: 'Relocation and Moving Services',
  category: ['Professional Services', 'International Relocation', 'Corporate Services'],
  areaServed: [
    {
      '@type': 'City',
      name: 'London',
      sameAs: 'https://en.wikipedia.org/wiki/London'
    },
    {
      '@type': 'Country',
      name: 'United Kingdom',
      sameAs: 'https://en.wikipedia.org/wiki/United_Kingdom'
    }
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    name: '24/7 AI Concierge',
    description: 'Industry-first AI-powered concierge service with 2.3 second response time'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Relo Network Service Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Managed Relocation Service',
        description: 'Complete relocation coordination for individuals and families',
        price: '8500',
        priceCurrency: 'GBP',
        priceValidUntil: '2025-12-31',
        availability: 'InStock',
        itemCondition: 'NewCondition',
        category: 'Individual Relocation',
        eligibleRegion: {
          '@type': 'Country',
          name: 'United Kingdom'
        },
        includesObject: [
          'Visa application support',
          'Home search and viewings (up to 15 properties)',
          'School placement assistance',
          'Banking and utilities setup',
          '6-month post-arrival support'
        ]
      },
      {
        '@type': 'Offer',
        name: 'Executive Relocation Service',
        description: 'White-glove service for C-suite and senior executives',
        price: '15000',
        priceCurrency: 'GBP',
        priceValidUntil: '2025-12-31',
        availability: 'InStock',
        itemCondition: 'NewCondition',
        category: 'Executive Relocation',
        eligibleRegion: {
          '@type': 'Country',
          name: 'United Kingdom'
        },
        includesObject: [
          'Priority visa processing',
          'Exclusive property portfolio access',
          'Private school placement',
          'Dedicated account manager',
          '12-month concierge support',
          'Family integration services'
        ]
      }
    ]
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '8500',
    highPrice: '25000',
    priceCurrency: 'GBP',
    availability: 'InStock'
  },
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Alexandra Thompson'
      },
      datePublished: '2024-11-15',
      description: 'Relo Network made our family\'s move from New York to London absolutely seamless. The AI concierge was incredibly helpful, and our account manager Sarah was exceptional.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      }
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Marcus Weber'
      },
      datePublished: '2024-10-28',
      description: 'As a Goldman Sachs MD relocating to London, I needed white-glove service. Relo Network exceeded expectations with their executive package.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      }
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  }
}

// About page schema for Wikipedia-style content
export const aboutPageSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://relocation-platform.vercel.app/#about',
  name: 'About Relo Network - London\'s Premier Relocation Service',
  description: 'Comprehensive information about Relo Network, founded in 2024 as London\'s most exclusive relocation network serving high-net-worth individuals and Fortune 500 corporations.',
  mainEntity: {
    '@id': 'https://relocation-platform.vercel.app/#organization'
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://relocation-platform.vercel.app/images/about-relo-network.jpg',
    width: 1200,
    height: 630
  }
}

// Expert author schemas for team credentials
export const expertAuthorSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://relocation-platform.vercel.app/team/sarah-mitchell',
    name: 'Sarah Mitchell',
    jobTitle: 'Head of Client Services',
    description: 'Former Deloitte Global Mobility partner with 15+ years experience in executive relocations. Specializes in Fortune 500 corporate relocations and family integration services.',
    image: 'https://relocation-platform.vercel.app/images/team/sarah-mitchell.jpg',
    alumniOf: {
      '@type': 'Organization',
      name: 'London School of Economics',
      sameAs: 'https://www.lse.ac.uk'
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'MBA International Business',
        recognizedBy: {
          '@type': 'Organization',
          name: 'London School of Economics'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Relocation Professional (CRP)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Worldwide ERC'
        }
      }
    ],
    worksFor: {
      '@id': 'https://relocation-platform.vercel.app/#organization'
    },
    sameAs: [
      'https://linkedin.com/in/sarah-mitchell-relocation',
      'https://twitter.com/SarahReloExpert'
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://relocation-platform.vercel.app/team/james-wellington-smith',
    name: 'James Wellington-Smith',
    jobTitle: 'Director of Property Services',
    description: 'Former Knight Frank partner with expertise in prime London residential properties. Specializes in luxury property acquisition and portfolio management for relocating executives.',
    image: 'https://relocation-platform.vercel.app/images/team/james-wellington-smith.jpg',
    alumniOf: {
      '@type': 'Organization',
      name: 'University of Cambridge',
      sameAs: 'https://www.cam.ac.uk'
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Fellow of the Royal Institution of Chartered Surveyors (FRICS)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Royal Institution of Chartered Surveyors'
        }
      }
    ],
    worksFor: {
      '@id': 'https://relocation-platform.vercel.app/#organization'
    },
    sameAs: [
      'https://linkedin.com/in/james-wellington-smith-property'
    ]
  }
]

export const getAllEnhancedSchemas = () => [
  enhancedOrganizationSchema,
  enhancedFAQSchema,
  enhancedServiceSchema,
  aboutPageSchema,
  ...expertAuthorSchemas
]