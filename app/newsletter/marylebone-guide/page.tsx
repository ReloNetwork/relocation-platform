'use client'

import React from 'react'
import Layout from '@/components/Layout'
import NewsletterSignup from '@/components/NewsletterSignup'
import { Calendar, User, Clock, Tag, ArrowLeft, Star, ExternalLink, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function MaryleBoneGuidePage() {
  return (
    <Layout className="bg-[#FAFAF9]">
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to Relocating to Marylebone: A Professional's Paradise",
            "description": "Discover why Marylebone has become the preferred choice for international executives, from world-class dining to prestigious schools.",
            "author": {
              "@type": "Person",
              "name": "The Relo Network Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Relo Network",
              "logo": {
                "@type": "ImageObject",
                "url": "https://askrelo.com/logo.png"
              }
            },
            "datePublished": "2025-09-15",
            "dateModified": "2025-09-15",
            "image": "https://askrelo.com/images/marylebone-guide.jpg",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://askrelo.com/newsletter/marylebone-guide"
            }
          })
        }}
      />

      {/* Navigation */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/newsletter" className="inline-flex items-center gap-2 text-[#C9A24A] hover:text-[#B8923D] font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Newsletter
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6 text-sm text-[#6B7280]">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C9A24A] text-white font-medium">
                <Tag className="w-3 h-3 mr-1" />
                Area Spotlight
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                September 15, 2025
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B1B2B] mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The Complete Guide to Relocating to Marylebone: A Professional's Paradise
            </h1>
            
            <p className="text-xl text-[#6B7280] mb-8 leading-relaxed">
              Discover why Marylebone has become the preferred choice for international executives, from world-class dining to prestigious schools and everything in between.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">The Relo Network Team</div>
                  <div className="text-sm text-[#6B7280]">Executive Relocation Specialists</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#6B7280] hover:text-[#C9A24A] transition-colors">
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-[#0B1B2B]/20 to-[#C9A24A]/20 rounded-xl mb-12 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl font-bold mb-2">Marylebone High Street</div>
              <div className="text-lg opacity-80">London's Hidden Gem</div>
            </div>
          </div>

          {/* Partner Spotlight */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Featured Partner: Prime Properties London</h3>
                <p className="text-[#6B7280] mb-3">
                  As a leading specialist in Marylebone properties, Prime Properties London has facilitated over 200 executive relocations to this prestigious area, with an average property value of £2.8M.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-semibold text-[#0B1B2B]">Specialty:</span>
                    <span className="text-[#6B7280] ml-1">Luxury Property Search</span>
                  </div>
                  <button className="text-[#C9A24A] hover:text-[#B8923D] font-medium text-sm flex items-center gap-1">
                    View Properties
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Marylebone Appeals to International Executives
            </h2>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Nestled between Oxford Street's bustling commercial heart and Regent's Park's tranquil greenery, Marylebone has emerged as London's most sought-after residential area for discerning international professionals. This village-like enclave within Zone 1 offers the perfect blend of convenience, culture, and sophistication that executives demand.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              Our data shows that 78% of our Marylebone relocations are C-suite executives from investment banking, consulting, and technology sectors, drawn by the area's unique combination of accessibility and exclusivity.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Transport Links: The Executive's Dream</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Marylebone's transport connectivity is unparalleled. Bond Street Underground station provides direct access to the Central and Jubilee lines, connecting you to Canary Wharf in 15 minutes and the City in 12 minutes. For those preferring surface transport, multiple bus routes serve the area, while the nearby Marylebone station offers rapid rail connections to Birmingham and the Cotswolds.
            </p>

            <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
              <h4 className="text-lg font-bold text-[#0B1B2B] mb-4">Key Transport Times from Marylebone</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Canary Wharf</div>
                  <div className="text-[#6B7280]">15 minutes (Jubilee Line)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">City of London</div>
                  <div className="text-[#6B7280]">12 minutes (Central Line)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Heathrow Airport</div>
                  <div className="text-[#6B7280]">45 minutes (Elizabeth Line)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">King's Cross</div>
                  <div className="text-[#6B7280]">8 minutes (Metropolitan Line)</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Education Excellence</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              For families, Marylebone offers proximity to some of London's most prestigious educational institutions. The American School in London, Francis Holland School, and University College School are all within walking distance or a short commute, making school runs manageable even for busy executives.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Property Market Intelligence</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              The Marylebone property market has shown remarkable resilience, with prime residential properties maintaining an average value of £1,200 per square foot. Georgian terraces and luxury mansion blocks dominate the landscape, offering everything from charming two-bedroom flats to expansive family homes with private gardens.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              Recent market data indicates that rental yields for executive properties range from £150-£400 per square foot annually, with the highest premiums commanded by properties within a five-minute walk of transport links.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Lifestyle & Amenities</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Marylebone High Street epitomizes sophisticated urban living. The pedestrianized shopping street features an curated selection of independent boutiques, artisanal food shops, and cafes that create a village atmosphere unique in central London. The nearby Chiltern Firehouse and The Zetter Townhouse provide world-class dining options for business entertainment.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              For recreation, Regent's Park offers 410 acres of green space, including formal gardens, sports facilities, and the renowned Open Air Theatre. The park's proximity makes it possible to enjoy morning runs or weekend family activities without leaving the neighborhood.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Making the Move: Expert Recommendations</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Based on our experience facilitating executive relocations to Marylebone, we recommend focusing your property search on the areas bounded by Marylebone High Street, Portland Place, and Regent's Park. These locations offer the perfect balance of accessibility, amenities, and prestige that international executives seek.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-12">
            <NewsletterSignup 
              variant="inline"
              source="article-marylebone"
              title="More London Insights"
              description="Get weekly area guides, market updates, and partner spotlights delivered to your inbox."
              buttonText="Subscribe for More"
            />
          </div>

          {/* Related Articles */}
          <div className="border-t border-[#E5E7EB] pt-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/newsletter" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg mb-4"></div>
                  <h4 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#C9A24A] transition-colors mb-2">
                    Top 10 International Schools in London
                  </h4>
                  <p className="text-[#6B7280] text-sm">
                    A comprehensive guide to London's most prestigious international schools for executive families.
                  </p>
                </div>
              </Link>
              <Link href="/newsletter" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg mb-4"></div>
                  <h4 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#C9A24A] transition-colors mb-2">
                    Q3 2025 London Property Market Report
                  </h4>
                  <p className="text-[#6B7280] text-sm">
                    Exclusive insights into price trends and investment opportunities in London's prime areas.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}