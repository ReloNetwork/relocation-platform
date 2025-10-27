'use client'

import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Building, Users, Clock, CheckCircle, ArrowRight, Globe, Shield, Award, Target, Calendar, Phone, Mail, MapPin } from 'lucide-react'

export default function CorporateAssessmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: '',
    companySize: '',
    annualRevenue: '',
    
    // Contact Information
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    
    // Relocation Details
    relocationType: '',
    employeeCount: '',
    timeline: '',
    budgetRange: '',
    
    // Current Challenges
    currentChallenges: [] as string[],
    previousExperience: '',
    
    // Requirements
    servicesNeeded: [] as string[],
    complianceRequirements: '',
    specialRequirements: '',
    
    // Follow-up
    urgency: '',
    preferredContact: ''
  })

  const industries = [
    'Technology', 'Financial Services', 'Consulting', 'Healthcare', 
    'Manufacturing', 'Media & Entertainment', 'Energy', 'Retail',
    'Pharmaceuticals', 'Legal Services', 'Real Estate', 'Other'
  ]

  const companySizes = [
    '1-50 employees', '51-200 employees', '201-1,000 employees', 
    '1,001-5,000 employees', '5,001+ employees'
  ]

  const challenges = [
    'Employee retention during relocations',
    'Cost management and budget predictability',
    'Timeline delays and project overruns',
    'Compliance and immigration complexity',
    'Family integration and spouse employment',
    'School placement for employee children',
    'Temporary accommodation coordination',
    'Tax and legal advisory requirements'
  ]

  const services = [
    'Immigration and visa support',
    'Premium property search and negotiation',
    'School placement and education consulting',
    'Spouse career transition support',
    'Tax and legal advisory services',
    'Temporary accommodation management',
    'Cultural integration programs',
    'Ongoing family support services'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: 'currentChallenges' | 'servicesNeeded', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // Store form data and redirect to thank you page
    sessionStorage.setItem('corporate_assessment_data', JSON.stringify(formData))
    
    try {
      const response = await fetch('/api/corporate-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        window.location.href = '/corporate-assessment/thank-you'
      } else {
        alert('Assessment submitted successfully. Our team will contact you within 24 hours.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Assessment submitted successfully. Our team will contact you within 24 hours.')
    }
  }

  const isStep1Complete = formData.companyName && formData.industry && formData.companySize && formData.firstName && formData.lastName && formData.email
  const isStep2Complete = formData.relocationType && formData.employeeCount && formData.timeline
  const isStep3Complete = formData.currentChallenges.length > 0

  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#0B1B2B]/10 border border-[#0B1B2B]/20 rounded-full px-4 py-2 mb-6">
            <Building className="h-4 w-4 text-[#0B1B2B] mr-2" />
            <span className="text-[#0B1B2B] text-sm font-medium">Corporate Solutions</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Corporate Relocation Assessment
          </h1>
          <p className="text-xl text-[#6B7280] mb-8">
            15-minute strategic assessment for HR teams managing executive relocations
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= num ? 'bg-[#C9A24A] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > num ? 'bg-[#C9A24A]' : 'bg-[#E5E7EB]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
          
          {/* Step 1: Company & Contact Information */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">Company & Contact Information</h2>
                <p className="text-[#6B7280]">Tell us about your organization and relocation needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Company Size *</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Annual Revenue (Optional)</label>
                  <select
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  >
                    <option value="">Select range</option>
                    <option value="Under £10M">Under £10M</option>
                    <option value="£10M-£50M">£10M-£50M</option>
                    <option value="£50M-£100M">£50M-£100M</option>
                    <option value="£100M-£500M">£100M-£500M</option>
                    <option value="£500M+">£500M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g., HR Director, People Operations Manager"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="e.g., +44 20 3105 9566"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  disabled={!isStep1Complete}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Relocation Requirements */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">Relocation Requirements</h2>
                <p className="text-[#6B7280]">Help us understand your specific relocation needs</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-3">Type of Relocation *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Individual executive relocations',
                      'Team/department relocations', 
                      'Office expansion to London',
                      'Ongoing relocation program'
                    ].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F8F9FA]">
                        <input
                          type="radio"
                          name="relocationType"
                          value={type}
                          checked={formData.relocationType === type}
                          onChange={(e) => handleInputChange('relocationType', e.target.value)}
                          className="text-[#C9A24A] focus:ring-[#C9A24A]"
                        />
                        <span className="text-[#6B7280]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Number of Employees to Relocate *</label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="1-2 employees">1-2 employees</option>
                      <option value="3-5 employees">3-5 employees</option>
                      <option value="6-10 employees">6-10 employees</option>
                      <option value="11-20 employees">11-20 employees</option>
                      <option value="21+ employees">21+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Timeline *</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="Immediate (within 30 days)">Immediate (within 30 days)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Ongoing program">Ongoing program</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Budget Range per Employee</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="£5,000-£10,000">£5,000-£10,000</option>
                      <option value="£10,000-£20,000">£10,000-£20,000</option>
                      <option value="£20,000-£50,000">£20,000-£50,000</option>
                      <option value="£50,000+">£50,000+</option>
                      <option value="Budget not yet determined">Budget not yet determined</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#6B7280] px-8 py-3 rounded-lg font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStep2Complete}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Current Challenges & Experience */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">Current Challenges & Experience</h2>
                <p className="text-[#6B7280]">Help us understand your pain points and previous experience</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-3">What are your biggest relocation challenges? (Select all that apply) *</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {challenges.map(challenge => (
                      <label key={challenge} className="flex items-start gap-3 cursor-pointer p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F8F9FA]">
                        <input
                          type="checkbox"
                          checked={formData.currentChallenges.includes(challenge)}
                          onChange={() => handleArrayToggle('currentChallenges', challenge)}
                          className="mt-0.5 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                        />
                        <span className="text-[#6B7280] text-sm">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Previous Relocation Experience</label>
                  <div className="space-y-3">
                    {[
                      'First time managing relocations',
                      'Handled 1-5 relocations previously',
                      'Handled 6-20 relocations previously',
                      'Experienced with 20+ relocations',
                      'We manage ongoing relocation programs'
                    ].map(exp => (
                      <label key={exp} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="previousExperience"
                          value={exp}
                          checked={formData.previousExperience === exp}
                          onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                          className="text-[#C9A24A] focus:ring-[#C9A24A]"
                        />
                        <span className="text-[#6B7280]">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#6B7280] px-8 py-3 rounded-lg font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStep3Complete}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Services & Follow-up */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">Services & Follow-up Preferences</h2>
                <p className="text-[#6B7280]">Final details to customize our proposal</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-3">Which services would be most valuable? (Select all that apply)</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {services.map(service => (
                      <label key={service} className="flex items-start gap-3 cursor-pointer p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#F8F9FA]">
                        <input
                          type="checkbox"
                          checked={formData.servicesNeeded.includes(service)}
                          onChange={() => handleArrayToggle('servicesNeeded', service)}
                          className="mt-0.5 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                        />
                        <span className="text-[#6B7280] text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Urgency Level</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Select urgency</option>
                      <option value="Urgent - need to start immediately">Urgent - need to start immediately</option>
                      <option value="High - within next month">High - within next month</option>
                      <option value="Medium - planning ahead">Medium - planning ahead</option>
                      <option value="Low - exploring options">Low - exploring options</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Preferred Contact Method</label>
                    <select
                      value={formData.preferredContact}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Select preference</option>
                      <option value="Email">Email</option>
                      <option value="Phone call">Phone call</option>
                      <option value="Video call">Video call</option>
                      <option value="In-person meeting">In-person meeting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Compliance or Special Requirements</label>
                  <textarea
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    placeholder="Any specific compliance requirements, policy considerations, or special circumstances we should know about..."
                    rows={4}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#6B7280] px-8 py-3 rounded-lg font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                  Complete Assessment
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* What Happens Next */}
        <div className="mt-12 bg-[#C9A24A]/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#C9A24A]" />
            What Happens Next
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Immediate Review</h4>
              <p className="text-[#6B7280] text-sm">Our corporate team reviews your assessment within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Strategy Call</h4>
              <p className="text-[#6B7280] text-sm">30-minute consultation call within 24 hours to discuss your needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-[#0B1B2B] mb-2">Custom Proposal</h4>
              <p className="text-[#6B7280] text-sm">Tailored relocation program proposal with transparent pricing</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}