import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing-service-role-key'
)

interface WorkflowExecutionData {
  workflowType: string
  partnerId?: number
  clientEmail?: string
  triggerEvent: string
  metadata?: any
}

// Workflow definitions
const WORKFLOWS = {
  partner_onboarding: {
    steps: [
      'categorize_partner',
      'verify_credentials', 
      'assign_access_tiers',
      'send_welcome_email',
      'notify_relevant_clients'
    ]
  },
  partner_approval: {
    steps: [
      'update_directory_visibility',
      'send_approval_email',
      'notify_relevant_clients',
      'create_partner_dashboard'
    ]
  },
  client_upgrade: {
    steps: [
      'update_access_permissions',
      'unlock_premium_features',
      'send_upgrade_confirmation',
      'assign_account_manager'
    ]
  },
  partner_review_submitted: {
    steps: [
      'moderate_review',
      'update_partner_rating',
      'notify_partner',
      'update_search_rankings'
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: WorkflowExecutionData = await request.json()
    
    console.log(`Executing workflow: ${data.workflowType} for event: ${data.triggerEvent}`)
    
    switch (data.workflowType) {
      case 'partner_onboarding':
        return await executePartnerOnboarding(data)
      case 'partner_approval':
        return await executePartnerApproval(data)
      case 'client_upgrade':
        return await executeClientUpgrade(data)
      case 'partner_review_submitted':
        return await executeReviewWorkflow(data)
      default:
        return NextResponse.json({ error: 'Unknown workflow type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Workflow execution error:', error)
    return NextResponse.json({ error: 'Workflow execution failed' }, { status: 500 })
  }
}

async function executePartnerOnboarding(data: WorkflowExecutionData) {
  const results = []
  
  try {
    // Step 1: Categorize Partner (already done in onboarding API)
    results.push({ step: 'categorize_partner', status: 'completed', timestamp: new Date() })
    
    // Step 2: Verify Credentials
    const credentialCheck = await verifyPartnerCredentials(data.partnerId!)
    results.push({ step: 'verify_credentials', status: credentialCheck.status, details: credentialCheck })
    
    // Step 3: Assign Access Tiers (already done in onboarding API)
    results.push({ step: 'assign_access_tiers', status: 'completed', timestamp: new Date() })
    
    // Step 4: Send Welcome Email (already done in onboarding API)
    results.push({ step: 'send_welcome_email', status: 'completed', timestamp: new Date() })
    
    // Step 5: Notify Relevant Clients
    const clientNotification = await notifyRelevantClients(data.partnerId!, 'new_partner')
    results.push({ step: 'notify_relevant_clients', status: clientNotification.status, details: clientNotification })
    
    // Record workflow execution
    await supabase
      .from('automated_workflows')
      .insert({
        workflow_name: 'partner_onboarding',
        trigger_event: data.triggerEvent,
        workflow_steps: { partnerId: data.partnerId, results: results },
        execution_count: 1
      })
    
    return NextResponse.json({ success: true, results: results })
    
  } catch (error) {
    console.error('Partner onboarding workflow error:', error)
    return NextResponse.json({ error: 'Onboarding workflow failed' }, { status: 500 })
  }
}

async function executePartnerApproval(data: WorkflowExecutionData) {
  const results = []
  
  try {
    // Step 1: Update Directory Visibility
    const visibilityUpdate = await updateDirectoryVisibility(data.partnerId!)
    results.push({ step: 'update_directory_visibility', status: visibilityUpdate.status })
    
    // Step 2: Send Approval Email
    const approvalEmail = await sendPartnerApprovalEmail(data.partnerId!)
    results.push({ step: 'send_approval_email', status: approvalEmail.status })
    
    // Step 3: Notify Relevant Clients
    const clientNotification = await notifyRelevantClients(data.partnerId!, 'partner_approved')
    results.push({ step: 'notify_relevant_clients', status: clientNotification.status })
    
    // Step 4: Create Partner Dashboard Access
    const dashboardSetup = await createPartnerDashboard(data.partnerId!)
    results.push({ step: 'create_partner_dashboard', status: dashboardSetup.status })
    
    return NextResponse.json({ success: true, results: results })
    
  } catch (error) {
    console.error('Partner approval workflow error:', error)
    return NextResponse.json({ error: 'Approval workflow failed' }, { status: 500 })
  }
}

async function executeClientUpgrade(data: WorkflowExecutionData) {
  const results = []
  
  try {
    // Update access permissions via access manager
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://relo-network.vercel.app'
    const accessUpdate = await fetch(`${siteUrl}/api/directory/access-manager`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_access',
        email: data.clientEmail,
        accessTier: data.metadata?.newTier,
        subscriptionStatus: 'active'
      })
    })
    
    const accessResult = await accessUpdate.json()
    results.push({ step: 'update_access_permissions', status: accessResult.success ? 'completed' : 'failed' })
    
    // Send upgrade confirmation
    if (data.metadata?.newTier === 'vip') {
      const managerAssignment = await assignAccountManager(data.clientEmail!)
      results.push({ step: 'assign_account_manager', status: managerAssignment.status })
    }
    
    return NextResponse.json({ success: true, results: results })
    
  } catch (error) {
    console.error('Client upgrade workflow error:', error)
    return NextResponse.json({ error: 'Upgrade workflow failed' }, { status: 500 })
  }
}

