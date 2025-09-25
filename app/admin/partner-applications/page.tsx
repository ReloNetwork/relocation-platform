'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

export default function PartnerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [statusFilter])

  const fetchApplications = async () => {
    try {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : ''
      const response = await fetch(`/api/partners/applications${params}`)
      const result = await response.json()
      
      if (result.ok) {
        setApplications(result.applications || [])
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  const viewApplication = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/partners/applications/${applicationId}`)
      const result = await response.json()
      
      if (result.ok) {
        setSelectedApplication(result.application)
      }
    } catch (error) {
      console.error('Error fetching application details:', error)
    }
  }

  const updateApplicationStatus = async (applicationId: string, status: string, rejectionReason?: string) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`/api/partners/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          applicationStatus: status,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'Admin User', // In production, use actual admin user
          ...(rejectionReason && { rejectionReason })
        })
      })

      const result = await response.json()

      if (result.ok) {
        setMessage(`Application ${status} successfully`)
        fetchApplications()
        setSelectedApplication(null)
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('An error occurred while updating the application')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  const getTierBadge = (tier: string) => {
    const badges = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800',
      gold: 'bg-yellow-100 text-yellow-800'
    }
    return badges[tier as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partner Applications
            </h1>
            <p className="text-[#6B7280] text-lg">
              Review and manage partner applications
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex space-x-4">
              {[
                { value: 'all', label: 'All Applications' },
                { value: 'pending', label: 'Pending' },
                { value: 'under_review', label: 'Under Review' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    statusFilter === filter.value
                      ? 'bg-[#C9A24A] text-white'
                      : 'bg-white text-[#0B1B2B] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#0B1B2B]/10">
                <div className="p-6 border-b border-[#E5E7EB]">
                  <h2 className="text-xl font-semibold text-[#0B1B2B]">
                    Applications ({applications.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-[#E5E7EB]">
                  {applications.map(application => (
                    <div
                      key={application.id}
                      className="p-6 hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                      onClick={() => viewApplication(application.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#0B1B2B] mb-1">
                            {application.companyName}
                          </h3>
                          <p className="text-[#6B7280] text-sm mb-2">
                            {application.contactPerson} • {application.email}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(application.applicationStatus)}`}>
                              {application.applicationStatus.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierBadge(application.membershipTier)}`}>
                              {application.membershipTier} tier
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {application.category}
                            </span>
                          </div>
                          <p className="text-[#6B7280] text-sm">
                            Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[#6B7280] mb-1">
                            {application.services.length} services
                          </div>
                          <div className={`text-sm font-medium ${
                            application.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            Payment: {application.paymentStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {applications.length === 0 && (
                    <div className="p-12 text-center text-[#6B7280]">
                      No applications found for the selected filter.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="lg:col-span-1">
              {selectedApplication ? (
                <div className="bg-white rounded-2xl shadow-sm border border-[#0B1B2B]/10 p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">
                      {selectedApplication.companyName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedApplication.applicationStatus)}`}>
                        {selectedApplication.applicationStatus.replace('_', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBadge(selectedApplication.membershipTier)}`}>
                        {selectedApplication.membershipTier} tier
                      </span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B1B2B] mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Contact:</span> {selectedApplication.contactPerson}</div>
                      <div><span className="font-medium">Email:</span> {selectedApplication.email}</div>
                      <div><span className="font-medium">Phone:</span> {selectedApplication.phone}</div>
                      {selectedApplication.website && (
                        <div><span className="font-medium">Website:</span> 
                          <a href={selectedApplication.website} target="_blank" rel="noopener noreferrer" className="text-[#C9A24A] hover:underline ml-1">
                            {selectedApplication.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B1B2B] mb-3">Services</h4>
                    <div className="text-sm text-[#6B7280] mb-2">Category: {selectedApplication.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedApplication.services.map((service: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-[#F3F4F6] rounded text-xs">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B1B2B] mb-3">Description</h4>
                    <p className="text-sm text-[#6B7280]">{selectedApplication.description}</p>
                  </div>

                  {/* Credentials */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B1B2B] mb-3">Credentials</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Registration:</span> {selectedApplication.businessRegistration}</div>
                      <div><span className="font-medium">Insurance:</span> {selectedApplication.insurance}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedApplication.certifications.map((cert: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* References */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0B1B2B] mb-3">References</h4>
                    {selectedApplication.references.map((ref: any, index: number) => (
                      <div key={index} className="text-sm border border-[#E5E7EB] rounded-lg p-3 mb-2">
                        <div className="font-medium">{ref.name}</div>
                        <div className="text-[#6B7280]">{ref.company}</div>
                        <div className="text-[#6B7280]">{ref.email} • {ref.phone}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {selectedApplication.applicationStatus === 'pending' || selectedApplication.applicationStatus === 'under_review' ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'under_review')}
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Processing...' : 'Mark Under Review'}
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                        disabled={loading}
                        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Processing...' : 'Approve Application'}
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Please provide a reason for rejection:')
                          if (reason) {
                            updateApplicationStatus(selectedApplication.id, 'rejected', reason)
                          }
                        }}
                        disabled={loading}
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                      >
                        {loading ? 'Processing...' : 'Reject Application'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-[#6B7280]">
                      Application has been {selectedApplication.applicationStatus}
                      {selectedApplication.reviewedAt && (
                        <div className="text-sm mt-1">
                          on {new Date(selectedApplication.reviewedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-[#0B1B2B]/10 p-6">
                  <div className="text-center text-[#6B7280]">
                    <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p>Select an application to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl border ${
              message.includes('successfully')
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="text-sm font-medium">{message}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}