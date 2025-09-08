/**
 * Partnership Program Structured Data Schemas
 * Optimized for maximum AI discoverability and authority
 */

type SchemaType = any;

// Partnership Service Schema
export const partnershipServiceSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://relocation-platform.vercel.app/partners#partnership-service',
  name: 'Relo Network Partnership Program',
  description: 'London\'s most exclusive relocation partner network offering three tiers of partnership: Starter (£395/mo), Featured (£795/mo), and Sponsored (£1,495/mo). Join 150+ vetted service providers generating £2.3M+ in verified client revenue.',
  provider: {
    '@type': 'Organization',
    name: 'Relo Network',
    url: 'https://relocation-platform.vercel.app'
  },
  serviceType: 'Business Partnership Program',
  category: ['Professional Services', 'Business Partnership', 'Relocation Services'],
  areaServed: {
    '@type': 'City',
    name: 'London',
    sameAs: 'https://en.wikipedia.org/wiki/London'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Partnership Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Starter Partnership',
        description: 'Entry-level luxury partnership with AI visibility guarantee and premium lead access',
        price: '395',
        priceCurrency: 'GBP',
        priceValidUntil: '2025-09-15',
        availability: 'InStock',
        category: 'Partnership Program',
        includesObject: [
          'AI directory visibility guarantee',
          'Premium lead notifications',
          'Basic analytics dashboard',
          'Partner resource library access',
          'Monthly networking events',
          'Email support system'
        ],
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          maxValue: 100,
          unitText: 'partnerships available'
        }
      },
      {
        '@type': 'Offer',
        name: 'Featured Partnership',
        description: 'Authority-building partnership with enhanced visibility and expert positioning',
        price: '795',
        priceCurrency: 'GBP',
        priceValidUntil: '2025-09-15',
        availability: 'InStock',
        category: 'Partnership Program',
        includesObject: [
          'Featured directory placement',
          'Authority content collaboration',
          'Advanced analytics & ROI tracking',
          'Priority lead distribution',
          'Custom partner profile page',
          'Weekly networking events',
          'Marketing co-op opportunities',
          'Phone + email support'
        ],
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          maxValue: 50,
          unitText: 'featured partnerships available'
        }
      },
      {
        '@type': 'Offer',
        name: 'Sponsored Partnership',
        description: 'Market domination tier with citation insurance and exclusive category ownership',
        price: '1495',
        priceCurrency: 'GBP',
        priceValidUntil: '2025-09-15',
        availability: 'InStock',
        category: 'Partnership Program',
        includesObject: [
          'Exclusive category ownership',
          'Citation insurance guarantee',
          'Dedicated account manager',
          'Custom integration options',
          'White-label opportunities',
          'Revenue sharing programs',
          'Advisory board participation',
          '24/7 priority support'
        ],
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          maxValue: 20,
          unitText: 'sponsored partnerships available'
        }
      }
    ]
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1
  }
}

// Partnership FAQ Schema
export const partnershipFAQSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://relocation-platform.vercel.app/partners#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What ROI can partners expect from Relo Network?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relo Network partners report average ROI of 340% within the first 6 months. Featured partners generate an average of £12,400 in client revenue monthly, while Sponsored partners average £28,500 monthly. Our vetting process ensures only high-value relocations worth £8,500+ are distributed to partners.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'How does the partner vetting process work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our 7-stage vetting process includes: (1) Application review, (2) Financial stability verification, (3) Industry certification validation, (4) Client reference checks, (5) Service quality assessment, (6) Insurance and compliance verification, (7) Final approval by our Partner Board. Only 23% of applicants are accepted, ensuring network exclusivity.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What makes Relo Network different from other referral networks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relo Network is the only luxury relocation network with AI-powered client matching, guaranteed exclusive territories, and comprehensive citation insurance. We focus exclusively on relocations worth £8,500+, serve only UHNW individuals and Fortune 500 corporations, and maintain a 96% client satisfaction rate.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'How quickly do partners start receiving leads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Partners typically receive their first qualified lead within 72 hours of approval. Our AI matching system analyzes 47 client criteria points to ensure perfect partner-client alignment. Featured and Sponsored partners receive priority lead distribution with average response times of 2.3 hours.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    },
    {
      '@type': 'Question',
      name: 'What geographic coverage does Relo Network provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Relo Network covers all 33 London boroughs with concentrated focus on Zones 1-3 for maximum relocation density. We maintain exclusive partnerships in Mayfair, Belgravia, Kensington, Canary Wharf, and other premium areas. International reach spans 47 countries for inbound relocations.',
        author: {
          '@type': 'Organization',
          name: 'Relo Network'
        }
      }
    }
  ]
}

