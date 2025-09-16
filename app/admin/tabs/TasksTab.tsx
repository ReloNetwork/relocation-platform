'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { calculateSLAStatus } from '@/lib/sla'

interface Task {
  id: string
  case_id: string
  title: string
  description: string | null
  assignee_role: string
  assignee_id: string | null
  due_at: string | null
  status: 'todo' | 'doing' | 'blocked' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  case_route?: string
}

interface TasksTabProps {
  initialTasks: Task[]
  orgId: string
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
}

const slaColors = {
  ok: 'bg-green-100 text-green-800 border-green-200',
  at_risk: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  breached: 'bg-red-100 text-red-800 border-red-200'
}

export default function TasksTab({ initialTasks, orgId }: TasksTabProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null)
      return
    }

    try {
      // Update task status in database
      const response = await fetch('/api/admin/tasks/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: draggedTask.id,
          status: newStatus,
        }),
      })

      if (response.ok) {
        // Update local state
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === draggedTask.id ? { ...task, status: newStatus } : task
          )
        )
      } else {
        console.error('Failed to update task status')
      }
    } catch (error) {
      console.error('Error updating task status:', error)
    }

    setDraggedTask(null)
  }

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    })
  }

  const TaskCard = ({ task }: { task: Task }) => {
    const slaStatus = calculateSLAStatus(task.created_at, task.due_at, task.title)
    
    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
        className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-[#0B1B2B] text-sm leading-tight">{task.title}</h4>
          <div className="flex gap-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            {slaStatus.status !== 'ok' && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${slaColors[slaStatus.status]}`}>
                {slaStatus.status === 'at_risk' ? 'At Risk' : 'Breached'}
              </span>
            )}
          </div>
        </div>
        
        {task.description && (
          <p className="text-xs text-[#6B7280] mb-2 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex justify-between items-center text-xs text-[#6B7280]">
          <span>{task.case_route || 'No case info'}</span>
          <div className="flex gap-2">
            {task.due_at && (
              <span className="text-orange-600 font-medium">
                Due: {formatDate(task.due_at)}
              </span>
            )}
            {slaStatus.status !== 'ok' && (
              <span className={`font-medium ${slaStatus.status === 'breached' ? 'text-red-600' : 'text-yellow-600'}`}>
                {slaStatus.status === 'breached' ? `${slaStatus.hoursOver}h over` : `${slaStatus.hoursRemaining}h left`}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  const KanbanColumn = ({ 
    title, 
    status, 
    tasks: columnTasks, 
    className 
  }: { 
    title: string
    status: Task['status']
    tasks: Task[]
    className?: string 
  }) => (
    <div className={`flex-1 ${className}`}>
      <Card className="h-full border-[#E5E7EB]">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[#0B1B2B] text-lg">{title}</CardTitle>
            <span className="bg-[#C9A24A]/10 text-[#C9A24A] px-2 py-1 rounded-full text-sm font-medium">
              {columnTasks.length}
            </span>
          </div>
        </CardHeader>
        <CardContent 
          className="pt-0 min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          {columnTasks.length === 0 ? (
            <div className="text-center text-[#6B7280] py-8">
              <p>No {title.toLowerCase()} tasks</p>
            </div>
          ) : (
            columnTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card className="border-[#E5E7EB] bg-[#C9A24A]/5">
        <CardHeader>
          <CardTitle className="text-[#0B1B2B] text-lg">Task Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getTasksByStatus('todo').length}</div>
              <div className="text-sm text-[#6B7280]">To Do</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getTasksByStatus('doing').length}</div>
              <div className="text-sm text-[#6B7280]">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getTasksByStatus('blocked').length}</div>
              <div className="text-sm text-[#6B7280]">Blocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C9A24A]">{getTasksByStatus('done').length}</div>
              <div className="text-sm text-[#6B7280]">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        <KanbanColumn
          title="To Do"
          status="todo"
          tasks={getTasksByStatus('todo')}
        />
        <KanbanColumn
          title="Doing"
          status="doing"
          tasks={getTasksByStatus('doing')}
        />
        <KanbanColumn
          title="Blocked"
          status="blocked"
          tasks={getTasksByStatus('blocked')}
          className="opacity-75"
        />
        <KanbanColumn
          title="Done"
          status="done"
          tasks={getTasksByStatus('done')}
        />
      </div>
    </div>
  )
}