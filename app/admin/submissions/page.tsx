'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Clock, MapPin, Mail, Phone, Calendar, DollarSign } from 'lucide-react'

export default function SubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
    // Refresh every 30 seconds
    const interval = setInterval(fetchSubmissions, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchSubmissions = async () => {
    try {
      // Fetch from Supabase endpoint
      const response = await fetch('/api/submit-ai-talent-supabase')
      if (response.ok) {
        const data = await response.json()
        // Map Supabase field names to display format
        const mappedSubmissions = (data.submissions || []).map((sub: any) => ({
          id: sub.reference_number || sub.id,
          timestamp: sub.created_at,
          // Company Info
          companyName: sub.company_name,
          companyWebsite: sub.company_website,
          industry: sub.industry,
          officeLocation: sub.office_location,
          // Contact Info
          contactName: sub.contact_name,
          contactRole: sub.contact_role,
          contactEmail: sub.contact_email,
          contactPhone: sub.contact_phone,
          // AI Talent
          talentRole: sub.talent_role,
          seniorityLevel: sub.seniority_level,
          currentLocation: sub.current_location,
          targetStartDate: sub.target_start_date,
          salaryRange: sub.salary_range,
          // Relocation
          employeeCount: sub.employee_count,
          familySize: sub.family_size,
          childrenAges: sub.children_ages,
          spouseEmployment: sub.spouse_employment,
          // Priorities
          housingBudget: sub.housing_budget,
          preferredAreas: sub.preferred_areas,
          schoolRequirement: sub.school_requirement,
          // Additional
          urgencyLevel: sub.urgency_level,
          competingOffers: sub.competing_offers,
          visaStatus: sub.visa_status,
          petRelocation: sub.pet_relocation,
          specialRequirements: sub.special_requirements,
          referralSource: sub.referral_source,
          status: sub.submission_status,
          responseDeadline: sub.response_deadline
        }))
        setSubmissions(mappedSubmissions)
      } else {
        console.error('Failed to fetch submissions')
        setSubmissions([])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={fetchSubmissions}
              className="bg-[#C9A24A] text-white px-4 py-2 rounded-lg hover:bg-[#B8913A] transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B1220] mb-2">AI Talent Assessment Submissions</h1>
          <p className="text-gray-600">All form submissions are shown below. Auto-refreshes every 30 seconds.</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A24A]"></div>
            <p className="mt-4 text-gray-600">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600">Submissions will appear here when the form is completed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.reverse().map((submission, index) => (
              <div key={submission.id || index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1220]">
                      {submission.companyName || 'Unknown Company'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Submitted: {new Date(submission.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {submission.id}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#C9A24A]" />
                    <span className="text-sm">
                      <strong>{submission.contactName}</strong> ({submission.contactRole})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#C9A24A]" />
                    <span className="text-sm">{submission.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#C9A24A]" />
                    <span className="text-sm">{submission.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#C9A24A]" />
                    <span className="text-sm">Office: {submission.officeLocation || 'Not specified'}</span>
                  </div>
                </div>

                {/* AI Talent Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Role</p>
                    <p className="font-medium">{submission.talentRole || 'Not specified'}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Seniority</p>
                    <p className="font-medium">{submission.seniorityLevel || 'Not specified'}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">From</p>
                    <p className="font-medium">{submission.currentLocation || 'Not specified'}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Start Date</p>
                    <p className="font-medium">{submission.targetStartDate || 'Not specified'}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Employee Count</p>
                    <p className="font-medium">{submission.employeeCount || '1'}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Urgency</p>
                    <p className="font-medium">{submission.urgencyLevel || 'urgent'}</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                    <p className="font-medium">{submission.salaryRange || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Housing Budget</p>
                    <p className="font-medium">{submission.housingBudget || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Family Size</p>
                    <p className="font-medium">{submission.familySize || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Children Ages</p>
                    <p className="font-medium">{submission.childrenAges || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">School Requirement</p>
                    <p className="font-medium">{submission.schoolRequirement || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Spouse Employment</p>
                    <p className="font-medium">{submission.spouseEmployment || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Visa Status</p>
                    <p className="font-medium">{submission.visaStatus || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pet Relocation</p>
                    <p className="font-medium">{submission.petRelocation || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Competing Offers</p>
                    <p className="font-medium">{submission.competingOffers || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Referral Source</p>
                    <p className="font-medium">{submission.referralSource || 'Not specified'}</p>
                  </div>
                </div>

                {/* Preferred Areas */}
                {submission.preferredAreas && submission.preferredAreas.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preferred Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {submission.preferredAreas.map((area: string) => (
                        <span key={area} className="bg-[#C9A24A]/10 text-[#C9A24A] px-3 py-1 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Requirements */}
                {submission.specialRequirements && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Special Requirements:</p>
                    <p className="text-sm text-yellow-700">{submission.specialRequirements}</p>
                  </div>
                )}

                {/* Action Required */}
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-bold text-red-800">
                    2-Hour Response Required - Contact by {
                      submission.responseDeadline 
                        ? new Date(submission.responseDeadline).toLocaleString()
                        : new Date(new Date(submission.timestamp).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString()
                    }
                  </p>
                  {submission.status && (
                    <p className="text-xs text-red-600 mt-1">
                      Status: {submission.status}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}