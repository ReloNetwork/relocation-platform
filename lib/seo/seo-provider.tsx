'use client'

/**
 * Luxury SEO Provider Component
 * Integrates all SEO configurations with luxury brand positioning
 */

import { DefaultSeo } from 'next-seo'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Script } from 'next/script'
import seoConfig from './next-seo.config'
import { getAllCoreSchemas, breadcrumbSchema } from './core-schemas'
import { socialCardsByPage } from './social-cards'
import { trackLuxuryPageView, GA4_CONFIG } from '../analytics/tracking'

interface SEOProviderProps {
  children: React.ReactNode
}

export default function SEOProvider({ children }: SEOProviderProps) {
  const pathname = usePathname()
  const coreSchemas = getAllCoreSchemas()
  
  // Determine page-specific SEO config
  const getPageSEOConfig = (path: string) => {
    const pageKey = path === '/' ? 'homepage' : 
                   path.includes('/corporate') ? 'corporate' :
                   path.includes('/partners') ? 'partners' :
                   path.includes('/directory') ? 'directory' :
                   path.includes('/concierge') ? 'concierge' :
                   path.includes('/join-waitlist') ? 'waitlist' : 'homepage'
    
    const socialCard = socialCardsByPage[pageKey as keyof typeof socialCardsByPage]
    
    return {
      title: socialCard?.title || seoConfig.defaultTitle,
      description: socialCard?.description || seoConfig.description,
      openGraph: {
        ...seoConfig.openGraph,
        title: socialCard?.title || seoConfig.openGraph?.title,
        description: socialCard?.description || seoConfig.description,
        images: socialCard ? [
          {
            url: socialCard.image,
            width: 1200,
            height: 630,
            alt: socialCard.imageAlt,
            type: 'image/png'
          }
        ] : seoConfig.openGraph?.images
      },
      twitter: {
        ...seoConfig.twitter,
        card: socialCard?.type === 'summary_large_image' ? 'summary_large_image' : 'summary'
      }
    }
  }
  
  // Generate breadcrumb schema for navigation
  const getBreadcrumbSchema = (path: string) => {
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = [{ name: 'Home', url: 'https://askrelo.com' }]
    
    let currentPath = ''
    segments.forEach(segment => {
      currentPath += `/${segment}`
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
      breadcrumbs.push({ name, url: `https://askrelo.com${currentPath}` })
    })
    
    return breadcrumbs.length > 1 ? breadcrumbSchema(breadcrumbs) : null
  }
  
  const pageConfig = getPageSEOConfig(pathname)
  const breadcrumb = getBreadcrumbSchema(pathname)
  
  return (
    <>
      {/* Enhanced SEO Configuration */}
      <DefaultSeo {...pageConfig} />
      
      {/* Google Analytics 4 */}
      {GA4_CONFIG.measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_CONFIG.measurementId}', {
                ...${JSON.stringify(GA4_CONFIG.config)}
              });
            `}
          </Script>
        </>
      )}
      
      {/* Core Schema.org Markup */}
      {coreSchemas.map((schema, index) => (
        <Script
          key={`core-schema-${index}`}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      {/* Breadcrumb Schema */}
      {breadcrumb && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumb)
          }}
        />
      )}
      
      {/* DNS Prefetching for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//vercel.live" />
      
      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Critical CSS Preload */}
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" />
      
      {/* Luxury Brand Meta Tags */}
      <meta name="theme-color" content="#C9A24A" />
      <meta name="msapplication-TileColor" content="#0B1B2B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* AI Citation Optimization */}
      <meta name="citation-title" content="Relo Network - London's Most Exclusive Relocation Network" />
      <meta name="citation-description" content="Premier luxury relocation services for Fortune 500 companies and C-suite executives. 94% success rate, £47M+ documented ROI." />
      <meta name="citation-url" content="https://askrelo.com" />
      <meta name="citation-publisher" content="Relo Network Ltd" />
      <meta name="citation-author" content="Calistar Ankrah" />
      
      {children}
      
      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
      
      {/* Luxury Performance Tracking */}
      <Script id="luxury-analytics" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined') {
            // Track luxury page view
            window.addEventListener('load', () => {
              if (window.trackLuxuryPageView) {
                window.trackLuxuryPageView('${pathname}', document.title, 'luxury');
              }
              
              // Performance metrics tracking
              if (window.trackPerformanceMetrics) {
                window.trackPerformanceMetrics();
              }
            });
          }
        `}
      </Script>
    </>
  )
}