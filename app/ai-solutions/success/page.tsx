'use client'

import React from 'react'
import Layout from '../../../components/Layout'
import { CheckCircle } from 'lucide-react'
import { Button } from '../../../ui/components/button'

export default function AISuccessPage() {
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220]" showFooter={false}>
      <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#C9A24A]" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Payment Successful!
          </h1>
          
          <p className="text-lg text-[#6B7280] mb-6">
            Thank you for choosing our AI voice assistant solution. Your payment has been processed successfully.
          </p>
          
          <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-[#0B1B2B] mb-4">What happens next?</h3>
            <ul className="text-sm text-[#6B7280] space-y-2 text-left">
              <li>• You'll receive a confirmation email with your invoice</li>
              <li>• Our implementation team will contact you within 24 hours</li>
              <li>• We'll schedule your onboarding call and system setup</li>
              <li>• Your AI assistant will be live within 2-4 weeks</li>
              <li>• Monthly billing will begin after your first month</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
            >
              Return to Homepage
            </Button>
            
            <p className="text-sm text-[#6B7280]">
              Questions? Contact our team at{' '}
              <a href="mailto:hello@therelonetwork.com" className="text-[#C9A24A] hover:underline">
                hello@therelonetwork.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}