import { NextResponse } from 'next/server'

// In-memory storage for demo purposes
// This connects to the same storage as the main tasks route
let tasks: Array<{
  id: string
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
  category: string
  caseId: string
  createdAt: string
  updatedAt: string
}> = []

// Load initial data if empty
if (tasks.length === 0) {
  tasks = [
    {
      id: '1',
      title: 'Submit Visa Application',
      description: 'Complete and submit visa application with required documents',
      status: 'done',
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'immigration',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Schedule Property Viewings',
      description: 'Arrange viewings for shortlisted properties in desired area',
      status: 'doing',
      priority: 'high',
      dueDate: '2024-02-01',
      category: 'housing',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Open Bank Account',
      description: 'Set up local bank account and transfer initial funds',
      status: 'doing',
      priority: 'medium',
      dueDate: '2024-02-10',
      category: 'banking',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Register Children for School',
      description: 'Complete school enrollment process for all children',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-03-01',
      category: 'education',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Set up Utilities',
      description: 'Arrange electricity, gas, water, and internet connections',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-03-15',
      category: 'housing',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Register with Local GP',
      description: 'Find and register with local healthcare provider',
      status: 'todo',
      priority: 'low',
      dueDate: '2024-03-30',
      category: 'healthcare',
      caseId: 'demo-case',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

// GET - Get single task
export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const task = tasks.find(t => t.id === params.taskId)
    
    if (!task) {
      return NextResponse.json({
        ok: false,
        error: 'Task not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      ok: true,
      task
    })
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

// PATCH - Update task
export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const updates = await req.json()
    const taskIndex = tasks.findIndex(t => t.id === params.taskId)
    
    if (taskIndex === -1) {
      return NextResponse.json({
        ok: false,
        error: 'Task not found'
      }, { status: 404 })
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      ok: true,
      task: tasks[taskIndex],
      message: 'Task updated successfully'
    })
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

// DELETE - Delete task
export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const taskIndex = tasks.findIndex(t => t.id === params.taskId)
    
    if (taskIndex === -1) {
      return NextResponse.json({
        ok: false,
        error: 'Task not found'
      }, { status: 404 })
    }

    tasks.splice(taskIndex, 1)

    return NextResponse.json({
      ok: true,
      message: 'Task deleted successfully'
    })
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}