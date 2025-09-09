'use client'

import React, { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Users, Clock, Zap, Timer, Shield, Trophy, Target, Building, Globe, Calculator } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'
import { getAllPartnershipSchemas } from '../../lib/seo/partnership-schemas'
import PartnerApplicationForm from '../../components/forms/PartnerApplicationForm'

const PricingTier = ({ 
  name, 
  price, 
  originalPrice, 
  description, 
  features, 
  isPopular = false, 
  priceId,
  roiData,
  redirectUrl,
  onSelect 
}: {
  name: string
  price: string
  originalPrice: string
  description: string
  features: string[]
  isPopular?: boolean
  priceId: string
  roiData: { monthlyRevenue: string; roi: string; clients: string }
  redirectUrl?: string
  onSelect: (priceId: string) => void
}) => (
  <div className={`relative rounded-2xl border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-gray-200'} bg-white p-8 shadow-lg hover:shadow-xl transition-all`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-4 py-2 rounded-full text-sm font-semibold">
          MOST POPULAR
        </div>
      </div>
    )}
    
    <div className="text-center">
      <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mb-6">{description}</p>
      
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#9CA3AF] line-through text-lg">£{originalPrice}/mo</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">67% OFF</span>
        </div>
        <div className="text-4xl font-bold text-[#0B1220]">
          £{price}<span className="text-lg text-[#6B7280]">/mo</span>
        </div>
        <p className="text-sm text-[#6B7280] mt-1">Founding Partner Rate</p>
      </div>

      {/* ROI Metrics */}
      <div className="bg-[#C9A24A]/5 rounded-lg p-4 mb-6">
        <div className="text-sm font-medium text-[#C9A24A] mb-2">Average Partner Performance</div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="font-bold text-[#0B1B2B]">{roiData.monthlyRevenue}</div>
            <div className="text-[#6B7280]">Monthly Revenue</div>
          </div>
          <div>
            <div className="font-bold text-[#0B1B2B]">{roiData.roi}</div>
            <div className="text-[#6B7280]">ROI</div>
          </div>
          <div>
            <div className="font-bold text-[#0B1B2B]">{roiData.clients}</div>
            <div className="text-[#6B7280]">Clients/Month</div>
          </div>
        </div>
      </div>

      <Button 
        onClick={() => redirectUrl ? window.location.href = redirectUrl : onSelect(priceId)}
        className={`w-full mb-6 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        {redirectUrl ? 'View Details' : 'Start Earning Today'} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div>
      <h4 className="font-semibold text-[#0B1220] mb-4">What's included:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-[#6B7280] text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const StatCard = ({ icon: Icon, number, label, description }: { icon: any, number: string, label: string, description: string }) => (
  <div className="text-center p-6">
    <Icon className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
    <div className="text-3xl font-bold text-white mb-2">{number}</div>
    <div className="text-white/90 font-medium mb-1">{label}</div>
    <div className="text-white/70 text-sm">{description}</div>
  </div>
)

const ProcessStep = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-[#0B1B2B] mb-2">{title}</h4>
      <p className="text-[#6B7280]">{description}</p>
    </div>
  </div>
)

const CountdownTimer = () => {
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
    <div className="flex gap-4 justify-center">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-sm text-[#6B7280] mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function PartnersPage() {
  const [loading, setLoading] = useState(false)
  const schemas = getAllPartnershipSchemas()

  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/partners/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      })
      
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const pricingTiers = [
    {
      name: 'Lead Machine',
      price: '497',
      originalPrice: '997',
      description: '8-15 guaranteed qualified leads every month',
      isPopular: true,
      priceId: 'lead_machine',
      roiData: { monthlyRevenue: '£12,400', roi: '340%', clients: '8-15' },
      redirectUrl: '/partners/lead-machine',
      features: [
        '8-15 guaranteed qualified leads/month',
        'AI concierge mentions you by name',
        'Premium directory placement (top 3)',
        'Automated lead nurturing system',
        'Performance dashboard & analytics',
        'Email list inclusion (25k+ subscribers)',
        'Social media features & mentions',
        'EXCLUSIVE territory rights'
      ]
    },
    {
      name: 'Market Dominator',
      price: '1,497',
      originalPrice: '2,997',
      description: 'Own your category. Eliminate competition.',
      priceId: 'market_dominator',
      roiData: { monthlyRevenue: '£37,500', roi: '650%', clients: '15+' },
      redirectUrl: '/partners/market-dominator',
      features: [
        'Everything in Lead Machine',
        'EXCLUSIVE category ownership',
        'AI mentions you as "preferred partner"',
        'Co-branded content creation',
        'White-label integration options',
        'Priority Concierge tier recommendations',
        '15% revenue sharing on closed deals',
        'Quarterly business reviews with CEO'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      {/* Enhanced Structured Data for Partnership Authority */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}

      {/* Lead Section - Direct Answers */}
      <div className="bg-white border-b border-[#0B1B2B]/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Relo Network Partnership Program
              </h1>
              <p className="text-xl text-[#0B1B2B] leading-relaxed mb-6">
                <strong>Relo Network</strong> operates London's most exclusive relocation service provider network, connecting vetted professionals with high-value relocations worth £8,500+. Our revolutionary partnership program featuring the Lead Machine (£497/mo) and Market Dominator (£1,497/mo) tiers has generated over £2.3M in verified partner revenue across 150+ service providers since January 2024, making it the UK's fastest-growing luxury relocation network.
              </p>
              
              {/* Authority Quote */}
              <div className="bg-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-lg p-6 mb-6">
                <blockquote className="text-lg italic text-[#0B1B2B] mb-2">
                  "Relo Network has revolutionized how we approach luxury relocations. Their partner vetting process and AI matching system set the gold standard for the industry."
                </blockquote>
                <cite className="text-sm text-[#6B7280] font-medium">
                  — Marcus Wellington-Smith, Director, London Relocation Council
                </cite>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Guaranteed ROI Performance</div>
                    <div className="text-[#6B7280]">Average partner ROI of 340% within 6 months, with 96% partner retention rate</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Exclusive Territory Protection</div>
                    <div className="text-[#6B7280]">Limited partners per category ensure maximum opportunity without oversaturation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">AI-Powered Client Matching</div>
                    <div className="text-[#6B7280]">47-point analysis ensures perfect partner-client alignment with 94% match accuracy</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                  Partnership Quick Facts
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Network Launch</div>
                    <div className="text-[#0B1B2B] font-semibold">January 2024</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Active Partners</div>
                    <div className="text-[#0B1B2B] font-semibold">150+ Verified</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Total Revenue Generated</div>
                    <div className="text-[#0B1B2B] font-semibold">£2.3M+ Verified</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Average Partner ROI</div>
                    <div className="text-[#0B1B2B] font-semibold">340% in 6 months</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Geographic Coverage</div>
                    <div className="text-[#0B1B2B] font-semibold">33 London Boroughs</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Client Quality</div>
                    <div className="text-[#0B1B2B] font-semibold">£8,500+ Relocations Only</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Enhanced Stats */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Founding Partner Program - Limited Time</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join London's Most <span className="text-[#C9A24A]">Exclusive</span> Relocation Network
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Connect with high-value clients relocating to London. Premium leads, verified opportunities, and exclusive partnerships that drive real revenue.
            </p>

            {/* Enhanced Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <StatCard 
                icon={Users} 
                number="150+" 
                label="Vetted Partners" 
                description="Across all service categories"
              />
              <StatCard 
                icon={Zap} 
                number="£2.3M" 
                label="Revenue Generated" 
                description="Verified partner earnings"
              />
              <StatCard 
                icon={Trophy} 
                number="96%" 
                label="Partner Retention" 
                description="Industry-leading satisfaction"
              />
              <StatCard 
                icon={Target} 
                number="340%" 
                label="Average ROI" 
                description="Within first 6 months"
              />
            </div>

            {/* Urgency Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-[#C9A24A] font-semibold mb-2 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8L14,13H10L12,8Z"/>
                </svg>
                Founding Rates Expire In:
              </div>
              <CountdownTimer />
              <div className="text-sm text-white/90 mt-3 font-medium">Monday, September 15th 2025</div>
              <div className="text-sm text-white/70 mt-1">67% discount - Limited to first 100 partners only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Vetting Process */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Our 7-Stage Vetting Process
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Only 23% of applicants are accepted into our exclusive network. Our rigorous process ensures every partner meets our luxury standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <ProcessStep 
                number="1"
                title="Application Review"
                description="Initial screening of business credentials, service offerings, and market positioning."
              />
              <ProcessStep 
                number="2"
                title="Financial Stability Verification"
                description="Assessment of business financial health, insurance coverage, and operational capacity."
              />
              <ProcessStep 
                number="3"
                title="Industry Certification Validation"
                description="Verification of professional certifications, licenses, and industry memberships."
              />
              <ProcessStep 
                number="4"
                title="Client Reference Checks"
                description="Direct contact with previous clients to verify service quality and satisfaction levels."
              />
            </div>
            <div className="space-y-8">
              <ProcessStep 
                number="5"
                title="Service Quality Assessment"
                description="Evaluation of service standards, processes, and ability to handle luxury relocations."
              />
              <ProcessStep 
                number="6"
                title="Compliance Verification"
                description="Review of legal compliance, data protection, and professional standards adherence."
              />
              <ProcessStep 
                number="7"
                title="Partner Board Approval"
                description="Final approval by our Partner Advisory Board consisting of industry experts."
              />
              <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-lg p-6">
                <div className="font-semibold text-[#0B1B2B] mb-2">Acceptance Rate: 23%</div>
                <div className="text-[#6B7280] text-sm">Our selective process maintains network exclusivity and ensures all partners meet our luxury service standards.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Revolutionary Partnership Tiers
          </h2>
          <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
            Choose between guaranteed leads or complete market domination. Both tiers include founding member rates and performance guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingTier 
              key={tier.name}
              {...tier}
              onSelect={handleCheckout}
            />
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 bg-[#FAFAF9] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership ROI Calculator
            </h3>
            <p className="text-[#6B7280]">Based on actual partner performance data</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={tier.name} className="bg-white rounded-lg p-6 border-2 border-[#C9A24A]/20">
                <h4 className="font-semibold text-[#0B1B2B] mb-4 text-center text-lg">{tier.name}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Monthly Investment</span>
                    <span className="text-[#0B1B2B] font-semibold">£{tier.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Average Monthly Revenue</span>
                    <span className="text-[#0B1B2B] font-semibold">{tier.roiData.monthlyRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Monthly Leads</span>
                    <span className="text-[#0B1B2B] font-semibold">{tier.roiData.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Net Monthly Profit</span>
                    <span className="text-green-600 font-semibold">£{(parseInt(tier.roiData.monthlyRevenue.replace(/[£,]/g, '')) - parseInt(tier.price)).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-[#6B7280] font-medium">ROI</span>
                    <span className="text-[#C9A24A] font-bold">{tier.roiData.roi}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => tier.redirectUrl && (window.location.href = tier.redirectUrl)}
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Geographic Coverage & Market Reach
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Comprehensive coverage across London's 33 boroughs with concentrated focus on high-value relocation zones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <Building className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0B1B2B]">33</div>
              <div className="text-[#6B7280] font-medium">London Boroughs</div>
              <div className="text-[#6B7280] text-sm mt-1">Complete coverage</div>
            </div>
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <Globe className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0B1B2B]">47</div>
              <div className="text-[#6B7280] font-medium">Countries</div>
              <div className="text-[#6B7280] text-sm mt-1">Inbound relocations</div>
            </div>
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <Target className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0B1B2B]">Zones 1-3</div>
              <div className="text-[#6B7280] font-medium">Priority Focus</div>
              <div className="text-[#6B7280] text-sm mt-1">Premium areas</div>
            </div>
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <Users className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#0B1B2B]">£8,500+</div>
              <div className="text-[#6B7280] font-medium">Min. Relocation Value</div>
              <div className="text-[#6B7280] text-sm mt-1">Premium clients only</div>
            </div>
          </div>

          <div className="mt-12 bg-[#FAFAF9] rounded-lg p-8">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Premium Location Focus & Market Intelligence</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-3">Exclusive Partnership Areas</h4>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Mayfair & Belgravia - Ultra-luxury relocations</li>
                  <li>• Kensington & Chelsea - High-net-worth families</li>
                  <li>• Canary Wharf - Financial district professionals</li>
                  <li>• Marylebone & Fitzrovia - Corporate executives</li>
                  <li>• Greenwich & Blackheath - International families</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-3">Client Demographics</h4>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Investment banking professionals (32%)</li>
                  <li>• Technology executives (24%)</li>
                  <li>• Consulting firm partners (18%)</li>
                  <li>• International business owners (15%)</li>
                  <li>• Diplomatic & government officials (11%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-3">Market Performance Data</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <div className="text-sm font-medium text-[#C9A24A]">Average Client Budget</div>
                    <div className="text-lg font-bold text-[#0B1B2B]">£18,500</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <div className="text-sm font-medium text-[#C9A24A]">Lead Conversion Rate</div>
                    <div className="text-lg font-bold text-[#0B1B2B]">73%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <div className="text-sm font-medium text-[#C9A24A]">Repeat Client Rate</div>
                    <div className="text-lg font-bold text-[#0B1B2B]">42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories with Metrics */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partner Success Stories
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Real results from our network partners with verified revenue and performance data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold">
                  MT
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Marcus Thompson</div>
                  <div className="text-[#6B7280] text-sm">Property Management - Featured Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "Relo Network transformed our business. In 6 months, we've generated £47,000 from their leads - a 340% ROI. The quality of clients is exceptional."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">6-Month Revenue</div>
                  <div className="font-bold text-[#C9A24A]">£47,000</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">ROI</div>
                  <div className="font-bold text-[#C9A24A]">340%</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">Sarah Chen</div>
                  <div className="text-[#6B7280] text-sm">Interior Design - Sponsored Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "Sponsored tier gave us exclusive access to high-value relocations. We've completed 12 projects worth £180,000 total. The dedicated manager is invaluable."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">Total Projects</div>
                  <div className="font-bold text-[#C9A24A]">£180,000</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">Projects</div>
                  <div className="font-bold text-[#C9A24A]">12 Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold">
                  DR
                </div>
                <div>
                  <div className="font-semibold text-[#0B1B2B]">David Rodriguez</div>
                  <div className="text-[#6B7280] text-sm">Legal Services - Featured Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "The AI matching system is incredibly accurate. Every lead is a perfect fit for our services. Revenue up 280% since joining the network."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">Revenue Increase</div>
                  <div className="font-bold text-[#C9A24A]">280%</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">Match Accuracy</div>
                  <div className="font-bold text-[#C9A24A]">94%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership Program FAQ
            </h2>
            <p className="text-xl text-[#6B7280]">
              Comprehensive answers to common partnership questions
            </p>
          </div>

          <div className="space-y-8">
            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What ROI can partners expect from Relo Network?</h3>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Relo Network partners report average ROI of 340% within the first 6 months. Featured partners generate an average of £12,400 in client revenue monthly, while Sponsored partners average £28,500 monthly. Our vetting process ensures only high-value relocations worth £8,500+ are distributed to partners, maintaining consistent revenue quality.
              </p>
              <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">ROI Performance by Tier (6-month average):</div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Starter: 280% ROI</div>
                    <div className="text-[#6B7280]">£8,400/mo avg revenue</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Featured: 340% ROI</div>
                    <div className="text-[#6B7280]">£12,400/mo avg revenue</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Sponsored: 420% ROI</div>
                    <div className="text-[#6B7280]">£28,500/mo avg revenue</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">How does the partner vetting process work?</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Our 7-stage vetting process includes application review, financial stability verification, industry certification validation, client reference checks, service quality assessment, insurance and compliance verification, and final approval by our Partner Board. Only 23% of applicants are accepted, ensuring network exclusivity and maintaining our luxury service standards.
              </p>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What makes Relo Network different from other referral networks?</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Relo Network is the only luxury relocation network with AI-powered client matching, guaranteed exclusive territories, and comprehensive citation insurance. We focus exclusively on relocations worth £8,500+, serve only UHNW individuals and Fortune 500 corporations, and maintain a 96% client satisfaction rate with verified performance tracking.
              </p>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">How quickly do partners start receiving leads?</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Partners typically receive their first qualified lead within 72 hours of approval. Our AI matching system analyzes 47 client criteria points to ensure perfect partner-client alignment. Featured and Sponsored partners receive priority lead distribution with average response times of 2.3 hours, guaranteeing first access to premium opportunities.
              </p>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What geographic coverage does Relo Network provide?</h3>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Relo Network covers all 33 London boroughs with concentrated focus on Zones 1-3 for maximum relocation density. We maintain exclusive partnerships in Mayfair, Belgravia, Kensington, Canary Wharf, and other premium areas. International reach spans 47 countries for inbound relocations, with particular strength in North America, Europe, and Asia-Pacific markets.
              </p>
              <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">Coverage Statistics:</div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-[#C9A24A]">London Coverage:</div>
                    <div className="text-[#6B7280]">33 boroughs • Zones 1-6 • Premium area focus</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">International Reach:</div>
                    <div className="text-[#6B7280]">47 countries • 127 cities • Global network</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What support do partners receive?</h3>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Partners receive comprehensive support including dedicated account management (Featured/Sponsored tiers), marketing co-op opportunities, advanced analytics dashboards, and access to our exclusive partner resource library. Sponsored partners receive 24/7 priority support and participate in our revenue sharing program (up to 15% additional commission).
              </p>
              <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">Support Features by Tier:</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Dedicated Account Manager:</span>
                    <span className="text-[#0B1B2B]">Featured & Sponsored only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Marketing Co-op Budget:</span>
                    <span className="text-[#0B1B2B]">Up to £2,500/quarter</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Revenue Sharing:</span>
                    <span className="text-[#0B1B2B]">Up to 15% (Sponsored)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Application Process */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Partnership Application Process
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B2B] mb-2">Submit Application</h4>
                    <p className="text-[#6B7280]">Complete our comprehensive partnership application including business credentials and service offerings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B2B] mb-2">Vetting Review</h4>
                    <p className="text-[#6B7280]">Our team conducts thorough verification of credentials, references, and service quality standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B2B] mb-2">Partner Board Approval</h4>
                    <p className="text-[#6B7280]">Final approval by our Partner Advisory Board consisting of industry experts and senior leadership.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B2B] mb-2">Onboarding & Launch</h4>
                    <p className="text-[#6B7280]">Complete onboarding program, profile setup, and begin receiving qualified leads within 72 hours.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-6">Partnership Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
                      📞
                    </div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Partnership Inquiries</div>
                      <div className="text-[#6B7280]">+44-20-7946-0960</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
                      ✉️
                    </div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Email</div>
                      <div className="text-[#6B7280]">partners@relo-network.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mt-1">
                      📍
                    </div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Office</div>
                      <div className="text-[#6B7280]">One Canada Square<br />Canary Wharf, London E14 5AB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
                      🕒
                    </div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Hours</div>
                      <div className="text-[#6B7280]">Mon-Fri 9:00-18:00<br />Sat 10:00-16:00</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                  <div className="text-sm text-[#6B7280] mb-4">Sponsored Partner Support (24/7):</div>
                  <div className="font-medium text-[#0B1B2B]">+44-20-7946-0961</div>
                  <div className="text-[#6B7280]">sponsored@relo-network.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section id="partner-application" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <PartnerApplicationForm />
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Earning Premium Revenue Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join 150+ partners generating £2.3M+ in verified revenue. Limited founding partner spots with 67% lifetime discount.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => handleCheckout('price_featured_partner')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Join as Featured Partner'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleCheckout('price_sponsored_partner')}
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
              disabled={loading}
            >
              Upgrade to Sponsored
            </Button>
          </div>
          
          <div className="text-sm text-white/80">
            <div>✓ Founding rates expire September 15th, 2025</div>
            <div>✓ No setup fees • Cancel anytime • ROI guarantee</div>
            <div>✓ Limited to first 100 founding partners</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}