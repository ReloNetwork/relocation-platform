'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login?error=authentication_failed')
          return
        }

        if (data.session) {
          // User is authenticated, redirect to dashboard
          router.push('/demo-dashboard')
        } else {
          // No session found, redirect to login
          router.push('/login?error=no_session')
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error)
        router.push('/login?error=unexpected_error')
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24A] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-[#0B1B2B] mb-2">
            Authenticating...
          </h2>
          <p className="text-[#6B7280]">
            Please wait while we log you in to your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}