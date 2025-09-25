'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import TasksKanban from '@/components/TasksKanban'

export default function TasksDemoPage() {
  const [selectedCase, setSelectedCase] = useState<string>('')

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-[#0B1B2B]/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Tasks Kanban Demo
                </h1>
                <p className="text-[#6B7280] mt-1">
                  Interactive task management with drag and drop functionality
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-[#6B7280]">Filter by Case:</span>
                  <input
                    type="text"
                    value={selectedCase}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    placeholder="Enter case ID (optional)"
                    className="px-3 py-1 border border-[#E5E7EB] rounded-md text-[#0B1B2B] text-sm"
                  />
                </label>
                {selectedCase && (
                  <button
                    onClick={() => setSelectedCase('')}
                    className="text-xs bg-[#C9A24A] text-white px-2 py-1 rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-[#0B1B2B] mb-3">How to Use the Kanban Board</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B7280]">
              <div className="flex items-start gap-2">
                <span className="text-lg">🖱️</span>
                <div>
                  <p className="font-medium text-[#0B1B2B]">Drag & Drop</p>
                  <p>Click and drag tasks between columns to update their status</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">💾</span>
                <div>
                  <p className="font-medium text-[#0B1B2B]">Auto-Save</p>
                  <p>Changes are automatically saved to the database</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">📊</span>
                <div>
                  <p className="font-medium text-[#0B1B2B]">Real-time</p>
                  <p>Task counts and positions update instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white">
          <TasksKanban caseId={selectedCase || undefined} />
        </div>

        {/* Feature List */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10">
            <h3 className="font-semibold text-[#0B1B2B] mb-4">Features Included</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Drag and drop task management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Automatic database synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Visual feedback during drag operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Task count indicators</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Case-specific filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Due date display</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Loading states and error handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Responsive design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}