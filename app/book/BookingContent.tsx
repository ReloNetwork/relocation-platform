'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import type { User } from '@supabase/supabase-js'
import type { Organization } from '@/types/db'

interface BookingContentProps {
  user: User
  organization: Organization
  orgId: string
}

export default function BookingContent({ user, organization, orgId }: BookingContentProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Book a Consultation
          </h1>
          <p className="text-lg text-[#6B7280] mb-4">
            Schedule a personalized consultation with our relocation experts
          </p>
          <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2">
            <span className="text-[#C9A24A] text-sm font-medium">
When you book here, it appears instantly on your concierge calendar
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cal.com Embed */}
          <div className="lg:col-span-2">
            <Card className="border-[#E5E7EB] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B]">Select Your Consultation</CardTitle>
                <CardDescription>
                  Choose the consultation type that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  data-cal-link="team/relo-network"
                  data-cal-config='{"layout":"month_view","theme":"light"}'
                  style={{ 
                    width: '100%', 
                    height: '700px', 
                    overflow: 'scroll',
                    borderRadius: '0 0 0.5rem 0.5rem'
                  }}
                ></div>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Info */}
          <div className="space-y-6">
            <Card className="border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-lg">Your Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-[#6B7280]">Organization</p>
                    <p className="font-medium text-[#0B1B2B]">{organization.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Type</p>
                    <p className="font-medium text-[#0B1B2B] capitalize">{organization.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Contact Email</p>
                    <p className="font-medium text-[#0B1B2B]">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#C9A24A]/20 bg-[#C9A24A]/5">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-lg">What to Expect</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A24A] mt-1">•</span>
                    <span>Personalized relocation strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A24A] mt-1">•</span>
                    <span>Timeline and budget planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A24A] mt-1">•</span>
                    <span>Direct partner introductions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A24A] mt-1">•</span>
                    <span>Clear next steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A24A] mt-1">•</span>
                    <span>Ongoing concierge support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6B7280] mb-4">
                  Having trouble booking or need a different time? Our team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A24A]">📧</span>
                    <span className="text-[#6B7280]">concierge@therelonetwork.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A24A]">📞</span>
                    <span className="text-[#6B7280]">+44 20 3974 1239</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg p-8 border border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Consultation Types Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">Discovery Call</h3>
              <p className="text-sm text-[#6B7280]">30 minutes • Free initial consultation to understand your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">Strategy Session</h3>
              <p className="text-sm text-[#6B7280]">60 minutes • £95 deep-dive planning with custom strategy</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">VIP Consultation</h3>
              <p className="text-sm text-[#6B7280]">90 minutes • £195 comprehensive consultation with immediate partner access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}