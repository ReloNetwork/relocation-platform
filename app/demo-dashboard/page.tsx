'use client'

import React from 'react'
import Layout from '@/components/Layout'

export default function DemoDashboardPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Demo Dashboard
            </h1>
            <p className="text-[#6B7280] text-lg">
              Welcome to your Relo Network dashboard demo
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Relocation Progress</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <h3 className="font-medium text-green-900">Visa Application</h3>
                      <p className="text-sm text-green-700">Completed</p>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-medium text-blue-900">Property Search</h3>
                      <p className="text-sm text-blue-700">In Progress - 3 viewings scheduled</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">●</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">School Enrollment</h3>
                      <p className="text-sm text-gray-700">Pending property confirmation</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">○</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-xl font-semibold text-[#0B1B2B] mb-4">Recent Documents</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#0B1B2B]">Passport Copy</h3>
                      <p className="text-sm text-[#6B7280]">Uploaded 2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M7,11V13H17V11H7M7,15V17H17V15H7Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#0B1B2B]">Employment Contract</h3>
                      <p className="text-sm text-[#6B7280]">Uploaded 1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-lg font-semibold text-[#0B1B2B] mb-4">Your Concierge</h2>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg font-bold">CA</span>
                  </div>
                  <h3 className="font-medium text-[#0B1B2B]">Calistar Ankrah</h3>
                  <p className="text-sm text-[#6B7280] mb-4">Senior Relocation Specialist</p>
                  <button className="w-full bg-[#0B1B2B] text-white py-2 px-4 rounded-lg hover:bg-[#0B1B2B]/90 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0B1B2B]/10">
                <h2 className="text-lg font-semibold text-[#0B1B2B] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => window.location.href = '/docs'}
                    className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#FAFAF9] transition-colors"
                  >
                    <div className="font-medium text-[#0B1B2B]">Upload Document</div>
                    <div className="text-sm text-[#6B7280]">Add files to your case</div>
                  </button>
                  
                  <button 
                    onClick={() => window.location.href = '/case'}
                    className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#FAFAF9] transition-colors"
                  >
                    <div className="font-medium text-[#0B1B2B]">View My Case</div>
                    <div className="text-sm text-[#6B7280]">See case details and tasks</div>
                  </button>
                  
                  <button 
                    onClick={() => window.location.href = '/directory'}
                    className="w-full text-left p-3 border border-[#E5E7EB] rounded-lg hover:bg-[#FAFAF9] transition-colors"
                  >
                    <div className="font-medium text-[#0B1B2B]">Browse Directory</div>
                    <div className="text-sm text-[#6B7280]">Find relocation services</div>
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