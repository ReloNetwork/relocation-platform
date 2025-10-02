'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Button } from '@/ui/components/button'
import type { User } from '@supabase/supabase-js'
import type { Task, Appointment, MoveCase, Organization } from '@/types/db'

interface DashboardContentProps {
  user: User
  organization: Organization
  moveCase: MoveCase
  tasks: Task[]
  appointments: Appointment[]
}

export default function DashboardContent({ 
  user, 
  organization, 
  moveCase, 
  tasks, 
  appointments 
}: DashboardContentProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'in_progress': return 'text-blue-600 bg-blue-50'
      case 'pending': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8">
      {/* Structured Data for Dashboard Activity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Relo Network Client Dashboard",
            "description": "Professional London relocation management dashboard for tracking move progress, tasks, and appointments",
            "applicationCategory": "RelocationManagement",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "Relo Network",
              "description": "London's exclusive relocation network for executives and high-net-worth individuals"
            },
            "featureList": [
              "Real-time relocation progress tracking",
              "Task management and milestone tracking",
              "Appointment scheduling with service providers",
              "Direct access to vetted London relocation specialists",
              "Personalized relocation timeline management",
              "Premium concierge service integration"
            ]
          }, null, 2)
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Welcome back, {user.user_metadata?.full_name || 'Valued Client'}
          </h1>
          <p className="text-[#6B7280] text-lg">
            Your relocation to <strong>{moveCase?.destination_city}</strong> is {' '}
            <span className="font-medium text-[#0B1B2B]">
              {moveCase?.status === 'planning' ? 'in planning' : moveCase?.status}
            </span>
          </p>
        </header>

        {/* Move Case Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" aria-label="Relocation Overview">
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#0B1B2B] text-lg">Move Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-[#6B7280]">Organization</p>
                <p className="font-medium text-[#0B1B2B]">{organization.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Route</p>
                <p className="font-medium text-[#0B1B2B]">
                  {moveCase?.origin_city} → {moveCase?.destination_city}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Target Date</p>
                <p className="font-medium text-[#0B1B2B]">
                  {moveCase?.move_date ? formatDate(moveCase.move_date) : 'Not set'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#0B1B2B] text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Tasks Completed</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-[#F3F4F6] rounded-full h-2 mr-3">
                      <div 
                        className="bg-[#C9A24A] h-2 rounded-full" 
                        style={{ 
                          width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100 : 0}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#0B1B2B]">
                      {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">Service Tier</p>
                  <span className="inline-block px-2 py-1 bg-[#C9A24A]/10 text-[#C9A24A] text-sm font-medium rounded-full">
                    {moveCase?.service_tier?.replace('_', ' ') || 'Standard'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#0B1B2B] text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0B1B2B]">
                Schedule Consultation
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0B1B2B]">
                View Properties
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E7EB] text-[#0B1B2B]">
                Contact Concierge
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks */}
          <section aria-label="Relocation Tasks">
            <Card className="border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-xl">Your Tasks</CardTitle>
                <CardDescription>
                  Keep track of your relocation milestones
                </CardDescription>
              </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <div className="space-y-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#0B1B2B]">{task.title}</h4>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-3">{task.description}</p>
                      {task.due_date && (
                        <p className="text-xs text-[#6B7280]">
                          Due: {formatDate(task.due_date)}
                        </p>
                      )}
                    </div>
                  ))}
                  {tasks.length > 5 && (
                    <Button variant="outline" className="w-full border-[#E5E7EB] text-[#0B1B2B]">
                      View All Tasks ({tasks.length})
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-[#6B7280] text-center py-8">
                  No tasks yet. Your personalized plan is being prepared.
                </p>
              )}
            </CardContent>
            </Card>
          </section>

          {/* Upcoming Appointments */}
          <section aria-label="Upcoming Appointments">
            <Card className="border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-xl">Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled consultations and viewings
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
                      <p className="text-sm text-[#6B7280] mb-2">{appointment.description}</p>
                      <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                        <span>{formatDate(appointment.start_time)}</span>
                        <span>{formatTime(appointment.start_time)}</span>
                        <span className="capitalize">{appointment.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#6B7280] mb-4">No upcoming appointments</p>
                  <Button className="bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white">
                    Schedule Consultation
                  </Button>
                </div>
              )}
            </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}