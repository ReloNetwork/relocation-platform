import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// Initialize Stripe
let stripe: Stripe | null = null

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  }
} catch (error) {
  console.warn('Warning: Stripe not available due to missing API key')
}

export async function GET(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Receipt generation not available' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items']
    })

    if (!session || session.status !== 'complete') {
      return NextResponse.json(
        { error: 'Invalid or incomplete session' },
        { status: 400 }
      )
    }

    // Generate receipt HTML
    const receiptHtml = generateReceiptHtml(session)

    // Return as HTML for now - in production, you might want to generate a PDF
    return new NextResponse(receiptHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="relo-receipt-${sessionId.slice(-8)}.html"`
      }
    })

  } catch (error) {
    console.error('Error generating receipt:', error)
    return NextResponse.json(
      { error: 'Failed to generate receipt' },
      { status: 500 }
    )
  }
}

function generateReceiptHtml(session: Stripe.Checkout.Session): string {
  const { metadata } = session
  const amount = session.amount_total ? session.amount_total / 100 : 0
  const date = new Date(session.created * 1000).toLocaleDateString('en-GB')
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Relo Network - Payment Receipt</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0B1B2B 0%, #C9A24A 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; border: 1px solid #e5e7eb; }
        .row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .label { font-weight: bold; }
        .amount { font-size: 24px; font-weight: bold; color: #059669; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Payment Receipt</h1>
        <p>Relo Network - Emergency Corporate Relocation</p>
    </div>
    
    <div class="content">
        <h2>Receipt Details</h2>
        
        <div class="row">
            <span class="label">Receipt Number:</span>
            <span>${session.id}</span>
        </div>
        
        <div class="row">
            <span class="label">Date:</span>
            <span>${date}</span>
        </div>
        
        <div class="row">
            <span class="label">Company:</span>
            <span>${metadata?.companyName || 'N/A'}</span>
        </div>
        
        <div class="row">
            <span class="label">Request ID:</span>
            <span>${metadata?.requestId || 'N/A'}</span>
        </div>
        
        <h3>Service Details</h3>
        <table>
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Timeline</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${getPackageName(metadata?.packageId)}</td>
                    <td>${metadata?.timeline || 'N/A'}</td>
                    <td class="amount">£${amount.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
        
        <div style="border-top: 2px solid #059669; padding-top: 20px; margin-top: 20px;">
            <div class="row">
                <span class="label" style="font-size: 18px;">Total Paid:</span>
                <span class="amount" style="font-size: 24px;">£${amount.toLocaleString()}</span>
            </div>
        </div>
        
        <div style="background: #EFF6FF; border: 1px solid #DBEAFE; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #1E40AF; margin-top: 0;">Emergency Response Activated</h4>
            <p style="color: #1E40AF; margin-bottom: 0;">Our emergency team will contact you within 2 hours to begin your relocation service.</p>
        </div>
        
        <h3>Contact Information</h3>
        <p><strong>Emergency Hotline:</strong> +44 20 3974 1239</p>
        <p><strong>Email:</strong> emergency@therelonetwork.com</p>
        <p><strong>Address:</strong> One Canada Square, Canary Wharf, London E14 5AB</p>
    </div>
    
    <div class="footer">
        <p>Thank you for choosing Relo Network for your emergency corporate relocation needs.</p>
        <p>This receipt serves as proof of payment for your emergency relocation service.</p>
    </div>
</body>
</html>
  `
}

function getPackageName(packageId?: string): string {
  const packages = {
    'emergency-immediate': 'Emergency Response Package (Within 24 hours)',
    'emergency-urgent': 'Priority Response Package (Within 48 hours)', 
    'emergency-priority': 'Fast-Track Package (Within 1 week)'
  }
  
  return packages[packageId as keyof typeof packages] || 'Emergency Relocation Package'
}