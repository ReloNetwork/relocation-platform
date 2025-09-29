import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { AlertCircle } from 'lucide-react'

export default function AuthCodeError() {
  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="border-red-200 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-xl text-center text-[#0B1B2B]">
                Authentication Error
              </CardTitle>
              <CardDescription className="text-center text-[#6B7280]">
                There was an issue processing your login request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700 text-center">
                  The magic link you clicked may have expired or been used already.
                </p>
              </div>
              
              <div className="space-y-3">
                <a 
                  href="/login"
                  className="w-full bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white font-medium py-3 px-4 rounded-md text-center block transition-colors"
                >
                  Try Logging In Again
                </a>
                
                <div className="text-center">
                  <p className="text-sm text-[#6B7280]">
                    Need help?{' '}
                    <a 
                      href="mailto:support@askrelo.com" 
                      className="text-[#0B1B2B] hover:underline"
                    >
                      Contact Support
                    </a>
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