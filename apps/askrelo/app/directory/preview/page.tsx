'use client'

import React, { useState } from 'react'
import { Lock, Eye, Star, ArrowRight, Users, Shield, Crown, MapPin, Search, Filter, Building, Home, Car, Briefcase, School, ShoppingBag, Heart, Phone, Mail, CheckCircle, Award, TrendingUp, Globe } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

const PartnerPreviewCard = ({ 
  name, 
  category, 
  description, 
  rating, 
  reviews,
  verificationBadge,
  serviceAreas,
  isLocked = false,
  isPremium = false
}: {
  name: string
  category: string
  description: string
  rating: number
  reviews: number
  verificationBadge?: string
  serviceAreas: string[]
  isLocked?: boolean
  isPremium?: boolean
}) => (
  <div className={`bg-white rounded-lg p-6 border shadow-sm hover:shadow-lg transition-all relative ${isPremium ? 'border-[#C9A24A] bg-gradient-to-r from-[#C9A24A]/5 to-transparent' : 'border-[#0B1B2B]/10'}`}>
    {isPremium && (
      <div className="absolute -top-2 -right-2 bg-[#C9A24A] text-white px-3 py-1 rounded-full text-xs font-semibold">
        Premium
      </div>
    )}
    
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-[#0B1B2B]">{name}</h3>
          {verificationBadge && (
            <div className="flex items-center gap-1 bg-[#16A34A]/10 text-[#16A34A] px-2 py-1 rounded text-xs font-medium">
              <Shield className="w-3 h-3" />
              {verificationBadge}
            </div>
          )}
        </div>
        <div className="text-sm text-[#6B7280] mb-2">{category}</div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#C9A24A] text-[#C9A24A]' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-[#6B7280]">({reviews} reviews)</span>
        </div>
      </div>
    </div>
    
    <p className="text-[#6B7280] text-sm mb-4 leading-relaxed">{description}</p>
    
    <div className="mb-4">
      <div className="text-sm font-medium text-[#0B1B2B] mb-2">Service Areas:</div>
      <div className="flex flex-wrap gap-1">
        {serviceAreas.slice(0, 3).map((area, idx) => (
          <span key={idx} className="bg-[#F3F4F6] text-[#374151] px-2 py-1 rounded text-xs">
            {area}
          </span>
        ))}
        {serviceAreas.length > 3 && (
          <span className="bg-[#F3F4F6] text-[#374151] px-2 py-1 rounded text-xs">
            +{serviceAreas.length - 3} more
          </span>
        )}
      </div>
    </div>
    
    <div className="flex gap-2">
      {isLocked ? (
        <div className="flex-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-md p-3 flex items-center justify-center gap-2 text-[#6B7280]">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Upgrade to View Contact</span>
        </div>
      ) : (
        <>
          <Button className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button className="flex-1 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white text-sm rounded-md">
            <Eye className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </>
      )}
    </div>
  </div>
)

const CategoryCard = ({ icon: Icon, name, count, description }: { icon: any, name: string, count: number, description: string }) => (
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:border-[#C9A24A]">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#C9A24A]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#0B1B2B]">{name}</h3>
        <p className="text-sm text-[#6B7280]">{count} providers</p>
      </div>
    </div>
    <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
  </div>
)

export default function DirectoryPreviewPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All', 'Property Specialists', 'Legal & Visa', 'Financial Services', 
    'Education Consultants', 'Lifestyle Concierge', 'Transportation', 'Home Services'
  ]

  const previewPartners = [
    {
      name: 'Thames Property Group',
      category: 'Property Specialists',
      description: 'Premium property search and rental services across Central London. Specializing in luxury corporate relocations with 24/7 concierge support.',
      rating: 5,
      reviews: 127,
      verificationBadge: 'Verified',
      serviceAreas: ['Mayfair', 'Kensington', 'Canary Wharf', 'City of London'],
      isLocked: false,
      isPremium: false
    },
    {
      name: 'Global Visa Solutions',
      category: 'Legal & Visa Services',
      description: 'Expert immigration and visa services for corporate relocations. Fast-track processing for Tier 2, Global Talent, and Investor visas.',
      rating: 5,
      reviews: 89,
      verificationBadge: 'Certified',
      serviceAreas: ['UK-wide', 'EU Processing', 'US Coordination'],
      isLocked: true,
      isPremium: true
    },
    {
      name: 'Elite Moving Services',
      category: 'Luxury Movers',
      description: 'White-glove international moving services with full packing, customs clearance, and unpacking. Specializing in high-value relocations.',
      rating: 4,
      reviews: 203,
      verificationBadge: 'Premium',
      serviceAreas: ['London', 'Manchester', 'Edinburgh', 'International'],
      isLocked: true,
      isPremium: true
    },
    {
      name: 'City Schools Consultancy',
      category: 'Education Consultants',
      description: 'Private school placement and education consulting. Securing places at top London schools for relocating families.',
      rating: 5,
      reviews: 156,
      serviceAreas: ['Central London', 'West London', 'North London'],
      isLocked: true,
      isPremium: false
    },
    {
      name: 'London Concierge Plus',
      category: 'Lifestyle Concierge',
      description: 'Comprehensive lifestyle management for executives. From restaurant bookings to event planning and personal shopping services.',
      rating: 4,
      reviews: 94,
      serviceAreas: ['Zone 1-2', 'West End', 'Kensington'],
      isLocked: true,
      isPremium: true
    },
    {
      name: 'Executive Transport Ltd',
      category: 'Transportation',
      description: 'Premium chauffeur and executive transport services. Airport transfers, corporate events, and daily commuter solutions.',
      rating: 5,
      reviews: 178,
      serviceAreas: ['Greater London', 'Heathrow', 'Gatwick', 'Home Counties'],
      isLocked: true,
      isPremium: false
    }
  ]

  const serviceCategories = [
    { icon: Building, name: 'Property Specialists', count: 127, description: 'Luxury property search, rental, and purchasing services across London' },
    { icon: Briefcase, name: 'Legal & Visa Services', count: 43, description: 'Immigration, visa processing, and legal support for relocating professionals' },
    { icon: Car, name: 'Luxury Movers', count: 89, description: 'White-glove moving services with international shipping and customs clearance' },
    { icon: School, name: 'Education Consultants', count: 56, description: 'Private school placement and education consulting for relocating families' },
    { icon: Crown, name: 'Lifestyle Concierge', count: 72, description: 'Personal concierge services, event planning, and lifestyle management' },
    { icon: Car, name: 'Transportation', count: 34, description: 'Executive chauffeur services, airport transfers, and corporate transport' },
    { icon: Home, name: 'Home Services', count: 98, description: 'Interior design, home setup, utilities, and household staff placement' },
    { icon: Heart, name: 'Healthcare', count: 29, description: 'Private healthcare, dental, and wellness services for international residents' }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen">
        
        {/* Header */}
        <section className="bg-gradient-to-r from-[#0B1B2B] to-[#1a2f3a] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#C9A24A]/20 text-[#C9A24A] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Eye className="w-4 h-4" />
                Free Directory Preview
              </div>
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4">
                London's Premier Service Directory
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Browse a sample of our verified service providers. Upgrade for full access to contact details, reviews, and direct messaging.
              </p>
            </div>
            
            {/* Preview Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search services (preview only)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  disabled
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#C9A24A]/20 text-[#C9A24A] px-3 py-1 rounded text-sm">
                  Preview Mode
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories Preview */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0B1B2B] mb-4">
                Service Categories
              </h2>
              <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
                Explore our comprehensive range of relocation services across London
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Partners Preview */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0B1B2B] mb-4">
                Featured Service Providers
              </h2>
              <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
                Preview a selection of our verified partners. <span className="text-[#C9A24A] font-semibold">Upgrade</span> to access full profiles, contact details, and direct messaging.
              </p>
              
              {/* Category Filter Preview */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.slice(0, 4).map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category 
                        ? 'bg-[#C9A24A] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
                <div className="px-4 py-2 rounded-full text-sm font-medium bg-[#F3F4F6] text-[#6B7280] opacity-60">
                  +4 more categories
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {previewPartners.map((partner, index) => (
                <PartnerPreviewCard key={index} {...partner} />
              ))}
            </div>
            
            {/* Upgrade CTA */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-[#C9A24A]/10 text-[#C9A24A] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Lock className="w-4 h-4" />
                500+ More Providers Available
              </div>
              <p className="text-[#6B7280] mb-6">
                This is just a preview. Access our complete directory with contact details, reviews, and direct messaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold"
                  onClick={() => window.location.href = '/directory#pricing'}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Premium
                </Button>
                <Button 
                  className="border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-8 py-3 rounded-lg font-semibold"
                  onClick={() => window.location.href = '/directory/signup'}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-[#FAFAF9]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1B2B] mb-4">
                What You Get With Full Access
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-[#C9A24A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Direct Contact Details</h3>
                <p className="text-[#6B7280]">Phone numbers, emails, and instant messaging with service providers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-[#C9A24A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Full Reviews & Ratings</h3>
                <p className="text-[#6B7280]">Detailed client feedback and comprehensive service ratings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#C9A24A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Personal Matching</h3>
                <p className="text-[#6B7280]">Curated recommendations based on your specific requirements</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}