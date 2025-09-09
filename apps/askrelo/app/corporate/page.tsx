'use client'

import React, { useState, useEffect } from 'react'
import { Phone, Clock, Shield, Trophy, AlertTriangle, Calculator, Building, Users, CheckCircle, Star, ArrowRight, Zap, Target, Globe } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const EmergencyBadge = () => (
  <div className="inline-flex items-center bg-red-100 border border-red-300 rounded-full px-4 py-2 mb-6">
    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
    <span className="text-red-800 text-sm font-semibold">EMERGENCY RELOCATION SERVICE</span>
  </div>
)

const ScarcityAlert = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-red-600" />
          <div>
            <div className="font-semibold text-red-800">Only 5 Emergency Slots This Week</div>
            <div className="text-red-600 text-sm">High demand - slots filling fast</div>
          </div>
        </div>
        <div className="flex gap-2 text-red-800 font-mono">
          <div className="bg-red-200 px-2 py-1 rounded text-sm">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-red-600">:</div>
          <div className="bg-red-200 px-2 py-1 rounded text-sm">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-red-600">:</div>
          <div className="bg-red-200 px-2 py-1 rounded text-sm">{String(timeLeft.seconds).padStart(2, '0')}</div>
        </div>
      </div>
    </div>
  )
}

const GuaranteeBadge = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm text-center">
    <Icon className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
    <h3 className="font-bold text-[#0B1B2B] mb-2">{title}</h3>
    <p className="text-[#6B7280] text-sm">{description}</p>
  </div>
)

