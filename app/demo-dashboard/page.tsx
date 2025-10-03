'use client'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { ExternalLink, Star, Users, Clock, MapPin, CheckCircle, GraduationCap, Home, Zap, Building2, Scale, Heart, UserCheck, ExternalLinkIcon, Plus, Edit3, Bot, MessageCircle, AlertCircle, Calendar, Flag } from 'lucide-react'

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

export default function DemoDashboard() {
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [selectedPartnerType, setSelectedPartnerType] = useState('')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showReloPanel, setShowReloPanel] = useState(false)
  const [reloRecommendations, setReloRecommendations] = useState<ReloRecommendation[]>([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    due: '',
    partnerType: 'general'
  })
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: 'Register Children for School', 
      description: 'Complete school enrollment process for all children', 
      status: 'todo', 
      priority: 'high', 
      due: '2024-03-01',
      partnerType: 'education',
      suggestedPartners: ['BrightStart Education', 'London Schools Advisory']
    },
    { 
      id: 2, 
      title: 'Schedule Property Viewings', 
      description: 'Arrange viewings for shortlisted properties in desired area', 
      status: 'doing', 
      priority: 'high', 
      due: '2024-02-01',
      partnerType: 'property',
      suggestedPartners: ['Prime Property London', 'Foxtons Estate Agents']
    },
    { 
      id: 3, 
      title: 'Set up Utilities', 
      description: 'Arrange electricity, gas, water, and Internet connections', 
      status: 'todo', 
      priority: 'medium', 
      due: '2024-03-15',
      partnerType: 'utilities',
      suggestedPartners: ['British Gas', 'Thames Water', 'BT Broadband']
    },
    { 
      id: 4, 
      title: 'Open Bank Account', 
      description: 'Set up local bank account and transfer initial funds', 
      status: 'doing', 
      priority: 'medium', 
      due: '2024-02-10',
      partnerType: 'banking',
      suggestedPartners: ['HSBC International', 'Barclays Premier']
    },
    { 
      id: 5, 
      title: 'Submit Visa Application', 
      description: 'Complete and submit visa application with required documents', 
      status: 'done', 
      priority: 'high', 
      due: '2024-01-15',
      partnerType: 'legal',
      suggestedPartners: ['Immigration Law Experts', 'UK Visa Solutions']
    },
    { 
      id: 6, 
      title: 'Register with Local GP', 
      description: 'Find and register with local healthcare provider', 
      status: 'todo', 
      priority: 'low', 
      due: '2024-03-30',
      partnerType: 'healthcare',
      suggestedPartners: ['NHS Registration Service', 'Private Health London']
    }
  ])

  const [selectedTaskForPartners, setSelectedTaskForPartners] = useState(null)
  
  const connectWithPartners = (taskType: string) => {
    setSelectedPartnerType(taskType)
    setShowPartnerModal(true)
  }

  const messageConcierge = () => {
    alert("Opening secure messaging channel with your dedicated concierge. In the full platform, this would open a real-time chat interface.")
  }

  // Task Management Functions
  const addTask = () => {
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'todo',
      suggestedPartners: []
    }
    setTasks([...tasks, task])
    setNewTask({ title: '', description: '', priority: 'medium' as const, due: '', partnerType: 'general' })
    setShowTaskModal(false)
    
    // Trigger Relo recommendation
    generateReloRecommendation(task)
  }

  const editTask = (task: Task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      due: task.due,
      partnerType: task.partnerType
    })
    setShowTaskModal(true)
  }

  const updateTask = () => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...newTask } : t))
      setEditingTask(null)
      setNewTask({ title: '', description: '', priority: 'medium' as const, due: '', partnerType: 'general' })
      setShowTaskModal(false)
    }
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const updateTaskStatus = (taskId: number, newStatus: 'todo' | 'doing' | 'done') => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
    
    // Trigger Relo celebration or next step recommendation
    if (newStatus === 'done') {
      const completedTask = tasks.find(t => t.id === taskId)
      if (completedTask) {
        generateReloCompletion(completedTask)
      }
    }
  }

  // Relo AI Integration Functions
  const generateReloRecommendation = (task: Task) => {
    const recommendations = [
      {
        id: Date.now(),
        type: 'tip' as const,
        title: 'Smart Timing Tip',
        message: `For "${task.title}", I recommend starting 2-3 weeks early. This gives buffer time for any unexpected requirements.`,
        action: 'Adjust Timeline',
        taskId: task.id
      }
    ]
    setReloRecommendations(prev => [...prev, ...recommendations])
    setShowReloPanel(true)
  }

  const generateReloCompletion = (task: Task) => {
    const completionMsg = {
      id: Date.now(),
      type: 'celebration' as const,
      title: '🎉 Task Completed!',
      message: `Great job completing "${task.title}"! Based on your progress, I recommend focusing on high-priority items next.`,
      action: 'View Next Steps',
      taskId: task.id
    }
    setReloRecommendations(prev => [...prev, completionMsg])
    setShowReloPanel(true)
  }

  // Relo AI Action Handlers
  const handleReloAction = (rec: ReloRecommendation) => {
    switch (rec.action) {
      case 'View Details':
        // Show detailed progress analysis
        const newRec = {
          id: Date.now(),
          type: 'insight' as const,
          title: 'Detailed Progress Breakdown',
          message: `📊 Task Status Breakdown:\n• Completed: ${tasks.filter(t => t.status === 'done').length} tasks\n• In Progress: ${tasks.filter(t => t.status === 'doing').length} tasks\n• Pending: ${tasks.filter(t => t.status === 'todo').length} tasks\n\n🎯 Priority Analysis:\n• High Priority: ${tasks.filter(t => t.priority === 'high').length} tasks\n• Medium Priority: ${tasks.filter(t => t.priority === 'medium').length} tasks\n• Low Priority: ${tasks.filter(t => t.priority === 'low').length} tasks`,
          action: 'Close Details'
        }
        setReloRecommendations(prev => [newRec, ...prev.filter(r => r.id !== rec.id)])
        break

      case 'Help Prioritize':
        // Show prioritization suggestions
        const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'done')
        const priorityRec = {
          id: Date.now(),
          type: 'suggestion' as const,
          title: '🎯 Smart Prioritization',
          message: highPriorityTasks.length > 0 
            ? `I recommend focusing on these high-priority tasks first:\n${highPriorityTasks.slice(0, 3).map(t => `• ${t.title}`).join('\n')}\n\nThese often have strict deadlines and dependencies.`
            : 'Great news! You have no high-priority tasks pending. Consider tackling medium-priority items next.',
          action: 'Apply Priority'
        }
        setReloRecommendations(prev => [priorityRec, ...prev.filter(r => r.id !== rec.id)])
        break

      case 'Connect Now':
        // Open education partners modal
        setSelectedPartnerType('education')
        setShowPartnerModal(true)
        setReloRecommendations(prev => prev.filter(r => r.id !== rec.id))
        break

      case 'Adjust Timeline':
        // Show timeline adjustment suggestion
        const timelineRec = {
          id: Date.now(),
          type: 'tip' as const,
          title: '📅 Timeline Optimization',
          message: `I've analyzed your task timeline. Consider starting these tasks earlier:\n• School enrollment (can take 2-4 weeks)\n• Visa applications (allow 4-6 weeks)\n• Property viewings (book 2-3 weeks ahead)\n\nWould you like me to suggest new due dates?`,
          action: 'Update Dates'
        }
        setReloRecommendations(prev => [timelineRec, ...prev.filter(r => r.id !== rec.id)])
        break

      case 'View Next Steps':
        // Show suggested next actions
        const nextStepsRec = {
          id: Date.now(),
          type: 'suggestion' as const,
          title: '🚀 Recommended Next Steps',
          message: `Based on your progress, here's what I suggest:\n1. Continue with high-priority items\n2. Schedule property viewings for next week\n3. Connect with education partners for school enrollment\n4. Set up utilities 2 weeks before move-in\n\nWould you like me to create any of these tasks?`,
          action: 'Create Tasks'
        }
        setReloRecommendations(prev => [nextStepsRec, ...prev.filter(r => r.id !== rec.id)])
        break

      case 'Apply Priority':
        // Automatically reorder tasks by priority
        const reorderedTasks = [...tasks].sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
        setTasks(reorderedTasks)
        setReloRecommendations(prev => [
          {
            id: Date.now(),
            type: 'celebration' as const,
            title: '✅ Priorities Applied!',
            message: 'I\'ve reordered your tasks by priority. High-priority items are now at the top of each column.',
            action: undefined
          },
          ...prev.filter(r => r.id !== rec.id)
        ])
        break

      case 'Update Dates':
        // Show date update confirmation
        const dateRec = {
          id: Date.now(),
          type: 'celebration' as const,
          title: '📅 Timeline Optimized!',
          message: 'I\'ve analyzed your timeline. In the full platform, I would automatically suggest optimal due dates based on task dependencies and typical processing times.',
          action: undefined
        }
        setReloRecommendations(prev => [dateRec, ...prev.filter(r => r.id !== rec.id)])
        break

      case 'Create Tasks':
        // Show task creation confirmation
        setEditingTask(null)
        setNewTask({ title: '', description: '', priority: 'medium' as const, due: '', partnerType: 'general' })
        setShowTaskModal(true)
        setReloRecommendations(prev => prev.filter(r => r.id !== rec.id))
        break

      default:
        // Close/dismiss the recommendation
        setReloRecommendations(prev => prev.filter(r => r.id !== rec.id))
        break
    }
  }

  const getReloInsights = () => {
    const insights = [
      {
        id: Date.now() + 1,
        type: 'insight' as const,
        title: 'Progress Analysis',
        message: `You've completed ${tasks.filter(t => t.status === 'done').length} out of ${tasks.length} tasks. You're ${Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)}% complete!`,
        action: 'View Details'
      },
      {
        id: Date.now() + 2,
        type: 'reminder' as const,
        title: 'Upcoming Deadlines',
        message: `You have ${tasks.filter(t => t.priority === 'high' && t.status !== 'done').length} high-priority tasks. Would you like me to help prioritize them?`,
        action: 'Help Prioritize'
      },
      {
        id: Date.now() + 3,
        type: 'suggestion' as const,
        title: 'Partner Recommendation',
        message: 'Based on your tasks, I suggest connecting with education partners first, as school enrollment often has strict deadlines.',
        action: 'Connect Now'
      }
    ]
    setReloRecommendations(insights)
    setShowReloPanel(true)
  }

  const partnerServices = {
    education: [
      { name: 'BrightStart Education', rating: 4.9, reviews: 127, speciality: 'International School Placement', location: 'Central London', verified: true },
      { name: 'London Schools Advisory', rating: 4.8, reviews: 89, speciality: 'Private & State School Guidance', location: 'Kensington', verified: true },
      { name: 'Academic Pathways UK', rating: 4.7, reviews: 156, speciality: 'Curriculum Transition Support', location: 'Westminster', verified: false }
    ],
    property: [
      { name: 'Prime Property London', rating: 4.9, reviews: 234, speciality: 'Executive Relocations', location: 'Mayfair', verified: true },
      { name: 'Foxtons Estate Agents', rating: 4.6, reviews: 892, speciality: 'Full-Service Property Management', location: 'Multiple Locations', verified: true },
      { name: 'Knight Frank International', rating: 4.8, reviews: 345, speciality: 'Luxury Property Portfolio', location: 'Knightsbridge', verified: true }
    ],
    utilities: [
      { name: 'British Gas', rating: 4.2, reviews: 1234, speciality: 'Energy Supply & Smart Meters', location: 'Nationwide', verified: true },
      { name: 'Thames Water', rating: 4.0, reviews: 567, speciality: 'Water & Sewerage Services', location: 'London & Thames Valley', verified: true },
      { name: 'BT Broadband', rating: 4.4, reviews: 789, speciality: 'Fiber & Business Internet', location: 'Nationwide', verified: true }
    ],
    banking: [
      { name: 'HSBC International', rating: 4.7, reviews: 456, speciality: 'International Banking & Transfers', location: 'City of London', verified: true },
      { name: 'Barclays Premier', rating: 4.6, reviews: 678, speciality: 'Premium Banking Services', location: 'Multiple Locations', verified: true },
      { name: 'Lloyds International', rating: 4.5, reviews: 234, speciality: 'Expat Banking Solutions', location: 'Canary Wharf', verified: true }
    ],
    legal: [
      { name: 'Immigration Law Experts', rating: 4.9, reviews: 167, speciality: 'UK Immigration & Visa Law', location: 'Lincoln\'s Inn', verified: true },
      { name: 'UK Visa Solutions', rating: 4.8, reviews: 234, speciality: 'Corporate & Family Visas', location: 'Temple', verified: true },
      { name: 'Global Migration Partners', rating: 4.7, reviews: 189, speciality: 'International Relocations', location: 'Holborn', verified: false }
    ],
    healthcare: [
      { name: 'NHS Registration Service', rating: 4.3, reviews: 567, speciality: 'GP Registration & NHS Services', location: 'Various NHS Trusts', verified: true },
      { name: 'Private Health London', rating: 4.8, reviews: 234, speciality: 'Private Healthcare & Insurance', location: 'Harley Street', verified: true },
      { name: 'International Medical Centre', rating: 4.6, reviews: 145, speciality: 'Expat Health Services', location: 'Marylebone', verified: true }
    ]
  }

  const getStatusCounts = () => {
    const completed = tasks.filter(t => t.status === 'done').length
    const inProgress = tasks.filter(t => t.status === 'doing').length
    const pending = tasks.filter(t => t.status === 'todo').length
    return { completed, inProgress, pending }
  }

  const { completed, inProgress, pending } = getStatusCounts()

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
                  New York → London
                </p>
                <p className="text-[#6B7280]">
                  Target Date: 9/21/2025
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Intake
                </div>
                <p className="text-[#6B7280] text-sm mt-1">Case ID: 8daf79a9</p>
              </div>
            </div>
          </div>

          {/* Case Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Case Overview</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-800 mb-2">{completed}</div>
                <div className="text-green-700 font-medium">Completed</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">{inProgress}</div>
                <div className="text-blue-700 font-medium">In Progress</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">{pending}</div>
                <div className="text-gray-700 font-medium">Pending</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              {/* Task Management Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0B1B2B]">Task Management</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={getReloInsights}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    Ask Relo
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(null)
                      setNewTask({ title: '', description: '', priority: 'medium' as const, due: '', partnerType: 'general' })
                      setShowTaskModal(true)
                    }}
                    className="flex items-center gap-2 bg-[#0B1B2B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0B1B2B]/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </div>
              </div>

              {/* Kanban Board */}
              <div className="mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {['todo', 'doing', 'done'].map((status) => (
                    <div
                      key={status}
                      className={`rounded-2xl border-2 border-dashed min-h-[60vh] p-4 ${
                        status === 'todo' ? 'bg-gray-50 border-gray-200' :
                        status === 'doing' ? 'bg-blue-50 border-blue-200' :
                        'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-[#0B1B2B] capitalize">
                          {status === 'todo' ? 'To Do' : status === 'doing' ? 'In Progress' : 'Completed'}
                        </h3>
                        <div className="text-sm text-[#6B7280] bg-white px-2 py-1 rounded-full">
                          {tasks.filter(t => t.status === status).length}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {tasks
                          .filter(t => t.status === status)
                          .map(task => (
                            <div
                              key={task.id}
                              className="rounded-xl p-4 bg-white border border-[#E5E7EB] hover:shadow-md transition-all min-h-[200px] flex flex-col"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className={`font-medium text-[#0B1B2B] leading-snug ${
                                  task.status === 'done' ? 'line-through text-[#6B7280]' : ''
                                }`}>
                                  {task.title}
                                </h4>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {task.priority}
                                </div>
                              </div>
                              
                              <p className="text-sm text-[#6B7280] mb-3">{task.description}</p>
                              
                              <div className="mt-auto space-y-3">
                                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                                  <span>Due: {new Date(task.due).toLocaleDateString()}</span>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="space-y-2">
                                  <div className="flex gap-2 justify-between">
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => editTask(task)}
                                        className="p-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
                                        title="Edit Task"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => deleteTask(task.id)}
                                        className="p-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
                                        title="Delete Task"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    
                                    <div className="flex gap-1">
                                      {task.status !== 'todo' && (
                                        <button
                                          onClick={() => updateTaskStatus(task.id, 'todo')}
                                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                        >
                                          Back
                                        </button>
                                      )}
                                      {task.status === 'todo' && (
                                        <button
                                          onClick={() => updateTaskStatus(task.id, 'doing')}
                                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                        >
                                          Start
                                        </button>
                                      )}
                                      {task.status !== 'done' && (
                                        <button
                                          onClick={() => updateTaskStatus(task.id, 'done')}
                                          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                        >
                                          Complete
                                        </button>
                                      )}
                                      {task.status === 'done' && (
                                        <button
                                          onClick={() => updateTaskStatus(task.id, 'doing')}
                                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                        >
                                          Reopen
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Partner Services Integration */}
                                <div className="pt-2 border-t border-gray-100">
                                  <div className="flex items-center justify-between">
                                    <div className="text-xs text-[#C9A24A] font-medium flex items-center gap-1">
                                      <UserCheck className="w-3 h-3" />
                                      {task.suggestedPartners?.length || 0} Partner Services
                                    </div>
                                    <button
                                      onClick={() => setSelectedTaskForPartners(selectedTaskForPartners === task.id ? null : task.id)}
                                      className="px-3 py-1 text-xs bg-[#C9A24A] text-white rounded hover:bg-[#B8923D] transition-colors font-medium"
                                    >
                                      {selectedTaskForPartners === task.id ? 'Hide' : 'View'}
                                    </button>
                                  </div>
                                  
                                  {selectedTaskForPartners === task.id && (
                                    <div className="mt-2 p-2 bg-[#C9A24A]/5 rounded border border-[#C9A24A]/20">
                                      <h5 className="text-xs font-medium text-[#0B1B2B] mb-2">Recommended Partners:</h5>
                                      <div className="space-y-1">
                                        {partnerServices[task.partnerType]?.slice(0, 2).map((partner, idx) => (
                                          <div key={idx} className="flex items-center justify-between p-1 bg-white rounded border">
                                            <div className="flex items-center gap-1">
                                              <div className="text-xs font-medium text-[#0B1B2B]">{partner.name}</div>
                                              {partner.verified && (
                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                              )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                              <span className="text-xs text-[#6B7280]">{partner.rating}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <button 
                                        onClick={() => connectWithPartners(task.partnerType)}
                                        className="w-full mt-2 px-2 py-1 text-xs bg-[#0B1B2B] text-[#C9A24A] rounded hover:bg-[#0B1B2B]/90 flex items-center justify-center gap-1"
                                      >
                                        <ExternalLinkIcon className="w-3 h-3" />
                                        Connect with Partners
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Tasks List */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Your Tasks</h2>
                <div className="space-y-4">
                  {tasks.filter(t => t.status !== 'done').slice(0, 5).map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-all bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-[#0B1B2B]">
                            {task.title}
                          </h3>
                          <p className="text-sm text-[#6B7280] mt-1">
                            Due: {new Date(task.due).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {task.status === 'todo' ? 'To Do' : 'In Progress'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Messages/Communication Section */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-[#0B1B2B]">Messages</h2>
                  <span className="text-sm text-[#C9A24A] hover:underline font-medium cursor-pointer">
                    View All →
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#C9A24A]/10 border-l-4 border-[#C9A24A]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Relo Team</span>
                      <span className="text-xs text-[#6B7280]">9/19/2025</span>
                    </div>
                    <p className="text-[#0B1B2B] text-sm leading-relaxed">
                      Welcome to Relo Network! We've created your relocation case and are excited to help you move to Lond...
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> Cali Ankl</p>
                </div>
              </div>

              {/* Partner Services Network */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#C9A24A]" />
                  Partner Services Network
                </h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Access our curated network of verified service providers to streamline your relocation.
                </p>
                
                <div className="space-y-3">
                  {Object.entries(partnerServices).map(([category, partners]) => (
                    <div key={category} className="border border-[#E5E7EB] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-[#0B1B2B] capitalize flex items-center gap-2">
                          {category === 'education' && <GraduationCap className="w-4 h-4 text-[#C9A24A]" />}
                          {category === 'property' && <Home className="w-4 h-4 text-[#C9A24A]" />}
                          {category === 'utilities' && <Zap className="w-4 h-4 text-[#C9A24A]" />}
                          {category === 'banking' && <Building2 className="w-4 h-4 text-[#C9A24A]" />}
                          {category === 'legal' && <Scale className="w-4 h-4 text-[#C9A24A]" />}
                          {category === 'healthcare' && <Heart className="w-4 h-4 text-[#C9A24A]" />}
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className="text-xs bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded">
                          {partners.length} Partners
                        </span>
                      </div>
                      
                      <div className="text-xs text-[#6B7280] mb-2 flex items-center gap-1">
                        Top Partner: {partners[0].name} 
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {partners[0].rating}
                      </div>
                      
                      <button 
                        onClick={() => connectWithPartners(category)}
                        className="w-full text-xs bg-[#0B1B2B] text-[#C9A24A] px-3 py-1 rounded hover:bg-[#0B1B2B]/90 transition-colors flex items-center justify-center gap-1"
                      >
                        <ExternalLinkIcon className="w-3 h-3" />
                        View All {category.charAt(0).toUpperCase() + category.slice(1)} Partners
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-[#C9A24A]/5 rounded-lg border border-[#C9A24A]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-[#C9A24A] fill-current" />
                    <span className="text-sm font-medium text-[#0B1B2B]">Premium Partnership Benefits</span>
                  </div>
                  <ul className="text-xs text-[#6B7280] space-y-1">
                    <li className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#C9A24A]" />
                      Verified & vetted service providers
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#C9A24A]" />
                      Exclusive client discounts
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#C9A24A]" />
                      Direct coordination with Relo team
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#C9A24A]" />
                      24/7 priority support
                    </li>
                  </ul>
                </div>
              </div>

              {/* Assigned Concierge */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Assigned Concierge</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold">
                    CA
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1B2B]">Calistar Ankrah</p>
                    <p className="text-sm text-[#6B7280]">Senior Relocation Specialist</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Available Now</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Your dedicated concierge is monitoring your case and coordinating with all partner services.
                  </p>
                  <button 
                    onClick={messageConcierge}
                    className="w-full mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Users className="w-3 h-3" />
                    Message Concierge
                  </button>
                </div>
              </div>
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

      {/* Partner Selection Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedPartnerType.charAt(0).toUpperCase() + selectedPartnerType.slice(1)} Partners
                </h3>
                <button
                  onClick={() => setShowPartnerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Choose from our verified {selectedPartnerType} partners to help with your relocation
              </p>
            </div>

            <div className="p-6 space-y-4">
              {partnerServices[selectedPartnerType as keyof typeof partnerServices]?.map((partner, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#C9A24A] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                        {partner.verified && (
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Verified
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{partner.speciality}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{partner.rating}</span>
                          <span>({partner.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{partner.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Connect
                      </button>
                      <button className="text-[#C9A24A] hover:text-[#B8923D] text-sm font-medium transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  All partners are pre-verified and rated by our community
                </p>
                <button
                  onClick={() => setShowPartnerModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Add/Edit Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTask.due}
                    onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newTask.partnerType}
                  onChange={(e) => setNewTask({ ...newTask, partnerType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                >
                  <option value="general">General</option>
                  <option value="education">Education</option>
                  <option value="property">Property</option>
                  <option value="utilities">Utilities</option>
                  <option value="banking">Banking</option>
                  <option value="legal">Legal</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingTask ? updateTask : addTask}
                className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Relo AI Recommendations Panel */}
      {showReloPanel && (
        <div className="fixed top-4 right-4 w-80 bg-white rounded-xl shadow-2xl border border-[#E5E7EB] z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">Relo AI Assistant</h3>
              </div>
              <button
                onClick={() => setShowReloPanel(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {reloRecommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-lg border ${
                  rec.type === 'celebration' ? 'bg-green-50 border-green-200' :
                  rec.type === 'tip' ? 'bg-blue-50 border-blue-200' :
                  rec.type === 'reminder' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    rec.type === 'celebration' ? 'bg-green-500 text-white' :
                    rec.type === 'tip' ? 'bg-blue-500 text-white' :
                    rec.type === 'reminder' ? 'bg-yellow-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {rec.type === 'celebration' ? '🎉' :
                     rec.type === 'tip' ? '💡' :
                     rec.type === 'reminder' ? '⏰' : '🔍'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                    <div className="text-sm text-gray-600 mb-3 whitespace-pre-line">{rec.message}</div>
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

            {reloRecommendations.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  I'll provide smart recommendations as you work on your tasks!
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={() => {
                setReloRecommendations([])
                setShowReloPanel(false)
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Recommendations
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
