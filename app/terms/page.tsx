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
            Executive Intake Service - Refunds, Cancellations & Service Terms
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] space-y-8">
          
          {/* Executive Intake Service Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#C9A24A]" />
              Executive Intake Service
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Includes</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• 60-minute strategy call (scheduled within 24 hours)</li>
                  <li>• Bespoke area shortlist based on your requirements</li>
                  <li>• 3 warm introductions to vetted partners</li>
                  <li>• 30-day execution window with concierge support</li>
                  <li>• Credit toward any future packages</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Guarantee</h3>
                <p className="text-[#6B7280]">
                  We guarantee 3 warm introductions within 7 days of your strategy call. If we fail to deliver, 
                  we will extend your concierge window free of charge.
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
                <div><strong>Email:</strong> support@relo-network.com</div>
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