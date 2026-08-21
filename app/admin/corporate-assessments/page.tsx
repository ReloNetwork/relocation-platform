'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { Building, Calendar, Mail, Phone, Users, Clock, FileText } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface CorporateAssessment {
  id: string
  reference_id: string
  company_name: string
  industry: string
  company_size: string
  first_name: string
  last_name: string
  email: string
  phone: string
  relocation_type: string
  employee_count: string
  timeline: string
  urgency: string
  current_challenges: string[]
  services_needed: string[]
  submitted_at: string
}

export default function CorporateAssessmentsAdminPage() {
  const [assessments, setAssessments] = useState<CorporateAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssessments()
  }, [])

  const fetchAssessments = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) {
        setError('Supabase is not configured')
        setLoading(false)
        return
      }
      const supabase = createClient(url, key)
      const { data, error } = await supabase
        .from('corporate_assessments')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) {
        setError('Failed to fetch assessments: ' + error.message)
      } else {
        setAssessments(data || [])
      }
    } catch (err) {
      setError('Failed to fetch assessments')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Urgent - need to start immediately':
        return 'bg-red-100 text-red-800'
      case 'High - within next month':
        return 'bg-orange-100 text-orange-800'
      case 'Medium - planning ahead':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <Layout><div className="p-8">Loading assessments...</div></Layout>
  if (error) return <Layout><div className="p-8 text-red-600">Error: {error}</div></Layout>

  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Corporate Assessment Submissions
          </h1>
          <p className="text-[#6B7280]">
            {assessments.length} assessment{assessments.length !== 1 ? 's' : ''} submitted
          </p>
        </div>

        {assessments.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Building className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">No Assessments Yet</h3>
            <p className="text-[#6B7280]">Corporate assessment submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-lg p-6 shadow-lg border border-[#E5E7EB]">
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1B2B] mb-1">
                      {assessment.company_name}
                    </h3>
                    <p className="text-[#6B7280]">
                      {assessment.first_name} {assessment.last_name} • {assessment.industry}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {assessment.urgency && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(assessment.urgency)}`}>
                        {assessment.urgency.split(' - ')[0]}
                      </span>
                    )}
                    <span className="text-sm text-[#6B7280]">
                      {assessment.reference_id}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${assessment.email}`} className="hover:text-[#C9A24A]">
                      {assessment.email}
                    </a>
                  </div>
                  {assessment.phone && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${assessment.phone}`} className="hover:text-[#C9A24A]">
                        {assessment.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Calendar className="w-4 h-4" />
                    {formatDate(assessment.submitted_at)}
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Company Size</span>
                    <p className="text-sm text-[#0B1B2B]">{assessment.company_size}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Employees</span>
                    <p className="text-sm text-[#0B1B2B]">{assessment.employee_count}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Timeline</span>
                    <p className="text-sm text-[#0B1B2B]">{assessment.timeline}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Type</span>
                    <p className="text-sm text-[#0B1B2B]">{assessment.relocation_type}</p>
                  </div>
                </div>

                {assessment.current_challenges && assessment.current_challenges.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 block">Key Challenges</span>
                    <div className="flex flex-wrap gap-2">
                      {assessment.current_challenges.map((challenge, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#C9A24A]/10 text-[#C9A24A] text-xs rounded">
                          {challenge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {assessment.services_needed && assessment.services_needed.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-2 block">Services Needed</span>
                    <div className="flex flex-wrap gap-2">
                      {assessment.services_needed.map((service, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#0B1B2B]/10 text-[#0B1B2B] text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
