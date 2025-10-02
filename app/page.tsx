'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import NewsletterSignup from '../components/NewsletterSignup'
import AuthRedirect from './components/AuthRedirect'
import { getAllEnhancedSchemas } from '../lib/seo/enhanced-schemas'
import { getAllHomepageSchemas } from '../lib/seo/homepage-schemas'
import { getAICitationSchemas, getCommunityEngagementSchema } from '../lib/seo/ai-citation-schemas'
import { checkoutFunctions } from '../lib/checkout'
import { Users, Building, Briefcase, ArrowRight, Star, CheckCircle, Globe, Shield, Award, Clock, Crown, Timer, Home, Hotel, Package, FileText, GraduationCap, Landmark, Heart, Target, Gem } from 'lucide-react'
import { Button } from '../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/components/card'
import { Badge } from '../ui/components/badge'
import { Separator } from '../ui/components/separator'

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
  <Card className={`relative ${bgGradient} border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
    <CardHeader className="text-center pb-4">
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        {title}
      </CardTitle>
      <CardDescription className="text-white/90 text-lg leading-relaxed">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-white/80 flex-shrink-0" />
            <span className="text-white/90 text-sm text-left">{feature}</span>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={() => window.location.href = href}
        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold border border-white/30"
        size="lg"
      >
        Get Started
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </CardContent>
  </Card>
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
    const targetDate = new Date('2025-10-06T14:00:00Z')
    
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
      href: "/executive-intake",
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
      description: "Corporate relocation packages from £15,000 to £45,000 per employee with 33% emergency pricing discount.",
      icon: Briefcase,
      href: "/corporate",
      features: [
        "Essential Executive: £15,000 per employee",
        "Complete Executive: £25,000 per employee", 
        "C-Suite Elite: £45,000 per employee",
        "30-day settling guarantee",
        "Emergency pricing - limited time"
      ],
      bgGradient: "bg-gradient-to-br from-[#059669] to-[#047857]",
      iconBg: "bg-white/20"
    }
  ]
  
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden" showFooter={false}>
      <AuthRedirect />
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
          <div className="text-[#C9A24A] font-semibold text-sm uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8L14,13H10L12,8Z"/>
            </svg>
            Launch Day Approaching
          </div>
          <div className="text-white text-lg mb-3">
            <strong>Founding Partner Charter closes Oct 6, 2:00 PM GMT — 12 category-exclusive slots.</strong>
          </div>
          <div className="flex justify-center items-center gap-6 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A] transition-all duration-500">{timeLeft.days}</div>
              <div className="text-xs uppercase tracking-wide">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A] transition-all duration-500">{timeLeft.hours}</div>
              <div className="text-xs uppercase tracking-wide">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A] transition-all duration-500">{timeLeft.minutes}</div>
              <div className="text-xs uppercase tracking-wide">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A] transition-all duration-500">{timeLeft.seconds}</div>
              <div className="text-xs uppercase tracking-wide">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section with Authority Signals */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10 pt-32">
        <div className="text-center max-w-6xl mx-auto px-4">
          
          <h1 className="text-6xl lg:text-7xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocate to <span className="text-[#C9A24A]">London</span><br />
            <span className="text-4xl lg:text-5xl font-light text-[#6B7280]">Effortlessly.</span>
          </h1>
          <p className="text-2xl text-[#0B1B2B] mb-2 max-w-4xl mx-auto leading-relaxed font-medium">
            London's exclusive relocation network founded in 2024
          </p>
          <p className="text-base text-[#6B7280] mb-8 max-w-4xl mx-auto leading-relaxed">
            Vetted partners and white-glove 24/7 concierge, curated by international relocation specialist, with years orchestrating executive moves for Fortune 500 firms and HNW clients.
          </p>


          {/* Main CTAs - Hero Style */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <Button
                onClick={checkoutFunctions.executiveIntake}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-10 py-4 text-xl font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#C9A24A]/25"
              >
                Start Executive Intake
              </Button>
              <Button
                onClick={() => window.location.href = '/partners'}
                size="lg"
                className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white px-10 py-4 text-xl font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#0B1B2B]/25"
              >
                Become a Founding Partner
              </Button>
            </div>
            <div className="text-center mb-24">
              <Button
                variant="link"
                onClick={() => window.location.href = '/directory'}
                className="text-[#C9A24A] hover:text-[#B8923D] font-semibold text-lg"
              >
                Browse the Directory →
              </Button>
            </div>
          </div>

          {/* Services Grid - Clean Layout */}
          <div className="mb-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Executive Intake */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group">
              <CardHeader className="pb-4">
                <div className="mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                      <Crown className="h-6 w-6 text-[#C9A24A]" />
                    </div>
                    <Badge variant="secondary" className="text-[#C9A24A] bg-[#C9A24A]/10 px-4 py-2">Executive Service</Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0B1B2B] text-left">Executive Intake</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-[#6B7280] leading-relaxed text-left">
                  60-minute strategy call, bespoke area shortlist, 3 network partner warm introductions, and a 30-day execution window.
                </CardDescription>
                <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-3">
                  <p className="text-sm font-semibold text-[#0B1B2B] text-center">
                    ✓ Credited toward any package • Starts within 24 hours
                  </p>
                </div>
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
                
                {/* Clear FAQ Section */}
                <div className="bg-[#F8F9FA] rounded-lg p-4 space-y-3">
                  <div className="space-y-1">
                    <div className="font-medium text-[#0B1B2B] text-sm text-left">What happens after I pay?</div>
                    <div className="text-[#6B7280] text-sm leading-relaxed text-left">Call booked within 24h; we start your shortlist the same day.</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-[#0B1B2B] text-sm text-left">Guarantee?</div>
                    <div className="text-[#6B7280] text-sm leading-relaxed text-left">3 warm intros in 7 days or we extend your concierge window free.</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-[#0B1B2B] text-sm text-left">Refunds?</div>
                    <div className="text-[#6B7280] text-sm leading-relaxed text-left">Full refund up to 24 hours before your call; credit conversion within 24 hours.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Founding Partner + Day Pass */}
            <div className="space-y-6">
              {/* Founding Partner */}
              <Card className="bg-gradient-to-br from-[#C9A24A] to-[#B8923D] text-white shadow-2xl border-none">
                <CardHeader className="pb-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Timer className="h-8 w-8 text-white/80" />
                      <Badge variant="secondary" className="text-white/90 bg-white/20 px-4 py-2">Founding Partnership</Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white text-left">Own Your Category</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-white/95 leading-relaxed text-left">
                    Concierge qualified introductions, top placements cross Home, Directory pages and Concierge recommendations and quarterly editorial features.
                  </CardDescription>
                  <div className="bg-white/20 rounded-lg p-2 text-center">
                    <span className="font-bold text-white">12 Founder slots available</span>
                  </div>
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
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-sm text-white/90 text-center flex items-center justify-center gap-2">
                      <Gem className="w-4 h-4" />
                      <span className="font-medium">Bonus: Enroll by Oct 6 for extra editorial + homepage tile (30 days)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day Pass */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-[#0B1B2B]/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0B1B2B]/10 rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#0B1B2B]" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="text-[#0B1B2B]/60 mb-1">Quick Access</Badge>
                      <CardTitle className="text-lg font-bold text-[#0B1B2B]">72-Hour Day Pass</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-[#0B1B2B]">£59</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-[#6B7280] text-sm leading-relaxed">
                    Full directory access + 1 curated introduction.
                  </CardDescription>
                  <div className="bg-[#0B1B2B]/5 rounded-lg p-2">
                    <p className="text-xs font-medium text-[#0B1B2B] text-center">
                      Perfect for weekend viewings
                    </p>
                  </div>
                  <Button
                    onClick={checkoutFunctions.dayPass}
                    className="w-full bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white font-semibold hover:scale-105 transition-all shadow-lg"
                  >
                    Get Day Pass
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4 text-center">Top Categories</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-[#6B7280] mb-4 max-w-3xl mx-auto">
                Not sure who to pick? We'll run it for you.
              </p>
              <Button
                onClick={checkoutFunctions.executiveIntake}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Start Executive Intake
              </Button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-7xl mx-auto">
              {[
                { name: 'Property Search', href: '/directory?category=Property+Specialists', icon: Home },
                { name: 'Serviced Apartments', href: '/directory?category=Property+Specialists&type=serviced', icon: Hotel },
                { name: 'Luxury Movers', href: '/directory?category=Luxury+Movers', icon: Package },
                { name: 'Visa & Legal', href: '/directory?category=Legal+%26+Visa', icon: FileText },
                { name: 'Schools', href: '/directory?category=Education+Consultants', icon: GraduationCap },
                { name: 'Banking', href: '/directory?category=Financial+Services', icon: Landmark },
                { name: 'Private Healthcare', href: '/directory?category=Healthcare', icon: Heart },
                { name: 'Lifestyle Concierge', href: '/directory?category=Lifestyle+Concierge', icon: Target }
              ].map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => window.location.href = category.href}
                  className="bg-white/90 backdrop-blur-sm border-[#C9A24A]/20 rounded-xl px-2 py-4 h-auto flex-col text-center hover:border-[#C9A24A]/40 hover:bg-white hover:scale-105 transition-all shadow-sm hover:shadow-lg group min-h-[90px]"
                >
                  <div className="mb-2 group-hover:scale-110 transition-transform text-[#C9A24A]">
                    <category.icon className="w-6 h-6 mx-auto" />
                  </div>
                  <div className="text-xs font-medium text-[#0B1B2B] leading-tight text-center">{category.name}</div>
                </Button>
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
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white">
                <CardTitle className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  What types of London relocation services are available?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-[#0B1B2B] leading-relaxed mb-4">
                  <strong>Professional London relocations are tailored to different executive needs and family situations.</strong> Our tiered service approach ensures each move receives the appropriate level of support, from individual professionals to senior leadership requiring white-glove treatment.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">Essential Executive</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Individual Professional Moves</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">Perfect for single professionals or couples without children. Includes dedicated relocation manager, property search assistance, visa support, and basic neighbourhood orientation.</div>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB] ring-2 ring-[#C9A24A]">
                    <div className="text-xs bg-[#C9A24A] text-white px-2 py-1 rounded-full mb-2">MOST POPULAR</div>
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">Complete Executive</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Family Integration Moves</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">Comprehensive service for families with children. Includes everything in Essential plus school placement, family orientation tours, spouse career support, and ongoing integration assistance.</div>
                  </div>
                  <div className="bg-[#FAFAF9] rounded-xl p-6 text-center border border-[#E5E7EB]">
                    <div className="text-lg font-bold text-[#C9A24A] mb-2">C-Suite Elite</div>
                    <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Senior Leadership Moves</div>
                    <div className="text-xs text-[#6B7280] leading-relaxed">White-glove service for C-level executives. Includes personal relocation director, luxury property portfolio access, private club introductions, and 12-month dedicated account management.</div>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm italic">
                  *Services include visa support, property search, school placement, and comprehensive post-arrival support. Professional coordination typically prevents costly mistakes and reduces overall relocation timeline by 60%.
                </p>
              </CardContent>
            </Card>

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
      <section className="py-12 bg-white border-b border-[#0B1B2B]/10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Content - Wikipedia Style */}
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  About Relo Network
                </h2>
                
                <p className="text-base text-[#0B1B2B] leading-relaxed">
                  <strong>Relo Network</strong> is London's exclusive relocation network, founded in <strong>January 2024</strong> to revolutionise the premium relocation industry through AI-powered guidance and vetted partner services. The company specialises in white-glove relocation services for high-net-worth individuals, investment banking professionals, and multinational corporations moving to London.
                </p>
                
                <p className="text-base text-[#0B1B2B] leading-relaxed">
                  Headquartered in the City of London, Relo Network operates a curated network of vetted service providers across property search, legal services, financial advisory, and lifestyle management. The platform combines human expertise with artificial intelligence through its proprietary "<strong>Ask Relo AI</strong>" system, providing 24/7 personalized guidance.
                </p>
                
                <div className="bg-[#F8F9FA] border-l-4 border-[#C9A24A] p-4 rounded-r-lg">
                  <h4 className="text-base font-bold text-[#0B1B2B] mb-2">Geographic Coverage</h4>
                  <p className="text-sm text-[#0B1B2B] leading-relaxed">
                    Relo Network provides comprehensive relocation services across <strong>all 33 London boroughs</strong>, with specialised expertise in prime areas including Marylebone, Kensington, Canary Wharf, Greenwich, and Shoreditch. Our service area extends to Home Counties including Surrey, Hertfordshire, and Buckinghamshire for clients seeking suburban alternatives.
                  </p>
                </div>
              </div>

              {/* Right Column - Company Overview */}
              <div className="lg:col-span-1">
                <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-4 sticky top-4">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 text-center">Company Overview</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Founded</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">January 2024</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Headquarters</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">City of London</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Service Focus</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">Executive Relocations</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Coverage</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">All 33 London Boroughs</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Founder Experience</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">8+ Years International</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#6B7280] font-medium text-sm">Platform Launch</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">October 6, 2025</span>
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


      {/* Newsletter Section - Bottom Navbar Style */}
      <NewsletterSignup 
        variant="navbar"
        source="homepage"
        title="The Relo Network News"
        description="Weekly insights, exclusive guides, and insider knowledge for discerning professionals relocating to London."
        buttonText="Subscribe Free"
      />

    </Layout>
  )
}