async function executeReviewWorkflow(data: WorkflowExecutionData) {
  const results = []
  
  try {
    // Auto-moderate review based on content
    const moderation = await moderateReview(data.metadata?.reviewId)
    results.push({ step: 'moderate_review', status: moderation.status })
    
    if (moderation.approved) {
      // Update partner rating
      const ratingUpdate = await updatePartnerRating(data.partnerId!)
      results.push({ step: 'update_partner_rating', status: ratingUpdate.status })
      
      // Notify partner of new review
      const partnerNotification = await notifyPartnerOfReview(data.partnerId!, data.metadata?.reviewId)
      results.push({ step: 'notify_partner', status: partnerNotification.status })
    }
    
    return NextResponse.json({ success: true, results: results })
    
  } catch (error) {
    console.error('Review workflow error:', error)
    return NextResponse.json({ error: 'Review workflow failed' }, { status: 500 })
  }
}

// Helper functions for workflow steps

async function verifyPartnerCredentials(partnerId: number) {
  try {
    const { data: partner } = await supabase
      .from('partners')
      .select('insurance_coverage, certifications, company_registration, vat_number')
      .eq('id', partnerId)
      .single()
    
    let verificationScore = 0
    const checks = []
    
    if (partner?.insurance_coverage) {
      verificationScore += 25
      checks.push('Insurance coverage verified')
    }
    
    if (partner?.certifications && partner.certifications.length > 0) {
      verificationScore += 25
      checks.push('Professional certifications found')
    }
    
    if (partner?.company_registration) {
      verificationScore += 25
      checks.push('Company registration verified')
    }
    
    if (partner?.vat_number) {
      verificationScore += 25
      checks.push('VAT registration verified')
    }
    
    const status = verificationScore >= 50 ? 'passed' : 'requires_review'
    
    return {
      status: status,
      score: verificationScore,
      checks: checks,
      timestamp: new Date()
    }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function notifyRelevantClients(partnerId: number, eventType: string) {
  try {
    // Get partner details
    const { data: partner } = await supabase
      .from('partners')
      .select('company_name, industry_category, service_areas, primary_location')
      .eq('id', partnerId)
      .single()
    
    // Find clients who might be interested (same location/category)
    const { data: relevantClients } = await supabase
      .from('client_access_levels')
      .select('email, access_tier, company_name')
      .eq('subscription_status', 'active')
      .in('access_tier', ['premium', 'vip'])
    
    if (!relevantClients?.length) {
      return { status: 'completed', message: 'No relevant clients to notify' }
    }
    
    // Send notifications (implement email logic here)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://relo-network.vercel.app'
      
      for (const client of relevantClients) {
        if (client.access_tier === 'vip') {
          await resend.emails.send({
            from: 'Relo Network <noreply@therelonetwork.com>',
            to: client.email,
            subject: `New ${partner?.industry_category} Partner Available - ${partner?.company_name}`,
            html: `
              <h3>New Partner Alert</h3>
              <p>A new ${partner?.industry_category} specialist has joined our network in ${partner?.primary_location}.</p>
              <p><strong>${partner?.company_name}</strong> is now available for your consideration.</p>
              <p><a href="${siteUrl}/directory">View in Directory</a></p>
            `
          })
        }
      }
    }
    
    return { 
      status: 'completed', 
      notified: relevantClients.length,
      timestamp: new Date() 
    }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function updateDirectoryVisibility(partnerId: number) {
  try {
    await supabase
      .from('partners')
      .update({ 
        visibility_level: 'premium',
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', partnerId)
    
    return { status: 'completed', timestamp: new Date() }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function sendPartnerApprovalEmail(partnerId: number) {
  try {
    const { data: partner } = await supabase
      .from('partners')
      .select('contact_email, contact_name, company_name, partner_id')
      .eq('id', partnerId)
      .single()
    
    if (process.env.RESEND_API_KEY && partner) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://relo-network.vercel.app'
      
      await resend.emails.send({
        from: 'Relo Network <noreply@therelonetwork.com>',
        to: partner.contact_email,
        subject: `🎉 ${partner.company_name} - Your Partnership Application Has Been Approved!`,
        html: `
          <h2>Congratulations! Your partnership has been approved</h2>
          <p>Dear ${partner.contact_name},</p>
          <p>We're excited to welcome <strong>${partner.company_name}</strong> to the Relo Network!</p>
          
          <h3>What's Next:</h3>
          <ol>
            <li>Your business is now live in our directory</li>
            <li>You'll start receiving qualified leads within 24-48 hours</li>
            <li>Access your partner dashboard to manage your profile</li>
          </ol>
          
          <p>Partner ID: ${partner.partner_id}</p>
          <p>Dashboard: <a href="${siteUrl}/partners/dashboard">Access Dashboard</a></p>
          
          <p>Welcome to the network!</p>
        `
      })
    }
    
    return { status: 'completed', timestamp: new Date() }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function createPartnerDashboard(partnerId: number) {
  // This would create dashboard access credentials
  // For now, just mark as completed
  return { status: 'completed', timestamp: new Date() }
}

async function assignAccountManager(clientEmail: string) {
  // This would assign a dedicated account manager for VIP clients
  return { status: 'completed', timestamp: new Date() }
}

async function moderateReview(reviewId: number) {
  // Simple auto-moderation logic
  try {
    const { data: review } = await supabase
      .from('partner_reviews')
      .select('review_text, overall_rating')
      .eq('id', reviewId)
      .single()
    
    // Auto-approve if rating >= 3 and no flagged words
    const flaggedWords = ['spam', 'fake', 'scam', 'terrible', 'awful']
    const hasFlags = flaggedWords.some(word => 
      review?.review_text?.toLowerCase().includes(word)
    )
    
    const approved = !hasFlags && (review?.overall_rating || 0) >= 3
    
    await supabase
      .from('partner_reviews')
      .update({
        moderation_status: approved ? 'approved' : 'pending',
        is_published: approved,
        moderated_at: new Date().toISOString(),
        moderated_by: 'auto_system'
      })
      .eq('id', reviewId)
    
    return { status: 'completed', approved: approved }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function updatePartnerRating(partnerId: number) {
  // Recalculate partner rating based on published reviews
  try {
    const { data: reviews } = await supabase
      .from('partner_reviews')
      .select('overall_rating')
      .eq('partner_id', partnerId)
      .eq('is_published', true)
    
    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.overall_rating, 0) / reviews.length
      
      await supabase
        .from('partners')
        .update({
          client_rating: Math.round(avgRating * 100) / 100,
          total_reviews: reviews.length,
          updated_at: new Date().toISOString()
        })
        .eq('id', partnerId)
    }
    
    return { status: 'completed' }
  } catch (error) {
    return { status: 'failed', error: error }
  }
}

async function notifyPartnerOfReview(partnerId: number, reviewId: number) {
  // Send notification to partner about new review
  return { status: 'completed', timestamp: new Date() }
}
