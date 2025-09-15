/**
 * Relo Network - Luxury SEO Provider Component
 * Comprehensive SEO management maintaining premium brand positioning
 * Integrates structured data, meta tags, and luxury branding
 */

'use client'

import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { BRAND_CONFIG, PAGE_SEO_CONFIG, generateCanonicalUrl, generateOpenGraphUrl } from '../../lib/seo/config'
import { 
  getAllLuxurySchemas, 
  generateLuxuryBreadcrumbSchema,
  luxuryOrganizationSchema,
  luxuryLocalBusinessSchema,
  luxuryWebSiteSchema,
  luxuryFAQSchema
} from '../../lib/seo/luxury-schemas'

interface LuxurySEOProps {
  page?: keyof typeof PAGE_SEO_CONFIG
  title?: string
  description?: string
  keywords?: string
  path: string
  breadcrumbs?: Array<{name: string, url: string}>
  customSchemas?: any[]
  noIndex?: boolean
  children?: React.ReactNode
}

export default function LuxurySEOProvider({
  page,
  title,
  description,
  keywords,
  path,
  breadcrumbs = [],
  customSchemas = [],
  noIndex = false,
  children
}: LuxurySEOProps) {
  
  // Get page configuration or use defaults
  const pageConfig = page ? PAGE_SEO_CONFIG[page] : null
  const finalTitle = title || pageConfig?.title || `${BRAND_CONFIG.name} - ${BRAND_CONFIG.tagline}`
  const finalDescription = description || pageConfig?.description || BRAND_CONFIG.description
  const finalKeywords = keywords || pageConfig?.keywords || 'luxury London relocation, exclusive relocation services'
  
  // Generate URLs
  const canonicalUrl = generateCanonicalUrl(path)
  const ogImageUrl = generateOpenGraphUrl(path)
  
  // Generate structured data
  const coreSchemas = getAllLuxurySchemas()
  const breadcrumbSchema = breadcrumbs.length > 0 ? generateLuxuryBreadcrumbSchema(breadcrumbs) : null
  const allSchemas = [
    ...coreSchemas,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...customSchemas
  ]
  
  // NextSEO configuration with luxury branding
  const seoProps: NextSeoProps = {
    title: finalTitle,
    description: finalDescription,
    canonical: canonicalUrl,
    noindex: noIndex,
    nofollow: noIndex,
    
    // Open Graph with luxury aesthetic
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: canonicalUrl,
      siteName: BRAND_CONFIG.name,
      title: pageConfig?.ogTitle || finalTitle,
      description: pageConfig?.ogDescription || finalDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${finalTitle} - ${BRAND_CONFIG.name}`,
          type: 'image/jpeg'
        },
        {
          url: `${BRAND_CONFIG.url}/images/london-luxury-skyline.jpg`,
          width: 1200, 
          height: 630,
          alt: 'London Luxury Skyline - Premium Relocation Destination',
          type: 'image/jpeg'
        }
      ]
    },
    
    // Twitter Cards with premium positioning
    twitter: {
      handle: BRAND_CONFIG.social.twitter,
      site: BRAND_CONFIG.social.twitter,
      cardType: 'summary_large_image'
    },
    
    // Enhanced meta tags for luxury positioning
    additionalMetaTags: [
      {
        name: 'keywords',
        content: finalKeywords
      },
      {
        name: 'author',
        content: BRAND_CONFIG.name
      },
      {
        property: 'article:author',
        content: BRAND_CONFIG.name
      },
      {
        name: 'theme-color',
        content: BRAND_CONFIG.colors.primary
      },
      {
        name: 'msapplication-TileColor',
        content: BRAND_CONFIG.colors.primary
      },
      // Luxury brand positioning
      {
        name: 'classification',
        content: 'Business, Professional Services, Luxury Relocation'
      },
      {
        name: 'category',
        content: 'Luxury Relocation Services'
      },
      {
        name: 'coverage',
        content: 'London, United Kingdom'
      },
      {
        name: 'distribution',
        content: 'Global'
      },
      {
        name: 'rating',
        content: 'General'
      },
      // Enhanced mobile experience for luxury UX
      {
        name: 'format-detection',
        content: 'telephone=yes'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: BRAND_CONFIG.name
      }
    ],
    
    // Additional link tags for luxury branding
    additionalLinkTags: [
      {
        rel: 'icon',
        href: '/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon', 
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      }
    ]
  }

  return (
    <>
      <NextSeo {...seoProps} />
      
      {/* Enhanced head elements for luxury SEO */}
      <Head>
        {/* Performance optimization for luxury experience */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//vercel-insights.com" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data JSON-LD for AI Citation */}
        {allSchemas.map((schema, index) => (
          <script
            key={`luxury-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2)
            }}
          />
        ))}
        
        {/* Language and region targeting */}
        <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Future blog RSS feed */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title={`${BRAND_CONFIG.name} Luxury Relocation Insights`}
          href={`${BRAND_CONFIG.url}/blog/rss.xml`}
        />
        
        {/* Microsoft specific luxury branding */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Security headers for premium experience */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Referrer policy for privacy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Enhanced robots directive for luxury content */}
        <meta 
          name="robots" 
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
      </Head>
      
      {children}
    </>
  )
}

// Specialized luxury SEO components for different page types
export function HomeLuxurySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url }
  ]

  return (
    <LuxurySEOProvider 
      page="home" 
      path="/" 
      breadcrumbs={breadcrumbs}
      customSchemas={[luxuryOrganizationSchema, luxuryLocalBusinessSchema]}
    >
      {children}
    </LuxurySEOProvider>
  )
}

export function PartnersLuxurySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Premium Partners', url: `${BRAND_CONFIG.url}/partners` }
  ]

  return (
    <LuxurySEOProvider 
      page="partners" 
      path="/partners" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </LuxurySEOProvider>
  )
}

export function CorporateLuxurySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Corporate Services', url: `${BRAND_CONFIG.url}/corporate` }
  ]

  return (
    <LuxurySEOProvider 
      page="corporate" 
      path="/corporate" 
      breadcrumbs={breadcrumbs}
      customSchemas={[luxuryFAQSchema]}
    >
      {children}
    </LuxurySEOProvider>
  )
}

export function ConciergeLuxurySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'AI Concierge', url: `${BRAND_CONFIG.url}/concierge` }
  ]

  return (
    <LuxurySEOProvider 
      page="concierge" 
      path="/concierge" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </LuxurySEOProvider>
  )
}

export function DirectoryLuxurySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Partner Directory', url: `${BRAND_CONFIG.url}/directory` }
  ]

  return (
    <LuxurySEOProvider 
      page="directory" 
      path="/directory" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </LuxurySEOProvider>
  )
}