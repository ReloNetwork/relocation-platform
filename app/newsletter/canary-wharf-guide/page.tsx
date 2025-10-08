'use client'

import React from 'react'
import Layout from '@/components/Layout'
import NewsletterSignup from '@/components/NewsletterSignup'
import { Calendar, User, Clock, Tag, ArrowLeft, Star, ExternalLink, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function CanaryWharfGuidePage() {
  return (
    <Layout className="bg-[#FAFAF9]">
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Complete Guide to Relocating to Canary Wharf: Modern Banking's New Home",
            "description": "Discover why Canary Wharf has become the preferred choice for global banking executives seeking cutting-edge amenities and seamless work-life integration.",
            "author": {
              "@type": "Person",
              "name": "James Wellington"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Relo Network",
              "logo": {
                "@type": "ImageObject",
                "url": "https://askrelo.com/logo.png"
              }
            },
            "datePublished": "2025-10-06",
            "dateModified": "2025-10-06",
            "image": "https://askrelo.com/images/canary-wharf-guide.jpg",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://askrelo.com/newsletter/canary-wharf-guide"
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
                10 min read
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Launch Week 2025
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B1B2B] mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The Complete Guide to Relocating to Canary Wharf: Modern Banking's New Home
            </h1>
            
            <p className="text-xl text-[#6B7280] mb-8 leading-relaxed">
              Discover why Canary Wharf has become the preferred choice for global banking executives seeking cutting-edge amenities, world-class infrastructure, and seamless work-life integration in London's second financial center.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">James Wellington</div>
                  <div className="text-sm text-[#6B7280]">Senior Partner Relations</div>
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
              <div className="text-2xl font-bold mb-2">One Canada Square</div>
              <div className="text-lg opacity-80">London's Modern Finance Hub</div>
            </div>
          </div>

          {/* Personal Opening */}
          <div className="bg-white rounded-xl p-8 mb-8 border border-[#E5E7EB]">
            <p className="text-lg text-[#0B1B2B] leading-relaxed mb-6">
              <strong>Dear Banking Executive,</strong>
            </p>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              When JPMorgan Chase completed their new European headquarters at 25 Bank Street in 2021, they didn't just relocate—they set a new standard for what modern banking infrastructure looks like.
            </p>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Over the past five years, I've helped 150+ managing directors, country heads, and senior bankers navigate the transition to Canary Wharf living. What started as a practical choice—proximity to office towers—has evolved into a lifestyle preference for executives who value efficiency, modernity, and comprehensive amenities.
            </p>
            
            <p className="text-xl font-semibold text-[#0B1B2B] text-center">
              <strong>This is your guide to London's most integrated financial ecosystem.</strong>
            </p>
          </div>

          {/* Market Reality Box */}
          <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Canary Wharf Market Reality:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-[#6B7280]">
              <div>
                <div className="font-medium">Average property value</div>
                <div className="text-[#C9A24A] font-bold">£1,100 per sq ft</div>
              </div>
              <div>
                <div className="font-medium">Major banks within 0.3 miles</div>
                <div className="text-[#C9A24A] font-bold">All Big 4 + 15 global banks</div>
              </div>
              <div>
                <div className="font-medium">New residential completions (2024)</div>
                <div className="text-[#C9A24A] font-bold">2,400 luxury units</div>
              </div>
              <div>
                <div className="font-medium">Walking time to office towers</div>
                <div className="text-[#C9A24A] font-bold">3-8 minutes maximum</div>
              </div>
            </div>
          </div>

          {/* Partner Spotlight */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Featured Partner: Docklands Property Specialists</h3>
                <p className="text-[#6B7280] mb-3">
                  Having secured over 400 executive residences in Canary Wharf's newest developments, they understand that modern banking professionals need more than just proximity—they need smart buildings, integrated services, and communities designed for demanding schedules.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-semibold text-[#0B1B2B]">Specialty:</span>
                    <span className="text-[#6B7280] ml-1">New Build Executive Apartments</span>
                  </div>
                  <button className="text-[#C9A24A] hover:text-[#B8923D] font-medium text-sm flex items-center gap-1">
                    View Developments
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The New Reality of Banking District Living
            </h2>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Canary Wharf represents a fundamental shift in how financial districts operate. Unlike the City's historic streets, everything here was designed with modern banking in mind: underground shopping centers connect to office towers, residential buildings integrate with transport links, and services operate on schedules that match banking hours.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              The numbers tell the story: 67% of senior banking executives who relocate to London now choose Canary Wharf addresses, appreciating the efficiency gains that come from living within the financial ecosystem rather than commuting to it.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Transport Excellence for Global Banking</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Canary Wharf's transport infrastructure was built for international finance. The Jubilee Line provides direct connections to Westminster and Bond Street, while the DLR offers fast links to London City Airport—crucial for frequent European travel. The Elizabeth Line connection reaches Heathrow in 39 minutes, with dedicated business class check-in facilities.
            </p>

            <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
              <h4 className="text-lg font-bold text-[#0B1B2B] mb-4">Executive Transport Times from Canary Wharf</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-[#0B1B2B]">City of London</div>
                  <div className="text-[#6B7280]">12 minutes (DLR to Bank)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Mayfair</div>
                  <div className="text-[#6B7280]">14 minutes (Jubilee to Bond Street)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">London City Airport</div>
                  <div className="text-[#6B7280]">22 minutes (DLR direct)</div>
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Heathrow Terminal 5</div>
                  <div className="text-[#6B7280]">39 minutes (Elizabeth Line)</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Education and Family Integration</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Canary Wharf's family amenities reflect its residents' needs. The Canary Wharf College provides local secondary education, while dedicated school bus services connect to central London's top international schools. Many families appreciate the area's safety, modern infrastructure, and child-friendly public spaces designed for busy professional parents.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Property Market Dynamics</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Canary Wharf's property market operates differently from traditional London areas. New developments like Landmark Pinnacle and South Quay Plaza offer modern amenities that older London properties can't match: floor-to-ceiling windows, smart building technology, integrated gyms, and 24/7 concierge services designed for banking schedules.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              Rental yields range from £60-£120 per square foot annually, with premium units in tower developments commanding higher rates. The appeal lies in the complete package: location, amenities, and services that eliminate friction from daily life.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">The Integrated Lifestyle</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Canary Wharf's design creates an integrated lifestyle impossible elsewhere in London. Underground connections mean you can travel from apartment to office to restaurant to shopping without experiencing weather. The Crossrail Place Roof Garden provides green space 200 feet above street level, while venues like Roka and Gaucho offer business dining within walking distance.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              For fitness and recreation, most residential buildings include state-of-the-art gyms, while nearby Mudchute Park and Farm offers surprising green space. The Thames Path provides running routes with river views, perfect for pre-market morning exercise.
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Strategic Recommendations for Banking Executives</h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-6">
              Based on successful relocations for major bank country heads and managing directors, I recommend focusing on developments completed after 2020. These buildings incorporate lessons learned from earlier Canary Wharf residential projects and offer the smart building features that enhance professional productivity.
            </p>

            <p className="text-[#6B7280] leading-relaxed mb-6">
              For senior executives with global responsibilities, prioritize properties with dedicated office spaces and strong internet infrastructure. The ability to conduct Asia-Pacific calls from home has become essential for Canary Wharf's banking community.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-12">
            <NewsletterSignup 
              variant="inline"
              source="article-canary-wharf"
              title="More Banking District Intelligence"
              description="Get weekly insights on London's financial districts, market updates, and executive relocation guides."
              buttonText="Get Banking Insights"
            />
          </div>

          {/* Related Articles */}
          <div className="border-t border-[#E5E7EB] pt-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Related Financial District Guides
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/newsletter/mayfair-guide" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg mb-4"></div>
                  <h4 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#C9A24A] transition-colors mb-2">
                    The Complete Guide to Mayfair
                  </h4>
                  <p className="text-[#6B7280] text-sm">
                    London's most prestigious address for hedge fund managers and private equity executives.
                  </p>
                </div>
              </Link>
              <Link href="/newsletter/city-guide" className="group">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-[#F3F4F6] rounded-lg mb-4"></div>
                  <h4 className="text-lg font-bold text-[#0B1B2B] group-hover:text-[#C9A24A] transition-colors mb-2">
                    Historic Banking: Living in The City
                  </h4>
                  <p className="text-[#6B7280] text-sm">
                    Traditional finance district living for legal and investment banking professionals.
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