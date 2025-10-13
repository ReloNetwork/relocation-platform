'use client'

import { useState, useEffect } from 'react'

export default function CityOfLondonGirlsEmailPage() {
  const [emailHtml, setEmailHtml] = useState('')

  useEffect(() => {
    // Load the HTML email template
    fetch('/city-of-london-girls-email.html')
      .then(response => response.text())
      .then(html => setEmailHtml(html))
      .catch(error => console.error('Error loading email template:', error))
  }, [])

  const downloadEmail = () => {
    const blob = new Blob([emailHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'city-of-london-girls-partnership-email.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyEmailHtml = () => {
    navigator.clipboard.writeText(emailHtml)
    alert('Email HTML copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            City of London School for Girls Partnership Email
          </h1>
          <p className="text-gray-600 mb-6">
            <strong>Subject:</strong> International Family Pipeline for City of London School for Girls - Partnership Opportunity [Media Pack Attached]
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={downloadEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Download HTML
            </button>
            <button
              onClick={copyEmailHtml}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Copy HTML
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Email Preview</h2>
          </div>
          <div className="p-6">
            {emailHtml ? (
              <div 
                className="border rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: emailHtml }}
              />
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading email template...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}