'use client'

import React, { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Users, Zap, Shield, Timer, Trophy, Target, AlertTriangle, Phone, Clock } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set target to Monday, September 15, 2025 • 2:00 PM GMT
    const targetDate = new Date('2025-09-15T14:00:00.000Z')
    
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
    <div className="bg-red-600 text-white p-4 rounded-lg text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Timer className="h-5 w-5" />
        <span className="font-bold text-lg">FOUNDING RATE EXPIRES SEPTEMBER 15</span>
      </div>
      <div className="flex gap-4 justify-center text-xl font-bold">
        <div className="text-center">
          <div className="bg-white text-red-600 w-12 h-12 rounded flex items-center justify-center text-lg">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">DAYS</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-red-600 w-12 h-12 rounded flex items-center justify-center text-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">HRS</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-red-600 w-12 h-12 rounded flex items-center justify-center text-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">MIN</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-red-600 w-12 h-12 rounded flex items-center justify-center text-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs mt-1">SEC</div>
        </div>
      </div>
      <div className="text-sm mt-2 opacity-90">Price doubles to £997/month after September 15!</div>
    </div>
  )
}

const SocialProofCounter = ({ number, label, isLive = false }: { number: string, label: string, isLive?: boolean }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-[#C9A24A] flex items-center justify-center gap-1">
      {number}
      {isLive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
    </div>
    <div className="text-[#6B7280] text-sm">{label}</div>
  </div>
)

const GuaranteeBox = () => (
  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
    <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-green-800 mb-2">IRON-CLAD GUARANTEE</h3>
    <p className="text-green-700 font-semibold">
      Get 8+ qualified leads in your first month or we pay YOU £500 for wasting your time
    </p>
    <div className="text-green-600 text-sm mt-2">
      + Full refund + Keep all leads received
    </div>
  </div>
)

const ScarcityAlert = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div className="flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-red-600" />
      <div>
        <div className="font-bold text-red-800">Only 12 Lead Machine Spots Remaining</div>
        <div className="text-red-600 text-sm">High demand from service providers - secure yours now</div>
      </div>
    </div>
  </div>
)

const OfferStack = () => (
  <div className="bg-white border-2 border-[#C9A24A] rounded-lg p-8 mb-8">
    <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">Lead Machine Includes:</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {[
        '8-15 guaranteed qualified leads/month',
        'AI concierge mentions you by name',
        'Premium directory placement (top 3)',
        'Automated lead nurturing system',
        'Performance dashboard & analytics',
        'Email list inclusion (25k+ subscribers)',
        'Social media features & mentions',
        'EXCLUSIVE territory rights (first 50 only)'
      ].map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-[#0B1B2B] font-medium">{item}</span>
        </div>
      ))}
    </div>
    <div className="border-t border-[#E5E7EB] pt-6 mt-6 text-center">
      <div className="text-[#6B7280] line-through text-xl mb-2">Regular Price: £997/month</div>
      <div className="text-4xl font-bold text-[#C9A24A] mb-2">£497/month</div>
      <div className="text-green-600 font-semibold">FOUNDING MEMBER RATE - 50% OFF</div>
    </div>
  </div>
)

const PartnerApplicationForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    experience: '',
    location: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10 shadow-lg">
      <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">
        Secure Your Lead Machine Spot
      </h3>
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
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="john@company.com"
            />
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
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Company Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="ABC Services Ltd"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Service Category *</label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
          >
            <option value="">Select Your Service</option>
            <option value="removals">Removals & Moving</option>
            <option value="property">Property Management</option>
            <option value="legal">Legal Services</option>
            <option value="financial">Financial Advisory</option>
            <option value="education">Education Consulting</option>
            <option value="other">Other Service</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Years of Experience</label>
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            placeholder="5+ years"
          />
        </div>

        <Button 
          type="submit"
          className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          <Zap className="mr-2 h-5 w-5" />
          Secure My Lead Machine Spot Now
        </Button>
        
        <p className="text-xs text-[#6B7280] text-center">
          * Instant approval for qualified service providers
        </p>
      </form>
    </div>
  )
}

export default function LeadMachinePage() {
  const [loading, setLoading] = useState(false)

  const handleApplication = async (formData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/partners/lead-machine-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        // Redirect to Stripe checkout
        window.location.href = '/api/partners/lead-machine-checkout'
      }
    } catch (error) {
      console.error('Application error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDirectCheckout = async () => {
    setLoading(true)
    try {
      window.location.href = '/api/partners/lead-machine-checkout'
    } catch (error) {
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">LEAD GENERATION MACHINE</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Get <span className="text-[#C9A24A]">8-15 Qualified Leads</span><br />
              Every Month <span className="text-[#C9A24A]">(Guaranteed)</span>
            </h1>
            
            <p className="text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Or we pay <strong>YOU £500</strong> for wasting your time
            </p>

            <CountdownTimer />
            
            {/* Annual Payment Special Offer */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg mb-8 border-2 border-green-400">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">🎯 SPECIAL ANNUAL OFFER</h3>
                <p className="text-lg mb-2">
                  Pay annually and get <span className="font-bold">10 months at the discounted founding rate</span>
                </p>
                <p className="text-green-100">
                  Save £996 per year • Only available until September 15, 2025
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleDirectCheckout}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white text-xl px-8 py-4 rounded-md hover:scale-105 shadow-xl"
                disabled={loading}
              >
                <Zap className="mr-2 h-6 w-6" />
                Start Getting Leads Now - £497/mo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <SocialProofCounter number="127" label="Active Partners" isLive />
              <SocialProofCounter number="1,847" label="Leads Delivered" />
              <SocialProofCounter number="94%" label="Lead-to-Client Rate" />
              <SocialProofCounter number="12" label="Spots Remaining" />
            </div>
          </div>
        </div>
      </div>

      {/* Scarcity Alert */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ScarcityAlert />
      </div>

      {/* Offer Stack */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <OfferStack />
      </div>

      {/* Guarantee Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GuaranteeBox />
      </div>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              How The Lead Machine Works
            </h2>
            <p className="text-xl text-[#6B7280]">Automated lead generation while you focus on serving clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">AI Mentions You By Name</h3>
              <p className="text-[#6B7280]">Our AI concierge specifically recommends you to clients in your service category</p>
            </div>
            
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Premium Placement</h3>
              <p className="text-[#6B7280]">Top 3 placement in our directory and featured in our 25k+ email list</p>
            </div>
            
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Automated Delivery</h3>
              <p className="text-[#6B7280]">Qualified leads automatically sent to your dashboard with full client details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Application */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <PartnerApplicationForm onSubmit={handleApplication} />
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready To 10X Your Lead Flow?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Join the Lead Machine and start getting 8-15 qualified leads every month
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleDirectCheckout}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all text-xl px-8 py-4"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Get The Lead Machine - £497/mo'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>✓ 8-15 Leads Guaranteed</div>
            <div>✓ £500 Failure Guarantee</div>
            <div>✓ Exclusive Territory Rights</div>
            <div>✓ Cancel Anytime</div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#C9A24A] text-white p-4 shadow-lg md:hidden z-50">
        <div className="flex gap-2">
          <Button 
            onClick={handleDirectCheckout}
            className="flex-1 bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md font-bold"
            disabled={loading}
          >
            <Zap className="mr-2 h-4 w-4" />
            Get Leads - £497/mo
          </Button>
        </div>
      </div>
    </Layout>
  )
}