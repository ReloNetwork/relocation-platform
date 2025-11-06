'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AITalentAssessmentTest() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted!')
    setIsSubmitting(true)
    
    // Get form data
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    try {
      // Try Supabase endpoint
      const response = await fetch('/api/submit-ai-talent-supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      console.log('Response:', result)
      
      // Show confirmation regardless of API result
      setIsSubmitted(true)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error:', error)
      // Still show confirmation
      setIsSubmitted(true)
      setIsSubmitting(false)
    }
  }
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Assessment Received!</h1>
          <p className="text-lg mb-6">We will contact you within 2 hours.</p>
          <Link href="/" className="bg-[#C9A24A] text-white px-6 py-3 rounded-lg inline-block">
            Return Home
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <header className="bg-white border-b p-4">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="inline h-4 w-4 mr-2" />
          Back
        </Link>
      </header>
      
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">AI Talent Assessment - TEST</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Company Name *</label>
            <input
              type="text"
              name="companyName"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Contact Name *</label>
            <input
              type="text"
              name="contactName"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Email *</label>
            <input
              type="email"
              name="contactEmail"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Phone *</label>
            <input
              type="tel"
              name="contactPhone"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#C9A24A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#B8913A] disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </form>
      </div>
    </div>
  )
}