'use client'

import React, { useEffect, useState } from 'react'
import { Check, Star, ArrowRight, Users, Zap, Shield, Phone, Mail, Calendar } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../../components/Layout'

export default function LeadMachineSuccessPage() {
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
      <div className="bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Welcome to the <span className="text-green-200">Lead Machine!</span>
            </h1>
            
            <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Your subscription is confirmed. Get ready for 8-15 qualified leads every month.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="text-green-200 font-semibold mb-2">🎉 FOUNDING MEMBER CONFIRMED</div>
              <div className="text-white text-lg">You're locked in at £497/month forever (saves £500/month)</div>
              {sessionId && (
                <div className="text-white/70 text-sm mt-2">Session: {sessionId.slice(-8)}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What Happens Next
            </h2>
            <p className="text-xl text-[#6B7280]">Your lead generation machine is being activated</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Account Setup (24 hours)</h3>
              <p className="text-[#6B7280] mb-4">Our team will create your partner profile and configure your AI mentions</p>
              <div className="text-sm text-[#C9A24A] font-medium">✓ Profile creation ✓ AI configuration ✓ Directory placement</div>
            </div>
            
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">First Leads (48-72 hours)</h3>
              <p className="text-[#6B7280] mb-4">Start receiving your first qualified leads within 3 business days</p>
              <div className="text-sm text-[#C9A24A] font-medium">✓ Lead notifications ✓ Client details ✓ Dashboard access</div>
            </div>
            
            <div className="text-center p-6 border border-[#0B1B2B]/10 rounded-lg">
              <div className="w-16 h-16 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-[#0B1B2B] mb-3">Full Activation (7 days)</h3>
              <p className="text-[#6B7280] mb-4">Complete territory protection and premium placement activated</p>
              <div className="text-sm text-[#C9A24A] font-medium">✓ Exclusive rights ✓ Email inclusion ✓ Social features</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Guarantee */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-4">Your Lead Guarantee is Active</h3>
            <p className="text-green-700 text-lg mb-6">
              We guarantee you'll receive 8-15 qualified leads in your first month, or we'll pay you £500 for wasting your time + full refund.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-green-800 mb-1">Lead Quality</div>
                <div className="text-green-700">Relocations worth £8,500+ only</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-green-800 mb-1">Response Time</div>
                <div className="text-green-700">Leads delivered within 2 hours</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="font-bold text-green-800 mb-1">Territory Rights</div>
                <div className="text-green-700">Exclusive protection activated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your Lead Machine Team
            </h2>
            <p className="text-xl text-[#6B7280]">Direct access to your success team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#FAFAF9] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Technical Support</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">+44-20-7946-0962</div>
                    <div className="text-[#6B7280] text-sm">Mon-Fri 9AM-6PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">support@relo-network.com</div>
                    <div className="text-[#6B7280] text-sm">24/7 email support</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAF9] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Lead Management</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Sarah Chen - Lead Manager</div>
                    <div className="text-[#6B7280] text-sm">Your dedicated lead specialist</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C9A24A]" />
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Weekly performance reviews</div>
                    <div className="text-[#6B7280] text-sm">Every Friday at 2PM GMT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Scale Higher?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Upgrade to Market Dominator for exclusive category ownership + 15% revenue sharing
          </p>
          
          <Button 
            onClick={() => window.location.href = '/partners/market-dominator'}
            size="lg"
            className="bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all text-xl px-8 py-4"
          >
            Upgrade to Market Dominator <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="text-sm text-white/80 mt-4">
            Founding member pricing available for limited time
          </div>
        </div>
      </div>
    </Layout>
  )
}