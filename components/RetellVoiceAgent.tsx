'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Phone, Mic, MicOff, X, Volume2, VolumeX, MessageCircle } from 'lucide-react'
import { useRetellClient } from '@/hooks/useRetellClient'

interface RetellVoiceAgentProps {
  variant?: 'floating' | 'embedded'
  className?: string
}

export default function RetellVoiceAgent({ variant = 'floating', className = '' }: RetellVoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'choice' | 'voice' | 'text'>('choice')
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [callId, setCallId] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [audioTestStatus, setAudioTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle')
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, timestamp: Date}>>([])
  const [textInput, setTextInput] = useState('')
  const [isTextLoading, setIsTextLoading] = useState(false)
  
  const { retellClient, isLoading: clientLoading, error: clientError } = useRetellClient()
  const retellClientRef = useRef<any>(null)
  const timerRef = useRef<NodeJS.Timeout>()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Timer for call duration
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [callStatus])

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Test audio capabilities
  const testAudio = async () => {
    setAudioTestStatus('testing')
    try {
      // Test microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('🎤 Microphone test passed')
      
      // Test audio playback with a simple beep
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      gainNode.gain.value = 0.1
      
      oscillator.start()
      setTimeout(() => {
        oscillator.stop()
        audioContext.close()
      }, 200)
      
      // Stop the microphone stream
      stream.getTracks().forEach(track => track.stop())
      
      console.log('🔊 Audio playback test passed')
      setAudioTestStatus('success')
      
      setTimeout(() => setAudioTestStatus('idle'), 3000)
    } catch (error) {
      console.error('❌ Audio test failed:', error)
      setAudioTestStatus('failed')
      setError(`Audio test failed: ${error}`)
      setTimeout(() => setAudioTestStatus('idle'), 3000)
    }
  }


  // Start text chat
  const startTextChat = () => {
    setMode('text')
    setMessages([
      {
        text: "Hello! I'm Relo, your London relocation assistant. How can I help you with your move to London today?",
        isUser: false,
        timestamp: new Date()
      }
    ])
  }

  // Send text message
  const sendTextMessage = async () => {
    if (!textInput.trim() || isTextLoading) return
    
    const userMessage = textInput.trim()
    setTextInput('')
    setIsTextLoading(true)
    
    // Add user message
    setMessages(prev => [...prev, {
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    }])
    
    try {
      // Convert current messages to API format
      const apiMessages = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
        timestamp: msg.timestamp.toISOString()
      }))
      
      // Add the new user message
      apiMessages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString()
      })
      
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          context: {
            userType: 'individual',
            relocationType: 'general'
          }
        })
      })
      
      const data = await response.json()
      
      // Add AI response
      setMessages(prev => [...prev, {
        text: data.message?.content || "I'm here to help with your London relocation. Could you tell me more about what you're looking for?",
        isUser: false,
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Text chat error:', error)
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble connecting right now. Could you try rephrasing your question?",
        isUser: false,
        timestamp: new Date()
      }])
    } finally {
      setIsTextLoading(false)
    }
  }

  // Start web call
  const startWebCall = async () => {
    setMode('voice')
    setIsLoading(true)
    setError('')

    // Check if Retell client is available
    if (clientLoading) {
      setError('Voice client is still loading. Please wait a moment and try again.')
      setIsLoading(false)
      return
    }

    if (clientError || !retellClient) {
      setError('Voice service temporarily unavailable. Please use text chat for immediate assistance.')
      setIsLoading(false)
      return
    }

    // Check for microphone permissions first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log('✅ Microphone permission granted')
    } catch (permissionError) {
      console.error('❌ Microphone permission denied:', permissionError)
      setError('Microphone access required. Please allow microphone permissions and try again.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/retell/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'web'
        }),
      })

      const data = await response.json()

      if (data.success && data.accessToken) {
        setCallId(data.callId)
        setCallStatus('connecting')
        setCallDuration(0)

        console.log('🔊 Using initialized Retell client:', retellClient)
        
        // Add comprehensive event listeners for debugging
        retellClient.on('conversationStarted', () => {
          console.log('🎙️ Conversation started - audio should be working now')
          setCallStatus('connected')
        })

        retellClient.on('conversationEnded', () => {
          console.log('🔇 Conversation ended')
          setCallStatus('ended')
        })

        retellClient.on('error', (error: any) => {
          console.error('❌ Retell Web Client error:', error)
          setError(`Voice call error: ${error.message || error}`)
          setCallStatus('ended')
        })

        retellClient.on('update', (update: any) => {
          console.log('📊 Retell update:', update)
        })

        retellClient.on('audio', (audioData: any) => {
          console.log('🔊 Audio data received:', audioData)
        })

        retellClient.on('agentResponse', (response: any) => {
          console.log('🤖 Agent response:', response)
        })

        // Start the call
        try {
          console.log('🚀 Starting call with access token')
          await retellClient.startCall({
            accessToken: data.accessToken,
            callId: data.callId,
            sampleRate: 24000,
            enableUpdate: true,
          })
        } catch (startError) {
          console.error('❌ Failed to start call:', startError)
          setError(`Failed to start voice call: ${startError}`)
          setCallStatus('ended')
        }

        retellClientRef.current = retellClient
      } else {
        console.error('❌ Web call creation failed:', data)
        setError('Voice service is currently being set up. Please use text chat for immediate assistance.')
      }
    } catch (error) {
      console.error('❌ Web call error:', error)
      setError('Voice service temporarily unavailable. Text chat is ready to help you!')
    } finally {
      setIsLoading(false)
    }
  }

  // End call
  const endCall = () => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall()
    }
    
    setCallStatus('ended')
    setCallDuration(0)
    
    // Reset after delay
    setTimeout(() => {
      setCallStatus('idle')
      setCallId('')
    }, 3000)
  }

  // Toggle mute
  const toggleMute = () => {
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute()
      } else {
        retellClientRef.current.mute()
      }
    }
    setIsMuted(!isMuted)
  }

  if (variant === 'floating') {
    return (
      <>
        {/* Floating Voice Button with Text */}
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group">
            {/* Ask Relo Label - Always Visible */}
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300">
              <span className="text-sm font-medium text-gray-700">Ask Relo</span>
            </div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-[#C9A24A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-105"
            >
              <Phone className="w-6 h-6 transition-transform" />
            </button>
          </div>
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
                  <h3 className="font-semibold">Ask Relo</h3>
                  <p className="text-xs text-white/80">Professional Voice Assistant</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setMode('choice')
                  setMessages([])
                  setTextInput('')
                  setError('')
                  setIsTextLoading(false)
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {/* Debug info */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 mb-2">Mode: {mode}</div>
              )}
              
              {mode === 'choice' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="w-8 h-8 text-[#C9A24A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Speak with Relo</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Get instant expert advice on your London relocation with our professional voice assistant
                    </p>
                  </div>

                  {/* Chat Options */}
                  <div className="space-y-3">
                    {/* Voice Chat Option */}
                    <button
                      onClick={startWebCall}
                      disabled={isLoading || clientLoading}
                      className="w-full px-4 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
                    >
                      <Mic className="w-5 h-5" />
                      {isLoading ? 'Connecting...' : clientLoading ? 'Loading...' : 'Start Voice Chat'}
                    </button>

                    {/* Text Chat Fallback */}
                    <button
                      onClick={startTextChat}
                      className="w-full px-4 py-3 bg-white hover:bg-gray-50 text-[#0B1B2B] border-2 border-[#C9A24A] rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Start Text Chat
                    </button>
                  </div>

                  {/* Audio Test Button */}
                  <button
                    onClick={testAudio}
                    disabled={audioTestStatus === 'testing'}
                    className={`w-full px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2 ${
                      audioTestStatus === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : audioTestStatus === 'failed'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {audioTestStatus === 'testing' && <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>}
                    {audioTestStatus === 'success' && <Volume2 className="w-4 h-4" />}
                    {audioTestStatus === 'failed' && <VolumeX className="w-4 h-4" />}
                    {audioTestStatus === 'idle' && <Volume2 className="w-4 h-4" />}
                    {audioTestStatus === 'testing' ? 'Testing Audio...' : 
                     audioTestStatus === 'success' ? 'Audio Test Passed ✓' :
                     audioTestStatus === 'failed' ? 'Audio Test Failed ✗' :
                     'Test Audio & Mic'}
                  </button>

                  {(error || clientError) && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                      {error || clientError}
                    </div>
                  )}
                </div>
              )}

              {(callStatus === 'connecting' || callStatus === 'connected') && (
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
                    {callStatus === 'connected' && (
                      <div className="flex items-center justify-center gap-2 text-[#6B7280] text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        {formatDuration(callDuration)}
                      </div>
                    )}
                  </div>

                  {/* Always show controls when call is active */}
                  <div className="flex justify-center gap-4">
                    {callStatus === 'connected' && (
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
                    )}
                    {/* Always show end call button when connecting or connected */}
                    <button
                      onClick={endCall}
                      className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      title="End Call"
                    >
                      <Phone className="w-5 h-5 transform rotate-[135deg]" />
                    </button>
                  </div>
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

              {mode === 'text' && (
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="max-h-64 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-3">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.isUser 
                            ? 'bg-[#C9A24A] text-white rounded-br-none' 
                            : 'bg-white text-gray-800 border rounded-bl-none'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.text}</p>
                          <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTextLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-800 border rounded-lg rounded-bl-none p-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-gray-500 text-xs">Relo is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendTextMessage()}
                      placeholder="Type your question about London relocation..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
                    />
                    <button
                      onClick={sendTextMessage}
                      disabled={!textInput.trim() || isTextLoading}
                      className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTextLoading ? 'Sending...' : 'Send'}
                    </button>
                  </div>

                  {/* Back to Options */}
                  <button
                    onClick={() => setMode('choice')}
                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← Back to chat options
                  </button>
                </div>
              )}

              {/* Fallback content if no mode matches */}
              {!['choice', 'voice', 'text'].includes(mode) && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mic className="w-8 h-8 text-[#C9A24A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Speak with Relo</h3>
                    <p className="text-[#6B7280] text-sm mb-4">
                      Get instant expert advice on your London relocation with our professional voice assistant
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setMode('choice')}
                      className="w-full px-4 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors font-semibold"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }

  // Embedded variant for dedicated pages
  return (
    <div className={`bg-white rounded-xl border border-[#E5E7EB] p-8 ${className}`}>
      <div className="text-center">
        <div className="w-20 h-20 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Phone className="w-10 h-10 text-[#C9A24A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4">Speak with Relo</h2>
        <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
          Get instant, personalized advice on your London relocation. Our AI voice assistant provides expert guidance 24/7.
        </p>

        {callStatus === 'idle' && (
          <div className="max-w-sm mx-auto space-y-6">
            {/* Voice Chat Option */}
            <button
              onClick={startWebCall}
              disabled={isLoading || clientLoading}
              className="w-full px-6 py-4 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-3"
            >
              <Mic className="w-5 h-5" />
              {isLoading ? 'Connecting...' : clientLoading ? 'Loading...' : 'Start Voice Chat'}
            </button>

            {/* Audio Test Button */}
            <button
              onClick={testAudio}
              disabled={audioTestStatus === 'testing'}
              className={`w-full px-6 py-3 text-sm rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2 ${
                audioTestStatus === 'success' 
                  ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                  : audioTestStatus === 'failed'
                  ? 'bg-red-50 text-red-700 border-2 border-red-200'
                  : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {audioTestStatus === 'testing' && <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>}
              {audioTestStatus === 'success' && <Volume2 className="w-4 h-4" />}
              {audioTestStatus === 'failed' && <VolumeX className="w-4 h-4" />}
              {audioTestStatus === 'idle' && <Volume2 className="w-4 h-4" />}
              {audioTestStatus === 'testing' ? 'Testing Audio...' : 
               audioTestStatus === 'success' ? 'Audio Test Passed ✓' :
               audioTestStatus === 'failed' ? 'Audio Test Failed ✗' :
               'Test Audio & Microphone'}
            </button>

            {(error || clientError) && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error || clientError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}