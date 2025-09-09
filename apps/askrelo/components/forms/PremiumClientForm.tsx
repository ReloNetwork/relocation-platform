'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { ArrowRight, User, Calendar, Home, MapPin, Users, Building, Phone, Mail, Star, Clock } from 'lucide-react'
import { FormField, useFormSubmission, FormSuccess, FormError, validateForm } from './FormComponents'

interface ClientFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  timeline: string
  budget: string
  bedrooms: string
  neighborhoods: string
  familySize: string
  hasChildren: string
  hasPets: string
  employer: string
  relocationType: string
  currentLocation: string
  specialRequirements: string
  hearAboutUs: string
}

const timelineOptions = [
  { value: 'asap', label: 'ASAP (Within 2 weeks)' },
  { value: '1month', label: 'Within 1 month' },
  { value: '2months', label: 'Within 2 months' },
  { value: '3months', label: 'Within 3 months' },
  { value: 'flexible', label: 'Flexible timing' }
]

const budgetRanges = [
  { value: '1500-2500', label: '£1,500 - £2,500 per month' },
  { value: '2500-4000', label: '£2,500 - £4,000 per month' },
  { value: '4000-6000', label: '£4,000 - £6,000 per month' },
  { value: '6000-8000', label: '£6,000 - £8,000 per month' },
  { value: '8000-12000', label: '£8,000 - £12,000 per month' },
  { value: '12000+', label: '£12,000+ per month' }
]

const bedroomOptions = [
  { value: 'studio', label: 'Studio' },
  { value: '1bed', label: '1 bedroom' },
  { value: '2bed', label: '2 bedrooms' },
  { value: '3bed', label: '3 bedrooms' },
  { value: '4bed+', label: '4+ bedrooms' }
]

const familySizeOptions = [
  { value: 'single', label: 'Just me' },
  { value: 'couple', label: 'Couple' },
  { value: 'small-family', label: 'Small family (3-4 people)' },
  { value: 'large-family', label: 'Large family (5+ people)' }
]

const relocationTypes = [
  { value: 'personal', label: 'Personal relocation' },
  { value: 'corporate', label: 'Corporate relocation' },
  { value: 'student', label: 'Student/Academic' },
  { value: 'investment', label: 'Investment property' }
]

const hearAboutUsOptions = [
  { value: 'google', label: 'Google search' },
  { value: 'referral', label: 'Friend/colleague referral' },
  { value: 'social-media', label: 'Social media' },
  { value: 'employer', label: 'Through my employer' },
  { value: 'other', label: 'Other' }
]

