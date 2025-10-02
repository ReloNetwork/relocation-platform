'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Button } from '@/ui/components/button'
import { Badge } from '@/ui/components/badge'
import { Calendar, Clock, Edit, X, Users, CheckCircle } from 'lucide-react'
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
  // Sample tasks for demo purposes when database is empty
  const sampleTasks = [
    {
      id: 'sample-1',
      title: 'Register Children for School',
      description: 'Complete school enrollment process for all children',
      status: 'pending',
      priority: 'high',
      due_date: '2024-03-01',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sample-2',
      title: 'Set up Utilities',
      description: 'Arrange electricity, gas, water, and Internet connections',
      status: 'pending',
      priority: 'medium',
      due_date: '2024-03-15',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sample-3',
      title: 'Register with Local GP',
      description: 'Find and register with local healthcare provider',
      status: 'pending',
      priority: 'low',
      due_date: '2024-03-30',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sample-4',
      title: 'Schedule Property Viewings',
      description: 'Arrange viewings for shortlisted properties in desired area',
      status: 'in_progress',
      priority: 'high',
      due_date: '2024-02-01',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sample-5',
      title: 'Open Bank Account',
      description: 'Set up local bank account and transfer initial funds',
      status: 'in_progress',
      priority: 'medium',
      due_date: '2024-02-10',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'sample-6',
      title: 'Submit Visa Application',
      description: 'Complete and submit visa application with required documents',
      status: 'completed',
      priority: 'high',
      due_date: '2024-01-15',
      move_case_id: 'sample',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]

  // Use sample tasks if no real tasks exist
  const displayTasks = tasks && tasks.length > 0 ? tasks : sampleTasks
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
                          width: `${displayTasks.length > 0 ? (displayTasks.filter(t => t.status === 'completed').length / displayTasks.length) * 100 : 0}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#0B1B2B]">
                      {displayTasks.filter(t => t.status === 'completed').length}/{displayTasks.length}
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

        {/* Kanban Board */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <section aria-label="To Do Tasks">
            <div className="bg-white rounded-lg border border-[#E5E7EB] h-fit">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0B1B2B]">To Do</h2>
                  <Badge variant="secondary" className="bg-[#F3F4F6] text-[#6B7280]">
                    {displayTasks.filter(t => t.status === 'pending').length}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {displayTasks.filter(t => t.status === 'pending').map((task) => (
                  <Card key={task.id} className="border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-[#0B1B2B] text-sm leading-tight">{task.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            task.priority === 'high' ? 'border-red-200 text-red-600 bg-red-50' :
                            task.priority === 'medium' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' :
                            'border-green-200 text-green-600 bg-green-50'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{task.description}</p>
                      
                      {task.due_date && (
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {formatDate(task.due_date)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#C9A24A]">
                          <Users className="w-3 h-3" />
                          <span>2 Partner Services</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs border-[#E5E7EB] hover:bg-[#F3F4F6]">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs border-[#E5E7EB] hover:bg-[#F3F4F6]">
                            <X className="w-3 h-3" />
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                            Start
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-green-600 hover:bg-green-700 text-white">
                            Complete
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                        <Button variant="outline" size="sm" className="w-full h-6 text-xs text-[#C9A24A] border-[#C9A24A] hover:bg-[#C9A24A] hover:text-white">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* In Progress Column */}
          <section aria-label="In Progress Tasks">
            <div className="bg-white rounded-lg border border-[#E5E7EB] h-fit">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0B1B2B]">In Progress</h2>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                    {displayTasks.filter(t => t.status === 'in_progress').length}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {displayTasks.filter(t => t.status === 'in_progress').map((task) => (
                  <Card key={task.id} className="border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-[#0B1B2B] text-sm leading-tight">{task.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            task.priority === 'high' ? 'border-red-200 text-red-600 bg-red-50' :
                            task.priority === 'medium' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' :
                            'border-green-200 text-green-600 bg-green-50'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{task.description}</p>
                      
                      {task.due_date && (
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {formatDate(task.due_date)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#C9A24A]">
                          <Users className="w-3 h-3" />
                          <span>2 Partner Services</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs border-[#E5E7EB] hover:bg-[#F3F4F6]">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs border-[#E5E7EB] hover:bg-[#F3F4F6]">
                            <X className="w-3 h-3" />
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-gray-600 hover:bg-gray-700 text-white">
                            Back
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-green-600 hover:bg-green-700 text-white">
                            Complete
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                        <Button variant="outline" size="sm" className="w-full h-6 text-xs text-[#C9A24A] border-[#C9A24A] hover:bg-[#C9A24A] hover:text-white">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Completed Column */}
          <section aria-label="Completed Tasks">
            <div className="bg-white rounded-lg border border-[#E5E7EB] h-fit">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#0B1B2B]">Completed</h2>
                  <Badge variant="secondary" className="bg-green-50 text-green-600">
                    {displayTasks.filter(t => t.status === 'completed').length}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {displayTasks.filter(t => t.status === 'completed').map((task) => (
                  <Card key={task.id} className="border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-[#0B1B2B] text-sm leading-tight line-through">{task.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            task.priority === 'high' ? 'border-red-200 text-red-600 bg-red-50' :
                            task.priority === 'medium' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' :
                            'border-green-200 text-green-600 bg-green-50'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{task.description}</p>
                      
                      {task.due_date && (
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Completed: {formatDate(task.due_date)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#C9A24A]">
                          <Users className="w-3 h-3" />
                          <span>2 Partner Services</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs border-[#E5E7EB] hover:bg-[#F3F4F6]">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-gray-600 hover:bg-gray-700 text-white">
                            Back
                          </Button>
                          <Button size="sm" className="h-6 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                            Reopen
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                        <Button variant="outline" size="sm" className="w-full h-6 text-xs text-[#C9A24A] border-[#C9A24A] hover:bg-[#C9A24A] hover:text-white">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}