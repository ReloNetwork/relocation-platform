'use client'

import React from 'react'
import Layout from '../../components/Layout'
import { FileText, Clock, Shield, AlertTriangle } from 'lucide-react'

export default function TermsPage() {
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#0B1B2B]/10 border border-[#0B1B2B]/20 rounded-full px-4 py-2 mb-6">
            <FileText className="h-4 w-4 text-[#0B1B2B] mr-2" />
            <span className="text-[#0B1B2B] text-sm font-medium">Legal Information</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Terms of Service
          </h1>
          <p className="text-xl text-[#6B7280]">
            Relo Network - Terms of Service for All Services
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] space-y-8">
          
          {/* General Service Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#C9A24A]" />
              Our Services
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Relo Network Services</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Executive Intake Service: Strategy calls and bespoke relocation planning</li>
                  <li>• Luxury Relocation Packages: Comprehensive end-to-end services</li>
                  <li>• AI-Powered Assistance: 24/7 Relo AI support and guidance</li>
                  <li>• Partner Network Access: Connections to vetted service providers</li>
                  <li>• Ongoing Concierge Support: Continuous assistance throughout your journey</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Commitment</h3>
                <p className="text-[#6B7280]">
                  Relo Network is committed to delivering exceptional relocation services with transparency, 
                  professionalism, and attention to detail. All services are provided according to the specific 
                  package terms agreed upon booking.
                </p>
              </div>
            </div>
          </section>

          {/* Refunds & Cancellations */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#C9A24A]" />
              Refunds & Cancellations
            </h2>
            
            <div className="space-y-6">
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Cancellation Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Up to 24 hours before your call</div>
                      <div className="text-[#6B7280] text-sm">Full refund available</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Within 24 hours of your call</div>
                      <div className="text-[#6B7280] text-sm">Payment converted to account credit (valid 12 months)</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-[#0B1B2B]">After your call has started</div>
                      <div className="text-[#6B7280] text-sm">Payments are non-refundable; unused value may be credited at our discretion</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Account Credit Terms</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Account credits are valid for 12 months from issue date</li>
                  <li>• Credits can be applied to any future Relo Network services</li>
                  <li>• Credits are non-transferable and cannot be exchanged for cash</li>
                  <li>• Unused credits expire after 12 months with no extensions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Commencement & Cooling-off Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-[#C9A24A]" />
              Service Commencement
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Important Notice</h3>
              <p className="text-[#6B7280] mb-4">
                By booking our Executive Intake Service, you expressly consent for us to begin services immediately 
                after payment confirmation. This includes:
              </p>
              <ul className="space-y-2 text-[#6B7280] mb-4">
                <li>• Scheduling your strategy call within 24 hours</li>
                <li>• Beginning preparation of your bespoke area shortlist</li>
                <li>• Initiating partner matching for your requirements</li>
              </ul>
              <p className="text-[#6B7280] text-sm">
                <strong>This immediate service commencement may affect your statutory cooling-off rights under 
                consumer protection regulations.</strong> By proceeding with payment, you acknowledge and agree to 
                this arrangement.
              </p>
            </div>
          </section>

          {/* Anti-abuse Measures */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">Fair Usage Policy</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Protection Measures</h3>
                <div className="bg-[#F8F9FA] rounded-lg p-6">
                  <ul className="space-y-3 text-[#6B7280]">
                    <li>• <strong>Refund Limit:</strong> Maximum of one full refund per customer per 12-month period</li>
                    <li>• <strong>Brief Requirement:</strong> Completed intake brief required before call scheduling</li>
                    <li>• <strong>Scheduling Policy:</strong> Reschedules within 24 hours of call time consume the slot (credit only)</li>
                    <li>• <strong>Payment Terms:</strong> Unpaid booking holds are automatically cancelled after 24 hours</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Integrity</h3>
                <p className="text-[#6B7280]">
                  These measures ensure fair access to our premium services for all clients and protect against 
                  abuse of our flexible booking and refund policies. Repeated refund requests or booking abuse 
                  may result in account restrictions.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-[#E5E7EB] pt-8">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">Questions?</h2>
            <div className="bg-[#C9A24A]/10 rounded-lg p-6">
              <p className="text-[#0B1B2B] mb-4">
                If you have questions about these terms or need assistance with your booking:
              </p>
              <div className="space-y-2 text-[#6B7280]">
                <div><strong>Phone:</strong> +44 20 7946 0958</div>
                <div><strong>Email:</strong> hello@therelonetwork.com</div>
                <div><strong>Hours:</strong> Monday-Friday 9:00-18:00, Saturday 10:00-16:00</div>
              </div>
            </div>
          </section>
          
          <div className="text-center pt-8 border-t border-[#E5E7EB]">
            <p className="text-[#6B7280] text-sm">
              Last updated: {new Date().toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="mt-4 text-[#6B7280]/60 text-sm">
              © 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}