export default function PremiumClientForm() {
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeline: '',
    budget: '',
    bedrooms: '',
    neighborhoods: '',
    familySize: '',
    hasChildren: '',
    hasPets: '',
    employer: '',
    relocationType: '',
    currentLocation: '',
    specialRequirements: '',
    hearAboutUs: ''
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
      'firstName', 'lastName', 'email', 'phone', 'timeline', 
      'budget', 'bedrooms', 'familySize', 'relocationType'
    ]
    
    const formErrors = validateForm(formData, requiredFields)
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      await submitForm('/api/forms/premium-client', {
        ...formData,
        formType: 'premium-client',
        submittedAt: new Date().toISOString(),
        isUrgent: formData.timeline === 'asap'
      })
      
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        timeline: '',
        budget: '',
        bedrooms: '',
        neighborhoods: '',
        familySize: '',
        hasChildren: '',
        hasPets: '',
        employer: '',
        relocationType: '',
        currentLocation: '',
        specialRequirements: '',
        hearAboutUs: ''
      })
    } catch (err) {
      // Error handled by useFormSubmission
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-md shadow-lg p-8 border border-[#0B1B2B]/10">
        <FormSuccess message="Your consultation request has been received! Our premium relocation specialists will contact you within 4 hours to begin your personalized London property search." />
        
        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-md p-6">
          <div className="flex items-start gap-3">
            <Star className="h-6 w-6 text-[#C9A24A] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Your Premium Experience Starts Now:</h4>
              <ul className="text-sm text-[#6B7280] space-y-2">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C9A24A]" />
                  Consultation call within 4 hours
                </li>
                <li className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-[#C9A24A]" />
                  Personalized property shortlist within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C9A24A]" />
                  Viewing coordination and expert guidance
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#C9A24A]" />
                  Dedicated relocation specialist assigned
                </li>
              </ul>
              <div className="mt-4 p-3 bg-[#0B1B2B] rounded-md">
                <p className="text-white text-sm font-medium">
                  📱 Emergency Contact: +44 20 7946 0959 (Available 24/7)
                </p>
              </div>
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
            <Star className="h-6 w-6 text-[#C9A24A]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0B1220]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Start Your Premium London Experience
            </h3>
            <p className="text-[#C9A24A] font-medium">Expert-guided relocation service</p>
          </div>
        </div>
        <p className="text-[#6B7280]">
          Begin your personalized London property search with our premium relocation specialists. We'll contact you within 4 hours to start your consultation.
        </p>
      </div>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Your first name"
              error={errors.firstName}
            />
            
            <FormField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Your last name"
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email}
            />
            
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              label="Current Location"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              placeholder="City/Country you're moving from"
            />
            
            <FormField
              label="Relocation Type"
              name="relocationType"
              type="select"
              value={formData.relocationType}
              onChange={handleChange}
              required
              options={relocationTypes}
              error={errors.relocationType}
            />
          </div>
        </div>

        {/* Property Requirements */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Requirements
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Timeline"
              name="timeline"
              type="select"
              value={formData.timeline}
              onChange={handleChange}
              required
              options={timelineOptions}
              icon={<Calendar className="h-4 w-4" />}
              error={errors.timeline}
            />
            
            <FormField
              label="Monthly Budget"
              name="budget"
              type="select"
              value={formData.budget}
              onChange={handleChange}
              required
              options={budgetRanges}
              error={errors.budget}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              label="Bedrooms Needed"
              name="bedrooms"
              type="select"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              options={bedroomOptions}
              error={errors.bedrooms}
            />
            
            <FormField
              label="Preferred Neighborhoods"
              name="neighborhoods"
              value={formData.neighborhoods}
              onChange={handleChange}
              placeholder="e.g., Canary Wharf, Kensington, Clapham"
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Family & Lifestyle */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <h4 className="font-semibold text-[#0B1220] mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Family & Lifestyle
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Family Size"
              name="familySize"
              type="select"
              value={formData.familySize}
              onChange={handleChange}
              required
              options={familySizeOptions}
              error={errors.familySize}
            />
            
            <FormField
              label="Children?"
              name="hasChildren"
              type="select"
              value={formData.hasChildren}
              onChange={handleChange}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />
            
            <FormField
              label="Pets?"
              name="hasPets"
              type="select"
              value={formData.hasPets}
              onChange={handleChange}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]}
            />
          </div>

          {formData.relocationType === 'corporate' && (
            <div className="mt-6">
              <FormField
                label="Employer/Company"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
                placeholder="Company name (if corporate relocation)"
                icon={<Building className="h-4 w-4" />}
              />
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="font-semibold text-[#0B1220] mb-4">Additional Information</h4>
          
          <div className="space-y-6">
            <FormField
              label="Special Requirements"
              name="specialRequirements"
              type="textarea"
              value={formData.specialRequirements}
              onChange={handleChange}
              placeholder="Any specific needs: accessibility requirements, parking, garden, study space, proximity to schools, etc."
            />
            
            <FormField
              label="How did you hear about us?"
              name="hearAboutUs"
              type="select"
              value={formData.hearAboutUs}
              onChange={handleChange}
              options={hearAboutUsOptions}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#0B1B2B]/10 border border-[#C9A24A]/20 rounded-md p-6">
          <div className="flex items-start gap-3">
            <Star className="h-6 w-6 text-[#C9A24A] mt-0.5" />
            <div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Premium Service Guarantee</h4>
              <ul className="text-sm text-[#6B7280] space-y-1">
                <li>✓ Personal consultation within 4 hours</li>
                <li>✓ Curated property shortlist within 24 hours</li>
                <li>✓ Dedicated relocation specialist</li>
                <li>✓ VIP viewing coordination</li>
                <li>✓ End-to-end support until move-in</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#C9A24A] to-[#0B1B2B] hover:from-[#B8923D] hover:to-[#0B1B2B]/90 text-white text-lg py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          {isSubmitting ? 'Submitting Request...' : 'Start Premium Consultation'} 
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-xs text-[#6B7280] text-center">
          By submitting this form, you agree to be contacted by our premium relocation team. 
          We'll call you within 4 hours to begin your personalized London property search.
        </p>
      </form>
    </div>
  )
}