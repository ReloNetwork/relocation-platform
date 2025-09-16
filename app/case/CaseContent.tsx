'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
// import { Button } from '@/ui/components/button'
import { calculateSLAStatus } from '@/lib/sla'
import MessagesPanel from './MessagesPanel'
import type { User } from '@supabase/supabase-js'
import type { Task, Appointment, Document, MoveCase, Organization } from '@/types/db'

interface CaseContentProps {
  user: User
  organization: Organization
  moveCase: MoveCase
  tasks: Task[]
  appointments: Appointment[]
  documents: Document[]
}

export default function CaseContent({ 
  user, 
  organization, 
  moveCase, 
  tasks, 
  appointments, 
  documents 
}: CaseContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSLAColor = (status: string) => {
    switch (status) {
      case 'at_risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'breached': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocation Case Management
          </h1>
          <div className="flex items-center gap-4 text-[#6B7280]">
            <span>Case ID: {moveCase.id.slice(0, 8)}</span>
            <span>•</span>
            <span>{organization.name}</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(moveCase.status)}`}>
              {moveCase.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Case Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#6B7280]">Origin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#0B1B2B]">{moveCase.origin_city}</p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#6B7280]">Destination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#0B1B2B]">{moveCase.destination_city}</p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#6B7280]">Move Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#0B1B2B]">
                {formatDate(moveCase.move_date)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#6B7280]">Service Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-[#C9A24A]">
                {moveCase.service_tier?.replace('_', ' ') || 'Standard'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-xl text-[#0B1B2B]">Tasks & Milestones</CardTitle>
              <CardDescription>
                Track your relocation progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <div className="space-y-4">
                  {tasks.map((task) => {
                    const slaStatus = calculateSLAStatus(task.created_at, task.due_date, task.title)
                    
                    return (
                      <div key={task.id} className="border border-[#E5E7EB] rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-[#0B1B2B]">{task.title}</h4>
                          <div className="flex gap-2 flex-wrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                            {slaStatus.status !== 'ok' && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSLAColor(slaStatus.status)}`}>
                                {slaStatus.status === 'at_risk' ? 'At Risk' : 'Breached'}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-3">{task.description}</p>
                        <div className="flex justify-between items-center text-xs text-[#6B7280]">
                          <div>
                            {task.due_date && (
                              <span>Due: {formatDate(task.due_date)}</span>
                            )}
                          </div>
                          {slaStatus.status !== 'ok' && (
                            <span className={`font-medium ${slaStatus.status === 'breached' ? 'text-red-600' : 'text-yellow-600'}`}>
                              {slaStatus.status === 'breached' ? `${slaStatus.hoursOver}h over` : `${slaStatus.hoursRemaining}h left`}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-[#6B7280] text-center py-8">
                  No tasks assigned yet.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Middle Column - Appointments */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-xl text-[#0B1B2B]">Appointments</CardTitle>
              <CardDescription>
                Your scheduled meetings and viewings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#0B1B2B]">{appointment.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-3">{appointment.description}</p>
                      <div className="flex items-center justify-between text-xs text-[#6B7280]">
                        <span>{formatDateTime(appointment.start_time)}</span>
                        <span className="capitalize bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded-full">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#6B7280] mb-4">No appointments scheduled</p>
                  <button className="bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white px-4 py-2 rounded-md">
                    Schedule Meeting
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Messages */}
          <MessagesPanel caseId={moveCase.id} currentUserId={user.id} />

          {/* Documents */}
          <Card className="border-[#E5E7EB] lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl text-[#0B1B2B]">Documents</CardTitle>
              <CardDescription>
                Important files and documentation for your move
              </CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((document) => (
                    <div key={document.id} className="border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#0B1B2B]">{document.name}</h4>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#C9A24A]/10 text-[#C9A24A]">
                          {document.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B7280] space-y-1">
                        <p>Type: {document.file_type}</p>
                        <p>Size: {(document.file_size / 1024).toFixed(1)} KB</p>
                        <p>Uploaded: {formatDate(document.created_at)}</p>
                      </div>
                      <button className="mt-3 w-full border border-[#E5E7EB] text-[#0B1B2B] px-3 py-2 rounded-md text-sm hover:bg-gray-50">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#6B7280] mb-4">No documents uploaded yet</p>
                  <button className="bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white px-4 py-2 rounded-md">
                    Upload Document
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}