/**
 * Relo Network - Luxury Page SEO Component
 * Comprehensive SEO management with structured data and luxury branding
 */

'use client'

import { NextSeo, NextSeoProps } from 'next-seo'
import Head from 'next/head'
import { WithContext, Thing } from 'schema-dts'
import { BRAND_CONFIG, PAGE_SEO_CONFIG, generateCanonicalUrl, generateOpenGraphUrl } from '../../lib/seo/config'
import { getSchemaForPage, generateBreadcrumbSchema } from '../../lib/seo/schemas'

interface PageSEOProps {
  page: keyof typeof PAGE_SEO_CONFIG
  customTitle?: string
  customDescription?: string
  customKeywords?: string
  path: string
  breadcrumbs?: Array<{name: string, url: string}>
  noIndex?: boolean
  schema?: WithContext<Thing>[]
  children?: React.ReactNode
}

export default function PageSEO({
  page,
  customTitle,
  customDescription,
  customKeywords,
  path,
  breadcrumbs,
  noIndex = false,
  schema = [],
  children
}: PageSEOProps) {
  const pageConfig = PAGE_SEO_CONFIG[page]
  const title = customTitle || pageConfig.title
  const description = customDescription || pageConfig.description
  const keywords = customKeywords || pageConfig.keywords
  const canonicalUrl = generateCanonicalUrl(path)
  const ogImageUrl = generateOpenGraphUrl(path)

  // Generate comprehensive structured data
  const pageSchemas = getSchemaForPage(path)
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null
  const allSchemas = [...pageSchemas, ...schema, ...(breadcrumbSchema ? [breadcrumbSchema] : [])]

  const seoProps: NextSeoProps = {
    title,
    description,
    canonical: canonicalUrl,
    noindex: noIndex,
    nofollow: noIndex,
    
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: canonicalUrl,
      siteName: BRAND_CONFIG.name,
      title: pageConfig.ogTitle || title,
      description: pageConfig.ogDescription || description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${BRAND_CONFIG.name}`,
          type: 'image/jpeg'
        }
      ]
    },

    twitter: {
      handle: BRAND_CONFIG.social.twitter,
      site: BRAND_CONFIG.social.twitter,
      cardType: 'summary_large_image'
    },

    additionalMetaTags: [
      {
        name: 'keywords',
        content: keywords
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
      // Luxury positioning meta tags
      {
        name: 'classification',
        content: 'Business, Professional Services, Relocation'
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
      // Enhanced mobile experience
      {
        name: 'format-detection',
        content: 'telephone=yes'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      }
    ]
  }

  return (
    <>
      <NextSeo {...seoProps} />
      
      {/* Custom Head elements for enhanced SEO */}
      <Head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data JSON-LD */}
        {allSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2)
            }}
          />
        ))}
        
        {/* Additional luxury brand elements */}
        <meta name="msapplication-TileColor" content={BRAND_CONFIG.colors.primary} />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Alternate languages (future expansion) */}
        <link rel="alternate" hrefLang="en-GB" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* RSS/Atom feeds (future blog) */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title={`${BRAND_CONFIG.name} Blog`}
          href={`${BRAND_CONFIG.url}/blog/rss.xml`}
        />
        
        {/* Verification tags (to be added when accounts are created) */}
        {/* <meta name="google-site-verification" content="..." />
        <meta name="bing-site-verification" content="..." /> */}
      </Head>
      
      {children}
    </>
  )
}

// Specialized SEO components for different page types
export function HomeSEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url }
  ]

  return (
    <PageSEO 
      page="home" 
      path="/" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </PageSEO>
  )
}

export function PartnersSEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Partners', url: `${BRAND_CONFIG.url}/partners` }
  ]

  return (
    <PageSEO 
      page="partners" 
      path="/partners" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </PageSEO>
  )
}

export function CorporateSEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Corporate', url: `${BRAND_CONFIG.url}/corporate` }
  ]

  return (
    <PageSEO 
      page="corporate" 
      path="/corporate" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </PageSEO>
  )
}

export function ConciergeSEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Concierge', url: `${BRAND_CONFIG.url}/concierge` }
  ]

  return (
    <PageSEO 
      page="concierge" 
      path="/concierge" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </PageSEO>
  )
}

export function DirectorySEO({ children }: { children?: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', url: BRAND_CONFIG.url },
    { name: 'Directory', url: `${BRAND_CONFIG.url}/directory` }
  ]

  return (
    <PageSEO 
      page="directory" 
      path="/directory" 
      breadcrumbs={breadcrumbs}
    >
      {children}
    </PageSEO>
  )
}