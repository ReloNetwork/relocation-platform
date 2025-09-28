'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, Phone, Mail, Calendar, ArrowRight, Building2, Zap } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../../components/Layout'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const sessionId = searchParams.get('session_id')
  const requestId = searchParams.get('requestId')

  useEffect(() => {
    if (sessionId) {
      fetchSessionData()
    }
  }, [sessionId])

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/payments/verify-session?session_id=${sessionId}`)
      const data = await response.json()
      setSessionData(data)
    } catch (error) {
      console.error('Error fetching session data:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadReceipt = async () => {
    try {
      const response = await fetch(`/api/payments/receipt?session_id=${sessionId}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `relo-receipt-${sessionId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading receipt:', error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Verifying your payment...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-full p-3 mr-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Payment Successful!
                </h1>
                <p className="text-xl text-green-100">
                  Your emergency relocation service has been secured
                </p>
              </div>
            </div>
            
            {sessionData && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {sessionData.metadata?.companyName || 'Your Company'}
                    </div>
                    <div className="text-green-100">Company</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      £{sessionData.amount_total ? (sessionData.amount_total / 100).toLocaleString() : '0'}
                    </div>
                    <div className="text-green-100">Amount Paid</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {sessionData.metadata?.timeline || 'Urgent'}
                    </div>
                    <div className="text-green-100">Timeline</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Next Steps */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Emergency Response Activated</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Immediate Actions Taken:</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Emergency team notified</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Dedicated specialist assigned</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Priority service queue activated</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Payment confirmation sent</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What Happens Next:</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                    <div>
                      <div className="text-white font-medium">Specialist Contact</div>
                      <div className="text-gray-300 text-sm">Within 2 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                    <div>
                      <div className="text-white font-medium">Emergency Plan Delivery</div>
                      <div className="text-gray-300 text-sm">Within 4 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                    <div>
                      <div className="text-white font-medium">Property Shortlist</div>
                      <div className="text-gray-300 text-sm">Within 24 hours</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-amber-500 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                    <div>
                      <div className="text-white font-medium">Service Execution Begins</div>
                      <div className="text-gray-300 text-sm">Immediate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Emergency Contact Information</h2>
              <p className="text-red-200">Your dedicated emergency response team</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Phone className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Emergency Hotline</h3>
                <p className="text-2xl font-bold text-red-300 mb-2">+44 20 7946 0958</p>
                <p className="text-red-200 text-sm">Available 24/7 for emergency relocations</p>
              </div>
              
              <div className="text-center">
                <Mail className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Emergency Email</h3>
                <p className="text-lg font-medium text-red-300 mb-2">emergency@therelonetwork.com</p>
                <p className="text-red-200 text-sm">Include your request ID: {requestId}</p>
              </div>
            </div>
          </div>

          {/* Payment & Receipt Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Transaction ID:</span>
                  <span className="text-white font-mono text-sm">{sessionId?.slice(-12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Request ID:</span>
                  <span className="text-white font-mono text-sm">{requestId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Payment Method:</span>
                  <span className="text-white">Card ending in ****</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400 font-semibold">Paid</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Receipt & Documents</h3>
              <div className="space-y-4">
                <Button 
                  onClick={downloadReceipt}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                
                <p className="text-gray-300 text-sm">
                  A copy of your receipt has been sent to your email address. 
                  You can also download it anytime using the button above.
                </p>
              </div>
            </div>
          </div>

          {/* Service Guarantee */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl p-8 text-center">
            <Building2 className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your Success is Guaranteed</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              With zero failed executive relocations and over 500 successful corporate moves, 
              you're in the hands of London's most trusted emergency relocation specialists.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-blue-200">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200">Emergency Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}