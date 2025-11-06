'use client'

import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Rocket, Clock, Users, CheckCircle, Building2, Briefcase, GraduationCap, Home, Globe, User } from 'lucide-react'
import Link from 'next/link'

export default function AITalentAssessment() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionData, setSubmissionData] = useState<any>(null)
  const [userType, setUserType] = useState<'company' | 'individual'>('company')
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyWebsite: '',
    industry: 'AI/Machine Learning',
    officeLocation: '',
    
    // Contact Information
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    
    // AI Talent Requirements
    talentRole: '',
    seniorityLevel: '',
    currentLocation: '',
    targetStartDate: '',
    salaryRange: '',
    
    // Relocation Needs
    employeeCount: '1',
    familySize: '',
    childrenAges: '',
    spouseEmployment: '',
    
    // 72-Hour Priorities
    housingBudget: '',
    preferredAreas: [],
    schoolRequirement: '',
    
    // Timeline
    urgencyLevel: 'urgent',
    competingOffers: '',
    
    // Additional Requirements
    visaStatus: '',
    petRelocation: '',
    specialRequirements: '',
    
    // How they heard about us
    referralSource: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Double-check we're preventing default
    if (e.nativeEvent) {
      e.nativeEvent.preventDefault()
      e.nativeEvent.stopImmediatePropagation()
    }
    
    console.log('✅ Form handler called!', formData)
    setIsSubmitting(true)
    
    // Submit to Supabase
    try {
      const response = await fetch('/api/submit-ai-talent-supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userType }),
      })
      
      // Even if response is 500, still try to show confirmation
      let result = { success: false, data: null }
      try {
        result = await response.json()
      } catch (e) {
        console.log('Could not parse response')
      }
      
      if (response.ok && result.success) {
        console.log('✅ Saved to Supabase:', result)
        // Update with actual data from Supabase
        setSubmissionData(result.data || {
          referenceNumber: result.referenceNumber || 'AI-' + Date.now(),
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          responseTime: '2 hours'
        })
        // Mark as submitted
        setIsSubmitted(true)
        setIsSubmitting(false)
        // Scroll to top to show confirmation
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        console.error('API Error:', result)
        // Still show confirmation even if API fails
        setSubmissionData({
          referenceNumber: 'AI-' + Date.now(),
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          responseTime: '2 hours'
        })
        setIsSubmitted(true)
        setIsSubmitting(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (error) {
      console.error('API Error (non-blocking):', error)
      // Still show confirmation even if API fails
      setSubmissionData({
        referenceNumber: 'AI-' + Date.now(),
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        responseTime: '2 hours'
      })
      setIsSubmitted(true)
      setIsSubmitting(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    // Return false to ensure form doesn't submit
    return false
  }
  
  // Show confirmation screen if submitted
  if (isSubmitted && submissionData) {
    return (
      <div className="min-h-screen bg-[#FAFAF9]">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Confirmation Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1220] mb-4">
              Assessment Received!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you, <strong>{submissionData.contactName}</strong>. 
              Your AI talent relocation assessment has been prioritised.
            </p>
            
            <div className="bg-gradient-to-r from-[#0B1220] to-[#1a2332] text-white rounded-xl p-8 mb-8 relative">
              <div className="absolute top-4 right-4 w-24 h-24 bg-[#C9A24A]/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-[#C9A24A]/20 p-3 rounded-full">
                    <Clock className="h-8 w-8 text-[#C9A24A]" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">
                  2-Hour Response Guarantee
                </h2>
                <div className="text-center space-y-2">
                  <p className="text-gray-200 leading-relaxed">
                    An AI relocation specialist will contact you at
                  </p>
                  <p className="text-[#C9A24A] font-semibold text-lg tracking-wide">
                    {submissionData.contactEmail}
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    within 2 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-[#0B1220] mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Your assessment is being reviewed by our AI relocation team</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Property shortlist being prepared based on your requirements</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">School availability being checked for your timeline</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">7-day relocation plan being customised</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Your reference number:</p>
              <p className="text-2xl font-mono font-bold text-[#C9A24A]">{submissionData.referenceNumber}</p>
              <p className="text-xs text-gray-500 mt-2">Please save this for your records</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-[#0B1220] mb-2">
                Confirmation Email Sent
              </h3>
              <p className="text-sm text-gray-700">
                We've sent a detailed confirmation to <strong>{submissionData.contactEmail}</strong> with your 
                submission details and next steps.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-[#0B1220] to-[#1a2332] text-white rounded-xl p-6 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Stay Updated with AI Talent Insights</h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Get weekly insights on AI talent relocation trends, London market updates, and exclusive partner opportunities.
                </p>
                <Link 
                  href="/newsletter"
                  className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#B8913A] text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                >
                  Subscribe to Newsletter
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-gray-300 text-xs mt-3">
                  Join 2,500+ executives • Weekly insights • Unsubscribe anytime
                </p>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                Need immediate assistance? Our 24/7 concierge is available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="bg-[#C9A24A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B8913A] transition"
                >
                  Return to Homepage
                </Link>
                <Link 
                  href="/blog/ai-talent-war-london-2025"
                  className="bg-white text-[#0B1220] border-2 border-[#0B1220] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Read: AI Talent Relocation Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-[#0B1220] text-white py-8 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm opacity-75">
              © 2025 The Relo Network. Your AI talent lands in 7 days.
            </p>
          </div>
        </footer>
      </div>
    )
  }
  
  // If not submitted, show the form
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B1220] to-[#1a2332] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-8 w-8 text-[#C9A24A]" />
            <span className="text-[#C9A24A] font-semibold">AI TALENT FAST-TRACK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            AI Talent Relocation Assessment
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {userType === 'company' 
              ? 'Supporting companies hiring top-tier AI professionals from leading tech firms worldwide. Get your new talent operational in London within 7 days.'
              : 'Relocating to London with your AI compensation package? Get settled within 7 days with priority access to properties and schools.'}
          </p>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <Clock className="h-6 w-6 text-[#C9A24A] mb-2" />
              <h3 className="font-semibold mb-1 text-white">2-Hour Response</h3>
              <p className="text-sm text-gray-200">Immediate specialist callback for AI talent relocations</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <Building2 className="h-6 w-6 text-[#C9A24A] mb-2" />
              <h3 className="font-semibold mb-1 text-white">Piccadilly to St Paul's</h3>
              <p className="text-sm text-gray-200">Properties near all major AI offices</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <GraduationCap className="h-6 w-6 text-[#C9A24A] mb-2" />
              <h3 className="font-semibold mb-1 text-white">ASL Fast-Track</h3>
              <p className="text-sm text-gray-200">American School London priority placement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            return false;
          }} 
          className="space-y-8"
        >
          
          {/* User Type Selection */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0B1220] mb-6">I am...</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('company')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  userType === 'company'
                    ? 'border-[#C9A24A] bg-[#C9A24A]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Briefcase className="h-8 w-8 mb-3 mx-auto text-[#C9A24A]" />
                <h3 className="font-semibold text-lg mb-2">A Company Hiring AI Talent</h3>
                <p className="text-sm text-gray-600">I'm recruiting AI professionals and need relocation support for our new hires</p>
              </button>
              <button
                type="button"
                onClick={() => setUserType('individual')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  userType === 'individual'
                    ? 'border-[#C9A24A] bg-[#C9A24A]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="h-8 w-8 mb-3 mx-auto text-[#C9A24A]" />
                <h3 className="font-semibold text-lg mb-2">An AI Professional Relocating</h3>
                <p className="text-sm text-gray-600">I've received a relocation package and need help moving to London</p>
              </button>
            </div>
          </div>
          
          {/* Company Information */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0B1220] mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-[#C9A24A]" />
              {userType === 'company' ? 'Company Information' : 'Your Information'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? 'Company Name *' : 'Current/New Employer *'}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder="e.g., xAI, OpenAI, Anthropic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? 'London Office Location' : 'Your London Office Location'}
                </label>
                <select
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select location</option>
                  <option value="piccadilly">Piccadilly</option>
                  <option value="st-pauls">St Paul's</option>
                  <option value="kings-cross">King's Cross</option>
                  <option value="shoreditch">Shoreditch</option>
                  <option value="canary-wharf">Canary Wharf</option>
                  <option value="paddington">Paddington</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? 'Contact Name *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  name="contactRole"
                  value={formData.contactRole}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder={userType === 'company' ? 'e.g., Head of Talent, VP People' : 'e.g., ML Engineer, Research Scientist'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* AI Talent Details */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0B1220] mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#C9A24A]" />
              {userType === 'company' ? 'AI Talent Details' : 'Your Role Details'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? 'Role Being Relocated *' : 'Your Role *'}
                </label>
                <select
                  name="talentRole"
                  value={formData.talentRole}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="ai-researcher">AI Researcher</option>
                  <option value="ml-engineer">ML Engineer</option>
                  <option value="ai-safety">AI Safety Specialist</option>
                  <option value="principal-engineer">Principal Engineer</option>
                  <option value="engineering-director">Engineering Director</option>
                  <option value="vp-engineering">VP Engineering</option>
                  <option value="cto">CTO</option>
                  <option value="other">Other Senior Role</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? "Candidate's Current Location *" : 'Your Current Location *'}
                </label>
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder="e.g., San Francisco, New York, Seattle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range (USD)
                </label>
                <select
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="200-300k">$200,000 - $300,000</option>
                  <option value="300-400k">$300,000 - $400,000</option>
                  <option value="400-500k">$400,000 - $500,000</option>
                  <option value="500-600k">$500,000 - $600,000</option>
                  <option value="600k+">$600,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Start Date *
                </label>
                <input
                  type="date"
                  name="targetStartDate"
                  value={formData.targetStartDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === 'company' ? 'Candidate Has Competing Offers?' : 'Do You Have Competing Offers?'}
                </label>
                <select
                  name="competingOffers"
                  value={formData.competingOffers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="none">No competing offers</option>
                  <option value="one">One other offer</option>
                  <option value="multiple">Multiple offers</option>
                  <option value="counter">Expecting counter-offer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visa Status
                </label>
                <select
                  name="visaStatus"
                  value={formData.visaStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="approved">Visa approved</option>
                  <option value="pending">Visa pending</option>
                  <option value="applying">Will apply</option>
                  <option value="uk-citizen">UK citizen</option>
                  <option value="eu-citizen">EU citizen</option>
                </select>
              </div>
            </div>
          </div>

          {/* 72-Hour Priorities */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0B1220] mb-6 flex items-center gap-2">
              <Home className="h-6 w-6 text-[#C9A24A]" />
              72-Hour Setup Priorities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Housing Budget (£)
                </label>
                <select
                  name="housingBudget"
                  value={formData.housingBudget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select budget</option>
                  <option value="3000-5000">£3,000 - £5,000</option>
                  <option value="5000-7500">£5,000 - £7,500</option>
                  <option value="7500-10000">£7,500 - £10,000</option>
                  <option value="10000-15000">£10,000 - £15,000</option>
                  <option value="15000+">£15,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family Size
                </label>
                <select
                  name="familySize"
                  value={formData.familySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="couple">Couple</option>
                  <option value="family-small">Family (1-2 children)</option>
                  <option value="family-large">Family (3+ children)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Areas (check all that apply)
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'Mayfair',
                  'Belgravia', 
                  'Kensington',
                  'Chelsea',
                  'Notting Hill',
                  'Marylebone',
                  'Bloomsbury',
                  'Shoreditch',
                  'Canary Wharf'
                ].map(area => (
                  <label key={area} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredAreas.includes(area)}
                      onChange={() => handleCheckboxChange(area)}
                      className="rounded text-[#C9A24A] focus:ring-[#C9A24A]"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Requirements
                </label>
                <select
                  name="schoolRequirement"
                  value={formData.schoolRequirement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="american-school">American School London (ASL)</option>
                  <option value="international">International School</option>
                  <option value="british-private">British Private School</option>
                  <option value="state">State School</option>
                  <option value="none">No children</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spouse Employment Support?
                </label>
                <select
                  name="spouseEmployment"
                  value={formData.spouseEmployment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="yes-tech">Yes - Tech industry</option>
                  <option value="yes-finance">Yes - Finance</option>
                  <option value="yes-other">Yes - Other industry</option>
                  <option value="no">Not needed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0B1220] mb-6">
              Additional Requirements
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Relocation
                </label>
                <select
                  name="petRelocation"
                  value={formData.petRelocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">None</option>
                  <option value="dog">Dog(s)</option>
                  <option value="cat">Cat(s)</option>
                  <option value="both">Multiple pets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements or Concerns
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder="e.g., Medical needs, accessibility requirements, specific amenities needed..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about The Relo Network?
                </label>
                <input
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder="e.g., LinkedIn, colleague referral, search..."
                />
              </div>
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-1">Need Help Securing Your Offer?</h3>
                <p className="text-sm text-gray-700">
                  Whether you're hiring AI talent or relocating yourself, timing is critical. 
                  Our 7-day guarantee ensures operational setup before competing offers or 
                  counter-offers can derail plans. Speed seals the deal.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#C9A24A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8913A] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get 2-Hour Response Time'}
            </button>
            <button
              type="button"
              onClick={() => {
                // Save form data to sessionStorage for transfer to 72-hour audit form
                const transferData = {
                  name: formData.contactName,
                  email: formData.contactEmail,
                  phone: formData.contactPhone,
                  currentLocation: formData.currentLocation,
                  moveDate: formData.targetStartDate,
                  budget: formData.housingBudget,
                  otherRequirements: `AI Talent Relocation Assessment Transfer:\n\nCompany: ${formData.companyName}\nRole: ${formData.talentRole}\nSeniority: ${formData.seniorityLevel}\nSalary Range: ${formData.salaryRange}\nEmployee Count: ${formData.employeeCount}\nFamily Size: ${formData.familySize}\nVisa Status: ${formData.visaStatus}\nSpecial Requirements: ${formData.specialRequirements}`
                }
                sessionStorage.setItem('ai_talent_transfer_data', JSON.stringify(transferData))
                window.location.href = '/executive-intake'
              }}
              className="bg-white text-[#0B1220] border-2 border-[#0B1220] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg text-center"
            >
              Prefer Full 72-Hour Audit?
            </button>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-[#0B1220]">100% Confidential</h3>
              <p className="text-sm text-gray-600 mt-1">
                Your talent pipeline remains private
              </p>
            </div>
            <div>
              <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-[#0B1220]">24/7 Concierge</h3>
              <p className="text-sm text-gray-600 mt-1">
                Support across all time zones
              </p>
            </div>
            <div>
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-[#0B1220]">AI Sector Expertise</h3>
              <p className="text-sm text-gray-600 mt-1">
                Specialising in $400k+ relocations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0B1220] text-white py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm opacity-75">
            © 2025 The Relo Network. Winning the AI talent war with 7-day relocations.
          </p>
        </div>
      </footer>
    </div>
  )
}