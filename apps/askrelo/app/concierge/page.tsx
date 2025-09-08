'use client'

import { useState, useEffect } from 'react'
import { Mic, Play, Volume2, Square, MessageCircle, ArrowRight, Sparkles, Clock, Check, User, Shield, Zap, BarChart3, AlertTriangle } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-150 ${
          isActive ? 'bg-[#C9A24A]' : 'bg-[#E5E7EB]'
        }`}
        style={{
          height: isActive 
            ? `${Math.random() * 24 + 8}px`
            : '8px',
          animationDelay: `${i * 100}ms`,
          animation: isActive ? 'pulse 1s infinite ease-in-out' : 'none'
        }}
      />
    ))}
  </div>
)

const ConversationMessage = ({ 
  speaker, 
  message, 
  timestamp, 
  isAI = false 
}: { 
  speaker: string
  message: string
  timestamp: string
  isAI?: boolean
}) => (
  <div className={`flex gap-3 ${isAI ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isAI ? 'bg-[#C9A24A]/10 text-[#C9A24A]' : 'bg-[#F3F4F6] text-[#6B7280]'
    }`}>
      {isAI ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
    </div>
    <div className={`max-w-xs lg:max-w-md ${isAI ? 'text-right' : 'text-left'}`}>
      <div className={`rounded-md px-4 py-3 ${
        isAI 
          ? 'bg-[#0B1B2B] text-white' 
          : 'bg-[#F3F4F6] text-[#0B1220]'
      }`}>
        <p className="text-sm">{message}</p>
      </div>
      <p className="text-xs text-[#6B7280] mt-1">{speaker} • {timestamp}</p>
    </div>
  </div>
)

const UsageCard = ({ title, current, limit, upgrade }: { 
  title: string
  current: number
  limit: number
  upgrade?: () => void 
}) => {
  const percentage = Math.min((current / limit) * 100, 100)
  const isNearLimit = percentage > 80

  return (
    <div className="bg-white rounded-md border border-[#0B1B2B]/10 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#0B1220]">{title}</h3>
        {isNearLimit && upgrade && (
          <Button
            onClick={upgrade}
            size="sm"
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 transition-all"
          >
            Upgrade
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B7280]">Used this month</span>
          <span className="font-medium">{current} / {limit}</span>
        </div>
        
        <div className="bg-[#E5E7EB] rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${isNearLimit ? 'bg-red-500' : 'bg-[#C9A24A]'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        {isNearLimit && (
          <p className="text-red-600 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Approaching limit - upgrade to continue service
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
  <div className={`relative rounded-md border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-[#E5E7EB]'} bg-white p-8 shadow-sm`}>
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
      <h3 className="text-2xl font-bold text-[#0B1220]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] mt-2">{description}</p>
      
      <div className="mt-6">
        {originalPrice && (
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#9CA3AF] line-through text-lg">£{originalPrice}/mo</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">50% OFF</span>
          </div>
        )}
        <div className="text-4xl font-bold text-[#0B1220]">
          {isTrial ? 'Free' : `£${price}`}
          {!isTrial && <span className="text-lg text-[#6B7280]">/mo</span>}
        </div>
        {originalPrice && <p className="text-sm text-[#6B7280] mt-1">First month special</p>}
      </div>

      <div className="mt-4 p-3 bg-[#FAFAF9] rounded-md">
        <p className="text-sm font-medium text-[#0B1220]">{usage}</p>
      </div>

      <Button 
        onClick={() => onSelect(priceId)}
        className={`w-full mt-8 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : isTrial ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
        size="lg"
      >
        {isTrial ? 'Start Free Trial' : 'Start Now'} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div className="mt-8">
      <h4 className="font-semibold text-[#0B1220] mb-4">Features included:</h4>
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

export default function ConciergePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const demoScript = [
    {
      speaker: "You",
      message: "Hi, I'm looking for a 2-bedroom flat in London near good transport links to Canary Wharf.",
      timestamp: "Just now",
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Hello! I'd be happy to help you find the perfect 2-bedroom flat with good transport to Canary Wharf. Can you tell me your budget range and any specific preferences for the area?",
      timestamp: "2s ago",
      isAI: true
    },
    {
      speaker: "You",
      message: "Budget is around £3,000-4,000 per month. I'd prefer somewhere safe with good restaurants and maybe close to parks.",
      timestamp: "5s ago", 
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Perfect! Based on your criteria, I recommend Greenwich, Isle of Dogs, or Canary Wharf itself. Greenwich offers excellent DLR connections (18 mins), beautiful parks, riverside dining, and fits your budget. Would you like me to show you some specific properties in Greenwich?",
      timestamp: "3s ago",
      isAI: true
    }
  ]

  const startDemo = () => {
    setHasStarted(true)
    setCurrentStep(0)
    
    // Simulate conversation flow
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < demoScript.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 3000)
  }

  const toggleRecording = () => {
    if (!hasStarted) {
      startDemo()
    }
    setIsRecording(!isRecording)
  }

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
    <Layout className="bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">AI Concierge Service</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your 24/7 London <span className="text-[#C9A24A]">Relocation Concierge</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Speak naturally to our AI assistant and get instant, expert advice on London properties, neighborhoods, commutes, and everything you need for your perfect relocation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">2.3s</div>
                <div className="text-white/70 text-sm">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">47K+</div>
                <div className="text-white/70 text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">24/7</div>
                <div className="text-white/70 text-sm">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A]">98%</div>
                <div className="text-white/70 text-sm">Accuracy</div>
              </div>
            </div>

            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block text-sm font-semibold mb-8">
              First Month 50% Off - Limited Time!
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Try Ask Relo Live
          </h2>
          <p className="text-[#6B7280] text-lg">
            Experience our AI-powered relocation assistant in action
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Interface */}
          <div className="bg-white rounded-md shadow-sm p-8 border border-[#0B1B2B]/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Voice Demo Interface</h3>
              <p className="text-[#6B7280]">Click the microphone and start speaking</p>
            </div>
            
            {/* Voice Control */}
            <div className="text-center mb-8">
              <button
                onClick={toggleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all hover:scale-105 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                    : 'bg-[#C9A24A] hover:bg-[#B8923D] text-white shadow-lg'
                }`}
              >
                {isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>
              
              <div className="mb-4">
                <VoiceWaveform isActive={isRecording} />
              </div>
              
              <p className="text-sm text-[#6B7280]">
                {!hasStarted ? 'Click to start demo conversation' :
                 isRecording ? 'Listening...' : 
                 isProcessing ? 'Processing your request...' : 
                 'Click to speak'}
              </p>
            </div>

            {/* Demo Status */}
            {hasStarted && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-800 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Demo Active - AI Assistant Ready
                </div>
              </div>
            )}
          </div>

          {/* Conversation Display */}
          <div className="bg-white rounded-md shadow-sm p-8 border border-[#0B1B2B]/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#0B1220]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Live Conversation</h3>
              {hasStarted && (
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Connected
                </div>
              )}
            </div>
            
            <div className="h-80 overflow-y-auto space-y-4 mb-4" style={{ scrollBehavior: 'smooth' }}>
              {hasStarted ? (
                demoScript.slice(0, currentStep + 1).map((msg, index) => (
                  <ConversationMessage key={index} {...msg} />
                ))
              ) : (
                <div className="text-center text-[#6B7280] mt-20">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-[#6B7280]/50" />
                  <p className="text-lg font-medium">Ready for Demo</p>
                  <p className="text-sm">Click the microphone to start your conversation</p>
                </div>
              )}
            </div>

            {/* Typing indicator when AI is responding */}
            {hasStarted && currentStep < demoScript.length - 1 && currentStep % 2 === 0 && (
              <div className="flex items-center gap-2 text-[#C9A24A] text-sm">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Ask Relo AI is typing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Usage Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-[#0B1220] mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Your Current Usage</h2>
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
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Choose Your Service Level
            </h2>
            <p className="text-[#6B7280] text-lg">
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
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Choose Ask Relo Concierge?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1220] mb-2">Privacy First</h4>
              <p className="text-[#6B7280] text-sm">Your conversations are encrypted and never shared</p>
            </div>
            
            <div className="text-center">
              <Zap className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1220] mb-2">Instant Answers</h4>
              <p className="text-[#6B7280] text-sm">Real-time property data and neighborhood insights</p>
            </div>
            
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1220] mb-2">Smart Recommendations</h4>
              <p className="text-[#6B7280] text-sm">AI learns your preferences for better matches</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h4 className="font-semibold text-[#0B1220] mb-2">24/7 Available</h4>
              <p className="text-[#6B7280] text-sm">Get help anytime, from anywhere in the world</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Your London Journey Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join thousands who've found their perfect London home with Ask Relo Concierge
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleCheckout('free_trial')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Try Free for 5 Minutes'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleCheckout('price_professional_voice')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
              disabled={loading}
            >
              Start Professional Plan
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-4">
            No credit card required for trial • Cancel anytime • 50% off first month
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </Layout>
  )
}