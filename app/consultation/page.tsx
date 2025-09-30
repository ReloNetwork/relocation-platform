'use client'

import { useState } from 'react'
import { Calendar, MapPin, Home, Users, Building2, Phone, Mail } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

interface ConsultationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  timeline: string
  propertyBudget: string
  propertyType: string
  neighborhoods: string
  familySituation: string
  employer: string
  isEmployerPaying: string
  currentLocation: string
  specificRequirements: string
  hearAboutUs: string
}

export default function PremiumConsultationPage() {
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeline: '',
    propertyBudget: '',
    propertyType: '',
    neighborhoods: '',
    familySituation: '',
    employer: '',
    isEmployerPaying: '',
    currentLocation: '',
    specificRequirements: '',
    hearAboutUs: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/consultations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Consultation request submitted! We will contact you within 2 hours to schedule your premium consultation.')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          timeline: '',
          propertyBudget: '',
          propertyType: '',
          neighborhoods: '',
          familySituation: '',
          employer: '',
          isEmployerPaying: '',
          currentLocation: '',
          specificRequirements: '',
          hearAboutUs: ''
        })
      } else {
        throw new Error('Failed to submit consultation request')
      }
    } catch (error) {
      console.error('Error submitting consultation:', error)
      alert('Error submitting consultation request. Please try again or call +44 20 3974 1239')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-6 py-3 mb-6">
              <Calendar className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Premium Consultation</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Start Your Premium Relocation
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Book a complimentary consultation with our relocation specialists. We'll create a custom plan tailored to your exact needs and preferences.
            </p>
          </div>

          {/* Consultation Benefits */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Your Premium Consultation Includes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Home className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Property Matching</h3>
                <p className="text-[#6B7280]">Curated property shortlist based on your exact requirements and lifestyle</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Area Expertise</h3>
                <p className="text-[#6B7280]">Detailed neighborhood insights and recommendations from local specialists</p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Custom Timeline</h3>
                <p className="text-[#6B7280]">Personalized relocation plan with clear milestones and deadlines</p>
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB]">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Relocation Timeline */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Relocation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Relocation Timeline *</option>
                      <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                      <option value="Urgent (1 month)">Urgent (1 month)</option>
                      <option value="Standard (2-3 months)">Standard (2-3 months)</option>
                      <option value="Flexible (3+ months)">Flexible (3+ months)</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Current Location *"
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Property Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={formData.propertyBudget}
                      onChange={(e) => setFormData({ ...formData, propertyBudget: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Monthly Property Budget *</option>
                      <option value="£2,000 - £3,000">£2,000 - £3,000</option>
                      <option value="£3,000 - £5,000">£3,000 - £5,000</option>
                      <option value="£5,000 - £8,000">£5,000 - £8,000</option>
                      <option value="£8,000 - £12,000">£8,000 - £12,000</option>
                      <option value="£12,000 - £20,000">£12,000 - £20,000</option>
                      <option value="£20,000+">£20,000+</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Property Type *</option>
                      <option value="1-2 bedroom apartment">1-2 bedroom apartment</option>
                      <option value="2-3 bedroom apartment">2-3 bedroom apartment</option>
                      <option value="3-4 bedroom house">3-4 bedroom house</option>
                      <option value="4+ bedroom house">4+ bedroom house</option>
                      <option value="Penthouse/Luxury">Penthouse/Luxury</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    rows={3}
                    placeholder="Preferred neighborhoods or areas (e.g., Kensington, Canary Wharf, etc.) *"
                    value={formData.neighborhoods}
                    onChange={(e) => setFormData({ ...formData, neighborhoods: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Family & Employment */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Family & Employment</h3>
                <div className="space-y-4">
                  <div>
                    <select
                      value={formData.familySituation}
                      onChange={(e) => setFormData({ ...formData, familySituation: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Family Situation *</option>
                      <option value="Single professional">Single professional</option>
                      <option value="Couple (no children)">Couple (no children)</option>
                      <option value="Family with young children (0-10)">Family with young children (0-10)</option>
                      <option value="Family with teenagers (11-18)">Family with teenagers (11-18)</option>
                      <option value="Mixed age children">Mixed age children</option>
                      <option value="Multi-generational">Multi-generational</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Employer/Company (if corporate relocation)"
                        value={formData.employer}
                        onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.isEmployerPaying}
                        onChange={(e) => setFormData({ ...formData, isEmployerPaying: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Who is paying for relocation? *</option>
                        <option value="Employer/Company">Employer/Company</option>
                        <option value="Personal/Self-funded">Personal/Self-funded</option>
                        <option value="Shared arrangement">Shared arrangement</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Specific requirements, concerns, or questions about your relocation *"
                      value={formData.specificRequirements}
                      onChange={(e) => setFormData({ ...formData, specificRequirements: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={formData.hearAboutUs}
                      onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">How did you hear about us? *</option>
                      <option value="Google search">Google search</option>
                      <option value="Referral from colleague">Referral from colleague</option>
                      <option value="Company HR department">Company HR department</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Industry publication">Industry publication</option>
                      <option value="Word of mouth">Word of mouth</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Start Your Premium Consultation</h4>
                  <p className="text-[#6B7280]">Complimentary consultation • 2-hour response guarantee • No obligation</p>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-md font-semibold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {loading ? 'Processing...' : 'Start Consultation'}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-[#6B7280]">
                Prefer to speak immediately? Call: <span className="font-semibold text-[#0B1220]">+44 20 3974 1239</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}