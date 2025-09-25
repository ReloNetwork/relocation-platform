'use client'

import { useState, useEffect } from 'react'

interface LindyCall {
  id: string
  title: string
  duration: string
  outcome: 'completed' | 'missed' | 'failed'
  client: {
    name?: string
    email?: string
    phone?: string
  }
  servicesNeeded?: string[]
  urgency?: 'high' | 'medium' | 'low'
  tasksCreated: number
  partnersRecommended: number
  followUpRequired: boolean
  timestamp?: string
}

interface LindyCallsManagerProps {
  showOnlyRecent?: boolean
  maxCalls?: number
}

export function LindyCallsManager({ showOnlyRecent = false, maxCalls = 20 }: LindyCallsManagerProps) {
  const [calls, setCalls] = useState<LindyCall[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCall, setSelectedCall] = useState<LindyCall | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'missed' | 'failed'>('all')

  useEffect(() => {
    fetchCalls()
  }, [filter, maxCalls])

  const fetchCalls = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        limit: maxCalls.toString(),
        ...(filter !== 'all' && { status: filter })
      })
      
      const response = await fetch(`/api/lindy/calls?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setCalls(data.calls || [])
      } else {
        console.error('Failed to fetch calls:', data.error)
      }
    } catch (error) {
      console.error('Error fetching Lindy calls:', error)
    } finally {
      setLoading(false)
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'missed': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const formatServicesNeeded = (services: string[] = []) => {
    if (services.length === 0) return 'General inquiry'
    if (services.length <= 2) return services.join(', ')
    return `${services.slice(0, 2).join(', ')} +${services.length - 2} more`
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A24A]"></div>
        <p className="mt-2 text-[#6B7280]">Loading Lindy AI calls...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1B2B]">Lindy AI Voice Calls</h2>
          <p className="text-[#6B7280]">Voice consultations and automated lead capture</p>
        </div>
        
        {!showOnlyRecent && (
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none"
            >
              <option value="all">All Calls</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
              <option value="failed">Failed</option>
            </select>
            <button
              onClick={fetchCalls}
              className="px-4 py-2 bg-[#C9A24A] text-white rounded-lg hover:bg-[#B8923D] transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Calls List */}
      {calls.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">No calls yet</h3>
          <p className="text-[#6B7280]">
            Lindy AI voice calls will appear here once configured and receiving calls.
          </p>
          <a
            href="/api/lindy/config"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-[#C9A24A] text-white rounded-lg hover:bg-[#B8923D] transition-colors"
          >
            Check Configuration
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {calls.map((call) => (
            <div
              key={call.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCall(call)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#0B1B2B]">{call.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(call.outcome)}`}>
                      {call.outcome}
                    </span>
                    {call.urgency && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(call.urgency)}`}>
                        {call.urgency} priority
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-[#6B7280]">Duration:</span>
                      <div className="font-medium">{call.duration}</div>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Client:</span>
                      <div className="font-medium">{call.client.name || 'Unknown'}</div>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Services:</span>
                      <div className="font-medium">{formatServicesNeeded(call.servicesNeeded)}</div>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Tasks Created:</span>
                      <div className="font-medium">{call.tasksCreated}</div>
                    </div>
                  </div>
                </div>
                
                {call.followUpRequired && (
                  <div className="flex items-center gap-1 text-orange-600 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                    </svg>
                    Follow-up required
                  </div>
                )}
              </div>
              
              {call.client.email && (
                <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                  <span>📧 {call.client.email}</span>
                  {call.client.phone && <span>📱 {call.client.phone}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#0B1B2B]">{selectedCall.title}</h2>
                  <p className="text-[#6B7280]">Call ID: {selectedCall.id}</p>
                </div>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-[#6B7280] hover:text-[#0B1B2B] text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Call Summary */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Call Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6B7280]">Duration:</span>
                    <div className="font-medium">{selectedCall.duration}</div>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Outcome:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(selectedCall.outcome)}`}>
                      {selectedCall.outcome}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Tasks Created:</span>
                    <div className="font-medium">{selectedCall.tasksCreated}</div>
                  </div>
                  <div>
                    <span className="text-[#6B7280]">Partners Recommended:</span>
                    <div className="font-medium">{selectedCall.partnersRecommended}</div>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              {selectedCall.client.name && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Client Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-[#6B7280]">Name:</span> {selectedCall.client.name}</div>
                    {selectedCall.client.email && (
                      <div><span className="text-[#6B7280]">Email:</span> {selectedCall.client.email}</div>
                    )}
                    {selectedCall.client.phone && (
                      <div><span className="text-[#6B7280]">Phone:</span> {selectedCall.client.phone}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Services Needed */}
              {selectedCall.servicesNeeded && selectedCall.servicesNeeded.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Services Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCall.servicesNeeded.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#C9A24A]/10 text-[#C9A24A] text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Navigate to tasks related to this call
                    window.location.href = `/tasks?call_id=${selectedCall.id}`
                  }}
                  className="flex-1 bg-[#C9A24A] text-white py-2 px-4 rounded-lg hover:bg-[#B8923D] transition-colors"
                >
                  View Tasks ({selectedCall.tasksCreated})
                </button>
                {selectedCall.client.email && (
                  <button
                    onClick={() => {
                      // Navigate to case for this client
                      window.location.href = `/case?email=${selectedCall.client.email}`
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Case
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LindyCallsManager