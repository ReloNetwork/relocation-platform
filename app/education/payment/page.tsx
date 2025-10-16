'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '../../../components/Layout'
import { Star, Users, Calendar, Award, Download, Phone, Check, ArrowLeft } from 'lucide-react'
import { Button } from '../../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/components/card'
import { Badge } from '../../../ui/components/badge'

const TIER_DETAILS = {
  family: {
    name: 'Premium Family Access',
    subtitle: 'Relo Network Schools Concierge Access',
    price: 399,
    originalPrice: 499,
    urgencyText: 'Bundle with Executive Intake: £299',
    description: 'Interactive directory access with AI-powered school matching',
    features: [
      'Interactive directory access (web portal)',
      'AI-powered school matching based on location/preferences',
      'Direct contact details for 3 recommended schools',
      '30-day access + 1 concierge consultation call',
      'Downloadable comparison reports',
      'Elite prep and public schools database',
      'Dedicated family support'
    ],
    stripeLink: 'https://buy.stripe.com/test_family_link',
    targetAudience: 'Relocating executives and families'
  },
  campaign: {
    name: 'Agency Campaign License',
    subtitle: 'Schools Marketing Campaign Dataset',
    price: 2250,
    bulkPrice: '3 campaigns for £5,500',
    description: 'Single-use campaign data extract for marketing agencies',
    features: [
      'Single-use campaign data extract',
      'Segmented by region or school type',
      '90-day access window',
      'Email/direct mail formatted data',
      'GDPR compliance documentation',
      '200+ elite schools included',
      'Marketing-ready contact formats',
      'Technical integration support'
    ],
    stripeLink: 'https://buy.stripe.com/test_campaign_link',
    targetAudience: 'Marketing agencies and service providers',
    popular: true
  },
  professional: {
    name: 'Premium Data License',
    subtitle: 'UK Elite Schools Directory 2026 - Professional License',
    price: 6500,
    urgencyPrice: 4995,
    urgencyText: '48-Hour Price: £4,995 (if committed by Friday)',
    description: 'Complete database with commercial use rights for professionals',
    features: [
      'Complete database: 200+ top prep/public schools',
      'School names, addresses, postcodes, websites',
      'Structured data (CSV/Excel + API access)',
      '6-month update guarantee',
      'Non-exclusive commercial use rights',
      'Technical integration support',
      'Head teacher information',
      'Fee structures and contact details'
    ],
    stripeLink: 'https://buy.stripe.com/test_professional_link',
    targetAudience: 'Education consultancies and relocation companies'
  },
  founding: {
    name: 'Founding Partner Bundle',
    subtitle: 'Education Category Founding Partner + Schools Intelligence',
    price: 24500,
    originalPrice: 27000,
    urgencyText: 'Launch week only - expires Friday midnight',
    description: 'Category-exclusive partnership with complete schools intelligence',
    features: [
      'Category-exclusive Founding Partner status',
      'Unlimited access to UK Elite Schools Directory 2026',
      'Quarterly updates for 12 months',
      'Co-branded integration on Relo Network education pages',
      'Warm introductions to all Relo Network clients requiring school placement',
      'Featured editorial in Relo Network News (2,500+ subscribers)',
      'Direct access to relocating executive families',
      'Partnership marketing opportunities',
      'Priority placement in directory results'
    ],
    stripeLink: 'https://buy.stripe.com/test_founding_link',
    targetAudience: 'Leading education consultancies',
    exclusive: true
  }
}

