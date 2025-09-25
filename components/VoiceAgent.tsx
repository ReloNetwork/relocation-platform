'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Phone, PhoneCall, Mic, MicOff, Volume2, VolumeX, X, User, Clock } from 'lucide-react'

interface VoiceAgentProps {
  variant?: 'floating' | 'embedded'
  className?: string
}

export default function VoiceAgent({ variant = 'floating', className = '' }: VoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [callId, setCallId] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isDemo, setIsDemo] = useState(true)
  
  const callTimerRef = useRef<NodeJS.Timeout>()
  const retellClientRef = useRef<any>()
  const recognitionRef = useRef<any>()
  const speechSynthesisRef = useRef<any>()

  // Call duration timer
  useEffect(() => {
    if (callStatus === 'active') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
  }, [callStatus])

  // Initialize Web Speech API for demo mode
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-GB'

      recognition.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleVoiceInput(finalTranscript)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  // Handle voice input in demo mode
  const handleVoiceInput = async (text: string) => {
    try {
      const response = await fetch('/api/retell/llm-websocket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          call_id: callId || 'demo_voice_' + Date.now(),
          conversation_history: [
            { role: 'assistant', content: 'Hello! I\'m Relo, your personal London relocation assistant.' }
          ],
          user_utterance: text
        }),
      })

      const data = await response.json()
      
      if (data.response) {
        speakResponse(data.response)
      }
    } catch (error) {
      console.error('Voice processing error:', error)
    }
  }

  // Text-to-speech for demo mode
  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      
      // Try to use a British voice
      const voices = window.speechSynthesis.getVoices()
      const britishVoice = voices.find(voice => 
        voice.lang.includes('en-GB') || voice.name.includes('British')
      )
      if (britishVoice) {
        utterance.voice = britishVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Start listening for demo voice mode
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Start phone call
  const startPhoneCall = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/retell/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'phone',
          phoneNumber: phoneNumber.trim()
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCallId(data.callId)
        setCallStatus('connecting')
        setCallDuration(0)
        
        // Simulate call progression for demo
        setTimeout(() => {
          setCallStatus('active')
        }, 3000)
      } else {
        setError(data.error || 'Failed to start call')
      }
    } catch (error) {
      setError('Failed to initiate call. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Start simple browser voice chat that actually works
  const startWebCall = async () => {
    setIsLoading(true)
    setError('')
    
    // Skip API call - use direct browser interaction
    setCallId('browser_call_' + Date.now())
    setCallStatus('connecting')
    setCallDuration(0)
    
    setTimeout(() => {
      setCallStatus('active')
      setIsLoading(false)
      // Speak welcome message
      speakResponse("Hello! I'm Relo, your personal London relocation assistant. I'm here to help with every aspect of your London move. What would you like to know about relocating to London?")
    }, 1000)
  }

  // End call
  const endCall = () => {
    setCallStatus('ended')
    setCallDuration(0)
    
    // Stop speech services in demo mode
    if (isDemo) {
      stopListening()
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
    
    if (retellClientRef.current) {
      retellClientRef.current.hangup()
    }
    
    // Reset after a delay
    setTimeout(() => {
      setCallStatus('idle')
      setCallId('')
      setTranscript('')
    }, 3000)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute()
      } else {
        retellClientRef.current.mute()
      }
    }
  }

  if (variant === 'floating') {
    return (
      <>
        {/* Floating Voice Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-[#C9A24A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          >
            <Phone className="w-6 h-6" />
          </button>
        )}

        {/* Voice Call Window */}
        {isOpen && (
          <div className="fixed bottom-6 left-6 w-80 bg-white rounded-xl shadow-2xl border border-[#E5E7EB] z-50">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Talk to Relo</h3>
                  <p className="text-xs text-white/80">24/7 Voice Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {callStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-[#C9A24A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Speak with Relo</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Get instant expert advice on your London relocation via voice call
                    </p>
                    
                    {isDemo && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                        <p className="text-amber-800 text-xs font-medium">
                          🎯 Demo Mode: Browser voice chat available! Phone calls require Retell AI setup.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Phone Call Option */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Phone Number (we'll call you)
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+44 20 7946 0958"
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
                      />
                    </div>
                    <button
                      onClick={startPhoneCall}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      {isLoading ? 'Calling...' : 'Call Me Now'}
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E5E7EB]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-[#6B7280]">or</span>
                    </div>
                  </div>

                  {/* Browser Voice Chat - Working Now */}
                  <button
                    onClick={startWebCall}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Talk with Relo Now
                  </button>

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {(callStatus === 'connecting' || callStatus === 'active') && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto relative">
                    <Phone className="w-8 h-8 text-white" />
                    {callStatus === 'connecting' && (
                      <div className="absolute inset-0 rounded-full border-4 border-[#C9A24A]/30 animate-ping"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2B]">
                      {callStatus === 'connecting' ? 'Connecting...' : 'Connected to Relo'}
                    </h3>
                    {callStatus === 'active' && (
                      <div className="flex items-center justify-center gap-2 text-[#6B7280] text-sm">
                        <Clock className="w-4 h-4" />
                        {formatDuration(callDuration)}
                      </div>
                    )}
                  </div>

                  {callStatus === 'active' && (
                    <div className="space-y-4">
                      {isDemo && (
                        <div className="text-center">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                            <p className="text-blue-800 text-xs font-medium">
                              🎯 Demo Mode: Click microphone to speak, Relo will respond with voice!
                            </p>
                          </div>
                          
                          {transcript && (
                            <div className="bg-gray-50 rounded-lg p-2 text-sm text-gray-700 mb-2">
                              <strong>You said:</strong> "{transcript}"
                            </div>
                          )}
                          
                          <button
                            onClick={isListening ? stopListening : startListening}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mb-3 ${
                              isListening 
                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                                : 'bg-[#C9A24A] hover:bg-[#B8923D] text-white'
                            }`}
                          >
                            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                          </button>
                          
                          <p className="text-xs text-gray-600 mb-4">
                            {isListening ? 'Listening... Speak now!' : 'Click to speak with Relo'}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={toggleMute}
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                            isMuted 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280]'
                          }`}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={endCall}
                          className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Phone className="w-5 h-5 transform rotate-[135deg]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {callStatus === 'ended' && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1B2B]">Call Ended</h3>
                    <p className="text-[#6B7280] text-sm">
                      Thank you for speaking with Relo! We'll follow up with the information discussed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }

  // Embedded variant for dedicated page
  return (
    <div className={`bg-white rounded-xl border border-[#E5E7EB] p-8 ${className}`}>
      <div className="text-center">
        <div className="w-20 h-20 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Phone className="w-10 h-10 text-[#C9A24A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4">Speak with Relo</h2>
        <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
          Get instant, personalized advice on your London relocation. Our AI voice assistant is available 24/7 with expert knowledge from hundreds of successful relocations.
        </p>
        
        {isDemo && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-amber-800 text-sm font-medium">
              🎯 Demo Mode: Browser voice chat available! Phone calls require Retell AI API setup.
            </p>
          </div>
        )}

        {callStatus === 'idle' && (
          <div className="max-w-sm mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2 text-left">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+44 20 7946 0958"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                />
              </div>
              <button
                onClick={startPhoneCall}
                disabled={isLoading}
                className="w-full px-6 py-4 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-3"
              >
                <PhoneCall className="w-5 h-5" />
                {isLoading ? 'Initiating Call...' : 'Call Me Now'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#6B7280]">or talk directly in your browser</span>
              </div>
            </div>

            <button
              onClick={startWebCall}
              disabled={isLoading}
              className="w-full px-6 py-4 border-2 border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white rounded-lg transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-3"
            >
              <Mic className="w-5 h-5" />
              Start Voice Chat
            </button>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}