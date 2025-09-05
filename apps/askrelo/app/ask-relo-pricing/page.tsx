'use client'

import { useState, useEffect } from 'react'
import { Play, Mic, Volume2, Check, ArrowRight, BarChart3, Clock, Shield, Zap } from 'lucide-react'
import { Button } from '@/ui/components/button'

const VoiceDemoWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/5 rounded-2xl p-8 border border-[#C9A24A]/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#0B1B2B]">Try Ask Relo Now</h3>
          <p className="text-gray-600">Experience our AI voice assistant</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Demo
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-full w-12 h-12 p-0"
          >
            {isPlaying ? <Volume2 className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#C9A24A] h-2 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${audioProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {isPlaying ? 'AI Assistant responding...' : 'Click to hear sample conversation'}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-0.5">You</div>
            <p className="text-gray-700">"I need help finding a flat in Canary Wharf with good transport links"</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-[#C9A24A] text-white px-2 py-1 rounded text-xs font-medium mt-0.5 flex items-center gap-1">
              <Mic className="h-3 w-3" />
              AI
            </div>
            <p className="text-gray-700">"I'd be happy to help! Canary Wharf has excellent transport with the DLR and Elizabeth Line. Based on your budget, I can recommend 3 prime locations with optimal commute times. Would you like me to book viewings for this week?"</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-2">
            <Check className="h-4 w-4" />
            Real-time property search complete
          </div>
          <p className="text-green-700 text-sm">Found 47 available properties • 3 viewings scheduled • Average response time: 2.3 seconds</p>
        </div>
      </div>
    </div>
  )
}

const UsageCard = ({ title, current, limit, upgrade }: { 
  title: string
  current: number
  limit: number
  upgrade?: () => void 
}) => {
  const percentage = Math.min((current / limit) * 100, 100)
  const isNearLimit = percentage > 80

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0B1B2B]">{title}</h3>
        {isNearLimit && upgrade && (
          <Button
            onClick={upgrade}
            size="sm"
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
          >
            Upgrade
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Used this month</span>
          <span className="font-medium">{current} / {limit}</span>
        </div>
        
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${isNearLimit ? 'bg-red-500' : 'bg-[#C9A24A]'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        {isNearLimit && (
          <p className="text-red-600 text-sm font-medium">
            ⚠️ Approaching limit - upgrade to continue service
          </p>
        )}
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
  usage,
  isPopular = false,
  isTrial = false,
  priceId,
  onSelect 
}: {
  name: string
  price: string
  originalPrice?: string
  description: string
  features: string[]
  usage: string
  isPopular?: boolean
  isTrial?: boolean
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
    
    {isTrial && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          FREE TRIAL
        </div>
      </div>
    )}
    
    <div className="text-center">
      <h3 className="text-2xl font-bold text-[#0B1B2B]">{name}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      
      <div className="mt-6">
        {originalPrice && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-gray-400 line-through text-lg">£{originalPrice}/mo</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">50% OFF</span>
          </div>
        )}
        <div className="text-4xl font-bold text-[#0B1B2B]">
          {isTrial ? 'Free' : `£${price}`}
          {!isTrial && <span className="text-lg text-gray-600">/mo</span>}
        </div>
        {originalPrice && <p className="text-sm text-gray-500 mt-1">First month special</p>}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700">{usage}</p>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mt-8 ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : isTrial ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0B1B2B] hover:bg-[#1A2B3B]'} text-white`}
        size="lg"
      >
        {isTrial ? 'Start Free Trial' : 'Start Now'} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-[#0B1B2B] mb-4">Features included:</h4>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default function AskReloPricingPage() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (priceId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/ask-relo/checkout', {
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
      name: 'Free Trial',
      price: '0',
      description: 'Experience Ask Relo risk-free',
      usage: '5 minutes total • 1 conversation',
      isTrial: true,
      priceId: 'free_trial',
      features: [
        'Voice AI conversation',
        'Basic London insights',
        'Property search demo',
        'Transport advice',
        'No credit card required'
      ]
    },
    {
      name: 'Professional',
      price: '147',
      originalPrice: '295',
      description: 'Perfect for active home hunters',
      usage: '120 minutes/month • Unlimited conversations',
      isPopular: true,
      priceId: 'price_professional_voice',
      features: [
        'Unlimited voice conversations',
        'Real-time property search',
        'Neighborhood analysis',
        'Commute optimization',
        'School district info',
        'Market trend insights',
        'SMS property alerts',
        'Calendar booking integration'
      ]
    },
    {
      name: 'Concierge',
      price: '747',
      originalPrice: '1495',
      description: 'White-glove relocation service',
      usage: 'Unlimited everything • Human backup',
      priceId: 'price_concierge_voice',
      features: [
        'Everything in Professional',
        'Unlimited usage',
        'Human concierge escalation',
        'Property viewing coordination',
        'Contract negotiation support',
        'Moving services booking',
        'Utility connection assistance',
        'Priority customer support',
        'Dedicated account manager'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
              <Mic className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">AI Voice Assistant</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Your 24/7 London <span className="text-[#C9A24A]">Relocation Expert</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Speak naturally to our AI assistant and get instant, expert advice on London properties, neighborhoods, commutes, and everything you need for your perfect relocation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">2.3s</div>
                <div className="text-gray-300 text-sm">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">47K+</div>
                <div className="text-gray-300 text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">24/7</div>
                <div className="text-gray-300 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">98%</div>
                <div className="text-gray-300 text-sm">Accuracy</div>
              </div>
            </div>

            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block text-sm font-semibold mb-8">
              🎉 First Month 50% Off - Limited Time!
            </div>
          </div>
        </div>
      </div>

      {/* Voice Demo Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <VoiceDemoWidget />
      </div>

      {/* Current Usage Section - Show for logged in users */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-[#0B1B2B] mb-8 text-center">Your Current Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UsageCard 
            title="Voice Minutes" 
            current={4} 
            limit={5} 
            upgrade={() => handleCheckout('price_professional_voice')}
          />
          <UsageCard 
            title="Property Searches" 
            current={12} 
            limit={50}
          />
          <UsageCard 
            title="Conversations" 
            current={1} 
            limit={1}
            upgrade={() => handleCheckout('price_professional_voice')}
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 text-lg">
            Start free, upgrade as you need more assistance
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

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">
              Why Choose Ask Relo?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Privacy First</h4>
              <p className="text-gray-600 text-sm">Your conversations are encrypted and never shared</p>
            </div>
            
            <div className="text-center">
              <Zap className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Instant Answers</h4>
              <p className="text-gray-600 text-sm">Real-time property data and neighborhood insights</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Smart Recommendations</h4>
              <p className="text-gray-600 text-sm">AI learns your preferences for better matches</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1B2B] mb-2">24/7 Available</h4>
              <p className="text-gray-600 text-sm">Get help anytime, from anywhere in the world</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Start Your London Journey Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join thousands who've found their perfect London home with Ask Relo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleCheckout('free_trial')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Try Free for 5 Minutes'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleCheckout('price_professional_voice')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A24A]"
              disabled={loading}
            >
              Start Professional Plan
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-4">
            🎯 No credit card required for trial • Cancel anytime • 50% off first month
          </p>
        </div>
      </div>
    </div>
  )
}