'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { ArrowRight, Building, MapPin, TrendingUp, DollarSign, Phone, Mail, Award, Users } from 'lucide-react'
import { FormField, useFormSubmission, FormSuccess, FormError, validateForm } from './FormComponents'

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
  whyPartner: string
  preferredTier: string
}

const serviceTypes = [
  { value: 'property-management', label: 'Property Management' },
  { value: 'estate-agent', label: 'Estate Agent' },
  { value: 'removals', label: 'Removals & Storage' },
  { value: 'legal-services', label: 'Legal Services' },
  { value: 'financial-services', label: 'Financial Services' },
  { value: 'interior-design', label: 'Interior Design' },
  { value: 'home-services', label: 'Home Services' },
  { value: 'education', label: 'Education Consultants' },
  { value: 'pet-services', label: 'Pet Relocation' },
  { value: 'other', label: 'Other (please specify)' }
]

const territories = [
  { value: 'central-london', label: 'Central London (Zones 1-2)' },
  { value: 'greater-london', label: 'Greater London (All Zones)' },
  { value: 'canary-wharf', label: 'Canary Wharf & East London' },
  { value: 'west-london', label: 'West London (Kensington, Chelsea, Hammersmith)' },
  { value: 'north-london', label: 'North London (Camden, Islington, Hampstead)' },
  { value: 'south-london', label: 'South London (Clapham, Wandsworth, Greenwich)' },
  { value: 'specific-borough', label: 'Specific Borough (please specify)' }
]

const leadVolumes = [
  { value: '5-10', label: '5-10 leads per month' },
  { value: '10-20', label: '10-20 leads per month' },
  { value: '20-50', label: '20-50 leads per month' },
  { value: '50+', label: '50+ leads per month' }
]

const marketingBudgets = [
  { value: '0-500', label: '£0 - £500 per month' },
  { value: '500-1500', label: '£500 - £1,500 per month' },
  { value: '1500-3000', label: '£1,500 - £3,000 per month' },
  { value: '3000-5000', label: '£3,000 - £5,000 per month' },
  { value: '5000+', label: '£5,000+ per month' }
]

// NEW CHARTER PARTNERSHIP TIERS - 2025 UPDATE
const partnershipTiers = [
  { value: 'founding_partner', label: '🏆 Founding Partner - £25,000 (12 months)' },
  { value: 'premium_sponsor', label: '⭐ Premium Sponsor - £5,000 (90 days)' }
]

