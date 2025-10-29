import { NextRequest, NextResponse } from 'next/server'
import { getWorkflowForService, serviceDeliveryChecklists } from '../../../../lib/workflows/service-delivery'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface WorkflowTriggerRequest {
  serviceType: string
  urgency?: string
  customerId: string
  customerEmail: string
  customerName: string
  referenceId: string
  triggerType: 'payment_confirmed' | 'strategy_call_booked' | 'assessment_completed'
  additionalData?: any
}

export async function POST(req: NextRequest) {
  try {
    const data: WorkflowTriggerRequest = await req.json()
    
    const { serviceType, urgency, customerId, customerEmail, customerName, referenceId, triggerType } = data
    
    // Get appropriate workflow
    const workflow = getWorkflowForService(serviceType, urgency)
    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow not found for service: ${serviceType}` },
        { status: 404 }
      )
    }
    
    // Get checklist for the trigger
    const checklist = getChecklistForTrigger(serviceType, triggerType)
    
    // Send appropriate notification emails
    await sendWorkflowNotifications(data, workflow, checklist)
    
    // Log workflow trigger for tracking
    console.log('Workflow triggered:', {
      serviceType,
      urgency,
      customerId,
      referenceId,
      triggerType,
      workflowName: workflow.name
    })
    
    return NextResponse.json({
      success: true,
      workflow: {
        name: workflow.name,
        totalDuration: workflow.totalDuration,
        nextSteps: workflow.steps.slice(0, 2).map(step => ({
          title: step.title,
          timeline: step.timeline,
          assignee: step.assignee
        }))
      },
      checklist
    })
    
  } catch (error) {
    console.error('Workflow trigger error:', error)
    return NextResponse.json(
      { error: 'Failed to trigger workflow' },
      { status: 500 }
    )
  }
}

function getChecklistForTrigger(serviceType: string, triggerType: string): string[] {
  if (serviceType === '72hour_audit' || serviceType === 'executive_intake') {
    switch (triggerType) {
      case 'payment_confirmed':
        return serviceDeliveryChecklists.executive.paymentReceived
      case 'strategy_call_booked':
        return serviceDeliveryChecklists.executive.strategyCall
      default:
        return []
    }
  }
  
  if (serviceType === 'corporate_assessment') {
    switch (triggerType) {
      case 'assessment_completed':
        return serviceDeliveryChecklists.corporate.assessmentReceived
      default:
        return []
    }
  }
  
  return []
}

async function sendWorkflowNotifications(
  data: WorkflowTriggerRequest,
  workflow: any,
  checklist: string[]
) {
  if (!process.env.RESEND_API_KEY) return
  
  const { serviceType, customerEmail, customerName, referenceId, urgency } = data
  
  // Send customer notification
  if (serviceType === '72hour_audit' && data.triggerType === 'payment_confirmed') {
    await resend.emails.send({
      from: 'Executive Team <executive@therelonetwork.com>',
      to: [customerEmail],
      subject: 'Welcome to Executive Service - Your 72-Hour Audit Begins Now',
      html: generateExecutiveWelcomeEmail(customerName, referenceId, urgency || 'normal')
    })
  }
  
  if (serviceType === 'corporate_assessment' && data.triggerType === 'assessment_completed') {
    await resend.emails.send({
      from: 'Corporate Team <corporate@therelonetwork.com>',
      to: [customerEmail],
      subject: 'Corporate Assessment Received - Proposal Within 24 Hours',
      html: generateCorporateWelcomeEmail(customerName, data.additionalData?.companyName || 'Your Company', referenceId)
    })
  }
  
  // Send internal team notification
  await resend.emails.send({
    from: 'Workflow System <workflows@therelonetwork.com>',
    to: ['hello@therelonetwork.com', 'ops@therelonetwork.com'],
    subject: `🚀 ${workflow.name} - ${data.triggerType.replace('_', ' ').toUpperCase()}`,
    html: generateInternalNotificationEmail(data, workflow, checklist)
  })
}

function generateExecutiveWelcomeEmail(name: string, referenceId: string, urgency: string): string {
  const responseTime = urgency === 'emergency' ? '2 hours' : urgency === 'urgent' ? '12 hours' : '24 hours'
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #C9A24A; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0;">Welcome to Executive Service</h1>
        <p style="margin: 10px 0 0 0;">Your 72-Hour Setup Audit has begun</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #0B1B2B;">Dear ${name},</h2>
        
        <p>Your payment has been confirmed and your 72-Hour Setup Audit is now active. Our executive team is already reviewing your requirements.</p>
        
        <div style="background: #C9A24A; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Your Reference: ${referenceId}</h3>
          <p style="margin: 0;">Please save this reference for all future communications</p>
        </div>
        
        <h3 style="color: #0B1B2B;">What Happens Next:</h3>
        <ol style="color: #6B7280; line-height: 1.6;">
          <li><strong>Strategy Call (Within ${responseTime}):</strong> Our team will call you to schedule your 60-minute consultation</li>
          <li><strong>Shortlist Preparation (Day 1-2):</strong> We begin curating your bespoke area analysis and property shortlist</li>
          <li><strong>Warm Introductions (Within 7 days):</strong> Direct connections to 3 vetted partners matching your requirements</li>
          <li><strong>30-Day Support Window:</strong> Ongoing guidance throughout your relocation process</li>
        </ol>
        
        <h3 style="color: #0B1B2B;">Your Executive Team:</h3>
        <ul style="color: #6B7280;">
          <li><strong>Priority Support:</strong> +44 20 3105 9566</li>
          <li><strong>Direct Email:</strong> executive@therelonetwork.com</li>
          <li><strong>Reference:</strong> ${referenceId}</li>
        </ul>
        
        <p>We're excited to make your London relocation effortless.</p>
        
        <p>Best regards,<br>
        <strong>The Executive Team</strong><br>
        Relo Network</p>
      </div>
    </div>
  `
}

function generateCorporateWelcomeEmail(name: string, companyName: string, referenceId: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B1B2B; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0;">Assessment Received</h1>
        <p style="margin: 10px 0 0 0;">Corporate relocation proposal in development</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #0B1B2B;">Dear ${name},</h2>
        
        <p>Thank you for completing the Corporate Assessment for ${companyName}. Our team is now preparing your customised relocation proposal.</p>
        
        <div style="background: #C9A24A; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Your Reference: ${referenceId}</h3>
          <p style="margin: 0;">All future communications will reference this ID</p>
        </div>
        
        <h3 style="color: #0B1B2B;">Next Steps (Next 48 Hours):</h3>
        <ol style="color: #6B7280; line-height: 1.6;">
          <li><strong>Within 24 hours:</strong> Complete proposal with volume pricing and SLAs</li>
          <li><strong>Within 48 hours:</strong> Service Level Agreement ready for signature</li>
          <li><strong>Upon approval:</strong> Dedicated account manager assignment</li>
        </ol>
        
        <h3 style="color: #0B1B2B;">Your Corporate Team:</h3>
        <ul style="color: #6B7280;">
          <li><strong>Corporate Support:</strong> +44 20 3105 9566</li>
          <li><strong>Direct Email:</strong> corporate@therelonetwork.com</li>
          <li><strong>Reference:</strong> ${referenceId}</li>
        </ul>
        
        <p>We look forward to supporting ${companyName}'s London relocation needs.</p>
        
        <p>Best regards,<br>
        <strong>The Corporate Team</strong><br>
        Relo Network</p>
      </div>
    </div>
  `
}

function generateInternalNotificationEmail(
  data: WorkflowTriggerRequest,
  workflow: any,
  checklist: string[]
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #059669; color: white; padding: 20px; text-align: center;">
        <h1>🚀 WORKFLOW TRIGGERED</h1>
        <h2 style="margin: 10px 0;">${workflow.name}</h2>
      </div>
      
      <div style="padding: 20px;">
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.customerName}</li>
          <li><strong>Email:</strong> ${data.customerEmail}</li>
          <li><strong>Reference:</strong> ${data.referenceId}</li>
          <li><strong>Service:</strong> ${data.serviceType}</li>
          <li><strong>Urgency:</strong> ${data.urgency || 'Standard'}</li>
        </ul>
        
        <h3>Immediate Action Items:</h3>
        <ul>
          ${checklist.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3>Workflow Timeline:</h3>
        <p><strong>Total Duration:</strong> ${workflow.totalDuration}</p>
        <p><strong>Next Steps:</strong></p>
        <ol>
          ${workflow.steps.slice(0, 3).map((step: any) => 
            `<li><strong>${step.title}</strong> (${step.timeline}) - ${step.assignee}</li>`
          ).join('')}
        </ol>
        
        <div style="background: #FEF3CD; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
          <h4 style="color: #92400E;">⚡ URGENT REMINDERS:</h4>
          <ul style="color: #92400E;">
            <li>Response time SLA in effect</li>
            <li>Customer has high expectations</li>
            <li>Update CRM with progress</li>
          </ul>
        </div>
      </div>
    </div>
  `
}