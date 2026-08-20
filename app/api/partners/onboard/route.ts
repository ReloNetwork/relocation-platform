import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing-service-role-key'
)

interface PartnerOnboardingData {
  // Basic Information
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  website?: string
  businessDescription: string
  foundedYear?: number
  companySize: string
  
  // Location and Coverage
  primaryLocation: string
  serviceAreas: string[]
  coverageZones: string[]
  postcodeCoverage?: string[]
  
  // Business Classification
  industryCategory: string
  serviceCategories: string[]
  specializations: string[]
  businessType: string
  
  // Professional Verification
  insuranceCoverage?: any
  certifications?: string[]
  regulatoryBodies?: string[]
  vatNumber?: string
  companyRegistration?: string
  
  // Pricing and Capacity
  pricingTier: string
  minimumProjectValue?: number
  maximumProjectValue?: number
  monthlyCapacity?: number
  currentAvailability: string
}

// Automated categorization logic
function categorizePartner(data: PartnerOnboardingData) {
  const categoryMappings = {
    'Property Search & Rental': {
      keywords: ['property', 'rental', 'estate', 'letting', 'real estate', 'housing'],
      accessTiers: ['free', 'premium', 'vip'],
      visibilityLevel: 'premium'
    },
    'Luxury Moving Services': {
      keywords: ['moving', 'relocation', 'removal', 'transport', 'logistics', 'shipping'],
      accessTiers: ['premium', 'vip'],
      visibilityLevel: 'premium'
    },
    'Legal & Immigration': {
      keywords: ['legal', 'immigration', 'visa', 'solicitor', 'lawyer', 'attorney'],
      accessTiers: ['premium', 'vip'],
      visibilityLevel: 'featured'
    },
    'Financial Services': {
      keywords: ['financial', 'banking', 'mortgage', 'investment', 'wealth', 'advisory'],
      accessTiers: ['premium', 'vip'],
      visibilityLevel: 'featured'
    },
    'Education & Schools': {
      keywords: ['education', 'school', 'academic', 'tutoring', 'learning'],
      accessTiers: ['free', 'premium', 'vip'],
      visibilityLevel: 'premium'
    },
    'Healthcare & Medical': {
      keywords: ['healthcare', 'medical', 'health', 'clinic', 'doctor', 'dental'],
      accessTiers: ['premium', 'vip'],
      visibilityLevel: 'featured'
    },
    'Transportation Services': {
      keywords: ['transport', 'taxi', 'chauffeur', 'driver', 'car', 'vehicle'],
      accessTiers: ['free', 'premium', 'vip'],
      visibilityLevel: 'basic'
    },
    'Home Services & Utilities': {
      keywords: ['utilities', 'home', 'maintenance', 'repair', 'installation'],
      accessTiers: ['free', 'premium'],
      visibilityLevel: 'basic'
    },
    'Lifestyle & Concierge': {
      keywords: ['concierge', 'lifestyle', 'personal', 'luxury', 'premium'],
      accessTiers: ['premium', 'vip'],
      visibilityLevel: 'featured'
    },
    'Pet Relocation': {
      keywords: ['pet', 'animal', 'veterinary', 'boarding'],
      accessTiers: ['free', 'premium', 'vip'],
      visibilityLevel: 'premium'
    }
  }

  const text = `${data.businessDescription} ${data.serviceCategories.join(' ')} ${data.specializations.join(' ')}`.toLowerCase()
  
  let bestMatch = 'Home Services & Utilities' // default
  let maxScore = 0
  
  for (const [category, config] of Object.entries(categoryMappings)) {
    const score = config.keywords.reduce((acc, keyword) => {
      return acc + (text.includes(keyword) ? 1 : 0)
    }, 0)
    
    if (score > maxScore) {
      maxScore = score
      bestMatch = category
    }
  }
  
  return {
    category: bestMatch,
    ...categoryMappings[bestMatch as keyof typeof categoryMappings]
  }
}

