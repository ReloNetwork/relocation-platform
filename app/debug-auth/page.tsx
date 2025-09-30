'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DebugAuth() {
  const [logs, setLogs] = useState<string[]>([])
  
  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  useEffect(() => {
    addLog('🔍 Debug page loaded')
    
    const supabase = createClient()
    
    // Check current auth state
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      addLog(`👤 Current user: ${user ? user.email : 'None'}`)
      addLog(`❌ Error: ${error ? error.message : 'None'}`)
      
      const { data: { session } } = await supabase.auth.getSession()
      addLog(`📋 Session: ${session ? 'Active' : 'None'}`)
    }
    
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      addLog(`🔄 Auth event: ${event}`)
      addLog(`👤 Session user: ${session?.user?.email || 'None'}`)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  const testMagicLink = async () => {
    const supabase = createClient()
    const email = 'test@example.com'
    
    const redirectUrl = 'https://therelonetwork.com/debug-auth'
    addLog(`🔗 Testing magic link with redirect: ${redirectUrl}`)
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
        shouldCreateUser: true
      }
    })
    
    if (error) {
      addLog(`❌ Magic link error: ${error.message}`)
    } else {
      addLog(`✅ Magic link sent successfully`)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Page</h1>
      
      <button 
        onClick={testMagicLink}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Test Magic Link
      </button>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Debug Logs:</h2>
        {logs.map((log, i) => (
          <div key={i} className="text-sm font-mono mb-1">{log}</div>
        ))}
      </div>
    </div>
  )
}