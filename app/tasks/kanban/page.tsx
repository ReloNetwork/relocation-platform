'use client';
import { useState } from 'react';
import TasksKanban from '@/components/TasksKanban';
import Layout from '@/components/Layout';

export default function KanbanPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Tasks Kanban Board
            </h1>
            <p className="text-[#6B7280] text-lg">
              Drag and drop tasks to manage your relocation workflow
            </p>
          </div>

          {/* Case Filter */}
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#0B1B2B]/10">
              <label htmlFor="case-filter" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                Filter by Case ID (optional)
              </label>
              <input
                id="case-filter"
                type="text"
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                placeholder="Enter case ID to filter tasks, or leave empty to see all"
                className="w-full max-w-md px-3 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
              />
              {selectedCaseId && (
                <button
                  onClick={() => setSelectedCaseId('')}
                  className="ml-3 px-3 py-2 text-sm bg-[#6B7280] text-white rounded-lg hover:bg-[#4B5563] transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#C9A24A]/5 rounded-xl p-4 mb-6 border border-[#C9A24A]/20">
            <h3 className="font-semibold text-[#0B1B2B] mb-2">How to use the Kanban Board:</h3>
            <ul className="space-y-1 text-sm text-[#6B7280]">
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Drag tasks between columns to update their status
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Tasks are automatically saved when moved
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Use the case ID filter to focus on specific relocations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Create test tasks using the Create Case page first
              </li>
            </ul>
          </div>

          {/* Kanban Board */}
          <TasksKanban caseId={selectedCaseId || undefined} />

          {/* Quick Actions */}
          <div className="mt-8 flex gap-4">
            <a
              href="/create-case"
              className="px-4 py-2 bg-[#0B1B2B] text-[#C9A24A] rounded-lg font-medium hover:bg-[#0B1B2B]/90 transition-colors"
            >
              Create New Case
            </a>
            <a
              href="/admin/tasks"
              className="px-4 py-2 bg-[#C9A24A] text-white rounded-lg font-medium hover:bg-[#B8923D] transition-colors"
            >
              Manage Tasks
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}