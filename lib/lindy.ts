// Lindy AI Integration for Relo Network
// Handles voice agent integration, task creation, and case management

export interface LindyWebhookEvent {
  event_type: 'call_started' | 'call_ended' | 'task_created' | 'message_received' | 'agent_action'
  call_id?: string
  agent_id?: string
  timestamp: string
  data: {
    // Call events
    phone_number?: string
    duration?: number
    transcript?: string
    call_outcome?: 'completed' | 'missed' | 'failed'
    
    // Task events
    task_title?: string
    task_description?: string
    task_category?: string
    task_priority?: 'high' | 'medium' | 'low'
    task_due_date?: string
    
    // Message events
    message?: string
    user_intent?: string
    extracted_info?: {
      name?: string
      email?: string
      phone?: string
      location?: string
      budget?: string
      timeline?: string
      services_needed?: string[]
    }
    
    // Agent actions
    action_type?: 'schedule_consultation' | 'create_case' | 'recommend_partner' | 'send_resources'
    action_data?: any
  }
  metadata?: {
    user_id?: string
    case_id?: string
    partner_recommendations?: string[]
    follow_up_required?: boolean
  }
}

export interface LindyConfig {
  webhookSecret: string
  agentId?: string
  apiKey?: string
}

export interface CallSummary {
  callId: string
  duration: number
  outcome: 'completed' | 'missed' | 'failed'
  transcript: string
  extractedInfo: {
    name?: string
    email?: string
    phone?: string
    location?: string
    budget?: string
    timeline?: string
    servicesNeeded?: string[]
    urgency?: 'low' | 'medium' | 'high'
  }
  tasksGenerated: Array<{
    title: string
    description: string
    category: string
    priority: 'high' | 'medium' | 'low'
    dueDate?: string
  }>
  recommendedPartners: string[]
  followUpRequired: boolean
}

export class LindyAI {
  private webhookSecret: string
  private agentId?: string
  private apiKey?: string

  constructor(config?: LindyConfig) {
    this.webhookSecret = config?.webhookSecret || process.env.LINDY_WEBHOOK_SECRET || ''
    this.agentId = config?.agentId || process.env.LINDY_AGENT_ID
    this.apiKey = config?.apiKey || process.env.LINDY_API_KEY
  }

