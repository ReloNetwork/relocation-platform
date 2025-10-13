'use client'

import { useState } from 'react'

const schoolsData = [
  { name: "Westminster School", contact: "Director of Marketing & Comms", email: "communications@westminster.org.uk", area: "Westminster SW1" },
  { name: "St Paul's School (boys)", contact: "Ellie Sleeman", email: "EMS@stpaulsschool.org.uk", area: "Barnes SW13" },
  { name: "St Paul's Girls' School", contact: "Marketing Team", email: "frontoffice@spgs.org", area: "Hammersmith W6" },
  { name: "King's College School, Wimbledon", contact: "Director of Communications", email: "enquiries@kcs.org.uk", area: "SW19" },
  { name: "Harrow School", contact: "Communications Team", email: "comms@harrowschool.org.uk", area: "Harrow-on-the-Hill HA1" },
  { name: "Eton College", contact: "J. Nolan", email: "J.Nolan@etoncollege.org.uk", area: "Windsor SL4" },
  { name: "Dulwich College", contact: "Dr Nick Black", email: "blacknd@dulwich.org.uk", area: "Dulwich SE21" },
  { name: "Highgate School", contact: "Communications Team", email: "communications@highgateschool.org.uk", area: "Highgate N6" },
  { name: "City of London School (boys)", contact: "Director of Philanthropy & External Engagement", email: "enquiries@cityoflondonschool.org.uk", area: "City EC4" },
  { name: "City of London School for Girls", contact: "Director of External Relations", email: "marketing@clsg.org.uk", area: "Barbican EC2" },
  { name: "Godolphin & Latymer", contact: "Head of Marketing & Communications", email: "office@godolphinandlatymer.com", area: "Hammersmith W6" },
  { name: "Latymer Upper School", contact: "Head of Marketing", email: "head@latymer-upper.org", area: "Hammersmith W6" },
  { name: "University College School (UCS)", contact: "Communications Team", email: "ssadmissions@ucs.org.uk", area: "Hampstead NW3" },
  { name: "North London Collegiate", contact: "Media Team", email: "media@nlcs.org.uk", area: "Edgware HA8" },
  { name: "Wycombe Abbey", contact: "Sian Rees-Evans", email: "sre@wycombeabbey.com", area: "High Wycombe HP11" },
  { name: "Wellington College", contact: "Marketing Team", email: "admissions@wellingtoncollege.org.uk", area: "Crowthorne RG45" },
  { name: "Sevenoaks School", contact: "Rebecca Dunstan", email: "admin@sevenoaksschool.org", area: "Sevenoaks TN13" }
]

