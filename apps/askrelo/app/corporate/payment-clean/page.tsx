'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Phone } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

export default function CleanPaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const requestId = searchParams?.get('requestId') || ''
  const company = searchParams?.get('company') || 'Your Company'
  const timeline = searchParams?.get('timeline') || 'urgent'

  const handleBookService = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: 'emergency-urgent',
          price: 3199,
          requestId,
          companyName: decodeURIComponent(company),
          timeline,
          successUrl: `${window.location.origin}/corporate/payment/success?session_id={CHECKOUT_SESSION_ID}&requestId=${requestId}`,
          cancelUrl: `${window.location.origin}/corporate/payment-clean?requestId=${requestId}&company=${encodeURIComponent(company)}&timeline=${timeline}`
        })
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Error creating payment session. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleConsultation = () => {
    router.push(`/corporate/consultation?requestId=${requestId}&company=${encodeURIComponent(company)}`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#16A34A] rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Request Submitted
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Your emergency consultation request for <span className="font-semibold text-[#0B1220]">{decodeURIComponent(company)}</span> has been received.
            </p>
          </div>

          {/* Payment Options */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Free Consultation */}
            <div className="bg-[#FFFFFF] rounded-lg border border-gray-200 p-8 shadow-sm">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-4">
                Free Consultation
              </h2>
              <p className="text-[#6B7280] mb-6">
                Discuss your relocation needs with our emergency specialist team.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>2-hour response guarantee</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>Detailed needs assessment</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>Custom solution design</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>No obligation quote</span>
                </div>
              </div>

              <Button 
                onClick={handleScheduleConsultation}
                variant="outline"
                className="w-full py-6 text-lg font-semibold border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Emergency Service */}
            <div className="bg-[#FFFFFF] rounded-lg border border-[#C9A24A] p-8 shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#C9A24A] text-[#0B1220] px-4 py-1 rounded-full text-sm font-semibold">
                  EMERGENCY PACKAGE
                </span>
              </div>
              
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-4 mt-4">
                Book Emergency Service
              </h2>
              <p className="text-[#6B7280] mb-6">
                Immediate emergency relocation service with dedicated specialist.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-[#6B7280] line-through text-lg mr-2">£3,999</span>
                  <span className="font-['Playfair_Display'] text-4xl font-bold text-[#0B1220]">£3,199</span>
                </div>
                <p className="text-center text-[#6B7280] text-sm mt-1">One-time emergency fee</p>
                <div className="text-center mt-2">
                  <span className="bg-[#DC2626] text-white px-2 py-1 rounded text-xs font-semibold">
                    20% EMERGENCY DISCOUNT
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>4-hour priority response</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>Dedicated emergency specialist</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>Same-day property viewings</span>
                </div>
                <div className="flex items-center text-[#0B1220]">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3" />
                  <span>24/7 emergency support</span>
                </div>
              </div>

              <Button 
                onClick={handleBookService}
                disabled={loading}
                className="w-full py-6 text-lg font-semibold bg-[#C9A24A] text-[#0B1220] hover:bg-[#B8923D] hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Book Emergency Service'}
              </Button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-16 text-center">
            <div className="bg-[#FFFFFF] rounded-lg border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto">
              <Phone className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-[#6B7280] mb-4">
                Call our 24/7 emergency hotline
              </p>
              <div className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1220] mb-2">
                +44 20 7946 0958
              </div>
              <p className="text-[#6B7280] text-sm">
                Reference ID: {requestId}
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}