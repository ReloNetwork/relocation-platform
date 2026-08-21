import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const partnerEnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(160),
  website: z.union([z.string().trim().url().max(500), z.literal('')]).optional(),
  serviceCategory: z.string().trim().min(2).max(160),
  partnershipInterest: z.enum(['editorial', 'network', 'ask-relo', 'unsure']),
  message: z.string().trim().min(20).max(4000),
  consent: z.literal('yes'),
})

const interestLabels = {
  editorial: 'Editorial or newsletter partnership',
  network: 'Professional network',
  'ask-relo': 'Ask Relo knowledge collaboration',
  unsure: 'Not sure yet',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;',
  })[character] as string)
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, message: 'Partner enquiries are temporarily unavailable. Please email hello@therelonetwork.com.' },
      { status: 503 },
    )
  }

  try {
    const parsed = partnerEnquirySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Please check the form and complete every required field.' },
        { status: 400 },
      )
    }

    const data = parsed.data
    const resend = new Resend(process.env.RESEND_API_KEY)
    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      company: escapeHtml(data.company),
      website: escapeHtml(data.website || 'Not provided'),
      serviceCategory: escapeHtml(data.serviceCategory),
      interest: escapeHtml(interestLabels[data.partnershipInterest]),
      message: escapeHtml(data.message).replace(/\n/g, '<br />'),
    }

    const notification = await resend.emails.send({
      from: 'The Relo Network <no-reply@therelonetwork.com>',
      to: [process.env.PARTNER_ENQUIRY_EMAIL || 'hello@therelonetwork.com'],
      reply_to: data.email,
      subject: `Partner enquiry — ${data.company}`,
      html: `<h1>New partner enquiry</h1>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Company:</strong> ${safe.company}</p>
        <p><strong>Website:</strong> ${safe.website}</p>
        <p><strong>Expertise:</strong> ${safe.serviceCategory}</p>
        <p><strong>Interest:</strong> ${safe.interest}</p>
        <p><strong>Enquiry:</strong><br />${safe.message}</p>`,
    })

    if (notification.error) {
      console.error('Partner enquiry notification failed:', notification.error)
      return NextResponse.json(
        { success: false, message: 'Your enquiry could not be sent. Please email hello@therelonetwork.com.' },
        { status: 502 },
      )
    }

    const confirmation = await resend.emails.send({
      from: 'The Relo Network <hello@therelonetwork.com>',
      to: [data.email],
      subject: 'We received your partner enquiry',
      html: `<p>Dear ${safe.name},</p>
        <p>Thank you for getting in touch about working with The Relo Network.</p>
        <p>We’ll review the fit and reply with the relevant partner information. Paid placement never guarantees a client introduction or changes our independent recommendations.</p>
        <p>The Relo Network<br />London</p>`,
    })

    if (confirmation.error) {
      console.error('Partner enquiry confirmation failed:', confirmation.error)
    }

    return NextResponse.json({ success: true, message: 'Partner enquiry received' })
  } catch (error) {
    console.error('Partner enquiry failed:', error)
    return NextResponse.json(
      { success: false, message: 'Your enquiry could not be sent. Please email hello@therelonetwork.com.' },
      { status: 500 },
    )
  }
}
