'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { CheckCircle, AlertCircle, Calendar, Users, MapPin, Sparkles, FileText, Settings, BarChart3, MessageSquare } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  priority: 'low' | 'medium' | 'high'
  due: string
  partnerType: string
  suggestedPartners?: string[]
}

interface ReloRecommendation {
  id: number
  type: 'tip' | 'celebration' | 'reminder' | 'insight' | 'suggestion'
  title: string
  message: string
  action?: string
  taskId?: number
}

export default function ClientDashboard() {
  const params = useParams()
  const router = useRouter()
  const [validToken, setValidToken] = useState<boolean | null>(null)
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Find Temporary Accommodation",
      description: "Secure short-term housing for first 4-6 weeks while searching for permanent residence",
      status: "doing",
      priority: "high",
      due: "2024-01-15",
      partnerType: "accommodation",
      suggestedPartners: ["Oakwood Apartments", "Corporate Housing London", "Extended Stay"]
    },
    {
      id: 2,
      title: "School Registration",
      description: "Research and register children for local schools",
      status: "todo",
      priority: "high",
      due: "2024-01-20",
      partnerType: "education",
      suggestedPartners: ["International School of London", "American School London"]
    },
    {
      id: 3,
      title: "Banking Setup",
      description: "Open UK bank account and transfer international funds",
      status: "todo",
      priority: "medium",
      due: "2024-01-25",
      partnerType: "financial",
      suggestedPartners: ["HSBC Expat", "Barclays International", "Wise Business"]
    },
    {
      id: 4,
      title: "NHS Registration",
      description: "Register with NHS and find local GP practice",
      status: "todo",
      priority: "medium",
      due: "2024-02-01",
      partnerType: "healthcare",
      suggestedPartners: ["NHS London", "Private GP Services"]
    }
  ])

  const [reloRecommendations] = useState<ReloRecommendation[]>([
    {
      id: 1,
      type: 'tip',
      title: 'Accommodation Priority',
      message: 'Start with temporary housing near your work location. This gives you time to explore neighborhoods properly.',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'insight',
      title: 'Timeline Optimization',
      message: 'Your school registration deadline is tight. Consider applying to multiple schools simultaneously.',
      action: 'Help Prioritize'
    },
    {
      id: 3,
      type: 'suggestion',
      title: 'Banking & Schools',
      message: 'Many international schools prefer UK bank account for fees. Prioritize banking before school deposits.',
      action: 'Connect Now'
    }
  ])

  useEffect(() => {
    // For demo purposes, validate known tokens without API call
    const validateAccess = () => {
      const validTokens = ['demo-client-123', 'vip-client-456', 'family-client-789']
      
      if (params.token && validTokens.includes(params.token as string)) {
        setValidToken(true)
        // Set demo client data based on token
        if (params.token === 'demo-client-123') {
          setClientInfo({
            name: 'Sarah Johnson',
            packageType: 'Premium Relocation Package'
          })
        } else if (params.token === 'vip-client-456') {
          setClientInfo({
            name: 'Michael Chen',
            packageType: 'VIP Executive Package'
          })
        } else if (params.token === 'family-client-789') {
          setClientInfo({
            name: 'Emma Thompson',
            packageType: 'Family Complete Package'
          })
        }
      } else {
        setValidToken(false)
      }
    }

    if (params.token) {
      validateAccess()
    }
  }, [params.token])

  const handleReloAction = (rec: ReloRecommendation) => {
    switch (rec.action) {
      case 'View Details':
        alert(`📋 Detailed Analysis:\n\n${rec.message}\n\nRecommended next steps:\n• Contact 3 temporary housing providers\n• Schedule virtual tours\n• Prepare required documents\n• Book accommodation for first month`)
        break
      case 'Help Prioritize':
        alert(`🎯 Smart Prioritization:\n\nBased on your timeline, here's the optimal order:\n\n1. Temporary accommodation (URGENT - 5 days)\n2. School applications (HIGH - 10 days)\n3. Banking setup (MEDIUM - 15 days)\n4. NHS registration (LOW - 20 days)\n\nShall I automatically reorder your tasks?`)
        break
      case 'Connect Now':
        alert(`🤝 Partner Connection:\n\nI can connect you with:\n\n• HSBC Expat Banking (Same-day account opening)\n• International School of London (Application fast-track)\n• Corporate Housing London (Move-in within 48 hours)\n\nWhich would you like me to contact first?`)
        break
      default:
        alert(`✨ Relo Insight: ${rec.message}`)
    }
  }

  // Loading state
  if (validToken === null) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-[#0B1B2B] mb-2">
              Validating Access...
            </h2>
            <p className="text-[#6B7280]">
              Please wait while we verify your dashboard access.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  // Invalid token
  if (validToken === false) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#0B1B2B] mb-2">
                Access Denied
              </h2>
              <p className="text-[#6B7280] mb-6">
                This dashboard link is invalid or has expired. Please contact support or purchase a new service package.
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => router.push('/')}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Return Home
                </button>
                <button 
                  onClick={() => router.push('/contact')}
                  className="bg-white hover:bg-gray-50 text-[#0B1B2B] border border-[#E5E7EB] px-6 py-2 rounded-lg transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Valid access - show dashboard
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    Your Relocation Dashboard
                  </h1>
                  <p className="text-[#6B7280]">
                    Welcome back! Track your relocation progress with AI-powered insights.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#C9A24A] to-[#B8923D] text-white px-4 py-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Premium Access
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">25%</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-1">Overall Progress</h3>
              <p className="text-sm text-[#6B7280]">1 of 4 tasks completed</p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">14</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-1">Days Until Move</h3>
              <p className="text-sm text-[#6B7280]">Target: Jan 15, 2024</p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">8</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-1">Partner Connections</h3>
              <p className="text-sm text-[#6B7280]">Verified service providers</p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-1">AI Insights</h3>
              <p className="text-sm text-[#6B7280]">Personalized recommendations</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm">
                <div className="p-6 border-b border-[#E5E7EB]">
                  <h2 className="text-xl font-semibold text-[#0B1B2B]">
                    Your Relocation Tasks
                  </h2>
                  <p className="text-[#6B7280] mt-1">
                    Track and manage your relocation checklist
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[#0B1B2B]">{task.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.status === 'done' ? 'bg-green-100 text-green-700' :
                              task.status === 'doing' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {task.status === 'done' ? 'Completed' : 
                               task.status === 'doing' ? 'In Progress' : 'To Do'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === 'high' ? 'bg-red-100 text-red-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {task.priority} priority
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280] mb-2">{task.description}</p>
                          <p className="text-xs text-[#9CA3AF]">Due: {task.due}</p>
                        </div>
                      </div>
                      {task.suggestedPartners && (
                        <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                          <p className="text-xs font-medium text-[#6B7280] mb-2">Recommended Partners:</p>
                          <div className="flex flex-wrap gap-2">
                            {task.suggestedPartners.map((partner, index) => (
                              <button 
                                key={index}
                                className="text-xs bg-[#C9A24A]/10 text-[#B8923D] px-2 py-1 rounded-full hover:bg-[#C9A24A]/20 transition-colors"
                              >
                                {partner}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Relo AI Panel */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#C9A24A]/10 to-[#B8923D]/10 rounded-xl border border-[#C9A24A]/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B]">Relo AI Assistant</h3>
                    <p className="text-sm text-[#6B7280]">Personalized insights & recommendations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reloRecommendations.map((rec) => (
                    <div key={rec.id} className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          rec.type === 'tip' ? 'bg-blue-100' :
                          rec.type === 'insight' ? 'bg-purple-100' :
                          rec.type === 'celebration' ? 'bg-green-100' :
                          rec.type === 'reminder' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {rec.type === 'tip' && <FileText className="w-4 h-4 text-blue-600" />}
                          {rec.type === 'insight' && <BarChart3 className="w-4 h-4 text-purple-600" />}
                          {rec.type === 'celebration' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {rec.type === 'reminder' && <Calendar className="w-4 h-4 text-yellow-600" />}
                          {rec.type === 'suggestion' && <Sparkles className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#0B1B2B] text-sm mb-1">{rec.title}</h4>
                          <p className="text-xs text-[#6B7280] mb-3">{rec.message}</p>
                          {rec.action && (
                            <button 
                              onClick={() => handleReloAction(rec)}
                              className="text-xs bg-[#C9A24A] text-white px-3 py-1 rounded-full hover:bg-[#B8923D] transition-colors"
                            >
                              {rec.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                <h3 className="font-semibold text-[#0B1B2B] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-5 h-5 text-[#C9A24A]" />
                    <span className="text-sm font-medium text-[#0B1B2B]">Chat with Relo AI</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 text-[#C9A24A]" />
                    <span className="text-sm font-medium text-[#0B1B2B]">Schedule Consultation</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 transition-colors">
                    <FileText className="w-5 h-5 text-[#C9A24A]" />
                    <span className="text-sm font-medium text-[#0B1B2B]">Download Checklist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}