'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { XCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/ui/components/button'

export default function CheckoutCancelledPage() {
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setPlan(urlParams.get('plan'))
  }, [])

  const getPlanName = (planType: string | null) => {
    switch (planType) {
      case 'founding_partner': return 'Founding Partner Charter'
      case 'premium_sponsor': return 'Premium Sponsor'
      case 'executive_intake': return 'Executive Intake'
      case 'plus': return 'Plus Directory Access'
      case 'pro': return 'Pro Directory Access'
      case 'day_pass': return '72-Hour Day Pass'
      case 'intro_pack_3': return 'Intro Pack (3)'
      case 'intro_pack_10': return 'Premium Intro Pack (10)'
      default: return 'service'
    }
  }

  const getReturnUrl = (planType: string | null) => {
    switch (planType) {
      case 'founding_partner':
      case 'premium_sponsor':
        return '/partners'
      case 'executive_intake':
      case 'plus':
      case 'pro':
      case 'day_pass':
      case 'intro_pack_3':
      case 'intro_pack_10':
        return '/directory'
      default:
        return '/'
    }
  }

  const planName = getPlanName(plan)
  const returnUrl = getReturnUrl(plan)

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Payment Cancelled
            </h1>
            <p className="text-xl text-[#6B7280]">
              Your {planName} purchase was cancelled. No charges were made to your account.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#0B1B2B]/10 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4">What would you like to do next?</h2>
              <p className="text-[#6B7280]">
                You can try again or explore our other services. If you encountered any issues during checkout, 
                please don't hesitate to contact our support team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#FAFAF9] rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Try Again</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Return to complete your {planName} purchase
                </p>
                <Button 
                  onClick={() => window.location.href = returnUrl}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-2 rounded-lg w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>

              <div className="bg-[#FAFAF9] rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Explore Services</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Browse our directory or view other service options
                </p>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/directory'}
                  className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-6 py-2 rounded-lg w-full"
                >
                  View Directory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Need Help?</h3>
            <p className="text-[#6B7280] mb-6">
              If you experienced technical difficulties or have questions about our services, 
              our team is here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'mailto:support@therelonetwork.com'}
                className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-6 py-3 rounded-lg"
              >
                Email Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'tel:+442079460960'}
                className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-6 py-3 rounded-lg"
              >
                Call +44 20 7946 0960
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="text-[#6B7280] hover:text-[#0B1B2B]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}