function PaymentPageContent() {
  const searchParams = useSearchParams()
  const [selectedTier, setSelectedTier] = useState('campaign')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const tier = searchParams.get('tier')
    if (tier && TIER_DETAILS[tier as keyof typeof TIER_DETAILS]) {
      setSelectedTier(tier)
    }
  }, [searchParams])

  const currentTier = TIER_DETAILS[selectedTier as keyof typeof TIER_DETAILS]

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/education/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: selectedTier,
          priceId: currentTier.stripeLink, // This would be the actual Stripe price ID
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('There was an error processing your payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Database
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              UK Elite Schools Directory 2026
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Professional-grade schools intelligence for education consultancies, relocation services, and discerning families. 
              Choose your access level based on your requirements.
            </p>
          </div>

          {/* Tier Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {Object.entries(TIER_DETAILS).map(([key, tier]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all relative ${
                  selectedTier === key 
                    ? 'border-2 border-[#C9A24A] shadow-lg' 
                    : 'border border-[#E5E7EB] hover:border-[#C9A24A]'
                }`}
                onClick={() => setSelectedTier(key)}
              >
                <CardHeader className="text-center pb-2">
                  {tier.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#C9A24A]">
                      Most Popular
                    </Badge>
                  )}
                  {tier.exclusive && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                      Exclusive
                    </Badge>
                  )}
                  <CardTitle className="text-lg font-bold text-[#0B1B2B] mb-1">{tier.name}</CardTitle>
                  {tier.subtitle && (
                    <p className="text-xs text-[#6B7280] mb-2">{tier.subtitle}</p>
                  )}
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-[#C9A24A]">£{tier.price.toLocaleString()}</div>
                    {tier.originalPrice && (
                      <div className="text-sm text-[#6B7280] line-through">£{tier.originalPrice.toLocaleString()}</div>
                    )}
                    {tier.urgencyPrice && (
                      <div className="text-lg font-semibold text-green-600">£{tier.urgencyPrice.toLocaleString()}</div>
                    )}
                    {tier.bulkPrice && (
                      <div className="text-sm text-[#6B7280] mt-1">{tier.bulkPrice}</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#6B7280] text-center mb-2">{tier.description}</p>
                  {tier.targetAudience && (
                    <p className="text-xs text-[#C9A24A] text-center font-medium">{tier.targetAudience}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Plan Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Plan Features */}
            <Card className="border-2 border-[#C9A24A]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#0B1B2B] flex items-center gap-2">
                  {currentTier.name}
                  {currentTier.popular && (
                    <Badge className="bg-[#C9A24A] text-white">Popular</Badge>
                  )}
                  {currentTier.exclusive && (
                    <Badge className="bg-purple-600 text-white">Exclusive</Badge>
                  )}
                </CardTitle>
                {currentTier.subtitle && (
                  <p className="text-lg font-semibold text-[#C9A24A] mb-2">{currentTier.subtitle}</p>
                )}
                <CardDescription className="text-lg">{currentTier.description}</CardDescription>
                {currentTier.targetAudience && (
                  <p className="text-md text-[#6B7280] font-medium mt-2">Target: {currentTier.targetAudience}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentTier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#C9A24A] flex-shrink-0" />
                      <span className="text-[#0B1B2B]">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0B1B2B]">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentTier.urgencyText && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">{currentTier.urgencyText}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-4 border-b border-[#E5E7EB]">
                  <span className="text-[#6B7280]">{currentTier.name}</span>
                  <div className="text-right">
                    {currentTier.originalPrice && (
                      <div className="text-sm text-[#6B7280] line-through">£{currentTier.originalPrice.toLocaleString()}</div>
                    )}
                    <span className="font-semibold text-[#0B1B2B]">
                      £{(currentTier.urgencyPrice || currentTier.price).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {currentTier.bulkPrice && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Volume Discount: {currentTier.bulkPrice}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-[#0B1B2B]">Total</span>
                  <span className="text-2xl font-bold text-[#C9A24A]">
                    £{(currentTier.urgencyPrice || currentTier.price).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Email confirmation with login details</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 text-lg font-semibold"
                >
                  {isLoading ? 'Processing...' : `Pay £${(currentTier.urgencyPrice || currentTier.price).toLocaleString()} - Get Access`}
                </Button>

                <p className="text-xs text-[#6B7280] text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy. 
                  Payment is processed securely through Stripe.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB]">
              <h3 className="font-semibold text-[#0B1B2B] mb-2">Secure Payment</h3>
              <p className="text-[#6B7280] text-sm">
                Your payment is processed securely through Stripe. We never store your payment information. 
                You'll receive instant access to the database and login credentials via email after successful payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}