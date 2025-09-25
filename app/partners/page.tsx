'use client'

// 🚀 CACHE BUSTED VERSION - 2025-09-25 - v2.0
import React, { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Users, Clock, Zap, Timer, Shield, Trophy, Target, Building, Globe, Calculator, Mail } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'
import { getAllPartnershipSchemas } from '../../lib/seo/partnership-schemas'
import CharterPartnershipForm from '../../components/forms/CharterPartnershipForm'

const PartnershipTier = ({ 
  name, 
  price, 
  duration, 
  description, 
  features, 
  isPopular = false, 
  priceId,
  onSelect 
}: {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  isPopular?: boolean
  priceId: string
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
        <div className="text-4xl font-bold text-[#0B1220]">
          {price}
        </div>
        <p className="text-lg text-[#6B7280] mt-1">{duration}</p>
        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded px-3 py-1 text-sm text-[#C9A24A] font-medium mt-2 inline-block">
          Charter Rate - Expires Sept 26
        </div>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mb-6 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        Select Partnership <ArrowRight className="ml-2 h-4 w-4" />
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
      let checkoutUrl = ''
      if (priceId === 'founding_partner') {
        checkoutUrl = '/api/partners/checkout/founding-partner'
      } else if (priceId === 'premium_sponsor') {
        checkoutUrl = '/api/partners/checkout/premium-sponsor'
      }
      
      if (checkoutUrl) {
        // Test the API endpoint first
        const response = await fetch(checkoutUrl, { method: 'GET', redirect: 'manual' })
        
        if (response.status === 302 || response.status === 301) {
          // Redirect to the location header or fallback to partner application
          const location = response.headers.get('location')
          if (location && location.includes('stripe.com')) {
            window.location.href = location
          } else {
            // Fallback to partner application form
            document.getElementById('partner-application')?.scrollIntoView({ behavior: 'smooth' })
            alert('Checkout temporarily unavailable. Please fill out the partner application form below, and our team will contact you within 24 hours to complete your charter partnership.')
          }
        } else {
          // Direct navigation if no redirect
          window.location.href = checkoutUrl
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      // Fallback to partner application form
      document.getElementById('partner-application')?.scrollIntoView({ behavior: 'smooth' })
      alert('Checkout temporarily unavailable. Please fill out the partner application form below, and our team will contact you within 24 hours to complete your charter partnership.')
    } finally {
      setLoading(false)
    }
  }

  const partnershipTiers = [
    {
      name: 'Founding Partner',
      price: '£25,000',
      duration: '12 months',
      description: 'Category exclusivity with homepage placement',
      isPopular: true,
      priceId: 'founding_partner',
      features: [
        'Category exclusivity (12 months) in your service area',
        'Top placement across Home & Directory pages',
        'Concierge-qualified introductions',
        '4× editorial features throughout membership',
        'Quarterly pipeline reviews with dedicated support',
        'Territory protection rights',
        'Performance tracking and reporting',
        'Guarantee: qualified opportunities in 90 days or extended exclusivity'
      ]
    },
    {
      name: 'Premium Sponsor',
      price: '£5,000',
      duration: '90 days',
      description: 'Professional referral access with priority placement',
      priceId: 'premium_sponsor',
      features: [
        'Priority referral placement',
        'Professional network access',
        'Marketing exposure opportunities',
        'Performance tracking',
        'Partnership support',
        'Networking event access',
        'Professional development resources'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
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

      {/* Hero Section */}
      <div className="bg-white border-b border-[#0B1B2B]/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Own Your Category in London's Most Vetted Relocation Network
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
              Category exclusivity + concierge-routed intros + homepage placement. 12 Charter slots only. Closes 26 Sept, 2:00 PM GMT.
            </p>
            
            {/* Above the fold CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => handleCheckout('founding_partner')}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Become a Founding Partner — £25,000 (12 months)'}
              </Button>
              <Button 
                onClick={() => handleCheckout('premium_sponsor')}
                size="lg"
                className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white px-8 py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Premium Sponsor — £5,000 (90 days)'}
              </Button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              
              {/* Authority Quote */}
              <div className="bg-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-lg p-6 mb-6">
                <blockquote className="text-lg italic text-[#0B1B2B] mb-2">
                  "Relo Network provides structured opportunities for qualified service providers. Their vetting process maintains professional standards."
                </blockquote>
                <cite className="text-sm text-[#6B7280] font-medium">
                  — Network Partner
                </cite>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#C9A24A] mt-1" />
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Partnership Performance</div>
                    <div className="text-[#6B7280]">Structured referral system with partner retention focus</div>
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
                    <div className="font-semibold text-[#0B1B2B]">Client-Partner Matching</div>
                    <div className="text-[#6B7280]">Structured approach to partner-client alignment</div>
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
                    <div className="text-[#6B7280] font-medium mb-1">Network Partners</div>
                    <div className="text-[#0B1B2B] font-semibold">Vetted Professionals</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Partnership Focus</div>
                    <div className="text-[#0B1B2B] font-semibold">Quality Referrals</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Service Standard</div>
                    <div className="text-[#0B1B2B] font-semibold">Professional Grade</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Geographic Coverage</div>
                    <div className="text-[#0B1B2B] font-semibold">33 London Boroughs</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Client Focus</div>
                    <div className="text-[#0B1B2B] font-semibold">Established Relocations</div>
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

            {/* Professional Network Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <StatCard 
                icon={Users} 
                number="Vetted" 
                label="Network Partners" 
                description="Professional service providers"
              />
              <StatCard 
                icon={Zap} 
                number="Active" 
                label="Referral System" 
                description="Ongoing opportunities"
              />
              <StatCard 
                icon={Trophy} 
                number="Quality" 
                label="Partner Focus" 
                description="Professional standards"
              />
              <StatCard 
                icon={Target} 
                number="Growth" 
                label="Partnership" 
                description="Business development"
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
              <div className="text-sm text-white/90 mt-3 font-medium">Friday, September 26th 2025</div>
              <div className="text-sm text-white/70 mt-1">Charter Rate - Limited to 12 founding positions</div>
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
          {partnershipTiers.map((tier) => (
            <PartnershipTier 
              key={tier.name}
              {...tier}
              onSelect={handleCheckout}
            />
          ))}
        </div>

        {/* Detailed Tier Authority Comparison */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-[#0B1B2B]/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Charter Partnership Tiers
            </h3>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Choose your level of network participation and territorial access
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founding Partner Focus */}
            <div className="bg-[#FAFAF9] rounded-xl p-8 border border-[#C9A24A]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#0B1B2B]">Founding Partner</h4>
                  <p className="text-[#C9A24A] font-semibold">Category Exclusivity & Premium Placement</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#C9A24A] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Exclusive Territory</h5>
                  <p className="text-[#6B7280] text-sm">Protected service category within your geographic area, ensuring no direct competition within the network.</p>
                </div>
                
                <div className="border-l-4 border-[#C9A24A] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Homepage Placement</h5>
                  <p className="text-[#6B7280] text-sm">Featured positioning on our homepage for maximum visibility to incoming referrals and network traffic.</p>
                </div>
                
                <div className="border-l-4 border-[#C9A24A] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Concierge Routing</h5>
                  <p className="text-[#6B7280] text-sm">Direct introduction pathway through our concierge team for qualified opportunities in your service area.</p>
                </div>

                <div className="bg-[#C9A24A]/10 rounded-lg p-4 mt-6">
                  <div className="text-sm font-medium text-[#0B1B2B] mb-2">Ideal For:</div>
                  <ul className="text-xs text-[#6B7280] space-y-1">
                    <li>• Established service providers</li>
                    <li>• Businesses seeking category leadership</li>
                    <li>• Companies wanting territorial protection</li>
                    <li>• Partners focused on long-term growth</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Premium Sponsor Focus */}
            <div className="bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/5 rounded-xl p-8 border-2 border-[#C9A24A]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#0B1B2B] text-white rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#0B1B2B]">Premium Sponsor</h4>
                  <p className="text-[#C9A24A] font-semibold">Priority Access & Professional Networking</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#0B1B2B] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Priority Placement</h5>
                  <p className="text-[#6B7280] text-sm">Enhanced visibility within our professional referral system with priority consideration for relevant opportunities.</p>
                </div>
                
                <div className="border-l-4 border-[#0B1B2B] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Network Access</h5>
                  <p className="text-[#6B7280] text-sm">Professional membership with access to networking events, industry connections, and partnership opportunities.</p>
                </div>
                
                <div className="border-l-4 border-[#0B1B2B] pl-4">
                  <h5 className="font-semibold text-[#0B1B2B] mb-2">Marketing Support</h5>
                  <p className="text-[#6B7280] text-sm">Brand exposure opportunities through network marketing channels and professional development resources.</p>
                </div>

                <div className="bg-[#0B1B2B]/10 rounded-lg p-4 mt-6">
                  <div className="text-sm font-medium text-[#0B1B2B] mb-2">Ideal For:</div>
                  <ul className="text-xs text-[#6B7280] space-y-1">
                    <li>• Growing service businesses</li>
                    <li>• Companies exploring network benefits</li>
                    <li>• Professional service providers</li>
                    <li>• Partners testing market response</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Benefits Overview */}
        <div className="mt-16 bg-[#FAFAF9] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership Benefits
            </h3>
            <p className="text-[#6B7280]">Professional opportunities and network access</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border-2 border-[#C9A24A]/20">
              <h4 className="font-semibold text-[#0B1B2B] mb-4 text-center text-lg">Founding Partner</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Investment</span>
                  <span className="text-[#0B1B2B] font-semibold">£25,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Duration</span>
                  <span className="text-[#0B1B2B] font-semibold">12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Category</span>
                  <span className="text-[#0B1B2B] font-semibold">Exclusive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Placement</span>
                  <span className="text-[#0B1B2B] font-semibold">Homepage</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-[#C9A24A]/20">
              <h4 className="font-semibold text-[#0B1B2B] mb-4 text-center text-lg">Premium Sponsor</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Investment</span>
                  <span className="text-[#0B1B2B] font-semibold">£5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Duration</span>
                  <span className="text-[#0B1B2B] font-semibold">90 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Access</span>
                  <span className="text-[#0B1B2B] font-semibold">Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Priority</span>
                  <span className="text-[#0B1B2B] font-semibold">Placement</span>
                </div>
              </div>
            </div>
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
              Professional experiences from our vetted network partners.
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
                  <div className="text-[#6B7280] text-sm">Property Management - Network Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "Relo Network provides professional opportunities through their structured partner network. The quality of referrals is consistently good."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">Partnership</div>
                  <div className="font-bold text-[#C9A24A]">Professional</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">Quality</div>
                  <div className="font-bold text-[#C9A24A]">Consistent</div>
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
                  <div className="text-[#6B7280] text-sm">Interior Design - Premium Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "Premium partnership provides access to quality opportunities. The dedicated support team is professional and responsive."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">Support</div>
                  <div className="font-bold text-[#C9A24A]">Dedicated</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">Access</div>
                  <div className="font-bold text-[#C9A24A]">Quality</div>
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
                  <div className="text-[#6B7280] text-sm">Legal Services - Network Partner</div>
                </div>
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-4">
                "The referral system connects us with relevant opportunities. The matching process helps ensure appropriate fit for our services."
              </blockquote>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-sm text-[#6B7280]">Matching</div>
                  <div className="font-bold text-[#C9A24A]">Relevant</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">Process</div>
                  <div className="font-bold text-[#C9A24A]">Structured</div>
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
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What is included in Founding Partner membership?</h3>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Founding Partners receive category exclusivity within their service area, homepage placement, concierge-routed introductions, and territory protection. This 12-month charter membership provides access to our vetted professional network with dedicated partnership support.
              </p>
              <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">Founding Partner Benefits:</div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Category Exclusivity</div>
                    <div className="text-[#6B7280]">Protected service area within network</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Homepage Placement</div>
                    <div className="text-[#6B7280]">Featured positioning for visibility</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Concierge Routing</div>
                    <div className="text-[#6B7280]">Direct introduction pathway</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Professional Support</div>
                    <div className="text-[#6B7280]">Dedicated partnership management</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">How does Premium Sponsor membership work?</h3>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Premium Sponsors receive priority placement within our professional referral system for 90 days. This membership provides access to networking opportunities, marketing exposure, and performance tracking with professional partnership support.
              </p>
              <div className="bg-[#FAFAF9] rounded-lg p-4 border border-[#E5E7EB]">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">Premium Sponsor Features:</div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Priority Placement</div>
                    <div className="text-[#6B7280]">Enhanced visibility in referral system</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Professional Access</div>
                    <div className="text-[#6B7280]">Network member opportunities</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Marketing Exposure</div>
                    <div className="text-[#6B7280]">Brand visibility opportunities</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#C9A24A]">Performance Tracking</div>
                    <div className="text-[#6B7280]">Partnership analytics and reporting</div>
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
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">What makes Relo Network partnership unique?</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Relo Network focuses on vetted professional partnerships with structured referral systems. We maintain selective membership criteria and provide territory protection for qualified service providers within the London relocation market.
              </p>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">How does the partnership activation process work?</h3>
              <p className="text-[#6B7280] leading-relaxed">
                After membership confirmation, partners work with our team to complete profile setup and network integration. The activation timeline varies based on partnership tier and includes orientation, profile creation, and system access setup.
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
                      <Mail className="h-4 w-4 text-[#C9A24A]" />
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
          <CharterPartnershipForm />
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Earning Premium Revenue Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join our vetted partner network. Limited charter partnership positions available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => handleCheckout('founding_partner')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Founding Partner — £25,000'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleCheckout('premium_sponsor')}
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
              disabled={loading}
            >
              Premium Sponsor — £5,000
            </Button>
          </div>
          
          <div className="text-sm text-white/80">
            <div>✓ Charter rates expire September 26th, 2025</div>
            <div>✓ Professional partnership terms</div>
            <div>✓ Limited to 12 charter positions</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}