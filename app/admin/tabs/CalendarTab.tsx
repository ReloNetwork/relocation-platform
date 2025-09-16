'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card'

interface Appointment {
  id: string
  case_id: string
  title: string
  description: string | null
  starts_at: string
  ends_at: string
  type: 'consultation' | 'viewing' | 'inspection' | 'meeting'
  status: 'scheduled' | 'completed' | 'cancelled'
  provider: string | null
  created_at: string
  case_route?: string
}

interface CalendarTabProps {
  appointments: Appointment[]
}

const typeColors = {
  consultation: 'bg-blue-100 text-blue-800 border-blue-200',
  viewing: 'bg-green-100 text-green-800 border-green-200',
  inspection: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  meeting: 'bg-purple-100 text-purple-800 border-purple-200'
}

const statusColors = {
  scheduled: 'bg-blue-50 border-l-blue-400',
  completed: 'bg-green-50 border-l-green-400',
  cancelled: 'bg-red-50 border-l-red-400'
}

export default function CalendarTab({ appointments }: CalendarTabProps) {
  const groupedAppointments = useMemo(() => {
    const groups: { [key: string]: Appointment[] } = {}
    
    appointments.forEach(appointment => {
      const date = new Date(appointment.starts_at).toISOString().split('T')[0]
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(appointment)
    })

    // Sort appointments within each day by start time
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
    })

    return groups
  }, [appointments])

  const sortedDates = Object.keys(groupedAppointments).sort()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (startString: string, endString: string) => {
    const start = new Date(startString)
    const end = new Date(endString)
    const durationMs = end.getTime() - start.getTime()
    const minutes = Math.floor(durationMs / (1000 * 60))
    
    if (minutes < 60) {
      return `${minutes}m`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
    }
  }

  const getUpcomingCount = () => {
    const now = new Date()
    return appointments.filter(apt => 
      new Date(apt.starts_at) > now && apt.status === 'scheduled'
    ).length
  }

  const getTodayCount = () => {
    const today = new Date().toISOString().split('T')[0]
    return groupedAppointments[today]?.length || 0
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card className="border-[#E5E7EB] bg-[#C9A24A]/5">
        <CardHeader>
          <CardTitle className="text-[#0B1B2B] text-lg">Appointment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{appointments.length}</div>
              <div className="text-sm text-[#6B7280]">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getTodayCount()}</div>
              <div className="text-sm text-[#6B7280]">Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getUpcomingCount()}</div>
              <div className="text-sm text-[#6B7280]">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-sm text-[#6B7280]">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments by Day */}
      <div className="space-y-6">
        {sortedDates.length === 0 ? (
          <Card className="border-[#E5E7EB]">
            <CardContent className="py-8 text-center">
              <p className="text-[#6B7280]">No appointments scheduled.</p>
            </CardContent>
          </Card>
        ) : (
          sortedDates.map(date => (
            <Card key={date} className="border-[#E5E7EB]">
              <CardHeader>
                <CardTitle className="text-[#0B1B2B] text-xl">
                  {formatDate(date)}
                  <span className="ml-3 text-sm font-normal text-[#6B7280]">
                    ({groupedAppointments[date].length} appointment{groupedAppointments[date].length !== 1 ? 's' : ''})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedAppointments[date].map(appointment => (
                    <div
                      key={appointment.id}
                      className={`border-l-4 pl-4 py-3 rounded-r-lg ${statusColors[appointment.status]}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-[#0B1B2B]">{appointment.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColors[appointment.type]}`}>
                              {appointment.type}
                            </span>
                          </div>
                          
                          {appointment.description && (
                            <p className="text-sm text-[#6B7280] mb-2">{appointment.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                            <span className="font-medium">
                              {formatTime(appointment.starts_at)} - {formatTime(appointment.ends_at)}
                            </span>
                            <span>({formatDuration(appointment.starts_at, appointment.ends_at)})</span>
                            {appointment.provider && (
                              <span>Provider: {appointment.provider}</span>
                            )}
                            {appointment.case_route && (
                              <span>Case: {appointment.case_route}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4 text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}