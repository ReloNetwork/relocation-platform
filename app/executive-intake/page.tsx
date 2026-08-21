'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Crown, ArrowRight, CheckCircle, Calendar, Users, MapPin, GraduationCap } from 'lucide-react'

export default function ExecutiveIntakePage() {
  const [step, setStep] = useState(1)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    // Move window
    moveDate: '',
    flexibility: '',
    
    // Budget
    budget: '',
    budgetFlexible: false,
    
    // Areas
    preferredAreas: [] as string[],
    avoidAreas: '',
    
    // Priorities
    propertyType: '',
    propertyPriority: 'medium',
    schoolsPriority: 'medium',
    visaPriority: 'medium',
    
    // Family details
    adults: '1',
    children: '0',
    childrenAges: '',
    pets: false,
    
    // Support requirements
    visaSupport: false,
    taxationSupport: false,
    bankingSupport: false,
    schoolingSupport: false,
    lifestyleSupport: false,
    otherRequirements: '',
    
    // Urgency
    urgency: 'normal',
    specialRequirements: '',
    
    // Contact
    name: '',
    email: '',
    phone: '',
    currentLocation: ''
  })

  const londonAreas = [
    'Marylebone', 'Kensington', 'Chelsea', 'Mayfair', 'Belgravia',
    'Canary Wharf', 'Shoreditch', 'Clapham', 'Battersea', 'Greenwich',
    'Hammersmith', 'Fulham', 'Islington', 'Camden', 'Notting Hill',
    'South Kensington', 'Paddington', 'King\'s Cross', 'Bermondsey', 'Wimbledon'
  ]

  // Load transferred data from AI Talent Assessment form
  useEffect(() => {
    const transferData = sessionStorage.getItem('ai_talent_transfer_data')
    if (transferData) {
      try {
        const data = JSON.parse(transferData)
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          currentLocation: data.currentLocation || '',
          moveDate: data.moveDate || '',
          budget: data.budget || '',
          otherRequirements: data.otherRequirements || ''
        }))
        // Clear the transfer data after loading
        sessionStorage.removeItem('ai_talent_transfer_data')
      } catch (error) {
        console.error('Error loading transfer data:', error)
      }
    }
  }, [])

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.moveDate || !formData.budget || formData.preferredAreas.length === 0) {
      alert('Please complete all required fields before proceeding.')
      return
    }

    if (!consentAccepted) {
      setSubmitError('Please confirm that we may review and respond to your brief.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/executive-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consent: true,
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.success && data.referenceId) {
        sessionStorage.setItem('executive_intake_data', JSON.stringify({
          ...formData,
          referenceId: data.referenceId,
        }))
        window.location.href = `/executive-intake/success?reference=${encodeURIComponent(data.referenceId)}`
      } else {
        setSubmitError(data.error || 'We could not receive your brief. Please email hello@therelonetwork.com.')
      }
    } catch (error) {
      console.error('Executive intake request failed:', error)
      setSubmitError('We could not receive your brief. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Complete = formData.moveDate && formData.budget && formData.preferredAreas.length > 0 && formData.name && formData.email

  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
            <Crown className="h-4 w-4 text-[#C9A24A] mr-2" />
            <span className="text-[#C9A24A] text-sm font-medium">Executive Service</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Begin Your London Move
          </h1>
          <p className="text-xl text-[#6B7280] mb-8">
            Share the essentials. We will review the fit and recommend the right level of private support.
          </p>
          
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C9A24A]' : 'text-[#6B7280]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-[#C9A24A] bg-[#C9A24A] text-white' : 'border-[#6B7280]'}`}>1</div>
              <span className="font-medium">Brief</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-[#C9A24A]' : 'bg-[#E5E7EB]'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C9A24A]' : 'text-[#6B7280]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-[#C9A24A] bg-[#C9A24A] text-white' : 'border-[#6B7280]'}`}>2</div>
              <span className="font-medium">Review</span>
            </div>
          </div>
        </div>

        {/* Step 1: Brief Form */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#C9A24A]" />
              Share your relocation brief
            </h2>
            
            <div className="space-y-8">
              {/* Move Window */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Move Window</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Target move date</label>
                    <input
                      type="date"
                      value={formData.moveDate}
                      onChange={(e) => handleInputChange('moveDate', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Flexibility</label>
                    <select
                      value={formData.flexibility}
                      onChange={(e) => handleInputChange('flexibility', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Select flexibility</option>
                      <option value="exact">Must be exact date</option>
                      <option value="1week">±1 week</option>
                      <option value="1month">±1 month</option>
                      <option value="flexible">Very flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Budget</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Monthly rental budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Select budget</option>
                      <option value="2000-3000">£2,000 - £3,000</option>
                      <option value="3000-5000">£3,000 - £5,000</option>
                      <option value="5000-7500">£5,000 - £7,500</option>
                      <option value="7500-10000">£7,500 - £10,000</option>
                      <option value="10000+">£10,000+</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="budget-flexible"
                      checked={formData.budgetFlexible}
                      onChange={(e) => handleInputChange('budgetFlexible', e.target.checked)}
                      className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                    />
                    <label htmlFor="budget-flexible" className="ml-2 text-sm text-[#6B7280]">
                      Budget is flexible for the right property
                    </label>
                  </div>
                </div>
              </div>

              {/* Areas */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C9A24A]" />
                  Preferred Areas (select up to 5)
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                  {londonAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => handleAreaToggle(area)}
                      disabled={!formData.preferredAreas.includes(area) && formData.preferredAreas.length >= 5}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        formData.preferredAreas.includes(area)
                          ? 'bg-[#C9A24A] text-white border-[#C9A24A]'
                          : 'bg-white text-[#0B1B2B] border-[#E5E7EB] hover:border-[#C9A24A]'
                      } disabled:opacity-50`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Areas to avoid (optional)</label>
                  <input
                    type="text"
                    value={formData.avoidAreas}
                    onChange={(e) => handleInputChange('avoidAreas', e.target.value)}
                    placeholder="e.g., Zone 4+, busy roads"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Key Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Key Requirements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Property type preference</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Any type</option>
                      <option value="flat">Flat/Apartment</option>
                      <option value="house">House</option>
                      <option value="serviced">Serviced Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Family situation</label>
                    <select
                      value={formData.children}
                      onChange={(e) => handleInputChange('children', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="0">No children</option>
                      <option value="1">1 child</option>
                      <option value="2">2 children</option>
                      <option value="3+">3+ children</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Support Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Additional Support Requirements</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.visaSupport}
                        onChange={(e) => handleInputChange('visaSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Visa & immigration guidance</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.taxationSupport}
                        onChange={(e) => handleInputChange('taxationSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">UK taxation advice</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.bankingSupport}
                        onChange={(e) => handleInputChange('bankingSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Banking & finance setup</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.schoolingSupport}
                        onChange={(e) => handleInputChange('schoolingSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">School admissions support</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer md:col-span-2">
                      <input
                        type="checkbox"
                        checked={formData.lifestyleSupport}
                        onChange={(e) => handleInputChange('lifestyleSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Lifestyle integration (clubs, healthcare, social connections)</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Other specific requirements</label>
                    <textarea
                      value={formData.otherRequirements}
                      onChange={(e) => handleInputChange('otherRequirements', e.target.value)}
                      placeholder="Any other specific needs, preferences, or circumstances we should know about..."
                      rows={3}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Contact Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Phone number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., +44 20 3105 9566"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Current location</label>
                    <input
                      type="text"
                      value={formData.currentLocation}
                      onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                      placeholder="e.g., New York, USA"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                disabled={!isStep1Complete}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Review Your Brief
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review and consent */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[#C9A24A]" />
              Review & Send
            </h2>
            
            {/* Service Summary */}
            <div className="bg-[#FAFAF9] rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-[#0B1B2B] mb-4">Your private relocation review</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We review your timing, household needs and housing brief</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We assess whether a private briefing, audit or full relocation engagement fits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We reply with the most appropriate scope and next step</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>No payment is taken at this stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>A secure payment link is issued only after fit and scope are agreed</span>
                </div>
              </div>
              
            </div>

            {/* Micro-FAQ */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
              <h4 className="font-bold text-[#0B1B2B] mb-4">Quick Questions</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What happens after I send this?</div>
                  <div className="text-[#6B7280]">We review your brief and reply within one business day with the right next step.</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">Will I be asked to pay now?</div>
                  <div className="text-[#6B7280]">No. We confirm fit, scope and timing before issuing any payment link.</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">Is every brief accepted?</div>
                  <div className="text-[#6B7280]">No. We only recommend an engagement when the need, timing and available support are genuinely aligned.</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <div className="text-xs text-[#6B7280]">
                  Your information is used only to assess and respond to this relocation enquiry.
                  <a href="/privacy" className="text-[#C9A24A] hover:underline ml-1">Read our privacy notice</a>
                </div>
              </div>
            </div>

            {/* Required Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded mt-0.5"
                  required
                />
                <span className="text-sm text-[#6B7280]">
                  I agree that The Relo Network may review this information and contact me about my relocation enquiry.
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-4 text-sm font-medium text-[#0B1B2B] underline underline-offset-4"
            >
              Edit my brief
            </button>

            <button
              onClick={handleSubmit}
              disabled={!consentAccepted || isSubmitting}
              className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'SENDING…' : 'SEND MY PRIVATE BRIEF'}
            </button>
            {submitError && (
              <p className="mt-4 text-sm text-red-700" role="alert">{submitError}</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
