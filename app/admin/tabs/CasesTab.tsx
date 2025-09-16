'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'

interface Case {
  id: string
  client_id: string
  route_from: string
  route_to: string
  move_date: string | null
  status: string
  created_at: string
  client_name?: string
}

interface CasesTabProps {
  initialCases: Case[]
  orgId: string
}

const statusOptions = ['intake', 'scoping', 'quoting', 'booked', 'in_transit', 'settling', 'complete', 'on_hold']
const statusColors: { [key: string]: string } = {
  intake: 'bg-blue-100 text-blue-800',
  scoping: 'bg-yellow-100 text-yellow-800',
  quoting: 'bg-orange-100 text-orange-800',
  booked: 'bg-green-100 text-green-800',
  in_transit: 'bg-purple-100 text-purple-800',
  settling: 'bg-indigo-100 text-indigo-800',
  complete: 'bg-gray-100 text-gray-800',
  on_hold: 'bg-red-100 text-red-800'
}

export default function CasesTab({ initialCases, orgId }: CasesTabProps) {
  const [cases, setCases] = useState(initialCases)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCases = useMemo(() => {
    return cases.filter(case_ => {
      const matchesStatus = !statusFilter || case_.status === statusFilter
      const matchesSearch = !searchQuery || 
        (case_.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         case_.route_from.toLowerCase().includes(searchQuery.toLowerCase()) ||
         case_.route_to.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesStatus && matchesSearch
    })
  }, [cases, statusFilter, searchQuery])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="text-[#0B1B2B]">Filter Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-[#6B7280] mb-2">
                Search by client name or route
              </label>
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases..."
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[#6B7280] mb-2">
                Filter by status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              >
                <option value="">All statuses</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="grid gap-4">
        {filteredCases.length === 0 ? (
          <Card className="border-[#E5E7EB]">
            <CardContent className="py-8 text-center">
              <p className="text-[#6B7280]">
                {cases.length === 0 ? 'No cases found.' : 'No cases match your filters.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCases.map(case_ => (
            <Card key={case_.id} className="border-[#E5E7EB] hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#0B1B2B]">
                        {case_.client_name || 'Unnamed Client'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[case_.status] || 'bg-gray-100 text-gray-800'}`}>
                        {case_.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-[#6B7280]">Route:</span>
                        <p className="font-medium text-[#0B1B2B]">
                          {case_.route_from} → {case_.route_to}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">Move Date:</span>
                        <p className="font-medium text-[#0B1B2B]">
                          {formatDate(case_.move_date)}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">Created:</span>
                        <p className="font-medium text-[#0B1B2B]">
                          {formatDate(case_.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 text-sm text-[#C9A24A] border border-[#C9A24A] rounded-md hover:bg-[#C9A24A] hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {cases.length > 0 && (
        <Card className="border-[#E5E7EB] bg-[#C9A24A]/5">
          <CardHeader>
            <CardTitle className="text-[#0B1B2B] text-lg">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#C9A24A]">{cases.length}</div>
                <div className="text-sm text-[#6B7280]">Total Cases</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C9A24A]">
                  {cases.filter(c => ['intake', 'scoping', 'quoting'].includes(c.status)).length}
                </div>
                <div className="text-sm text-[#6B7280]">Planning Phase</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C9A24A]">
                  {cases.filter(c => ['booked', 'in_transit', 'settling'].includes(c.status)).length}
                </div>
                <div className="text-sm text-[#6B7280]">Active Moves</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C9A24A]">
                  {cases.filter(c => c.status === 'complete').length}
                </div>
                <div className="text-sm text-[#6B7280]">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}