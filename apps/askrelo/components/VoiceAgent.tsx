'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, X, MessageSquare } from 'lucide-react'
import { Button } from '@/ui/components/button'

interface VoiceAgentProps {
  isMinimized?: boolean
  onToggle?: () => void
}

export default function VoiceAgent({ isMinimized = true, onToggle }: VoiceAgentProps) {
  const [isActive, setIsActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'agent', message: string, timestamp: Date}>>([])
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
  
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis
    }

    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-GB'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setStatus('connected')
      }

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleUserSpeech(finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setStatus('error')
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (isActive) {
          // Restart recognition if still active
          setTimeout(() => {
            if (recognitionRef.current && isActive) {
              recognitionRef.current.start()
            }
          }, 100)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel()
      }
    }
  }, [isActive])

  const handleUserSpeech = async (speech: string) => {
    const userMessage = { role: 'user' as const, message: speech, timestamp: new Date() }
    setConversation(prev => [...prev, userMessage])

    try {
      // Call your AI voice agent API here
      const response = await fetch('/api/voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: speech,
          conversation: conversation,
          context: {
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        })
      })

      const data = await response.json()
      
      if (data.response) {
        const agentMessage = { role: 'agent' as const, message: data.response, timestamp: new Date() }
        setConversation(prev => [...prev, agentMessage])
        
        // Speak the response
        if (!isMuted) {
          speakResponse(data.response)
        }
      }
    } catch (error) {
      console.error('Voice agent error:', error)
      const errorMessage = { role: 'agent' as const, message: "I'm sorry, I'm having trouble connecting right now. Please try again or call us at +44 20 7946 0958.", timestamp: new Date() }
      setConversation(prev => [...prev, errorMessage])
      
      if (!isMuted) {
        speakResponse("I'm sorry, I'm having trouble connecting right now. Please try again or call our team.")
      }
    }
  }

  const speakResponse = (text: string) => {
    if (synthesisRef.current && !isMuted) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-GB'
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8
      
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthesisRef.current.speak(utterance)
    }
  }

  const startVoiceAgent = () => {
    setIsActive(true)
    setStatus('connecting')
    
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
    
    // Welcome message
    const welcomeMessage = { 
      role: 'agent' as const, 
      message: "Hello! I'm your Relo Network AI assistant. How can I help you with your London relocation today?", 
      timestamp: new Date() 
    }
    setConversation([welcomeMessage])
    
    if (!isMuted) {
      speakResponse(welcomeMessage.message)
    }
  }

  const stopVoiceAgent = () => {
    setIsActive(false)
    setIsListening(false)
    setIsSpeaking(false)
    setStatus('idle')
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted && synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const callDirectly = () => {
    window.open('tel:+442079460958', '_self')
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
        
        {/* Status indicator */}
        {isActive && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            {isListening && <div className="w-3 h-3 bg-white rounded-full animate-pulse" />}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1B2B] to-[#C9A24A] text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Relo Voice Assistant</h3>
              <p className="text-white/80 text-xs">
                {status === 'connected' ? '24/7 AI Assistant - Live' : 
                 status === 'connecting' ? 'Connecting...' : 
                 status === 'error' ? 'Connection Error' : 'Ready to Help'}
              </p>
            </div>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-[#C9A24A] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Status messages */}
          {isListening && (
            <div className="flex justify-center mt-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Listening...
              </div>
            </div>
          )}
          
          {isSpeaking && (
            <div className="flex justify-center mt-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <Volume2 className="w-3 h-3" />
                Speaking...
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 border-t bg-white rounded-b-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              {transcript && (
                <div className="bg-gray-100 p-2 rounded text-xs">
                  "{transcript}"
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            {!isActive ? (
              <Button
                onClick={startVoiceAgent}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white flex-1 flex items-center justify-center gap-2"
                disabled={status === 'connecting'}
              >
                <Mic className="h-4 w-4" />
                {status === 'connecting' ? 'Connecting...' : 'Start Voice Chat'}
              </Button>
            ) : (
              <Button
                onClick={stopVoiceAgent}
                variant="destructive"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <MicOff className="h-4 w-4" />
                End Chat
              </Button>
            )}
            
            <Button
              onClick={toggleMute}
              variant="outline"
              size="sm"
              className="px-3"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={callDirectly}
              variant="outline"
              size="sm"
              className="px-3"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            For immediate assistance: +44 20 7946 0958
          </p>
        </div>
      </div>
    </div>
  )
}