'use client'

import { useEffect, useState } from 'react'

export const useRetellClient = () => {
  const [retellClient, setRetellClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeRetellClient = async () => {
      try {
        console.log('🔄 Initializing Retell Web Client...')
        
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          console.log('❌ Not in browser environment')
          setError('Not in browser environment')
          setIsLoading(false)
          return
        }

        // Import the Retell SDK dynamically
        console.log('📦 Importing retell-client-js-sdk...')
        const { RetellWebClient } = await import('retell-client-js-sdk')
        
        console.log('🎯 RetellWebClient imported successfully:', RetellWebClient)
        
        // Create new client instance
        const client = new RetellWebClient()
        
        console.log('🔊 Retell client initialized successfully:', client)
        console.log('🔊 Client methods available:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)))
        
        setRetellClient(client)
        setError(null)
        setIsLoading(false)
        console.log('✅ Retell client setup complete')
        
      } catch (err: any) {
        console.error('❌ Failed to initialize Retell client:', err)
        console.error('❌ Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        })
        setError(`Failed to load Retell client: ${err.message || err}`)
        setIsLoading(false)
      }
    }

    initializeRetellClient()
  }, [])

  return { retellClient, isLoading, error }
}