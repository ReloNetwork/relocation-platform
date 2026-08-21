import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  createExecutiveReference,
  executiveIntakeSchema,
  scoreExecutiveIntake,
} from '@/lib/executive-intake'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;',
      })[character] as string,
  )
}

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'A valid form submission is required' },
      { status: 400 },
    )
  }

  const parsed = executiveIntakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please check every required field' },
      { status: 400 },
    )
  }

  const intake = parsed.data
  const referenceId = createExecutiveReference()
  const qualification = scoreExecutiveIntake(intake)
  let supabase

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Client intake is temporarily unavailable' },
      { status: 503 },
    )
  }

  try {
    supabase = createServiceClient()
  } catch (error) {
    console.error('Executive intake storage is not configured', error)
    return NextResponse.json(
      { success: false, error: 'Client intake is temporarily unavailable' },
      { status: 503 },
    )
  }

  const { error: storageError } = await supabase
    .from('executive_intake_leads')
    .insert({
      reference_id: referenceId,
      status: 'new',
      lead_quality: qualification.quality,
      fit_score: qualification.score,
      name: intake.name,
      email: intake.email.toLowerCase(),
      phone: intake.phone || null,
      current_location: intake.currentLocation || null,
      move_date: intake.moveDate,
      budget: intake.budget,
      preferred_areas: intake.preferredAreas,
      urgency: intake.urgency,
      brief: intake,
      consented_at: new Date().toISOString(),
    })

  if (storageError) {
    console.error('Executive intake could not be stored', storageError)
    return NextResponse.json(
      { success: false, error: 'We could not save your relocation brief' },
      { status: 502 },
    )
  }

  let notificationStatus = 'not_configured'
  let confirmationStatus = 'not_configured'

  const resend = new Resend(process.env.RESEND_API_KEY)
  const from =
    process.env.RESEND_FROM_EMAIL ||
    'The Relo Network <hello@therelonetwork.com>'
  const safe = {
    name: escapeHtml(intake.name),
    email: escapeHtml(intake.email),
    phone: escapeHtml(intake.phone || 'Not provided'),
    location: escapeHtml(intake.currentLocation || 'Not provided'),
    moveDate: escapeHtml(intake.moveDate),
    budget: escapeHtml(intake.budget),
    areas: escapeHtml(intake.preferredAreas.join(', ')),
    requirements: escapeHtml(
      intake.otherRequirements || intake.specialRequirements || 'Not provided',
    ).replace(/\n/g, '<br />'),
  }

  try {
    const notification = await resend.emails.send({
      from,
      to: [process.env.EXECUTIVE_INTAKE_EMAIL || 'hello@therelonetwork.com'],
      reply_to: intake.email,
      subject: `${qualification.quality.toUpperCase()} relocation brief — ${intake.name} — ${referenceId}`,
      html: `<h1>New private relocation brief</h1>
        <p><strong>Reference:</strong> ${referenceId}</p>
        <p><strong>Lead quality:</strong> ${qualification.quality} (${qualification.score}/10)</p>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Current location:</strong> ${safe.location}</p>
        <p><strong>Move date:</strong> ${safe.moveDate}</p>
        <p><strong>Monthly housing budget:</strong> ${safe.budget}</p>
        <p><strong>Preferred areas:</strong> ${safe.areas}</p>
        <p><strong>Urgency:</strong> ${intake.urgency}</p>
        <p><strong>Additional requirements:</strong><br />${safe.requirements}</p>
        <p>Review the brief and respond within one business day.</p>`,
    })
    notificationStatus = notification.error ? 'failed' : 'sent'
    if (notification.error) {
      console.error('Executive intake notification failed', notification.error)
    }
  } catch (error) {
    notificationStatus = 'failed'
    console.error('Executive intake notification failed', error)
  }

  try {
    const confirmation = await resend.emails.send({
      from,
      to: [intake.email],
      subject: `We received your London relocation brief — ${referenceId}`,
      html: `<p>Dear ${safe.name},</p>
        <p>Thank you for sharing your London relocation brief. Your reference is <strong>${referenceId}</strong>.</p>
        <p>We will review the timing, household needs and level of support required, then reply within one business day with the most appropriate next step.</p>
        <p>No payment has been taken. If there is a strong fit, we will recommend a private briefing call or the relevant relocation engagement before sending a payment link.</p>
        <p>The Relo Network<br />London</p>`,
    })
    confirmationStatus = confirmation.error ? 'failed' : 'sent'
    if (confirmation.error) {
      console.error('Executive intake confirmation failed', confirmation.error)
    }
  } catch (error) {
    confirmationStatus = 'failed'
    console.error('Executive intake confirmation failed', error)
  }

  const { error: statusError } = await supabase
    .from('executive_intake_leads')
    .update({
      notification_status: notificationStatus,
      confirmation_status: confirmationStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('reference_id', referenceId)

  if (statusError) {
    console.error('Executive intake delivery status could not be recorded', statusError)
  }

  return NextResponse.json({
    success: true,
    referenceId,
    message: 'Your private relocation brief has been received',
  })
}
