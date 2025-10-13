'use client'

import { Suspense } from 'react'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, MapPin, Users, TrendingUp, Phone, Mail } from 'lucide-react'
import Layout from '../../../components/Layout'

function PartnerWelcomePageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const applicationId = searchParams?.get('application_id')

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#16A34A] rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Welcome to The Relo Network!
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Your founding partner application has been submitted and payment confirmed. You're now part of an exclusive network of premium relocation professionals.
            </p>
          </div>

          {/* Payment Confirmation */}
          <div className="bg-gradient-to-r from-[#16A34A]/10 to-[#15803D]/10 border border-[#16A34A]/20 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-4">
                Payment Confirmed
              </h2>
              <p className="text-[#6B7280] mb-4">
                Your founding partner fee of £497 has been processed successfully.
              </p>
              {sessionId && (
                <p className="text-sm text-[#6B7280]">
                  Payment Reference: {sessionId}
                </p>
              )}
              {applicationId && (
                <p className="text-sm text-[#6B7280]">
                  Application ID: {applicationId}
                </p>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1220] mb-8 text-center">
              What Happens Next
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Application Review (24 hours)</h3>
                  <p className="text-[#6B7280]">Our partnerships team will review your application and verify your credentials and territory availability.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Onboarding Call (48 hours)</h3>
                  <p className="text-[#6B7280]">We'll schedule your onboarding call to discuss lead distribution, commission structure, and territory exclusivity.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Platform Access (72 hours)</h3>
                  <p className="text-[#6B7280]">You'll receive access to our partner portal, marketing materials, and lead management system.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">First Leads (1 week)</h3>
                  <p className="text-[#6B7280]">Start receiving qualified leads from corporate clients with budgets £15k-£50k+ per relocation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Founding Partner Benefits Reminder */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Your Founding Partner Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Exclusive Territory</h3>
                <p className="text-[#6B7280]">Protected territory rights with no competition from other network partners</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">50% Commission Rate</h3>
                <p className="text-[#6B7280]">Locked-in founding partner commission rates for the lifetime of your partnership</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Premium Leads</h3>
                <p className="text-[#6B7280]">Pre-qualified corporate clients with substantial relocation budgets</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Phone className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Partner Support</h3>
              <p className="text-[#6B7280] mb-2">Questions about your application or need immediate assistance?</p>
              <p className="font-semibold text-[#0B1220]">+44 20 3105 9566</p>
              <p className="text-sm text-[#6B7280]">Mon-Fri: 9AM-6PM GMT</p>
            </div>
            
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Mail className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Email Support</h3>
              <p className="text-[#6B7280] mb-2">For detailed inquiries or documentation requests:</p>
              <p className="font-semibold text-[#0B1220]">partnerships@therelonetwork.com</p>
              <p className="text-sm text-[#6B7280]">Response within 4 hours</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
export default function PartnerWelcomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartnerWelcomePageContent />
    </Suspense>
  )
}
