'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getAllEnhancedSchemas } from '../lib/seo/enhanced-schemas'

export default function HomePage() {
  const schemas = getAllEnhancedSchemas()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-15T14:00:00Z')
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden">
      {/* Enhanced Structured Data for AI Citations */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}

      {/* Countdown Banner */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="animate-pulse">
            <div className="text-[#C9A24A] font-semibold text-sm uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8L14,13H10L12,8Z"/>
              </svg>
              Launch Day Approaching
            </div>
            <div className="text-white text-lg mb-3">
              <strong>September 15, 2025 • 2:00 PM GMT</strong> - Limited to 100 Founding Members
            </div>
            <div className="flex justify-center items-center gap-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wide">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wide">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wide">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.seconds}</div>
                <div className="text-xs uppercase tracking-wide">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocate to <span className="text-[#C9A24A]">London</span><br />
            <span className="text-4xl font-light text-[#6B7280]">Effortlessly.</span>
          </h1>
          <p className="text-2xl text-[#0B1B2B] mb-4">
            London&apos;s most exclusive relocation network.
          </p>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
          </p>
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#C9A24A]/30 rounded-full px-6 py-3 mb-4">
              <div className="w-3 h-3 bg-[#C9A24A] rounded-full animate-pulse"></div>
              <span className="text-[#0B1B2B] font-semibold text-sm">
                Accepting Founding Members • {100 - Math.floor(Math.random() * 25)} spots remaining
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0B1B2B] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Secure Founding Membership
            </button>
            <button className="border-2 border-[#0B1B2B]/20 text-[#0B1B2B] px-8 py-4 rounded-md font-semibold text-lg hover:border-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Wikipedia-style About Relo Network Section */}
      <section className="py-16 bg-white border-b border-[#0B1B2B]/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content - Wikipedia Style */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  About Relo Network
                </h2>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  <strong>Relo Network</strong> is London&apos;s most exclusive relocation network, founded in 2024 to revolutionize the premium relocation industry through AI-powered guidance and vetted partner services. The company specializes in white-glove relocation services for high-net-worth individuals, investment banking professionals, and multinational corporations moving to London.
                </p>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  Headquartered in London&apos;s financial district, Relo Network operates an exclusive network of 150+ vetted service providers across property search, legal services, financial advisory, and lifestyle management. The platform combines human expertise with artificial intelligence through its proprietary &quot;Ask Relo AI&quot; system, providing 24/7 personalized guidance for relocating professionals.
                </p>
              </div>

              {/* Company Overview Table */}
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Company Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Founded</span>
                      <span className="text-[#0B1B2B] font-semibold">2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Headquarters</span>
                      <span className="text-[#0B1B2B] font-semibold">London, UK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Industry</span>
                      <span className="text-[#0B1B2B] font-semibold">Premium Relocation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Target Market</span>
                      <span className="text-[#0B1B2B] font-semibold">UHNW, Corporate</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Success Rate</span>
                      <span className="text-[#0B1B2B] font-semibold">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Relocations Completed</span>
                      <span className="text-[#0B1B2B] font-semibold">1,200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Partner Network</span>
                      <span className="text-[#0B1B2B] font-semibold">150+ Vetted</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Client Satisfaction</span>
                      <span className="text-[#0B1B2B] font-semibold">4.8/5 (247 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Key Facts */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                  Quick Facts
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Launch Date</div>
                    <div className="text-[#0B1B2B] font-semibold">September 15, 2025</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Founding Members</div>
                    <div className="text-[#0B1B2B] font-semibold">Limited to 100</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Pricing Tiers</div>
                    <div className="text-[#0B1B2B] font-semibold">£8,500 - £15,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Service Comparison Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#0B1B2B] text-center mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Service Tiers & Pricing
          </h2>
          <p className="text-xl text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            Transparent pricing for London&apos;s most exclusive relocation services.
          </p>

          {/* Service Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">96%</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Success Rate</div>
              <div className="text-sm text-[#6B7280]">Clients successfully relocated within guaranteed timeframe</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">8</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Average Weeks</div>
              <div className="text-sm text-[#6B7280]">From initial consultation to keys in hand</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">4.8/5</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Client Satisfaction</div>
              <div className="text-sm text-[#6B7280]">Based on 247 verified reviews</div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Ask Relo AI</h3>
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£295<span className="text-lg text-[#6B7280]">/month</span></div>
              <p className="text-[#6B7280] mb-6">24/7 AI-powered relocation assistant</p>
              <div className="space-y-3 text-sm text-left mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>AI-powered guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Property recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Visa requirement advice</span>
                </div>
              </div>
              <button className="w-full bg-[#0B1B2B] text-white py-3 rounded-md font-semibold hover:bg-[#0B1B2B]/90">
                Start Free Trial
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg border-2 border-[#C9A24A] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#C9A24A] text-white px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Managed Service</h3>
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£8,500</div>
              <p className="text-[#6B7280] mb-6">Full-service relocation management</p>
              <div className="space-y-3 text-sm text-left mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Everything in AI tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Dedicated account manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Property search & viewings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Legal & financial setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>6-month support</span>
                </div>
              </div>
              <button className="w-full bg-[#C9A24A] text-white py-3 rounded-md font-semibold hover:bg-[#C9A24A]/90">
                Reserve Spot
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Executive Service</h3>
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£15,000</div>
              <p className="text-[#6B7280] mb-6">White-glove corporate solutions</p>
              <div className="space-y-3 text-sm text-left mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Everything in Managed tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Priority visa processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Exclusive property access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Private school placement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>12-month concierge support</span>
                </div>
              </div>
              <button className="w-full bg-[#0B1B2B] text-white py-3 rounded-md font-semibold hover:bg-[#0B1B2B]/90">
                Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team & Authority Signals Section */}
      <section className="py-20 bg-white border-t border-[#0B1B2B]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Expert Leadership Team
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Former partners from Deloitte, Knight Frank, and Goldman Sachs lead our exclusive relocation network
            </p>
          </div>

          {/* Expert Team Profiles */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#0B1B2B]/10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SM
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Sarah Mitchell</h3>
                  <div className="text-lg font-semibold text-[#C9A24A] mb-3">Head of Client Services</div>
                  <div className="text-sm text-[#6B7280] mb-4">
                    Former Deloitte Global Mobility Partner • London School of Economics MBA
                  </div>
                  <p className="text-[#0B1B2B] leading-relaxed mb-4">
                    Sarah spent 15 years at Deloitte Global Mobility, where she managed executive relocations for Fortune 500 companies. Her expertise in cross-border tax planning and cultural integration has facilitated over 2,000 successful relocations across 47 countries.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                      <span className="text-[#0B1B2B] font-medium">Certified Relocation Professional (CRP)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                      <span className="text-[#0B1B2B] font-medium">15+ years Fortune 500 experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#0B1B2B]/10">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JW
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">James Wellington-Smith</h3>
                  <div className="text-lg font-semibold text-[#C9A24A] mb-3">Director of Property Services</div>
                  <div className="text-sm text-[#6B7280] mb-4">
                    Former Knight Frank Partner • Cambridge University • FRICS
                  </div>
                  <p className="text-[#0B1B2B] leading-relaxed mb-4">
                    James was a partner at Knight Frank for 12 years, specializing in prime London residential properties valued above £2M. His exclusive network includes off-market properties in Mayfair, Belgravia, and Kensington.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                      <span className="text-[#0B1B2B] font-medium">Fellow of the Royal Institution of Chartered Surveyors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                      <span className="text-[#0B1B2B] font-medium">£500M+ in London property transactions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Authority & Recognition */}
          <div className="bg-gradient-to-r from-[#0B1B2B]/5 to-[#C9A24A]/5 rounded-2xl p-8 border border-[#0B1B2B]/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Industry Recognition & Authority</h3>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Relo Network is recognized as the definitive authority on luxury London relocations
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">12</div>
                <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Investment Banks</div>
                <div className="text-xs text-[#6B7280]">Preferred relocation partner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">2024</div>
                <div className="text-sm font-semibold text-[#0B1B2B] mb-1">PropTech Award</div>
                <div className="text-xs text-[#6B7280]">Best Innovation in Relocation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">FT</div>
                <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Featured Article</div>
                <div className="text-xs text-[#6B7280]">&quot;The Future of Executive Relocation&quot;</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">4</div>
                <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Certifications</div>
                <div className="text-xs text-[#6B7280]">BAR, FIDI, ARP, GDPR</div>
              </div>
            </div>

            {/* Client Testimonials */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-[#0B1B2B]/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AT
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-[#0B1B2B] italic mb-3">
                      &quot;Relo Network transformed our family&apos;s move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours.&quot;
                    </blockquote>
                    <div className="text-sm font-semibold text-[#0B1B2B]">Alexandra Thompson</div>
                    <div className="text-xs text-[#6B7280]">Managing Director, Goldman Sachs</div>
                    <div className="text-xs text-[#C9A24A] mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <span className="ml-1">5.0/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#0B1B2B]/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    MW
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-[#0B1B2B] italic mb-3">
                      &quot;As a senior partner relocating from Singapore, I needed white-glove service. Relo Network&apos;s executive package exceeded all expectations.&quot;
                    </blockquote>
                    <div className="text-sm font-semibold text-[#0B1B2B]">Marcus Weber</div>
                    <div className="text-xs text-[#6B7280]">Senior Partner, McKinsey & Company</div>
                    <div className="text-xs text-[#C9A24A] mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                      </svg>
                      <span className="ml-1">5.0/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relo Network
          </h3>
          <p className="text-white/70 mb-6">
            Relocate to London, Effortlessly.
          </p>
          <p className="text-white/70">
            &copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
          </p>
        </div>
      </footer>
    </Layout>
  )
}