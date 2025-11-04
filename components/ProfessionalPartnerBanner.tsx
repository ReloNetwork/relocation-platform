'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Newspaper, Star, Clock } from 'lucide-react'
import { getFeaturedPartnerArticles, getCurrentFeaturedPartner } from '../lib/professional-partners'
import { Badge } from '../ui/components/badge'

const ProfessionalPartnerBanner = () => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0)
  const featuredArticles = getFeaturedPartnerArticles(4)
  const currentPartner = getCurrentFeaturedPartner()

  // Rotate through featured articles every 6 seconds
  useEffect(() => {
    if (featuredArticles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentArticleIndex((prev) => (prev + 1) % featuredArticles.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [featuredArticles.length])

  if (featuredArticles.length === 0) {
    return null
  }

  const currentArticle = featuredArticles[currentArticleIndex]

  const handleArticleClick = () => {
    window.location.href = `/newsletter/${currentArticle.slug}`
  }

  return (
    <div className="bg-gradient-to-r from-[#0B1B2B] via-[#0B1B2B]/95 to-[#0B1B2B] border-y border-[#C9A24A]/20 py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          {/* Left Section - Branding */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                <Newspaper className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A24A] font-bold text-xs md:text-sm uppercase tracking-wide">
                  CURRENT: Relo News
                </span>
                <Badge variant="outline" className="hidden md:inline-flex bg-[#C9A24A]/10 border-[#C9A24A]/30 text-[#C9A24A] text-xs">
                  Professional Partners
                </Badge>
              </div>
            </div>
          </div>

          {/* Center Section - Rotating Article */}
          <div 
            className="flex-1 mx-2 md:mx-6 cursor-pointer group transition-all duration-300 md:hover:scale-105"
            onClick={handleArticleClick}
          >
            <div className="flex items-center gap-2 md:gap-3">
              {/* Partner indicator */}
              <div className="hidden md:flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C9A24A]" />
                <span className="text-white/60 text-xs uppercase tracking-wide">
                  {currentArticle.partnerCategory}
                </span>
              </div>

              {/* Article title */}
              <h3 className="text-white font-semibold text-xs md:text-sm lg:text-base line-clamp-1 group-hover:text-[#C9A24A] transition-colors duration-300">
                {currentArticle.title}
              </h3>

              {/* Read time */}
              <div className="hidden lg:flex items-center gap-1 text-white/40">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{currentArticle.readTime}</span>
              </div>
            </div>
          </div>

          {/* Right Section - CTA */}
          <div className="flex items-center gap-3">
            {/* Article indicators */}
            {featuredArticles.length > 1 && (
              <div className="hidden md:flex items-center gap-1">
                {featuredArticles.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentArticleIndex 
                        ? 'bg-[#C9A24A] w-6' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Read button */}
            <button
              onClick={handleArticleClick}
              className="flex items-center gap-2 text-[#C9A24A] hover:text-white text-sm font-medium transition-colors duration-300 group"
            >
              <span className="hidden sm:inline">Read Article</span>
              <span className="sm:hidden">Read</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile article preview */}
        <div className="md:hidden mt-3 pt-3 border-t border-white/10">
          <p className="text-white/70 text-xs line-clamp-2">
            {currentArticle.excerpt}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalPartnerBanner