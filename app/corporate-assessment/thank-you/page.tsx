'use client'

import React from 'react'
import Layout from '../../../components/Layout'
import { CheckCircle, Calendar, Phone, Mail, Clock, Users, Award, Globe } from 'lucide-react'

export default function CorporateAssessmentThankYouPage() {
  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-700 text-sm font-medium">Assessment Complete</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Thank You for Your Assessment
          </h1>
          <p className="text-xl text-[#6B7280]">
            Your corporate relocation requirements have been submitted successfully
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] space-y-8">
          
          {/* Confirmation Message */}
          <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-3">Assessment Received</h2>
            <p className="text-[#6B7280] mb-4">
              Thank you for taking the time to complete our 15-minute Corporate Relocation Assessment. 
              Our team is already reviewing your requirements to prepare a customized solution.
            </p>
            <div className="text-sm text-[#6B7280]">
              <div>Reference ID: CA-{Date.now().toString().slice(-8)}</div>
              <div>Submitted: {new Date().toLocaleDateString('en-GB', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
          </div>

          {/* Next Steps Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#C9A24A]" />
              Your Next Steps
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Immediate Review (Within 2 Hours)</h3>
                  <p className="text-[#6B7280] mb-2">Our corporate relocation specialists are reviewing your assessment to understand your specific requirements and challenges.</p>
                  <div className="text-sm text-[#C9A24A] font-medium">✓ In Progress</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center text-[#6B7280] text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Strategy Consultation (Within 24 Hours)</h3>
                  <p className="text-[#6B7280] mb-2">We'll schedule a 30-minute consultation call to discuss your needs in detail and answer any questions.</p>
                  <div className="text-sm text-[#6B7280]">Our team will contact you to schedule this call</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center text-[#6B7280] text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">Custom Proposal (Within 48 Hours)</h3>
                  <p className="text-[#6B7280] mb-2">You'll receive a detailed proposal with our recommended relocation program, timeline, and transparent pricing.</p>
                  <div className="text-sm text-[#6B7280]">Delivered via email with follow-up call</div>
                </div>
              </div>
            </div>
          </div>

          {/* What We're Preparing */}
          <div className="bg-[#F8F9FA] rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#0B1B2B] mb-4">What We're Preparing for You</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1B2B]">Dedicated Account Team</div>
                  <div className="text-sm text-[#6B7280]">Assigned specialists for your program</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1B2B]">Service Level Agreements</div>
                  <div className="text-sm text-[#6B7280]">Guaranteed delivery milestones</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1B2B]">Comprehensive Service Scope</div>
                  <div className="text-sm text-[#6B7280]">End-to-end relocation solution</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1B2B]">Transparent Timeline</div>
                  <div className="text-sm text-[#6B7280]">Clear project milestones and dates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Success Stats */}
          <div className="bg-[#0B1B2B] rounded-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-6 text-center">Why Companies Trust Relo Network</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">96%</div>
                <div className="text-sm text-white/80">Client satisfaction rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">7-30</div>
                <div className="text-sm text-white/80">Days average completion</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">100s</div>
                <div className="text-sm text-white/80">Successful relocations</div>
              </div>
            </div>
          </div>

          {/* Immediate Contact */}
          <div className="bg-[#C9A24A]/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#C9A24A]" />
              Need Immediate Assistance?
            </h3>
            <p className="text-[#6B7280] mb-4">
              If you have urgent requirements or questions, don't wait for our scheduled follow-up:
            </p>
            <div className="space-y-2 text-[#6B7280]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A24A]" />
                <span><strong>Direct Line:</strong> +44 20 3105 9566</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A24A]" />
                <span><strong>Email:</strong> hello@therelonetwork.com</span>
              </div>
              <div><strong>Hours:</strong> Monday-Friday 8:00-20:00 GMT</div>
            </div>
          </div>

          {/* Return to Site */}
          <div className="text-center pt-6">
            <div className="space-y-4">
              <a
                href="/"
                className="inline-flex items-center bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Return to Homepage
              </a>
              <a
                href="/corporate"
                className="inline-flex items-center bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#6B7280] px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More About Corporate Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}