'use client'

/**
 * Enhanced SEO Provider - Luxury Relocation Platform
 * Integrates next-seo, schema-dts, and analytics for maximum search visibility
 */

import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { Analytics } from '@vercel/analytics/react'
import { DEFAULT_SEO, PAGE_SEO_CONFIG, generateCanonicalUrl } from '../../lib/seo/config'
import { getAllCoreSchemas, breadcrumbSchema as createBreadcrumbSchema } from '../../lib/seo/core-schemas'
import { getAllEnhancedSchemas } from '../../lib/seo/enhanced-schemas'

interface EnhancedSEOProviderProps {
  children: React.ReactNode
  page?: keyof typeof PAGE_SEO_CONFIG
  customSEO?: Partial<NextSeoProps>
  breadcrumbs?: Array<{name: string, url: string}>
  structuredData?: Record<string, any>[]
}

interface PageSEOConfig {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
}

export default function EnhancedSEOProvider({ 
  children, 
  page,
  customSEO,
  breadcrumbs,
  structuredData = []
}: EnhancedSEOProviderProps) {
  // Generate page-specific SEO configuration
  const getPageSEO = (): NextSeoProps => {
    if (!page) return DEFAULT_SEO
    
    const pageConfig: PageSEOConfig = PAGE_SEO_CONFIG[page]
    const canonical = generateCanonicalUrl(page === 'home' ? '/' : `/${page}`)
    
    return {
      ...DEFAULT_SEO,
      title: pageConfig.title,
      description: pageConfig.description,
      canonical,
      openGraph: {
        ...DEFAULT_SEO.openGraph,
        title: pageConfig.ogTitle || pageConfig.title,
        description: pageConfig.ogDescription || pageConfig.description,
        url: canonical,
      },
      additionalMetaTags: [
        ...(DEFAULT_SEO.additionalMetaTags || []),
        {
          name: 'keywords',
          content: pageConfig.keywords
        }
      ]
    }
  }
  
  // Combine all structured data
  const getAllStructuredData = () => {
    const schemas = [
      ...getAllCoreSchemas(),
      ...getAllEnhancedSchemas(),
      ...structuredData
    ]
    
    // Add breadcrumb schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(createBreadcrumbSchema(breadcrumbs))
    }
    
    return schemas
  }
  
  // Merge SEO configurations
  const finalSEO = {
    ...getPageSEO(),
    ...customSEO
  }
  
  const allSchemas = getAllStructuredData()
  
  return (
    <>
      {/* Next SEO Configuration */}
      <NextSeo {...finalSEO} />
      
      {/* Structured Data Injection */}
      {allSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
      
      {/* Enhanced Meta Tags for Luxury Positioning */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Relo Network" />
      <meta name="application-name" content="Relo Network" />
      <meta name="msapplication-tooltip" content="London's Premier Luxury Relocation Network" />
      <meta name="msapplication-starturl" content="https://askrelo.com" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://vercel.live" />
      <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//vercel.com" />
      
      {/* Render children with SEO context */}
      {children}
      
      {/* Analytics Integration */}
      <Analytics />
    </>
  )
}

// Utility hook for page-specific SEO
export const useSEO = (page: keyof typeof PAGE_SEO_CONFIG) => {
  const pageConfig: PageSEOConfig = PAGE_SEO_CONFIG[page]
  const canonical = generateCanonicalUrl(page === 'home' ? '/' : `/${page}`)
  
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    canonical,
    keywords: pageConfig.keywords,
    openGraph: {
      title: pageConfig.ogTitle || pageConfig.title,
      description: pageConfig.ogDescription || pageConfig.description,
      url: canonical
    }
  }
}

// SEO validation utility for development
export const validateSEO = (seoProps: NextSeoProps) => {
  if (process.env.NODE_ENV === 'development') {
    const warnings: string[] = []
    
    if (!seoProps.title || seoProps.title.length < 30) {
      warnings.push('Title should be at least 30 characters')
    }
    if (!seoProps.description || seoProps.description.length < 120) {
      warnings.push('Description should be at least 120 characters')
    }
    if (seoProps.title && seoProps.title.length > 60) {
      warnings.push('Title should be under 60 characters')
    }
    if (seoProps.description && seoProps.description.length > 160) {
      warnings.push('Description should be under 160 characters')
    }
    
    if (warnings.length > 0) {
      console.warn('SEO Warnings:', warnings)
    }
  }
}
