'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Layout from '../../../components/Layout'

export default function SimplePaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const requestId = searchParams?.get('requestId') || 'Unknown'
  const company = searchParams?.get('company') || 'Unknown Company'
  const timeline = searchParams?.get('timeline') || 'unknown'

  const emergencyPackages = [
    {
      id: 'emergency-immediate',
      name: 'Emergency Response Package',
      originalPrice: 4999,
      price: 3349,
      timeline: 'Within 24 hours',
      discount: '33% OFF',
      features: [
        '2-hour emergency response guarantee',
        'Dedicated emergency relocation specialist',
        'Same-day property viewings',
        '24/7 emergency hotline support'
      ]
    },
    {
      id: 'emergency-urgent', 
      name: 'Priority Response Package',
      originalPrice: 3999,
      price: 3199,
      timeline: 'Within 48 hours',
      discount: '20% OFF',
      features: [
        '4-hour priority response guarantee',
        'Senior relocation consultant',
        'Next-day property shortlist',
        'Priority support line'
      ]
    },
    {
      id: 'emergency-priority',
      name: 'Fast-Track Package', 
      originalPrice: 2999,
      price: 1679,
      timeline: 'Within 1 week',
      discount: '44% OFF',
      features: [
        '24-hour response guarantee',
        'Experienced relocation advisor',
        '3-day property selection',
        'Business hours support'
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
          companyName: decodeURIComponent(company),
          timeline,
          successUrl: `${window.location.origin}/corporate/payment/success?session_id={CHECKOUT_SESSION_ID}&requestId=${requestId}`,
          cancelUrl: `${window.location.origin}/corporate/payment-simple?requestId=${requestId}&company=${encodeURIComponent(company)}&timeline=${timeline}`
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 py-12 rounded-lg mb-8">
            <div className="text-center text-white">
              <div className="text-4xl mb-4">✅</div>
              <h1 className="text-3xl font-bold mb-2">Request Submitted Successfully!</h1>
              <p className="text-xl">Your emergency consultation request has been received</p>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Request Details</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Request ID:</strong> {requestId}</p>
              <p><strong>Company:</strong> {decodeURIComponent(company)}</p>
              <p><strong>Timeline:</strong> {timeline}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens Next</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="text-white font-semibold">Emergency Response Team Contacted</h3>
                  <p>Our emergency specialist will call you within 2 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="text-white font-semibold">Assessment & Planning</h3>
                  <p>We'll assess your needs and create a custom emergency plan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="text-white font-semibold">Service Options</h3>
                  <p>Choose between free consultation or immediate paid service</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Free Consultation */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Free Consultation</h3>
              <p className="text-blue-200 mb-4">Discuss your needs with our emergency specialist</p>
              <ul className="text-blue-100 space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 2-hour response guarantee</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Detailed needs assessment</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Custom solution design</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> No obligation quote</li>
              </ul>
              <button 
                onClick={handleScheduleConsultation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-colors"
              >
                📅 Schedule Free Consultation
              </button>
            </div>

            {/* Emergency Packages */}
            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-3">Emergency Service Packages</h3>
              <p className="text-amber-200 mb-4">Book immediately with exclusive emergency pricing</p>
              
              <div className="bg-red-500/20 border border-red-500/30 rounded p-3 mb-4">
                <div className="flex items-center text-red-300 text-sm">
                  <span className="mr-2">⚡</span>
                  <span className="font-semibold">Limited Time: Emergency pricing valid for 24 hours</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">Save up to 44%</div>
                <div className="text-amber-200">on emergency relocation packages</div>
              </div>
              
              <button 
                onClick={() => {
                  document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold text-lg transition-colors"
              >
                💰 View Emergency Packages
              </button>
            </div>
          </div>

          {/* Emergency Packages Section */}
          <div id="packages" className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Emergency Relocation Packages</h2>
              <p className="text-gray-300 text-lg">Choose your emergency package with exclusive pricing</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {emergencyPackages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className={`bg-slate-800/50 border rounded-lg p-6 ${
                    timeline === pkg.id.split('-')[1] 
                      ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/5' 
                      : 'border-slate-700'
                  } ${index === 0 ? 'md:scale-105' : ''}`}
                >
                  {timeline === pkg.id.split('-')[1] && (
                    <div className="text-center mb-4">
                      <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                        RECOMMENDED FOR YOU
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-amber-400 font-semibold mb-3">{pkg.timeline}</div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-gray-400 line-through text-lg mr-2">£{pkg.originalPrice.toLocaleString()}</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {pkg.discount}
                        </span>
                      </div>
                      <div className="text-3xl font-bold text-white">
                        £{pkg.price.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-sm">One-time emergency fee</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm text-gray-300">
                        <span className="text-green-400 mr-2 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleBookService(pkg.id, pkg.price)}
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      timeline === pkg.id.split('-')[1]
                        ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? 'Processing...' : '💳 Book Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Emergency Hotline</h2>
            <p className="text-red-200 mb-4">Need immediate assistance?</p>
            <div className="text-3xl font-bold text-red-300 mb-2">+44 20 7946 0958</div>
            <p className="text-red-200 text-sm">Available 24/7 for emergency relocations</p>
            <p className="text-red-200 text-sm mt-2">Reference ID: {requestId}</p>
          </div>

        </div>
      </div>
    </Layout>
  )
}