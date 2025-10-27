'use client'

import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Crown, ArrowRight, CheckCircle, Calendar, Users, MapPin, GraduationCap, CreditCard } from 'lucide-react'

export default function ExecutiveIntakePage() {
  const [step, setStep] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
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

    // Store form data for checkout
    sessionStorage.setItem('executive_intake_data', JSON.stringify(formData))
    
    // Redirect to Stripe checkout
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: '72hour_audit',
          cadence: 'one_time',
          email: formData.email
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        console.error('Checkout error:', data)
        alert('Unable to start checkout. Please try again or contact support at hello@therelonetwork.com')
      }
    } catch (error) {
      console.error('Checkout request failed:', error)
      alert('Unable to start checkout. Please check your connection and try again.')
    }
  }

  const isStep1Complete = formData.moveDate && formData.budget && formData.preferredAreas.length > 0 && formData.name && formData.email
  const isStep2Complete = true // Step 2 has no required fields, all optional

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
            72-Hour Setup Audit
          </h1>
          <p className="text-xl text-[#6B7280] mb-8">
            Area fit analysis, property shortlist, viewings route, tenancy rider review
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
              <span className="font-medium">Payment</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-[#C9A24A]' : 'bg-[#E5E7EB]'}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C9A24A]' : 'text-[#6B7280]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 3 ? 'border-[#C9A24A] bg-[#C9A24A] text-white' : 'border-[#6B7280]'}`}>3</div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Step 1: Brief Form */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#C9A24A]" />
              Setup your audit (90 seconds)
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
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Confirmation */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[#C9A24A]" />
              Confirm & Pay
            </h2>
            
            {/* Service Summary */}
            <div className="bg-[#FAFAF9] rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-[#0B1B2B] mb-4">72-Hour Setup Audit</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>Area fit analysis (150+ data points)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>Curated property shortlist with investment analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>Optimized viewing route with pre-negotiated slots</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>Tenancy rider review with legal recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>Written report + 60-min strategy call</span>
                </div>
              </div>
              
              <div className="border-t border-[#E5E7EB] mt-6 pt-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0B1B2B]">£2,500</div>
                    <div className="text-sm text-[#6B7280]">One-time payment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-FAQ */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
              <h4 className="font-bold text-[#0B1B2B] mb-4">Quick Questions</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What happens after I pay?</div>
                  <div className="text-[#6B7280]">We begin your area analysis immediately. Written report delivered within 72 hours, call scheduled within 24h.</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What if I want the full relocation service?</div>
                  <div className="text-[#6B7280]">The £2,500 audit fee is fully credited toward our Executive Relocation package (£7,500-£15,000).</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-3">Refunds & Cancellations</div>
                  <div className="text-[#6B7280] space-y-2 text-sm">
                    <div><strong>Cash refund:</strong> Available until we begin your area analysis (typically within 2-4 hours of payment).</div>
                    <div><strong>After analysis begins:</strong> No cash refunds. We issue account credit valid for 12 months (usable on any Relo service).</div>
                    <div><strong>After report delivery:</strong> Non-refundable. We may offer account credit only at our discretion.</div>
                    <div className="text-xs text-[#6B7280] mt-2">
                      <strong>Note:</strong> Credit is non-transferable and not redeemable for cash.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <div className="text-xs text-[#6B7280]">
                  By booking, you ask us to begin services immediately, which may affect statutory cooling-off rights. 
                  <a href="/terms" className="text-[#C9A24A] hover:underline ml-1">View complete terms</a>
                </div>
              </div>
            </div>

            {/* Required Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded mt-0.5"
                  required
                />
                <span className="text-sm text-[#6B7280]">
                  I've read the Refunds & Cancellations policy and I want Relo to begin services immediately.
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!termsAccepted}
              className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <CreditCard className="w-5 h-5" />
              Complete Payment
            </button>
            
            {/* Debug info for testing */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
              <div>Debug: Plan = 72hour_audit</div>
              <div>Email = {formData.email}</div>
              <div>Terms accepted = {termsAccepted ? 'Yes' : 'No'}</div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}