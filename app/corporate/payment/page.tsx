'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AlertTriangle, CheckCircle, Clock, Shield, Zap, Building2, CreditCard, Calendar, Phone } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

function CorporatePaymentPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [pageError, setPageError] = useState('')
  
  // Get request details from URL params with hydration safety
  const [companyName, setCompanyName] = useState('Your Company')
  const [timeline, setTimeline] = useState('urgent')
  
  useEffect(() => {
    try {
      // Only access searchParams after hydration
      const company = searchParams?.get('company') || 'Your Company'
      const time = searchParams?.get('timeline') || 'urgent'
      const reqId = searchParams?.get('requestId') || ''
      
      console.log('Payment page loaded with params:', { company, time, reqId })
      
      setCompanyName(decodeURIComponent(company))
      setTimeline(time)
      setRequestId(reqId)
    } catch (error) {
      console.error('Error in payment page useEffect:', error)
      setPageError('Error loading payment page')
    }
  }, [searchParams])

  if (pageError) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Payment Page Error</h1>
            <p className="text-red-400 mb-4">{pageError}</p>
            <button 
              onClick={() => router.back()} 
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  const emergencyPackages = [
    {
      id: 'emergency-immediate',
      name: 'Emergency Response Package',
      originalPrice: 4999,
      price: 3349, // 33% off
      timeline: 'Within 24 hours',
      suitable: timeline === 'immediate',
      features: [
        '2-hour emergency response guarantee',
        'Dedicated emergency relocation specialist',
        'Same-day property viewings',
        '24/7 emergency hotline support',
        'Express documentation processing',
        'Emergency accommodation booking',
        'Priority supplier network access',
        'Executive travel coordination'
      ],
      urgentFeatures: [
        'Crisis management protocol',
        'Emergency family relocation',
        'Immediate temporary housing'
      ]
    },
    {
      id: 'emergency-urgent', 
      name: 'Priority Response Package',
      originalPrice: 3999,
      price: 3199, // 20% off
      timeline: 'Within 48 hours',
      suitable: timeline === 'urgent',
      features: [
        '4-hour priority response guarantee',
        'Senior relocation consultant',
        'Next-day property shortlist',
        'Priority support line',
        'Fast-track documentation',
        'Preferred accommodation options',
        'Enhanced supplier network',
        'Executive assistance program'
      ]
    },
    {
      id: 'emergency-priority',
      name: 'Fast-Track Package', 
      originalPrice: 2999,
      price: 1679, // 44% off
      timeline: 'Within 1 week',
      suitable: timeline === 'priority',
      features: [
        '24-hour response guarantee',
        'Experienced relocation advisor',
        '3-day property selection',
        'Business hours support',
        'Streamlined documentation',
        'Quality accommodation network',
        'Established supplier partners',
        'Professional guidance'
      ]
    }
  ]

  const handleBookService = async (packageId: string, price: number) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          price,
          requestId,
          companyName,
          timeline,
          successUrl: `${window.location.origin}/corporate/payment/success?session_id={CHECKOUT_SESSION_ID}&requestId=${requestId}`,
          cancelUrl: `${window.location.origin}/corporate/payment?requestId=${requestId}&company=${encodeURIComponent(companyName)}&timeline=${timeline}`
        })
      })

      const { sessionId, url } = await response.json()
      
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
    router.push(`/corporate/consultation?requestId=${requestId}&company=${encodeURIComponent(companyName)}`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Request Submitted Successfully
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-2">
              Thank you {companyName}! Your emergency consultation request has been received.
            </p>
            <p className="text-blue-200">
              Request ID: <span className="font-mono bg-blue-800/30 px-2 py-1 rounded">{requestId}</span>
            </p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Next Step
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Book your emergency relocation service now with exclusive pricing, or schedule a free consultation first.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Free Consultation Option */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Free Consultation</h3>
                <p className="text-gray-300">
                  Discuss your needs with our emergency response specialist
                </p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>2-hour response guarantee</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Detailed needs assessment</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Custom solution design</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>No obligation quote</span>
                </div>
              </div>

              <Button 
                onClick={handleScheduleConsultation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule Free Consultation
              </Button>
            </div>

            {/* Book Now Option */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <Zap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Book Service Now</h3>
                <p className="text-gray-300">
                  Secure your emergency relocation package with exclusive pricing
                </p>
              </div>
              
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center text-amber-200 mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Limited Time Offer</span>
                </div>
                <p className="text-amber-100 text-sm">
                  Emergency pricing valid for 24 hours. Save up to 44% by booking now.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Immediate service activation</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Emergency pricing discount</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Skip the consultation wait</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Dedicated specialist assigned</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-300 mb-4">Choose your emergency package below</p>
                <div className="w-full h-px bg-amber-500/30"></div>
              </div>
            </div>
          </div>

          {/* Emergency Packages */}
          <div className="grid md:grid-cols-3 gap-8">
            {emergencyPackages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-6 ${
                  pkg.suitable 
                    ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/5' 
                    : 'border-slate-700'
                } ${index === 0 ? 'md:scale-105' : ''}`}
              >
                {pkg.suitable && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-4 w-4 text-amber-400 mr-2" />
                    <span className="text-amber-400 font-semibold">{pkg.timeline}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-gray-400 line-through text-lg mr-2">£{pkg.originalPrice.toLocaleString()}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">One-time emergency fee</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {pkg.urgentFeatures && (
                    <>
                      <div className="border-t border-slate-600 pt-2 mt-3">
                        <div className="text-amber-400 text-xs font-semibold mb-1">EMERGENCY EXTRAS:</div>
                        {pkg.urgentFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start text-sm text-amber-200">
                            <Zap className="h-4 w-4 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <Button 
                  onClick={() => handleBookService(pkg.id, pkg.price)}
                  disabled={loading}
                  className={`w-full py-3 font-semibold ${
                    pkg.suitable 
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : 'Book Now'}
                </Button>
              </div>
            ))}
          </div>

          {/* Security & Guarantee */}
          <div className="mt-16 bg-slate-800/30 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Secure Payment</h3>
                <p className="text-gray-300 text-sm">
                  256-bit SSL encryption. PCI DSS compliant. Your payment is fully secure.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">30-Day Guarantee</h3>
                <p className="text-gray-300 text-sm">
                  100% satisfaction guarantee or full refund within 30 days.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Building2 className="h-12 w-12 text-amber-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Trusted by 500+ Companies</h3>
                <p className="text-gray-300 text-sm">
                  Zero failed executive relocations. Join our success story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default function CorporatePaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CorporatePaymentPageContent />
    </Suspense>
  )
}