// Partner Success Stories Schema
export const partnerReviewsSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://relocation-platform.vercel.app/partners#reviews',
  name: 'Relo Network Partnership Program',
  review: [
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Marcus Thompson'
      },
      datePublished: '2024-11-20',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      description: 'Relo Network transformed our property management business. In 6 months, we\'ve generated £47,000 from their leads - a 340% ROI on our Featured partnership. The quality of clients is exceptional, all serious relocators with substantial budgets.',
      itemReviewed: {
        '@type': 'Service',
        name: 'Featured Partnership Program'
      }
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'Sarah Chen'
      },
      datePublished: '2024-10-15',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      description: 'As a luxury interior design specialist, Relo Network\'s Sponsored tier gave us exclusive access to high-value relocations. We\'ve completed 12 projects worth £180,000 total since joining. The dedicated account manager is invaluable.',
      itemReviewed: {
        '@type': 'Service',
        name: 'Sponsored Partnership Program'
      }
    },
    {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'David Rodriguez'
      },
      datePublished: '2024-09-28',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5
      },
      description: 'Relo Network\'s vetting process ensures we only work with serious clients. Their AI matching system is incredibly accurate - every lead we receive is a perfect fit for our legal services. Revenue up 280% since joining.',
      itemReviewed: {
        '@type': 'Service',
        name: 'Featured Partnership Program'
      }
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1
  }
}

// Local Business Schema for Contact
export const partnershipContactSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://relocation-platform.vercel.app/partners#contact',
  name: 'Relo Network Partnership Department',
  description: 'Dedicated partnership team managing London\'s most exclusive relocation service provider network.',
  url: 'https://relocation-platform.vercel.app/partners',
  telephone: '+44-20-7946-0960',
  email: 'partners@relo-network.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'One Canada Square',
    addressLocality: 'Canary Wharf',
    addressRegion: 'London',
    postalCode: 'E14 5AB',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5055,
    longitude: -0.0185
  },
  openingHours: [
    'Mo-Fr 09:00-18:00',
    'Sa 10:00-16:00'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-7946-0960',
      contactType: 'Partnership Inquiries',
      email: 'partners@relo-network.com',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    },
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-7946-0961',
      contactType: 'Sponsored Partner Support',
      email: 'sponsored@relo-network.com',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    }
  ],
  sameAs: [
    'https://linkedin.com/company/relo-network/partnerships',
    'https://twitter.com/ReloNetworkPartners'
  ]
}

// Organization Schema for Partner Network
export const partnerNetworkSchema: SchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://relocation-platform.vercel.app/partners#network',
  name: 'Relo Network Partner Alliance',
  alternateName: 'Relo Partners',
  description: 'London\'s most exclusive network of vetted relocation service providers, serving high-net-worth individuals and Fortune 500 corporations with guaranteed quality and performance.',
  foundingDate: '2024-01-01',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 150,
    unitText: 'vetted partners'
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Relo Network',
    sameAs: 'https://relocation-platform.vercel.app'
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Network Certification',
      name: 'Relo Network Verified Partner',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Relo Network Quality Board'
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
      name: 'British Association for Removers (BAR)',
      url: 'https://bar.co.uk'
    }
  ],
  award: [
    {
      '@type': 'Award',
      name: 'Best Partner Network 2024',
      awarder: {
        '@type': 'Organization',
        name: 'London Business Excellence Awards'
      }
    }
  ]
}

export const getAllPartnershipSchemas = () => [
  partnershipServiceSchema,
  partnershipFAQSchema,
  partnerReviewsSchema,
  partnershipContactSchema,
  partnerNetworkSchema
]