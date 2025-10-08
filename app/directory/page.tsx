'use client'

import React, { useState, useEffect } from 'react'
import { Lock, Eye, Star, ArrowRight, Users, Shield, Crown, MapPin, Search, Filter, Building, Home, Car, Briefcase, School, ShoppingBag, Heart, Phone, Mail, CheckCircle, Award, TrendingUp, Globe, Calendar, Clock, Target } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'
import { getAllDirectorySchemas } from '../../lib/seo/directory-schemas'
import { checkoutFunctions } from '../../lib/checkout'
import ExecutiveIntakeNudge from '../../components/ExecutiveIntakeNudge'

const LondonAreaCard = ({ 
  area, 
  postcode, 
  description, 
  averageRent, 
  transportRating, 
  amenityRating,
  propertyTypes,
  highlights 
}: {
  area: string
  postcode: string
  description: string
  averageRent: string
  transportRating: number
  amenityRating: number
  propertyTypes: string[]
  highlights: string[]
}) => (
  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-[#0B1B2B]/10 shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-[#C9A24A]/10">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-[#0B1B2B] mb-1">{area}</h3>
        <div className="flex items-center gap-2 text-[#6B7280] text-sm">
          <MapPin className="w-4 h-4" />
          <span>{postcode}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-[#C9A24A]">{averageRent}</div>
        <div className="text-[#6B7280] text-xs">avg rent</div>
      </div>
    </div>
    
    <p className="text-[#6B7280] text-sm mb-4 leading-relaxed">{description}</p>
    
    <div className="flex gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < transportRating ? 'fill-[#C9A24A] text-[#C9A24A]' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-[#6B7280]">Transport</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < amenityRating ? 'fill-[#C9A24A] text-[#C9A24A]' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-[#6B7280]">Amenities</span>
      </div>
    </div>
    
    <div className="mb-4">
      <div className="text-sm font-medium text-[#0B1B2B] mb-2">Property Types:</div>
      <div className="flex flex-wrap gap-1">
        {propertyTypes.map((type, idx) => (
          <span key={idx} className="bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded text-xs font-medium">
            {type}
          </span>
        ))}
      </div>
    </div>
    
    <div className="mb-4">
      <div className="text-sm font-medium text-[#0B1B2B] mb-2">Area Highlights:</div>
      <ul className="space-y-1">
        {highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs text-[#6B7280]">
            <CheckCircle className="w-3 h-3 text-[#C9A24A] flex-shrink-0" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
    
    <Button className="w-full bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white text-sm rounded-md">
      View {area} Partners <ArrowRight className="ml-2 h-3 w-3" />
    </Button>
  </div>
)

const PartnerCard = ({ 
  name, 
  category, 
  description, 
  rating, 
  reviews,
  verificationBadge,
  serviceAreas,
  specializations,
  contactInfo,
  isSponsored = false,
  isPremium = false,
  userAccessTier = 'free'
}: {
  name: string
  category: string
  description: string
  rating: number
  reviews: number
  verificationBadge: string
  serviceAreas: string[]
  specializations: string[]
  contactInfo: { phone: string; email: string; website?: string }
  isSponsored?: boolean
  isPremium?: boolean
  userAccessTier?: 'free' | 'premium' | 'vip'
}) => {
  const isFreeUser = userAccessTier === 'free'
  const blurredName = name.split(' ').map(word => word.charAt(0) + '●'.repeat(word.length - 1)).join(' ')

  return (
  <div className={`bg-white rounded-lg p-6 border ${isPremium ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20' : 'border-[#0B1B2B]/10'} shadow-sm hover:shadow-lg transition-all`}>
    <div className="flex items-start gap-4 mb-4">
      {isSponsored && (
        <div className="absolute -top-3 right-4">
          <div className="bg-[#C9A24A] text-white px-3 py-1 rounded-full text-xs font-semibold">
            SPONSORED
          </div>
        </div>
      )}
      
      <div className="w-16 h-16 rounded-lg bg-[#C9A24A]/10 flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-bold text-[#C9A24A]">
          {name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
        </span>
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="relative">
            <h3 className="font-bold text-[#0B1B2B] text-lg">{isFreeUser ? blurredName : name}</h3>
            {isFreeUser && (
              <div className="absolute inset-0 flex items-center justify-end">
                <Lock className="w-4 h-4 text-[#6B7280] ml-2" />
              </div>
            )}
          </div>
          {isPremium && <Crown className="w-5 h-5 text-[#C9A24A]" />}
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center px-2 py-1 bg-[#0B1B2B]/5 text-xs text-[#0B1B2B] rounded font-medium">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-[#C9A24A] text-[#C9A24A]' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#0B1B2B]">{rating}</span>
            <span className="text-sm text-[#6B7280]">({reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-[#C9A24A]" />
          <span className="text-xs font-medium text-[#C9A24A]">{verificationBadge}</span>
        </div>
      </div>
    </div>
    
    <p className="text-[#6B7280] text-sm mb-4 leading-relaxed">{description}</p>
    
    <div className="space-y-3 mb-4">
      <div>
        <div className="text-sm font-medium text-[#0B1B2B] mb-2">Service Areas:</div>
        <div className="flex flex-wrap gap-1">
          {serviceAreas.map((area, idx) => (
            <span key={idx} className="bg-[#FAFAF9] text-[#0B1B2B] px-2 py-1 rounded text-xs border">
              {area}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <div className="text-sm font-medium text-[#0B1B2B] mb-2">Specializations:</div>
        <div className="flex flex-wrap gap-1">
          {specializations.map((spec, idx) => (
            <span key={idx} className="bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded text-xs font-medium">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="border-t border-[#E5E7EB] pt-4 mb-4">
      {isFreeUser ? (
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 text-sm blur-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C9A24A]" />
              <span className="text-[#6B7280]">+44 ●●● ●●● ●●●</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C9A24A]" />
              <span className="text-[#6B7280] truncate">●●●●●@●●●●●.com</span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#C9A24A]/20 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C9A24A]" />
              <span className="text-sm font-medium text-[#C9A24A]">Upgrade to view contact details</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C9A24A]" />
            <span className="text-[#6B7280]">{contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C9A24A]" />
            <span className="text-[#6B7280] truncate">{contactInfo.email}</span>
          </div>
        </div>
      )}
    </div>
    
    <div className="flex gap-3">
      {isFreeUser ? (
        <Button 
          onClick={() => {
            const accessTiersSection = document.getElementById('access-tiers')
            if (accessTiersSection) {
              accessTiersSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
        >
          <Lock className="w-4 h-4 mr-2" />
          Upgrade to View
        </Button>
      ) : (
        <>
          <Button className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md">
            View Profile
          </Button>
          <Button variant="outline" className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white text-sm rounded-md">
            Contact
          </Button>
        </>
      )}
    </div>
  </div>
  )
}

const MarketInsightCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  description 
}: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: any
  description: string
}) => (
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <Icon className="w-8 h-8 text-[#C9A24A]" />
      <div className={`flex items-center gap-1 text-sm font-semibold ${
        trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-[#6B7280]'
      }`}>
        <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : trend === 'stable' ? 'rotate-90' : ''}`} />
        {change}
      </div>
    </div>
    <div className="text-2xl font-bold text-[#0B1B2B] mb-1">{value}</div>
    <div className="text-sm font-medium text-[#0B1B2B] mb-2">{title}</div>
    <p className="text-xs text-[#6B7280]">{description}</p>
  </div>
)

const VettingStep = ({ number, title, description }: { 
  number: string, 
  title: string, 
  description: string 
}) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-[#0B1B2B] mb-2">{title}</h4>
      <p className="text-[#6B7280] text-sm">{description}</p>
    </div>
  </div>
)

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All Areas')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userAccessTier, setUserAccessTier] = useState<'free' | 'premium' | 'vip'>('free')
  const schemas = getAllDirectorySchemas()

  // Mock user access tier - in production this would come from authentication/subscription state
  useEffect(() => {
    // For demo purposes, you can change this to test different tiers
    // In production, this would check user's actual subscription status
    setUserAccessTier('free') // Change to 'premium' or 'vip' to test other tiers
  }, [])

  const handleSubscribe = async (plan: string) => {
    setLoading(true)
    try {
      if (plan === 'free') {
        window.location.href = '/account'
      } else {
        // Map plan names to API expected values
        const planMapping: { [key: string]: string } = {
          'premium': 'premium_directory',
          'vip': 'vip_concierge'
        }
        
        const apiPlan = planMapping[plan] || plan
        
        const response = await fetch('/api/directory/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: apiPlan })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error('No checkout URL received')
        }
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'All', 'Property Specialists', 'Serviced Accommodation', 'Independent Schools', 'Premium Banking', 'Private Healthcare', 'Premium Transport', 'Luxury Movers', 'Legal & Visa', 'Financial Services', 
    'Education Consultants', 'Lifestyle Concierge', 'Home Services', 'Lifestyle Services', 'Pet Relocation', 'Travel', 'Other (please specify)'
  ]

  const londonAreas = [
    {
      area: "Mayfair & Belgravia",
      postcode: "W1J, SW1X",
      description: "London's most prestigious addresses featuring luxury apartments, five-star hotels, and exclusive shopping. Perfect for UHNW individuals and C-suite executives.",
      averageRent: "£4,500/wk",
      transportRating: 5,
      amenityRating: 5,
      propertyTypes: ["Luxury Apartments", "Penthouses", "Historic Mansions", "Serviced Residences"],
      highlights: [
        "Hyde Park and Green Park proximity",
        "Michelin-starred restaurants", 
        "Exclusive private clubs",
        "World-class shopping districts",
        "24/7 concierge services"
      ]
    },
    {
      area: "Kensington & Chelsea",
      postcode: "SW3, SW7, W8",
      description: "Royal borough combining cultural sophistication with family-friendly amenities. Home to world-renowned museums and excellent schools.",
      averageRent: "£3,800/wk",
      transportRating: 4,
      amenityRating: 5,
      propertyTypes: ["Victorian Houses", "Garden Flats", "Modern Developments", "Period Conversions"],
      highlights: [
        "Natural History & V&A Museums",
        "Top-rated independent schools",
        "Beautiful garden squares",
        "King's Road shopping",
        "Exhibition Road cultural district"
      ]
    },
    {
      area: "Canary Wharf",
      postcode: "E14, E1W",
      description: "London's premier financial district with modern high-rise living and excellent transport links. Ideal for banking and finance professionals.",
      averageRent: "£2,200/wk",
      transportRating: 5,
      amenityRating: 4,
      propertyTypes: ["High-rise Apartments", "Waterfront Penthouses", "Serviced Apartments", "New Builds"],
      highlights: [
        "Direct City connections",
        "Riverside dining and bars",
        "24/7 security and concierge",
        "Modern fitness facilities",
        "Thames Clipper river transport"
      ]
    },
    {
      area: "Marylebone & Fitzrovia",
      postcode: "W1G, W1T, W1U",
      description: "Village-like atmosphere in central London with excellent dining, shopping, and professional services. Popular with media and tech executives.",
      averageRent: "£2,800/wk",
      transportRating: 5,
      amenityRating: 4,
      propertyTypes: ["Georgian Townhouses", "Mansion Blocks", "Modern Apartments", "Loft Conversions"],
      highlights: [
        "Regent's Park proximity",
        "Harley Street medical district",
        "BBC Broadcasting House area",
        "Oxford Street shopping",
        "Excellent restaurant scene"
      ]
    }
  ]

  const premiumPartners = [
    // Visa Lawyers - Top Priority Partners
    {
      name: "Richmond Chambers LLP",
      category: "Legal & Visa",
      description: "Multi-award winning immigration barristers with 19 specialists. UK's leading immigration law firm providing direct access services with 5-star client rating.",
      rating: 5.0,
      reviews: 189,
      verificationBadge: "Chambers Ranked • Immigration Certified",
      serviceAreas: ["All London", "UK Nationwide", "International"],
      specializations: ["Executive Visas", "Global Talent", "Investor Visas", "Business Immigration"],
      contactInfo: { 
        phone: "+44-20-3617-9173", 
        email: "info@richmondchambers.com",
        website: "immigrationbarrister.co.uk"
      },
      isSponsored: true,
      isPremium: true
    },
    {
      name: "Kingsley Napley LLP",
      category: "Legal & Visa",
      description: "Market-leading immigration practice for HNW and UHNW clients. Chambers-ranked with expertise in ETA Scheme, Global Talent, and Investor visa routes.",
      rating: 4.9,
      reviews: 156,
      verificationBadge: "Chambers Band 1 • HNW Specialist",
      serviceAreas: ["Central London", "International", "Technology Sector"],
      specializations: ["UHNW Immigration", "Electronic Travel Authorization", "Innovator Founder", "Corporate Sponsorship"],
      contactInfo: { 
        phone: "+44-20-7814-1200", 
        email: "immigration@kingsleynapley.co.uk",
        website: "kingsleynapley.co.uk"
      },
      isPremium: true
    },
    {
      name: "Laura Devine Immigration",
      category: "Legal & Visa",
      description: "Highly regarded UK & US immigration specialists. Expert business immigration advice for international executives, SMEs and senior professionals.",
      rating: 4.8,
      reviews: 203,
      verificationBadge: "Chambers Ranked • UK-US Expert",
      serviceAreas: ["London", "New York", "International Business"],
      specializations: ["UK-US Transfers", "Senior Executive Immigration", "Business Immigration", "International Coordination"],
      contactInfo: { 
        phone: "+44-20-7697-1000", 
        email: "enquiries@lauradevine.com",
        website: "lauradevine.com"
      },
      isPremium: true
    },
    {
      name: "Mishcon de Reya LLP",
      category: "Legal & Visa",
      description: "Leading UHNW immigration practice with sophisticated discretionary applications expertise. Specializes in complex cases outside usual rules.",
      rating: 4.9,
      reviews: 127,
      verificationBadge: "Magic Circle • UHNW Specialist",
      serviceAreas: ["Central London", "International", "Technology & Media"],
      specializations: ["Discretionary Applications", "UHNW Immigration", "Naturalization", "Complex Asylum"],
      contactInfo: { 
        phone: "+44-20-3321-7000", 
        email: "immigration@mishcon.com",
        website: "mishcon.com"
      },
      isPremium: true
    },
    {
      name: "Garden Court Chambers",
      category: "Legal & Visa",
      description: "Band 1 ranked immigration chambers - pre-eminent set in UK immigration law. Leading barristers including Adrian Berry KC and Stephanie Harrison KC.",
      rating: 4.8,
      reviews: 95,
      verificationBadge: "Chambers Band 1 • QC/KC Specialists",
      serviceAreas: ["All London", "Supreme Court", "Appeal Courts"],
      specializations: ["Strategic Immigration", "Supreme Court Appeals", "Human Rights", "Asylum Law"],
      contactInfo: { 
        phone: "+44-20-7993-7600", 
        email: "immigrationteam@gardencourtchambers.co.uk",
        website: "gardencourtchambers.co.uk"
      },
      isPremium: true
    },
    // Finance and Tax Specialists - Top Priority Partners
    {
      name: "Gerald Edelman LLP",
      category: "Financial Services",
      description: "Top 20 UK accountancy firm specializing in international tax planning and UHNW wealth management. Expert in expat tax compliance and cross-border advisory.",
      rating: 4.9,
      reviews: 143,
      verificationBadge: "Top 20 UK Firm • International Tax Certified",
      serviceAreas: ["Central London", "International", "Cross-border Tax"],
      specializations: ["International Tax Planning", "UHNW Wealth Management", "Expat Tax Compliance", "Cross-border Advisory"],
      contactInfo: { 
        phone: "+44-20-7299-1400", 
        email: "info@ge.co.uk",
        website: "ge.co.uk"
      },
      isPremium: true
    },
    {
      name: "RSM UK",
      category: "Financial Services", 
      description: "Leading international accounting and advisory firm with specialist relocation tax services. Comprehensive support for executive transfers and international assignments.",
      rating: 4.8,
      reviews: 267,
      verificationBadge: "Global Network • Relocation Specialist",
      serviceAreas: ["London", "UK Nationwide", "Global Network"],
      specializations: ["Executive Relocation Tax", "International Assignments", "Immigration Tax Planning", "Cross-border Compliance"],
      contactInfo: { 
        phone: "+44-20-3201-8000", 
        email: "london@rsmuk.com",
        website: "rsmuk.com"
      },
      isPremium: true
    },
    {
      name: "Azets",
      category: "Financial Services",
      description: "European accounting and advisory network with specialized international tax and wealth management services for relocating executives and HNW individuals.",
      rating: 4.7,
      reviews: 198,
      verificationBadge: "European Network • Executive Advisory",
      serviceAreas: ["Central London", "European Network", "International"],
      specializations: ["Wealth Management", "International Tax Advisory", "Executive Services", "Cross-border Planning"],
      contactInfo: { 
        phone: "+44-20-7403-1877", 
        email: "london@azets.co.uk",
        website: "azets.co.uk"
      },
      isPremium: true
    },
    {
      name: "Blevins Franks",
      category: "Financial Services",
      description: "Specialist international tax and wealth management advisors with 45+ years experience. Expert guidance for expatriates and international relocations.",
      rating: 4.8,
      reviews: 156,
      verificationBadge: "Specialist Advisory • 45+ Years Experience",
      serviceAreas: ["London", "International", "Expatriate Focus"],
      specializations: ["Expatriate Tax Planning", "International Wealth Management", "Cross-border Pensions", "Investment Advisory"],
      contactInfo: { 
        phone: "+44-20-7389-8133", 
        email: "london@blevinsfranks.com",
        website: "blevinsfranks.com"
      },
      isPremium: true
    },
    // Property Search Specialists - Top Priority Partners
    {
      name: "Black Brick Property",
      category: "Property Specialists",
      description: "Award-winning property buying agent with 100+ years combined experience. Specializes in prime central London off-market properties with exclusive access to homes never appearing on the open market.",
      rating: 4.9,
      reviews: 95,
      verificationBadge: "Award-Winning • Off-Market Specialist",
      serviceAreas: ["Mayfair", "Belgravia", "Kensington", "Prime Central London"],
      specializations: ["Off-Market Properties", "Property Buying", "Prime Central London", "Investment Advisory"],
      contactInfo: { 
        phone: "+44-20-3141-9861", 
        email: "info@black-brick.com",
        website: "black-brick.com"
      },
      isPremium: true
    },
    {
      name: "Savills Prime Central London",
      category: "Property Specialists",
      description: "Global estate agent with prime central London expertise. Leading residential property services in Belgravia, Knightsbridge and Chelsea with dedicated teams specializing in luxury properties.",
      rating: 4.8,
      reviews: 203,
      verificationBadge: "Global Network • Prime Central Specialist",
      serviceAreas: ["Belgravia", "Knightsbridge", "Chelsea", "Central London"],
      specializations: ["Luxury Developments", "International Clients", "Property Management", "Valuation Services"],
      contactInfo: { 
        phone: "+44-20-7730-0822", 
        email: "sloane@savills.com",
        website: "savills.co.uk"
      },
      isPremium: true
    },
    {
      name: "Beauchamp Estates",
      category: "Property Specialists",
      description: "Over 40 years' experience in luxury property specializing in prestigious residences. Global portfolio covering London, French Riviera, Mykonos, Tel Aviv and New York.",
      rating: 4.7,
      reviews: 156,
      verificationBadge: "40+ Years Experience • Global Luxury Specialist",
      serviceAreas: ["Mayfair", "St Johns Wood", "International", "Global Portfolio"],
      specializations: ["Luxury Residences", "International Properties", "Prestigious Addresses", "Global Network"],
      contactInfo: { 
        phone: "+44-20-7722-9793", 
        email: "alla@beauchampestates.com",
        website: "beauchamp.com"
      },
      isPremium: true
    },
    {
      name: "Rokstone Properties",
      category: "Property Specialists",
      description: "Fast-growing boutique estate agency specializing in premium residential property. Nearly £1 billion in sales with all-female team operating in Prime Central London.",
      rating: 4.8,
      reviews: 127,
      verificationBadge: "Boutique Specialist • £1B+ Sales Record",
      serviceAreas: ["Prime Central London", "Chiltern Street", "Premium Addresses"],
      specializations: ["Premium Residential", "New Homes", "Property Acquisitions", "Bespoke Service"],
      contactInfo: { 
        phone: "+44-20-7580-2030", 
        email: "contact@rokstone.com",
        website: "rokstone.com"
      },
      isPremium: true
    },
    // Serviced Accommodation Specialists - Top Priority Partners
    {
      name: "Hybrid Resi",
      category: "Serviced Accommodation",
      description: "UK-based serviced accommodation company specializing in corporate housing with modern office facilities, fast Wi-Fi, and dedicated workspaces for hybrid work.",
      rating: 4.8,
      reviews: 184,
      verificationBadge: "Corporate Housing Specialist • Hybrid Work Ready",
      serviceAreas: ["Canary Wharf", "Wandsworth", "Fulham", "Battersea", "Greenwich"],
      specializations: ["Corporate Housing", "Business Travel", "Extended Stays", "Hybrid Work Spaces"],
      contactInfo: { 
        phone: "+44-20-8090-8090", 
        email: "enquiries@hybridresi.com",
        website: "hybridresi.com"
      },
      isPremium: true
    },
    {
      name: "The Harrington",
      category: "Serviced Accommodation",
      description: "5-star luxury serviced apartments in South Kensington. Specialists in serviced apartments for any length of stay with spacious bedrooms, top-tier kitchens and gigabit Wi-Fi.",
      rating: 4.9,
      reviews: 127,
      verificationBadge: "5-Star Luxury • South Kensington Specialist",
      serviceAreas: ["South Kensington", "Central London", "Corporate Guests"],
      specializations: ["Luxury Serviced Apartments", "Corporate Accommodation", "Extended Stays", "Executive Suites"],
      contactInfo: { 
        phone: "+44-20-7370-5555", 
        email: "reservations@theharrington.com",
        website: "theharrington.com"
      },
      isPremium: true
    },
    {
      name: "Viridian Apartments",
      category: "Serviced Accommodation",
      description: "Luxury serviced apartment specialist across London offering direct guests the best rates with comprehensive services for corporate and leisure stays.",
      rating: 4.7,
      reviews: 156,
      verificationBadge: "Direct Best Rates • London Specialist",
      serviceAreas: ["All London", "Multiple Locations", "Central London"],
      specializations: ["Best Rate Guarantee", "Corporate Bookings", "Leisure Stays", "Flexible Terms"],
      contactInfo: { 
        phone: "+44-20-3743-0331", 
        email: "bookings@viridianapartments.com",
        website: "viridianapartments.com"
      },
      isPremium: true
    },
    {
      name: "London Serviced Apartments",
      category: "Serviced Accommodation",
      description: "Range of luxury serviced apartments and apart hotels across London. Working with individuals, families and corporate groups for vacation and business stays.",
      rating: 4.6,
      reviews: 203,
      verificationBadge: "Full Range Specialist • Corporate Focused",
      serviceAreas: ["All London", "UK Wide", "Corporate Solutions"],
      specializations: ["Corporate Groups", "Family Accommodations", "Business Travel", "Vacation Rentals"],
      contactInfo: { 
        phone: "+44-20-8004-0007", 
        email: "reservations@londonservicedapartments.co.uk",
        website: "londonservicedapartments.co.uk"
      },
      isPremium: true
    },
    
    // Independent Schools
    {
      name: "Westminster School",
      category: "Independent Schools",
      description: "One of England's most prestigious independent schools, offering exceptional education for children aged 13-18. Westminster provides unparalleled academic excellence with outstanding university placement rates.",
      rating: 4.9,
      reviews: 127,
      verificationBadge: "Academic Excellence • Oxbridge Pipeline",
      serviceAreas: ["Westminster", "Central London", "International Students"],
      specializations: ["Academic Excellence", "University Preparation", "International Students", "Boarding Options"],
      contactInfo: { 
        phone: "+44-20-7963-1000", 
        email: "admissions@westminster.org.uk",
        website: "westminster.org.uk"
      },
      isPremium: true
    },
    {
      name: "St Paul's Girls' School",
      category: "Independent Schools", 
      description: "Leading independent day school for girls aged 11-18, consistently ranked among the top academic schools in the UK. Known for exceptional STEM programs and university preparation.",
      rating: 4.8,
      reviews: 94,
      verificationBadge: "Top Academic Performance • STEM Excellence",
      serviceAreas: ["Hammersmith", "West London", "International Applications"],
      specializations: ["STEM Excellence", "University Preparation", "Creative Arts", "Academic Leadership"],
      contactInfo: { 
        phone: "+44-20-8748-4875", 
        email: "admissions@spgs.org",
        website: "spgs.org"
      },
      isPremium: true
    },
    {
      name: "Harrow School",
      category: "Independent Schools",
      description: "World-renowned independent boarding school for boys aged 13-18. Historic institution with exceptional academic standards and comprehensive pastoral care for international students.",
      rating: 4.9,
      reviews: 156,
      verificationBadge: "Historic Excellence • International Boarding",
      serviceAreas: ["Harrow-on-the-Hill", "London", "Global Admissions"],
      specializations: ["Boarding Excellence", "International Students", "University Preparation", "Character Development"],
      contactInfo: { 
        phone: "+44-20-8872-8000", 
        email: "admissions@harrowschool.org.uk",
        website: "harrowschool.org.uk"
      },
      isPremium: true
    },
    {
      name: "Dwight School London",
      category: "Independent Schools",
      description: "International Baccalaureate World School offering personalized learning for students aged 3-18. Specializes in supporting internationally mobile families with seamless transitions.",
      rating: 4.7,
      reviews: 89,
      verificationBadge: "IB Excellence • International Transitions",
      serviceAreas: ["North London", "International Community", "IB Programme"],
      specializations: ["International Baccalaureate", "Internationally Mobile Families", "Personalized Learning", "Global Transitions"],
      contactInfo: { 
        phone: "+44-20-8920-0600", 
        email: "admissions@dwightlondon.org",
        website: "dwightlondon.org"
      },
      isPremium: true
    },
    
    // Premium Banking Services
    {
      name: "Coutts Private Bank",
      category: "Premium Banking",
      description: "Royal warrant holders providing private banking and wealth management for over 300 years. Minimum deposit £3M for international clients with 24/7 concierge banking services.",
      rating: 4.9,
      reviews: 342,
      verificationBadge: "Royal Warrant Holders • 300+ Years Heritage",
      serviceAreas: ["London", "International", "Global Wealth Management"],
      specializations: ["Private Banking", "Wealth Management", "International Clients", "24/7 Concierge Services"],
      contactInfo: { 
        phone: "+44-20-7957-2424", 
        email: "enquiries@coutts.com",
        website: "coutts.com"
      },
      isPremium: true
    },
    {
      name: "HSBC Premier Banking",
      category: "Premium Banking",
      description: "Global banking for international clients with multi-currency accounts and worldwide coverage. Largest bank in Europe with specialized expatriate services across 60+ countries.",
      rating: 4.7,
      reviews: 1283,
      verificationBadge: "Global Network • Expat Specialists",
      serviceAreas: ["London", "Global Network", "Multi-Currency"],
      specializations: ["International Banking", "Multi-Currency Accounts", "Expatriate Services", "Global Transfers"],
      contactInfo: { 
        phone: "+44-345-770-7070", 
        email: "premier@hsbc.co.uk",
        website: "hsbc.co.uk/premier"
      },
      isPremium: true
    },
    {
      name: "Barclays Private Bank",
      category: "Premium Banking",
      description: "Specialist investment, banking and wealth advisory services for influential individuals and families. Minimum £3M investment portfolio with 330+ years banking experience.",
      rating: 4.8,
      reviews: 567,
      verificationBadge: "330+ Years Experience • Global Resources",
      serviceAreas: ["Canary Wharf", "Global Wealth Hubs", "International"],
      specializations: ["Wealth Advisory", "Investment Services", "Estate Planning", "Bespoke Banking"],
      contactInfo: { 
        phone: "+44-207-761-5138", 
        email: "privatebank@barclays.com",
        website: "privatebank.barclays.com"
      },
      isPremium: true
    },
    {
      name: "Standard Chartered Priority Banking",
      category: "Premium Banking",
      description: "International banking with focus on emerging markets and global wealth solutions. Priority Banking services from London headquarters with Asian, African and Middle Eastern expertise.",
      rating: 4.6,
      reviews: 894,
      verificationBadge: "Emerging Markets Expertise • Global Reach",
      serviceAreas: ["London", "Asia Pacific", "Middle East & Africa"],
      specializations: ["International Wealth Solutions", "Emerging Markets", "Cross-Border Banking", "Global Network"],
      contactInfo: { 
        phone: "+44-20-7885-8888", 
        email: "priority@sc.com",
        website: "sc.com/priority-banking"
      },
      isPremium: true
    },
    
    // Private Healthcare Services
    {
      name: "The Harley Street Clinic",
      category: "Private Healthcare",
      description: "World-leading acute care hospital specialising in oncology, cardiology and neurosciences. CQC Outstanding rating with international patient coordinators and global medical concierge services.",
      rating: 4.9,
      reviews: 847,
      verificationBadge: "CQC Outstanding • Global Medical Excellence",
      serviceAreas: ["Harley Street", "Weymouth Street", "International Patients"],
      specializations: ["Oncology", "Cardiology", "Neurosciences", "International Patients"],
      contactInfo: { 
        phone: "+44-20-7935-7700", 
        email: "international@hcahealthcare.co.uk",
        website: "hcahealthcare.co.uk/harley-street-clinic"
      },
      isPremium: true
    },
    {
      name: "The London Clinic",
      category: "Private Healthcare",
      description: "UK's largest independent private hospital established in 1932. 90+ years of international medical excellence with dedicated international coordinators and multilingual support.",
      rating: 4.8,
      reviews: 1156,
      verificationBadge: "90+ Years Excellence • International Coordinators",
      serviceAreas: ["Devonshire Place", "London Medical District", "International"],
      specializations: ["International Patients", "Specialist Surgery", "Diagnostics", "Medical Excellence"],
      contactInfo: { 
        phone: "+44-20-7935-4444", 
        email: "international@thelondonclinic.co.uk",
        website: "thelondonclinic.co.uk"
      },
      isPremium: true
    },
    {
      name: "The London General Practice",
      category: "Private Healthcare",
      description: "24/7 private GP services on Harley Street with global healthcare concierge. Provides comprehensive medical services for UK and international patients with home and hotel visits.",
      rating: 4.7,
      reviews: 623,
      verificationBadge: "24/7 Service • Global Healthcare Concierge",
      serviceAreas: ["Harley Street", "Home Visits", "Hotel Visits"],
      specializations: ["24/7 GP Services", "International Patients", "Home Visits", "Healthcare Concierge"],
      contactInfo: { 
        phone: "+44-207-935-1000", 
        email: "enquiries@thelondongeneralpractice.com",
        website: "thelondongeneralpractice.com"
      },
      isPremium: true
    },
    {
      name: "Cleveland Clinic London",
      category: "Private Healthcare",
      description: "World-class American healthcare in London with dedicated Global Patient Services. Transparent pricing, multilingual support, and seamless care coordination for international patients.",
      rating: 4.8,
      reviews: 394,
      verificationBadge: "World-Class Care • Global Patient Services",
      serviceAreas: ["Portland Place", "Moorgate", "Multiple Locations"],
      specializations: ["Global Patient Services", "Self-Pay Services", "International Care", "Multilingual Support"],
      contactInfo: { 
        phone: "+44-20-3423-8000", 
        email: "international@clevelandcliniclondon.uk",
        website: "clevelandcliniclondon.uk"
      },
      isPremium: true
    },
    
    // Premium Transport Services
    {
      name: "JK Executive Chauffeurs",
      category: "Premium Transport",
      description: "Top-rated luxury chauffeur service with 120 professional chauffeurs and 24/7 personalized customer service. Serving executives, diplomats, and corporate teams with discretion and punctuality.",
      rating: 4.9,
      reviews: 1247,
      verificationBadge: "120 Professional Chauffeurs • 24/7 Service",
      serviceAreas: ["London", "All Major Airports", "Corporate Travel"],
      specializations: ["Executive Transfers", "Airport Services", "Corporate Travel", "Diplomatic Services"],
      contactInfo: { 
        phone: "+44-203-475-9906", 
        email: "info@jkexecutivechauffeurs.com",
        website: "jkexecutivechauffeurs.com"
      },
      isPremium: true
    },
    {
      name: "London Luxury Chauffeuring",
      category: "Premium Transport",
      description: "Elite chauffeur services with Rolls-Royce, Bentley, and Mercedes fleet. Global travel solutions including private jet charters and international chauffeur services for luxury lifestyle.",
      rating: 4.8,
      reviews: 634,
      verificationBadge: "Elite Fleet • Global Travel Solutions",
      serviceAreas: ["London", "Global Network", "Private Aviation"],
      specializations: ["Luxury Fleet", "Bespoke Travel", "Concierge Services", "Global Solutions"],
      contactInfo: { 
        phone: "+44-20-7123-4567", 
        email: "bookings@llccars.co.uk",
        website: "llccars.co.uk"
      },
      isPremium: true
    },
    {
      name: "Blacklane",
      category: "Premium Transport",
      description: "Global premium chauffeur service with experienced local drivers and flight tracking. Quality and integrity service with punctual arrivals and personal pickup at airports worldwide.",
      rating: 4.7,
      reviews: 2156,
      verificationBadge: "Global Network • Flight Tracking",
      serviceAreas: ["London", "Global Coverage", "All UK Airports"],
      specializations: ["Airport Transfers", "Flight Tracking", "Global Network", "Corporate Travel"],
      contactInfo: { 
        phone: "+44-20-3318-9761", 
        email: "support@blacklane.com",
        website: "blacklane.com"
      },
      isPremium: true
    },
    {
      name: "Imperial Ride",
      category: "Premium Transport",
      description: "Premium chauffeur service operating in 60 cities worldwide for over 9 years. Fixed pricing, 24/7 customer service, and chauffeurs with signed NDAs for complete confidentiality.",
      rating: 4.8,
      reviews: 892,
      verificationBadge: "60 Cities Worldwide • NDA Protection",
      serviceAreas: ["London", "60 Global Cities", "International Travel"],
      specializations: ["Privacy Protection", "Fixed Pricing", "Global Coverage", "VIP Services"],
      contactInfo: { 
        phone: "+44-2080-904-926", 
        email: "bookings@imperialride.com",
        website: "imperialride.com"
      },
      isPremium: true
    },
    
    // Lifestyle Concierge Services
    {
      name: "Quintessentially",
      category: "Lifestyle Concierge",
      description: "World's largest luxury concierge group with 60 global offices and 1,500 dedicated concierges. Average client net worth $36M with unparalleled global access and elite lifestyle management.",
      rating: 4.9,
      reviews: 2847,
      verificationBadge: "60 Global Offices • $36M Avg Client Worth",
      serviceAreas: ["London", "60 Global Destinations", "Worldwide Access"],
      specializations: ["Elite Lifestyle Management", "Global Access", "Luxury Events", "VIP Services"],
      contactInfo: { 
        phone: "+44-207-201-0700", 
        email: "info@quintessentially.com",
        website: "quintessentially.com"
      },
      isPremium: true
    },
    {
      name: "Innerplace Concierge",
      category: "Lifestyle Concierge",
      description: "Award-winning luxury lifestyle concierge established in 2002 with 21+ years experience. Mayfair-based with dedicated lifestyle managers providing bespoke, personalized VIP treatment.",
      rating: 4.8,
      reviews: 1534,
      verificationBadge: "21+ Years Experience • Award-Winning Service",
      serviceAreas: ["Mayfair", "Central London", "Exclusive Access"],
      specializations: ["West End Premieres", "Michelin-Starred Access", "Private Members Clubs", "Dedicated Managers"],
      contactInfo: { 
        phone: "+44-207-364-385", 
        email: "concierge@innerplace.co.uk",
        website: "innerplace.co.uk"
      },
      isPremium: true
    },
    {
      name: "48 London",
      category: "Lifestyle Concierge",
      description: "London's leading lifestyle management service founded by Sophie Shelton with 30+ years experience. Personalized approach with 'can achieve anything in this reality' philosophy.",
      rating: 4.7,
      reviews: 892,
      verificationBadge: "30+ Years Expertise • Personalized Approach",
      serviceAreas: ["London", "Global Travel", "Lifestyle Management"],
      specializations: ["Holiday Planning", "Household Management", "Event Planning", "Personal Wellness"],
      contactInfo: { 
        phone: "+44-20-7123-4848", 
        email: "hello@48london.com",
        website: "48london.com"
      },
      isPremium: true
    },
    {
      name: "The Fixer Lifestyle Group",
      category: "Lifestyle Concierge",
      description: "World-leading luxury concierge with 14+ years expertise managing HNWIs and UHNWIs. Global presence in London, New York, Dubai with staff speaking 8 languages across 23 countries.",
      rating: 4.8,
      reviews: 1276,
      verificationBadge: "14+ Years Expertise • 23 Countries Network",
      serviceAreas: ["London", "New York", "Dubai", "Global Network"],
      specializations: ["HNWI Management", "VIP Events", "Luxury Travel", "Multilingual Support"],
      contactInfo: { 
        phone: "+44-20-7580-3456", 
        email: "enquiries@the-fixer.co.uk",
        website: "the-fixer.co.uk"
      },
      isPremium: true
    },
    {
      name: "Cadogan Tate Fine Art",
      category: "Luxury Movers",
      description: "International fine art and luxury goods specialists with 40+ years experience. White-glove service for high-value collections, antiques, and sensitive items.",
      rating: 4.9,
      reviews: 127,
      verificationBadge: "Premium Verified • Fine Art Certified",
      serviceAreas: ["All London", "UK Nationwide", "International"],
      specializations: ["Fine Art Transport", "Antique Handling", "Custom Crating", "Climate Control"],
      contactInfo: { 
        phone: "+44-20-8963-4815", 
        email: "relocations@cadogantate.com",
        website: "www.cadogantate.com"
      },
      isSponsored: true,
      isPremium: true
    },
    {
      name: "Cheval Collection",
      category: "Property Specialists",
      description: "Luxury serviced apartments and residences in London's most prestigious locations. Fully furnished properties with hotel-style services.",
      rating: 4.8,
      reviews: 203,
      verificationBadge: "Premium Partner • Quality Assured",
      serviceAreas: ["Mayfair", "Kensington", "Chelsea", "South Kensington"],
      specializations: ["Serviced Apartments", "Corporate Housing", "Executive Suites", "Long-term Stays"],
      contactInfo: { 
        phone: "+44-20-7925-1525", 
        email: "reservations@chevalcollection.com" 
      },
      isSponsored: true,
      isPremium: true
    },
    {
      name: "Black Brick Property",
      category: "Property Specialists", 
      description: "Prime Central London property search and acquisition specialists. Expert guidance for luxury residential purchases and rentals.",
      rating: 4.9,
      reviews: 95,
      verificationBadge: "Luxury Property Expert • RICS Certified",
      serviceAreas: ["Prime Central London", "Zones 1-2", "International Investment"],
      specializations: ["Luxury Rentals", "Property Purchase", "Investment Advisory", "Market Analysis"],
      contactInfo: { 
        phone: "+44-20-3727-2320", 
        email: "enquiries@blackbrickproperty.com" 
      },
      isPremium: true
    },
    {
      name: "Bishop's Move International",
      category: "Luxury Movers",
      description: "Award-winning international relocation specialists with comprehensive door-to-door services. Full insurance coverage and climate-controlled transport.",
      rating: 4.7,
      reviews: 312,
      verificationBadge: "International Certified • BAR Member",
      serviceAreas: ["Greater London", "UK Wide", "Global Network"],
      specializations: ["International Moving", "Pet Relocation", "Vehicle Transport", "Storage Solutions"],
      contactInfo: { 
        phone: "+44-20-8391-5000", 
        email: "international@bishopsmove.com" 
      }
    },
    // Additional Luxury Movers - Top Priority Partners
    {
      name: "Anthony Ward Thomas",
      category: "Luxury Movers",
      description: "London's most trusted removals and storage company with global network of vetted partners. Premium white-glove service for irreplaceable and high-value items.",
      rating: 4.9,
      reviews: 436,
      verificationBadge: "5-Star Trustpilot • Master Removers Group",
      serviceAreas: ["All London", "UK Wide", "Global Network"],
      specializations: ["Premium International Moves", "White Glove Service", "Art & Antiques", "Executive Relocations"],
      contactInfo: { 
        phone: "+44-20-7038-0449", 
        email: "info@ward-thomas.co.uk",
        website: "ward-thomas.co.uk"
      },
      isPremium: true
    },
    {
      name: "Abels Moving Services",
      category: "Luxury Movers",
      description: "Royal Warrant holder with 60+ years experience. Security-cleared teams specializing in luxury removals across London's premium areas including Chelsea and Kensington.",
      rating: 4.8,
      reviews: 287,
      verificationBadge: "Royal Warrant Holder • King Charles III",
      serviceAreas: ["Chelsea", "Kensington", "Camden", "Westminster", "International"],
      specializations: ["Fine Art Handling", "Antique Specialists", "Piano Moving", "Executive Relocations"],
      contactInfo: { 
        phone: "+44-77-3455-6387", 
        email: "london@abels.co.uk",
        website: "abels.co.uk"
      },
      isPremium: true
    },
    {
      name: "John Mason International",
      category: "Luxury Movers",
      description: "140+ years experience with King's Award for Enterprise. Professional Move Managers and award-winning packing services for 50,000+ annual international moves.",
      rating: 4.7,
      reviews: 342,
      verificationBadge: "King's Award Winner • 140+ Years Experience",
      serviceAreas: ["London", "Liverpool", "International", "68 Countries"],
      specializations: ["International Move Management", "Professional Packing", "Corporate Relocations", "Global Mobility"],
      contactInfo: { 
        phone: "+44-80-0093-2623", 
        email: "enquiries@johnmason.com",
        website: "johnmason.com"
      },
      isPremium: true
    },
    {
      name: "Santa Fe Relocation",
      category: "Luxury Movers",
      description: "60 years experience with global network spanning 38 countries. Comprehensive relocation services including visa assistance and corporate solutions.",
      rating: 4.8,
      reviews: 267,
      verificationBadge: "Global Network • 38 Countries",
      serviceAreas: ["London", "UK Wide", "Global", "64 Offices Worldwide"],
      specializations: ["Global Mobility", "Visa & Immigration", "Corporate Relocations", "Pet & Vehicle Relocation"],
      contactInfo: { 
        phone: "+44-20-8961-4141", 
        email: "headoffice@santaferelo.com",
        website: "santaferelo.com"
      },
      isPremium: true
    }
  ]

  // Filter partners based on search and category
  const filteredPartners = premiumPartners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const marketInsights = [
    {
      title: "Average Prime Rental",
      value: "£3,250/wk",
      change: "+8.5%",
      trend: "up" as const,
      icon: Home,
      description: "Central London luxury properties, year-on-year growth"
    },
    {
      title: "Relocation Volume",
      value: "2,840",
      change: "+12.3%",
      trend: "up" as const,
      icon: Users,
      description: "Executive relocations to London in Q3 2024"
    },
    {
      title: "Average Time to Settle",
      value: "6.2 weeks",
      change: "-15%",
      trend: "down" as const,
      icon: Clock,
      description: "For premium assisted relocations vs industry average"
    },
    {
      title: "Client Satisfaction",
      value: "96.4%",
      change: "+2.1%",
      trend: "up" as const,
      icon: Target,
      description: "Rating for verified Relo Network partners"
    }
  ]

  const vettingProcess = [
    {
      number: "1",
      title: "Initial Application Review",
      description: "Comprehensive business credentials check, insurance verification, and industry certification validation."
    },
    {
      number: "2", 
      title: "Quality Assessment",
      description: "On-site service evaluation, process review, and quality management system audit."
    },
    {
      number: "3",
      title: "Client Reference Verification", 
      description: "Direct contact with previous clients to verify service quality and satisfaction levels."
    },
    {
      number: "4",
      title: "Ongoing Performance Monitoring",
      description: "Continuous tracking of client feedback, service metrics, and quality standards compliance."
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Enhanced Structured Data for Directory Authority */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}

      {/* Background Overlays */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Light Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF9] via-white to-[#F8F9FA]"></div>
        
        {/* Elegant Translucent Overlays */}
        <div className="absolute inset-0">
          {/* Large circle - top right */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#C9A24A]/25 to-[#C9A24A]/10 blur-3xl"></div>
          
          {/* Medium circle - bottom left */}
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0B1B2B]/15 to-[#0B1B2B]/5 blur-2xl"></div>
          
          {/* Small accent - center left */}
          <div className="absolute top-1/3 -left-20 w-56 h-56 rounded-full bg-gradient-to-r from-[#C9A24A]/20 to-transparent blur-xl"></div>
          
          {/* Additional accent - center right */}
          <div className="absolute top-2/3 -right-16 w-48 h-48 rounded-full bg-gradient-to-l from-[#0B1B2B]/12 to-transparent blur-xl"></div>
          
          {/* Geometric shapes for sophistication */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#C9A24A]/40 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-[#0B1B2B]/40 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-[#C9A24A]/35 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#0B1B2B]/30 rounded-full animate-pulse delay-3000"></div>
        </div>
      </div>

      {/* London Market Authority Hero */}
      <div className="relative bg-[#0B1B2B]/95 backdrop-blur-sm text-white shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">London's Premier Service Directory</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white px-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                London Partner <span className="text-[#C9A24A]">Directory</span><br />
                Access
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Access London's most comprehensive directory of <strong className="text-[#C9A24A]">vetted service providers</strong> across all specialties. 
                Choose your access level to connect with <strong className="text-[#C9A24A]">200+ premium partners</strong> instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-xl"
                  onClick={() => window.location.href = '/directory/signup'}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Get Directory Access
                </Button>
                <button 
                  className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border border-white text-white bg-transparent hover:bg-white hover:text-[#0B1B2B] rounded-md hover:scale-105 transition-all font-medium"
                  onClick={() => window.location.href = '/directory/preview'}
                >
                  Browse Free Preview
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {marketInsights.map((insight, index) => (
                <MarketInsightCard key={index} {...insight} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Search & Filters */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#FAFAF9] rounded-lg p-6 border border-[#0B1B2B]/10">
            <div className="grid lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Search Partners</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search visa lawyers, luxury movers, serviced apartments..."
                    className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Service Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">London Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="All Areas">All Areas</option>
                  <option value="Central London (Zones 1-2)">Central London (Zones 1-2)</option>
                  <option value="Greater London (All Zones)">Greater London (All Zones)</option>
                  <option value="Canary Wharf & East London">Canary Wharf & East London</option>
                  <option value="West London (Kensington, Chelsea, Hammersmith)">West London (Kensington, Chelsea, Hammersmith)</option>
                  <option value="North London (Camden, Islington, Hampstead)">North London (Camden, Islington, Hampstead)</option>
                  <option value="South London (Clapham, Wandsworth, Greenwich)">South London (Clapham, Wandsworth, Greenwich)</option>
                  <option value="Specific Borough (please specify)">Specific Borough (please specify)</option>
                </select>
              </div>
              
              <div>
                <Button 
                  onClick={() => window.location.href = '/directory/signup'}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Get Directory Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* London Area Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              London Area Coverage
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Our partner network spans all 33 London boroughs. Browse service providers by area to find specialists in your specific location.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {londonAreas.map((area, index) => (
              <LondonAreaCard key={index} {...area} />
            ))}
          </div>

          <div className="text-center">
            <div className="bg-[#C9A24A]/5 rounded-lg p-8 border border-[#C9A24A]/20">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Complete Partner Coverage</h3>
              <p className="text-[#6B7280] mb-6 max-w-3xl mx-auto">
                Find trusted service providers across all 33 London boroughs. From Zone 1 specialists to suburban experts, access the right partners wherever you need them.
              </p>
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md"
                onClick={() => window.location.href = '/directory/signup'}
              >
                Get Directory Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Lawyers Highlight Section */}
      {(selectedCategory === 'All' || selectedCategory === 'Legal & Visa') && (
        <section className="py-16 bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-4">
                <Briefcase className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">Legal & Visa Specialists</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Elite Immigration Lawyers
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Chambers-ranked immigration specialists serving executives and HNW individuals. From Global Talent visas to complex discretionary applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Chambers UK Ranked</h3>
                <p className="text-white/80 text-sm">Band 1 and leading tier immigration practices</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">QC/KC Specialists</h3>
                <p className="text-white/80 text-sm">Leading King's Counsel and senior barristers</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">HNW Expertise</h3>
                <p className="text-white/80 text-sm">Specialized in high net worth and executive immigration</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 text-lg rounded-lg hover:scale-105 transition-all"
                onClick={() => setSelectedCategory('Legal & Visa')}
              >
                View All Visa Lawyers
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Finance and Tax Specialists Highlight Section */}
      {(selectedCategory === 'All' || selectedCategory === 'Financial Services') && (
        <section className="py-16 bg-gradient-to-br from-[#C9A24A] to-[#C9A24A]/90 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
                <TrendingUp className="h-4 w-4 text-white mr-2" />
                <span className="text-white text-sm font-medium">Financial Services & Tax Advisory</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                International Tax & Wealth Advisors
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Top UK accounting firms specializing in international relocations, expat tax planning, and cross-border wealth management for executives.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Cross-border Expertise</h3>
                <p className="text-white/80 text-sm">International tax planning and compliance specialists</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">UHNW Focus</h3>
                <p className="text-white/80 text-sm">Wealth management for high net worth individuals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Executive Services</h3>
                <p className="text-white/80 text-sm">Specialized relocation and assignment tax support</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-white text-[#C9A24A] hover:bg-white/90 px-8 py-3 text-lg rounded-lg hover:scale-105 transition-all font-semibold"
                onClick={() => setSelectedCategory('Financial Services')}
              >
                View All Finance Specialists
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Property Specialists Highlight Section */}
      {(selectedCategory === 'All' || selectedCategory === 'Property Specialists') && (
        <section className="py-16 bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-4">
                <Home className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">Property Search Specialists</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Prime London Property Experts
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Award-winning property specialists and buying agents with exclusive access to prime central London properties, including off-market opportunities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Off-Market Access</h3>
                <p className="text-white/80 text-sm">Exclusive properties never appearing on the open market</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Award-Winning Agents</h3>
                <p className="text-white/80 text-sm">Top-tier buying agents with decades of combined experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Prime Central Focus</h3>
                <p className="text-white/80 text-sm">Specialists in Mayfair, Belgravia, Kensington & Chelsea</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 text-lg rounded-lg hover:scale-105 transition-all"
                onClick={() => setSelectedCategory('Property Specialists')}
              >
                View All Property Specialists
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Serviced Accommodation Highlight Section */}
      {(selectedCategory === 'All' || selectedCategory === 'Serviced Accommodation') && (
        <section className="py-16 bg-gradient-to-br from-[#C9A24A] to-[#C9A24A]/90 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
                <Building className="h-4 w-4 text-white mr-2" />
                <span className="text-white text-sm font-medium">Serviced Accommodation Specialists</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Executive Serviced Accommodation
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Premium serviced apartments and corporate housing with hotel-style services, perfect for executive relocations and extended business stays.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">5-Star Luxury</h3>
                <p className="text-white/80 text-sm">Premium apartments with hotel-style concierge services</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Corporate Ready</h3>
                <p className="text-white/80 text-sm">Dedicated workspaces and business amenities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">Flexible Terms</h3>
                <p className="text-white/80 text-sm">Short-term to extended stays with all-inclusive rates</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-white text-[#C9A24A] hover:bg-white/90 px-8 py-3 text-lg rounded-lg hover:scale-105 transition-all font-semibold"
                onClick={() => setSelectedCategory('Serviced Accommodation')}
              >
                View All Serviced Accommodation
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Luxury Movers Highlight Section */}
      {(selectedCategory === 'All' || selectedCategory === 'Luxury Movers') && (
        <section className="py-16 bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-4">
                <Car className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">Luxury Moving Specialists</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Elite International Movers
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
                Award-winning international moving companies with Royal Warrants, centuries of experience, and white-glove services for executive relocations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Royal Warrant Holders</h3>
                <p className="text-white/80 text-sm">Royal recognition for exceptional service and quality</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">Global Networks</h3>
                <p className="text-white/80 text-sm">Worldwide coverage with trusted partner networks</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-white mb-2">White Glove Service</h3>
                <p className="text-white/80 text-sm">Specialized handling for art, antiques, and valuables</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 text-lg rounded-lg hover:scale-105 transition-all"
                onClick={() => setSelectedCategory('Luxury Movers')}
              >
                View All Luxury Movers
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Premium Partner Network */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Vetted Partner Network
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Every service provider in our directory is carefully vetted and continuously monitored for quality. Connect with confidence.
            </p>
          </div>

          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-[#0B1B2B] mb-2">
                Showing {filteredPartners.length} of {premiumPartners.length} partners
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPartners.length > 0 ? (
              filteredPartners.map((partner, index) => (
                <div key={index} className="relative">
                  <PartnerCard {...partner} userAccessTier={userAccessTier} />
                </div>
              ))
            ) : (
              <div className="lg:col-span-2 text-center py-12">
                <div className="text-[#6B7280] mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">No partners found</h3>
                  <p>Try adjusting your search terms or category filter</p>
                </div>
                <Button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-8 border border-[#0B1B2B]/10">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-[#C9A24A]" />
                  </div>
                  <h3 className="font-bold text-[#0B1B2B] mb-2">200+ Service Providers</h3>
                  <p className="text-[#6B7280] text-sm">Comprehensive network across all specialties</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-[#C9A24A]" />
                  </div>
                  <h3 className="font-bold text-[#0B1B2B] mb-2">96.4% Satisfaction</h3>
                  <p className="text-[#6B7280] text-sm">Verified client ratings and continuous monitoring</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-[#C9A24A]" />
                  </div>
                  <h3 className="font-bold text-[#0B1B2B] mb-2">Local Expertise</h3>
                  <p className="text-[#6B7280] text-sm">Specialists covering all 33 London boroughs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Vetting Process */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Rigorous Vetting Standards
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Our comprehensive 4-stage vetting process ensures only the highest quality partners join our exclusive network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {vettingProcess.map((step, index) => (
                <VettingStep key={index} {...step} />
              ))}
            </div>
            
            <div className="bg-[#FAFAF9] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-6">Quality Assurance Metrics</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Application Acceptance Rate</span>
                  <span className="font-bold text-[#0B1B2B]">23%</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Average Partner Rating</span>
                  <span className="font-bold text-[#0B1B2B]">4.8/5.0</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Client Satisfaction Rate</span>
                  <span className="font-bold text-[#0B1B2B]">96.4%</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">Partner Retention Rate</span>
                  <span className="font-bold text-[#0B1B2B]">94%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Continuous Monitoring</span>
                  <span className="font-bold text-[#C9A24A]">24/7</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#C9A24A]/10 rounded-lg border border-[#C9A24A]/20">
                <div className="text-sm font-medium text-[#0B1B2B] mb-2">Quality Guarantee</div>
                <p className="text-xs text-[#6B7280]">
                  All partners maintain comprehensive insurance coverage, industry certifications, and undergo monthly performance reviews to ensure consistent service excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Intake CTA - Primary */}
      <section className="py-16 bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-4">
              <Crown className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Executive Service</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Start Executive Intake
            </h2>
            <p className="text-xl text-white/90 mb-6">
              60-min strategy call, bespoke shortlist, 3 warm intros, 30-day execution window
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="text-6xl font-bold text-[#C9A24A] mb-2">£1,500</div>
            <div className="text-white/90 mb-4">Complete intake service • Credit applied to any package</div>
            <Button 
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white text-lg px-12 py-4 rounded-lg hover:scale-105 shadow-xl transition-all"
              onClick={checkoutFunctions.executiveIntake}
            >
              Start Executive Intake — £1,500
            </Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
              <span>60-min strategy call</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
              <span>Bespoke shortlist</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
              <span>3 warm introductions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
              <span>30-day execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome-Based Access Tiers */}
      <section id="access-tiers" className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Outcome-Based Access
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto">
              Choose your level of support to achieve your London relocation goals
            </p>
          </div>

          {/* Main Tiers */}
          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {/* Free */}
            <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#6B7280]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-[#6B7280]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Free</h3>
                <div className="text-3xl font-bold text-[#0B1B2B] mb-2">£0</div>
                <p className="text-[#6B7280] text-sm">Browse and explore</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Browse directory</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>1 concierge question/day</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Save 3 items</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-[#6B7280] hover:bg-[#4B5563] text-white text-sm rounded-md"
                onClick={() => window.location.href = '/directory/preview'}
              >
                Start Free
              </Button>
            </div>

            {/* Plus */}
            <div className="bg-white rounded-lg p-6 border border-[#C9A24A]/30 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Plus</h3>
                <div className="text-3xl font-bold text-[#C9A24A] mb-1">£29<span className="text-lg">/mo</span></div>
                <div className="text-xs text-[#6B7280] mb-2">or £290/yr</div>
                <p className="text-[#6B7280] text-sm">Full access + intros</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Full filters & contact details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>3 curated intros/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Templates bundle</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                onClick={checkoutFunctions.plusMonthly}
                disabled={loading}
              >
                Start Plus
              </Button>
            </div>

            {/* Pro - Featured */}
            <div className="bg-white rounded-lg p-6 border-2 border-[#C9A24A] shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-[#C9A24A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Pro</h3>
                <div className="text-3xl font-bold text-[#C9A24A] mb-1">£99<span className="text-lg">/mo</span></div>
                <div className="text-xs text-[#6B7280] mb-2">or £990/yr</div>
                <p className="text-[#6B7280] text-sm">Unlimited intros + support</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Unlimited curated intros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>48-hour area shortlist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>WhatsApp line (UK hours)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Doc pre-check</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                onClick={checkoutFunctions.proMonthly}
                disabled={loading}
              >
                Start Pro
              </Button>
            </div>

            {/* Executive Intake */}
            <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white rounded-lg p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Executive Intake</h3>
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">£1,500</div>
                <p className="text-white/80 text-sm">Complete done-for-you</p>
              </div>
              
              <ul className="space-y-2 mb-6 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>60-min strategy call</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>Bespoke shortlist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>3 warm intros</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
                  <span>30-day execution window</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                onClick={checkoutFunctions.executiveIntake}
              >
                Start Executive Intake
              </Button>
            </div>
          </div>

          {/* Accelerators */}
          <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 text-center">Accelerators</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* 72-Hour Day Pass */}
              <div className="text-center p-6 bg-[#FAFAF9] rounded-lg border border-[#C9A24A]/20">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h4 className="font-bold text-[#0B1B2B] mb-2">72-Hour Day Pass</h4>
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">£59</div>
                <p className="text-sm text-[#6B7280] mb-4">Full access + 1 curated intro</p>
                <Button 
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                  onClick={checkoutFunctions.dayPass}
                >
                  Get Day Pass
                </Button>
              </div>

              {/* Intro Pack 3 */}
              <div className="text-center p-6 bg-[#FAFAF9] rounded-lg border border-[#C9A24A]/20">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h4 className="font-bold text-[#0B1B2B] mb-2">Intro Pack</h4>
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">£149</div>
                <p className="text-sm text-[#6B7280] mb-4">3 curated introductions</p>
                <Button 
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                  onClick={checkoutFunctions.introPack3}
                >
                  Get 3 Intros
                </Button>
              </div>

              {/* Intro Pack 10 */}
              <div className="text-center p-6 bg-[#FAFAF9] rounded-lg border border-[#C9A24A]/20">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h4 className="font-bold text-[#0B1B2B] mb-2">Premium Intro Pack</h4>
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">£399</div>
                <p className="text-sm text-[#6B7280] mb-4">10 curated introductions</p>
                <Button 
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md"
                  onClick={checkoutFunctions.introPack10}
                >
                  Get 10 Intros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Executive Intake Primary */}
      <div className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Start Your London Relocation?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Skip the research. Get connected to the right providers immediately with Executive Intake.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] !text-white rounded-md hover:scale-105 shadow-xl text-lg px-8 py-4"
              onClick={checkoutFunctions.executiveIntake}
            >
              <Crown className="mr-2 h-5 w-5" />
              Start Executive Intake — £1,500
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-[#0B1B2B] rounded-md hover:scale-105 transition-all"
              onClick={() => window.location.href = '/directory/preview'}
            >
              Browse Free First
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80 mb-8">
            <div>✓ 60-min Strategy Call</div>
            <div>✓ Bespoke Shortlist</div>
            <div>✓ 3 Warm Introductions</div>
            <div>✓ 30-day Execution</div>
          </div>
          
          <div className="text-white/40 text-sm">
            © 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
          </div>
        </div>
      </div>

      {/* Executive Intake Nudge for browsing/filtering triggers */}
      <ExecutiveIntakeNudge 
        trigger="partner_views"
        nudgeText="Get 3 warm intros + a 30-day execution plan."
      />
    </Layout>
  )
}