export default function PartnerApplicationForm() {
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
    whyPartner: '',
    preferredTier: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { isSubmitting, isSuccess, error, submitForm } = useFormSubmission()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const requiredFields = [
      'companyName', 'serviceType', 'contactName', 'contactTitle', 
      'phone', 'email', 'territory', 'monthlyLeads', 'marketingSpend', 'preferredTier'
    ]
    
    const formErrors = validateForm(formData, requiredFields)
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      const result = await submitForm('/api/forms/partner-application', {
        ...formData,
        formType: 'partner-application',
        submittedAt: new Date().toISOString()
      })
      
      // If Stripe checkout URL is returned, redirect to payment
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl
        return
      }
      
      // Reset form on success
      setFormData({
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
        whyPartner: '',
        preferredTier: ''
      })
    } catch (err) {
      // Error handled by useFormSubmission
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-md shadow-lg p-8 border border-[#0B1B2B]/10">
        <FormSuccess message="Your partner application has been submitted! We're reviewing your application and will contact you within 24 hours to discuss the next steps." />
        
        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-md p-6">
          <div className="flex items-start gap-3">
            <Award className="h-6 w-6 text-[#C9A24A] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Next Steps in Your Partner Journey:</h4>
              <ul className="text-sm text-[#6B7280] space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Email confirmation sent to your inbox
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Application review within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Partner onboarding call scheduled
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Access to partner portal and lead flow
                </li>
              </ul>
              <p className="text-sm text-[#0B1220] mt-3 font-medium">
                Questions? Call our partner team: +44 20 7946 0960
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-md shadow-lg p-8 border border-[#0B1B2B]/10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-[#C9A24A]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0B1220]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join Relo Network Partnership
            </h3>
            <p className="text-[#C9A24A] font-medium">London's Most Exclusive Relocation Network</p>
          </div>
        </div>
        <p className="text-[#6B7280]">
          Apply to join our vetted network of premium service providers. Only 23% of applications are approved.
        </p>
        
        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-md p-4 mt-4">
          <p className="text-sm text-[#C9A24A] font-medium">
            🏆 Charter Partnership: Limited to 12 founding positions. Closing Sept 26, 2025.
          </p>
          <p className="text-xs text-[#C9A24A]/70 mt-1">
            ⚡ Updated: 25/09/2025 - Latest Version
          </p>
        </div>
      </div>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Your company name"
              error={errors.companyName}
            />
            
            <FormField
              label="Service Type"
              name="serviceType"
              type="select"
              value={formData.serviceType}
              onChange={handleChange}
              required
              options={serviceTypes}
              error={errors.serviceType}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              label="Website URL"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
            />
            
            <FormField
              label="Preferred Territory"
              name="territory"
              type="select"
              value={formData.territory}
              onChange={handleChange}
              required
              options={territories}
              icon={<MapPin className="h-4 w-4" />}
              error={errors.territory}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4">Contact Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Contact Name"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              error={errors.contactName}
            />
            
            <FormField
              label="Job Title"
              name="contactTitle"
              value={formData.contactTitle}
              onChange={handleChange}
              required
              placeholder="Your role/title"
              error={errors.contactTitle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+44 20 xxxx xxxx"
              icon={<Phone className="h-4 w-4" />}
              error={errors.phone}
            />
            
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@company.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email}
            />
          </div>
        </div>

        {/* Business Details */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Business & Growth Plans
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Expected Monthly Leads"
              name="monthlyLeads"
              type="select"
              value={formData.monthlyLeads}
              onChange={handleChange}
              required
              options={leadVolumes}
              error={errors.monthlyLeads}
            />
            
            <FormField
              label="Current Marketing Spend"
              name="marketingSpend"
              type="select"
              value={formData.marketingSpend}
              onChange={handleChange}
              required
              options={marketingBudgets}
              icon={<DollarSign className="h-4 w-4" />}
              error={errors.marketingSpend}
            />
          </div>

          <div className="mt-6">
            <FormField
              label="Preferred Partnership Tier"
              name="preferredTier"
              type="select"
              value={formData.preferredTier}
              onChange={handleChange}
              required
              options={partnershipTiers}
              error={errors.preferredTier}
            />
          </div>
        </div>

        {/* Experience & Motivation */}
        <div>
          <h4 className="font-semibold text-[#0B1220] mb-4">Tell Us About Your Business</h4>
          
          <div className="space-y-6">
            <FormField
              label="Years of Experience"
              name="experience"
              type="textarea"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your company's experience in the London market, key achievements, certifications, and what makes you stand out..."
            />
            
            <FormField
              label="Why Relo Network?"
              name="whyPartner"
              type="textarea"
              value={formData.whyPartner}
              onChange={handleChange}
              placeholder="Why do you want to partner with Relo Network? What are your growth goals and how can our partnership help achieve them?"
            />
          </div>
        </div>

        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-md p-4">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-[#C9A24A] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#0B1220] mb-1">Charter Partnership Benefits</h4>
              <ul className="text-sm text-[#6B7280] space-y-1">
                <li>• Category exclusivity (Founding Partner)</li>
                <li>• Homepage placement & concierge routing</li>
                <li>• Professional network access</li>
                <li>• 90-day opportunity guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white text-lg py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          {isSubmitting ? 'Processing Application...' : 'Apply for Charter Partnership'} 
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-xs text-[#6B7280] text-center">
          By submitting this application, you agree to our partner terms. We'll review your application within 24 hours and contact you to discuss next steps.
        </p>
      </form>
    </div>
  )
}