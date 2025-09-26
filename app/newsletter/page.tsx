'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowRight, Mail, Calendar, User, Tag, ExternalLink, Star, TrendingUp, Globe } from 'lucide-react'

interface Article {
  id: string
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

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'relocation-guide', name: 'Relocation Guides', count: 8 },
    { id: 'area-spotlight', name: 'Area Spotlights', count: 6 },
    { id: 'partner-features', name: 'Partner Features', count: 5 },
    { id: 'market-insights', name: 'Market Insights', count: 3 },
    { id: 'lifestyle', name: 'London Lifestyle', count: 2 }
  ]

  const featuredArticles: Article[] = [
    {
      id: '1',
      title: 'The Complete Guide to Relocating to Marylebone: A Professional\'s Paradise',
      excerpt: 'Discover why Marylebone has become the preferred choice for international executives, from world-class dining to prestigious schools.',
      category: 'area-spotlight',
      author: 'Sarah Mitchell',
      date: '2025-09-15',
      readTime: '8 min read',
      image: '/images/marylebone-guide.jpg',
      featured: true,
      partnerSpotlight: {
        partner: 'Prime Properties London',
        service: 'Luxury Property Search'
      }
    },
    {
      id: '2',
      title: 'UK Visa Updates: What High-Net-Worth Individuals Need to Know in 2025',
      excerpt: 'Latest changes to investor visas, Global Talent schemes, and expedited processing options for premium relocations.',
      category: 'relocation-guide',
      author: 'Michael Thompson',
      date: '2025-09-12',
      readTime: '12 min read',
      image: '/images/visa-guide.jpg',
      featured: true,
      partnerSpotlight: {
        partner: 'Elite Immigration Advisors',
        service: 'Visa & Legal Services'
      }
    }
  ]

  const recentArticles: Article[] = [
    {
      id: '3',
      title: 'Top 10 International Schools in London for Executive Families',
      excerpt: 'A comprehensive comparison of London\'s most prestigious international schools, including admission requirements and fees.',
      category: 'relocation-guide',
      author: 'Emma Richardson',
      date: '2025-09-10',
      readTime: '6 min read',
      image: '/images/schools-guide.jpg',
      featured: false
    },
    {
      id: '4',
      title: 'Partner Spotlight: How Sterling Wealth Management Simplifies UK Banking',
      excerpt: 'Learn how our featured partner helps international clients navigate UK banking regulations and investment opportunities.',
      category: 'partner-features',
      author: 'James Wilson',
      date: '2025-09-08',
      readTime: '4 min read',
      image: '/images/banking-guide.jpg',
      featured: false,
      partnerSpotlight: {
        partner: 'Sterling Wealth Management',
        service: 'Banking & Financial Services'
      }
    },
    {
      id: '5',
      title: 'Q3 2025 London Property Market Report: Premium Areas Analysis',
      excerpt: 'Exclusive insights into price trends, availability, and investment opportunities in London\'s most sought-after postcodes.',
      category: 'market-insights',
      author: 'Alexandra Davies',
      date: '2025-09-05',
      readTime: '10 min read',
      image: '/images/market-report.jpg',
      featured: false
    },
    {
      id: '6',
      title: 'Cultural Integration: Your First 30 Days in London',
      excerpt: 'Essential tips for seamlessly integrating into London\'s professional and social circles, from networking to local customs.',
      category: 'lifestyle',
      author: 'Sophie Chen',
      date: '2025-09-03',
      readTime: '7 min read',
      image: '/images/culture-guide.jpg',
      featured: false
    }
  ]

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
    <Layout className="bg-[#FAFAF9]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The <span className="text-[#C9A24A]">Relo Network</span> News
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Weekly insights, exclusive guides, and insider knowledge for discerning professionals relocating to London. 
              Curated by experts, featuring trusted partners.
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
                  className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white text-sm mt-3 opacity-90">
                Join 2,500+ professionals • Unsubscribe anytime • Weekly delivery
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
                    <button className="w-full px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors text-sm">
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
                    <div className="p-3 bg-[#F8F9FA] rounded-lg">
                      <div className="text-sm font-semibold text-[#0B1B2B]">Prime Properties London</div>
                      <div className="text-xs text-[#6B7280]">Luxury Property Search</div>
                    </div>
                    <div className="p-3 bg-[#F8F9FA] rounded-lg">
                      <div className="text-sm font-semibold text-[#0B1B2B]">Elite Immigration</div>
                      <div className="text-xs text-[#6B7280]">Visa & Legal Services</div>
                    </div>
                    <div className="p-3 bg-[#F8F9FA] rounded-lg">
                      <div className="text-sm font-semibold text-[#0B1B2B]">Sterling Wealth</div>
                      <div className="text-xs text-[#6B7280]">Banking & Finance</div>
                    </div>
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
                    <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/newsletter/marylebone-guide'}>
                      <div className="aspect-video bg-gradient-to-br from-[#0B1B2B] to-[#C9A24A] relative flex items-center justify-center">
                        <div className="text-center text-white p-6">
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
                        {article.partnerSpotlight && (
                          <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg">
                            <div className="text-xs text-[#6B7280] mb-1">Featured Partner</div>
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
                    <article key={article.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '/newsletter/marylebone-guide'}>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48 flex-shrink-0">
                          <div className="aspect-video md:aspect-square bg-gradient-to-br from-[#0B1B2B] to-[#C9A24A] rounded-lg relative flex items-center justify-center">
                            <div className="text-center text-white p-3">
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
                          {article.partnerSpotlight && (
                            <div className="mb-4 p-3 bg-[#F8F9FA] rounded-lg">
                              <div className="text-xs text-[#6B7280] mb-1">Featured Partner</div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors">
              Subscribe to Newsletter
            </button>
            <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#0B1B2B] font-semibold rounded-lg transition-colors">
              Explore Partners
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}