'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card'
import { Badge } from '@/ui/components/badge'
import { Send, CheckCircle, AlertCircle, Loader2, Building } from 'lucide-react'
import Layout from '@/components/Layout'

const contacts = [
  {
    id: 1,
    company: 'The Chancery Rosewood',
    name: 'Stephanie Clarke',
    title: 'Director of Sales & Marketing',
    email: 'stephanie.clarke@rosewoodhotels.com',
    priority: 'Medium'
  },
  {
    id: 2,
    company: 'The Chancery Rosewood',
    name: 'Michael Bonsor',
    title: 'Managing Director',
    email: 'michael.bonsor@rosewoodhotels.com',
    priority: 'High'
  },
  {
    id: 3,
    company: 'Maybourne Hotel Group',
    name: 'Simon Scoot',
    title: 'CMO',
    email: 'sscoot@maybourne.com',
    priority: 'High',
    properties: ['The Emory', 'Claridge\'s', 'The Connaught', 'The Berkeley']
  },
  {
    id: 4,
    company: 'Peninsula London',
    name: 'Susan Wheatley',
    title: 'Director of Sales & Marketing',
    email: 'susanwheatley@peninsula.com',
    priority: 'High'
  },
  {
    id: 5,
    company: 'Raffles London at The OWO',
    name: 'Fiona Harris',
    title: 'Director of Marketing and Communications',
    email: 'fiona.harris@raffles.com',
    priority: 'High'
  }
]

export default function PartnershipOutreach() {
  const [sendingStatus, setSendingStatus] = useState<Record<number, 'idle' | 'sending' | 'sent' | 'error'>>({})
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])

  const emailTemplate = (contact: typeof contacts[0]) => {
    const companyReference = contact.properties 
      ? `\n\nGiven Maybourne's exceptional portfolio (${contact.properties.join(', ')}), this could be an ideal partnership opportunity across your properties.`
      : ''

    return {
      subject: contact.properties 
        ? 'Exclusive London landing slot – 90-day serviced accommodation partnership (Maybourne Hotels)'
        : 'Exclusive London landing slot – 90-day serviced accommodation partnership',
      body: `Hi ${contact.name.split(' ')[0]},

I run The Relo Network. We act as the single point of accountability for executives and their families landing in London on short notice (typically under 30 days).

We take full responsibility for their first 14 days in the city — accommodation, schooling path, driver, childcare, banking and day-to-day stability — so neither HR nor the executive is left managing 10–12 separate vendors at 2am.

We are finalising our "First 14 Days in London" pipeline for Q4, and I am appointing one serviced accommodation / short-stay housing partner for that critical arrival window.${companyReference}

In practice, this means:
• You are presented as the default housing solution in the first 48 hours
• You receive direct introductions to high-budget incoming families and senior hires (not cold leads)
• We do not position a competitor in this category for the duration of the agreement

The Founding Partner fee for this 90-day exclusive slot is £25,000.

If you would like me to reserve this category for you, please confirm in writing (e.g. "Confirmed – Founding Partner, Serviced Accommodation") and I will send over the one-pager, onboarding details and invoice.

If I do not hear back, I will proceed with alternative providers for this category.

Best regards,

Calistar Ankrah
Founder, The Relo Network
hello@therelonetwork.com
+44 20 3105 9566`
    }
  }

  const sendEmail = async (contact: typeof contacts[0]) => {
    setSendingStatus(prev => ({ ...prev, [contact.id]: 'sending' }))
    
    try {
      const { subject, body } = emailTemplate(contact)
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: contact.email,
          from: 'hello@therelonetwork.com',
          subject,
          text: body,
          html: body.replace(/\n/g, '<br/>').replace(/•/g, '&bull;')
        })
      })

      if (!response.ok) throw new Error('Failed to send email')
      
      setSendingStatus(prev => ({ ...prev, [contact.id]: 'sent' }))
    } catch (error) {
      console.error('Error sending email:', error)
      setSendingStatus(prev => ({ ...prev, [contact.id]: 'error' }))
    }
  }

  const sendAllSelected = async () => {
    for (const contactId of selectedContacts) {
      const contact = contacts.find(c => c.id === contactId)
      if (contact && sendingStatus[contactId] !== 'sent') {
        await sendEmail(contact)
        // Wait 2 seconds between emails to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }

  const toggleSelection = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedContacts(contacts.map(c => c.id))
  }

  const deselectAll = () => {
    setSelectedContacts([])
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership Outreach
            </h1>
            <p className="text-lg text-[#6B7280]">
              Send partnership emails to luxury accommodation providers
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Email Campaign Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={selectAll} variant="outline">
                  Select All
                </Button>
                <Button onClick={deselectAll} variant="outline">
                  Deselect All
                </Button>
                <Button 
                  onClick={sendAllSelected}
                  disabled={selectedContacts.length === 0}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Selected ({selectedContacts.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {contacts.map((contact) => {
              const status = sendingStatus[contact.id] || 'idle'
              const isSelected = selectedContacts.includes(contact.id)
              
              return (
                <Card key={contact.id} className={`${isSelected ? 'ring-2 ring-[#C9A24A]' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(contact.id)}
                          className="w-5 h-5 text-[#C9A24A] border-[#C9A24A] rounded focus:ring-[#C9A24A]"
                          disabled={status === 'sent'}
                        />
                        
                        <Building className="w-8 h-8 text-[#C9A24A]" />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-[#0B1B2B]">
                              {contact.name}
                            </h3>
                            <Badge variant={contact.priority === 'High' ? 'destructive' : 'secondary'}>
                              {contact.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#6B7280]">{contact.title}</p>
                          <p className="text-sm font-medium text-[#0B1B2B]">{contact.company}</p>
                          <p className="text-sm text-blue-600">{contact.email}</p>
                          {contact.properties && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {contact.properties.map(prop => (
                                <Badge key={prop} variant="outline" className="text-xs">
                                  {prop}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {status === 'idle' && (
                          <Button 
                            onClick={() => sendEmail(contact)}
                            className="bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Email
                          </Button>
                        )}
                        
                        {status === 'sending' && (
                          <div className="flex items-center gap-2 text-[#C9A24A]">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                          </div>
                        )}
                        
                        {status === 'sent' && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span>Sent</span>
                          </div>
                        )}
                        
                        {status === 'error' && (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <span>Failed</span>
                            <Button 
                              onClick={() => sendEmail(contact)}
                              variant="outline"
                              size="sm"
                            >
                              Retry
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-[#6B7280]">
              <li>Simon Scoot receives one email covering all Maybourne properties</li>
              <li>Emails are sent with a 2-second delay between each to avoid rate limits</li>
              <li>All emails are sent from hello@therelonetwork.com</li>
              <li>Partnership fee: £25,000 for 90-day exclusive</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}