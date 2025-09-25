'use client'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

interface CasePageProps {
  params: {
    caseId: string
  }
}

type Task = {
  id: string
  title: string
  status: 'todo' | 'doing' | 'done'
  due_at?: string
  sort: number
  case_id: string
}

type Message = {
  id: string
  body: string
  sender: string
  created_at: string
}

type CaseData = {
  id: string
  client_name: string
  origin_city: string
  destination_city: string
  target_date: string
  status: string
}

export default function CasePage({ params }: CasePageProps) {
  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCaseData() {
      try {
        // Load case data
        const caseResponse = await fetch(`/api/case/${params.caseId}`)
        if (caseResponse.ok) {
          const caseResult = await caseResponse.json()
          setCaseData(caseResult.case)
        }

        // Load tasks
        const tasksResponse = await fetch(`/api/case/${params.caseId}/tasks`)
        if (tasksResponse.ok) {
          const tasksResult = await tasksResponse.json()
          setTasks(tasksResult.tasks || [])
        }

        // Load messages
        const messagesResponse = await fetch(`/api/case/${params.caseId}/messages`)
        if (messagesResponse.ok) {
          const messagesResult = await messagesResponse.json()
          setMessages(messagesResult.messages || [])
        }
      } catch (error) {
        console.error('Error loading case data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCaseData()
  }, [params.caseId])

  async function updateTaskStatus(taskId: string, newStatus: 'todo' | 'doing' | 'done') {
    try {
      const response = await fetch(`/api/case/${params.caseId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        ))
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  if (loading) {
    return (
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading case data...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!caseData) {
    return (
      <Layout className="bg-[#FAFAF9]" showFooter={false}>
        <div className="min-h-screen py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0B1B2B] mb-4">Case Not Found</h1>
            <p className="text-[#6B7280] mb-6">The case you're looking for doesn't exist or you don't have access to it.</p>
            <a href="/onboarding" className="inline-flex px-6 py-3 bg-[#0B1B2B] text-[#C9A24A] rounded-lg font-medium hover:bg-[#0B1B2B]/90 transition-colors">
              Go to Onboarding
            </a>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Relocation Case Dashboard
                </h1>
                <p className="text-[#6B7280] text-lg">
                  {caseData.origin_city} → {caseData.destination_city}
                </p>
                {caseData.target_date && (
                  <p className="text-[#6B7280]">
                    Target Date: {new Date(caseData.target_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  caseData.status === 'intake' ? 'bg-blue-100 text-blue-800' :
                  caseData.status === 'active' ? 'bg-green-100 text-green-800' :
                  caseData.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
                </div>
                <p className="text-[#6B7280] text-sm mt-1">Case ID: {caseData.id.slice(0, 8)}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Your Tasks</h2>
                
                {tasks.length === 0 ? (
                  <p className="text-[#6B7280] text-center py-8">No tasks yet. Our team will add tasks shortly.</p>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
                          task.status === 'done' ? 'bg-green-50 border-green-200 hover:bg-green-100' :
                          task.status === 'doing' ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' :
                          'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              task.status === 'done' ? 'text-green-800 line-through' : 'text-[#0B1B2B]'
                            }`}>
                              {task.title}
                            </h3>
                            {task.due_at && (
                              <p className="text-sm text-[#6B7280] mt-1">
                                Due: {new Date(task.due_at).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value={task.status}
                              onChange={(e) => updateTaskStatus(task.id, e.target.value as 'todo' | 'doing' | 'done')}
                              className={`px-2 py-1 rounded text-xs font-medium border-none outline-none cursor-pointer ${
                                task.status === 'done' ? 'bg-green-100 text-green-800' :
                                task.status === 'doing' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <option value="todo">To Do</option>
                              <option value="doing">In Progress</option>
                              <option value="done">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Messages/Communication Section */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#0B1B2B]">Messages</h2>
                  <a
                    href={`/case/${caseData.id}/messages`}
                    className="text-sm text-[#C9A24A] hover:underline font-medium"
                  >
                    View All →
                  </a>
                </div>
                
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#6B7280] mb-3">No messages yet.</p>
                    <a
                      href={`/case/${caseData.id}/messages`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1B2B] text-[#C9A24A] rounded-lg text-sm font-medium hover:bg-[#0B1B2B]/90 transition-colors"
                    >
                      Start Conversation
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(-3).map((message) => (
                      <div 
                        key={message.id}
                        className={`p-3 rounded-lg ${
                          message.sender === 'concierge' 
                            ? 'bg-[#C9A24A]/10 border-l-4 border-[#C9A24A]' 
                            : 'bg-blue-50 border-l-4 border-blue-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            {message.sender === 'concierge' ? 'Relo Team' : 'You'}
                          </span>
                          <span className="text-xs text-[#6B7280]">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[#0B1B2B] text-sm leading-relaxed">
                          {message.body.length > 100 ? message.body.substring(0, 100) + '...' : message.body}
                        </p>
                      </div>
                    ))}
                    {messages.length > 3 && (
                      <div className="text-center pt-2">
                        <a
                          href={`/case/${caseData.id}/messages`}
                          className="text-sm text-[#C9A24A] hover:underline"
                        >
                          View {messages.length - 3} more messages
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Client Information */}
              {caseData.client_name && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mt-6">
                  <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {caseData.client_name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Your relocation case has been created!</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  Our team has received your information and will begin working on your relocation case immediately. 
                  You can expect to hear from us within 24 hours with next steps and your personalized relocation plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}