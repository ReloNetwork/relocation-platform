'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import Layout from '@/components/Layout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true
        }
      })

      if (error) {
        setMessage(`Authentication error: ${error.message}`)
      } else {
        setMessage('Check your email for the magic link!')
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Welcome to Relo Network
            </h1>
            <p className="text-[#6B7280]">
              Access your exclusive relocation portal
            </p>
          </div>

          <Card className="border-[#E5E7EB] shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl text-center text-[#0B1B2B]">
                Sign In
              </CardTitle>
              <CardDescription className="text-center text-[#6B7280]">
                Enter your email to receive a secure magic link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#0B1B2B] focus:border-transparent text-[#0B1B2B] placeholder-[#9CA3AF] bg-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading || !email}
                  className="w-full bg-[#0B1B2B] hover:bg-[#0B1B2B]/90 text-white font-medium"
                >
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </Button>
              </form>

              {/* Authentication Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-700 text-center">
                  <strong>Authentication System Active</strong><br />
                  Enter your email above to receive a secure login link. No password required.
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-sm text-amber-700 text-center">
                  <strong>Note:</strong> If you experience any login issues, please contact support at{' '}
                  <a href="mailto:hello@therelonetwork.com" className="underline">hello@therelonetwork.com</a>
                </p>
              </div>

              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('Check your email') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            By continuing, you agree to Relo Network's{' '}
            <a href="/terms" className="text-[#0B1B2B] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#0B1B2B] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}
