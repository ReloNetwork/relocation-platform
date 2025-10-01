'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { CheckCircle, ExternalLink, Copy, Mail, Clock, Sparkles } from 'lucide-react'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [dashboardUrl, setDashboardUrl] = useState('')
  const [clientData, setClientData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // For demo purposes, use the demo token directly
    const generateDashboardAccess = () => {
      // Use demo token for consistent experience
      const demoToken = 'demo-client-123'
      const dashboardLink = `${window.location.origin}/client/${demoToken}`
      
      setDashboardUrl(dashboardLink)
      setClientData({
        name: 'Sarah Johnson',
        packageType: 'Premium Relocation Package'
      })
    }

    generateDashboardAccess()
  }, [searchParams])

  const copyToClipboard = async () => {
    if (dashboardUrl) {
      await navigator.clipboard.writeText(dashboardUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sendEmailDemo = () => {
    alert(`📧 Email Sent!\n\nYour dashboard access link has been sent to:\n${clientData?.email || 'client@email.com'}\n\nSubject: "Your Relo Network Dashboard is Ready!"\n\nThe client will receive:\n• Direct dashboard access link\n• Personal AI assistant (Relo)\n• Complete relocation checklist\n• Partner connections\n• 24/7 support access`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Payment Successful!
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Thank you for choosing Relo Network. Your premium relocation dashboard is ready instantly.
            </p>
          </div>

          {/* Dashboard Access Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-lg mb-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">
                  Your Dashboard is Ready!
                </h2>
                <p className="text-[#6B7280] mb-6">
                  Access your personalized relocation dashboard with AI-powered insights, task management, and partner connections.
                </p>
                
                {dashboardUrl && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <p className="text-sm font-medium text-[#0B1B2B] mb-1">Dashboard Access Link:</p>
                        <p className="text-sm text-[#6B7280] break-all">{dashboardUrl}</p>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <a
                    href={dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open Dashboard
                  </a>
                  <button
                    onClick={sendEmailDemo}
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0B1B2B] border border-[#E5E7EB] px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-[#6B7280]">
                Personal Relo AI assistant provides smart recommendations and prioritizes tasks based on your timeline.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">Interactive Checklist</h3>
              <p className="text-sm text-[#6B7280]">
                Complete relocation checklist with progress tracking, deadlines, and automated partner connections.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[#0B1B2B] mb-2">24/7 Access</h3>
              <p className="text-sm text-[#6B7280]">
                Your dashboard is available anytime, anywhere. Track progress and get support whenever you need it.
              </p>
            </div>
          </div>

          {/* Business Model Demo */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 rounded-xl border border-[#C9A24A]/20 p-8">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">
              🚀 Business Model Demo
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Payment-First Authentication Flow:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>✅ Client pays for service package</li>
                  <li>✅ Instant dashboard access generated</li>
                  <li>✅ Unique secure token created</li>
                  <li>✅ No separate login/password needed</li>
                  <li>✅ Direct value delivery</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Business Benefits:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>🎯 Immediate post-purchase engagement</li>
                  <li>🎯 Higher customer satisfaction</li>
                  <li>🎯 Reduced support tickets</li>
                  <li>🎯 Better retention rates</li>
                  <li>🎯 Streamlined onboarding</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border border-[#C9A24A]/30">
              <p className="text-sm text-[#B8923D]">
                <strong>Try the demo:</strong> Use link above or visit{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">/client/demo-client-123</code>{' '}
                to experience the dashboard as your clients would.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-[#0B1B2B] mb-2">
              Loading...
            </h2>
            <p className="text-[#6B7280]">
              Setting up your dashboard access.
            </p>
          </div>
        </div>
      </Layout>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}