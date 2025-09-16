'use client'

import { useState } from 'react'
import { Building2, MapPin, Award, Shield, Star, CheckCircle, Upload, Phone, Mail } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

interface PartnerOnboardingFormData {
  // Basic Information
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  website: string
  businessDescription: string
  foundedYear: number
  companySize: string
  
  // Location and Coverage
  primaryLocation: string
  serviceAreas: string[]
  coverageZones: string[]
  postcodeCoverage: string[]
  
  // Business Classification
  industryCategory: string
  serviceCategories: string[]
  specializations: string[]
  businessType: string
  
  // Professional Verification
  insuranceCoverage: any
  certifications: string[]
  regulatoryBodies: string[]
  vatNumber: string
  companyRegistration: string
  
  // Pricing and Capacity
  pricingTier: string
  minimumProjectValue: number
  maximumProjectValue: number
  monthlyCapacity: number
  currentAvailability: string
}

export default function PartnerOnboardingPage() {
  const [formData, setFormData] = useState<PartnerOnboardingFormData>({
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    businessDescription: '',
    foundedYear: new Date().getFullYear(),
    companySize: '',
    primaryLocation: '',
    serviceAreas: [],
    coverageZones: [],
    postcodeCoverage: [],
    industryCategory: '',
    serviceCategories: [],
    specializations: [],
    businessType: '',
    insuranceCoverage: null,
    certifications: [],
    regulatoryBodies: [],
    vatNumber: '',
    companyRegistration: '',
    pricingTier: '',
    minimumProjectValue: 0,
    maximumProjectValue: 0,
    monthlyCapacity: 0,
    currentAvailability: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/partners/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        window.location.href = `/partners/onboard/success?partnerId=${result.partnerId}&status=${result.approvalStatus}&score=${result.qualityScore}`
      } else {
        throw new Error('Failed to submit onboarding')
      }
    } catch (error) {
      console.error('Error submitting onboarding:', error)
      alert('Error submitting application. Please try again or call +44 20 7946 0958')
    } finally {
      setLoading(false)
    }
  }

  const handleServiceAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter(a => a !== area)
        : [...prev.serviceAreas, area]
    }))
  }

  const handleSpecializationToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }))
  }

  const serviceAreaOptions = [
    'Central London (Zone 1)', 'Mayfair & Belgravia', 'Kensington & Chelsea',
    'Canary Wharf', 'City of London', 'Marylebone & Fitzrovia',
    'South Kensington', 'Notting Hill', 'Hampstead & Camden',
    'Greenwich & Docklands', 'Richmond & Barnes', 'Wimbledon & Putney',
    'Clapham & Battersea', 'Islington & Kings Cross', 'Shoreditch & Hackney'
  ]

  const industryCategories = [
    'Property Search & Rental', 'Luxury Moving Services', 'Legal & Immigration',
    'Financial Services', 'Education & Schools', 'Healthcare & Medical',
    'Transportation Services', 'Home Services & Utilities', 'Lifestyle & Concierge',
    'Pet Relocation'
  ]

  const specializationOptions = [
    'Executive Relocation', 'Corporate Housing', 'International Moves',
    'Luxury Properties', 'School Placement', 'Visa Services',
    'Financial Planning', 'Tax Advisory', 'Insurance Services',
    'Concierge Services', 'Personal Shopping', 'Pet Care',
    'Transportation', 'Home Setup', 'Cultural Integration'
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-6 py-3 mb-6">
              <Building2 className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Partner Onboarding</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Join Our Premium Partner Network
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Connect with London's most discerning clientele. Our automated system will categorize your services and assign appropriate access levels.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNum ? 'bg-[#C9A24A] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-12 h-0.5 ${step > stepNum ? 'bg-[#C9A24A]' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-sm text-[#6B7280]">
              Step {step} of 4: {
                step === 1 ? 'Company Information' :
                step === 2 ? 'Service Details' :
                step === 3 ? 'Professional Verification' :
                'Pricing & Capacity'
              }
            </div>
          </div>

          {/* Onboarding Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB]">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Company Information */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1220] mb-6">Company Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                      <input
                        type="text"
                        placeholder="Contact Name *"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Contact Email *"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Contact Phone *"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        placeholder="Company Website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Business Type *</option>
                        <option value="sole_trader">Sole Trader</option>
                        <option value="ltd_company">Limited Company</option>
                        <option value="plc">Public Limited Company</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Company Size *</option>
                        <option value="1-5 employees">1-5 employees</option>
                        <option value="6-20 employees">6-20 employees</option>
                        <option value="21-50 employees">21-50 employees</option>
                        <option value="51-200 employees">51-200 employees</option>
                        <option value="200+ employees">200+ employees</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Founded Year"
                        value={formData.foundedYear}
                        onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <textarea
                      rows={4}
                      placeholder="Business Description *"
                      value={formData.businessDescription}
                      onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Service Details */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1220] mb-6">Service Details & Coverage</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <select
                        value={formData.industryCategory}
                        onChange={(e) => setFormData({ ...formData, industryCategory: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Primary Industry Category *</option>
                        {industryCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Primary Location *"
                        value={formData.primaryLocation}
                        onChange={(e) => setFormData({ ...formData, primaryLocation: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#0B1220] mb-3">Service Areas (Select all that apply)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {serviceAreaOptions.map((area) => (
                        <label key={area} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.serviceAreas.includes(area)}
                            onChange={() => handleServiceAreaToggle(area)}
                            className="w-4 h-4 text-[#C9A24A] border-[#E5E7EB] rounded focus:ring-[#C9A24A]"
                          />
                          <span className="text-sm text-[#6B7280]">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#0B1220] mb-3">Specializations (Select all that apply)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specializationOptions.map((spec) => (
                        <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.specializations.includes(spec)}
                            onChange={() => handleSpecializationToggle(spec)}
                            className="w-4 h-4 text-[#C9A24A] border-[#E5E7EB] rounded focus:ring-[#C9A24A]"
                          />
                          <span className="text-sm text-[#6B7280]">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Verification */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1220] mb-6">Professional Verification</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Company Registration Number"
                        value={formData.companyRegistration}
                        onChange={(e) => setFormData({ ...formData, companyRegistration: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="VAT Number"
                        value={formData.vatNumber}
                        onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-[#0B1220] mb-4">Insurance & Certifications</h4>
                    <p className="text-sm text-[#6B7280] mb-4">
                      Professional verification documents help us categorize your services and assign appropriate client access levels.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-[#C9A24A]/30 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
                        <p className="text-sm text-[#6B7280]">Upload Insurance Certificate</p>
                        <p className="text-xs text-[#6B7280]">Public Liability & Professional Indemnity</p>
                      </div>
                      
                      <div className="border-2 border-dashed border-[#C9A24A]/30 rounded-lg p-4 text-center">
                        <Award className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
                        <p className="text-sm text-[#6B7280]">Upload Certifications</p>
                        <p className="text-xs text-[#6B7280]">Professional qualifications & memberships</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Pricing & Capacity */}
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1220] mb-6">Pricing & Capacity</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <select
                        value={formData.pricingTier}
                        onChange={(e) => setFormData({ ...formData, pricingTier: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Pricing Tier *</option>
                        <option value="budget">Budget (£500-£2,000)</option>
                        <option value="mid_market">Mid-Market (£2,000-£10,000)</option>
                        <option value="premium">Premium (£10,000-£50,000)</option>
                        <option value="luxury">Luxury (£50,000+)</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={formData.currentAvailability}
                        onChange={(e) => setFormData({ ...formData, currentAvailability: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        required
                      >
                        <option value="">Current Availability *</option>
                        <option value="high">High - Available immediately</option>
                        <option value="medium">Medium - 1-2 weeks lead time</option>
                        <option value="low">Low - 3-4 weeks lead time</option>
                        <option value="none">Fully booked</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <input
                        type="number"
                        placeholder="Minimum Project Value (£)"
                        value={formData.minimumProjectValue || ''}
                        onChange={(e) => setFormData({ ...formData, minimumProjectValue: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Maximum Project Value (£)"
                        value={formData.maximumProjectValue || ''}
                        onChange={(e) => setFormData({ ...formData, maximumProjectValue: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Monthly Capacity (projects)"
                        value={formData.monthlyCapacity || ''}
                        onChange={(e) => setFormData({ ...formData, monthlyCapacity: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-[#E5E7EB]">
                <div>
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md"
                    >
                      Previous
                    </Button>
                  )}
                </div>
                
                <div>
                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-[#C9A24A] hover:bg-[#B8923D] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
                    >
                      <Building2 className="h-5 w-5 mr-2" />
                      {loading ? 'Processing...' : 'Submit Application'}
                    </Button>
                  )}
                </div>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-[#6B7280]">
                Questions? Call our partnership team: <span className="font-semibold text-[#0B1220]">+44 20 7946 0958</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}