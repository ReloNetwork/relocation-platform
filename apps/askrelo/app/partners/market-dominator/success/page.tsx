'use client'

import React, { useEffect, useState } from 'react'
import { Check, Star, ArrowRight, Users, Zap, Shield, Phone, Mail, Calendar, Crown, Trophy } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../../components/Layout'

export default function MarketDominatorSuccessPage() {
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get('session_id')
    if (session) {
      setSessionId(session)
    }
  }, [])

  return (
    <Layout className="bg-[#FAFAF9]">
      {/* Success Hero */}
      <div className="bg-gradient-to-br from-[#C9A24A] to-[#B8923D] text-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="h-10 w-10 text-[#C9A24A]" />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              <span className="text-yellow-200">Market Domination</span><br />
              Activated!
            </h1>
            
            <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              You now own your category. Competition eliminated. Premium pricing secured.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="text-yellow-200 font-semibold mb-2">👑 MARKET DOMINATOR CONFIRMED</div>
              <div className="text-white text-lg">Exclusive category ownership at £1,497/month (saves £1,500/month)</div>
              <div className="text-white/90 text-sm mt-2">+ 15% revenue sharing on all deals</div>
              {sessionId && (
                <div className="text-white/70 text-xs mt-2">Session: {sessionId.slice(-8)}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Market Domination Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your Market Domination Benefits
            </h2>
            <p className="text-xl text-[#6B7280]">Exclusive advantages now active</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <Crown className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">Category Ownership</h3>
              <p className="text-[#6B7280] text-sm">You are THE only recommended provider in your service category</p>
            </div>
            
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <Zap className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">AI Preferred Status</h3>
              <p className="text-[#6B7280] text-sm">AI specifically mentions you as "preferred partner" to all clients</p>
            </div>
            
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <Trophy className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">15% Revenue Share</h3>
              <p className="text-[#6B7280] text-sm">Earn £750+ per deal in addition to your service fees</p>
            </div>
            
            <div className="text-center p-6 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">Competition Blocked</h3>
              <p className="text-[#6B7280] text-sm">All competitors removed from recommendations in your category</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Market Domination Activation Timeline
            </h2>
            <p className="text-xl text-[#6B7280]">Your premium onboarding process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Immediate Activation (2 hours)</h3>
              <p className="text-[#6B7280] mb-4">Competition eliminated, AI preferences updated, category locked</p>
              <div className="text-sm text-[#C9A24A] font-medium">
                ✓ Competitors removed<br/>
                ✓ AI mentions updated<br/>
                ✓ Preferred status active
              </div>
            </div>
            
            <div className="text-center p-8 bg-white border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Executive Onboarding (24 hours)</h3>
              <p className="text-[#6B7280] mb-4">CEO call, dedicated account manager assigned, white-label setup</p>
              <div className="text-sm text-[#C9A24A] font-medium">
                ✓ CEO strategy call<br/>
                ✓ Account manager assigned<br/>
                ✓ Custom integration setup
              </div>
            </div>
            
            <div className="text-center p-8 bg-white border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Full Domination (48 hours)</h3>
              <p className="text-[#6B7280] mb-4">Co-branded content live, revenue sharing active, priority leads flowing</p>
              <div className="text-sm text-[#C9A24A] font-medium">
                ✓ Content collaboration<br/>
                ✓ Revenue sharing active<br/>
                ✓ Priority lead distribution
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Projection */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your Revenue Projection
            </h2>
            <p className="text-xl text-[#6B7280]">Based on Market Dominator performance data</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border-2 border-[#C9A24A] rounded-lg">
              <div className="text-5xl font-bold text-[#C9A24A] mb-2">£28,500</div>
              <div className="text-xl font-semibold text-[#0B1B2B] mb-2">Monthly Service Revenue</div>
              <div className="text-[#6B7280] text-sm">Average from 12+ exclusive leads</div>
            </div>
            
            <div className="text-center p-8 border-2 border-[#C9A24A] rounded-lg bg-[#C9A24A]/5">
              <div className="text-5xl font-bold text-[#C9A24A] mb-2">£9,000</div>
              <div className="text-xl font-semibold text-[#0B1B2B] mb-2">Revenue Share Bonus</div>
              <div className="text-[#6B7280] text-sm">15% share on £60k monthly closures</div>
            </div>
            
            <div className="text-center p-8 border-2 border-[#C9A24A] rounded-lg">
              <div className="text-5xl font-bold text-[#C9A24A] mb-2">£37,500</div>
              <div className="text-xl font-semibold text-[#0B1B2B] mb-2">Total Monthly Income</div>
              <div className="text-[#6B7280] text-sm">Combined revenue + sharing</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/20 rounded-lg p-6">
              <div className="text-2xl font-bold text-[#0B1B2B] mb-2">Annual Projection: £450,000+</div>
              <div className="text-[#6B7280]">Based on average Market Dominator performance (investment: £17,964/year)</div>
              <div className="text-[#C9A24A] font-semibold mt-2">ROI: 2,400%+ annually</div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Support Team */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your Executive Support Team
            </h2>
            <p className="text-xl text-[#6B7280]">Dedicated premium support for Market Dominators</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border-2 border-[#C9A24A]">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-6">24/7 Priority Support</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">+44-20-7946-0961</div>
                    <div className="text-[#6B7280] text-sm">24/7 Priority Hotline</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">dominator@relo-network.com</div>
                    <div className="text-[#6B7280] text-sm">VIP email support</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">James Wellington-Smith</div>
                    <div className="text-[#6B7280] text-sm">Your dedicated account director</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-[#C9A24A]">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-6">Executive Services</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Quarterly Business Reviews</div>
                    <div className="text-[#6B7280] text-sm">CEO strategy sessions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Advisory Board Participation</div>
                    <div className="text-[#6B7280] text-sm">Shape platform direction</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">White-label Integration</div>
                    <div className="text-[#6B7280] text-sm">Custom branded solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <div className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Crown className="h-16 w-16 text-[#C9A24A] mx-auto mb-6" />
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Welcome to Market Domination
          </h3>
          <p className="text-xl mb-8 text-white/90">
            You now control your market. Your competitors have been eliminated. Premium pricing is secured.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-[#C9A24A] font-bold text-lg mb-2">Your CEO Call is Being Scheduled</div>
            <div className="text-white">James Wellington-Smith will contact you within 2 hours to discuss your market domination strategy</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}