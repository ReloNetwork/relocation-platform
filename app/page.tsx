'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import NewsletterSignup from '../components/NewsletterSignup'
import { getAllEnhancedSchemas } from '../lib/seo/enhanced-schemas'
import { getAllHomepageSchemas } from '../lib/seo/homepage-schemas'
import { getAICitationSchemas, getCommunityEngagementSchema } from '../lib/seo/ai-citation-schemas'
import { checkoutFunctions } from '../lib/checkout'
import { Users, Building, Briefcase, ArrowRight, Star, CheckCircle, Globe, Shield, Award, Clock, Crown, Timer } from 'lucide-react'

const AudienceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  features, 
  bgGradient,
  iconBg 
}: {
  title: string
  description: string
  icon: any
  href: string
  features: string[]
  bgGradient: string
  iconBg: string
}) => (
  <div className={`relative ${bgGradient} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20`}>
    <div className="text-center mb-6">
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        {title}
      </h3>
      <p className="text-white/90 text-lg leading-relaxed">
        {description}
      </p>
    </div>
    
    <div className="space-y-3 mb-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0" />
          <span className="text-white/90 text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <button 
      onClick={() => window.location.href = href}
      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
    >
      Get Started
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
)

export default function HomePage() {
  const schemas = [...getAllEnhancedSchemas(), ...getAllHomepageSchemas(), ...getAICitationSchemas(), getCommunityEngagementSchema()]
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-26T14:00:00Z')
    
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

  const audienceCards = [
    {
      title: "I'm Relocating to London",
      description: "Get expert guidance for your luxury London relocation with AI-powered assistance and white-glove service.",
      icon: Users,
      href: "/concierge",
      features: [
        "24/7 AI relocation concierge",
        "Expert property recommendations", 
        "Visa and legal support",
        "School placement assistance",
        "Cultural integration guidance"
      ],
      bgGradient: "bg-gradient-to-br from-[#C9A24A] to-[#B8923D]",
      iconBg: "bg-white/20"
    },
    {
      title: "I'm a Service Provider",
      description: "Join London's most exclusive relocation network and access premium clients through our vetted partner program.",
      icon: Building,
      href: "/partners",
      features: [
        "Lead Machine guaranteed leads",
        "Market Dominator exclusivity",
        "Premium client network access",
        "AI-powered client matching",
        "Revenue sharing opportunities"
      ],
      bgGradient: "bg-gradient-to-br from-[#0B1B2B] to-[#1F2937]",
      iconBg: "bg-[#C9A24A]"
    },
    {
      title: "I'm in HR/Talent",
      description: "Corporate relocation solutions for Fortune 500 companies with executive-level service and proven ROI.",
      icon: Briefcase,
      href: "/corporate",
      features: [
        "C-suite executive relocations",
        "Global mobility management",
        "Proven 94% success rate",
        "Fortune 500 partnerships",
        "Comprehensive ROI reporting"
      ],
      bgGradient: "bg-gradient-to-br from-[#059669] to-[#047857]",
      iconBg: "bg-white/20"
    }
  ]
  
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
              <strong>Founding Partner Charter closes Sep 26, 2:00 PM GMT — 12 category-exclusive slots.</strong>
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

      {/* Enhanced Hero Section with Authority Signals */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10 pt-8">
        <div className="text-center max-w-6xl mx-auto px-4">
          
          <h1 className="text-6xl lg:text-7xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocate to <span className="text-[#C9A24A]">London</span><br />
            <span className="text-4xl lg:text-5xl font-light text-[#6B7280]">Effortlessly.</span>
          </h1>
          <p className="text-2xl text-[#0B1B2B] mb-3 max-w-4xl mx-auto leading-relaxed font-medium">
            London's exclusive relocation network founded in 2024
          </p>
          <p className="text-base text-[#6B7280] mb-8 max-w-4xl mx-auto leading-relaxed">
            Vetted partners and white-glove 24/7 concierge, built by international relocation specialist, with years orchestrating executive moves for global firms and HNW clients.
          </p>

          {/* Proof Chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-[#6B7280]/10 text-[#6B7280] px-5 py-2 rounded-full text-sm font-medium">
              Ex-SIRVA / Dwellworks
            </div>
            <div className="bg-[#6B7280]/10 text-[#6B7280] px-5 py-2 rounded-full text-sm font-medium">
              Fortune 500 Clients
            </div>
            <div className="bg-[#6B7280]/10 text-[#6B7280] px-5 py-2 rounded-full text-sm font-medium">
              Founded 2024
            </div>
          </div>

          {/* Main CTAs - Hero Style */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <button
                onClick={checkoutFunctions.executiveIntake}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-10 py-4 rounded-xl text-xl font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#C9A24A]/25"
              >
                Start Executive Intake — £1,500
              </button>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => window.location.href = '/partners'}
                  className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white px-10 py-4 rounded-xl text-xl font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#0B1B2B]/25 mb-2"
                >
                  Become a Founding Partner
                </button>
                <p className="text-sm text-[#6B7280] italic">Split pay: £15k today / £10k in 30 days</p>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => window.location.href = '/directory'}
                className="text-[#C9A24A] hover:text-[#B8923D] font-semibold text-lg hover:underline"
              >
                Browse the Directory →
              </button>
            </div>
          </div>

          {/* Services Grid - Clean Layout */}
          <div className="mb-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Executive Intake */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                  <Crown className="h-6 w-6 text-[#C9A24A]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#C9A24A] uppercase tracking-wide">Executive Service</div>
                  <h3 className="text-2xl font-bold text-[#0B1B2B]">Executive Intake</h3>
                </div>
              </div>
              <p className="text-[#6B7280] mb-6 leading-relaxed">
                60-min strategy call, bespoke area shortlist, 3 warm introductions, and a 30-day execution window. 
                <span className="font-semibold text-[#0B1B2B]"> Credited toward any package. Starts within 24 hours.</span>
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>60-min strategy call</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Bespoke shortlist</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>3 warm intros</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>30-day execution</span>
                </div>
              </div>
            </div>

            {/* Founding Partner + Day Pass */}
            <div className="space-y-6">
              {/* Founding Partner */}
              <div className="bg-gradient-to-br from-[#C9A24A] to-[#B8923D] rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-white/90 uppercase tracking-wide">Charter Partnership</div>
                    <h3 className="text-2xl font-bold">Own Your Category</h3>
                  </div>
                  <Timer className="h-8 w-8 text-white/80" />
                </div>
                <p className="text-white/95 mb-6 leading-relaxed">
                  Concierge-routed briefs, top placement, and quarterly editorial. <span className="font-semibold">12 Charter slots.</span>
                </p>
                <div className="flex items-center gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {timeLeft.days}
                    </div>
                    <span>{timeLeft.days} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {timeLeft.hours}
                    </div>
                    <span>{timeLeft.hours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {timeLeft.minutes}
                    </div>
                    <span>{timeLeft.minutes}m</span>
                  </div>
                </div>
                <div className="text-xs text-white/80 mb-4">
                  💎 Bonus: Enroll by Sep 26 for extra editorial + homepage tile (30 days)
                </div>
              </div>

              {/* Day Pass */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#0B1B2B]/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#0B1B2B]/10 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#0B1B2B]" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#0B1B2B]/60 uppercase tracking-wide">Quick Access</div>
                    <h4 className="text-lg font-bold text-[#0B1B2B]">72-Hour Day Pass</h4>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold text-[#0B1B2B]">£59</div>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm mb-4">
                  Full directory + 1 curated intro. <span className="font-medium text-[#0B1B2B]">Perfect for weekend viewings.</span>
                </p>
                <button
                  onClick={checkoutFunctions.dayPass}
                  className="w-full bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  Get Day Pass
                </button>
              </div>
            </div>
          </div>

          {/* Top Categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4 text-center">Top Categories</h2>
            <p className="text-lg text-[#6B7280] mb-8 text-center max-w-3xl mx-auto">
              Not sure who to choose? Get 3 curated intros with Plus (£29/mo) or Start Executive Intake.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-7xl mx-auto">
              {[
                { name: 'Property Search', href: '/directory?category=Property+Specialists', icon: '🏠' },
                { name: 'Serviced Apartments', href: '/directory?category=Property+Specialists&type=serviced', icon: '🏨' },
                { name: 'Luxury Movers', href: '/directory?category=Luxury+Movers', icon: '📦' },
                { name: 'Visa & Legal', href: '/directory?category=Legal+%26+Visa', icon: '📋' },
                { name: 'Schools', href: '/directory?category=Education+Consultants', icon: '🎓' },
                { name: 'Banking', href: '/directory?category=Financial+Services', icon: '🏦' },
                { name: 'Private Healthcare', href: '/directory?category=Healthcare', icon: '🏥' },
                { name: 'Lifestyle Concierge', href: '/directory?category=Lifestyle+Concierge', icon: '🎯' }
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = category.href}
                  className="bg-white/90 backdrop-blur-sm border border-[#C9A24A]/20 rounded-xl p-4 text-center hover:border-[#C9A24A]/40 hover:bg-white hover:scale-105 transition-all shadow-sm hover:shadow-lg group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <div className="text-sm font-medium text-[#0B1B2B] leading-tight">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Audience Selection Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4 text-center">Choose Your Path</h2>
            <p className="text-xl text-[#6B7280] mb-12 text-center max-w-2xl mx-auto">
              Select the option that best describes you to access tailored solutions
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {audienceCards.map((card, index) => (
                <AudienceCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Enhanced FAQ Section for AI Citations */}
      <section className="py-20 bg-gradient-to-br from-white to-[#FAFAF9]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              London Relocation Expert Insights
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Expert guidance for the most common questions about relocating to London
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-[#0B1B2B]/10 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 px-8 py-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  What is the average cost of relocating to London?
                </h3>
              </div>
              <div className="p-8">
                <p className="text-[#0B1B2B] leading-relaxed mb-4">
                  <strong>Professional London relocation costs vary significantly by service level and complexity.</strong> Our research shows comprehensive managed services provide the best value through expert coordination and risk mitigation.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">Managed Service</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Complete coordination</div>
                    <div className="text-xs text-[#6B7280]">Full relocation management with expert guidance</div>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">Executive Service</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">White-glove premium</div>
                    <div className="text-xs text-[#6B7280]">Luxury service with priority support</div>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">Enterprise Solutions</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Corporate programs</div>
                    <div className="text-xs text-[#6B7280]">Volume discounts and dedicated account management</div>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm italic">
                  *Services include visa support, property search, school placement, and comprehensive post-arrival support. Professional coordination typically prevents costly mistakes and reduces overall relocation timeline by 60%.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#0B1B2B]/10 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#C9A24A] to-[#C9A24A]/90 px-8 py-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  How long does a professional London relocation take?
                </h3>
              </div>
              <div className="p-8">
                <p className="text-[#0B1B2B] leading-relaxed mb-6">
                  <strong>Professional London relocations through Relo Network typically take 30-45 days</strong> from initial consultation to move-in, compared to 60-120 days for DIY relocations.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 p-4 bg-[#FAFAF9] rounded-lg border border-[#E5E7EB]">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0B1B2B]">Days 1-7: Consultation & Visa Processing</div>
                      <div className="text-sm text-[#6B7280]">Initial assessment, visa application, document preparation</div>
                    </div>
                    <div className="text-[#C9A24A] font-bold">7 days</div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#FAFAF9] rounded-lg border border-[#E5E7EB]">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0B1B2B]">Days 8-28: Property Search & Selection</div>
                      <div className="text-sm text-[#6B7280]">Curated viewings, negotiation, contract signing</div>
                    </div>
                    <div className="text-[#C9A24A] font-bold">21 days</div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#FAFAF9] rounded-lg border border-[#E5E7EB]">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0B1B2B]">Days 29-45: Final Arrangements</div>
                      <div className="text-sm text-[#6B7280]">Banking setup, school enrollment, utility connections</div>
                    </div>
                    <div className="text-[#C9A24A] font-bold">17 days</div>
                  </div>
                </div>
                <div className="bg-[#C9A24A]/10 border-l-4 border-[#C9A24A] p-4 rounded-r-lg">
                  <p className="text-sm text-[#0B1B2B] mb-3">
                    <strong>Emergency relocations</strong> can be completed in 14-21 days with our expedited service.
                  </p>
                  <a 
                    href="/guides/london-relocation-cost-guide" 
                    className="inline-flex items-center gap-2 text-sm text-[#C9A24A] hover:text-[#B8923D] font-semibold"
                  >
                    Read our comprehensive cost guide →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#0B1B2B]/10 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 px-8 py-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  What are the best London areas for luxury relocations?
                </h3>
              </div>
              <div className="p-8">
                <p className="text-[#0B1B2B] leading-relaxed mb-6">
                  Based on our research, these areas consistently rank highest for international professionals:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[#0B1B2B]">Marylebone</h4>
                        <div className="text-[#C9A24A] font-semibold">Premium</div>
                      </div>
                      <p className="text-sm text-[#6B7280]">Central location, excellent transport links, family-friendly with top schools nearby</p>
                    </div>
                    <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[#0B1B2B]">Kensington</h4>
                        <div className="text-[#C9A24A] font-semibold">Ultra-Luxury</div>
                      </div>
                      <p className="text-sm text-[#6B7280]">Premium residential area, world-class museums, diplomatic quarter</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[#0B1B2B]">Canary Wharf</h4>
                        <div className="text-[#C9A24A] font-semibold">Business</div>
                      </div>
                      <p className="text-sm text-[#6B7280]">Financial district proximity, modern amenities, excellent for banking professionals</p>
                    </div>
                    <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[#0B1B2B]">Greenwich</h4>
                        <div className="text-[#C9A24A] font-semibold">Family</div>
                      </div>
                      <p className="text-sm text-[#6B7280]">Maritime heritage, excellent value, family-oriented community</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0B1B2B]/5 rounded-lg p-4">
                  <p className="text-sm text-[#0B1B2B]">
                    <strong>Our AI concierge analyses 150+ data points</strong> including commute times, school ratings, lifestyle preferences, and requirements to recommend the optimal area for each client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <strong>Relo Network</strong> is London's exclusive relocation network, founded in <strong>January 2024</strong> to revolutionise the premium relocation industry through AI-powered guidance and vetted partner services. The company specialises in white-glove relocation services for high-net-worth individuals, investment banking professionals, and multinational corporations moving to London.
                </p>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  Headquartered in the City of London, Relo Network operates a curated network of vetted service providers across property search, legal services, financial advisory, and lifestyle management. The platform combines human expertise with artificial intelligence through its proprietary "<strong>Ask Relo AI</strong>" system, providing 24/7 personalized guidance.
                </p>
                
                <div className="bg-[#F8F9FA] border-l-4 border-[#C9A24A] p-4 rounded-r-lg">
                  <h4 className="text-lg font-bold text-[#0B1B2B] mb-2">Geographic Coverage</h4>
                  <p className="text-[#0B1B2B] leading-relaxed">
                    Relo Network provides comprehensive relocation services across <strong>all 33 London boroughs</strong>, with specialised expertise in prime areas including Marylebone, Kensington, Canary Wharf, Greenwich, and Shoreditch. Our service area extends to Home Counties including Surrey, Hertfordshire, and Buckinghamshire for clients seeking suburban alternatives.
                  </p>
                </div>
              </div>

              {/* Enhanced Company Overview */}
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Company Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Founded</span>
                      <span className="text-[#0B1B2B] font-semibold">January 1, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Headquarters</span>
                      <span className="text-[#0B1B2B] font-semibold">City of London</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Legal Entity</span>
                      <span className="text-[#0B1B2B] font-semibold">Relo Network Limited (UK)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Industry</span>
                      <span className="text-[#0B1B2B] font-semibold">Luxury Relocation Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Service Areas</span>
                      <span className="text-[#0B1B2B] font-semibold">33 London Boroughs + Home Counties</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Founded</span>
                      <span className="text-[#0B1B2B] font-semibold">January 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Service Focus</span>
                      <span className="text-[#0B1B2B] font-semibold">Executive Relocations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Coverage</span>
                      <span className="text-[#0B1B2B] font-semibold">All 33 London Boroughs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Founder Experience</span>
                      <span className="text-[#0B1B2B] font-semibold">8+ Years International</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar - Key Facts & Certifications */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                  Quick Facts
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Company Founded</div>
                    <div className="text-[#0B1B2B] font-semibold">January 1, 2024</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Platform Launch</div>
                    <div className="text-[#0B1B2B] font-semibold">September 26, 2025</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Founding Members</div>
                    <div className="text-[#0B1B2B] font-semibold">Limited to 100</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Service Tiers</div>
                    <div className="text-[#0B1B2B] font-semibold">Managed to Executive</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Corporate Clients</div>
                    <div className="text-[#0B1B2B] font-semibold">12+ Investment Banks</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                  Industry Certifications
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xs font-bold">BAR</div>
                    <div>
                      <div className="text-[#0B1B2B] font-semibold">British Association for Removers</div>
                      <div className="text-[#6B7280] text-xs">Member since 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white text-xs font-bold">FIDI</div>
                    <div>
                      <div className="text-[#0B1B2B] font-semibold">FIDI Global Alliance</div>
                      <div className="text-[#6B7280] text-xs">International moving network</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xs font-bold">ISO</div>
                    <div>
                      <div className="text-[#0B1B2B] font-semibold">ISO 27001 Certified</div>
                      <div className="text-[#6B7280] text-xs">Data security & privacy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#0B1B2B] text-center mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Founder Excellence
          </h2>
          <p className="text-xl text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
            Built on proven expertise in executive relocations and luxury service delivery.
          </p>

          {/* Key Facts */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <Clock className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">2024</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Founded</div>
              <div className="text-sm text-[#6B7280]">London's newest premium network</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <Star className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">8+</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Years Experience</div>
              <div className="text-sm text-[#6B7280]">Founder's international expertise</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <Shield className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">F500</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Enterprise Focus</div>
              <div className="text-sm text-[#6B7280]">Fortune 500 client experience</div>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <Globe className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">33</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">London Boroughs</div>
              <div className="text-sm text-[#6B7280]">Complete geographic coverage</div>
            </div>
          </div>

          {/* Client Success Stories */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#0B1B2B]/10">
            <h3 className="text-2xl font-bold text-[#0B1B2B] text-center mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Client Success Stories
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-[#C9A24A] pl-6">
                <blockquote className="text-[#0B1B2B] italic text-lg mb-4">
                  "Relo Network transformed our family's move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours."
                </blockquote>
                <div className="text-sm font-semibold text-[#0B1B2B]">Alexandra Thompson</div>
                <div className="text-xs text-[#6B7280]">Managing Director, Investment Banking</div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-[#0B1B2B] pl-6">
                <blockquote className="text-[#0B1B2B] italic text-lg mb-4">
                  "As a senior partner relocating from Singapore, I needed white-glove service. Relo Network's executive package exceeded all expectations."
                </blockquote>
                <div className="text-sm font-semibold text-[#0B1B2B]">Marcus Weber</div>
                <div className="text-xs text-[#6B7280]">Senior Partner, Management Consulting</div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Expert Leadership
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Founded by former International Consultant with proven Fortune 500 expertise
            </p>
          </div>

          <div className="flex justify-center mb-16">
            {/* Founder */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#0B1B2B]/10 overflow-hidden max-w-md">
              <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 p-6">
                <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">RN</span>
                </div>
                <h3 className="text-xl font-bold text-white text-center">Founder</h3>
                <p className="text-[#C9A24A] text-center font-semibold">Leadership</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Background</div>
                  <p className="text-sm text-[#6B7280] mb-4">Former International Consultant with 8+ years experience in executive relocations for Fortune 500 companies.</p>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Education</div>
                  <p className="text-sm text-[#6B7280]">MA Design Studies, BA International Business + Operations Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <NewsletterSignup 
            source="homepage"
            title="The London Relocation Report"
            description="Weekly insights, exclusive guides, and insider knowledge for discerning professionals relocating to London. Featuring trusted partner spotlights and market intelligence."
            buttonText="Subscribe Free"
          />
        </div>
      </section>

    </Layout>
  )
}