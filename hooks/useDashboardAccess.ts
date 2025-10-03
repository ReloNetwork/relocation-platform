'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface DashboardAccess {
  hasAccess: boolean
  isLoading: boolean
  activeMoveCase: any | null
  dashboardUrl: string
}

export function useDashboardAccess(): DashboardAccess {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeMoveCase, setActiveMoveCase] = useState(null)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function checkAccess() {
      try {
        // Get current user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !currentUser) {
          setHasAccess(false)
          setIsLoading(false)
          return
        }

        setUser(currentUser)

        // Check if user has any active move cases
        const { data: moveCases, error: moveCaseError } = await supabase
          .from('move_cases')
          .select('*')
          .eq('client_user_id', currentUser.id)
          .in('status', ['intake', 'scoping', 'quoting', 'booked', 'in_transit', 'settling'])
          .order('created_at', { ascending: false })
          .limit(1)

        if (moveCaseError) {
          console.error('Error checking move cases:', moveCaseError)
          setHasAccess(false)
          setIsLoading(false)
          return
        }

        if (moveCases && moveCases.length > 0) {
          setHasAccess(true)
          setActiveMoveCase(moveCases[0])
        } else {
          setHasAccess(false)
        }

      } catch (error) {
        console.error('Error checking dashboard access:', error)
        setHasAccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkAccess()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const dashboardUrl = activeMoveCase ? `/dashboard?case=${activeMoveCase.id}` : '/dashboard'

  return {
    hasAccess,
    isLoading,
    activeMoveCase,
    dashboardUrl
  }
}