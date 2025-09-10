'use client'

import { useSearchParams } from 'next/navigation'
import Layout from '../../../components/Layout'

export default function TestPaymentPage() {
  const searchParams = useSearchParams()
  
  const requestId = searchParams.get('requestId') || 'No ID'
  const company = searchParams.get('company') || 'No Company'
  const timeline = searchParams.get('timeline') || 'No Timeline'

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-3xl font-bold mb-8">Test Payment Page</h1>
          
          <div className="bg-slate-800 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">URL Parameters Received:</h2>
            
            <div className="space-y-2">
              <p><strong>Request ID:</strong> {requestId}</p>
              <p><strong>Company:</strong> {decodeURIComponent(company)}</p>
              <p><strong>Timeline:</strong> {timeline}</p>
            </div>
            
            <div className="mt-8">
              <p className="text-green-400">✅ Payment page routing is working!</p>
              <p className="text-gray-300 mt-2">If you can see this page, the redirect is successful.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}