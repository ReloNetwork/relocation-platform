'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { ArrowRight, Building, User, Clock, DollarSign, Phone, Mail, AlertTriangle } from 'lucide-react'
import { FormField, useFormSubmission, FormSuccess, FormError, validateForm } from './FormComponents'

interface CorporateFormData {
  companyName: string
  contactName: string
  contactTitle: string
  employeeName: string
  employeeRole: string
  timeline: string
  budget: string
  phone: string
  email: string
  requirements: string
}

const timelineOptions = [
  { value: 'urgent', label: 'Urgent (Within 2 weeks)' },
  { value: '1month', label: 'Within 1 month' },
  { value: '2months', label: 'Within 2 months' },
  { value: '3months', label: 'Within 3 months' }
]

const budgetOptions = [
  { value: '2000-3000', label: '£2,000 - £3,000 per month' },
  { value: '3000-5000', label: '£3,000 - £5,000 per month' },
  { value: '5000-8000', label: '£5,000 - £8,000 per month' },
  { value: '8000-12000', label: '£8,000 - £12,000 per month' },
  { value: '12000+', label: '£12,000+ per month' }
]

export default function CorporateEmergencyForm() {
  const [formData, setFormData] = useState<CorporateFormData>({
    companyName: '',
    contactName: '',
    contactTitle: '',
    employeeName: '',
    employeeRole: '',
    timeline: '',
    budget: '',
    phone: '',
    email: '',
    requirements: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const { isSubmitting, isSuccess, error, submitForm } = useFormSubmission()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const requiredFields = [
      'companyName', 'contactName', 'contactTitle', 'employeeName', 
      'employeeRole', 'timeline', 'budget', 'phone', 'email'
    ]
    
    const formErrors = validateForm(formData, requiredFields)
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      await submitForm('/api/forms/corporate-emergency', {
        ...formData,
        formType: 'corporate-emergency',
        submittedAt: new Date().toISOString(),
        urgent: formData.timeline === 'urgent'
      })
      
      // Reset form on success
      setFormData({
        companyName: '',
        contactName: '',
        contactTitle: '',
        employeeName: '',
        employeeRole: '',
        timeline: '',
        budget: '',
        phone: '',
        email: '',
        requirements: ''
      })
    } catch (err) {
      // Error is handled by useFormSubmission
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-md shadow-lg p-8 border border-[#0B1B2B]/10">
        <FormSuccess message="We've received your emergency relocation request. Our corporate team will contact you within 2 hours to discuss your requirements." />
        
        <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#C9A24A] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#0B1220] mb-1">Next Steps:</h4>
              <ul className="text-sm text-[#6B7280] space-y-1">
                <li>• You'll receive an email confirmation within 5 minutes</li>
                <li>• Our emergency response team will call you within 2 hours</li>
                <li>• We'll provide a detailed relocation plan within 24 hours</li>
                <li>• For immediate assistance: +44 20 7946 0958</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-md shadow-lg p-8 border border-[#0B1B2B]/10">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#0B1220] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Emergency Corporate Relocation Request
        </h3>
        <p className="text-[#6B7280]">
          Get immediate assistance for urgent employee relocations. Our emergency response team will contact you within 2 hours.
        </p>
      </div>

      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Your company name"
            icon={<Building className="h-4 w-4" />}
            error={errors.companyName}
          />
          
          <FormField
            label="Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            placeholder="Your full name"
            icon={<User className="h-4 w-4" />}
            error={errors.contactName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Contact Title"
            name="contactTitle"
            value={formData.contactTitle}
            onChange={handleChange}
            required
            placeholder="Your job title"
            error={errors.contactTitle}
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

        <div className="border-t border-[#E5E7EB] pt-6">
          <h4 className="font-semibold text-[#0B1220] mb-4">Employee Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
              placeholder="Employee being relocated"
              error={errors.employeeName}
            />
            
            <FormField
              label="Employee Role"
              name="employeeRole"
              value={formData.employeeRole}
              onChange={handleChange}
              required
              placeholder="Their job title/role"
              error={errors.employeeRole}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Relocation Timeline"
            name="timeline"
            type="select"
            value={formData.timeline}
            onChange={handleChange}
            required
            options={timelineOptions}
            icon={<Clock className="h-4 w-4" />}
            error={errors.timeline}
          />
          
          <FormField
            label="Monthly Budget Range"
            name="budget"
            type="select"
            value={formData.budget}
            onChange={handleChange}
            required
            options={budgetOptions}
            icon={<DollarSign className="h-4 w-4" />}
            error={errors.budget}
          />
        </div>

        <FormField
          label="Specific Requirements"
          name="requirements"
          type="textarea"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Tell us about any specific needs: family size, pet-friendly, accessibility requirements, preferred areas, etc."
        />

        <div className="bg-[#FEF3CD] border border-[#F59E0B]/20 rounded-md p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#F59E0B] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#92400E] mb-1">Emergency Service Guarantee</h4>
              <p className="text-sm text-[#92400E]">
                We guarantee contact within 2 hours for urgent requests. Our emergency relocation specialists are available 24/7.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-4 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
          size="lg"
        >
          {isSubmitting ? 'Submitting Request...' : 'Book Emergency Call Now'} 
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-xs text-[#6B7280] text-center">
          By submitting this form, you agree to be contacted by our emergency response team. 
          We'll call you within 2 hours to discuss your urgent relocation needs.
        </p>
      </form>
    </div>
  )
}