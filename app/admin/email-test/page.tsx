'use client'

import { useState } from 'react'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Input } from '@/ui/components/input'
import Layout from '@/components/Layout'

export default function EmailTest() {
  const [testEmail, setTestEmail] = useState('hello@therelonetwork.com')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const testProvider = async (provider: string, config: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:ReloSecure2024!Network')
        },
        body: JSON.stringify({
          to: testEmail,
          subject: `Test Email from ${provider} - ${new Date().toLocaleTimeString()}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Email Test Successful!</h2>
              <p><strong>Provider:</strong> ${provider}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Test:</strong> Email system is working correctly</p>
              <hr>
              <p style="color: #666; font-size: 12px;">
                This is a test email from your Relo Network admin panel.
              </p>
            </div>
          `,
          from: config.from || 'onboarding@resend.dev'
        })
      })
      
      const data = await response.json()
      return {
        provider,
        success: response.ok,
        data,
        error: response.ok ? null : data.error
      }
    } catch (error) {
      return {
        provider,
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error'
      }
    } finally {
      setLoading(false)
    }
  }

  const runAllTests = async () => {
    setResults([])
    setLoading(true)
    
    const providers = [
      { name: 'Current System', from: 'onboarding@resend.dev' }
    ]
    
    const testResults = []
    for (const provider of providers) {
      const result = await testProvider(provider.name, { from: provider.from })
      testResults.push(result)
      setResults([...testResults])
    }
    
    setLoading(false)
  }

  const checkEnvironmentVars = () => {
    // This will be displayed as informational - actual env vars are server-side only
    return {
      'RESEND_API_KEY': process.env.NEXT_PUBLIC_RESEND_CONFIGURED || 'Not visible (server-side)',
      'GMAIL_USER': process.env.NEXT_PUBLIC_GMAIL_CONFIGURED || 'Not visible (server-side)',
      'SENDGRID_API_KEY': process.env.NEXT_PUBLIC_SENDGRID_CONFIGURED || 'Not visible (server-side)',
    }
  }

  const envVars = checkEnvironmentVars()

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Email System Testing
            </h1>
            <p className="text-[#6B7280]">
              Test your email configuration and verify delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Email Test</CardTitle>
                <CardDescription>
                  Send a test email to verify your configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#6B7280] mb-2 block">Test Email Address</label>
                  <Input
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    type="email"
                  />
                </div>

                <Button 
                  onClick={runAllTests}
                  disabled={loading || !testEmail}
                  className="bg-[#C9A24A] hover:bg-[#B8923D] w-full"
                >
                  {loading ? 'Testing...' : 'Send Test Email'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>
                  Current email provider configuration status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {Object.entries(envVars).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-medium">{key}:</span>
                      <span className={value === 'Not visible (server-side)' ? 'text-gray-500' : 'text-green-600'}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    Environment variables are server-side only for security. Check your .env.local file to verify configuration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  Email delivery test results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md border-l-4 ${
                        result.success
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {result.provider}
                          </h4>
                          <p className={`text-sm ${
                            result.success ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {result.success ? '✅ Success' : '❌ Failed'}
                          </p>
                          {result.success && result.data.provider && (
                            <p className="text-sm text-green-600">
                              Sent via: {result.data.provider}
                            </p>
                          )}
                          {result.success && result.data.messageId && (
                            <p className="text-xs text-gray-600">
                              Message ID: {result.data.messageId}
                            </p>
                          )}
                        </div>
                        {result.error && (
                          <div className="text-xs text-red-600 max-w-md">
                            Error: {result.error}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🚀 Quick Setup (Choose One)</h4>
                  <ul className="space-y-2 text-[#6B7280] ml-4">
                    <li>• <strong>Resend:</strong> Get API key from resend.com/api-keys</li>
                    <li>• <strong>Gmail:</strong> Use your Gmail + App Password</li>
                    <li>• <strong>SendGrid:</strong> Free account at sendgrid.com</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📋 Environment Variables</h4>
                  <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                    RESEND_API_KEY=re_your_key_here<br/>
                    GMAIL_USER=your@gmail.com<br/>
                    GMAIL_APP_PASSWORD=your_app_password
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📖 Full Documentation</h4>
                  <p className="text-[#6B7280]">
                    See EMAIL_SETUP_GUIDE.md in your project root for complete setup instructions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}