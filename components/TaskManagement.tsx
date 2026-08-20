'use client'

import { useState } from 'react'

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

interface TaskDetailModalProps {
  task: Task | null
  partners: Partner[]
  loadingPartners: boolean
  isOpen: boolean
  onClose: () => void
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, status: 'todo' | 'doing' | 'done') => void
}

export function TaskDetailModal({
  task,
  partners,
  loadingPartners,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onStatusChange
}: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  if (!isOpen || !task) return null

  const handleEdit = () => {
    setEditedTask(task)
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (editedTask) {
      onEdit(editedTask)
      setIsEditing(false)
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

  const getCategoryIcon = (category: string) => {
    const iconProps = "w-5 h-5 flex-shrink-0"
    
    switch (category) {
      case 'immigration':
        return (
          <svg className={`${iconProps} text-blue-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M7,11V13H17V11H7M7,15V17H17V15H7Z"/>
          </svg>
        )
      case 'housing':
        return (
          <svg className={`${iconProps} text-green-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
        )
      case 'banking':
        return (
          <svg className={`${iconProps} text-indigo-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.5,1L2,6V8H21V6M16,10V17H19V19H5V17H8V10H10V17H14V10H16M12,3.5L15.5,6H8.5L12,3.5Z"/>
          </svg>
        )
      case 'education':
        return (
          <svg className={`${iconProps} text-purple-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
          </svg>
        )
      case 'healthcare':
        return (
          <svg className={`${iconProps} text-red-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
          </svg>
        )
      case 'employment':
        return (
          <svg className={`${iconProps} text-orange-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14Z"/>
          </svg>
        )
      case 'lifestyle':
        return (
          <svg className={`${iconProps} text-pink-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11S7,10.3 7,9.5S7.7,8 8.5,8S10,8.7 10,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
          </svg>
        )
      case 'transport':
        return (
          <svg className={`${iconProps} text-teal-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,6H17.5L19.46,12H4.54L6.5,6M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17Z"/>
          </svg>
        )
      case 'travel':
        return (
          <svg className={`${iconProps} text-cyan-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M21,16V14L13,9V7A3,3 0 0,0 10,4A3,3 0 0,0 7,7V9L-1,14V16L7,13.5V19L5,20.5V22L10,21L15,22V20.5L13,19V13.5L21,16Z"/>
          </svg>
        )
      case 'logistics':
        return (
          <svg className={`${iconProps} text-amber-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M3,4H21V6H3V4M4,7H20A1,1 0 0,1 21,8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8A1,1 0 0,1 4,7M6,10H18A1,1 0 0,1 19,11A1,1 0 0,1 18,12H6A1,1 0 0,1 5,11A1,1 0 0,1 6,10M3,16H10V14L15,17L10,20V18H3V16Z"/>
          </svg>
        )
      case 'tax':
        return (
          <svg className={`${iconProps} text-emerald-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8.93,12.22H10.66L11.75,15.75L12.84,12.22H14.57L15.96,17.78H14.4L13.73,14.33L12.64,17.78H10.86L9.77,14.33L9.1,17.78H7.54L8.93,12.22M8,5.5A0.5,0.5 0 0,1 8.5,5A0.5,0.5 0 0,1 9,5.5A0.5,0.5 0 0,1 8.5,6A0.5,0.5 0 0,1 8,5.5Z"/>
          </svg>
        )
      default:
        return (
          <svg className={`${iconProps} text-gray-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M7,11V13H17V11H7M7,15V17H14V15H7Z"/>
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTask?.title || ''}
                  onChange={(e) => setEditedTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="text-2xl font-bold text-[#0B1B2B] bg-transparent border-b border-gray-300 focus:border-[#C9A24A] outline-none w-full"
                />
              ) : (
                <h2 className="text-2xl font-bold text-[#0B1B2B]">{task.title}</h2>
              )}
              <div className="flex items-center gap-2 mt-2">
                {getCategoryIcon(task.category)}
                <span className="text-sm text-[#6B7280] capitalize">{task.category}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority} priority
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#0B1B2B] text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Task Details */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">Task Details</h3>
            {isEditing ? (
              <textarea
                value={editedTask?.description || ''}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
                rows={3}
              />
            ) : (
              <p className="text-[#6B7280]">{task.description}</p>
            )}
            
            {task.dueDate && (
              <div className="mt-2 text-sm text-[#6B7280]">
                <strong>Due:</strong> {task.dueDate}
              </div>
            )}
          </div>

          {/* Task Actions */}
          <div className="flex gap-2 flex-wrap">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-[#C9A24A] text-white rounded-lg hover:bg-[#B8923D] transition-colors"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => onStatusChange(task.id, task.status === 'done' ? 'doing' : 'done')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    task.status === 'done' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {task.status === 'done' ? 'Reopen Task' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Task
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          {/* Partner Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Recommended Partners</h3>
            {loadingPartners ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A24A]"></div>
                <p className="mt-2 text-[#6B7280]">Loading partner recommendations...</p>
              </div>
            ) : partners.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {partners.map(partner => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#0B1B2B]">{partner.name}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-[#6B7280] ml-1">{partner.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280] mb-3">{partner.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {partner.specialties.slice(0, 2).map(specialty => (
                          <span key={specialty} className="px-2 py-1 bg-[#C9A24A]/10 text-[#C9A24A] text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 text-xs">
                        <a 
                          href={`tel:${partner.contact.phone}`}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          Call
                        </a>
                        <a 
                          href={`mailto:${partner.contact.email}`}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Email
                        </a>
                        <a 
                          href={partner.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-[#0B1B2B] text-white rounded hover:bg-[#0B1B2B]/80 transition-colors"
                        >
                          Website
                        </a>
                      </div>
                    </div>

                    {/* Supporting Links */}
                    {partner.supportingLinks && partner.supportingLinks.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h5 className="text-xs font-medium text-[#0B1B2B] mb-2">Helpful Resources</h5>
                        <div className="space-y-1">
                          {partner.supportingLinks.slice(0, 2).map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-[#C9A24A] hover:text-[#B8923D] hover:underline"
                            >
                              {link.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#6B7280] text-center py-8">
                No specific partner recommendations found for this task category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (task: any) => void
  newTask: any
  setNewTask: (task: any) => void
}

export function CreateTaskModal({ isOpen, onClose, onCreate, newTask, setNewTask }: CreateTaskModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(newTask)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#0B1B2B]">Create New Task</h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#0B1B2B] text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-1">Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-1">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0B1B2B] mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0B1B2B] mb-1">Category</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
              >
                <option value="general">General</option>
                <option value="immigration">Immigration</option>
                <option value="housing">Housing</option>
                <option value="banking">Banking</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="employment">Employment</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="transport">Transport</option>
                <option value="travel">Travel</option>
                <option value="logistics">Logistics</option>
                <option value="tax">Tax Services</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B1B2B] mb-1">Due Date (Optional)</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#C9A24A] text-white py-2 px-4 rounded-lg hover:bg-[#B8923D] transition-colors"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-[#6B7280] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
