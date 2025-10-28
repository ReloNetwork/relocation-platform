'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Minimize2, Maximize2, MessageCircle, X, Crown } from 'lucide-react'
import { checkoutFunctions } from '../lib/checkout'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

interface AIChatProps {
  variant?: 'floating' | 'embedded'
  className?: string
}

export default function AIChat({ variant = 'floating', className = '' }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [messages])

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        role: 'assistant',
        content: `Hello! I'm Relo, your 24/7 AI relocation assistant.

I'm here to help with every aspect of your London relocation:

**Property & Housing** - Area recommendations, market insights
**Visa & Legal** - Requirements, timelines, partner connections  
**Education** - School placement, international options
**Banking** - Account setup, financial services
**Transport** - Getting around London efficiently
**Lifestyle** - Cultural integration, local insights

What would you like to know about relocating to London?`,
        timestamp: new Date().toISOString()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  // Check for Executive Intake trigger keywords
  const checkForExecutiveTriggers = (userInput: string): boolean => {
    const triggers = [
      'book viewings',
      'school shortlist', 
      'visa + housing',
      'visa and housing',
      'we land this weekend',
      'urgent relocation',
      'need help with everything',
      'overwhelmed',
      'complex move'
    ]
    
    const input = userInput.toLowerCase()
    return triggers.some(trigger => input.includes(trigger))
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    }

    // Check for Executive Intake triggers
    const shouldTriggerExecutive = checkForExecutiveTriggers(inputValue.trim())

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          sessionId,
          context: {
            userType: 'individual',
            source: 'website'
          }
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage = data.message
        
        // If triggered Executive keywords, add Executive Intake suggestion
        if (shouldTriggerExecutive) {
          const executivePrompt: ChatMessage = {
            role: 'system',
            content: `This is faster with our Executive service. Want me to open the brief?`,
            timestamp: new Date().toISOString()
          }
          setMessages(prev => [...prev, assistantMessage, executivePrompt])
        } else {
          setMessages(prev => [...prev, assistantMessage])
        }
        
        setSessionId(data.sessionId)
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact our support team for immediate assistance.",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/• (.*?)(?=\n|$)/g, '• $1')
      .replace(/\n/g, '<br>')
  }

  if (variant === 'floating') {
    return (
      <>
        {/* Floating Chat Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className={`fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] z-50 flex flex-col ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Ask Relo</h3>
                  <p className="text-xs text-white/80">24/7 AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {(message.role === 'assistant' || message.role === 'system') && (
                        <div className={`w-8 h-8 ${message.role === 'system' ? 'bg-[#0B1B2B]' : 'bg-[#C9A24A]'} rounded-full flex items-center justify-center flex-shrink-0`}>
                          {message.role === 'system' ? <Crown className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                      )}
                      <div className={`max-w-[80%] ${
                        message.role === 'user' 
                          ? 'bg-[#C9A24A] text-white p-3 rounded-lg' 
                          : message.role === 'system'
                          ? 'bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white p-3 rounded-lg'
                          : 'bg-[#F3F4F6] text-[#0B1B2B] p-3 rounded-lg'
                      }`}>
                        <div 
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                        />
                        {message.role === 'system' && (
                          <button
                            onClick={checkoutFunctions.executiveIntake}
                            className="mt-3 w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-2 px-4 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <Crown className="w-4 h-4" />
                            Start Executive Intake — £1,500
                          </button>
                        )}
                        <div className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-white/70' : message.role === 'system' ? 'text-white/70' : 'text-[#6B7280]'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-[#F3F4F6] p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#E5E7EB]">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your London relocation..."
                      className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2 text-center">
                    Powered by Relo Network AI • Always here to help
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </>
    )
  }

  // Embedded variant for the Ask Relo page
  return (
    <div className={`bg-white rounded-xl border border-[#E5E7EB] h-[600px] flex flex-col ${className}`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Ask Relo AI</h2>
            <p className="text-white/80">Your 24/7 relocation assistant with expert knowledge</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-[75%] p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-[#C9A24A] text-white' 
                : 'bg-[#F8F9FA] text-[#0B1B2B] border border-[#E5E7EB]'
            }`}>
              <div 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
              <div className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-white/70' : 'text-[#6B7280]'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-10 h-10 bg-[#0B1B2B] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#E5E7EB]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-[#E5E7EB] bg-[#FAFAF9]">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about relocating to London..."
            className="flex-1 px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[#6B7280] mt-3 text-center">
Powered by Relo Network AI • Expert knowledge from 100s of successful relocations
        </p>
      </div>
    </div>
  )
}