'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

function DemoSuccessContent() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get('plan') || 'demo'

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Demo Mode Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-blue-800">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Demo Mode Active</span>
          </div>
          <p className="text-blue-700 text-sm mt-2">
            This is a demonstration of the checkout flow. No payment was processed.
          </p>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-[#0B1220] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Welcome to Ask Relo!
        </h1>
        
        <p className="text-xl text-[#6B7280] mb-8">
          Your AI-powered relocation assistant is ready to help you find the perfect home in London.
        </p>

        {/* Next Steps */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-8 mb-8">
          <h2 className="text-2xl font-semibold text-[#0B1220] mb-6">What happens next?</h2>
          
          <div className="space-y-6 text-left">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-1">Start chatting with your AI assistant</h3>
                <p className="text-[#6B7280]">Ask questions about properties, neighborhoods, or any aspect of your London move</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-1">Get personalized recommendations</h3>
                <p className="text-[#6B7280]">Receive property matches based on your budget, preferences, and lifestyle</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-1">Connect with experts when ready</h3>
                <p className="text-[#6B7280]">Seamlessly upgrade to human assistance for viewings and applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.location.href = '/concierge'}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Using Ask Relo
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-[#E5E7EB] text-[#0B1220] hover:bg-[#F9FAFB] rounded-md"
            onClick={() => window.location.href = '/'}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Back to Homepage
          </Button>
        </div>

        {/* Support */}
        <p className="text-sm text-[#6B7280] mt-8">
          Need help getting started? Contact our support team at{' '}
          <a href="mailto:support@therelonetwork.com" className="text-[#C9A24A] hover:underline">
            support@therelonetwork.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default function DemoSuccessPage() {
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[#6B7280]">Loading...</div>
        </div>
      }>
        <DemoSuccessContent />
      </Suspense>
    </Layout>
  )
}