  // Verify webhook signature for security
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn('No webhook secret configured for Lindy AI')
      return true // Allow in development
    }

    try {
      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payload, 'utf8')
        .digest('hex')
      
      return `sha256=${expectedSignature}` === signature
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      return false
    }
  }

  // Process incoming webhook events from Lindy
  async processWebhookEvent(event: LindyWebhookEvent): Promise<any> {
    console.log(`Processing Lindy webhook event: ${event.event_type}`)

    switch (event.event_type) {
      case 'call_started':
        return this.handleCallStarted(event)
      
      case 'call_ended':
        return this.handleCallEnded(event)
      
      case 'task_created':
        return this.handleTaskCreated(event)
      
      case 'message_received':
        return this.handleMessageReceived(event)
      
      case 'agent_action':
        return this.handleAgentAction(event)
      
      default:
        console.log(`Unhandled event type: ${event.event_type}`)
        return { status: 'ignored', message: 'Event type not handled' }
    }
  }

  // Handle call start events
  private async handleCallStarted(event: LindyWebhookEvent) {
    const { call_id, data } = event
    
    console.log(`Call started: ${call_id} from ${data.phone_number}`)
    
    // Log call initiation (could save to database)
    return {
      status: 'success',
      message: 'Call started event processed',
      callId: call_id
    }
  }

  // Handle call end events and process outcomes
  private async handleCallEnded(event: LindyWebhookEvent) {
    const { call_id, data } = event
    
    if (!data.transcript) {
      return { status: 'warning', message: 'No transcript available' }
    }

    // Extract information from call transcript
    const extractedInfo = this.extractInfoFromTranscript(data.transcript)
    
    // Generate tasks based on conversation
    const tasks = this.generateTasksFromCall(data.transcript, extractedInfo)
    
    // Get partner recommendations
    const partners = this.getPartnerRecommendations(extractedInfo.servicesNeeded || [])

    const callSummary: CallSummary = {
      callId: call_id || 'unknown',
      duration: data.duration || 0,
      outcome: data.call_outcome || 'completed',
      transcript: data.transcript,
      extractedInfo,
      tasksGenerated: tasks,
      recommendedPartners: partners,
      followUpRequired: this.shouldFollowUp(extractedInfo, data.call_outcome)
    }

    // Create tasks in the system
    for (const task of tasks) {
      await this.createTaskInSystem(task, callSummary)
    }

    // Create case if significant consultation
    if (extractedInfo.name && extractedInfo.email) {
      await this.createCaseFromCall(callSummary)
    }

    return {
      status: 'success',
      message: 'Call ended event processed',
      summary: callSummary
    }
  }

  // Handle direct task creation events from Lindy
  private async handleTaskCreated(event: LindyWebhookEvent) {
    const { data } = event
    
    if (!data.task_title || !data.task_description) {
      return { status: 'error', message: 'Missing required task fields' }
    }

    const task = {
      title: data.task_title,
      description: data.task_description,
      category: data.task_category || 'general',
      priority: data.task_priority || 'medium',
      dueDate: data.task_due_date
    }

    await this.createTaskInSystem(task)
    
    return {
      status: 'success',
      message: 'Task created from Lindy',
      task
    }
  }

  // Handle message events for real-time processing
  private async handleMessageReceived(event: LindyWebhookEvent) {
    const { data } = event
    
    // Process user intent and extracted information
    if (data.extracted_info) {
      // Could update ongoing conversation context
      console.log('Extracted info during call:', data.extracted_info)
    }

    return {
      status: 'success',
      message: 'Message processed'
    }
  }

  // Handle specific agent actions
  private async handleAgentAction(event: LindyWebhookEvent) {
    const { data } = event
    
    switch (data.action_type) {
      case 'schedule_consultation':
        return this.scheduleConsultation(data.action_data)
      
      case 'create_case':
        return this.createCaseFromAction(data.action_data)
      
      case 'recommend_partner':
        return this.handlePartnerRecommendation(data.action_data)
      
      case 'send_resources':
        return this.sendResources(data.action_data)
      
      default:
        return { status: 'ignored', message: 'Action type not handled' }
    }
  }

  // Extract structured information from call transcript
  private extractInfoFromTranscript(transcript: string) {
    const info: any = {}
    
    // Simple keyword-based extraction (in production, use NLP/AI)
    const lines = transcript.toLowerCase()
    
    // Extract name
    const nameMatch = lines.match(/(?:my name is|i'm|i am)\s+([a-zA-Z\s]+)/i)
    if (nameMatch) info.name = nameMatch[1].trim()
    
    // Extract email
    const emailMatch = lines.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
    if (emailMatch) info.email = emailMatch[1]
    
    // Extract phone
    const phoneMatch = lines.match(/(\+?[\d\s\-\(\)]{10,})/g)
    if (phoneMatch) info.phone = phoneMatch[0]
    
    // Extract services needed
    const services = []
    if (lines.includes('property') || lines.includes('housing')) services.push('housing')
    if (lines.includes('visa') || lines.includes('immigration')) services.push('immigration')
    if (lines.includes('school') || lines.includes('education')) services.push('education')
    if (lines.includes('bank') || lines.includes('finance')) services.push('banking')
    if (lines.includes('transport') || lines.includes('car')) services.push('transport')
    
    info.servicesNeeded = services
    
    // Extract budget
    const budgetMatch = lines.match(/budget.*?([£$€]\d+[,\d]*)/i)
    if (budgetMatch) info.budget = budgetMatch[1]
    
    // Extract timeline
    if (lines.includes('urgent') || lines.includes('asap')) {
      info.urgency = 'high'
      info.timeline = 'urgent'
    } else if (lines.includes('month')) {
      info.urgency = 'medium'
      info.timeline = 'within 1 month'
    } else {
      info.urgency = 'low'
      info.timeline = 'flexible'
    }
    
    return info
  }

  // Generate relevant tasks based on call content
  private generateTasksFromCall(transcript: string, extractedInfo: any) {
    const tasks = []
    const services = extractedInfo.servicesNeeded || []
    
    // Generate tasks based on services needed
    if (services.includes('housing')) {
      tasks.push({
        title: 'Property Search Consultation',
        description: 'Schedule property viewing appointments and area assessment based on budget and preferences',
        category: 'housing',
        priority: 'high' as const,
        dueDate: this.getTaskDueDate(extractedInfo.urgency, 7)
      })
    }
    
    if (services.includes('immigration')) {
      tasks.push({
        title: 'Visa Application Review',
        description: 'Review visa requirements and prepare necessary documentation',
        category: 'immigration',
        priority: 'high' as const,
        dueDate: this.getTaskDueDate(extractedInfo.urgency, 3)
      })
    }
    
    if (services.includes('education')) {
      tasks.push({
        title: 'School Application Process',
        description: 'Research schools and begin application process for children',
        category: 'education',
        priority: 'medium' as const,
        dueDate: this.getTaskDueDate(extractedInfo.urgency, 14)
      })
    }
    
    if (services.includes('banking')) {
      tasks.push({
        title: 'Banking Setup',
        description: 'Arrange UK bank account opening and financial services setup',
        category: 'banking',
        priority: 'medium' as const,
        dueDate: this.getTaskDueDate(extractedInfo.urgency, 10)
      })
    }
    
    // Always create a follow-up task
    tasks.push({
      title: 'Follow-up Consultation',
      description: `Follow up on ${extractedInfo.name || 'client'}'s relocation progress and address any questions`,
      category: 'general',
      priority: 'low' as const,
      dueDate: this.getTaskDueDate('low', 7)
    })
    
    return tasks
  }

  // Get partner recommendations based on services needed
  private getPartnerRecommendations(servicesNeeded: string[]) {
    const recommendations = []
    
    if (servicesNeeded.includes('housing')) {
      recommendations.push('Prime Properties London')
    }
    if (servicesNeeded.includes('immigration')) {
      recommendations.push('Elite Immigration Advisors')
    }
    if (servicesNeeded.includes('banking')) {
      recommendations.push('Sterling Wealth Management')
    }
    if (servicesNeeded.includes('education')) {
      recommendations.push('Education Consultants London')
    }
    if (servicesNeeded.includes('transport')) {
      recommendations.push('Executive Transport Services')
    }
    
    return recommendations
  }

  // Determine if follow-up is required
  private shouldFollowUp(extractedInfo: any, outcome?: string) {
    if (outcome === 'missed' || outcome === 'failed') return true
    if (extractedInfo.urgency === 'high') return true
    if (extractedInfo.servicesNeeded?.length > 2) return true
    return false
  }

  // Calculate due date based on urgency
  private getTaskDueDate(urgency: string, defaultDays: number) {
    let days = defaultDays
    
    switch (urgency) {
      case 'high':
        days = Math.min(3, defaultDays)
        break
      case 'medium':
        days = Math.min(7, defaultDays)
        break
      default:
        days = defaultDays
    }
    
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }

  // Create task in the system (integrate with your task API)
  private async createTaskInSystem(task: any, callSummary?: CallSummary) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...task,
          source: 'lindy_ai',
          callId: callSummary?.callId,
          extractedInfo: callSummary?.extractedInfo
        })
      })
      
      if (response.ok) {
        console.log('Task created successfully:', task.title)
      } else {
        console.error('Failed to create task:', await response.text())
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  // Create case from call
  private async createCaseFromCall(callSummary: CallSummary) {
    try {
      const response = await fetch('/api/case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'lindy_voice_call',
          callId: callSummary.callId,
          clientInfo: callSummary.extractedInfo,
          transcript: callSummary.transcript,
          initialTasks: callSummary.tasksGenerated,
          recommendedPartners: callSummary.recommendedPartners,
          urgency: callSummary.extractedInfo.urgency || 'medium'
        })
      })
      
      if (response.ok) {
        console.log('Case created from Lindy call')
      }
    } catch (error) {
      console.error('Error creating case from call:', error)
    }
  }

  // Handle consultation scheduling
  private async scheduleConsultation(data: any) {
    // Implementation would integrate with calendar system
    console.log('Scheduling consultation:', data)
    return { status: 'success', message: 'Consultation scheduled' }
  }

  // Create case from agent action
  private async createCaseFromAction(data: any) {
    // Implementation would create a new case
    console.log('Creating case from agent action:', data)
    return { status: 'success', message: 'Case created' }
  }

  // Handle partner recommendations
  private async handlePartnerRecommendation(data: any) {
    // Implementation would send partner information
    console.log('Recommending partner:', data)
    return { status: 'success', message: 'Partner recommendation sent' }
  }

  // Send resources to client
  private async sendResources(data: any) {
    // Implementation would send relevant resources/documents
    console.log('Sending resources:', data)
    return { status: 'success', message: 'Resources sent' }
  }
}

