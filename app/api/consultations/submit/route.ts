import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/service'

interface ConsultationRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  timeline: string
  propertyBudget: string
  propertyType: string
  neighbourhoods: string
  familySituation: string
  employer?: string
  isEmployerPaying: string
  currentLocation: string
  specificRequirements?: string
  hearAboutUs: string
}

const requiredFields: (keyof ConsultationRequest)[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'timeline',
  'propertyBudget',
  'propertyType',
  'neighbourhoods',
  'familySituation',
  'isEmployerPaying',
  'currentLocation',
  'hearAboutUs',
]

export async function POST(request: NextRequest) {
  try {
    const formData = (await request.json()) as ConsultationRequest
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: 'Missing required fields', missingFields }, { status: 400 })
    }

    const consultationId = `CON-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('consultations')
      .insert({
        consultation_id: consultationId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.employer || null,
        relocation_timeline: formData.timeline,
        destination_city: 'London',
        current_location: formData.currentLocation,
        budget: formData.propertyBudget,
        property_type: formData.propertyType,
        family_members: formData.familySituation,
        employment_assistance: formData.isEmployerPaying,
        priorities: formData.neighbourhoods,
        additional_requirements: formData.specificRequirements || null,
        how_heard: formData.hearAboutUs,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (error || !data) {
      console.error('Consultation persistence failed:', error)
      return NextResponse.json({ error: 'Failed to save consultation request' }, { status: 500 })
    }

    let confirmationSent = false
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Relo Network <hello@therelonetwork.com>',
        to: [formData.email, 'consultations@therelonetwork.com'],
        reply_to: formData.email,
        subject: `Executive relocation consultation ${consultationId}`,
        html: `<p>Thank you, ${formData.firstName}. Your consultation request has been received.</p><p>Reference: <strong>${consultationId}</strong></p><p>Our team will contact you at ${formData.phone}.</p>`,
      })
      confirmationSent = !result.error
      if (result.error) console.error('Consultation email failed:', result.error)
    }

    return NextResponse.json({
      success: true,
      consultationId,
      id: data.id,
      confirmationSent,
    })
  } catch (error) {
    console.error('Consultation submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