// Quality scoring algorithm
function calculateQualityScore(data: PartnerOnboardingData) {
  let score = 0
  
  // Basic information completeness (30 points)
  if (data.website) score += 5
  if (data.businessDescription.length > 100) score += 10
  if (data.foundedYear && (new Date().getFullYear() - data.foundedYear) >= 2) score += 10
  if (data.companyRegistration) score += 5
  
  // Professional credentials (40 points)
  if (data.insuranceCoverage) score += 20
  if (data.certifications && data.certifications.length > 0) score += 10
  if (data.regulatoryBodies && data.regulatoryBodies.length > 0) score += 10
  
  // Business scope and capacity (30 points)
  if (data.serviceAreas.length >= 3) score += 10
  if (data.specializations.length >= 2) score += 10
  if (data.monthlyCapacity && data.monthlyCapacity >= 5) score += 10
  
  return Math.min(score, 100) // Cap at 100
}

// Location-based access tier assignment
function assignLocationTiers(primaryLocation: string, serviceAreas: string[]) {
  const premiumAreas = [
    'Mayfair', 'Belgravia', 'Kensington', 'Chelsea', 'South Kensington',
    'Knightsbridge', 'Marylebone', 'Fitzrovia', 'Canary Wharf', 'City of London'
  ]
  
  const allAreas = [primaryLocation, ...serviceAreas].map(area => area.toLowerCase())
  
  const hasPremiumLocation = premiumAreas.some(premium => 
    allAreas.some(area => area.includes(premium.toLowerCase()))
  )
  
  if (hasPremiumLocation) {
    return ['free', 'premium', 'vip']
  } else {
    return ['free', 'premium']
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: PartnerOnboardingData = await request.json()
    
    // Validate required fields
    if (!formData.companyName || !formData.contactEmail || !formData.primaryLocation || 
        !formData.industryCategory || !formData.serviceCategories.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate partner ID
    const partnerId = `PARTNER-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // Run automated categorization
    const categorization = categorizePartner(formData)
    const qualityScore = calculateQualityScore(formData)
    const locationTiers = assignLocationTiers(formData.primaryLocation, formData.serviceAreas)
    
    // Determine initial approval status based on quality score
    const initialStatus = qualityScore >= 70 ? 'approved' : 'pending'
    
    // Store partner in database
    const { data: partner, error } = await supabase
      .from('partners')
      .insert({
        partner_id: partnerId,
        company_name: formData.companyName,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        website: formData.website,
        business_description: formData.businessDescription,
        founded_year: formData.foundedYear,
        company_size: formData.companySize,
        primary_location: formData.primaryLocation,
        service_areas: formData.serviceAreas,
        coverage_zones: formData.coverageZones,
        postcode_coverage: formData.postcodeCoverage,
        industry_category: categorization.category,
        service_categories: formData.serviceCategories,
        specializations: formData.specializations,
        business_type: formData.businessType,
        insurance_coverage: formData.insuranceCoverage,
        certifications: formData.certifications,
        regulatory_bodies: formData.regulatoryBodies,
        vat_number: formData.vatNumber,
        company_registration: formData.companyRegistration,
        pricing_tier: formData.pricingTier,
        minimum_project_value: formData.minimumProjectValue,
        maximum_project_value: formData.maximumProjectValue,
        monthly_capacity: formData.monthlyCapacity,
        current_availability: formData.currentAvailability,
        approval_status: initialStatus,
        quality_score: qualityScore,
        visibility_level: categorization.visibilityLevel,
        access_tiers: locationTiers,
        approved_at: initialStatus === 'approved' ? new Date().toISOString() : null,
        approved_by: initialStatus === 'approved' ? 'auto_system' : null
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save partner' },
        { status: 500 }
      )
    }

    // Send notification emails
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send confirmation to partner
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: formData.contactEmail,
          subject: `Welcome to the Relo Network - ${initialStatus === 'approved' ? 'Application Approved!' : 'Application Under Review'}`,
          html: `
            <h2>Welcome to the Relo Network Partner Directory!</h2>
            <p>Dear ${formData.contactName},</p>
            <p>Thank you for joining our premium partner network. Your application has been received and processed.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Partner Profile:</h3>
              <p><strong>Partner ID:</strong> ${partnerId}</p>
              <p><strong>Company:</strong> ${formData.companyName}</p>
              <p><strong>Category:</strong> ${categorization.category}</p>
              <p><strong>Status:</strong> ${initialStatus === 'approved' ? '✅ Approved' : '⏳ Under Review'}</p>
              <p><strong>Quality Score:</strong> ${qualityScore}/100</p>
              <p><strong>Visibility Level:</strong> ${categorization.visibilityLevel}</p>
              <p><strong>Access Tiers:</strong> ${locationTiers.join(', ')}</p>
            </div>
            
            ${initialStatus === 'approved' ? `
              <h3>🎉 Congratulations! Your application has been approved</h3>
              <p>Your business is now live in our directory and visible to clients with appropriate access levels.</p>
              
              <h3>What's Next:</h3>
              <ol>
                <li>Complete your profile setup in the partner portal</li>
                <li>Upload additional certifications and case studies</li>
                <li>Start receiving qualified leads from our client network</li>
              </ol>
            ` : `
              <h3>Application Under Review</h3>
              <p>Our team is reviewing your application. This typically takes 24-48 hours.</p>
              
              <h3>To expedite approval:</h3>
              <ul>
                <li>Ensure all insurance documents are up to date</li>
                <li>Provide professional certifications</li>
                <li>Complete your business registration details</li>
              </ul>
            `}
            
            <h3>Directory Access:</h3>
            <p>Your business will be visible to clients with: <strong>${locationTiers.join(', ')}</strong> access levels</p>
            
            <p>Questions? Contact our partner support team: <strong>+44 20 3105 9566</strong></p>
            
            <p>Best regards,<br>The Relo Network Partnership Team</p>
          `
        })

        // Send notification to admin
        await resend.emails.send({
          from: 'Relo Network <noreply@therelonetwork.com>',
          to: 'partnerships@therelonetwork.com',
          subject: `New Partner ${initialStatus === 'approved' ? 'Auto-Approved' : 'Pending Review'} - ${formData.companyName}`,
          html: `
            <h2>🚀 New Partner Onboarded</h2>
            <p><strong>Status:</strong> ${initialStatus} | <strong>Quality Score:</strong> ${qualityScore}/100</p>
            
            <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Partner Details:</h3>
              <p><strong>Company:</strong> ${formData.companyName}</p>
              <p><strong>Contact:</strong> ${formData.contactName}</p>
              <p><strong>Email:</strong> ${formData.contactEmail}</p>
              <p><strong>Phone:</strong> ${formData.contactPhone}</p>
              <p><strong>Partner ID:</strong> ${partnerId}</p>
            </div>
            
            <div style="background: #f0f8ff; border: 1px solid #b6d7ff; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Automated Categorization:</h3>
              <p><strong>Category:</strong> ${categorization.category}</p>
              <p><strong>Visibility Level:</strong> ${categorization.visibilityLevel}</p>
              <p><strong>Access Tiers:</strong> ${locationTiers.join(', ')}</p>
              <p><strong>Service Areas:</strong> ${formData.serviceAreas.join(', ')}</p>
              <p><strong>Specializations:</strong> ${formData.specializations.join(', ')}</p>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3>Quality Assessment:</h3>
              <p><strong>Overall Score:</strong> ${qualityScore}/100</p>
              <p><strong>Business Type:</strong> ${formData.businessType}</p>
              <p><strong>Pricing Tier:</strong> ${formData.pricingTier}</p>
              <p><strong>Monthly Capacity:</strong> ${formData.monthlyCapacity || 'Not specified'}</p>
              <p><strong>Insurance:</strong> ${formData.insuranceCoverage ? 'Provided' : 'Not provided'}</p>
              <p><strong>Certifications:</strong> ${formData.certifications?.length || 0}</p>
            </div>
            
            ${initialStatus === 'pending' ? `
              <div style="background: #ffe6e6; border: 1px solid #ffb3b3; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3>⏰ MANUAL REVIEW REQUIRED:</h3>
                <p>Quality score: ${qualityScore}/100 (below auto-approval threshold of 70)</p>
                <p>Please review partner credentials and approve/reject manually.</p>
              </div>
            ` : `
              <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h3>✅ AUTO-APPROVED:</h3>
                <p>Quality score: ${qualityScore}/100 (above auto-approval threshold)</p>
                <p>Partner is now live in the directory.</p>
              </div>
            `}
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
      }
    }

    // Trigger workflow automation
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/automation/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowType: 'partner_onboarding',
        partnerId: partner.id,
        triggerEvent: 'partner_signup'
      })
    }).catch(err => console.error('Workflow trigger failed:', err))

    return NextResponse.json({
      success: true,
      partnerId: partnerId,
      approvalStatus: initialStatus,
      qualityScore: qualityScore,
      category: categorization.category,
      accessTiers: locationTiers,
      visibilityLevel: categorization.visibilityLevel
    })

  } catch (error) {
    console.error('Partner onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
