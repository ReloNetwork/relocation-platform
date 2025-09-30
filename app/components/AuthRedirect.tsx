'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    console.log('🚀 AuthRedirect: Component mounted')
    const supabase = createClient()
    
    // Check if user just authenticated
    const checkAuthAndRedirect = async () => {
      console.log('🔍 AuthRedirect: Checking auth state...')
      const { data: { user }, error } = await supabase.auth.getUser()
      
      console.log('👤 AuthRedirect: User check result:', { hasUser: !!user, error })
      
      if (user && !error) {
        console.log('✅ AuthRedirect: User authenticated, redirecting to dashboard immediately')
        // Force immediate redirect with window.location as backup
        router.replace('/dashboard')
        setTimeout(() => {
          if (window.location.pathname === '/') {
            console.log('🚨 Router failed, using window.location.href')
            window.location.href = '/dashboard'
          }
        }, 500)
      } else {
        console.log('❌ AuthRedirect: No authenticated user found')
      }
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 AuthRedirect: Auth state changed:', event, !!session)
      
      if (session?.user) {
        console.log('🎯 AuthRedirect: User has session, redirecting to dashboard')
        router.replace('/dashboard')
        setTimeout(() => {
          if (window.location.pathname === '/') {
            console.log('🚨 Auth state router failed, using window.location.href')
            window.location.href = '/dashboard'
          }
        }, 500)
      }
    })

    // Check current auth state immediately
    checkAuthAndRedirect()

    return () => {
      console.log('🧹 AuthRedirect: Cleanup subscription')
      subscription.unsubscribe()
    }
  }, [router])

  return null // This component doesn't render anything
}