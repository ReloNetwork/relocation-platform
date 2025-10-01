'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SimpleAuth() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()
      
      // Use the simplest possible configuration
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Use the exact same domain as Supabase Site URL
          emailRedirectTo: 'https://therelonetwork.com/simple-auth',
          shouldCreateUser: true
        }
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
        console.error('Simple auth error:', error)
      } else {
        setMessage('Magic link sent! Check your email.')
        console.log('Simple magic link sent successfully')
      }
    } catch (error) {
      setMessage('Unexpected error occurred')
      console.error('Unexpected error:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      setMessage(`✅ Authenticated as: ${user.email}`)
      console.log('User is authenticated:', user)
    } else {
      setMessage('❌ Not authenticated')
      console.log('No user found')
    }
  }

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setMessage('Signed out')
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simple Auth Test</h1>
      
      <form onSubmit={sendMagicLink} className="space-y-4 mb-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      
      <div className="space-y-2 mb-4">
        <button onClick={checkAuth} className="w-full bg-green-500 text-white p-2 rounded">
          Check Auth Status
        </button>
        <button onClick={signOut} className="w-full bg-red-500 text-white p-2 rounded">
          Sign Out
        </button>
      </div>
      
      {message && (
        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm">{message}</p>
        </div>
      )}
    </div>
  )
}