const FailureCalculator = () => {
  const [employeeLevel, setEmployeeLevel] = useState('senior')
  const [teamSize, setTeamSize] = useState(1)
  const [delayWeeks, setDelayWeeks] = useState(4)

  const baseCosts = {
    'senior': 150000,
    'executive': 250000,
    'c-level': 500000
  }

  const calculateCost = () => {
    const baseSalary = baseCosts[employeeLevel as keyof typeof baseCosts]
    const weeklyCost = baseSalary / 52
    const lostProductivity = weeklyCost * delayWeeks * 0.7 // 70% productivity loss
    const recruitmentCost = baseSalary * 0.3 // 30% of salary
    const reputationCost = 50000 // Fixed reputation cost
    const totalPerEmployee = lostProductivity + recruitmentCost + reputationCost
    
    return {
      lostProductivity: Math.round(lostProductivity),
      recruitmentCost: Math.round(recruitmentCost),
      reputationCost,
      totalPerEmployee: Math.round(totalPerEmployee),
      totalForTeam: Math.round(totalPerEmployee * teamSize)
    }
  }

  const costs = calculateCost()

  return (
    <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8 text-[#C9A24A]" />
        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Cost of Failed Relocation
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Employee Level</label>
            <select 
              value={employeeLevel}
              onChange={(e) => setEmployeeLevel(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="senior">Senior Manager (£150k)</option>
              <option value="executive">Executive (£250k)</option>
              <option value="c-level">C-Level (£500k+)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Team Size</label>
            <input
              type="number"
              min="1"
              max="20"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Delay (weeks)</label>
            <input
              type="number"
              min="1"
              max="26"
              value={delayWeeks}
              onChange={(e) => setDelayWeeks(parseInt(e.target.value) || 1)}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-[#0B1B2B] mb-4">Calculated Costs (Per Employee)</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Lost Productivity</span>
              <span className="font-semibold text-red-600">£{costs.lostProductivity.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Re-recruitment Cost</span>
              <span className="font-semibold text-red-600">£{costs.recruitmentCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
              <span className="text-[#6B7280]">Reputation Damage</span>
              <span className="font-semibold text-red-600">£{costs.reputationCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-[#0B1B2B]">
              <span className="font-bold text-[#0B1B2B]">Total Cost ({teamSize} employee{teamSize > 1 ? 's' : ''})</span>
              <span className="text-2xl font-bold text-red-600">£{costs.totalForTeam.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#C9A24A]/10 rounded-lg">
            <div className="text-sm text-[#0B1B2B] font-medium">
              Our emergency service costs from £15,000 - saving you{' '}
              <span className="font-bold text-green-600">
                £{(costs.totalForTeam - 25000).toLocaleString()}+
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PricingTier = ({ 
  name, 
  price, 
  originalPrice, 
  savings,
  description, 
  features, 
  isPopular = false,
  priceId,
  onSelect 
}: {
  name: string
  price: string
  originalPrice: string
  savings: string
  description: string
  features: string[]
  isPopular?: boolean
  priceId: string
  onSelect: (priceId: string) => void
}) => (
  <div className={`relative rounded-lg border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-[#E5E7EB]'} bg-white p-8 shadow-lg hover:shadow-xl transition-all`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-6 py-2 rounded-full text-sm font-semibold">
          MOST REQUESTED
        </div>
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#9CA3AF] line-through text-lg">£{originalPrice}</span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">{savings} OFF</span>
        </div>
        <div className="text-4xl font-bold text-[#0B1B2B]">
          £{price}
        </div>
        <p className="text-sm text-[#6B7280] mt-1">per employee • Emergency pricing</p>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mb-6 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        Book Emergency Consultation <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div>
      <h4 className="font-semibold text-[#0B1B2B] mb-4">Emergency Package Includes:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-[#6B7280] text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const TestimonialCard = ({ name, role, company, quote, outcome }: { 
  name: string, 
  role: string, 
  company: string, 
  quote: string,
  outcome: string 
}) => (
  <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-sm">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#C9A24A] text-[#C9A24A]" />
      ))}
    </div>
    <blockquote className="text-[#0B1B2B] italic mb-4">"{quote}"</blockquote>
    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
      <div className="text-green-800 font-semibold text-sm">Emergency Outcome:</div>
      <div className="text-green-700 text-sm">{outcome}</div>
    </div>
    <div>
      <div className="font-semibold text-[#0B1B2B]">{name}</div>
      <div className="text-[#6B7280] text-sm">{role}</div>
      <div className="text-[#6B7280] text-sm">{company}</div>
    </div>
  </div>
)

const EmergencyBookingForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    timeline: '',
    phone: '',
    employees: '1'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Emergency Booking Form
        </h3>
        <p className="text-[#6B7280]">Get immediate assistance for your executive relocation crisis</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="Goldman Sachs"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Your Role *</label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="">Select Role</option>
              <option value="hr-director">HR Director</option>
              <option value="coo">COO</option>
              <option value="ceo">CEO</option>
              <option value="managing-director">Managing Director</option>
              <option value="other">Other Executive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Emergency Timeline *</label>
            <select
              required
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="">Select Timeline</option>
              <option value="immediate">Immediate (24-48 hours)</option>
              <option value="week">Within 1 week</option>
              <option value="month">Within 1 month</option>
              <option value="quarter">Within 3 months</option>
            </select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="+44 20 7946 0958"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Number of Employees</label>
            <input
              type="number"
              min="1"
              value={formData.employees}
              onChange={(e) => setFormData({...formData, employees: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            />
          </div>
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Phone className="mr-2 h-5 w-5" />
          Book Emergency Consultation Now
        </Button>
        
        <p className="text-xs text-[#6B7280] text-center mt-4">
          * Required fields. We'll call you within 15 minutes during business hours.
        </p>
      </form>
    </div>
  )
}

export default function CorporatePage() {
  const [loading, setLoading] = useState(false)

  const handleEmergencyBooking = async (formData: any) => {
    setLoading(true)
    try {
      // Submit emergency booking form
      const response = await fetch('/api/corporate/emergency-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Emergency booking submitted! We\'ll call you within 15 minutes.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Error submitting booking. Please call +44 20 7946 0958 immediately.')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/corporate/checkout', {
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
      name: 'Managed Relocation',
      price: '15,000',
      originalPrice: '22,500',
      savings: '33%',
      description: 'Comprehensive emergency relocation support',
      priceId: 'price_managed_relocation',
      features: [
        '48-hour property search activation',
        'Dedicated relocation specialist',
        'Emergency accommodation booking',
        'Priority partner network access',
        'Basic settling-in support',
        '30-day integration tracking',
        'Digital relocation handbook',
        'Emergency helpline access'
      ]
    },
    {
      name: 'Executive Package',
      price: '20,000',
      originalPrice: '25,000',
      savings: '20%',
      description: 'Enhanced support for senior executives',
      isPopular: true,
      priceId: 'price_executive_package',
      features: [
        'Everything in Managed Relocation',
        '24-hour response guarantee',
        'Executive-level accommodation',
        'Family integration support',
        'School placement assistance',
        'Cultural orientation program',
        'Personal shopping & setup',
        'Spouse career transition support',
        'VIP airport transfers'
      ]
    },
    {
      name: 'Premium Executive',
      price: '25,000',
      originalPrice: '45,000',
      savings: '44%',
      description: 'White-glove C-suite relocation service',
      priceId: 'price_premium_executive',
      features: [
        'Everything in Executive Package',
        'C-suite concierge service',
        'Private jet coordination',
        'Luxury temporary housing',
        'Personal staff arrangements',
        'Security consultation',
        'Tax optimization planning',
        'Board meeting coordination',
        'Reputation management support',
        '6-month executive integration'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      {/* Emergency Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <EmergencyBadge />
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Zero Failed Executive <span className="text-[#C9A24A]">Relocations.</span><br />
              <span className="text-[#C9A24A]">Guaranteed.</span>
            </h1>
            
            <p className="text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Emergency London relocation for senior executives.<br />
              <strong>30-day integration guarantee or money back.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={() => document.getElementById('emergency-form')?.scrollIntoView({behavior: 'smooth'})}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-md hover:scale-105 shadow-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book Emergency Consultation
              </Button>
              <Button 
                onClick={() => window.open('tel:+442079460958')}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#0B1B2B] rounded-md hover:scale-105 transition-all"
              >
                Call Now: +44 20 7946 0958
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C9A24A]">100%</div>
                <div className="text-white/70 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C9A24A]">48hr</div>
                <div className="text-white/70 text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C9A24A]">200+</div>
                <div className="text-white/70 text-sm">Executives Relocated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C9A24A]">30-Day</div>
                <div className="text-white/70 text-sm">Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scarcity Alert */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ScarcityAlert />
      </div>

      {/* Guarantee Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Iron-Clad Guarantees
            </h2>
            <p className="text-xl text-[#6B7280]">Your executive relocation success is guaranteed</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <GuaranteeBadge 
              icon={Shield}
              title="Zero Failures"
              description="100% success rate with executive relocations since 2024"
            />
            <GuaranteeBadge 
              icon={Clock}
              title="48-Hour Response"
              description="Emergency team activation within 48 hours guaranteed"
            />
            <GuaranteeBadge 
              icon={Trophy}
              title="30-Day Integration"
              description="Full integration guarantee or full refund"
            />
            <GuaranteeBadge 
              icon={Target}
              title="Success Metrics"
              description="Measurable success criteria agreed upfront"
            />
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What Does A Failed Relocation Really Cost?
            </h2>
            <p className="text-xl text-[#6B7280]">Calculate the true cost of executive relocation failure</p>
          </div>
          
          <FailureCalculator />
        </div>
      </section>

      {/* Emergency Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Emergency Relocation Packages
            </h2>
            <p className="text-xl text-[#6B7280]">Crisis-ready pricing for immediate deployment</p>
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mt-4">
              Emergency Pricing - Up to 44% Off Standard Rates
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <PricingTier 
                key={tier.name}
                {...tier}
                onSelect={handleCheckout}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Testimonials */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Emergency Success Stories
            </h2>
            <p className="text-xl text-[#6B7280]">How we've saved executive relocations in crisis</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="James Mitchell"
              role="Chief Operating Officer"
              company="Global Investment Bank"
              quote="Our SVP's relocation was failing catastrophically. Relo Network mobilized in 24 hours and had him fully integrated within 2 weeks. Saved our entire London expansion."
              outcome="Emergency relocation completed in 14 days, £2.3M project saved"
            />
            
            <TestimonialCard 
              name="Sarah Chen"
              role="Global Head of Talent"
              company="Management Consulting Firm"
              quote="Three executive relocations were at risk of collapse. Their emergency team coordinated everything - from school placements to board meeting logistics. Flawless execution."
              outcome="3 C-suite executives successfully relocated in 3 weeks"
            />
            
            <TestimonialCard 
              name="David Rodriguez"
              role="Managing Director"
              company="Investment Banking Division"
              quote="When our CEO's London move hit crisis mode, Relo Network stepped in with military precision. They handled everything from security to spouse career placement."
              outcome="CEO operational in London within 10 days of emergency call"
            />
          </div>
        </div>
      </section>

      {/* Emergency Booking Form */}
      <section id="emergency-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <EmergencyBookingForm onSubmit={handleEmergencyBooking} />
        </div>
      </section>

      {/* Final Emergency CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Executive Relocation Crisis?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Don't let a failed relocation destroy your business expansion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => window.open('tel:+442079460958')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Emergency Hotline: +44 20 7946 0958
            </Button>
            <Button 
              onClick={() => document.getElementById('emergency-form')?.scrollIntoView({behavior: 'smooth'})}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
            >
              Book Emergency Consultation
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>✓ 24/7 Emergency Response</div>
            <div>✓ 48-Hour Mobilization</div>
            <div>✓ 100% Success Rate</div>
            <div>✓ 30-Day Guarantee</div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1B2B] text-white p-4 shadow-lg md:hidden z-50">
        <div className="flex gap-2">
          <Button 
            onClick={() => window.open('tel:+442079460958')}
            className="flex-1 bg-[#C9A24A] text-white hover:bg-[#B8923D] rounded-md"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </Button>
          <Button 
            onClick={() => document.getElementById('emergency-form')?.scrollIntoView({behavior: 'smooth'})}
            className="flex-1 bg-white text-[#0B1B2B] hover:bg-gray-100 rounded-md"
          >
            Book Emergency
          </Button>
        </div>
      </div>
    </Layout>
  )
}