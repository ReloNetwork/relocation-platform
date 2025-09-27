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
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm hover:shadow-lg transition-all">
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
  isPremium = false 
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
}) => (
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
          <h3 className="font-bold text-[#0B1B2B] text-lg">{name}</h3>
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
    </div>
    
    <div className="flex gap-3">
      <Button className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white text-sm rounded-md">
        View Profile
      </Button>
      <Button variant="outline" className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white text-sm rounded-md">
        Contact
      </Button>
    </div>
  </div>
)

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
  const schemas = getAllDirectorySchemas()

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
    'All', 'Property Specialists', 'Luxury Movers', 'Legal & Visa', 'Financial Services', 
    'Education Consultants', 'Lifestyle Concierge', 'Transportation', 'Home Services', 'Lifestyle Services', 'Pet Relocation', 'Travel', 'Other (please specify)'
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
    }
  ]

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

      {/* London Market Authority Hero */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
                <MapPin className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#C9A24A] text-sm font-medium">London's Premier Service Directory</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
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
                    placeholder="Find service providers by name or specialty..."
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

          <div className="grid lg:grid-cols-2 gap-8">
            {premiumPartners.map((partner, index) => (
              <div key={index} className="relative">
                <PartnerCard {...partner} />
              </div>
            ))}
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