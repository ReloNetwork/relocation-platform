import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  createPartnerReference,
  PARTNER_MEDIA_PACK_VERSION,
  partnerApplicationSchema,
  scorePartnerApplication,
} from '@/lib/partner-sales'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[
        character
      ] as string,
  )
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'A valid application is required.' }, { status: 400 })
  }

  const parsed = partnerApplicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Please check the form and complete every required field.' },
      { status: 400 },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, message: 'Partner applications are temporarily unavailable. Please email hello@therelonetwork.com.' },
      { status: 503 },
    )
  }

  let supabase
  try {
    supabase = createServiceClient()
  } catch (error) {
    console.error('Partner sales storage is not configured', error)
    return NextResponse.json(
      { success: false, message: 'Partner applications are temporarily unavailable. Please email hello@therelonetwork.com.' },
      { status: 503 },
    )
  }

  const application = parsed.data
  const referenceId = createPartnerReference()
  const qualification = scorePartnerApplication(application)
  const mediaPackUrl = new URL(
    '/partner-application/media-pack',
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin,
  ).toString()

  const { error: storageError } = await supabase.from('partner_sales_leads').insert({
    reference_id: referenceId,
    status: qualification.quality === 'nurture' ? 'nurture' : 'new',
    lead_quality: qualification.quality,
    fit_score: qualification.score,
    name: application.name,
    email: application.email.toLowerCase(),
    role: application.role,
    company: application.company,
    website: application.website || null,
    service_category: application.serviceCategory,
    partnership_interest: application.partnershipInterest,
    audience_fit: application.audienceFit,
    objective: application.objective,
    budget: application.budget,
    timing: application.timing,
    message: application.message,
    media_pack_version: PARTNER_MEDIA_PACK_VERSION,
    consented_at: new Date().toISOString(),
  })

  if (storageError) {
    console.error('Partner application could not be stored', storageError)
    return NextResponse.json(
      { success: false, message: 'We could not save your application. Please email hello@therelonetwork.com.' },
      { status: 502 },
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'The Relo Network <hello@therelonetwork.com>'
  const safe = {
    name: escapeHtml(application.name),
    email: escapeHtml(application.email),
    company: escapeHtml(application.company),
    category: escapeHtml(application.serviceCategory),
    message: escapeHtml(application.message).replace(/\n/g, '<br />'),
  }
  let notificationStatus = 'failed'
  let mediaPackStatus = 'failed'

  try {
    const notification = await resend.emails.send({
      from,
      to: [process.env.PARTNER_ENQUIRY_EMAIL || 'hello@therelonetwork.com'],
      reply_to: application.email,
      subject: `${qualification.quality.toUpperCase()} partner lead — ${application.company} — ${referenceId}`,
      html: `<h1>New partner application</h1>
        <p><strong>Reference:</strong> ${referenceId}</p>
        <p><strong>Fit:</strong> ${qualification.quality} (${qualification.score}/10)</p>
        <p><strong>Contact:</strong> ${safe.name} — ${safe.email}</p>
        <p><strong>Company:</strong> ${safe.company}</p>
        <p><strong>Category:</strong> ${safe.category}</p>
        <p><strong>Interest / objective:</strong> ${application.partnershipInterest} / ${application.objective}</p>
        <p><strong>Budget / timing:</strong> ${application.budget} / ${application.timing}</p>
        <p><strong>Audience fit:</strong> ${application.audienceFit}</p>
        <p><strong>Application:</strong><br />${safe.message}</p>
        <p>Review in the partner sales pipeline before proposing inventory or pricing.</p>`,
    })
    notificationStatus = notification.error ? 'failed' : 'sent'
    if (notification.error) console.error('Partner sales notification failed', notification.error)
  } catch (error) {
    console.error('Partner sales notification failed', error)
  }

  try {
    const confirmation = await resend.emails.send({
      from,
      to: [application.email],
      subject: `Your Relo Network partner brief — ${referenceId}`,
      html: `<p>Dear ${safe.name},</p>
        <p>Thank you for applying to work with The Relo Network. Your reference is <strong>${referenceId}</strong>.</p>
        <p><a href="${mediaPackUrl}">View the current partner media pack</a>, including launch inventory, editorial safeguards and reporting.</p>
        <p>We review audience fit, expertise, timing and campaign objectives before recommending a placement. If there is a strong fit, we will reply with the most relevant next step; no payment has been taken.</p>
        <p>Paid placement never guarantees a client introduction or changes an independent Ask Relo recommendation.</p>
        <p>The Relo Network<br />London</p>`,
    })
    mediaPackStatus = confirmation.error ? 'failed' : 'sent'
    if (confirmation.error) console.error('Partner media-pack delivery failed', confirmation.error)
  } catch (error) {
    console.error('Partner media-pack delivery failed', error)
  }

  const { error: statusError } = await supabase
    .from('partner_sales_leads')
    .update({
      notification_status: notificationStatus,
      media_pack_status: mediaPackStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('reference_id', referenceId)
  if (statusError) console.error('Partner delivery status could not be recorded', statusError)

  return NextResponse.json({
    success: true,
    referenceId,
    mediaPackUrl,
    message: 'Your partner application has been received.',
  })
}
