'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

export default function PartnerApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    businessRegistration: '',
    
    // Services
    category: '',
    services: [] as string[],
    description: '',
    
    // Credentials
    insurance: '',
    certifications: [] as string[],
    
    // References
    references: [
      { name: '', company: '', email: '', phone: '' }
    ],
    
    // Membership
    membershipTier: 'leadmachine' as 'leadmachine' | 'marketdominator'
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown timer effect
  useEffect(() => {
    const launchDate = new Date('2025-09-26T14:00:00Z').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = launchDate - now
      
      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const categories = [
    { value: 'immigration', label: 'Immigration' },
    { value: 'housing', label: 'Housing' },
    { value: 'banking', label: 'Banking' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'employment', label: 'Employment' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'transport', label: 'Transport' },
    { value: 'travel', label: 'Travel' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'tax', label: 'Tax Services' }
  ]

  const membershipTiers = [
    {
      tier: 'leadmachine',
      name: 'Lead Machine',
      originalPrice: '£997/mo',
      foundingPrice: '£497/mo',
      annualPrice: '£4,970',
      savings: '67% OFF',
      features: [
        '8-15 guaranteed qualified leads/month',
        'AI concierge mentions you by name for expertise',
        'Premium directory placement (top 3 position)',
        'Authority content collaboration & co-creation',
        'Expert positioning in your service category',
        'Performance dashboard with lead analytics',
        'Email list inclusion (25k+ luxury subscribers)',
        'Social media authority features & mentions',
        'EXCLUSIVE territory protection rights',
        'Client testimonial & case study development'
      ]
    },
    {
      tier: 'marketdominator',
      name: 'Market Dominator',
      originalPrice: '£2,997/mo',
      foundingPrice: '£1,497/mo',
      annualPrice: '£14,970',
      savings: '67% OFF',
      features: [
        'Everything in Lead Machine tier',
        'EXCLUSIVE category ownership (no competitors)',
        'AI citations as "preferred industry partner"',
        'Citation insurance against competitor mentions',
        'Co-branded luxury marketing content creation',
        'White-label platform integration options',
        'Priority Concierge tier client recommendations',
        '15% revenue sharing on all closed deals',
        'Quarterly strategic business reviews with CEO',
        'Industry thought leadership positioning',
        'Premium press mention opportunities',
        'Executive networking event access'
      ]
    }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayInputChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item.length > 0)
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', company: '', email: '', phone: '' }]
    }))
  }

  const updateReference = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/partners/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.ok) {
        setMessage('Application submitted successfully! We will review your application and contact you within 3-5 business days.')
        setCurrentStep(5) // Show success step
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('An error occurred while submitting your application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.contactPerson && formData.email && formData.phone
      case 2:
        return formData.category && formData.services.length > 0 && formData.description
      case 3:
        return formData.insurance && formData.certifications.length > 0
      case 4:
        return formData.membershipTier
      default:
        return true
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partner Application
            </h1>
            <p className="text-[#6B7280] text-lg">
              Join our network of trusted relocation service providers
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep 
                      ? 'bg-[#C9A24A] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-[#C9A24A]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-[#6B7280]">
              <span>Company Info</span>
              <span>Services</span>
              <span>Credentials</span>
              <span>Membership</span>
            </div>
          </div>

          {currentStep !== 5 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#0B1B2B]/10">
              {/* Step 1: Company Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-6">Company Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="Your Company Ltd"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="https://www.company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Business Registration
                      </label>
                      <input
                        type="text"
                        value={formData.businessRegistration}
                        onChange={(e) => handleInputChange('businessRegistration', e.target.value)}
                        className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                        placeholder="Companies House Number: 12345678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Services */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-6">Services & Expertise</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Primary Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Services Offered * <span className="text-sm text-[#6B7280]">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.services.join(', ')}
                      onChange={(e) => handleArrayInputChange('services', e.target.value)}
                      className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                      placeholder="visa applications, work permits, residency permits"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Company Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all resize-none"
                      placeholder="Describe your company's expertise and what makes you unique..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Credentials */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-6">Credentials & References</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Professional Insurance *
                    </label>
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                      className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                      placeholder="Professional Indemnity: £2M, Public Liability: £1M"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Certifications * <span className="text-sm text-[#6B7280]">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.certifications.join(', ')}
                      onChange={(e) => handleArrayInputChange('certifications', e.target.value)}
                      className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                      placeholder="ACCA, CIOT, Law Society, etc."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-[#0B1B2B]">
                        Client References
                      </label>
                      <button
                        type="button"
                        onClick={addReference}
                        className="px-4 py-2 bg-[#C9A24A] text-white rounded-lg hover:bg-[#C9A24A]/90 transition-colors text-sm"
                      >
                        Add Reference
                      </button>
                    </div>
                    
                    {formData.references.map((ref, index) => (
                      <div key={index} className="border border-[#E5E7EB] rounded-xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-[#0B1B2B]">Reference {index + 1}</h4>
                          {formData.references.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeReference(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={ref.name}
                            onChange={(e) => updateReference(index, 'name', e.target.value)}
                            className="w-full border border-[#E5E7EB] rounded-lg p-2 focus:border-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/20 outline-none transition-all"
                            placeholder="Contact Name"
                          />
                          <input
                            type="text"
                            value={ref.company}
                            onChange={(e) => updateReference(index, 'company', e.target.value)}
                            className="w-full border border-[#E5E7EB] rounded-lg p-2 focus:border-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/20 outline-none transition-all"
                            placeholder="Company Name"
                          />
                          <input
                            type="email"
                            value={ref.email}
                            onChange={(e) => updateReference(index, 'email', e.target.value)}
                            className="w-full border border-[#E5E7EB] rounded-lg p-2 focus:border-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/20 outline-none transition-all"
                            placeholder="Email"
                          />
                          <input
                            type="tel"
                            value={ref.phone}
                            onChange={(e) => updateReference(index, 'phone', e.target.value)}
                            className="w-full border border-[#E5E7EB] rounded-lg p-2 focus:border-[#C9A24A] focus:ring-1 focus:ring-[#C9A24A]/20 outline-none transition-all"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Membership Selection */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-6">Choose Your Founding Partner Membership</h2>
                  
                  {/* Countdown Timer */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">⏰ Founding Partner Pricing Ends Soon!</h3>
                      <p className="text-red-700 mb-4">Prices go up on Friday, 26th September at 14:00 GMT</p>
                      <div className="flex justify-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-800">{timeRemaining.days}</div>
                          <div className="text-sm text-red-600">Days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-800">{timeRemaining.hours}</div>
                          <div className="text-sm text-red-600">Hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-800">{timeRemaining.minutes}</div>
                          <div className="text-sm text-red-600">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-800">{timeRemaining.seconds}</div>
                          <div className="text-sm text-red-600">Seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {membershipTiers.map((tier) => (
                      <div
                        key={tier.tier}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                          formData.membershipTier === tier.tier
                            ? 'border-[#C9A24A] bg-[#C9A24A]/5'
                            : 'border-[#E5E7EB] hover:border-[#C9A24A]/50'
                        }`}
                        onClick={() => handleInputChange('membershipTier', tier.tier)}
                      >
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">{tier.name}</h3>
                          <div className="mb-2">
                            <span className="text-lg text-gray-500 line-through">{tier.originalPrice}</span>
                            <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">{tier.savings}</span>
                          </div>
                          <div className="text-2xl font-bold text-[#C9A24A] mb-1">{tier.foundingPrice}</div>
                          <div className="text-sm text-[#6B7280]">Annual: {tier.annualPrice} (10 months upfront)</div>
                        </div>
                        <ul className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-[#6B7280]">
                              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-[#E5E7EB]">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={!isStepValid() || loading}
                  className="px-6 py-3 bg-[#0B1B2B] text-[#C9A24A] rounded-xl hover:bg-[#0B1B2B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {loading ? 'Submitting...' : currentStep === 4 ? 'Submit Application' : 'Next'}
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {currentStep === 5 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#0B1B2B]/10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-4">Application Submitted!</h2>
              <p className="text-[#6B7280] mb-6">
                Thank you for your interest in becoming a Relo Network partner. We will review your application and contact you within 1-3 business days.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-[#0B1B2B] text-[#C9A24A] rounded-xl hover:bg-[#0B1B2B]/90 transition-colors font-semibold"
              >
                Return to Homepage
              </button>
            </div>
          )}

          {/* Error/Success Message */}
          {message && currentStep !== 5 && (
            <div className={`mt-6 p-4 rounded-xl border ${
              message.includes('successfully')
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="text-sm font-medium">{message}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}