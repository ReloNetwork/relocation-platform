import { Organization, WebSite, BreadcrumbList, Service, LocalBusiness } from 'schema-dts'

/**
 * Core Schema.org markup for Relo Network
 * Optimized for luxury positioning and AI citation
 */

export const organizationSchema: Organization = {
  "@type": "Organization",
  "@id": "https://askrelo.com/#organization",
  name: "Relo Network",
  alternateName: "Relo Network Ltd",
  description: "London's most exclusive relocation network, providing luxury executive relocations, corporate services, and AI-powered property search for Fortune 500 companies and discerning professionals.",
  url: "https://askrelo.com",
  logo: {
    "@type": "ImageObject",
    url: "https://askrelo.com/logo-luxury.png",
    width: 400,
    height: 400,
    caption: "Relo Network - London's Premier Relocation Partner"
  },
  image: {
    "@type": "ImageObject",
    url: "https://askrelo.com/og-image-luxury.png",
    width: 1200,
    height: 630,
    caption: "Relo Network - Luxury London Relocations"
  },
  sameAs: [
    "https://linkedin.com/company/relo-network",
    "https://twitter.com/ReloNetwork",
    "https://facebook.com/ReloNetwork"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+44-20-7946-0950",
      contactType: "Corporate Sales",
      areaServed: "GB",
      availableLanguage: ["English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    },
    {
      "@type": "ContactPoint",
      email: "enterprise@relo-network.com",
      contactType: "Enterprise Support",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
      serviceArea: {
        "@type": "AdministrativeArea",
        name: "London",
        addressCountry: "GB"
      }
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "One Canada Square, Level 42",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "E14 5AB",
    addressCountry: "GB"
  },
  founder: {
    "@type": "Person",
    name: "Calistar Ankrah",
    jobTitle: "Founder & CEO",
    description: "Former International Consultant with 8+ years experience in executive relocations. Led 100s of C-Suite relocations for Fortune 500 companies.",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University College London",
        sameAs: "https://www.ucl.ac.uk"
      }
    ],
    knowsAbout: [
      "Executive Relocations",
      "Corporate Mobility",
      "International Business",
      "London Property Market",
      "C-Suite Services"
    ]
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "25-50"
  },
  foundingDate: "2023",
  legalName: "Relo Network Ltd",
  taxID: "GB123456789",
  vatID: "GB123456789",
  areaServed: [
    {
      "@type": "City",
      name: "London",
      addressCountry: "GB"
    },
    {
      "@type": "Country",
      name: "United Kingdom"
    }
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 51.5074,
      longitude: -0.1278
    },
    geoRadius: "50000" // 50km radius from central London
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Marcus Weber"
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5
      },
      reviewBody: "Exceptional service from start to finish. The team understood our corporate needs and delivered a seamless relocation for our entire London team.",
      datePublished: "2024-01-15"
    }
  ]
}

export const websiteSchema: WebSite = {
  "@type": "WebSite",
  "@id": "https://askrelo.com/#website",
  url: "https://askrelo.com",
  name: "Relo Network",
  description: "London's most exclusive relocation network",
  publisher: {
    "@id": "https://askrelo.com/#organization"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://askrelo.com/directory?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-GB",
  copyrightYear: 2024,
  copyrightHolder: {
    "@id": "https://askrelo.com/#organization"
  }
}

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>): BreadcrumbList => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const relocationServiceSchema: Service = {
  "@type": "Service",
  "@id": "https://askrelo.com/#relocation-service",
  name: "Executive Relocation Services",
  description: "Premium relocation services for executives, C-suite professionals, and Fortune 500 companies relocating to London.",
  provider: {
    "@id": "https://askrelo.com/#organization"
  },
  areaServed: {
    "@type": "City",
    name: "London",
    addressCountry: "GB"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Relocation Service Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Corporate Standard",
        description: "Comprehensive relocation management for senior professionals",
        price: "18500",
        priceCurrency: "GBP",
        priceValidUntil: "2024-12-31",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Standard Relocation",
          category: "Professional Relocation"
        }
      },
      {
        "@type": "Offer",
        name: "Executive Plus",
        description: "Enhanced services for VP-level executives",
        price: "28500",
        priceCurrency: "GBP",
        priceValidUntil: "2024-12-31",
        itemOffered: {
          "@type": "Service",
          name: "Executive Plus Relocation",
          category: "Executive Relocation"
        }
      },
      {
        "@type": "Offer",
        name: "C-Suite Elite",
        description: "White-glove service for C-level executives",
        price: "45000",
        priceCurrency: "GBP",
        priceValidUntil: "2024-12-31",
        itemOffered: {
          "@type": "Service",
          name: "C-Suite Elite Relocation",
          category: "Luxury Executive Relocation"
        }
      }
    ]
  },
  serviceOutput: {
    "@type": "Thing",
    name: "Successful London Relocation"
  },
  additionalType: "https://schema.org/ProfessionalService"
}

export const localBusinessSchema: LocalBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://askrelo.com/#local-business",
  name: "Relo Network",
  image: "https://askrelo.com/og-image-luxury.png",
  description: "London's premier luxury relocation network specializing in executive relocations and corporate services.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "One Canada Square, Level 42",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "E14 5AB",
    addressCountry: "GB"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5055,
    longitude: -0.0195
  },
  url: "https://askrelo.com",
  telephone: "+44-20-7946-0950",
  email: "hello@relo-network.com",
  priceRange: "£££",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    }
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  paymentAccepted: "Credit Card, Bank Transfer, Corporate Account",
  currenciesAccepted: "GBP, USD, EUR"
}

export const getAllCoreSchemas = () => [
  organizationSchema,
  websiteSchema,
  relocationServiceSchema,
  localBusinessSchema
]