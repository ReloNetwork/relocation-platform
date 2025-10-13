'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

// Commercial placement email templates
const EMAIL_TEMPLATES = {
  cheval: {
    name: 'Cheval Collection (Serviced Residences)',
    to: 'info@chevalcollection.com',
    subject: 'Exclusive London Serviced Residence Placement — Confirmation Today',
  },
  otherhouse: {
    name: 'The Other House (Luxury Accommodations)',
    to: 'reservations@theotherhouse.com',
    subject: 'Premium Client Pipeline - London Luxury Accommodation Partnership',
  },
  cadogan: {
    name: 'Cadogan Tate (Fine Art Storage)',
    to: 'enquiries@cadogantate.com',
    subject: 'Executive Client Pipeline - Fine Art Storage Partnership',
  },
  bishops: {
    name: 'Bishop\'s Move (Relocation Services)',
    to: 'corporate@bishopsmove.com',
    subject: 'High-Value Client Pipeline - Corporate Relocation Partnership',
  },
  blackbrick: {
    name: 'Black Brick (Property Consultancy)',
    to: 'hello@black-brick.com',
    subject: 'Premium Client Pipeline - Property Consultancy Partnership',
  },
  laura: {
    name: 'Laura Devine Immigration',
    to: 'enquiries@lauradevine.com',
    subject: 'Executive Client Pipeline - Immigration Services Partnership',
  },
  davidson: {
    name: 'DavidsonMorris (Employment Law)',
    to: 'enquiries@davidsonmorris.com',
    subject: 'Corporate Client Pipeline - Employment Law Partnership',
  },
  gherson: {
    name: 'Gherson Solicitors (Immigration Law)',
    to: 'info@gherson.com',
    subject: 'Executive Client Pipeline - Immigration Law Partnership',
  }
}

export default function EmailSender() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sendEmail = async () => {
    if (!selectedTemplate) {
      setMessage('Please select an email template')
      return
    }

    setIsLoading(true)
    setMessage('')

    const template = EMAIL_TEMPLATES[selectedTemplate as keyof typeof EMAIL_TEMPLATES]
    const recipient = customTo || template.to

    try {
      // Use contact API endpoint (no auth required)
      const response = await fetch('/api/send-email-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipient,
          subject: template.subject,
          template: selectedTemplate,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
              <div style="background: #0B1B2B; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
                <p style="margin: 5px 0 0 0; font-size: 14px;">London's Premier Executive Relocation Platform</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <p>Dear Team,</p>
                
                <p>I am the Founder of Relo Network, a vetted concierge serving high-net-worth professionals relocating to London. We are appointing category-exclusive Founding Partners and would like to discuss a potential partnership.</p>
                
                <h2 style="color: #C9A24A; font-family: 'Playfair Display', Georgia, serif;">Partnership Opportunity</h2>
                
                <div style="background: #F8F9FA; padding: 20px; border-left: 4px solid #C9A24A; margin: 20px 0;">
                  <ul style="margin: 0; padding-left: 20px;">
                    <li><strong>Exclusivity:</strong> Category-exclusive placement across our platform</li>
                    <li><strong>Introductions:</strong> Minimum 20 qualified introductions per quarter</li>
                    <li><strong>Visibility:</strong> Homepage placement and editorial features</li>
                    <li><strong>Investment:</strong> £25,000 for 12 months (Founding Partner rate)</li>
                    <li><strong>Start:</strong> November 1, 2025</li>
                  </ul>
                </div>
                
                <p>Would you be available for a brief call to discuss this exclusive opportunity?</p>
                
                <p>Kind regards,</p>
                
                <div style="margin: 30px 0;">
                  <p style="margin: 0;"><strong>Calistar Ankrah</strong></p>
                  <p style="margin: 0;">Founder, Relo Network Ltd</p>
                  <p style="margin: 0;">✉ hello@therelonetwork.com</p>
                  <p style="margin: 0;">☎ +44 20 3105 9566</p>
                </div>
                
                <div style="background: #f3f4f6; padding: 15px; margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">
                  <p style="margin: 0;">Relo Network Ltd | London's Premier Executive Relocation Platform</p>
                  <p style="margin: 5px 0 0 0;">
                    <a href="https://therelonetwork.com" style="color: #C9A24A;">therelonetwork.com</a>
                  </p>
                </div>
              </div>
            </div>
          `
        }),
      })

      if (response.ok) {
        setMessage(`✅ Email sent successfully to ${recipient}`)
      } else {
        const error = await response.text()
        setMessage(`❌ Failed to send email: ${error}`)
      }
    } catch (error) {
      setMessage(`❌ Error sending email: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership Email Sender
            </h1>
            <p className="text-[#6B7280]">
              Send commercial partnership emails to potential partners
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Select Email Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                >
                  <option value="">Choose a template...</option>
                  {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => (
                    <option key={key} value={key}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedTemplate && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Default Recipient
                    </label>
                    <div className="px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-[#6B7280]">
                      {EMAIL_TEMPLATES[selectedTemplate as keyof typeof EMAIL_TEMPLATES].to}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Subject Line
                    </label>
                    <div className="px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-[#6B7280]">
                      {EMAIL_TEMPLATES[selectedTemplate as keyof typeof EMAIL_TEMPLATES].subject}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Custom Recipient (Optional)
                    </label>
                    <input
                      type="email"
                      value={customTo}
                      onChange={(e) => setCustomTo(e.target.value)}
                      placeholder="Override default recipient email..."
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={sendEmail}
                disabled={!selectedTemplate || isLoading}
                className="w-full px-4 py-3 bg-[#C9A24A] hover:bg-[#B8923D] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {isLoading ? 'Sending Email...' : 'Send Partnership Email'}
              </button>

              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('✅') 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}