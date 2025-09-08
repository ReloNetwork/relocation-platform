'use client'

import { useState } from 'react'
import { Calculator, Building, Users, TrendingUp, ArrowRight, Calendar, Shield, Award, Clock } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const ROICalculator = () => {
  const [employees, setEmployees] = useState(10)
  const [avgSalary, setAvgSalary] = useState(75000)
  const [withoutService, setWithoutService] = useState(true)

  // Calculate costs
  const hrTimePerEmployee = 40 // hours
  const hrHourlyRate = 45
  const failureRate = withoutService ? 0.35 : 0.05
  const averageFailureCost = 150000

  const hrCosts = employees * hrTimePerEmployee * hrHourlyRate
  const failureCosts = employees * failureRate * averageFailureCost
  const managedServiceCost = employees * (employees > 50 ? 15000 : 8500)
  
  const totalWithoutService = hrCosts + failureCosts
  const totalWithService = managedServiceCost
  const savings = totalWithoutService - totalWithService

  return (
    <div className="bg-white rounded-md border border-[#0B1B2B]/10 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-6 w-6 text-[#C9A24A]" />
        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>ROI Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#0B1220] mb-2">
              Number of Employees Relocating
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-[#6B7280] mt-1">
              <span>1</span>
              <span className="font-semibold">{employees}</span>
              <span>100+</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1220] mb-2">
              Average Employee Salary
            </label>
            <input
              type="range"
              min="40000"
              max="200000"
              step="5000"
              value={avgSalary}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-[#6B7280] mt-1">
              <span>£40k</span>
              <span className="font-semibold">£{(avgSalary / 1000).toFixed(0)}k</span>
              <span>£200k+</span>
            </div>
          </div>

          <div className="bg-[#FAFAF9] rounded-md p-4">
            <h4 className="font-semibold text-[#0B1220] mb-3">Compare Scenarios</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={withoutService}
                  onChange={() => setWithoutService(true)}
                  className="text-[#C9A24A]"
                />
                <span className="text-sm">DIY Internal Relocation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={!withoutService}
                  onChange={() => setWithoutService(false)}
                  className="text-[#C9A24A]"
                />
                <span className="text-sm">Relo Network Managed Service</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
            <h4 className="font-semibold text-red-800 mb-4">DIY Internal Costs</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-red-700">HR Time ({hrTimePerEmployee}h per employee)</span>
                <span className="font-semibold">£{hrCosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">Failed Relocations (35% rate)</span>
                <span className="font-semibold">£{failureCosts.toLocaleString()}</span>
              </div>
              <div className="border-t border-red-300 pt-3">
                <div className="flex justify-between text-lg font-bold text-red-800">
                  <span>Total Cost</span>
                  <span>£{totalWithoutService.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-4">Managed Service Cost</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Per Employee (All-inclusive)</span>
                <span className="font-semibold">£{(managedServiceCost / employees).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Failed Relocations (5% rate)</span>
                <span className="font-semibold">£{(employees * 0.05 * averageFailureCost).toLocaleString()}</span>
              </div>
              <div className="border-t border-green-300 pt-3">
                <div className="flex justify-between text-lg font-bold text-green-800">
                  <span>Total Cost</span>
                  <span>£{totalWithService.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/20 rounded-lg p-6 border border-[#C9A24A]/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C9A24A] mb-2">
                £{Math.abs(savings).toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-[#0B1220]">
                {savings > 0 ? 'TOTAL SAVINGS' : 'ADDITIONAL COST'}
              </div>
              <div className="text-xs text-[#6B7280] mt-2">
                {savings > 0 ? `${((savings / totalWithoutService) * 100).toFixed(0)}% cost reduction` : 'Premium service investment'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ServiceTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  priceId,
  onSelect 
}: {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  priceId: string
  onSelect: (priceId: string) => void
}) => (
  <div className={`relative rounded-2xl border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-gray-200'} bg-white p-8 shadow-lg`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-4 py-2 rounded-full text-sm font-semibold">
          MOST POPULAR
        </div>
      </div>
    )}
    
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mt-2">{description}</p>
      
      <div className="mt-6">
        <div className="text-4xl font-bold text-[#0B1220]">
          {price.includes('£') ? price : `From £${price}`}
        </div>
        <p className="text-sm text-[#6B7280] mt-1">per employee relocation</p>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mt-8 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        Request Demo <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div>
      <h4 className="font-semibold text-[#0B1220] mb-4">Service includes:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[#6B7280]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const StatCard = ({ icon: Icon, number, label, sublabel }: { 
  icon: any
  number: string
  label: string
  sublabel?: string
}) => (
  <div className="text-center bg-white rounded-md p-6 border border-[#0B1B2B]/10 shadow-sm">
    <Icon className="h-10 w-10 text-[#C9A24A] mx-auto mb-4" />
    <div className="text-3xl font-bold text-[#0B1220] mb-2">{number}</div>
    <div className="text-[#6B7280] font-medium">{label}</div>
    {sublabel && <div className="text-[#6B7280] text-sm mt-1">{sublabel}</div>}
  </div>
)

export default function CorporatePage() {
  const [loading, setLoading] = useState(false)

  const handleBookDemo = async (tier: string) => {
    setLoading(true)
    try {
      // Redirect to calendar booking
      window.open('https://cal.com/relonetwork/corporate-demo', '_blank')
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const serviceTiers = [
    {
      name: 'Managed',
      price: '8,500',
      description: 'Full-service relocation management',
      priceId: 'managed_relocation',
      features: [
        'Dedicated relocation coordinator',
        'Home search and viewing coordination',
        'School placement assistance',
        'Visa and immigration support',
        'Temporary accommodation',
        'Utility and service connections',
        'Spouse career transition support',
        'Cultural integration program',
        'Moving and shipping coordination',
        '6-month post-arrival support'
      ]
    },
    {
      name: 'Enterprise',
      price: '15,000+',
      description: 'White-glove executive relocations',
      isPopular: true,
      priceId: 'enterprise_relocation',
      features: [
        'Everything in Managed service',
        'C-suite executive specialist',
        'Premium property portfolio access',
        'Private school consultation',
        'Executive housing allowance management',
        'Family lifestyle consultancy',
        'Luxury transportation coordination',
        'VIP airport assistance',
        'Tax optimization consultation',
        'Ongoing concierge services',
        '12-month dedicated support',
        'Custom integration programs'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-8">
              <Building className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Corporate Relocation</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Relocate Your Global Talent. <span className="text-[#C9A24A]">Effortlessly.</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              End the stress of employee relocations with our white-glove service. We handle everything from home finding to school placement, ensuring your talent arrives ready to perform.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">95%</div>
                <div className="text-white/70 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">30</div>
                <div className="text-white/70 text-sm">Days Average</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">500+</div>
                <div className="text-white/70 text-sm">Families Moved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">£2.8M</div>
                <div className="text-white/70 text-sm">Client Savings</div>
              </div>
            </div>

            <Button 
              onClick={() => handleBookDemo('enterprise')}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white text-lg px-8 py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Request Corporate Demo'} <Calendar className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-white/60 mt-4">
              Book a 30-minute consultation • No commitment required
            </p>
          </div>
        </div>
      </div>

      {/* ROI Calculator Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Calculate Your ROI
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            See how much you could save with our managed relocation service vs. handling it internally
          </p>
        </div>
        
        <ROICalculator />
      </div>

      {/* Service Tiers */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Choose Your Service Level
            </h2>
            <p className="text-[#6B7280] text-lg">
              Tailored solutions for every relocation need and budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {serviceTiers.map((tier) => (
              <ServiceTier 
                key={tier.name}
                {...tier}
                onSelect={handleBookDemo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Global Companies Choose Relo Network
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={TrendingUp}
              number="£150k"
              label="Avg Cost of Failed Relocation"
              sublabel="Avoid with our service"
            />
            <StatCard 
              icon={Clock}
              number="73%"
              label="Time Savings"
              sublabel="For HR teams"
            />
            <StatCard 
              icon={Shield}
              number="100%"
              label="Compliance Rate"
              sublabel="Immigration & tax"
            />
            <StatCard 
              icon={Award}
              number="4.9/5"
              label="Client Satisfaction"
              sublabel="From 200+ companies"
            />
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-4xl text-[#C9A24A] mb-4 flex items-center justify-center gap-1">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
            </div>
            <blockquote className="text-xl italic mb-6">
              "Relo Network transformed our global mobility program. What used to take our HR team 6 months now happens in 30 days, and our employees actually enjoy the relocation process."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold">Sarah Chen</div>
                <div className="text-white/60">Head of People, TechCorp Global</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Transform Your Global Mobility?
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Book a demo and see how we can save your company time, money, and employee satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleBookDemo('enterprise')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Book Enterprise Demo'} <Calendar className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleBookDemo('managed')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
              disabled={loading}
            >
              Start with Managed Service
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            Trusted by 200+ global companies • 30-day setup • Dedicated account management
          </p>
        </div>
      </div>
    </Layout>
  )
}