'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/card'
import { Button } from '@/ui/components/button'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  body: string
  created_at: string
  read_at: string | null
  author: {
    id: string
    email: string
    name: string
    isCurrentUser: boolean
  }
}

interface MessagesPanelProps {
  caseId: string
  currentUserId: string
}

export default function MessagesPanel({ caseId, currentUserId }: MessagesPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [threadId, setThreadId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Initialize thread and load messages
  useEffect(() => {
    initializeMessaging()
  }, [caseId])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Set up realtime subscription
  useEffect(() => {
    if (!threadId) return

    const channel = supabase
      .channel(`messages-${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${threadId}`
        },
        (payload) => {
          // Fetch the complete message with author info
          fetchNewMessage(payload.new.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [threadId])

  const initializeMessaging = async () => {
    try {
      // Initialize thread
      const initResponse = await fetch('/api/messaging/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId })
      })

      if (!initResponse.ok) {
        throw new Error('Failed to initialize messaging')
      }

      const { threadId: newThreadId } = await initResponse.json()
      setThreadId(newThreadId)

      // Load existing messages
      await loadMessages(newThreadId)
    } catch (error) {
      console.error('Error initializing messaging:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (threadId: string) => {
    try {
      const response = await fetch(`/api/messaging/messages?threadId=${threadId}`)
      
      if (!response.ok) {
        throw new Error('Failed to load messages')
      }

      const { messages } = await response.json()
      setMessages(messages)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const fetchNewMessage = async (messageId: string) => {
    try {
      // This is a simplified approach - in a real app you'd fetch just the new message
      if (threadId) {
        await loadMessages(threadId)
      }
    } catch (error) {
      console.error('Error fetching new message:', error)
    }
  }

  const sendMessage = async () => {
    if (!threadId || !newMessage.trim() || sending) return

    setSending(true)
    const messageBody = newMessage.trim()
    const tempId = Date.now().toString()

    // Optimistic update
    const optimisticMessage: Message = {
      id: tempId,
      body: messageBody,
      created_at: new Date().toISOString(),
      read_at: null,
      author: {
        id: currentUserId,
        email: '',
        name: 'You',
        isCurrentUser: true
      }
    }

    setMessages(prev => [...prev, optimisticMessage])
    setNewMessage('')

    try {
      const response = await fetch('/api/messaging/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, body: messageBody })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const { message } = await response.json()

      // Replace optimistic message with real one
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId 
            ? { ...message, author: { ...message.author, isCurrentUser: true } }
            : msg
        )
      )
    } catch (error) {
      console.error('Error sending message:', error)
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempId))
      setNewMessage(messageBody) // Restore message
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (diffHours > 0) {
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else {
      return 'Just now'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (loading) {
    return (
      <Card className="border-[#E5E7EB] h-[600px] flex items-center justify-center">
        <p className="text-[#6B7280]">Loading messages...</p>
      </Card>
    )
  }

  return (
    <Card className="border-[#E5E7EB] h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl text-[#0B1B2B]">Messages</CardTitle>
        <CardDescription>
          Communicate with your relocation team
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#6B7280] text-center">
                No messages yet.<br />
                Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.author.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.author.isCurrentUser
                      ? 'bg-[#C9A24A] text-white'
                      : 'bg-gray-100 text-[#0B1B2B]'
                  }`}
                >
                  {!message.author.isCurrentUser && (
                    <div className="text-xs text-[#6B7280] mb-1 font-medium">
                      {message.author.name}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.body}</div>
                  <div className={`text-xs mt-1 ${
                    message.author.isCurrentUser ? 'text-white/80' : 'text-[#6B7280]'
                  }`}>
                    {formatTime(message.created_at)}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 border-t border-[#E5E7EB] p-4">
          <div className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 min-h-[40px] max-h-[100px] px-3 py-2 border border-[#E5E7EB] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
              disabled={sending}
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || sending}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 self-end"
            >
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}