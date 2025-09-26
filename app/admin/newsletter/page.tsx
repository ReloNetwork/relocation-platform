'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { Mail, Download, Calendar, Users } from 'lucide-react'

interface NewsletterSubscription {
  id: number
  email: string
  name?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  subscription_date: string
  source_page?: string
  status: string
  created_at: string
}

export default function NewsletterAdminPage() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/subscriptions')
      const data = await response.json()
      
      if (data.success) {
        setSubscriptions(data.data)
        setTotalCount(data.total || data.data.length)
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Source', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Subscription Date', 'Status']
    const csvContent = [
      headers.join(','),
      ...subscriptions.map(sub => [
        sub.email,
        sub.name || '',
        sub.source || '',
        sub.utm_source || '',
        sub.utm_medium || '',
        sub.utm_campaign || '',
        new Date(sub.subscription_date).toLocaleDateString(),
        sub.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C9A24A] mx-auto"></div>
              <p className="mt-4 text-[#6B7280]">Loading newsletter subscriptions...</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Newsletter Subscribers
            </h1>
            <p className="text-xl text-[#6B7280]">
              Manage your Relo Network News subscribers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B1B2B]">{totalCount}</p>
                  <p className="text-sm text-[#6B7280]">Total Subscribers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B1B2B]">
                    {subscriptions.filter(s => s.status === 'active').length}
                  </p>
                  <p className="text-sm text-[#6B7280]">Active Subscribers</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B1B2B]">
                    {subscriptions.filter(s => {
                      const subDate = new Date(s.subscription_date)
                      const today = new Date()
                      const diffTime = Math.abs(today.getTime() - subDate.getTime())
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                      return diffDays <= 7
                    }).length}
                  </p>
                  <p className="text-sm text-[#6B7280]">This Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#0B1B2B]">Subscriber List</h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E5E7EB]">
                <thead className="bg-[#FAFAF9]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E5E7EB]">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-[#FAFAF9]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-[#6B7280] mr-2" />
                          <div>
                            <div className="text-sm font-medium text-[#0B1B2B]">
                              {subscription.email}
                            </div>
                            {subscription.name && (
                              <div className="text-sm text-[#6B7280]">
                                {subscription.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#0B1B2B]">
                          {subscription.source || 'website'}
                        </div>
                        {subscription.utm_source && (
                          <div className="text-xs text-[#6B7280]">
                            {subscription.utm_source} / {subscription.utm_medium}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                        {new Date(subscription.subscription_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscription.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {subscriptions.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#0B1B2B] mb-2">No subscribers yet</h3>
              <p className="text-[#6B7280]">Newsletter subscriptions will appear here once users start subscribing.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}