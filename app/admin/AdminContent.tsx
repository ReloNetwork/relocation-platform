'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/components/tabs'
import CasesTab from './tabs/CasesTab'
import TasksTab from './tabs/TasksTab'
import CalendarTab from './tabs/CalendarTab'

interface AdminContentProps {
  initialData: {
    cases: any[]
    tasks: any[]
    appointments: any[]
  }
  orgId: string
}

export default function AdminContent({ initialData, orgId }: AdminContentProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF9] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-[#6B7280] text-lg">
            Manage cases, tasks, and appointments for your organization
          </p>
        </div>

        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-[#E5E7EB] rounded-lg p-1">
            <TabsTrigger 
              value="cases" 
              className="data-[state=active]:bg-[#C9A24A] data-[state=active]:text-white font-medium"
            >
              Cases
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="data-[state=active]:bg-[#C9A24A] data-[state=active]:text-white font-medium"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-[#C9A24A] data-[state=active]:text-white font-medium"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases" className="mt-6">
            <CasesTab initialCases={initialData.cases} orgId={orgId} />
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <TasksTab initialTasks={initialData.tasks} orgId={orgId} />
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <CalendarTab appointments={initialData.appointments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}