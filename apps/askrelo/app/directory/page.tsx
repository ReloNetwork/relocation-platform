'use client'

import { useState } from 'react'
import { Lock, Eye, Star, ArrowRight, Users, Shield, Crown } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

const BlurredSupplierCard = ({ name, category, description, rating, isSponsored = false }: {
  name: string
  category: string
  description: string
  rating: number
  isSponsored?: boolean
}) => (
  <div className="relative">
    {/* Blur overlay */}
    <div className="absolute inset-0 backdrop-blur-sm bg-white/70 z-10 rounded-md flex items-center justify-center">
      <div className="text-center">
        <Lock className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
        <p className="text-sm font-medium text-[#0B1220]">Login Required</p>
      </div>
    </div>
    
    <div className="rounded-md border border-[#0B1B2B]/10 bg-white p-8 shadow-sm opacity-60">
      {isSponsored && (
        <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-3 py-1 mb-4">
          <Crown className="h-3 w-3 text-[#C9A24A] mr-1" />
          <span className="text-[#C9A24A] text-xs font-medium">SPONSORED</span>
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600">
            {name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#0B1220] mb-2">{name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 bg-[#F3F4F6] text-xs text-[#374151] rounded">
              {category}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="flex gap-3">
        <Button size="sm" className="flex-1 bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed rounded-md">
          View Details
        </Button>
        <Button variant="outline" size="sm" className="border-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed rounded-md">
          Contact
        </Button>
      </div>
    </div>
  </div>
)

const StatCard = ({ icon: Icon, number, label }: { 
  icon: any
  number: string
  label: string
}) => (
  <div className="text-center bg-white rounded-md p-6 border border-[#0B1B2B]/10 shadow-sm">
    <Icon className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
    <div className="text-2xl font-bold text-[#0B1220] mb-1">{number}</div>
    <div className="text-[#6B7280] text-sm">{label}</div>
  </div>
)

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false,
  onSelect 
}: {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  onSelect: () => void
}) => (
  <div className={`relative rounded-2xl border ${isPopular ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-gray-200'} bg-white p-6 shadow-lg`}>
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="bg-[#C9A24A] text-white px-3 py-1 rounded-full text-xs font-semibold">
          MOST POPULAR
        </div>
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{name}</h3>
      <p className="text-[#6B7280] text-sm mt-1">{description}</p>
      
      <div className="mt-4">
        <div className="text-3xl font-bold text-[#0B1220]">
          {price === 'Free' ? 'Free' : `£${price}`}
          {price !== 'Free' && <span className="text-lg text-[#6B7280]">/mo</span>}
        </div>
      </div>

      <Button 
        onClick={onSelect}
        className={`w-full mt-6 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all ${isPopular ? 'bg-[#C9A24A] hover:bg-[#B8923D]' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
      >
        {price === 'Free' ? 'Sign Up Free' : 'Subscribe'} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div>
      <h4 className="font-semibold text-[#0B1220] mb-3 text-sm">Includes:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[#6B7280]">
            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (plan: string) => {
    setLoading(true)
    try {
      if (plan === 'free') {
        // Redirect to signup
        window.location.href = '/account'
      } else {
        // Handle paid subscription
        const response = await fetch('/api/directory/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan })
        })
        
        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      }
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Movers', 'Housing', 'Local Expert', 'Visa', 'Legal', 'Financial']

  const previewSuppliers = [
    {
      name: 'Cadogan Tate',
      category: 'Movers',
      description: 'International fine art and luxury goods moving specialists',
      rating: 4.8,
      isSponsored: true
    },
    {
      name: 'Cheval Collection',
      category: 'Housing',
      description: 'Luxury serviced apartments in prime London locations',
      rating: 4.9,
      isSponsored: true
    },
    {
      name: 'Black Brick Property Solutions',
      category: 'Local Expert',
      description: 'Prime Central London property search and acquisition specialists',
      rating: 4.9
    },
    {
      name: 'Ward Thomas Removals',
      category: 'Movers',
      description: 'Master Removers Group member specializing in international relocations',
      rating: 4.7
    }
  ]

  const pricingTiers = [
    {
      name: 'Basic Access',
      price: 'Free',
      description: 'Limited directory preview',
      features: [
        'View 3 suppliers per month',
        'Basic contact information',
        'Standard support'
      ]
    },
    {
      name: 'Premium Directory',
      price: '47',
      description: 'Full directory access',
      isPopular: true,
      features: [
        'Unlimited supplier access',
        'Direct contact details',
        'Detailed reviews & ratings',
        'Advanced filtering options',
        'Priority email support',
        'Exclusive member events'
      ]
    },
    {
      name: 'VIP Concierge',
      price: '147',
      description: 'White-glove service',
      features: [
        'Everything in Premium',
        'Personal concierge matching',
        'Negotiation assistance',
        'Priority booking support',
        'Phone consultation included',
        'Dedicated account manager'
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
              <Shield className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Premium Network</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Access London's <span className="text-[#C9A24A]">Premier</span> Relocation Network
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Exclusive directory of vetted, premium service providers. Every partner is personally screened, continuously monitored, and guaranteed to deliver exceptional service for your London relocation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <StatCard icon={Users} number="150+" label="Vetted Partners" />
              <StatCard icon={Star} number="4.8/5" label="Avg Rating" />
              <StatCard icon={Shield} number="100%" label="Verified" />
              <StatCard icon={Eye} number="2.3K+" label="Monthly Searches" />
            </div>

            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block text-sm font-semibold">
              Exclusive Access • Premium Partners Only
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Directory Preview
          </h2>
          <p className="text-[#6B7280] text-lg">
            Get a glimpse of our premium partner network
          </p>
        </div>

        {/* Category Filter Preview */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-[#C9A24A] hover:bg-[#B8923D] text-white' : ''}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blurred Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {previewSuppliers.map((supplier, index) => (
            <BlurredSupplierCard key={index} {...supplier} />
          ))}
        </div>

        {/* Access Required Notice */}
        <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/5 rounded-2xl p-8 border border-[#C9A24A]/20 text-center">
          <Lock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Login Required to View Full Directory
          </h3>
          <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
            Access detailed profiles, contact information, reviews, and direct booking for 150+ verified London relocation partners.
          </p>
          <Button 
            onClick={() => handleSubscribe('free')}
            size="lg"
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          >
            Sign Up for Free Preview <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Choose Your Access Level
            </h2>
            <p className="text-[#6B7280] text-lg">
              From basic preview to VIP concierge service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <PricingTier 
                key={tier.name}
                {...tier}
                onSelect={() => handleSubscribe(tier.name.toLowerCase().replace(' ', '_'))}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Exclusive Benefits */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Our Directory is Different
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Personally Vetted</h4>
              <p className="text-[#6B7280]">Every partner undergoes rigorous screening including background checks, insurance verification, and quality assessments.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Continuously Monitored</h4>
              <p className="text-[#6B7280]">Real-time performance tracking and client feedback ensure consistent, exceptional service quality.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Exclusive Access</h4>
              <p className="text-[#6B7280]">Many partners offer special rates and priority service exclusively to Relo Network members.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Access London's Premier Network?
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of satisfied clients who've found their perfect London relocation partners
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleSubscribe('premium_directory')}
              size="lg"
              className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Get Full Access'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleSubscribe('free')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all"
              disabled={loading}
            >
              Try Free Preview
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-4">
            Secure access • Premium partners • Instant activation
          </p>
        </div>
      </div>
    </Layout>
  )
}