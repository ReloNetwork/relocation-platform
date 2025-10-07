'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { ArrowRight, Mail, CheckCircle, TrendingUp, Users, Globe } from 'lucide-react'

export default function GetStartedPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get UTM parameters from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source') || 'direct'
    const utmMedium = urlParams.get('utm_medium') || 'website'
    const utmCampaign = urlParams.get('utm_campaign') || 'get-started'
    
    // Store UTM data for form submission
    sessionStorage.setItem('utm_data', JSON.stringify({
      utmSource,
      utmMedium,
      utmCampaign
    }))
  }, [])

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Get UTM data from session storage
      const utmData = JSON.parse(sessionStorage.getItem('utm_data') || '{}')
      
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'get-started-page',
          utmSource: utmData.utmSource || 'direct',
          utmMedium: utmData.utmMedium || 'website',
          utmCampaign: utmData.utmCampaign || 'get-started'
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        alert(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      alert('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Welcome to Relo News!
              </h1>
              <p className="text-xl text-[#6B7280] mb-8">
                Thank you for joining 2,500+ Fortune 500 executives who rely on our weekly London insights.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] mb-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4">What happens next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2B]">Check your inbox (within 5 minutes)</p>
                    <p className="text-sm text-[#6B7280]">Look for a confirmation email from hello@therelonetwork.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2B]">Get your welcome package</p>
                    <p className="text-sm text-[#6B7280]">London Executive Relocation Guide + Partner Directory</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B1B2B]">Weekly insights start Thursday</p>
                    <p className="text-sm text-[#6B7280]">Market trends, partner spotlights, and exclusive intelligence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/newsletter'}
                className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
              >
                Browse Newsletter Archive
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
              >
                Explore Relo Network
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join The <span className="text-[#C9A24A]">Executive's</span> London
            </h1>
            <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
              Get weekly insights on London relocations, founding partner spotlights, and market intelligence 
              trusted by 2,500+ Fortune 500 executives.
            </p>
            
            {/* Value Proposition */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <h3 className="font-bold text-[#0B1B2B] mb-2">Market Intelligence</h3>
                <p className="text-sm text-[#6B7280]">London property trends, visa updates, and regulatory changes</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <h3 className="font-bold text-[#0B1B2B] mb-2">Partner Spotlights</h3>
                <p className="text-sm text-[#6B7280]">Exclusive features on premium service providers</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <h3 className="font-bold text-[#0B1B2B] mb-2">Insider Access</h3>
                <p className="text-sm text-[#6B7280]">Behind-the-scenes insights from successful relocations</p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">Start Your Subscription</h2>
              <p className="text-[#6B7280]">Join Fortune 500 executives • Unsubscribe anytime • Weekly delivery</p>
            </div>
            
            <form onSubmit={handleNewsletterSignup} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your executive email address"
                  className="w-full pl-10 pr-4 py-4 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-[#0B1B2B] placeholder-[#6B7280]"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#C9A24A] hover:bg-[#B8923D] disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe to Relo News
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-[#C9A24A] text-lg">2,500+</div>
                  <div className="text-[#6B7280]">Subscribers</div>
                </div>
                <div>
                  <div className="font-bold text-[#C9A24A] text-lg">96%</div>
                  <div className="text-[#6B7280]">Open Rate</div>
                </div>
                <div>
                  <div className="font-bold text-[#C9A24A] text-lg">24</div>
                  <div className="text-[#6B7280]">Articles</div>
                </div>
                <div>
                  <div className="font-bold text-[#C9A24A] text-lg">15+</div>
                  <div className="text-[#6B7280]">Partners</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-[#6B7280]">
              By subscribing, you agree to receive weekly emails from Relo Network. 
              <br className="hidden sm:inline" />
              Unsubscribe at any time. View our <a href="#" className="text-[#C9A24A] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}