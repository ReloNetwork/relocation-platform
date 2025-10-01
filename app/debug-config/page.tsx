'use client'

import { useEffect, useState } from 'react'

export default function DebugConfig() {
  const [config, setConfig] = useState<any>({})

  useEffect(() => {
    setConfig({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      anonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
      nodeEnv: process.env.NODE_ENV,
      hostname: window.location.hostname,
      origin: window.location.origin,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    })
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuration Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Environment Configuration:</h2>
        <pre className="text-sm">{JSON.stringify(config, null, 2)}</pre>
      </div>
      
      <div className="bg-blue-50 p-4 rounded">
        <h2 className="font-bold mb-2">Expected Supabase URLs:</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Site URL:</strong> https://therelonetwork.com</li>
          <li><strong>Callback URL:</strong> https://therelonetwork.com/auth/callback</li>
          <li><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</li>
        </ul>
      </div>
    </div>
  )
}