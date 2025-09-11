'use client'

import { useState, useEffect } from 'react'
import VoiceAgent from './VoiceAgent'

export default function VoiceAgentManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition and synthesis are supported
    const checkSupport = () => {
      const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
    }

    if (typeof window !== 'undefined') {
      checkSupport()
    }
  }, [])

  // Don't render if not supported
  if (!isSupported) {
    return null
  }

  return (
    <>
      {/* Floating voice agent button */}
      {!isOpen && (
        <VoiceAgent 
          isMinimized={true} 
          onToggle={() => setIsOpen(true)} 
        />
      )}
      
      {/* Full voice agent modal */}
      {isOpen && (
        <VoiceAgent 
          isMinimized={false} 
          onToggle={() => setIsOpen(false)} 
        />
      )}
    </>
  )
}