export default function SchoolsOutreachAdmin() {
  const [selectedSchool, setSelectedSchool] = useState(schoolsData[0])
  const [subject, setSubject] = useState("Education Partnership Opportunity - Supporting Relocating Families")
  const [emailBody, setEmailBody] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<string | null>(null)

  // Generate email body based on selected school
  const generateEmailBody = (school: any) => {
    const contactName = school.contact.includes('Team') || school.contact.includes('Director') || school.contact.includes('Head') 
      ? school.contact 
      : school.contact
    
    return `Dear ${contactName},

I'm the Founder of The Relo Network, a private relocation concierge and editorial platform that supports internationally mobile professionals and families moving to London.

Each month, our guides help families explore London's key neighbourhoods, property options, and schools that align with their values and lifestyle. We're now curating a limited number of Education Partner features for the upcoming term — highlighting schools that stand out for academic excellence, community ethos, and support for relocating families.

I've attached a short overview of the programme. There are three remaining placements for this intake, each including a complimentary editorial feature and homepage exposure.

Would you be open to a brief call today or tomorrow to discuss whether this could complement your admissions and outreach strategy?

Warm regards,

Calistar Ankrah
Founder | The Relo Network
hello@therelonetwork.com | +44 (0)20 3105 9566
therelonetwork.com`
  }

  const handleSchoolChange = (school: any) => {
    setSelectedSchool(school)
    setEmailBody(generateEmailBody(school))
  }

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachment(file)
    }
  }

  const handleSendEmail = async () => {
    if (!attachment) {
      alert('Please attach the programme overview document before sending.')
      return
    }

    setIsSending(true)
    setSendResult(null)

    try {
      const formData = new FormData()
      formData.append('to', selectedSchool.email)
      formData.append('subject', subject)
      formData.append('html', emailBody.replace(/\n/g, '<br>'))
      formData.append('from', 'hello@therelonetwork.com')
      formData.append('attachment', attachment)

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSendResult(`✅ Email sent successfully to ${selectedSchool.name}!`)
      } else {
        const errorData = await response.json()
        setSendResult(`❌ Failed to send email: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      setSendResult(`❌ Error sending email: ${error}`)
    } finally {
      setIsSending(false)
    }
  }

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailBody)
    alert('Email body copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF9] to-[#F5F5F4] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9A24A] to-[#B8923D] bg-clip-text text-transparent">
                Schools Outreach Campaign
              </h1>
              <p className="text-gray-600 mt-2">Quick school partnership outreach emails</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#C9A24A]">RELO NETWORK</div>
              <div className="text-sm text-gray-500">Admin Panel</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select School</h2>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg p-2">
              {schoolsData.map((school, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSchool.name === school.name
                      ? 'border-[#C9A24A] bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10'
                      : 'border-gray-200 hover:border-[#C9A24A]/50'
                  }`}
                  onClick={() => handleSchoolChange(school)}
                >
                  <div className="font-semibold text-gray-800">{school.name}</div>
                  <div className="text-sm text-gray-600">{school.contact}</div>
                  <div className="text-sm text-[#C9A24A]">{school.email}</div>
                  <div className="text-xs text-gray-500">{school.area}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Composition */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Email Details</h2>
            
            {/* School Info */}
            <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 rounded-lg p-4 mb-4">
              <div className="font-semibold text-gray-800">{selectedSchool.name}</div>
              <div className="text-sm text-gray-600">To: {selectedSchool.email}</div>
              <div className="text-sm text-gray-600">Contact: {selectedSchool.contact}</div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
              />
            </div>

            {/* Email Body */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={12}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24A] font-mono text-sm"
                placeholder="Email content will be generated automatically..."
              />
            </div>

            {/* Attachment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Programme Overview Document</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleAttachmentChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
              />
              {attachment && (
                <div className="mt-2 text-sm text-green-600">
                  ✅ Attached: {attachment.name}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSendEmail}
                disabled={isSending || !attachment}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  isSending || !attachment
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#C9A24A] to-[#B8923D] hover:from-[#B8923D] hover:to-[#A67C2A] text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSending ? 'Sending...' : 'Send Email'}
              </button>
              
              <button
                onClick={copyEmailToClipboard}
                className="px-4 py-3 border border-[#C9A24A] text-[#C9A24A] rounded-lg hover:bg-[#C9A24A] hover:text-white transition-all"
              >
                Copy
              </button>
            </div>

            {/* Generate Email Body Button */}
            <button
              onClick={() => setEmailBody(generateEmailBody(selectedSchool))}
              className="w-full mt-3 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              🔄 Regenerate Email Body
            </button>
          </div>
        </div>

        {/* Send Result */}
        {sendResult && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB]">
            <div className="text-center text-lg">{sendResult}</div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 rounded-xl p-6 border border-[#C9A24A]/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Select a school from the list to auto-generate personalized email</li>
            <li>• Attach your 1-page schools pack (required)</li>
            <li>• Review and customize the email body if needed</li>
            <li>• Click "Send Email" to send via Resend</li>
            <li>• Or copy the email to send through your preferred email client</li>
          </ul>
        </div>
      </div>
    </div>
  )
}