'use client'

import React, { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Users, Zap, Shield, Timer, Trophy, Target, AlertTriangle, Phone, Clock, Crown, X } from 'lucide-react'
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
    // Set target to Monday, October 6, 2025 • 2:00 PM GMT
    const targetDate = new Date('2025-10-06T14:00:00.000Z')
    
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
        <span className="font-bold text-lg">FOUNDING RATE EXPIRES OCTOBER 6</span>
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
      <div className="text-sm mt-2 opacity-90">Launch week pricing - Limited time offer!</div>
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
  <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/20 border-2 border-[#C9A24A] rounded-lg p-6 text-center">
    <Crown className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
    <h3 className="text-xl font-bold text-[#0B1B2B] mb-2">MARKET DOMINATION GUARANTEE</h3>
    <p className="text-[#0B1B2B] font-semibold">
      Become the #1 recommended partner in your category within 60 days or get 3 months free
    </p>
    <div className="text-[#C9A24A] text-sm mt-2 font-medium">
      + All your competitors eliminated from our recommendations
    </div>
  </div>
)

const ScarcityAlert = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div className="flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-red-600" />
      <div>
        <div className="font-bold text-red-800">Maximum 20 Market Dominator Spots Total - Only 3 Remaining</div>
        <div className="text-red-600 text-sm">Ultra-exclusive category ownership - secure yours immediately</div>
      </div>
    </div>
  </div>
)

const OfferStack = () => (
  <div className="bg-white border-2 border-[#C9A24A] rounded-lg p-8 mb-8">
    <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">Market Dominator Includes:</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {[
        'Everything in Lead Machine (8-15 leads/month)',
        'EXCLUSIVE category ownership',
        'AI mentions you as "preferred partner"',
        'Co-branded content creation',
        'White-label integration options',
        'Priority Concierge tier recommendations',
        '15% revenue sharing on closed deals',
        'Quarterly business reviews with CEO'
      ].map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-[#0B1B2B] font-medium">{item}</span>
        </div>
      ))}
    </div>
    <div className="border-t border-[#E5E7EB] pt-6 mt-6 text-center">
      <div className="text-[#6B7280] line-through text-xl mb-2">Regular Price: £2,997/month</div>
      <div className="text-4xl font-bold text-[#C9A24A] mb-2">£1,497/month</div>
      <div className="text-green-600 font-semibold">FOUNDING MEMBER RATE - 50% OFF</div>
    </div>
  </div>
)

