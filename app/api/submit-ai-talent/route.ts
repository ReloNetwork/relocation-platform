import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Save submission to file
    const submissionsPath = path.join(process.cwd(), 'submissions.json')
    try {
      const existingData = await fs.readFile(submissionsPath, 'utf-8')
      const submissions = JSON.parse(existingData || '[]')
      
      const newSubmission = {
        id: `AI-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...formData
      }
      
      submissions.push(newSubmission)
      await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2))
      
      console.log('✅ Form submission saved to submissions.json')
      console.log('Submission details:', newSubmission)
    } catch (fileError) {
      console.error('Error saving to file:', fileError)
    }
    
    // Format the form data for email
    const emailContent = `
      <h2>New AI Talent Relocation Assessment</h2>
      
      <h3>Company Information</h3>
      <p><strong>Company:</strong> ${formData.companyName}</p>
      <p><strong>Office Location:</strong> ${formData.officeLocation || 'Not specified'}</p>
      <p><strong>Contact:</strong> ${formData.contactName} (${formData.contactRole})</p>
      <p><strong>Email:</strong> ${formData.contactEmail}</p>
      <p><strong>Phone:</strong> ${formData.contactPhone}</p>
      
      <h3>AI Talent Details</h3>
      <p><strong>Role:</strong> ${formData.talentRole}</p>
      <p><strong>Current Location:</strong> ${formData.currentLocation}</p>
      <p><strong>Salary Range:</strong> ${formData.salaryRange || 'Not specified'}</p>
      <p><strong>Target Start Date:</strong> ${formData.targetStartDate}</p>
      <p><strong>Competing Offers:</strong> ${formData.competingOffers || 'Not specified'}</p>
      <p><strong>Visa Status:</strong> ${formData.visaStatus || 'Not specified'}</p>
      
      <h3>72-Hour Priorities</h3>
      <p><strong>Housing Budget:</strong> ${formData.housingBudget || 'Not specified'}</p>
      <p><strong>Family Size:</strong> ${formData.familySize || 'Not specified'}</p>
      <p><strong>Preferred Areas:</strong> ${formData.preferredAreas?.join(', ') || 'Not specified'}</p>
      <p><strong>School Requirements:</strong> ${formData.schoolRequirement || 'Not specified'}</p>
      <p><strong>Spouse Employment:</strong> ${formData.spouseEmployment || 'Not specified'}</p>
      
      <h3>Additional Requirements</h3>
      <p><strong>Pet Relocation:</strong> ${formData.petRelocation || 'None'}</p>
      <p><strong>Special Requirements:</strong> ${formData.specialRequirements || 'None'}</p>
      <p><strong>Referral Source:</strong> ${formData.referralSource || 'Not specified'}</p>
      
      <hr>
      <p><em>This is a high-priority AI talent relocation request. 2-hour response time committed.</em></p>
    `

    // Send confirmation email to the client
    const clientEmailContent = `
      <h2>Thank you for your AI Talent Relocation Assessment</h2>
      
      <p>Dear ${formData.contactName},</p>
      
      <p>We've received your AI talent relocation request for <strong>${formData.companyName}</strong>.</p>
      
      <h3>What happens next?</h3>
      <ul>
        <li>✓ Your assessment has been prioritised for immediate review</li>
        <li>✓ An AI relocation specialist will contact you within <strong>2 hours</strong></li>
        <li>✓ We'll prepare a customised 7-day relocation plan</li>
        <li>✓ Property shortlist will be ready within 24 hours</li>
      </ul>
      
      <h3>Your Submission Details:</h3>
      <p><strong>Role to relocate:</strong> ${formData.talentRole}</p>
      <p><strong>From:</strong> ${formData.currentLocation}</p>
      <p><strong>Target date:</strong> ${formData.targetStartDate}</p>
      <p><strong>London office:</strong> ${formData.officeLocation || 'To be confirmed'}</p>
      
      <p>In the meantime, our concierge team is available 24/7 if you have any urgent questions.</p>
      
      <p>Best regards,<br>
      The Relo Network Team<br>
      <em>Winning the AI talent war with 7-day relocations</em></p>
      
      <hr>
      <p style="font-size: 12px; color: #666;">
        The Relo Network | London, UK<br>
        24/7 Concierge Support | therelonetwork.com
      </p>
    `

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll simulate the email sending
    console.log('Sending notification email to Relo Network team...')
    console.log('Sending confirmation email to client...')
    
    // In production, you would:
    // 1. Send email to your team with formData
    // 2. Send confirmation email to formData.contactEmail
    // 3. Store in database
    // 4. Trigger any automation workflows
    
    // For demonstration, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        referenceNumber: `AI-${Date.now()}`,
        responseTime: '2 hours',
        contactName: formData.contactName,
        contactEmail: formData.contactEmail
      }
    })
    
  } catch (error) {
    console.error('Error processing AI talent assessment:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'There was an error submitting your assessment. Please try again.' 
      },
      { status: 500 }
    )
  }
}