'use client'

import React, { useState, useEffect } from 'react'
import { getHeroPartners } from '../lib/professional-partners'

interface DynamicHeroBackgroundProps {
  children: React.ReactNode
  className?: string
}

const DynamicHeroBackground: React.FC<DynamicHeroBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const heroPartners = getHeroPartners()

  // Rotate through hero partners every 8 seconds
  useEffect(() => {
    if (heroPartners.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentPartnerIndex((prev) => (prev + 1) % heroPartners.length)
        setIsTransitioning(false)
      }, 500) // Half second fade transition
    }, 8000)

    return () => clearInterval(interval)
  }, [heroPartners.length])

  // Default background if no partners
  const defaultBackground = "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
  
  const currentBackground = heroPartners.length > 0 
    ? heroPartners[currentPartnerIndex]?.heroImage || defaultBackground
    : defaultBackground

  const currentPartner = heroPartners[currentPartnerIndex]

  return (
    <div className={`relative ${className}`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            isTransitioning ? 'opacity-70' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${currentBackground})`
          }}
        />
        
        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B2B]/70 via-[#0B1B2B]/50 to-[#0B1B2B]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B]/60 via-transparent to-[#0B1B2B]/40" />
        
        {/* Professional Partner Attribution (subtle) */}
        {currentPartner && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
              <p className="text-white/70 text-xs">
                Featured Partner: <span className="text-[#C9A24A] font-medium">{currentPartner.name}</span>
              </p>
            </div>
          </div>
        )}

        {/* Partner transition indicators */}
        {heroPartners.length > 1 && (
          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex gap-2">
              {heroPartners.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentPartnerIndex 
                      ? 'bg-[#C9A24A] w-8' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Schema markup for current featured partner */}
      {currentPartner && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `https://therelonetwork.com/partners/${currentPartner.id}`,
              "name": currentPartner.name,
              "description": currentPartner.description,
              "url": currentPartner.website,
              "logo": currentPartner.logo,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "London",
                "addressCountry": "GB"
              },
              "knowsAbout": currentPartner.seo.keywords,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": currentPartner.specialization,
                "itemListElement": currentPartner.articles.map(article => ({
                  "@type": "Article",
                  "headline": article.title,
                  "description": article.excerpt,
                  "url": `https://therelonetwork.com/newsletter/${article.slug}`,
                  "datePublished": article.publishedDate,
                  "author": {
                    "@type": "Organization",
                    "name": currentPartner.name
                  }
                }))
              },
              "memberOf": {
                "@type": "Organization",
                "name": "Relo Network Professional Partners",
                "url": "https://therelonetwork.com/partners"
              }
            })
          }}
        />
      )}
    </div>
  )
}

export default DynamicHeroBackground