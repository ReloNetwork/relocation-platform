'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import Layout from '@/components/Layout'
import { useRouter } from 'next/navigation'

export default function NewAuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setMessage(`✅ Already authenticated as ${user.email}`)
      }
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event)
      if (session?.user) {
        setUser(session.user)
        setMessage(`✅ Authentication successful! Welcome ${session.user.email}`)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      console.log('🔗 Sending magic link to:', email)
      console.log('🌐 Current origin:', window.location.origin)
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Use current origin dynamically
          emailRedirectTo: `${window.location.origin}/auth-new`,
          shouldCreateUser: true
        }
      })

      if (error) {
        console.error('❌ Magic link error:', error)
        setMessage(`Error: ${error.message}`)
      } else {
        console.log('✅ Magic link sent successfully')
        setMessage('✅ Magic link sent! Check your email and click the link.')
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error)
      setMessage('❌ Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMessage('Signed out successfully')
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              New Auth System
            </h1>
            <p className="text-[#6B7280]">
              Clean magic link authentication
            </p>
          </div>

          <Card className="border-[#E5E7EB] shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl text-center text-[#0B1B2B]">
                {user ? 'Welcome Back!' : 'Sign In'}
              </CardTitle>
              <CardDescription className="text-center text-[#6B7280]">
                {user ? 'You are successfully authenticated' : 'Enter your email for a magic link'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user ? (
                <form onSubmit={sendMagicLink} className="space-y-4">
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
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={goToDashboard}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    onClick={signOut}
                    variant="outline"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              )}

              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('✅') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : message.includes('❌')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {message}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}