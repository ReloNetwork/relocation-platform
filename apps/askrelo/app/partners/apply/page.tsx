'use client'

import { useState } from 'react'
import { Building2, MapPin, Phone, Mail, Users, TrendingUp, CreditCard } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

interface PartnerFormData {
  companyName: string
  serviceType: string
  contactName: string
  contactTitle: string
  phone: string
  email: string
  website: string
  territory: string
  monthlyLeads: string
  marketingSpend: string
  experience: string
  specializations: string
  whyPartner: string
}

export default function PartnerApplicationPage() {
  const [formData, setFormData] = useState<PartnerFormData>({
    companyName: '',
    serviceType: '',
    contactName: '',
    contactTitle: '',
    phone: '',
    email: '',
    website: '',
    territory: '',
    monthlyLeads: '',
    marketingSpend: '',
    experience: '',
    specializations: '',
    whyPartner: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/partner-applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Redirect to Stripe for founding partner rate payment
        const result = await response.json()
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl
        } else {
          alert('Application submitted! We will contact you within 24 hours about your founding partner rate.')
        }
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again or call +44 20 7946 0958')
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
              <Building2 className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Partner Application</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Join The Relo Network
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Become a founding partner and secure exclusive territory access with preferred rates for our premium executive relocation network.
            </p>
          </div>

          {/* Founding Partner Benefits */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Founding Partner Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Exclusive Territory</h3>
                <p className="text-[#6B7280]">Protected territory rights with no competition from other network partners</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Qualified Leads</h3>
                <p className="text-[#6B7280]">Pre-qualified corporate clients with budgets £15k-£50k+ per relocation</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Founding Rates</h3>
                <p className="text-[#6B7280]">Lock in 50% commission rates available only to founding partners</p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB]">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Company Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Service Type/Category *</option>
                      <option value="Property Search & Rental">Property Search & Rental</option>
                      <option value="Relocation Services">Relocation Services</option>
                      <option value="Immigration & Visa">Immigration & Visa Services</option>
                      <option value="School Search & Placement">School Search & Placement</option>
                      <option value="Settling Services">Settling Services</option>
                      <option value="Home Finding">Home Finding</option>
                      <option value="Corporate Services">Corporate Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="url"
                    placeholder="Company Website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Contact Name *"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Title/Position *"
                      value={formData.contactTitle}
                      onChange={(e) => setFormData({ ...formData, contactTitle: e.target.value })}
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

              {/* Territory & Business */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Territory & Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={formData.territory}
                      onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Preferred Territory *</option>
                      <option value="Central London">Central London</option>
                      <option value="North London">North London</option>
                      <option value="South London">South London</option>
                      <option value="East London">East London</option>
                      <option value="West London">West London</option>
                      <option value="Greater London">Greater London</option>
                      <option value="Home Counties">Home Counties</option>
                      <option value="Birmingham">Birmingham</option>
                      <option value="Manchester">Manchester</option>
                      <option value="Edinburgh">Edinburgh</option>
                      <option value="Other UK City">Other UK City</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.monthlyLeads}
                      onChange={(e) => setFormData({ ...formData, monthlyLeads: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Monthly Leads Needed *</option>
                      <option value="1-5 leads">1-5 leads per month</option>
                      <option value="5-10 leads">5-10 leads per month</option>
                      <option value="10-20 leads">10-20 leads per month</option>
                      <option value="20+ leads">20+ leads per month</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <select
                    value={formData.marketingSpend}
                    onChange={(e) => setFormData({ ...formData, marketingSpend: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  >
                    <option value="">Current Monthly Marketing Spend *</option>
                    <option value="£0-£500">£0 - £500</option>
                    <option value="£500-£1,000">£500 - £1,000</option>
                    <option value="£1,000-£2,500">£1,000 - £2,500</option>
                    <option value="£2,500-£5,000">£2,500 - £5,000</option>
                    <option value="£5,000+">£5,000+</option>
                  </select>
                </div>
              </div>

              {/* Experience & Specializations */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Experience & Specializations</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Years of experience and relevant background *"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Specializations and unique value proposition *"
                      value={formData.specializations}
                      onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Why do you want to join The Relo Network? *"
                      value={formData.whyPartner}
                      onChange={(e) => setFormData({ ...formData, whyPartner: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Secure Your Founding Partner Rate</h4>
                  <p className="text-[#6B7280]">One-time partner onboarding fee: <span className="font-semibold">£497</span> (normally £997)</p>
                  <p className="text-sm text-[#C9A24A] font-medium">Founding partner rate available for limited time</p>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-md font-semibold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {loading ? 'Processing...' : 'Secure Founding Rate & Apply'}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-[#6B7280]">
                Questions? Call our partner team: <span className="font-semibold text-[#0B1220]">+44 20 7946 0958</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}