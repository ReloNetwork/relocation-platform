'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { Clock, Users, AlertTriangle, CheckCircle, Calendar, Phone, Mail, ArrowRight, Target, TrendingUp } from 'lucide-react'

interface ServiceItem {
  id: string
  referenceId: string
  customerName: string
  customerEmail: string
  serviceType: string
  urgency: string
  status: string
  timeRemaining: string
  nextAction: string
  assignee: string
  createdAt: string
  deadline: string
}

export default function ServiceDashboardPage() {
  const [activeServices, setActiveServices] = useState<ServiceItem[]>([])
  const [filter, setFilter] = useState<'all' | 'emergency' | 'urgent' | 'overdue'>('all')
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockServices: ServiceItem[] = [
      {
        id: '1',
        referenceId: 'EX-12345678',
        customerName: 'Alexandra Thompson',
        customerEmail: 'alexandra@techcorp.com',
        serviceType: '72hour_audit',
        urgency: 'emergency',
        status: 'awaiting_contact',
        timeRemaining: '45 minutes',
        nextAction: 'Emergency contact call',
        assignee: 'Executive Team Lead',
        createdAt: '2025-01-15T10:15:00Z',
        deadline: '2025-01-15T12:15:00Z'
      },
      {
        id: '2',
        referenceId: 'CA-87654321',
        customerName: 'Marcus Williams',
        customerEmail: 'marcus.williams@globalfinance.com',
        serviceType: 'corporate_assessment',
        urgency: 'standard',
        status: 'proposal_pending',
        timeRemaining: '8 hours',
        nextAction: 'Send corporate proposal',
        assignee: 'Corporate Sales Team',
        createdAt: '2025-01-14T16:30:00Z',
        deadline: '2025-01-15T16:30:00Z'
      },
      {
        id: '3',
        referenceId: 'EX-11223344',
        customerName: 'Sarah Chen',
        customerEmail: 'sarah.chen@consulting.com',
        serviceType: '72hour_audit',
        urgency: 'urgent',
        status: 'strategy_call_scheduled',
        timeRemaining: '2 hours',
        nextAction: 'Conduct strategy call',
        assignee: 'Senior Executive Specialist',
        createdAt: '2025-01-14T09:00:00Z',
        deadline: '2025-01-15T15:00:00Z'
      }
    ]
    
    setActiveServices(mockServices)
    setLoading(false)
  }, [])

  const filteredServices = activeServices.filter(service => {
    if (filter === 'all') return true
    if (filter === 'emergency') return service.urgency === 'emergency'
    if (filter === 'urgent') return service.urgency === 'urgent' || service.urgency === 'emergency'
    if (filter === 'overdue') {
      const deadline = new Date(service.deadline)
      return deadline < new Date()
    }
    return true
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200'
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting_contact': return 'bg-red-100 text-red-800'
      case 'strategy_call_scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'proposal_pending': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: activeServices.length,
    emergency: activeServices.filter(s => s.urgency === 'emergency').length,
    urgent: activeServices.filter(s => s.urgency === 'urgent').length,
    overdue: activeServices.filter(s => new Date(s.deadline) < new Date()).length
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading service dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2">Service Delivery Dashboard</h1>
          <p className="text-[#6B7280]">Real-time tracking of active customer services and SLA compliance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">Active Services</p>
                <p className="text-2xl font-bold text-[#0B1B2B]">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-[#C9A24A]" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">Emergency</p>
                <p className="text-2xl font-bold text-red-600">{stats.emergency}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">Urgent</p>
                <p className="text-2xl font-bold text-orange-600">{stats.urgent}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <Target className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Services' },
              { key: 'emergency', label: 'Emergency' },
              { key: 'urgent', label: 'Urgent' },
              { key: 'overdue', label: 'Overdue' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-[#C9A24A] text-white'
                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                }`}
              >
                {label}
                {key !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-black/10 rounded-full text-xs">
                    {key === 'emergency' ? stats.emergency : 
                     key === 'urgent' ? stats.urgent : 
                     key === 'overdue' ? stats.overdue : 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Service List */}
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#0B1B2B]">{service.customerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(service.urgency)}`}>
                        {service.urgency.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#6B7280] text-sm">{service.referenceId} • {service.customerEmail}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#0B1B2B]">Time Remaining</p>
                    <p className={`text-lg font-bold ${
                      service.timeRemaining.includes('minutes') ? 'text-red-600' : 
                      service.timeRemaining.includes('hour') ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {service.timeRemaining}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">Service Type</p>
                    <p className="text-sm text-[#0B1B2B]">
                      {service.serviceType === '72hour_audit' ? '72-Hour Audit' : 'Corporate Assessment'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">Next Action</p>
                    <p className="text-sm text-[#0B1B2B]">{service.nextAction}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">Assignee</p>
                    <p className="text-sm text-[#0B1B2B]">{service.assignee}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created: {new Date(service.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Deadline: {new Date(service.deadline).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#6B7280] hover:text-[#0B1B2B] transition-colors">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#6B7280] hover:text-[#0B1B2B] transition-colors">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#C9A24A] text-white text-sm font-medium rounded-lg hover:bg-[#B8923D] transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">No services match your filter</h3>
            <p className="text-[#6B7280]">
              {filter === 'all' ? 'No active services at the moment' : `No ${filter} services found`}
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}