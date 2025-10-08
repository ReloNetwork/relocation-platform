import { Schema } from './types'

export const getAllDirectorySchemas = (): Schema[] => {
  return [
    // LocalBusiness schema for Relo Network Directory Operations
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Relo Network Directory",
      "alternateName": "London Relocation Directory",
      "url": "https://askrelo.com/directory",
      "logo": "https://askrelo.com/logo.png",
      "description": "London's definitive directory of vetted luxury relocation specialists covering all 33 boroughs. 200+ premium partners with 96.4% satisfaction rate for seamless relocations.",
      "foundingDate": "2024-01-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "City of London",
        "addressLocality": "London",
        "addressRegion": "London",
        "postalCode": "EC1V 2NX",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5055,
        "longitude": -0.0185
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+44-20-3105 9566",
          "contactType": "directory inquiries",
          "availableLanguage": "en",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "London",
          "geo": {
            "@type": "GeoShape",
            "description": "All 33 London boroughs including Zones 1-6"
          }
        },
        {
          "@type": "AdministrativeArea",
          "name": "Greater London",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.5074,
            "longitude": -0.1278
          }
        }
      ],
      "serviceArea": [
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 51.5074,
            "longitude": -0.1278
          },
          "geoRadius": "50000"
        }
      ],
      "openingHours": [
        "Mo-Fr 08:00-18:00",
        "Sa 09:00-17:00"
      ],
      "priceRange": "Free-£147",
      "currenciesAccepted": "GBP",
      "paymentAccepted": ["Credit Card", "Direct Debit", "PayPal"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1", 
        "ratingCount": "200"
      },
      "knowsAbout": [
        "London Relocation Services",
        "Luxury Property Specialists",
        "International Moving Services",
        "Prime Central London Areas",
        "Borough-specific Expertise"
      ]
    },

    // Service schema for Directory Access
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "London Relocation Directory Access",
      "serviceType": "Professional Directory Service",
      "provider": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Comprehensive directory of vetted luxury relocation specialists across all 33 London boroughs with advanced search, area guides, and premium partner access.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Essential Access",
          "description": "London area guides and market insights with basic partner preview",
          "price": "0",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "category": "Free Directory Access"
        },
        {
          "@type": "Offer",
          "name": "Premium Directory Access",
          "description": "Full directory access with direct contact details and advanced filtering",
          "price": "47",
          "priceCurrency": "GBP",
          "billingIncrement": "P1M",
          "availability": "https://schema.org/InStock",
          "category": "Premium Directory Access"
        },
        {
          "@type": "Offer",
          "name": "VIP Concierge Access",
          "description": "White-glove partner matching with personal concierge and negotiation support",
          "price": "147",
          "priceCurrency": "GBP", 
          "billingIncrement": "P1M",
          "availability": "https://schema.org/InStock",
          "category": "VIP Directory Service"
        }
      ],
      "areaServed": {
        "@type": "Place",
        "name": "London and Greater London",
        "geo": {
          "@type": "GeoShape",
          "description": "Complete coverage across all 33 London boroughs"
        }
      },
      "category": "Professional Directory Service"
    },

    // Place schemas for London Areas
    {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": "Mayfair & Belgravia",
      "description": "London's most prestigious addresses featuring luxury apartments, five-star hotels, and exclusive shopping. Perfect for UHNW individuals and C-suite executives.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5087,
        "longitude": -0.1527
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mayfair",
        "addressRegion": "London",
        "postalCode": "W1J",
        "addressCountry": "GB"
      },
      "containedInPlace": {
        "@type": "City",
        "name": "London"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Hyde Park Proximity",
          "value": "Adjacent"
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Transport Rating",
          "value": "5/5"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Amenity Rating", 
          "value": "5/5"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Average Weekly Rent",
          "value": "£4,500"
        },
        {
          "@type": "PropertyValue",
          "name": "Property Types",
          "value": "Luxury Apartments, Penthouses, Historic Mansions"
        }
      ]
    },

    {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": "Kensington & Chelsea",
      "description": "Royal borough combining cultural sophistication with family-friendly amenities. Home to world-renowned museums and excellent schools.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4994,
        "longitude": -0.1746
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kensington",
        "addressRegion": "London", 
        "postalCode": "SW7",
        "addressCountry": "GB"
      },
      "containedInPlace": {
        "@type": "City",
        "name": "London"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Museum District",
          "value": "Natural History & V&A Museums"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Transport Rating",
          "value": "4/5"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Amenity Rating",
          "value": "5/5"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Average Weekly Rent",
          "value": "£3,800"
        },
        {
          "@type": "PropertyValue", 
          "name": "Property Types",
          "value": "Victorian Houses, Garden Flats, Modern Developments"
        }
      ]
    },

    {
      "@context": "https://schema.org", 
      "@type": "Place",
      "name": "Canary Wharf",
      "description": "London's premier financial district with modern high-rise living and excellent transport links. Ideal for banking and finance professionals.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5055,
        "longitude": -0.0185
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Canary Wharf",
        "addressRegion": "London",
        "postalCode": "E14",
        "addressCountry": "GB"
      },
      "containedInPlace": {
        "@type": "City",
        "name": "London"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Financial District",
          "value": "Major Banking Hub"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Transport Rating",
          "value": "5/5"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Amenity Rating", 
          "value": "4/5"
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Average Weekly Rent",
          "value": "£2,200"
        },
        {
          "@type": "PropertyValue",
          "name": "Property Types", 
          "value": "High-rise Apartments, Waterfront Penthouses, New Builds"
        }
      ]
    },

    // LocalBusiness schemas for Featured Partners
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Cadogan Tate Fine Art",
      "description": "International fine art and luxury goods specialists with 40+ years experience. White-glove service for high-value collections, antiques, and sensitive items.",
      "url": "https://askrelo.com/partners/cadogan-tate",
      "telephone": "+44-20-8963-4815",
      "email": "relocations@cadogantate.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "144 Linthorpe Road",
        "addressLocality": "London",
        "postalCode": "SW16 2UZ",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4236,
        "longitude": -0.1357
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "London"
        },
        {
          "@type": "Place", 
          "name": "United Kingdom"
        },
        {
          "@type": "Place",
          "name": "International"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 51.5074,
          "longitude": -0.1278
        },
        "geoRadius": "50000"
      },
      "priceRange": "£££",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "127"
      },
      "category": ["Moving Services", "Fine Art Transport", "Luxury Relocations"],
      "knowsAbout": [
        "Fine Art Transport",
        "Antique Handling", 
        "Custom Crating",
        "Climate Control Storage"
      ]
    },

    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Cheval Collection",
      "description": "Luxury serviced apartments and residences in London's most prestigious locations. Fully furnished properties with hotel-style services.",
      "url": "https://askrelo.com/partners/cheval-collection",
      "telephone": "+44-20-7925-1525",
      "email": "reservations@chevalcollection.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4 Sloane Terrace", 
        "addressLocality": "Chelsea",
        "addressRegion": "London",
        "postalCode": "SW1X 9DG",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4948,
        "longitude": -0.1598
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "Mayfair"
        },
        {
          "@type": "Place",
          "name": "Kensington"
        },
        {
          "@type": "Place", 
          "name": "Chelsea"
        }
      ],
      "priceRange": "££££",
      "aggregateRating": {
        "@type": "AggregateRating", 
        "ratingValue": "4.8",
        "bestRating": "5",
        "ratingCount": "203"
      },
      "category": ["Serviced Apartments", "Corporate Housing", "Luxury Accommodation"],
      "knowsAbout": [
        "Serviced Apartments",
        "Corporate Housing",
        "Executive Suites",
        "Long-term Stays"
      ]
    },

    // FAQ Schema for Directory Questions
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What areas of London does the directory cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our directory provides comprehensive coverage across all 33 London boroughs from Zone 1 premium areas to suburban family neighborhoods. Each area profile includes transport ratings, property market data, postcode information, and detailed local amenities guide with specialist partners for every location."
          }
        },
        {
          "@type": "Question",
          "name": "How are partners vetted for the directory?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Our rigorous 4-stage vetting process includes: (1) Comprehensive business credentials check and insurance verification, (2) On-site service evaluation and quality management audit, (3) Direct client reference verification, (4) Ongoing 24/7 performance monitoring. Only 23% of applicants are accepted with 96.4% client satisfaction rate."
          }
        },
        {
          "@type": "Question",
          "name": "What makes this directory different from other London relocation resources?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're the only directory exclusively focused on luxury relocation specialists with comprehensive London market authority. Features include detailed area guides with postcodes, property market insights, verified partner ratings, advanced filtering by location and specialty, and continuous quality monitoring with performance guarantees."
          }
        },
        {
          "@type": "Question",
          "name": "How current is the London market data in the directory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All London area data, property market insights, and rental prices are updated monthly with real-time market analysis. We track 47 different metrics per area including transport ratings, amenity scores, property type availability, and average rental costs with quarterly trend analysis."
          }
        },
        {
          "@type": "Question",
          "name": "What support is available for directory users?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Support varies by access tier: Essential (free) users receive basic area guides, Premium users (£47/mo) get direct partner contact and advanced search, VIP Concierge users (£147/mo) receive personal matching service, negotiation assistance, and dedicated account management."
          }
        }
      ]
    },

    // Review Schema for Directory Performance
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Relo Network Directory",
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Mitchell"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Exceptional directory for luxury relocations. Found our perfect Kensington property specialist through their vetted network. The area guides were incredibly detailed and accurate.",
          "datePublished": "2024-08-20"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person", 
            "name": "David Chen"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5" 
          },
          "reviewBody": "VIP Concierge service was outstanding. Personal matching helped us find specialists for our Canary Wharf relocation. Saved us weeks of research with their curated network.",
          "datePublished": "2024-07-15"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "Investment Bank Executive"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Most comprehensive London relocation resource available. Premium directory access gave us direct contact to verified specialists across all 33 boroughs. Invaluable for our senior executive relocations.",
          "datePublished": "2024-09-01"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "200"
      }
    },

    // WebPage schema for the directory page
    {
      "@context": "https://schema.org", 
      "@type": "WebPage",
      "name": "London Relocation Directory - Premium Partners & Area Guides | Relo Network",
      "description": "London's definitive relocation directory covering all 33 boroughs. 200+ vetted luxury specialists, detailed area guides with postcodes, property market data, and premium partner network access.",
      "url": "https://askrelo.com/directory",
      "inLanguage": "en-GB",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Relo Network",
        "url": "https://askrelo.com"
      },
      "about": {
        "@type": "Thing",
        "name": "London Relocation Directory Services"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "London Relocators"
      },
      "keywords": [
        "London relocation directory",
        "luxury relocation specialists London",
        "London area guides postcodes",
        "premium moving services London",
        "London borough relocation experts",
        "vetted relocation partners London",
        "London property specialists directory", 
        "luxury London relocations"
      ],
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Relo Network Directory"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://askrelo.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Directory", 
            "item": "https://askrelo.com/directory"
          }
        ]
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2"]
      }
    },

    // ItemList schema for London Areas
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "London Areas Coverage",
      "description": "Comprehensive relocation services across all 33 London boroughs",
      "numberOfItems": 33,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Mayfair & Belgravia",
          "url": "https://askrelo.com/areas/mayfair-belgravia",
          "description": "W1J, SW1X - London's most prestigious addresses"
        },
        {
          "@type": "ListItem",
          "position": 2, 
          "name": "Kensington & Chelsea",
          "url": "https://askrelo.com/areas/kensington-chelsea",
          "description": "SW3, SW7, W8 - Royal borough with cultural sophistication"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Canary Wharf",
          "url": "https://askrelo.com/areas/canary-wharf", 
          "description": "E14, E1W - Premier financial district"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Marylebone & Fitzrovia",
          "url": "https://askrelo.com/areas/marylebone-fitzrovia",
          "description": "W1G, W1T, W1U - Village atmosphere in central London"
        }
      ]
    },

    // Organization schema for Network Partners
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Relo Network Partner Alliance",
      "alternateName": "London Premium Relocation Partners",
      "description": "Exclusive network of 200+ vetted luxury relocation specialists across London with rigorous quality standards and continuous performance monitoring.",
      "url": "https://askrelo.com/directory/partners",
      "foundingDate": "2024-01-01",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "200+"
      },
      "areaServed": {
        "@type": "Place",
        "name": "London",
        "geo": {
          "@type": "GeoShape",
          "description": "All 33 London boroughs and Greater London"
        }
      },
      "memberOf": {
        "@type": "ProfessionalService",
        "name": "British Association for Removers"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "ratingCount": "1247",
        "description": "Aggregate rating across all network partners"
      },
      "knowsAbout": [
        "Luxury Relocations London",
        "Premium Property Services",
        "Fine Art Transport",
        "Corporate Relocations", 
        "International Moving Services"
      ]
    }
  ]
}