// Singleton instance
export const lindyAI = new LindyAI()

// Utility functions
export function createLindyWebhookHandler() {
  return {
    async handleWebhook(payload: string, signature: string) {
      try {
        // Verify signature
        if (!lindyAI.verifyWebhookSignature(payload, signature)) {
          throw new Error('Invalid webhook signature')
        }
        
        // Parse event
        const event: LindyWebhookEvent = JSON.parse(payload)
        
        // Process event
        return await lindyAI.processWebhookEvent(event)
      } catch (error) {
        console.error('Webhook processing error:', error)
        throw error
      }
    }
  }
}

export function formatCallSummaryForUI(summary: CallSummary) {
  return {
    id: summary.callId,
    title: `Voice Consultation - ${summary.extractedInfo.name || 'Unknown'}`,
    duration: `${Math.floor(summary.duration / 60)}:${(summary.duration % 60).toString().padStart(2, '0')}`,
    outcome: summary.outcome,
    client: {
      name: summary.extractedInfo.name,
      email: summary.extractedInfo.email,
      phone: summary.extractedInfo.phone
    },
    servicesNeeded: summary.extractedInfo.servicesNeeded,
    urgency: summary.extractedInfo.urgency,
    tasksCreated: summary.tasksGenerated.length,
    partnersRecommended: summary.recommendedPartners.length,
    followUpRequired: summary.followUpRequired
  }
}