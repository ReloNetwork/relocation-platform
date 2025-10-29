'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Star, ArrowRight, Users, Clock, Shield, Trophy, Target, Building, Globe, Mail, Phone, User, Briefcase } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

interface PartnerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  serviceCategory: string
  experienceYears: string
  currentClientBase: string
  londonExperience: string
  insuranceCoverage: string
  certifications: string
  revenueExpectation: string
  partnershipTier: string
  message: string
}

function PartnerApplicationContent() {
  const searchParams = useSearchParams()
  const tier = searchParams?.get('tier') || 'professional'
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PartnerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: '',
    experienceYears: '',
    currentClientBase: '',
    londonExperience: '',
    insuranceCoverage: '',
    certifications: '',
    revenueExpectation: '',
    partnershipTier: tier,
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const partnershipTiers = {
    professional: {
      name: 'Professional Partner',
      duration: '12 months',
      description: 'Category exclusivity with homepage placement',
      price: 'Contact for pricing',
      benefits: [
        'Category exclusivity (12 months) in your service area',
        'Top placement across Home & Directory pages',
        'Direct client routing from executive & corporate tracks',
        '4× editorial features throughout membership',
        'Quarterly pipeline reviews with dedicated support',
        'Territory protection rights',
        'Performance tracking and reporting',
        'Guarantee: qualified opportunities in 90 days or extended exclusivity'
      ],
      clientTypes: [
        'C-suite executives relocating to London',
        'HR teams managing corporate relocations',
        'High-net-worth individuals and families',
        'Fortune 500 company employees',
        'International business owners'
      ]
    },
    sponsor: {
      name: 'Premium Sponsor',
      duration: '90 days',
      description: 'Professional referral access with priority placement',
      price: 'Contact for pricing',
      benefits: [
        'Priority referral placement',
        'Professional network access',
        'Marketing exposure opportunities',
        'Performance tracking',
        'Partnership support',
        'Networking event access',
        'Professional development resources'
      ],
      clientTypes: [
        'Professional relocations',
        'Corporate employee relocations',
        'Executive transfers',
        'Business relocations',
        'Family relocations'
      ]
    }
  }

  const currentTier = partnershipTiers[tier as keyof typeof partnershipTiers] || partnershipTiers.professional

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/partner-application/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setCurrentStep(3) // Success step
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('There was an error submitting your application. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (currentStep === 1) {
    return (
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Partnership Benefits Overview */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">{currentTier.name} Benefits Overview</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {currentTier.name} Partnership
            </h1>
            
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
              {currentTier.description} • {currentTier.duration} • {currentTier.price}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Benefits Section */}
            <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center">
                <Trophy className="w-6 h-6 text-[#C9A24A] mr-3" />
                Partnership Benefits
              </h2>
              <ul className="space-y-4">
                {currentTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#6B7280]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Types Section */}
            <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center">
                <Users className="w-6 h-6 text-[#C9A24A] mr-3" />
                Client Types You'll Serve
              </h2>
              <ul className="space-y-4">
                {currentTier.clientTypes.map((clientType, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-[#C9A24A] mt-0.5 flex-shrink-0" />
                    <span className="text-[#6B7280]">{clientType}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dual-Track Platform Explanation */}
          <div className="bg-gradient-to-br from-[#0B1B2B] to-[#1a2b3b] rounded-2xl p-8 text-white mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Our Dual-Track Service Platform
              </h2>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                As a partner, you'll receive clients from both our executive and corporate service tracks
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Executive Services Track</h3>
                    <p className="text-white/80 text-sm">Individual professionals & entrepreneurs</p>
                  </div>
                </div>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li>• 72-Hour Setup Audits</li>
                  <li>• Complete relocation services</li>
                  <li>• Family integration support</li>
                  <li>• Personal account management</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Corporate Programmes Track</h3>
                    <p className="text-white/80 text-sm">HR teams & corporate mobility</p>
                  </div>
                </div>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li>• 15-minute corporate assessments</li>
                  <li>• Dedicated account management</li>
                  <li>• Volume pricing & SLAs</li>
                  <li>• Executive reporting dashboards</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg mb-16">
            <h2 className="text-2xl font-bold text-[#0B1B2B] text-center mb-8">
              Partnership Network Performance
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">73%</div>
                <div className="text-[#6B7280] font-medium">Lead Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">42%</div>
                <div className="text-[#6B7280] font-medium">Repeat Client Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">33</div>
                <div className="text-[#6B7280] font-medium">London Boroughs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#C9A24A] mb-2">96%</div>
                <div className="text-[#6B7280] font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTA to proceed */}
          <div className="text-center">
            <Button 
              onClick={() => setCurrentStep(2)}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-12 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Apply for {currentTier.name} Partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-[#6B7280] text-sm mt-4">
              Complete our application form • Our team will contact you within 24 hours
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  if (currentStep === 2) {
    return (
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {currentTier.name} Application
            </h1>
            <p className="text-xl text-[#6B7280]">
              Tell us about your business and experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Service Category *
                </label>
                <select
                  name="serviceCategory"
                  required
                  value={formData.serviceCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Property Search">Property Search</option>
                  <option value="Legal & Visa">Legal & Visa Services</option>
                  <option value="Luxury Movers">Luxury Moving Services</option>
                  <option value="Education Consultants">Education Consultants</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare Services</option>
                  <option value="Lifestyle Concierge">Lifestyle Concierge</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Years of Experience *
                </label>
                <select
                  name="experienceYears"
                  required
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Select Experience</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Current Client Base Description *
              </label>
              <textarea
                name="currentClientBase"
                required
                rows={3}
                value={formData.currentClientBase}
                onChange={handleInputChange}
                placeholder="Describe your current client base and typical project scope"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                London Market Experience *
              </label>
              <select
                name="londonExperience"
                required
                value={formData.londonExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                <option value="">Select Experience Level</option>
                <option value="New to London market">New to London market</option>
                <option value="1-2 years London experience">1-2 years London experience</option>
                <option value="3-5 years London experience">3-5 years London experience</option>
                <option value="5+ years London experience">5+ years London experience</option>
                <option value="London native/lifelong">London native/lifelong</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Professional Insurance Coverage *
              </label>
              <select
                name="insuranceCoverage"
                required
                value={formData.insuranceCoverage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                <option value="">Select Coverage Level</option>
                <option value="£1M+ Professional Indemnity">£1M+ Professional Indemnity</option>
                <option value="£2M+ Professional Indemnity">£2M+ Professional Indemnity</option>
                <option value="£5M+ Professional Indemnity">£5M+ Professional Indemnity</option>
                <option value="Other/Will obtain">Other/Will obtain</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your business, goals, and why you'd like to join our professional network"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-[#E5E7EB]">
              <Button
                type="button"
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="flex-1 border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"
              >
                Back to Benefits
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }

  // Success Step
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Application Submitted Successfully
          </h1>
          
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Thank you for your interest in our {currentTier.name} partnership. Our team will review your application and contact you within 24 hours.
          </p>

          <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg mb-8">
            <h2 className="text-xl font-bold text-[#0B1B2B] mb-4">Next Steps</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <div className="font-medium text-[#0B1B2B]">Application Review (24 hours)</div>
                  <div className="text-[#6B7280] text-sm">Our partnership team will review your application and credentials</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <div className="font-medium text-[#0B1B2B]">Partnership Consultation</div>
                  <div className="text-[#6B7280] text-sm">Schedule a call to discuss partnership details and answer your questions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <div className="font-medium text-[#0B1B2B]">Partnership Activation</div>
                  <div className="text-[#6B7280] text-sm">Complete onboarding and begin receiving qualified client referrals</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/partners'}
              variant="outline"
              className="border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"
            >
              Back to Partnerships
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
            >
              Return to Homepage
            </Button>
          </div>

          <div className="mt-8 p-4 bg-[#C9A24A]/10 rounded-lg border border-[#C9A24A]/20">
            <p className="text-sm text-[#0B1B2B]">
              <strong>Questions?</strong> Contact our partnership team at{' '}
              <a href="mailto:hello@therelonetwork.com" className="text-[#C9A24A] hover:underline">
                hello@therelonetwork.com
              </a>{' '}
              or{' '}
              <a href="tel:+442031059566" className="text-[#C9A24A] hover:underline">
                +44 20 3105 9566
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function PartnerApplicationPage() {
  return (
    <Suspense fallback={
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading...</p>
          </div>
        </div>
      </Layout>
    }>
      <PartnerApplicationContent />
    </Suspense>
  )
}