'use client'

import { useState } from 'react'
import { Phone, CheckCircle, Clock, Shield, Target, Calculator, Star, ArrowRight, Zap, Building2, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const EmergencyBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    timeline: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Emergency booking:', formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-red-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
          <span className="text-red-800 text-sm font-medium">Emergency Booking</span>
        </div>
        <h3 className="text-2xl font-bold text-[#0B1220] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Book Emergency Consultation
        </h3>
        <p className="text-[#6B7280]">Get priority response within 2 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Executive Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company Name *"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Executive Role *"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            required
          />
        </div>
        <div>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            required
          >
            <option value="">Required Timeline *</option>
            <option value="immediate">Immediate (1-7 days)</option>
            <option value="urgent">Urgent (1-2 weeks)</option>
            <option value="priority">Priority (2-4 weeks)</option>
            <option value="standard">Standard (1-2 months)</option>
          </select>
        </div>
        <div>
          <input
            type="tel"
            placeholder="Direct Phone Number *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-md font-semibold text-lg hover:scale-105 transition-all shadow-lg"
        >
          Book Emergency Consultation Now
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-[#6B7280]">
          <Shield className="h-4 w-4 inline mr-1" />
          100% confidential • 2-hour response guarantee
        </p>
      </div>
    </div>
  )
}

