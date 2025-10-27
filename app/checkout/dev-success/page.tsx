'use client'

import React from 'react'
import Layout from '../../../components/Layout'
import { CheckCircle, Calendar, Phone, Mail } from 'lucide-react'

export default function DevSuccessPage() {
  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-700 text-sm font-medium">Development Mode</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Payment Simulation Complete
          </h1>
          <p className="text-xl text-[#6B7280]">
            Your 72-Hour Setup Audit has been simulated successfully
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] space-y-8">
          
          {/* Development Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-amber-800 mb-3">Development Mode Active</h2>
            <p className="text-amber-700 mb-4">
              This is a simulated payment confirmation. In production, this would be a real Stripe checkout.
              To enable real payments, configure a valid Stripe secret key in your environment variables.
            </p>
            <div className="text-sm text-amber-600">
              <div>Current Stripe Key Status: Placeholder/Development</div>
              <div>Environment: {process.env.NODE_ENV}</div>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#C9A24A]" />
              What Happens Next
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Immediate Confirmation</h3>
                  <p className="text-[#6B7280]">You'll receive an email confirmation within 5 minutes with your audit brief and next steps.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Analysis Begins</h3>
                  <p className="text-[#6B7280]">Our team starts your area analysis immediately using 150+ data points across London.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Strategy Call Scheduled</h3>
                  <p className="text-[#6B7280]">Within 24 hours, we'll send you a calendar link to book your 60-minute strategy call.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Report Delivery</h3>
                  <p className="text-[#6B7280]">Your comprehensive written report with property shortlist and viewing route delivered within 72 hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#C9A24A]/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#C9A24A]" />
              Need Immediate Assistance?
            </h3>
            <div className="space-y-2 text-[#6B7280]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A24A]" />
                <span><strong>Phone:</strong> +44 20 3105 9566</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A24A]" />
                <span><strong>Email:</strong> hello@therelonetwork.com</span>
              </div>
              <div><strong>Hours:</strong> Monday-Friday 8:00-20:00</div>
            </div>
          </div>

          {/* Return to Site */}
          <div className="text-center pt-6">
            <a
              href="/"
              className="inline-flex items-center bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}