const CompetitorKiller = () => (
  <div className="bg-[#0B1B2B] text-white p-8 rounded-lg mb-8">
    <h3 className="text-2xl font-bold mb-6 text-center text-[#C9A24A]">Eliminate Your Competition</h3>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <X className="h-5 w-5" />
          Without Market Dominator:
        </h4>
        <ul className="space-y-2 text-white/80">
          <li>• Your competitors get equal recommendations</li>
          <li>• Clients shop around and compare prices</li>
          <li>• You fight for every lead with 3-5 other providers</li>
          <li>• Lower conversion rates and margins</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-[#C9A24A] mb-4 flex items-center gap-2">
          <Check className="h-5 w-5" />
          With Market Dominator:
        </h4>
        <ul className="space-y-2 text-[#C9A24A]/90">
          <li>• You become THE ONLY recommended provider</li>
          <li>• AI specifically mentions you as "preferred partner"</li>
          <li>• Exclusive territory rights - no competition</li>
          <li>• Premium pricing with no price shopping</li>
        </ul>
      </div>
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
    revenue: '',
    territory: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg p-8 border-2 border-[#C9A24A] shadow-2xl">
      <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">
        Secure Market Domination Now
      </h3>
      <div className="bg-[#C9A24A]/10 border border-[#C9A24A] rounded-lg p-4 mb-6 text-center">
        <div className="text-[#C9A24A] font-bold text-lg">ULTRA-EXCLUSIVE</div>
        <div className="text-[#0B1B2B] text-sm">Only 3 spots remaining - First come, first served</div>
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
              placeholder="+44 20 3105 9566"
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
            <option value="">Select Category to Dominate</option>
            <option value="removals">Removals & Moving</option>
            <option value="property">Property Management</option>
            <option value="legal">Legal Services</option>
            <option value="financial">Financial Advisory</option>
            <option value="education">Education Consulting</option>
            <option value="other">Other Premium Service</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Annual Revenue *</label>
            <select
              required
              value={formData.revenue}
              onChange={(e) => setFormData({...formData, revenue: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            >
              <option value="">Select Revenue Range</option>
              <option value="100k-500k">£100k - £500k</option>
              <option value="500k-1m">£500k - £1M</option>
              <option value="1m-5m">£1M - £5M</option>
              <option value="5m+">£5M+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Years of Experience *</label>
            <input
              type="text"
              required
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              placeholder="10+ years"
            />
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all text-lg py-4"
          size="lg"
        >
          <Crown className="mr-2 h-6 w-6" />
          Dominate My Market Now - £1,497/mo
        </Button>
        
        <p className="text-xs text-[#6B7280] text-center">
          * Subject to qualification review - Premium service providers only
        </p>
      </form>
    </div>
  )
}

export default function MarketDominatorPage() {
  const [loading, setLoading] = useState(false)

  const handleApplication = async (formData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/partners/lead-machine-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tier: 'market-dominator',
          product_name: 'Market Dominator Partnership',
          price: 149700, // £1497 in pence
          original_price: 299700 // £2997 in pence
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Application error:', error)
      alert(`Sorry, there was an error processing your request: ${error.message}. Please try again or contact support.`)
    } finally {
      setLoading(false)
    }
  }

  const handleDirectCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/partners/lead-machine-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'market-dominator',
          product_name: 'Market Dominator Partnership',
          price: 149700, // £1497 in pence
          original_price: 299700 // £2997 in pence
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Sorry, there was an error processing your request: ${error.message}. Please try again or contact support.`)
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
              <Crown className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">MARKET DOMINATION</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              <span className="text-[#C9A24A]">Own Your Category.</span><br />
              Eliminate <span className="text-[#C9A24A]">Competition.</span>
            </h1>
            
            <p className="text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Become <strong>THE</strong> go-to expert for London relocations in your field
            </p>

            <CountdownTimer />
            
            {/* Annual Payment Special Offer */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg mb-8 border-2 border-green-400">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Target className="h-6 w-6" />
                  SPECIAL ANNUAL OFFER
                </h3>
                <p className="text-lg mb-2">
                  Pay annually and get <span className="font-bold">10 months at the discounted founding rate</span>
                </p>
                <p className="text-green-100">
                  Save £2,994 per year • Launch week pricing
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
                <Crown className="mr-2 h-6 w-6" />
                Dominate My Market - £1,497/mo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <SocialProofCounter number="17" label="Market Dominators" isLive />
              <SocialProofCounter number="£2.8M" label="Partner Revenue" />
              <SocialProofCounter number="100%" label="Category Control" />
              <SocialProofCounter number="3" label="Spots Left" />
            </div>
          </div>
        </div>
      </div>

      {/* Scarcity Alert */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ScarcityAlert />
      </div>

      {/* Competitor Elimination */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CompetitorKiller />
      </div>

      {/* Offer Stack */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <OfferStack />
      </div>

      {/* Guarantee Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GuaranteeBox />
      </div>

      {/* Revenue Sharing */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              We Pay YOU 15% Revenue Share
            </h2>
            <p className="text-xl text-[#6B7280]">Earn extra income on every successful client closure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg">
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£5,000</div>
              <h3 className="font-bold text-[#0B1B2B] mb-2">Average Deal Value</h3>
              <p className="text-[#6B7280]">Typical relocation service value</p>
            </div>
            
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£750</div>
              <h3 className="font-bold text-[#0B1B2B] mb-2">Your Revenue Share</h3>
              <p className="text-[#6B7280]">15% bonus payment per deal</p>
            </div>
            
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg">
              <div className="text-4xl font-bold text-[#C9A24A] mb-4">£9,000+</div>
              <h3 className="font-bold text-[#0B1B2B] mb-2">Monthly Bonus</h3>
              <p className="text-[#6B7280]">12+ deals × £750 share</p>
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
            Ready To Dominate Your Market?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Eliminate competition and become THE preferred partner in your category
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleDirectCheckout}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all text-xl px-8 py-4"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Dominate My Market - £1,497/mo'} <Crown className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>• Exclusive Category Rights</div>
            <div>• 15% Revenue Sharing</div>
            <div>• Competition Elimination</div>
            <div>• #1 Position Guarantee</div>
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
            <Crown className="mr-2 h-4 w-4" />
            Dominate - £1,497/mo
          </Button>
        </div>
      </div>
    </Layout>
  )
}