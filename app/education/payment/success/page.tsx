'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '../../../../components/Layout'
import { CheckCircle, Mail, Database, Download, ArrowRight, Copy } from 'lucide-react'
import { Button } from '../../../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/components/card'
import { Badge } from '../../../../ui/components/badge'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    tier: 'campaign'
  })
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Get session ID and generate credentials
    const sessionId = searchParams.get('session_id')
    const tier = searchParams.get('tier') || 'campaign'
    
    if (sessionId) {
      // Generate temporary credentials (in production, this would come from your backend)
      const tempEmail = `user_${sessionId.slice(-8)}@education.therelonetwork.com`
      const tempPassword = generatePassword()
      
      setCredentials({
        email: tempEmail,
        password: tempPassword,
        tier: tier
      })

      // Set authentication in localStorage
      localStorage.setItem('educationPortalAuth', 'true')
      localStorage.setItem('educationPortalTier', tier)
      
      // Send email with credentials (this would be handled by your backend)
      sendCredentialsEmail(tempEmail, tempPassword, tier)
    }
  }, [searchParams])

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const sendCredentialsEmail = async (email: string, password: string, tier: string) => {
    try {
      const response = await fetch('/api/education/send-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          tier,
          loginUrl: `${window.location.origin}/education`
        }),
      })

      if (response.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Failed to send credentials email:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  const tierNames = {
    family: 'Premium Family Access',
    campaign: 'Agency Campaign License',
    professional: 'Premium Data License',
    founding: 'Founding Partner Bundle'
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Payment Successful!
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Welcome to the UK Schools Database. Your account has been created and you now have instant access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Login Credentials */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0B1B2B] flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Your Login Credentials
                </CardTitle>
                <CardDescription>
                  Save these credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0B1B2B] block mb-1">Email</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-white rounded border text-sm">{credentials.email}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(credentials.email)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#0B1B2B] block mb-1">Password</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-white rounded border text-sm">{credentials.password}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(credentials.password)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <Badge className="bg-[#C9A24A] text-white">
                    {tierNames[credentials.tier as keyof typeof tierNames]}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#0B1B2B] flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Next Steps
                </CardTitle>
                <CardDescription>
                  Here's what happens next
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Email Confirmation</div>
                    <div className="text-sm text-[#6B7280]">
                      {emailSent ? (
                        <span className="text-green-600">✓ Sent to your email</span>
                      ) : (
                        'We\'re sending your credentials to your email'
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Access Database</div>
                    <div className="text-sm text-[#6B7280]">Use your credentials to log in and start searching</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#C9A24A] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium text-[#0B1B2B]">Export Data</div>
                    <div className="text-sm text-[#6B7280]">Filter and export school data as needed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => window.location.href = '/education'}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 text-lg font-semibold"
            >
              <Database className="w-5 h-5 mr-2" />
              Access Schools Database
            </Button>
            
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/education/help'}
                className="mx-2"
              >
                Need Help?
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/contact'}
                className="mx-2"
              >
                Contact Support
              </Button>
            </div>
          </div>

          {/* Important Information */}
          <div className="mt-12">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#0B1B2B]">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[#6B7280]">
                <p>
                  • <strong>Save your credentials:</strong> Store your login details safely. You can always request a password reset if needed.
                </p>
                <p>
                  • <strong>Access period:</strong> Your access is valid according to your selected plan duration.
                </p>
                <p>
                  • <strong>Support:</strong> If you have any questions, contact our support team at education@therelonetwork.com
                </p>
                <p>
                  • <strong>Data usage:</strong> Please review our terms of service for data usage guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}