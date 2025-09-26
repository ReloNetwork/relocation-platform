'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { Crown, CheckCircle, Calendar, Clock, Phone, Mail, ArrowRight, Star } from 'lucide-react'

export default function ExecutiveIntakeSuccessPage() {
  const [formData, setFormData] = useState<any>(null)
  const [calendarBooked, setCalendarBooked] = useState(false)

  useEffect(() => {
    // Retrieve form data from session storage
    const data = sessionStorage.getItem('executive_intake_data')
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  const handleCalendarBooking = () => {
    // In a real implementation, this would integrate with Calendly or similar
    setCalendarBooked(true)
    
    // Mark session as completed
    sessionStorage.setItem('executive_intake_completed', 'true')
    sessionStorage.removeItem('day_pass_credit_available')
  }

  const urgencyMessage = {
    'emergency': 'We\'ll call you within 2 hours to fast-track your move.',
    'urgent': 'Priority booking - call scheduled within 12 hours.',
    'normal': 'Call booked within 24 hours as promised.'
  }

  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Welcome to Executive Service
          </h1>
          <p className="text-xl text-[#6B7280] mb-4">
            Your intake has been received and payment confirmed.
          </p>
          {formData?.urgency && (
            <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-[#C9A24A] font-medium">
                {urgencyMessage[formData.urgency as keyof typeof urgencyMessage]}
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] mb-8">
          <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#C9A24A]" />
            Next Steps
          </h2>
          
          <div className="space-y-6">
            {/* Step 1: Calendar Booking */}
            <div className="flex items-start gap-4 p-4 bg-[#C9A24A]/5 rounded-lg border border-[#C9A24A]/20">
              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0B1B2B] mb-2">Book Your 60-Minute Strategy Call</h3>
                <p className="text-[#6B7280] mb-4">
                  Schedule your consultation within the next 24 hours. We'll review your brief beforehand and come prepared with initial recommendations.
                </p>
                {!calendarBooked ? (
                  <button
                    onClick={handleCalendarBooking}
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Strategy Call
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-[#059669]">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Call booked successfully!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Shortlist Preparation */}
            <div className="flex items-start gap-4 p-4 bg-[#F3F4F6] rounded-lg">
              <div className="w-8 h-8 bg-[#6B7280] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0B1B2B] mb-2">We Start Your Shortlist Today</h3>
                <p className="text-[#6B7280]">
                  Our team begins curating your bespoke area shortlist and partner recommendations based on your brief.
                </p>
                <div className="flex items-center gap-2 text-[#C9A24A] mt-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">In progress</span>
                </div>
              </div>
            </div>

            {/* Step 3: Warm Introductions */}
            <div className="flex items-start gap-4 p-4 bg-[#F3F4F6] rounded-lg">
              <div className="w-8 h-8 bg-[#6B7280] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0B1B2B] mb-2">3 Warm Introductions</h3>
                <p className="text-[#6B7280] mb-2">
                  Within 7 days, we'll connect you directly with 3 vetted partners who match your specific requirements.
                </p>
                <div className="text-sm text-[#C9A24A] font-medium">
                  ✓ Guaranteed within 7 days or we extend your concierge window free
                </div>
              </div>
            </div>

            {/* Step 4: 30-Day Execution */}
            <div className="flex items-start gap-4 p-4 bg-[#F3F4F6] rounded-lg">
              <div className="w-8 h-8 bg-[#6B7280] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0B1B2B] mb-2">30-Day Execution Window</h3>
                <p className="text-[#6B7280]">
                  Ongoing support and guidance throughout your relocation process, with priority access to our concierge team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Your Executive Team</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Priority Support</div>
                <div className="text-white/80 text-sm">+44 20 3974 1239</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Direct Line</div>
                <div className="text-white/80 text-sm">executive@therelonetwork.com</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/90 text-sm">
              <strong>Your case reference:</strong> EX-{Date.now().toString().slice(-6)}
              <br />
              Please reference this in all communications.
            </p>
          </div>
        </div>

        {/* What Our Clients Say */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
          <h3 className="text-xl font-bold text-[#0B1B2B] mb-6 text-center">Executive Service Reviews</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-[#C9A24A] pl-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
                ))}
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-2">
                "The strategy call alone was worth the fee. They found us the perfect Marylebone flat in 48 hours."
              </blockquote>
              <div className="text-xs text-[#6B7280]">— Alexandra T., Managing Director</div>
            </div>
            
            <div className="border-l-4 border-[#0B1B2B] pl-4">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
                ))}
              </div>
              <blockquote className="text-[#0B1B2B] italic mb-2">
                "White-glove service exceeded all expectations. Made our Singapore to London move seamless."
              </blockquote>
              <div className="text-xs text-[#6B7280]">— Marcus W., Senior Partner</div>
            </div>
          </div>
        </div>

        {/* Continue Browsing CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.href = '/directory'}
            className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition-all"
          >
            Explore Our Directory
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  )
}