const CostCalculator = () => {
  const [employees, setEmployees] = useState(1)
  const [timeline, setTimeline] = useState('standard')
  
  const baseCosts = {
    standard: 15000,
    urgent: 25000,
    immediate: 45000
  }
  
  const failureCosts = {
    productivity: employees * 2500,
    temporaryHousing: employees * 8000,
    recruitment: employees * 15000,
    reputation: employees * 5000
  }
  
  const totalFailureCost = Object.values(failureCosts).reduce((sum, cost) => sum + cost, 0)
  const ourCost = baseCosts[timeline as keyof typeof baseCosts] * employees
  const savings = totalFailureCost - ourCost

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border border-[#E5E7EB]">
      <h3 className="text-2xl font-bold text-[#0B1220] mb-6 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
        Cost of Failed Relocation Calculator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-[#0B1220] mb-2">Number of Executives</label>
          <input
            type="number"
            min="1"
            max="50"
            value={employees}
            onChange={(e) => setEmployees(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B1220] mb-2">Timeline</label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
          >
            <option value="standard">Standard (1-2 months)</option>
            <option value="urgent">Urgent (2-4 weeks)</option>
            <option value="immediate">Immediate (1-7 days)</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <h4 className="font-semibold text-[#0B1220]">Typical Costs of Failed Executive Relocation:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[#6B7280]">Lost Productivity</span>
            <span className="font-semibold">£{failureCosts.productivity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[#6B7280]">Emergency Housing</span>
            <span className="font-semibold">£{failureCosts.temporaryHousing.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[#6B7280]">Replacement Recruitment</span>
            <span className="font-semibold">£{failureCosts.recruitment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[#6B7280]">Reputation Damage</span>
            <span className="font-semibold">£{failureCosts.reputation.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            £{totalFailureCost.toLocaleString()}
          </div>
          <p className="text-red-800 font-medium mb-4">Total Cost of Failure</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 mb-2">
              £{ourCost.toLocaleString()}
            </div>
            <p className="text-green-800 font-medium mb-2">Our Emergency Service Cost</p>
            <div className="text-xl font-bold text-green-700">
              Save £{savings.toLocaleString()}
            </div>
            <p className="text-sm text-green-600">({Math.round((savings / totalFailureCost) * 100)}% savings)</p>
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
  description, 
  features, 
  isPopular = false,
  emergencyDiscount,
  onSelect 
}: {
  name: string
  price: string
  originalPrice: string
  description: string
  features: string[]
  isPopular?: boolean
  emergencyDiscount: string
  onSelect: () => void
}) => (
  <div className={`relative rounded-lg border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20 transform scale-105' : 'border-[#E5E7EB]'} bg-white p-8 shadow-lg`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-6 py-2 rounded-full text-sm font-semibold">
          MOST POPULAR
        </div>
      </div>
    )}
    
    <div className="text-center">
      <h3 className="text-2xl font-bold text-[#0B1220] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mb-6">{description}</p>
      
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[#9CA3AF] line-through text-xl">£{originalPrice}</span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">{emergencyDiscount} OFF</span>
        </div>
        <div className="text-4xl font-bold text-[#0B1220] mb-1">
          £{price}
        </div>
        <p className="text-sm text-[#6B7280]">per employee</p>
        <p className="text-xs text-red-600 font-medium mt-1">Emergency pricing - limited time</p>
      </div>

      <Button 
        onClick={onSelect}
        className={`w-full mb-8 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white py-4 text-lg font-semibold`}
      >
        Book Emergency Consultation <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

    <div>
      <h4 className="font-semibold text-[#0B1220] mb-4">Features included:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-[#6B7280]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default function CorporatePage() {
  const [showCalculator, setShowCalculator] = useState(false)

  const handleEmergencyBooking = () => {
    // Scroll to booking form
    document.getElementById('emergency-booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const pricingTiers = [
    {
      name: 'Managed Relocation',
      price: '15,000',
      originalPrice: '22,500',
      emergencyDiscount: '33%',
      description: 'Essential executive relocation service',
      features: [
        'Dedicated relocation manager',
        'Property search and shortlisting',
        'Viewing coordination (up to 10)',
        'Application assistance',
        'Move coordination',
        'Basic neighbourhood integration',
        '30-day settling guarantee',
        'Email and phone support'
      ]
    },
    {
      name: 'Executive Package',
      price: '20,000',
      originalPrice: '25,000',
      emergencyDiscount: '20%',
      description: 'Comprehensive executive relocation',
      isPopular: true,
      features: [
        'Everything in Managed Relocation',
        'Senior relocation specialist',
        'Unlimited property viewings',
        'School search assistance',
        'Family integration services',
        'Temporary accommodation sourcing',
        'Cultural orientation sessions',
        'Priority 24/7 support hotline'
      ]
    },
    {
      name: 'Premium Executive',
      price: '25,000',
      originalPrice: '45,000',
      emergencyDiscount: '44%',
      description: 'White-glove executive relocation',
      features: [
        'Everything in Executive Package',
        'C-suite relocation director',
        'Luxury property portfolio access',
        'Private school placement',
        'Spouse career assistance',
        'VIP airport transfers',
        'Personal shopping services',
        'Dedicated account manager',
        'Quarterly check-ins for 1 year'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B1B2B] via-[#0B1B2B] to-[#1a2633] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            {/* Scarcity Badge */}
            <div className="inline-flex items-center bg-red-500/10 border border-red-500/20 rounded-full px-6 py-3 mb-8">
              <Clock className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-300 font-medium">Only 5 emergency slots available this week</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Zero Failed Executive <br />
              <span className="text-[#C9A24A]">Relocations</span>
              <span className="text-4xl lg:text-5xl text-[#C9A24A] block mt-2">Guaranteed.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Emergency London relocation for senior executives. <br />
              <span className="text-[#C9A24A] font-semibold">30-day integration guarantee or money back.</span>
            </p>

            {/* Emergency CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleEmergencyBooking}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book Emergency Consultation
              </Button>
              <Button 
                onClick={() => setShowCalculator(!showCalculator)}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Failure Cost
              </Button>
            </div>

            {/* Mobile Phone CTA */}
            <div className="block sm:hidden">
              <a 
                href="tel:+442071234567"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +44 207 123 4567
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">100%</div>
                <div className="text-white/70 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">48hr</div>
                <div className="text-white/70 text-sm">Emergency Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">500+</div>
                <div className="text-white/70 text-sm">Executives Relocated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">30-day</div>
                <div className="text-white/70 text-sm">Money-back Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      {showCalculator && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <CostCalculator />
        </div>
      )}

      {/* Guarantee Badges */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1220] mb-2">100% Success Guarantee</h3>
              <p className="text-[#6B7280] text-sm">Zero failed relocations in 3 years of operation</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1220] mb-2">48-Hour Response</h3>
              <p className="text-[#6B7280] text-sm">Emergency consultations within 48 hours guaranteed</p>
            </div>
            <div className="text-center p-6 bg-[#C9A24A]/10 rounded-lg border border-[#C9A24A]/20">
              <Target className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1220] mb-2">30-Day Integration</h3>
              <p className="text-[#6B7280] text-sm">Full integration guarantee or full refund</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#FAFAF9] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-800 text-sm font-medium">Emergency Pricing - Limited Time</span>
            </div>
            <h2 className="text-4xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Emergency Executive Relocation Packages
            </h2>
            <p className="text-[#6B7280] text-lg">
              Choose your level of service - all with our 30-day guarantee
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <PricingTier 
                key={tier.name}
                {...tier}
                onSelect={handleEmergencyBooking}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Testimonials */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Trusted by Leading Corporations
            </h2>
            <p className="text-[#6B7280]">What executives and HR directors say about our emergency relocation service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FAFAF9] p-6 rounded-lg border border-[#E5E7EB]">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "Relo Network saved our quarterly product launch when our CTO needed emergency relocation to London. 
                48-hour response, perfect property found within a week."
              </p>
              <div>
                <div className="font-semibold text-[#0B1220]">Sarah Mitchell</div>
                <div className="text-sm text-[#6B7280]">VP People Operations, Technology</div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] p-6 rounded-lg border border-[#E5E7EB]">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "Three senior executives relocated in two weeks during a critical merger. 
                The white-glove service was worth every penny - zero disruption to business."
              </p>
              <div>
                <div className="font-semibold text-[#0B1220]">James Rodriguez</div>
                <div className="text-sm text-[#6B7280]">Chief Human Resources Officer, Financial Services</div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] p-6 rounded-lg border border-[#E5E7EB]">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "When our MD was headhunted and needed to start in London within 10 days, 
                Relo Network made the impossible possible. Comprehensive service, flawless execution."
              </p>
              <div>
                <div className="font-semibold text-[#0B1220]">Emma Thompson</div>
                <div className="text-sm text-[#6B7280]">Head of Talent, Investment Banking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#0B1B2B] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Fortune 500 Companies Choose Relo Network
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Enterprise Grade</h3>
              <p className="text-white/70 text-sm">Built for large-scale corporate relocations</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Dedicated Teams</h3>
              <p className="text-white/70 text-sm">Senior specialists for each executive</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-white/70 text-sm">100% success rate over 500+ relocations</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Full Guarantee</h3>
              <p className="text-white/70 text-sm">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Booking Form */}
      <section id="emergency-booking" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Emergency Executive Relocation
            </h2>
            <p className="text-[#6B7280] text-lg">
              Get priority consultation within 2 hours
            </p>
          </div>
          <EmergencyBookingForm />
        </div>
      </section>

      {/* Final Emergency CTA */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-red-500/20 border border-red-400/30 rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-200 mr-2" />
            <span className="text-red-100 text-sm font-medium">Emergency Relocation Required?</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Don't Risk a Failed Executive Relocation
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Every day of delay costs your business. Get emergency consultation now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleEmergencyBooking}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-all px-8 py-4 font-semibold"
            >
              Book Emergency Consultation Now
            </Button>
            <a 
              href="tel:+442071234567"
              className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 rounded-lg hover:scale-105 transition-all font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: +44 207 123 4567
            </a>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            24/7 emergency line • 48-hour response guarantee • 100% confidential
          </p>
        </div>
      </div>
    </Layout>
  )
}