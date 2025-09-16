'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import type { User } from '@supabase/supabase-js'

interface OnboardingFormProps {
  user: User
}

export default function OnboardingForm({ user }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: user.user_metadata?.full_name || '',
    companyName: '',
    originCity: '',
    destinationCity: 'London',
    moveDate: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to complete onboarding')
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-[#E5E7EB] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0B1B2B]">
          Tell us about your move
        </CardTitle>
        <CardDescription className="text-[#6B7280]">
          This information helps us create your personalized relocation plan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] placeholder-[#9CA3AF] bg-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Company/Family Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] placeholder-[#9CA3AF] bg-white"
                placeholder="e.g., Goldman Sachs or The Smith Family"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="originCity" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Moving From
                </label>
                <input
                  id="originCity"
                  type="text"
                  required
                  value={formData.originCity}
                  onChange={(e) => updateFormData('originCity', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] placeholder-[#9CA3AF] bg-white"
                  placeholder="e.g., New York, Singapore"
                />
              </div>

              <div>
                <label htmlFor="destinationCity" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Moving To
                </label>
                <input
                  id="destinationCity"
                  type="text"
                  required
                  value={formData.destinationCity}
                  onChange={(e) => updateFormData('destinationCity', e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] placeholder-[#9CA3AF] bg-white"
                  placeholder="Destination city"
                />
              </div>
            </div>

            <div>
              <label htmlFor="moveDate" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Target Move Date
              </label>
              <input
                id="moveDate"
                type="date"
                required
                value={formData.moveDate}
                onChange={(e) => updateFormData('moveDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-[#F8FAFC] p-4 rounded-md border border-[#E2E8F0]">
            <h4 className="font-medium text-[#0B1B2B] mb-2">What happens next?</h4>
            <ul className="text-sm text-[#6B7280] space-y-1">
              <li>• We'll create your personalized relocation case</li>
              <li>• You'll get access to your dashboard with key tasks</li>
              <li>• Our AI concierge will start finding properties for you</li>
              <li>• Your dedicated account manager will be assigned</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white font-medium py-3"
          >
            {loading ? 'Setting up your account...' : 'Start My Relocation Journey'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}