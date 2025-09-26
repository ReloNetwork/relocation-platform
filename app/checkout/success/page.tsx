'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { CheckCircle, ArrowRight, Crown, Award } from 'lucide-react'
import { Button } from '@/ui/components/button'

export default function CheckoutSuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setSessionId(urlParams.get('session_id'))
    setPlan(urlParams.get('plan'))
  }, [])

  const getPlanDetails = (planType: string | null) => {
    switch (planType) {
      case 'founding_partner':
        return {
          name: 'Founding Partner Charter',
          amount: '£25,000',
          duration: '12 months',
          benefits: [
            'Category exclusivity in your sector',
            'Homepage placement & concierge routing',
            'Professional network access',
            '90-day opportunity guarantee'
          ]
        }
      case 'premium_sponsor':
        return {
          name: 'Premium Sponsor',
          amount: '£5,000',
          duration: '90 days',
          benefits: [
            'Featured placement on homepage',
            'Priority lead routing',
            'Professional directory listing',
            'Quarterly performance review'
          ]
        }
      case 'executive_intake':
        return {
          name: 'Executive Intake',
          amount: '£1,500',
          duration: '30 days',
          benefits: [
            '60-minute strategy call',
            'Bespoke service provider shortlist',
            '3 warm introductions',
            '30-day execution window'
          ]
        }
      case 'plus':
        return {
          name: 'Plus Directory Access',
          amount: '£29/month',
          duration: 'Monthly',
          benefits: [
            'Full filters & contact details',
            '3 curated introductions per month',
            'Templates bundle access',
            'Email support'
          ]
        }
      case 'pro':
        return {
          name: 'Pro Directory Access',
          amount: '£99/month',
          duration: 'Monthly',
          benefits: [
            'Unlimited curated introductions',
            '48-hour area shortlist delivery',
            'WhatsApp line (UK hours)',
            'Document pre-check service'
          ]
        }
      default:
        return {
          name: 'Service Package',
          amount: 'Confirmed',
          duration: '',
          benefits: ['Premium access to Relo Network services']
        }
    }
  }

  const planDetails = getPlanDetails(plan)

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Payment Successful!
            </h1>
            <p className="text-xl text-[#6B7280]">
              Welcome to Relo Network. Your {planDetails.name} has been confirmed.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#0B1B2B]/10 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
                {plan === 'founding_partner' ? (
                  <Crown className="w-8 h-8 text-[#C9A24A]" />
                ) : (
                  <Award className="w-8 h-8 text-[#C9A24A]" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0B1B2B]">{planDetails.name}</h2>
                <p className="text-lg text-[#C9A24A] font-semibold">{planDetails.amount} • {planDetails.duration}</p>
              </div>
            </div>

            <div className="bg-[#FAFAF9] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Your Benefits Include:</h3>
              <ul className="space-y-3">
                {planDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-[#0B1B2B]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sessionId && (
              <div className="bg-[#F8F9FA] rounded-lg p-4 mb-6">
                <p className="text-sm text-[#6B7280] mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-[#0B1B2B] break-all">{sessionId}</p>
              </div>
            )}
          </div>

          <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">What Happens Next?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Email Confirmation</h4>
                <p className="text-sm text-[#6B7280]">Check your inbox for detailed service information and next steps</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Team Contact</h4>
                <p className="text-sm text-[#6B7280]">Our team will contact you within 24 hours to begin onboarding</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Service Delivery</h4>
                <p className="text-sm text-[#6B7280]">Access your services and begin your London relocation journey</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = '/directory'}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold"
              >
                Explore Directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-8 py-3 rounded-lg font-semibold"
              >
                Return Home
              </Button>
            </div>
            
            <p className="text-sm text-[#6B7280] mt-6">
              Questions? Contact our support team at{' '}
              <a href="mailto:support@therelonetwork.com" className="text-[#C9A24A] hover:underline">
                support@therelonetwork.com
              </a>
              {' '}or call{' '}
              <a href="tel:+442079460960" className="text-[#C9A24A] hover:underline">
                +44 20 7946 0960
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}