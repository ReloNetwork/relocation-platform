import { Schema } from './types'

export const getAllCorporateSchemas = (): Schema[] => {
  return [
    // Organization schema for Relo Network Corporate Services
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Relo Network Corporate Services",
      "alternateName": "Relo Network B2B Relocation",
      "url": "https://askrelo.com/corporate",
      "logo": "https://askrelo.com/logo.png",
      "description": "London's premier corporate relocation specialists for Fortune 500 companies and high-growth enterprises. 94% executive success rate with £47M+ in documented client ROI through our proprietary 5-phase methodology.",
      "foundingDate": "2024-01-01",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "City of London",
        "addressLocality": "Canary Wharf",
        "addressRegion": "London",
        "postalCode": "EC1V 2NX",
        "addressCountry": "GB"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+44-20-3105 9566",
          "contactType": "corporate sales",
          "availableLanguage": "en",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "email": "enterprise@therelonetwork.com",
          "contactType": "enterprise client services",
          "availableLanguage": "en",
          "hoursAvailable": "24/7"
        }
      ],
      "areaServed": [
        {
          "@type": "Place",
          "name": "London",
          "geo": {
            "@type": "GeoShape",
            "description": "All London boroughs and Greater London area"
          }
        },
        {
          "@type": "Place",
          "name": "United Kingdom",
          "description": "Nationwide corporate relocation services"
        }
      ],
      "memberOf": [
        {
          "@type": "ProfessionalService",
          "name": "Employee Relocation Council (ERC)"
        },
        {
          "@type": "ProfessionalService", 
          "name": "FIDI Global Alliance"
        }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "ISO 27001 Certification",
          "credentialCategory": "Information Security Management",
          "recognizedBy": {
            "@type": "Organization",
            "name": "International Organization for Standardization"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "BAR Accreditation",
          "credentialCategory": "Professional Relocation Services",
          "recognizedBy": {
            "@type": "Organization",
            "name": "British Association for Removers"
          }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "200",
        "description": "Corporate client satisfaction rating"
      },
      "knowsAbout": [
        "C-Suite Executive Relocations",
        "Global Mobility Management",
        "Fortune 500 Corporate Services",
        "International Business Relocations",
        "Executive Compensation Planning",
        "Cross-border Talent Mobility"
      ]
    },

    // ProfessionalService schema for Corporate Relocation Methodology
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Relo Corporate Methodology™",
      "serviceType": "Executive Relocation Management",
      "provider": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Proprietary 5-phase corporate relocation methodology ensuring 94% success rate for executive relocations with measurable ROI and comprehensive risk mitigation.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Corporate Standard Package",
          "description": "Comprehensive relocation management for senior professionals and managers",
          "price": "18500",
          "priceCurrency": "GBP",
          "category": "Corporate Relocation Services",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Standard Relocation",
            "serviceType": "Professional Relocation Management"
          }
        },
        {
          "@type": "Offer",
          "name": "Executive Plus Package", 
          "description": "Enhanced services designed for VP-level and senior executives",
          "price": "28500",
          "priceCurrency": "GBP",
          "category": "Executive Relocation Services",
          "itemOffered": {
            "@type": "Service",
            "name": "Executive Plus Relocation",
            "serviceType": "Executive Relocation Management"
          }
        },
        {
          "@type": "Offer",
          "name": "C-Suite Elite Package",
          "description": "White-glove service for C-level executives and board members",
          "price": "45000",
          "priceCurrency": "GBP",
          "category": "C-Suite Relocation Services",
          "itemOffered": {
            "@type": "Service",
            "name": "C-Suite Elite Relocation",
            "serviceType": "C-Suite Executive Services"
          }
        }
      ],
      "areaServed": {
        "@type": "Place",
        "name": "London and Greater London",
        "geo": {
          "@type": "GeoShape",
          "description": "Complete London metropolitan area coverage"
        }
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Fortune 500 Companies",
        "geographicArea": {
          "@type": "Place",
          "name": "Global"
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "Relo Corporate Methodology™"
      },
      "category": "Corporate Relocation Services"
    },

    // Service schemas for each corporate package
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate Standard Relocation Package",
      "serviceType": "Corporate Relocation Management",
      "provider": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Comprehensive relocation management for senior professionals and managers with dedicated support, housing assistance, and cultural integration.",
      "offers": {
        "@type": "Offer",
        "price": "18500",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "category": "Corporate Services",
        "description": "Per employee comprehensive relocation package"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Corporate Standard Features",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dedicated Relocation Manager",
              "description": "Personal point of contact throughout relocation process"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Housing Search and Negotiation",
              "description": "Professional property search and lease negotiation services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Immigration and Visa Assistance",
              "description": "Complete visa application and legal documentation support"
            }
          }
        ]
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Senior Professionals",
        "suggestedMinAge": 30,
        "requiredGender": "Any"
      },
      "category": "Professional Services"
    },

    {
      "@context": "https://schema.org",
      "@type": "Service", 
      "name": "Executive Plus Relocation Package",
      "serviceType": "Executive Relocation Management",
      "provider": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Enhanced relocation services designed for VP-level and senior executives with family support, premium housing, and extended integration assistance.",
      "offers": {
        "@type": "Offer",
        "price": "28500",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "category": "Executive Services",
        "description": "Per executive comprehensive relocation with family support"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Executive Plus Features", 
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Executive Housing Concierge",
              "description": "Premium property search with executive-level accommodations"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Spouse Career Transition Support",
              "description": "Professional career placement assistance for executive spouses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Private School Placement",
              "description": "Exclusive school search and enrollment for executive children"
            }
          }
        ]
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Senior Executives",
        "description": "VP-level and senior executive relocations"
      },
      "category": "Executive Services"
    },

    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "C-Suite Elite Relocation Package", 
      "serviceType": "C-Suite Executive Services",
      "provider": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "White-glove relocation service for C-level executives and board members with comprehensive security, personal staff arrangements, and 12-month integration program.",
      "offers": {
        "@type": "Offer",
        "price": "45000",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "category": "C-Suite Services",
        "description": "Premium C-suite relocation with comprehensive executive support"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "C-Suite Elite Features",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dedicated C-Suite Account Director",
              "description": "Senior account director exclusively managing C-suite relocations"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Security Consultation and Arrangements",
              "description": "Personal and residential security assessment and implementation"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Personal Staff Recruitment",
              "description": "Household staff and personal assistant recruitment services"
            }
          }
        ]
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "C-Suite Executives",
        "description": "CEO, CFO, COO, and board member relocations"
      },
      "category": "C-Suite Services"
    },

    // FAQ Schema for Corporate Questions
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Relo Corporate Methodology™?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Relo Corporate Methodology™ is our proprietary 5-phase approach to executive relocations: Strategic Assessment & Planning, Pre-Deployment Preparation, Managed Transition & Move, Integration & Settling Support, and Performance Monitoring & Optimization. This methodology ensures a 94% success rate with measurable ROI and comprehensive risk mitigation."
          }
        },
        {
          "@type": "Question", 
          "name": "What ROI can companies expect from corporate relocations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our corporate clients typically see ROI of 250-400% within the first year through improved retention (95% vs 73% industry average), faster time to productivity (6.2 weeks vs 12.5 weeks industry average), and reduced recruitment costs. Total documented client ROI exceeds £47M across our Fortune 500 partnerships."
          }
        },
        {
          "@type": "Question",
          "name": "Which industries do you specialize in for corporate relocations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We specialize in high-value relocations for Investment Banking, Technology, Consulting, Pharmaceuticals, Oil & Gas, and Telecommunications. Our industry-specific expertise includes regulatory compliance, compensation planning, and sector-specific integration requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What certifications and partnerships does Relo Network maintain?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Relo Network holds ISO 27001 certification for information security, BAR accreditation from the British Association for Removers, and is a premium member of both the Employee Relocation Council (ERC) and FIDI Global Alliance. These certifications ensure the highest standards of service and compliance."
          }
        },
        {
          "@type": "Question",
          "name": "How do you ensure successful integration for relocated executives?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our comprehensive integration program includes professional networking facilitation, spouse career transition support, children's school placement, cultural mentoring, and ongoing performance monitoring. We track success metrics for up to 12 months and provide additional support until integration objectives are achieved."
          }
        }
      ]
    },

    // Review Schema for Corporate Testimonials
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Relo Network Corporate Services",
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "James Mitchell"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Relocating 12 senior executives to establish our London European headquarters was a complex challenge. Relo Network's methodology and execution were flawless. 100% retention rate after 18 months with strong performance metrics.",
          "datePublished": "2024-08-15",
          "itemReviewed": {
            "@type": "Service",
            "name": "Executive Plus Relocation Package"
          }
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Organization",
            "name": "Technology Unicorn"
          },
          "reviewRating": {
            "@type": "Rating", 
            "ratingValue": "5"
          },
          "reviewBody": "Successfully relocated our entire 25-person senior engineering team to establish our European R&D center. Functional center operational 2 months ahead of schedule with 96% employee satisfaction scores.",
          "datePublished": "2024-07-20",
          "itemReviewed": {
            "@type": "Service",
            "name": "Corporate Standard Relocation Package"
          }
        },
        {
          "@type": "Review", 
          "author": {
            "@type": "Organization",
            "name": "Pharmaceutical Giant"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Post-merger C-suite integration completed in 3 months with zero regulatory issues. Their specialized pharmaceutical executive program exceeded all expectations. Merger synergies achieved 2 quarters ahead of projections.",
          "datePublished": "2024-06-10",
          "itemReviewed": {
            "@type": "Service",
            "name": "C-Suite Elite Relocation Package"
          }
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "200"
      }
    },

    // Local Business Schema for Corporate Contact
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Relo Network Corporate Headquarters",
      "description": "Corporate headquarters for London's premier executive relocation specialists serving Fortune 500 companies with comprehensive global mobility solutions.",
      "url": "https://askrelo.com/corporate",
      "telephone": "+44-20-3105 9566", 
      "email": "enterprise@therelonetwork.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "City of London",
        "addressLocality": "Canary Wharf",
        "addressRegion": "London", 
        "postalCode": "EC1V 2NX",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5055,
        "longitude": -0.0185
      },
      "openingHours": "Mo-Fr 08:00-18:00",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+44-20-3105 9566",
          "contactType": "corporate sales inquiry",
          "email": "enterprise@therelonetwork.com"
        }
      ],
      "sameAs": [
        "https://linkedin.com/company/relo-network/corporate",
        "https://twitter.com/ReloNetworkCorp"
      ]
    },

    // Person schemas for Executive Team
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "James Wellington-Smith",
      "jobTitle": "CEO & Managing Director",
      "worksFor": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "CEO and Managing Director of Relo Network with 20+ years experience in C-Suite executive relocations, global mobility strategy, and international business development.",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "MBA",
          "recognizedBy": {
            "@type": "Organization",
            "name": "University of Cambridge"
          }
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "FRICS",
          "credentialCategory": "Professional Certification"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "CRP",
          "credentialCategory": "Certified Relocation Professional"
        }
      ],
      "knowsAbout": [
        "C-Suite Executive Relocations",
        "Global Mobility Strategy", 
        "International Business Development",
        "Cross-border M&A Support"
      ]
    },

    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Victoria Ashford",
      "jobTitle": "Global Head of Corporate Services",
      "worksFor": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Global Head of Corporate Services with 15+ years experience managing Fortune 500 account relationships, global talent mobility, and executive compensation planning.",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "MSc",
          "recognizedBy": {
            "@type": "Organization", 
            "name": "London Business School"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "SHRM",
          "credentialCategory": "Strategic Human Resources Management"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "GPHR", 
          "credentialCategory": "Global Professional in Human Resources"
        }
      ],
      "knowsAbout": [
        "Fortune 500 Account Management",
        "Global Talent Mobility",
        "Executive Compensation Planning",
        "International HR Strategy"
      ]
    },

    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Marcus Chen",
      "jobTitle": "Director of Client Success",
      "worksFor": {
        "@type": "Organization",
        "name": "Relo Network"
      },
      "description": "Director of Client Success with PhD and 12+ years experience in process optimization, client success management, and cross-cultural integration programs.",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "PhD",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Imperial College London"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "PMP",
          "credentialCategory": "Project Management Professional"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "Six Sigma Black Belt",
          "credentialCategory": "Process Optimization"
        }
      ],
      "knowsAbout": [
        "Process Optimization",
        "Client Success Management", 
        "Cross-cultural Integration",
        "Performance Analytics"
      ]
    },

    // WebPage schema for the corporate page
    {
      "@context": "https://schema.org",
      "@type": "WebPage", 
      "name": "Corporate Executive Relocation Services - Fortune 500 Solutions | Relo Network",
      "description": "London's premier corporate relocation specialists for Fortune 500 companies. 94% executive success rate, £47M+ client ROI through our proprietary 5-phase methodology. C-Suite to senior management relocations.",
      "url": "https://askrelo.com/corporate",
      "inLanguage": "en-GB",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Relo Network",
        "url": "https://askrelo.com"
      },
      "about": {
        "@type": "Thing", 
        "name": "Corporate Executive Relocation Services"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Fortune 500 Companies"
      },
      "keywords": [
        "corporate relocation services",
        "executive relocations London", 
        "Fortune 500 relocation management",
        "C-suite executive moves",
        "global mobility solutions",
        "enterprise relocation services",
        "international executive relocations",
        "London corporate relocations"
      ],
      "mainEntity": {
        "@type": "ProfessionalService",
        "name": "Relo Network Corporate Services"
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
            "name": "Corporate",
            "item": "https://askrelo.com/corporate"
          }
        ]
      }
    }
  ]
}