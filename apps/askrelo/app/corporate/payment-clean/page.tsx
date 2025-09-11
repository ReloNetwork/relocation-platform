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

  const packages = [
    {
      id: 'managed-relocation',
      name: 'Managed Relocation',
      description: 'Essential executive relocation service',
      originalPrice: 22500,
      price: 15000,
      discount: '33% OFF',
      features: [
        'Dedicated relocation manager',
        'Property search and shortlisting',
        'Viewing coordination (up to 10)',
        'Application assistance',
        'Move coordination',
        'Basic neighbourhood integration',
        '30-day settling guarantee',
        'Email and phone support'
      ]
    },
    {
      id: 'executive-package',
      name: 'Executive Package',
      description: 'Comprehensive executive relocation',
      originalPrice: 25000,
      price: 20000,
      discount: '20% OFF',
      popular: true,
      features: [
        'Everything in Managed Relocation',
        'Senior relocation specialist',
        'Unlimited property viewings',
        'School search assistance',
        'Family integration services',
        'Temporary accommodation sourcing',
        'Cultural orientation sessions',
        'Priority 24/7 support hotline'
      ]
    },
    {
      id: 'premium-executive',
      name: 'Premium Executive',
      description: 'White-glove executive relocation',
      originalPrice: 45000,
      price: 25000,
      discount: '44% OFF',
      features: [
        'Everything in Executive Package',
        'C-suite relocation director',
        'Luxury property portfolio access',
        'Private school placement',
        'Spouse career assistance',
        'VIP airport transfers',
        'Personal shopping services',
        'Dedicated account manager',
        'Quarterly check-ins for 1 year'
      ]
    }
  ]

  const handleBookService = async (packageId: string, price: number, packageName: string) => {
    console.log('Button clicked:', packageId, price, packageName)
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
          cancelUrl: `${window.location.origin}/corporate/payment-clean?requestId=${requestId}&company=${encodeURIComponent(company)}&timeline=${timeline}`
        })
      })

      const result = await response.json()
      console.log('Payment response:', result)
      
      if (result.url) {
        window.location.href = result.url
      } else {
        throw new Error('No payment URL received')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Error creating payment session. Please try again or call +44 20 7946 0958')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
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

          {/* Pricing Section */}
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0B1220] mb-4">
              Choose Your Emergency Package
            </h2>
            <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
              All packages include our 30-day guarantee with emergency pricing - limited time
            </p>
          </div>

          {/* Three-Tier Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className={`bg-[#FFFFFF] rounded-lg p-8 shadow-sm relative ${
                  pkg.popular 
                    ? 'border-2 border-[#C9A24A] transform lg:scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#C9A24A] text-[#0B1220] px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-[#6B7280] mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-[#6B7280] line-through text-lg mr-2">
                        £{pkg.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-[#DC2626] text-white px-2 py-1 rounded text-xs font-semibold">
                        {pkg.discount}
                      </span>
                    </div>
                    <div className="font-['Playfair_Display'] text-4xl font-bold text-[#0B1220]">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <p className="text-[#6B7280] text-sm mt-1">per employee</p>
                    <p className="text-[#DC2626] text-xs font-semibold mt-1">Emergency pricing - limited time</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-[#0B1220] mb-3">Features included:</h4>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-[#0B1220]">
                      <CheckCircle className="h-4 w-4 text-[#16A34A] mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleBookService(pkg.id, pkg.price, pkg.name)}
                  disabled={loading}
                  className={`w-full py-3 px-4 sm:py-4 sm:px-6 text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] rounded-md ${
                    pkg.popular
                      ? 'bg-[#C9A24A] text-[#0B1220] hover:bg-[#B8923D]'
                      : 'bg-[#0B1B2B] text-white hover:bg-[#1a2332]'
                  }`}
                >
                  {loading ? 'Processing...' : 'Book Now →'}
                </button>
              </div>
            ))}
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