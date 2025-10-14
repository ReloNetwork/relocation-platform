'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Input } from '@/ui/components/input'
import { Textarea } from '@/ui/components/textarea'
import Layout from '@/components/Layout'

// Commercial placement email templates - Updated Cheval Collection
const EMAIL_TEMPLATES = {
  cheval: {
    to: 'info@chevalcollection.com',
    subject: 'Exclusive London Serviced Residence Placement — Confirmation Today',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Cheval Collection Team,</p>
    
    <p>I am the Founder of Relo Network, a vetted concierge serving high-net-worth professionals relocating to London. We are appointing two category-exclusive Founding Partners in Serviced Residences and would like to extend priority to Cheval Collection.</p>
    
    <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Appointment Summary</h2>
    
    <p><strong>Exclusivity:</strong> Sole placement within the Serviced Residences category across our Home, Directory, and concierge routing.</p>
    
    <p><strong>Introductions:</strong> A minimum of 20 concierge-qualified introductions per quarter (family composition, dates, budget captured). Where a quarterly minimum is not reached, the term is extended month-for-month until delivered.</p>
    
    <p><strong>Visibility:</strong> Homepage tile (30 days), one editorial feature, and two newsletter insertions.</p>
    
    <p><strong>Measurement:</strong> Quarterly performance reporting and appropriate data handling.</p>
    
    <p><strong>Commercials:</strong> £25,000 for 12 months (Founding Partner).</p>
    
    <p><strong>Timing:</strong> We can commence 1 November 2025 while securing exclusivity today.</p>
    
    <p>If acceptable, I will provide a one-page summary and a secure payment link to confirm.</p>
    
    <p>Kind regards,</p>
    
    <p>Calistar Ankrah<br>
    Founder, Relo Network Ltd<br>
    +44 20 3105 9566 | hello@therelonetwork.com</p>
    
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  otherhouse: {
    to: 'sales@otherhouse.com',
    subject: 'Residents\' Club — Exclusive London Placement (Decision Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear [Title] [Surname],</p>
    
    <p>As Founder of Relo Network, I invite The Other House to secure one of two category-exclusive Founding Partner positions in Serviced Residences.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Exclusivity</strong> across Home, Directory, and concierge routing.</li>
        <li><strong>Introductions:</strong> ≥20 concierge-qualified introductions per quarter; term extended where a quarterly minimum is not reached.</li>
        <li><strong>Brand alignment:</strong> Our audience seeks design-led, long-stay accommodation for London relocations.</li>
        <li><strong>Visibility & Reporting:</strong> Homepage tile (30 days), one editorial feature, two newsletter insertions; quarterly performance reporting.</li>
        <li><strong>Commercials:</strong> £25,000 for 12 months.</li>
        <li><strong>Timing:</strong> Start 1 November 2025; exclusivity confirmable today via secure link.</li>
      </ul>
    </div>
    
    <p>May I circulate the one-page outline and link?</p>
    
    <p>Yours sincerely,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  cadogantate: {
    to: 'london@cadogantate.com',
    subject: 'Exclusive UHNW Relocation Channel for London — Confirmation Today',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear [Title] [Surname],</p>
    
    <p>Relo Network routes UHNW and executive relocations—often involving fine-art and high-value effects—into London. We are appointing two category-exclusive Founding Partners in Luxury Moving / Fine-Art Logistics and propose Cadogan Tate for priority consideration.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Exclusivity</strong> across platform placements and concierge routing.</li>
        <li><strong>Introductions:</strong> Minimum 20 concierge-qualified introductions per quarter; where the minimum is not reached, the term is extended.</li>
        <li><strong>Visibility:</strong> Homepage tile (30 days), one editorial feature, two newsletter insertions.</li>
        <li><strong>Measurement:</strong> Quarterly performance report; appropriate data handling.</li>
        <li><strong>Commercials:</strong> £25,000 for 12 months.</li>
        <li><strong>Timing:</strong> Start 1 November 2025; exclusivity can be secured today via secure link.</li>
      </ul>
    </div>
    
    <p>If agreeable, I will forward the one-pager and link.</p>
    
    <p>With best regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  bishopsmove: {
    to: 'international@bishopsmove.com',
    subject: 'Exclusive International Moving Channel — London (Decision Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear [Title] [Surname],</p>
    
    <p>As Founder of Relo Network, I invite Bishop's Move (International) to assume one of two exclusive positions in International/Luxury Moving for London relocations.</p>
    
    <p>The engagement mirrors the above: exclusivity; ≥20 concierge-qualified introductions per quarter with term extension where required; homepage/editorial/newsletter; quarterly reporting; £25,000 for 12 months; 1 November 2025 commencement; confirmation today via secure link.</p>
    
    <p>I would be pleased to share the one-pager and link.</p>
    
    <p>Kind regards,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  blackbrick: {
    to: 'camilla.dell@black-brick.com',
    subject: 'Exclusive HNW Buyer Channel — London Relocations (Approval Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Ms Dell,</p>
    
    <p>I lead Relo Network, a vetted concierge introducing active HNW buyers relocating to London. We are appointing two category-exclusive Founding Partners in Prime Buyers' Agency and propose Black Brick for priority.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Exclusivity</strong> across our Home, Directory, and concierge routing.</li>
        <li><strong>Introductions:</strong> Minimum 20 buyer introductions per quarter; term extension where a quarterly minimum is not met.</li>
        <li><strong>Visibility:</strong> Homepage tile (30 days), one editorial feature, two newsletter insertions.</li>
        <li><strong>Measurement:</strong> Quarterly performance reporting.</li>
        <li><strong>Commercials:</strong> £25,000 for 12 months.</li>
        <li><strong>Timing:</strong> Start 1 November 2025; confirmation today via secure link.</li>
      </ul>
    </div>
    
    <p>If suitable, I will circulate the one-pager and link.</p>
    
    <p>Yours sincerely,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  lauradevine: {
    to: 'enquiries@lauradevine.com',
    subject: 'Exclusive HNW Immigration Channel — London (Decision Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Ms Devine,</p>
    
    <p>As Founder of Relo Network, I invite your firm to secure one of two category-exclusive Founding Partner appointments in Immigration (Boutique) for London relocations.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Exclusivity</strong> across our Home, Directory, and concierge routing.</li>
        <li><strong>Introductions:</strong> ≥20 concierge-qualified introductions per quarter; where a quarterly minimum is not met, the term is extended.</li>
        <li><strong>Visibility & Reporting:</strong> Homepage tile (30 days), one editorial feature, two newsletter insertions; quarterly performance reporting.</li>
        <li><strong>Commercials:</strong> £25,000 for 12 months.</li>
        <li><strong>Timing:</strong> Start 1 November 2025; confirmation today via secure link.</li>
      </ul>
    </div>
    
    <p>May I provide the one-pager and link?</p>
    
    <p>Yours faithfully,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  davidsonmorris: {
    to: 'hello@davidsonmorris.com',
    subject: 'Exclusive Immigration Channel — London Relocations (Confirmation Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear Ms Morris,</p>
    
    <p>We are appointing two category-exclusive Founding Partners in Immigration (Boutique) within Relo Network. The engagement provides exclusivity; minimum 20 introductions per quarter with term extension where needed; homepage/editorial/newsletter; quarterly reporting; £25,000 for 12 months; 1 November 2025 start; confirmation today via secure link.</p>
    
    <p>If agreeable, I will share the one-pager and link.</p>
    
    <p>Yours sincerely,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  },
  gherson: {
    to: 'info@gherson.com',
    subject: 'Exclusive HNWI Immigration Channel — London (Decision Today)',
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
  <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
  </div>
  
  <div style="padding: 30px 20px;">
    <p>Dear [Title] [Surname],</p>
    
    <p>We are offering two category-exclusive Founding Partner positions in Immigration (HNWI/Private) within Relo Network.</p>
    
    <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>Exclusivity</strong> across placements and concierge routing.</li>
        <li><strong>Introductions:</strong> Minimum 20 concierge-qualified introductions per quarter, with term extension where a minimum is not met.</li>
        <li><strong>Visibility & Reporting:</strong> Homepage tile (30 days), one editorial feature, two newsletter insertions; quarterly reporting.</li>
        <li><strong>Commercials:</strong> £25,000 for 12 months.</li>
        <li><strong>Timing:</strong> Start 1 November 2025; confirmation today via secure link.</li>
      </ul>
    </div>
    
    <p>If suitable, I will send the one-pager and link.</p>
    
    <p>Yours faithfully,</p>
    
    <div style="margin: 30px 0;">
      <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
      <p style="margin: 0;">Founder, Relo Network Ltd</p>
      <p style="margin: 0;">✉ hello@therelonetwork.com</p>
      <p style="margin: 0;">☎ +44 (0)20 3105 9566</p>
      <p style="margin: 0;">◆ +44 (0) 7947 115 194</p>
    </div>
  </div>
  
  <div style="background: #F8F9FA; padding: 20px; text-align: center; border-top: 1px solid #E5E7EB;">
    <p style="margin: 0; font-size: 12px; color: #6B7280;">
      Relo Network Ltd | London, United Kingdom<br>
      <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
    </p>
  </div>
</div>
    `
  }
}

export default function AdminSendEmail() {
  const [to, setTo] = useState(EMAIL_TEMPLATES.cheval.to)
  const [subject, setSubject] = useState(EMAIL_TEMPLATES.cheval.subject)
  const [html, setHtml] = useState(EMAIL_TEMPLATES.cheval.html)
  const [from, setFrom] = useState('onboarding@resend.dev')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; error?: string } | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('cheval')
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null)

  const handleSend = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      let attachmentData = null
      
      // Convert file to base64 if attachment exists
      if (attachmentFile) {
        const reader = new FileReader()
        attachmentData = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string
            const base64Data = base64.split(',')[1] // Remove data:application/pdf;base64, prefix
            resolve({
              content: base64Data,
              filename: attachmentFile.name,
              type: attachmentFile.type
            })
          }
          reader.onerror = reject
          reader.readAsDataURL(attachmentFile)
        })
      }
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:ReloSecure2024!Network')
        },
        body: JSON.stringify({
          to,
          subject,
          html,
          from,
          replyTo: from,
          attachment: attachmentData
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult({ 
          success: true, 
          message: `Email sent successfully! Message ID: ${data.messageId}` 
        })
      } else {
        setResult({ 
          success: false, 
          message: 'Failed to send email', 
          error: data.details || data.error 
        })
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Network error occurred', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    } finally {
      setLoading(false)
    }
  }

  const loadTemplate = (templateKey: string) => {
    const template = EMAIL_TEMPLATES[templateKey as keyof typeof EMAIL_TEMPLATES]
    if (template) {
      setTo(template.to)
      setSubject(template.subject)
      setHtml(template.html)
      setSelectedTemplate(templateKey)
    }
  }

  const templateOptions = [
    { key: 'cheval', label: 'Cheval Collection - Serviced Residences (Priority)' },
    { key: 'otherhouse', label: 'The Other House - Serviced Residences (Alternative)' },
    { key: 'cadogantate', label: 'Cadogan Tate - Fine Art Logistics (Priority)' },
    { key: 'bishopsmove', label: 'Bishop\'s Move - International Moving (Alternative)' },
    { key: 'blackbrick', label: 'Black Brick - Prime Buyers\' Agency (Camilla Dell)' },
    { key: 'lauradevine', label: 'Laura Devine - Immigration Boutique (Priority)' },
    { key: 'davidsonmorris', label: 'DavidsonMorris - Immigration Boutique (Alternative)' },
    { key: 'gherson', label: 'Gherson Solicitors - HNWI Immigration' }
  ]

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Commercial Partnership Placement
            </h1>
            <p className="text-[#6B7280]">
              Send professionally branded commercial placement emails with secure payment links
            </p>
            <div className="mt-3 p-3 bg-[#D1FAE5] border border-[#10B981] rounded-md">
              <p className="text-sm text-[#065F46]">
                <strong>✓ Commercial Terms:</strong> £25,000/12 months • Minimum 20 qualified introductions per quarter • Term extension guarantee
              </p>
            </div>
            <div className="mt-3 p-3 bg-[#FECACA] border border-[#EF4444] rounded-md">
              <p className="text-sm text-[#7F1D1D]">
                <strong>⚠ Decision Today:</strong> Secure payment link ready for immediate confirmation • Start 1 November 2025
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Commercial Partnership Emails</CardTitle>
              <CardDescription>
                Category-exclusive appointments with guaranteed deliverables and commercial terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Commercial Email Template</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {templateOptions.map((option) => (
                    <Button
                      key={option.key}
                      onClick={() => loadTemplate(option.key)}
                      variant={selectedTemplate === option.key ? "default" : "outline"}
                      className={`justify-start text-left h-auto py-3 px-4 ${
                        selectedTemplate === option.key 
                          ? 'bg-[#C9A24A] hover:bg-[#B8923D] text-white' 
                          : 'hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{option.label.split(' - ')[0]}</div>
                        <div className="text-xs opacity-75">{option.label.split(' - ')[1]}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#6B7280] mb-2 block">From</label>
                  <Input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="hello@therelonetwork.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#6B7280] mb-2 block">To</label>
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">PDF Attachment (One-Pager)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="text-gray-600 mb-2">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm font-medium">Click to upload one-pager PDF</p>
                      <p className="text-xs text-gray-500">Partnership summary document</p>
                    </div>
                  </label>
                  {attachmentFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                      ✓ {attachmentFile.name} ({(attachmentFile.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#6B7280] mb-2 block">Email Content (HTML)</label>
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Email HTML content"
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>

              <Button 
                onClick={handleSend}
                disabled={loading || !to || !subject || !html}
                className="bg-[#C9A24A] hover:bg-[#B8923D] w-full"
              >
                {loading ? 'Sending...' : 'Send Commercial Email'}
              </Button>

              {result && (
                <div className={`p-4 rounded-md ${
                  result.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.error && (
                    <p className="text-xs text-red-600 mt-1">{result.error}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commercial Partnership Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">A. Serviced Residences</h4>
                  <p className="text-[#6B7280]">Cheval Collection (Priority) • The Other House (Alternative)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">B. Fine Art / Luxury Moving</h4>
                  <p className="text-[#6B7280]">Cadogan Tate (Priority) • Bishop's Move (Alternative)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">C. Prime Buyers' Agency</h4>
                  <p className="text-[#6B7280]">Black Brick - Camilla Dell (Direct to Managing Partner)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">D. Immigration (Boutique)</h4>
                  <p className="text-[#6B7280]">Laura Devine (Priority) • DavidsonMorris (Alternative) • Gherson (HNWI)</p>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded-md border-l-4 border-[#C9A24A]">
                  <h4 className="font-medium mb-2">💼 Commercial Terms</h4>
                  <ul className="text-[#6B7280] space-y-1">
                    <li>• £25,000 for 12 months</li>
                    <li>• Minimum 20 qualified introductions per quarter</li>
                    <li>• Term extension if quarterly minimum not met</li>
                    <li>• Category exclusivity across platform</li>
                    <li>• Start 1 November 2025</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}