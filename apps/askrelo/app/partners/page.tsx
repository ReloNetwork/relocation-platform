'use client'

import { useState, useEffect } from 'react'
import { Check, Star, ArrowRight, Users, Clock, Zap, Timer } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const PricingTier = ({ 
  name, 
  price, 
  originalPrice, 
  description, 
  features, 
  isPopular = false, 
  priceId,
  onSelect 
}: {
  name: string
  price: string
  originalPrice: string
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
    
    <div className="text-center">
      <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mt-2">{description}</p>
      
      <div className="mt-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#9CA3AF] line-through text-lg">£{originalPrice}/mo</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">50% OFF</span>
        </div>
        <div className="text-4xl font-bold text-[#0B1220] mt-2">
          £{price}<span className="text-lg text-[#6B7280]">/mo</span>
        </div>
        <p className="text-sm text-[#6B7280] mt-1">Founding Partner Rate</p>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mt-8 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        Start Earning Today <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-[#0B1220] mb-4">What's included:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-[#6B7280]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const StatCard = ({ icon: Icon, number, label }: { icon: any, number: string, label: string }) => (
  <div className="text-center">
    <Icon className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
    <div className="text-2xl font-bold text-white">{number}</div>
    <div className="text-white/70">{label}</div>
  </div>
)

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
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
      name: 'Basic Partner',
      price: '125',
      originalPrice: '250',
      description: 'Perfect for growing service providers',
      priceId: 'price_basic_partner',
      features: [
        'Standard directory listing',
        'Client lead notifications',
        'Basic analytics dashboard',
        'Email support',
        'Partner resource library',
        'Monthly networking events'
      ]
    },
    {
      name: 'Featured Partner',
      price: '375',
      originalPrice: '750',
      description: 'Enhanced visibility and priority access',
      isPopular: true,
      priceId: 'price_featured_partner',
      features: [
        'Featured directory placement',
        'Priority lead distribution',
        'Advanced analytics & reporting',
        'Phone + email support',
        'Custom partner profile page',
        'Weekly networking events',
        'Exclusive client referrals',
        'Marketing co-op opportunities'
      ]
    },
    {
      name: 'Exclusive Partner',
      price: '875',
      originalPrice: '1750',
      description: 'Maximum exposure and exclusive benefits',
      priceId: 'price_exclusive_partner',
      features: [
        'Exclusive category ownership',
        'Top directory placement',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom integration options',
        'White-label opportunities',
        'Exclusive enterprise referrals',
        'Revenue sharing programs',
        'Advisory board participation'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Founding Partner Program</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join London's Most <span className="text-[#C9A24A]">Exclusive</span> Relocation Network
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Connect with high-value clients relocating to London. Premium leads, verified opportunities, and exclusive partnerships that drive real revenue.
            </p>

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
              <StatCard icon={Users} number="47" label="Partners Joined" />
              <StatCard icon={Zap} number="£2.3M" label="Revenue Generated" />
              <StatCard icon={Clock} number="30" label="Days Active" />
            </div>

            {/* Urgency Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-[#C9A24A] font-semibold mb-2 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Founding Rates Expire In:
              </div>
              <CountdownTimer />
              <div className="text-sm text-white/70 mt-2">Limited to first 100 partners only</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Choose Your Partnership Level
          </h2>
          <p className="text-[#6B7280] text-lg">
            All plans include our 50% founding partner discount
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <PricingTier 
              key={tier.name}
              {...tier}
              onSelect={handleCheckout}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why London's Top Service Providers Choose Us
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Pre-Qualified Leads</h4>
              <p className="text-[#6B7280]">Every client is verified and ready to spend. No tire-kickers, only serious relocations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Exclusive Territory</h4>
              <p className="text-[#6B7280]">Limited partners per category ensures you get maximum opportunities without oversaturation.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Premium Clients</h4>
              <p className="text-[#6B7280]">Corporate relocations, high-net-worth individuals, and international professionals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Earning Premium Commissions Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join the exclusive network that's transforming London relocations. Limited founding partner spots available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleCheckout('price_featured_partner')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Join as Featured Partner'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-4">
            Founding rates expire Friday • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </Layout>
  )
}