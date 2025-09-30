'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Check if user just authenticated
    const checkAuthAndRedirect = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (user && !error) {
        console.log('AuthRedirect: User authenticated, redirecting to dashboard')
        // Small delay to ensure page is loaded
        setTimeout(() => {
          router.push('/dashboard')
        }, 100)
      }
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthRedirect: Auth state changed:', event, !!session)
      
      if (event === 'SIGNED_IN' && session) {
        console.log('AuthRedirect: User signed in, redirecting to dashboard')
        setTimeout(() => {
          router.push('/dashboard')
        }, 100)
      }
    })

    // Check current auth state
    checkAuthAndRedirect()

    return () => subscription.unsubscribe()
  }, [router])

  return null // This component doesn't render anything
}