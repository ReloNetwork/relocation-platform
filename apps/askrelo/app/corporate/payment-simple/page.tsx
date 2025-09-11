'use client'

import { useSearchParams } from 'next/navigation'
import Layout from '../../../components/Layout'

export default function SimplePaymentPage() {
  const searchParams = useSearchParams()
  
  const requestId = searchParams?.get('requestId') || 'Unknown'
  const company = searchParams?.get('company') || 'Unknown Company'
  const timeline = searchParams?.get('timeline') || 'unknown'

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 py-12 rounded-lg mb-8">
            <div className="text-center text-white">
              <div className="text-4xl mb-4">✅</div>
              <h1 className="text-3xl font-bold mb-2">Request Submitted Successfully!</h1>
              <p className="text-xl">Your emergency consultation request has been received</p>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Request Details</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Request ID:</strong> {requestId}</p>
              <p><strong>Company:</strong> {decodeURIComponent(company)}</p>
              <p><strong>Timeline:</strong> {timeline}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens Next</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="text-white font-semibold">Emergency Response Team Contacted</h3>
                  <p>Our emergency specialist will call you within 2 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="text-white font-semibold">Assessment & Planning</h3>
                  <p>We'll assess your needs and create a custom emergency plan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="text-white font-semibold">Service Options</h3>
                  <p>Choose between free consultation or immediate paid service</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Free Consultation</h3>
              <p className="text-blue-200 mb-4">Discuss your needs with our specialist</p>
              <ul className="text-blue-100 text-sm space-y-1 mb-4">
                <li>• 2-hour response guarantee</li>
                <li>• Detailed needs assessment</li>
                <li>• Custom solution design</li>
                <li>• No obligation quote</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
                Schedule Consultation
              </button>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Book Service Now</h3>
              <p className="text-amber-200 mb-4">Immediate emergency packages available</p>
              <ul className="text-amber-100 text-sm space-y-1 mb-4">
                <li>• Emergency pricing (up to 44% off)</li>
                <li>• Immediate service activation</li>
                <li>• Dedicated specialist assigned</li>
                <li>• Skip consultation wait</li>
              </ul>
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded font-semibold">
                View Packages
              </button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Emergency Hotline</h2>
            <p className="text-red-200 mb-4">Need immediate assistance?</p>
            <div className="text-3xl font-bold text-red-300 mb-2">+44 20 7946 0958</div>
            <p className="text-red-200 text-sm">Available 24/7 for emergency relocations</p>
            <p className="text-red-200 text-sm mt-2">Reference ID: {requestId}</p>
          </div>

        </div>
      </div>
    </Layout>
  )
}