'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  category: string
}

interface Partner {
  id: string
  name: string
  category: string
  services: string[]
  description: string
  contact: {
    phone: string
    email: string
    website: string
  }
  rating: number
  location: string
  specialties: string[]
  supportingLinks?: Array<{
    title: string
    url: string
    type: string
  }>
}

export default function CasePage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Submit Visa Application',
      description: 'Complete and submit visa application with required documents',
      status: 'done',
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'immigration'
    },
    {
      id: '2',
      title: 'Schedule Property Viewings',
      description: 'Arrange viewings for shortlisted properties in desired area',
      status: 'doing',
      priority: 'high',
      dueDate: '2024-02-01',
      category: 'housing'
    },
    {
      id: '3',
      title: 'Open Bank Account',
      description: 'Set up local bank account and transfer initial funds',
      status: 'doing',
      priority: 'medium',
      dueDate: '2024-02-10',
      category: 'banking'
    },
    {
      id: '4',
      title: 'Register Children for School',
      description: 'Complete school enrollment process for all children',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-03-01',
      category: 'education'
    },
    {
      id: '5',
      title: 'Set up Utilities',
      description: 'Arrange electricity, gas, water, and internet connections',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-03-15',
      category: 'housing'
    },
    {
      id: '6',
      title: 'Register with Local GP',
      description: 'Find and register with local healthcare provider',
      status: 'todo',
      priority: 'low',
      dueDate: '2024-03-30',
      category: 'healthcare'
    }
  ])

  // Modal states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showSuggestedTasks, setShowSuggestedTasks] = useState(false)
  const [suggestedTasks, setSuggestedTasks] = useState<any[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loadingPartners, setLoadingPartners] = useState(false)

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    category: 'general'
  })

  // Check for suggested tasks from document uploads
  useEffect(() => {
    const suggested = localStorage.getItem('suggestedTasks')
    if (suggested) {
      const data = JSON.parse(suggested)
      // Only show if less than 5 minutes old
      if (Date.now() - data.timestamp < 5 * 60 * 1000) {
        setSuggestedTasks(data.tasks)
        setShowSuggestedTasks(true)
      }
      localStorage.removeItem('suggestedTasks')
    }
  }, [])

  const updateTaskStatus = (taskId: string, newStatus: 'todo' | 'doing' | 'done') => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
    setLoadingPartners(true)
    
    try {
      const response = await fetch(`/api/partners/recommendations?category=${task.category}&taskId=${task.id}`)
      const data = await response.json()
      
      if (data.ok) {
        setPartners(data.partners)
      }
    } catch (error) {
      console.error('Failed to load partners:', error)
    } finally {
      setLoadingPartners(false)
    }
  }

  const createTask = () => {
    if (!newTask.title || !newTask.description) return

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      status: 'todo'
    }
    
    setTasks(prev => [...prev, task])
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', category: 'general' })
    setShowCreateTaskModal(false)
  }

  const editTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task))
    setSelectedTask(updatedTask)
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
    setShowTaskModal(false)
    setSelectedTask(null)
  }

  const addSuggestedTasks = (tasksToAdd: any[]) => {
    const newTasks = tasksToAdd.map(task => ({
      ...task,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      status: 'todo' as const
    }))
    setTasks(prev => [...prev, ...newTasks])
    setShowSuggestedTasks(false)
    setSuggestedTasks([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'doing': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'done': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
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

  const todoTasks = tasks.filter(task => task.status === 'todo')
  const doingTasks = tasks.filter(task => task.status === 'doing')
  const doneTasks = tasks.filter(task => task.status === 'done')

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              My Relocation Case
            </h1>
            <p className="text-[#6B7280] text-lg">
              Track your relocation progress and manage tasks
            </p>
          </div>

          {/* Case Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10 mb-8">
            <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Case Overview</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{doneTasks.length}</div>
                <div className="text-sm text-green-800">Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{doingTasks.length}</div>
                <div className="text-sm text-blue-800">In Progress</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{todoTasks.length}</div>
                <div className="text-sm text-gray-800">Pending</div>
              </div>
            </div>
          </div>

          {/* Task Board */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                To Do ({todoTasks.length})
              </h3>
              <div className="space-y-3">
                {todoTasks.map(task => (
                  <div key={task.id} className="border border-[#E5E7EB] rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[#0B1B2B] text-sm">{task.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-[#6B7280] text-xs mb-3">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-[#6B7280] text-xs mb-3">Due: {task.dueDate}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTaskStatus(task.id, 'doing')}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => updateTaskStatus(task.id, 'done')}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doing Column */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                In Progress ({doingTasks.length})
              </h3>
              <div className="space-y-3">
                {doingTasks.map(task => (
                  <div key={task.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[#0B1B2B] text-sm">{task.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-[#6B7280] text-xs mb-3">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-[#6B7280] text-xs mb-3">Due: {task.dueDate}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTaskStatus(task.id, 'todo')}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => updateTaskStatus(task.id, 'done')}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                Completed ({doneTasks.length})
              </h3>
              <div className="space-y-3">
                {doneTasks.map(task => (
                  <div key={task.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[#0B1B2B] text-sm">{task.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-[#6B7280] text-xs mb-3">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-[#6B7280] text-xs mb-3">Due: {task.dueDate}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600">
                        <span className="text-lg mr-1">✓</span>
                        <span className="text-xs font-medium">Completed</span>
                      </div>
                      <button
                        onClick={() => updateTaskStatus(task.id, 'doing')}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                      >
                        Reopen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Case Details */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
            <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Case Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">Relocation Information</h3>
                <div className="space-y-2 text-sm text-[#6B7280]">
                  <div><strong>From:</strong> New York, USA</div>
                  <div><strong>To:</strong> London, UK</div>
                  <div><strong>Move Date:</strong> March 2024</div>
                  <div><strong>Family Size:</strong> 2 adults, 2 children</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-[#0B1B2B] mb-2">Assigned Concierge</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">CA</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Calistar Ankrah</div>
                    <div className="text-sm text-[#6B7280]">Senior Relocation Specialist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}