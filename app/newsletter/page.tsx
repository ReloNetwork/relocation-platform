'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowRight, Mail, Calendar, User, Tag, ExternalLink, Star, TrendingUp, Globe } from 'lucide-react'
import Head from 'next/head'
import { getProfessionalPartnerArticles, professionalPartners } from '@/lib/professional-partners'

interface Article {
  id: string
  slug?: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  partnerSpotlight?: {
    partner: string
    service: string
  }
}

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get Professional Partner articles
  const partnerArticles = getProfessionalPartnerArticles()
  
  const categories = [
    { id: 'all', name: 'All Articles', count: partnerArticles.length + 4 },
    { id: 'accommodation-insights', name: 'Accommodation', count: partnerArticles.filter(a => a.category === 'accommodation-insights').length },
    { id: 'area-spotlight', name: 'Area Spotlights', count: partnerArticles.filter(a => a.category === 'area-spotlight').length + 1 },
    { id: 'immigration-insights', name: 'Immigration', count: partnerArticles.filter(a => a.category === 'immigration-insights').length + 1 },
    { id: 'banking-insights', name: 'Banking & Wealth', count: partnerArticles.filter(a => a.category === 'banking-insights').length },
    { id: 'education-insights', name: 'Education', count: 1 },
    { id: 'transport-insights', name: 'Transport', count: 1 },
    { id: 'market-insights', name: 'Market Insights', count: 1 },
    { id: 'launch-announcement', name: 'Launch Updates', count: 1 }
  ].filter(cat => cat.count > 0)

  // Get featured articles from partner articles + custom articles
  const featuredPartnerArticles = partnerArticles.filter(article => article.featured)
  
  const featuredArticles: Article[] = [
    // Partner articles (transformed to match Article interface)
    ...featuredPartnerArticles.map(article => ({
      ...article,
      author: article.partnerName || 'Professional Partner',
      date: article.publishedDate,
      image: `/images/${article.slug}.jpg`,
      partnerSpotlight: {
        partner: article.partnerName || '',
        service: article.partnerCategory || ''
      }
    })),
    // Custom launch article
    {
      id: 'launch-newsletter',
      title: 'The Executive\'s London Has Arrived - Relo Network Launch Edition',
      excerpt: 'From Goldman Sachs MDs to pharmaceutical CEOs, discover how Fortune 500 executives are transforming their London relocations with our exclusive founding partner network.',
      category: 'launch-announcement',
      author: 'Relo Network Team',
      date: '2025-01-07',
      readTime: '6 min read',
      image: '/images/relo-launch-newsletter.jpg',
      featured: true,
      partnerSpotlight: {
        partner: 'The Chancery Rosewood',
        service: 'Ultra-Luxury Executive Suites'
      }
    }
  ]

  // Get non-featured partner articles + custom articles
  const nonFeaturedPartnerArticles = partnerArticles.filter(article => !article.featured)
  
  const recentArticles: Article[] = [
    // Non-featured partner articles
    ...nonFeaturedPartnerArticles.map(article => ({
      ...article,
      author: article.partnerName || 'Professional Partner',
      date: article.publishedDate,
      image: `/images/${article.slug}.jpg`,
      partnerSpotlight: {
        partner: article.partnerName || '',
        service: article.partnerCategory || ''
      }
    })),
    // Custom articles
    {
      id: 'american-school-london-guide',
      title: 'American School in London: Seamless Education Transition for Executive Families',
      excerpt: 'Why 50 nationalities choose ASL for continuity. From flexible admissions to dedicated expat support - ensuring family decisions drive relocation timing.',
      category: 'education-insights',
      author: 'Education Placement Experts',
      date: '2025-01-04',
      readTime: '6 min read',
      image: '/images/asl-partnership.jpg',
      featured: false
    },
    {
      id: 'london-luxury-transport',
      title: 'Executive Transport Excellence: London Luxury Chauffeuring Services Overview',
      excerpt: 'Range Rover Autobiography fleet, signed NDAs, and 24/7 availability. How premium transport services ensure executive confidentiality and reliability.',
      category: 'transport-insights',
      author: 'Executive Services Team',
      date: '2025-01-03',
      readTime: '4 min read',
      image: '/images/luxury-transport.jpg',
      featured: false
    },
    {
      id: 'london-property-trends-2025',
      title: 'London Property Market 2025: Executive Relocation Insights and Trends',
      excerpt: 'American buyers driving 300% increase in London purchases. New FIG tax regime benefits and 48-hour decision windows for premium properties.',
      category: 'market-insights',
      author: 'Property Market Analysts',
      date: '2025-01-02',
      readTime: '8 min read',
      image: '/images/london-property-2025.jpg',
      featured: false
    }
  ]

  const scrollToEmailInput = () => {
    const emailInput = document.querySelector('input[type="email"]')
    if (emailInput) {
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        (emailInput as HTMLInputElement).focus()
      }, 500)
    }
  }

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter-page',
          utmSource: 'website',
          utmMedium: 'newsletter-page',
          utmCampaign: 'header-signup'
        }),
      })

      const data = await response.json()

      if (data.success) {
        setEmail('')
        alert('Thank you for subscribing! You\'ll receive our next edition within 48 hours.')
      } else {
        alert(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      alert('Failed to subscribe. Please try again.')
    }
  }

  const filteredArticles = selectedCategory === 'all' 
    ? [...featuredArticles, ...recentArticles]
    : [...featuredArticles, ...recentArticles].filter(article => article.category === selectedCategory)

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white px-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The <span className="text-[#C9A24A]">Executive's</span> London Newsletter
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Exclusive insights, founding partner spotlights, and insider intelligence for Fortune 500 executives relocating to London. 
              Where £45,000 budgets meet white-glove service.
            </p>
            
            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-[#0B1B2B] placeholder-[#6B7280] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white text-sm mt-3 opacity-90">
                Join Fortune 500 executives • Unsubscribe anytime • Weekly insider intelligence
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-[#E5E7EB] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">2,500+</div>
              <div className="text-sm text-[#6B7280]">Subscribers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">24</div>
              <div className="text-sm text-[#6B7280]">Articles Published</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">15+</div>
              <div className="text-sm text-[#6B7280]">Partner Features</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">96%</div>
              <div className="text-sm text-[#6B7280]">Open Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-8">
                
                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#C9A24A]" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedCategory === category.id
                            ? 'bg-[#C9A24A] text-white'
                            : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#0B1B2B]'
                        }`}
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-xs">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 rounded-xl p-6 text-white">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-2 text-white">Weekly Insights</h3>
                    <p className="text-white text-sm mb-4">
                      Get the latest relocation trends, partner spotlights, and exclusive London insights.
                    </p>
                    <button 
                      onClick={scrollToEmailInput}
                      className="w-full px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors text-sm hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>

                {/* Partner Network */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#C9A24A]" />
                    Featured Partners
                  </h3>
                  <div className="space-y-3">
                    {professionalPartners.slice(0, 3).map((partner) => (
                      <div key={partner.id} className="p-3 bg-[#F8F9FA] rounded-lg">
                        <div className="text-sm font-semibold text-[#0B1B2B]">{partner.name}</div>
                        <div className="text-xs text-[#6B7280]">{partner.specialization}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors text-sm">
                    View All Partners
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              
              {/* Featured Articles */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#0B1B2B] mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Featured Articles
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredArticles.map((article) => (
                    <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = `/newsletter/${article.slug || article.id}`}>
                      <div className="aspect-video relative flex items-center justify-center overflow-hidden">
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: article.id === 'launch-newsletter' 
                              ? 'url(https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=450&fit=crop&crop=center&auto=format&q=80)'
                              : 'url(https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=450&fit=crop&crop=center&auto=format&q=80)'
                          }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B2B]/50 to-[#1e3a8a]/30" />
                        {/* Content */}
                        <div className="relative text-center text-white p-6 z-10">
                          <h4 className="text-xl font-bold mb-2">{article.title.split(':')[0]}</h4>
                          <p className="text-white/80 text-sm">{article.category.replace('-', ' ').toUpperCase()}</p>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                            Featured
                          </span>
                        </div>
                        {article.partnerSpotlight && (
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0B1B2B]">
                              <Star className="w-3 h-3 mr-1" />
                              Partner Spotlight
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-sm text-[#6B7280]">
                          <span className="text-[#C9A24A] font-medium capitalize">
                            {article.category.replace('-', ' ')}
                          </span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#0B1B2B] mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-[#6B7280] mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        {article.partnerSpotlight && article.partnerSpotlight.partner && (
                          <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg">
                            <div className="text-xs text-[#6B7280] mb-1">Professional Partner</div>
                            <div className="text-sm font-semibold text-[#0B1B2B]">{article.partnerSpotlight.partner}</div>
                            <div className="text-xs text-[#6B7280]">{article.partnerSpotlight.service}</div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#0B1B2B]">{article.author}</div>
                              <div className="text-xs text-[#6B7280]">{article.date}</div>
                            </div>
                          </div>
                          <div className="text-[#C9A24A] font-medium text-sm flex items-center gap-2">
                            Read Full Article
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Recent Articles */}
              <div>
                <h2 className="text-3xl font-bold text-[#0B1B2B] mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Recent Articles
                </h2>
                <div className="space-y-6">
                  {recentArticles.map((article) => (
                    <article key={article.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = `/newsletter/${article.slug || article.id}`}>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48 flex-shrink-0">
                          <div className="aspect-video md:aspect-square rounded-lg relative flex items-center justify-center overflow-hidden">
                            {/* Background Image */}
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: article.id === 'fragomen-immigration-guide' 
                                  ? 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&crop=center&auto=format&q=80)'
                                  : article.id === 'american-school-london-guide'
                                  ? 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center&auto=format&q=80)'
                                  : article.id === 'london-luxury-transport'
                                  ? 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop&crop=center&auto=format&q=80)'
                                  : 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&crop=center&auto=format&q=80)'
                              }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B2B]/50 to-[#1e3a8a]/30" />
                            {/* Content */}
                            <div className="relative text-center text-white p-3 z-10">
                              <h5 className="text-sm font-bold">{article.title.split(':')[0]}</h5>
                            </div>
                            {article.partnerSpotlight && (
                              <div className="absolute top-2 left-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0B1B2B]">
                                  <Star className="w-3 h-3 mr-1" />
                                  Partner
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3 text-sm text-[#6B7280]">
                            <span className="text-[#C9A24A] font-medium capitalize">
                              {article.category.replace('-', ' ')}
                            </span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                            <span>•</span>
                            <span>{article.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-[#0B1B2B] mb-3">
                            {article.title}
                          </h3>
                          <p className="text-[#6B7280] mb-4">
                            {article.excerpt}
                          </p>
                          {article.partnerSpotlight && article.partnerSpotlight.partner && (
                            <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg">
                              <div className="text-xs text-[#6B7280] mb-1">Professional Partner</div>
                              <div className="text-sm font-semibold text-[#0B1B2B]">{article.partnerSpotlight.partner}</div>
                              <div className="text-xs text-[#6B7280]">{article.partnerSpotlight.service}</div>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-sm font-medium text-[#0B1B2B]">{article.author}</div>
                            </div>
                            <div className="text-[#C9A24A] font-medium text-sm flex items-center gap-2">
                              Read Full Article
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Make London Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get expert guidance, trusted partners, and insider knowledge delivered weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={scrollToEmailInput}
              className="px-8 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Subscribe to Newsletter
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#0B1B2B] font-semibold rounded-lg transition-colors">
              Explore Partners
            </button>
          </div>
          
          <div className="text-white/40 text-sm">
            © 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
          </div>
        </div>
      </div>
    </Layout>
  )
}
