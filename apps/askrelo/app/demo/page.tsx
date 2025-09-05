'use client'

import { useState, useEffect } from 'react'
import { Mic, Play, Volume2, Square, MessageCircle, ArrowRight, Sparkles, Clock, Check } from 'lucide-react'
import { Button } from '@/ui/components/button'

const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-8">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-150 ${
          isActive ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        style={{
          height: isActive 
            ? `${Math.random() * 24 + 8}px`
            : '8px',
          animationDelay: `${i * 100}ms`,
          animation: isActive ? 'pulse 1s infinite ease-in-out' : 'none'
        }}
      />
    ))}
  </div>
)

const ConversationMessage = ({ 
  speaker, 
  message, 
  timestamp, 
  isAI = false 
}: { 
  speaker: string
  message: string
  timestamp: string
  isAI?: boolean
}) => (
  <div className={`flex gap-3 ${isAI ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isAI ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
    }`}>
      {isAI ? <Sparkles className="h-4 w-4" /> : '👤'}
    </div>
    <div className={`max-w-xs lg:max-w-md ${isAI ? 'text-right' : 'text-left'}`}>
      <div className={`rounded-2xl px-4 py-3 ${
        isAI 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm">{message}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1">{speaker} • {timestamp}</p>
    </div>
  </div>
)

const FeatureHighlight = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string
  description: string
  icon: any
}) => (
  <div className="bg-white rounded-lg p-6 border shadow-sm">
    <Icon className="h-8 w-8 text-blue-600 mb-3" />
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const demoScript = [
    {
      speaker: "You",
      message: "Hi, I'm looking for a 2-bedroom flat in London near good transport links to Canary Wharf.",
      timestamp: "Just now",
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Hello! I'd be happy to help you find the perfect 2-bedroom flat with good transport to Canary Wharf. Can you tell me your budget range and any specific preferences for the area?",
      timestamp: "2s ago",
      isAI: true
    },
    {
      speaker: "You",
      message: "Budget is around £3,000-4,000 per month. I'd prefer somewhere safe with good restaurants and maybe close to parks.",
      timestamp: "5s ago", 
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Perfect! Based on your criteria, I recommend Greenwich, Isle of Dogs, or Canary Wharf itself. Greenwich offers excellent DLR connections (18 mins), beautiful parks, riverside dining, and fits your budget. Would you like me to show you some specific properties in Greenwich?",
      timestamp: "3s ago",
      isAI: true
    },
    {
      speaker: "You",
      message: "Yes, Greenwich sounds perfect! Can you show me what's available?",
      timestamp: "8s ago",
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Excellent choice! I've found 12 properties in Greenwich matching your criteria. Here are the top 3: \n\n🏠 2-bed flat near Cutty Sark - £3,200/month\n🏠 Modern apartment by Greenwich Park - £3,500/month  \n🏠 Riverside flat with balcony - £3,800/month\n\nShall I book viewings for this weekend?",
      timestamp: "12s ago",
      isAI: true
    }
  ]

  const startDemo = () => {
    setHasStarted(true)
    setCurrentStep(0)
    
    // Simulate conversation flow
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < demoScript.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 3000)
  }

  const toggleRecording = () => {
    if (!hasStarted) {
      startDemo()
    }
    setIsRecording(!isRecording)
  }

  const features = [
    {
      title: "Natural Voice Interface",
      description: "Speak naturally - no special commands or keywords needed",
      icon: Mic
    },
    {
      title: "Real-time Property Search",
      description: "Instant access to 47K+ London properties with live availability",
      icon: Clock
    },
    {
      title: "Smart Recommendations", 
      description: "AI learns your preferences to suggest perfect neighborhoods",
      icon: Sparkles
    },
    {
      title: "Instant Booking",
      description: "Schedule viewings and appointments directly through conversation",
      icon: Check
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
            <Play className="h-4 w-4 text-blue-300 mr-2" />
            <span className="text-blue-300 text-sm font-medium">Interactive Demo</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Try <span className="text-blue-300">Ask Relo</span> Live Demo
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Experience our AI-powered relocation assistant in action. Speak naturally and get instant, intelligent responses about London properties and neighborhoods.
          </p>
          
          <div className="bg-blue-500/20 text-blue-100 px-6 py-3 rounded-full inline-block text-sm font-semibold border border-blue-400/30 mb-8">
            🎙️ Voice Enabled • 🤖 AI Powered • 🏠 Real Properties
          </div>
        </div>
      </div>

      {/* Demo Interface */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Interface */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Voice Demo Interface</h2>
              <p className="text-gray-600">Click the microphone and start speaking</p>
            </div>
            
            {/* Voice Control */}
            <div className="text-center mb-8">
              <button
                onClick={toggleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>
              
              <div className="mb-4">
                <VoiceWaveform isActive={isRecording} />
              </div>
              
              <p className="text-sm text-gray-600">
                {!hasStarted ? 'Click to start demo conversation' :
                 isRecording ? 'Listening...' : 
                 isProcessing ? 'Processing your request...' : 
                 'Click to speak'}
              </p>
            </div>

            {/* Demo Status */}
            {hasStarted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-800 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Demo Active - AI Assistant Ready
                </div>
              </div>
            )}
          </div>

          {/* Conversation Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Live Conversation</h2>
              {hasStarted && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Connected
                </div>
              )}
            </div>
            
            <div className="h-80 overflow-y-auto space-y-4 mb-4" style={{ scrollBehavior: 'smooth' }}>
              {hasStarted ? (
                demoScript.slice(0, currentStep + 1).map((msg, index) => (
                  <ConversationMessage key={index} {...msg} />
                ))
              ) : (
                <div className="text-center text-gray-500 mt-20">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Ready for Demo</p>
                  <p className="text-sm">Click the microphone to start your conversation</p>
                </div>
              )}
            </div>

            {/* Typing indicator when AI is responding */}
            {hasStarted && currentStep < demoScript.length - 1 && currentStep % 2 === 0 && (
              <div className="flex items-center gap-2 text-blue-600 text-sm">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Ask Relo AI is typing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience These Features Live
            </h2>
            <p className="text-gray-600 text-lg">
              Our demo showcases real AI capabilities you'll use for your London relocation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureHighlight key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Full Access?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            This demo shows just a taste of Ask Relo's capabilities. Get unlimited access with our full service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => window.location.href = '/ask-relo-pricing'}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => window.location.href = '/ask-relo-pricing'}
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Start Free Trial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Free</div>
              <div className="text-sm text-gray-600">5 minutes trial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">£295/mo</div>
              <div className="text-sm text-gray-600">Professional plan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">£1,495/mo</div>
              <div className="text-sm text-gray-600">Concierge service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Questions About the Demo?
          </h3>
          <p className="text-lg mb-8 text-blue-100">
            Our team is here to show you more features and answer any questions
          </p>
          
          <Button 
            onClick={() => window.location.href = '/corporate'}
            size="lg"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Schedule Live Demo Call
          </Button>
          
          <p className="text-sm text-blue-200 mt-6">
            📞 15-minute consultation • 🎯 Personalized demo • 💬 Ask any questions
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}