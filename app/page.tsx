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
import VideoHeroBackground from '../components/VideoHeroBackground'
import ProfessionalPartnerBanner from '../components/ProfessionalPartnerBanner'

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
);

export default function HomePage() {
  // FAQ Schema for SEO and LLM Citations
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why 7–30 days vs. 60–120 days DIY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our vetted network partners and established relationships with premium property agents, solicitors, and service providers eliminate the learning curve. Where DIY relocators spend weeks researching areas, comparing properties, and navigating bureaucracy, we provide immediate access to insider knowledge and expedited processes that typically take months to develop independently."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Relo Network for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C-suite executives, senior professionals, and high-net-worth individuals relocating to London who value their time and expect premium service. Our clients typically earn £150k+ annually and require white-glove assistance with property, schools, lifestyle integration, and ongoing concierge support. We also serve HR teams managing executive relocations with guaranteed delivery timelines."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in the 72-Hour Audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Area fit analysis based on commute, lifestyle preferences, and family needs. Curated property shortlist with detailed investment analysis. Optimized viewing itinerary with pre-negotiated viewing slots. Tenancy agreement review with legal recommendations. School catchment area mapping for families. Transportation and lifestyle accessibility assessment."
        }
      },
      {
        "@type": "Question",
        "name": "How do milestone guarantees work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We commit to specific deliverables by Days 7, 14, and 30. If we miss any milestone deadline, you receive a 10% service credit automatically applied to your account. This includes property shortlist delivery, viewing coordination, offer positioning, essential services activation, and ongoing concierge setup. Credits are cumulative and can be applied to additional services or future relocations."
        }
      },
      {
        "@type": "Question",
        "name": "Do you handle visas and immigration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We coordinate with premium immigration law firms for visa applications, but we don't provide legal services directly. Our network includes specialists in Skilled Worker visas, Global Talent visas, and investor routes. We handle document preparation coordination, timeline management, and ensure your move timeline aligns with visa approval. Legal fees are separate from our service packages."
        }
      },
      {
        "@type": "Question",
        "name": "What if my employee declines the relocation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For corporate clients, we offer a 30-day cooling-off period. If an employee withdraws after starting our process, you receive a full refund minus any third-party costs already incurred (property deposits, legal fees, etc.). We also provide family consultation calls to address concerns and demonstrate London lifestyle benefits, which often resolves initial hesitation about international moves."
        }
      }
    ]
  }

  const schemas = [...getAllEnhancedSchemas(), ...getAllHomepageSchemas(), ...getAICitationSchemas(), getCommunityEngagementSchema(), faqSchema]

  // Intersection Observer for fade-in animation with reduced motion support
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])


  const audienceCards = [
    {
      title: "Executive Services",
      description: "Individual executives, professionals, and entrepreneurs relocating to London. Start with our comprehensive assessment.",
      icon: Users,
      href: "/executive-intake",
      features: [
        "72-Hour Setup Audit",
        "Complete relocation service",
        "Family integration support",
        "Personal account manager",
        "Contact for pricing"
      ],
      bgGradient: "bg-gradient-to-br from-[#C9A24A] to-[#B8923D]",
      iconBg: "bg-white/20"
    },
    {
      title: "Corporate Programs",
      description: "HR teams managing employee relocations and corporate mobility programs. Get your personalized assessment.",
      icon: Briefcase,
      href: "/corporate-assessment",
      features: [
        "15-minute needs assessment",
        "Dedicated account management",
        "Volume pricing & SLAs",
        "Executive reporting dashboard",
        "Contact for pricing"
      ],
      bgGradient: "bg-gradient-to-br from-[#0B1B2B] to-[#1a2b3b]",
      iconBg: "bg-white/20"
    }
  ];

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

      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="text-[#C9A24A] font-semibold text-sm uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8L14,13H10L12,8Z"/>
            </svg>
            Now Live
          </div>
          <div className="text-white text-lg mb-3">
            <strong>72-Hour London Setup Audit — Executive relocations made simple.</strong>
          </div>
          <div className="flex justify-center items-center text-white">
            <div className="text-center">
              <div className="text-[#C9A24A] font-semibold">Book your audit call • Corporate assessments available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Hero Background */}
      <VideoHeroBackground className="h-[70vh] md:h-[75vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-3 sm:px-4">
          <div className="backdrop-blur-sm bg-[#0B1B2B]/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              Relocate to <span className="text-[#C9A24A]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>London</span><br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white">Effortlessly.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-2 max-w-4xl mx-auto leading-relaxed font-medium px-4" style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
            }}>
              Your concierge for executive relocations to London.
            </p>
            <p className="text-sm sm:text-base text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed px-4" style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Property, schools, and lifestyle handled in days, not months, for executives and the teams who move them.
            </p>

            {/* Main CTAs - Hero Style */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
              <Button
                onClick={checkoutFunctions.executiveIntake}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 sm:px-6 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#C9A24A]/25 w-full sm:w-auto"
              >
                Book Your 72-Hour Audit
              </Button>
              <Button
                onClick={() => window.location.href = '/corporate-assessment'}
                size="lg"
                className="hidden md:block bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 sm:px-6 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg lg:text-xl font-semibold hover:scale-105 transition-all shadow-2xl border border-white/30 w-full sm:w-auto"
              >
                Corporate Assessment (15 min)
              </Button>
            </div>
            <div className="text-center md:hidden mt-2">
              <Button
                variant="link"
                onClick={() => window.location.href = '/corporate-assessment'}
                className="text-[#C9A24A] hover:text-white font-semibold text-base sm:text-lg"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                Corporate Assessment (15 min)
              </Button>
            </div>
          </div>
        </div>
      </VideoHeroBackground>

      {/* Professional Partner Editorial Banner */}
      <ProfessionalPartnerBanner />

      {/* Spacing between banner and How it Works */}
      <div className="py-16">
          {/* How it works Section */}
          <div className="mb-24 max-w-7xl mx-auto px-4" id="how-it-works">
            <div className="text-center mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                How it works
              </h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                Executive relocation simplified into three clear phases
              </p>
            </div>

            {/* 3-Step Process */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="text-center fade-in" data-step="1">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1B2B] mb-3">72-Hour Audit</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Area fit, property shortlist, viewings itinerary, tenancy agreement review.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center fade-in" data-step="2">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1B2B] mb-3">7-Day Setup</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Viewings, offer positioning, solicitor coordination, utilities and essentials live.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center fade-in" data-step="3">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1B2B] mb-3">Settle & Elevate</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Schools shortlist, spouse support, drivers, clubs—ongoing concierge.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone Progress Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 p-6 md:p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Milestone Guarantee</h3>
                <p className="text-[#6B7280]">Specific deliverables with automatic credit protection</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Day 7 */}
                <div className="text-center p-4 bg-[#C9A24A]/5 rounded-lg border border-[#C9A24A]/10 fade-in">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-3">Day 7</div>
                  <div className="text-sm font-medium text-[#0B1B2B] mb-2">Area Analysis Complete</div>
                  <div className="text-xs text-[#6B7280] leading-relaxed mb-2">
                    Property shortlist + viewing itinerary + schedule confirmed
                  </div>
                  <div className="text-xs font-medium text-[#C9A24A]">or 10% credit applied</div>
                </div>

                {/* Day 14 */}
                <div className="text-center p-4 bg-[#C9A24A]/5 rounded-lg border border-[#C9A24A]/10 fade-in">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-3">Day 14</div>
                  <div className="text-sm font-medium text-[#0B1B2B] mb-2">Viewings Complete</div>
                  <div className="text-xs text-[#6B7280] leading-relaxed mb-2">
                    Offer submitted + tenancy agreement reviewed + legal connected
                  </div>
                  <div className="text-xs font-medium text-[#C9A24A]">or 10% credit applied</div>
                </div>

                {/* Day 30 */}
                <div className="text-center p-4 bg-[#C9A24A]/5 rounded-lg border border-[#C9A24A]/10 fade-in">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-3">Day 30</div>
                  <div className="text-sm font-medium text-[#0B1B2B] mb-2">Settlement Complete</div>
                  <div className="text-xs text-[#6B7280] leading-relaxed mb-2">
                    Moved in + banking setup + school enrollment + concierge active
                  </div>
                  <div className="text-xs font-medium text-[#C9A24A]">or 10% credit applied</div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Results Section */}
          <div className="mb-16 max-w-7xl mx-auto px-4" id="client-results">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Client Results
              </h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                Real outcomes, verified timelines, and partner guarantees
              </p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
              {/* Partner SLA Card */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group hover:scale-[1.02] fade-in">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                      <svg className="h-4 w-4 text-[#C9A24A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <Badge variant="secondary" className="text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 text-xs">SLA Guaranteed</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#0B1B2B] text-left">Partner SLAs</CardTitle>
                </CardHeader>
                <CardContent 
                  className="space-y-2"
                  aria-label="Service level agreements with vetted partners"
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">Property Agents</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">24h response</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">Legal Services</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">48h review</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">School Placement</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">72h shortlist</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-[#6B7280] text-xs font-medium">Banking Setup</span>
                      <span className="font-bold text-[#C9A24A] text-xs">5-day live</span>
                    </div>
                  </div>
                  <div className="bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg p-2">
                    <p className="text-xs font-semibold text-[#0B1B2B] text-center">
                      Written guarantees • 47 vetted partners
                    </p>
                  </div>
                </CardContent>
              </Card>
              {/* Timeline Card */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group hover:scale-[1.02] fade-in">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                      <svg className="h-4 w-4 text-[#C9A24A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <Badge variant="secondary" className="text-[#C9A24A] bg-[#C9A24A]/10 px-2 py-1 text-xs">Speed Record</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#0B1B2B] text-left">Landed Sun → Keys Fri</CardTitle>
                </CardHeader>
                <CardContent 
                  className="space-y-2"
                  aria-label="Executive relocation timeline showing 5-day completion"
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">Landed</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">Sun, Oct 13</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">Viewings</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">Mon-Wed</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-[#C9A24A]/10">
                      <span className="text-[#6B7280] text-xs">Offer Accepted</span>
                      <span className="font-medium text-[#0B1B2B] text-xs">Thu, Oct 17</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-[#6B7280] text-xs font-medium">Keys Received</span>
                      <span className="font-bold text-[#C9A24A] text-xs">Fri, Oct 18</span>
                    </div>
                  </div>
                  <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-2">
                    <p className="text-xs font-semibold text-[#0B1B2B] text-center">
                      5 days • Mayfair • £8.5k/month
                    </p>
                    <div className="flex items-center justify-center text-xs text-[#6B7280] mt-1">
                      <svg className="w-3 h-3 mr-1 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified • Fortune 500 CFO
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Card */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group hover:scale-[1.02] fade-in">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                      <svg className="h-4 w-4 text-[#C9A24A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <Badge variant="secondary" className="text-[#16A34A] bg-[#16A34A]/10 px-2 py-1 text-xs">Verified</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#0B1B2B] text-left">Offer Accepted</CardTitle>
                </CardHeader>
                <CardContent 
                  className="space-y-2"
                  aria-label="Offer acceptance email confirmation"
                >
                  <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg p-2 text-xs">
                    <div className="space-y-1 text-[#0B1B2B]">
                      <p>Offer of <span className="font-bold text-[#16A34A]">£8,500 pcm</span> for Mayfair property <span className="font-bold text-[#16A34A]">ACCEPTED</span></p>
                      <p>Tenancy start: <span className="font-bold">01 November 2025</span></p>
                      <p>Keys received: <span className="font-bold">Friday 18 Oct</span></p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#16A34A] font-medium">Email verified</div>
                    <div className="text-xs text-[#6B7280]">Knight Frank Mayfair</div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Testimonial Card */}
              <Card 
                className="bg-white/95 backdrop-blur-sm shadow-2xl border-[#C9A24A]/20 hover:shadow-[#C9A24A]/10 transition-all group hover:scale-[1.02] fade-in cursor-pointer"
                onClick={() => document.getElementById('video-modal')?.classList.remove('hidden')}
                onKeyDown={(e) => e.key === 'Enter' && document.getElementById('video-modal')?.classList.remove('hidden')}
                tabIndex={0}
                role="button"
                aria-label="Play testimonial video from executive client"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C9A24A]/20 transition-colors">
                      <svg className="h-4 w-4 text-[#C9A24A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <Badge variant="secondary" className="text-[#C9A24A] bg-[#C9A24A]/10 px-2 py-1 text-xs">Testimonial</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#0B1B2B] text-left">Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative bg-gradient-to-br from-[#0B1B2B] to-[#1F2937] rounded-lg overflow-hidden aspect-video cursor-pointer group p-2" onClick={() => {
                    const video = document.querySelector('#testimonial-video') as HTMLVideoElement;
                    if (video) {
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }
                  }}>
                    <video 
                      id="testimonial-video"
                      className="w-full h-full object-contain rounded-md"
                      preload="metadata"
                      poster="/assets/proof-testimonial.jpg"
                      playsInline
                      webkit-playsinline="true"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center center'
                      }}
                      onLoadStart={() => console.log('Video loading started')}
                      onCanPlay={() => console.log('Video can play')}
                      onError={(e) => console.error('Video error:', e)}
                      onPlay={() => {
                        const overlay = document.querySelector('#play-overlay');
                        if (overlay) overlay.classList.add('hidden');
                      }}
                      onPause={() => {
                        const overlay = document.querySelector('#play-overlay');
                        if (overlay) overlay.classList.remove('hidden');
                      }}
                      onEnded={() => {
                        const overlay = document.querySelector('#play-overlay');
                        if (overlay) overlay.classList.remove('hidden');
                      }}
                    >
                      <source src="/videos/London Relocation Solved.mov" type="video/quicktime" />
                      <source src="/videos/London Relocation Solved.mov" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors" id="play-overlay">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-6 h-6 text-[#0B1B2B] ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      45s
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#6B7280] italic">"Exceeded every expectation. Sunday to Friday—remarkable."</p>
                    <div className="text-xs font-medium text-[#0B1B2B] mt-1">Fortune 500 CFO • Oct 2025</div>
                    <div className="text-xs text-[#C9A24A] font-medium mt-1">▶ Client testimonial (45s)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          {/* FAQ Section */}
          <div className="mb-24 max-w-4xl mx-auto px-4" id="faq">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                Everything you need to know about executive relocation to London
              </p>
            </div>

            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    Why 7–30 days vs. 60–120 days DIY?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    Our vetted network partners and established relationships with premium property agents, solicitors, and service providers eliminate the learning curve. Where DIY relocators spend weeks researching areas, comparing properties, and navigating bureaucracy, we provide immediate access to insider knowledge and expedited processes that typically take months to develop independently.
                  </p>
                </div>
              </details>

              {/* FAQ Item 2 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    Who is Relo Network for?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    C-suite executives, senior professionals, and high-net-worth individuals relocating to London who value their time and expect premium service. Our clients typically earn £150k+ annually and require white-glove assistance with property, schools, lifestyle integration, and ongoing concierge support. We also serve HR teams managing executive relocations with guaranteed delivery timelines.
                  </p>
                </div>
              </details>

              {/* FAQ Item 3 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    What's included in the 72-Hour Audit?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    Area fit analysis based on commute, lifestyle preferences, and family needs. Curated property shortlist with detailed investment analysis. Optimized viewing itinerary with pre-negotiated viewing slots. Tenancy agreement review with legal recommendations. School catchment area mapping for families. Transportation and lifestyle accessibility assessment.
                  </p>
                </div>
              </details>

              {/* FAQ Item 4 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    How do milestone guarantees work?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    We commit to specific deliverables by Days 7, 14, and 30. If we miss any milestone deadline, you receive a 10% service credit automatically applied to your account. This includes property shortlist delivery, viewing coordination, offer positioning, essential services activation, and ongoing concierge setup. Credits are cumulative and can be applied to additional services or future relocations.
                  </p>
                </div>
              </details>

              {/* FAQ Item 5 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    Do you handle visas and immigration?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    We coordinate with premium immigration law firms for visa applications, but we don't provide legal services directly. Our network includes specialists in Skilled Worker visas, Global Talent visas, and investor routes. We handle document preparation coordination, timeline management, and ensure your move timeline aligns with visa approval. Legal fees are separate from our service packages.
                  </p>
                </div>
              </details>

              {/* FAQ Item 6 */}
              <details className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#C9A24A]/20 overflow-hidden group fade-in">
                <summary 
                  className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:ring-inset"
                  role="button"
                  aria-expanded="false"
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">
                    What if my employee declines the relocation?
                  </h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">
                    For corporate clients, we offer a 30-day cooling-off period. If an employee withdraws after starting our process, you receive a full refund minus any third-party costs already incurred (property deposits, legal fees, etc.). We also provide family consultation calls to address concerns and demonstrate London lifestyle benefits, which often resolves initial hesitation about international moves.
                  </p>
                </div>
              </details>
            </div>
          </div>


          {/* Partner Directory Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4 text-center">Partner Directory</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-[#6B7280] mb-6 max-w-3xl mx-auto">
                Access our vetted network of London relocation specialists. Start with a personalized assessment for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={checkoutFunctions.executiveIntake}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  Executive Assessment
                </Button>
                <Button
                  onClick={() => window.location.href = '/corporate-assessment'}
                  className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white px-8 py-3 font-semibold hover:scale-105 transition-all shadow-lg"
                >
                  Corporate Assessment
                </Button>
              </div>
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
                  <div className="text-[10px] sm:text-xs font-medium text-[#0B1B2B] leading-tight text-center px-1">
                    {/* Desktop: Full text, Mobile: Abbreviated text for better fit */}
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">
                      {category.name === 'Serviced Apartments' ? 'Serviced Apts' :
                       category.name === 'Private Healthcare' ? 'Healthcare' :
                       category.name === 'Lifestyle Concierge' ? 'Concierge' :
                       category.name}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Service Selection Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4 text-center">Professional Relocation Services</h2>
            <p className="text-xl text-[#6B7280] mb-12 text-center max-w-3xl mx-auto">
              Choose your service track for personalized London relocation support. Start with a comprehensive assessment tailored to your specific needs.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {audienceCards.map((card, index) => (
                <AudienceCard key={index} {...card} />
              ))}
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
              <CardHeader className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white px-8 py-6">
                <CardTitle className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  What types of London relocation services are available?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-[#0B1B2B] leading-relaxed mb-6">
                  <strong>Professional London relocations are tailored through our dual-track service approach.</strong> We offer personalized assessments for both individual executives and corporate teams to ensure each relocation receives the appropriate level of support.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/5 rounded-xl p-6 border border-[#C9A24A]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#C9A24A]">Executive Services</div>
                        <div className="text-sm text-[#6B7280]">Individual professionals & entrepreneurs</div>
                      </div>
                    </div>
                    <ul className="text-sm text-[#0B1B2B] space-y-2">
                      <li>• 72-Hour Setup Audit</li>
                      <li>• Complete relocation service</li>
                      <li>• Family integration support</li>
                      <li>• Personal account manager</li>
                      <li>• Contact for personalized pricing</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-[#0B1B2B]/10 to-[#0B1B2B]/5 rounded-xl p-6 border border-[#0B1B2B]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#0B1B2B] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#0B1B2B]">Corporate Programs</div>
                        <div className="text-sm text-[#6B7280]">HR teams & corporate mobility</div>
                      </div>
                    </div>
                    <ul className="text-sm text-[#0B1B2B] space-y-2">
                      <li>• 15-minute needs assessment</li>
                      <li>• Dedicated account management</li>
                      <li>• Volume pricing & SLAs</li>
                      <li>• Executive reporting dashboard</li>
                      <li>• Contact for corporate pricing</li>
                    </ul>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm italic">
                  *All services include comprehensive support from initial assessment through post-arrival integration. Professional coordination typically reduces relocation timeline by 60%.
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
                  <strong>Relo Network</strong> is London's exclusive relocation network, founded in <strong>January 2024</strong> to revolutionise executive relocations through dual-track professional services. The company operates two distinct service tracks: <strong>Executive Services</strong> for individual professionals and entrepreneurs, and <strong>Corporate Programs</strong> for HR teams managing employee relocations.
                </p>
                
                <p className="text-base text-[#0B1B2B] leading-relaxed">
                  Headquartered in London, Relo Network begins with comprehensive assessments: <strong>72-Hour Setup Audits</strong> for individual executives and <strong>15-minute Corporate Assessments</strong> for HR teams. Our vetted partner network delivers milestone-guaranteed services with automatic credit protection for missed deadlines.
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
                      <span className="text-[#6B7280] font-medium text-sm">Business Model</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">Dual-track Assessment</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E5E7EB]/50">
                      <span className="text-[#6B7280] font-medium text-sm">Service Focus</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">Executive & Corporate</span>
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
                      <span className="text-[#6B7280] font-medium text-sm">Success Rate</span>
                      <span className="text-[#0B1B2B] font-semibold text-sm">96% Completion</span>
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
            Professional dual-track relocation services with milestone guarantees and 96% success rate across executive and corporate relocations.
          </p>

          {/* Key Facts */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
              <Clock className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <div className="text-4xl font-bold text-[#C9A24A] mb-2">2024</div>
              <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Founded</div>
              <div className="text-sm text-[#6B7280]">Dual-track assessment approach</div>
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
              <div className="text-sm text-[#6B7280]">Corporate & executive clients</div>
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