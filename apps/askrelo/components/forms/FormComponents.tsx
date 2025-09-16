'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { ArrowRight, CheckCircle, AlertCircle, Phone, Mail, Building, User, Clock, DollarSign } from 'lucide-react'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  error?: string
  icon?: React.ReactNode
}

export const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  placeholder, 
  options, 
  value, 
  onChange, 
  error,
  icon 
}: FormFieldProps) => {
  const baseClasses = "w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-[#C9A24A] transition-colors"
  const errorClasses = error ? "border-red-500" : "border-[#E5E7EB]"
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#0B1220]">
        {icon && <span className="inline-flex items-center gap-2">{icon} {label}</span>}
        {!icon && label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' && options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}
      
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}

interface FormSubmissionState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

export const useFormSubmission = () => {
  const [state, setState] = useState<FormSubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  const submitForm = async (
    endpoint: string, 
    data: any, 
    successMessage?: string
  ) => {
    setState({ isSubmitting: true, isSuccess: false, error: null })
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      setState({ isSubmitting: false, isSuccess: true, error: null })
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isSuccess: false }))
      }, 5000)
      
      return result
    } catch (error) {
      setState({ 
        isSubmitting: false, 
        isSuccess: false, 
        error: error instanceof Error ? error.message : 'Something went wrong' 
      })
      throw error
    }
  }

  return { ...state, submitForm }
}

export const FormSuccess = ({ message }: { message: string }) => (
  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
    <div className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <div>
        <h3 className="text-green-800 font-medium">Form Submitted Successfully!</h3>
        <p className="text-green-700 text-sm mt-1">{message}</p>
      </div>
    </div>
  </div>
)

export const FormError = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
    <div className="flex items-center gap-3">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <div>
        <h3 className="text-red-800 font-medium">Submission Failed</h3>
        <p className="text-red-700 text-sm mt-1">{message}</p>
      </div>
    </div>
  </div>
)

// Phone number validation
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Form validation helper
export const validateForm = (data: Record<string, any>, required: string[]): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  required.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = 'This field is required'
    }
  })
  
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  return errors
}