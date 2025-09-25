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
          return
        }

        // Import the Retell SDK dynamically
        const { RetellWebClient } = await import('retell-client-js-sdk')
        
        console.log('🎯 RetellWebClient imported successfully')
        
        // Create new client instance
        const client = new RetellWebClient()
        
        console.log('🔊 Retell client initialized:', client)
        
        setRetellClient(client)
        setIsLoading(false)
        
      } catch (err) {
        console.error('❌ Failed to initialize Retell client:', err)
        setError(`Failed to load Retell client: ${err}`)
        setIsLoading(false)
      }
    }

    initializeRetellClient()
  }, [])

  return { retellClient, isLoading, error }
}