'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Mic, X, Square, MessageCircle, Sparkles, ArrowRight, User } from 'lucide-react';
import { Button } from '@/ui/components/button';

const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-150 ${
          isActive ? 'bg-white' : 'bg-white/50'
        }`}
        style={{
          height: isActive 
            ? `${Math.random() * 16 + 4}px`
            : '4px',
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
  <div className={`flex gap-3 ${isAI ? 'flex-row-reverse' : 'flex-row'} mb-3`}>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
      isAI ? 'bg-[#C9A24A]/20 text-[#C9A24A]' : 'bg-gray-100 text-gray-600'
    }`}>
      {isAI ? <Sparkles className="h-3 w-3" /> : <User className="h-3 w-3" />}
    </div>
    <div className={`max-w-xs ${isAI ? 'text-right' : 'text-left'}`}>
      <div className={`rounded-lg px-3 py-2 text-sm ${
        isAI 
          ? 'bg-[#C9A24A] text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p>{message}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1">{speaker} • {timestamp}</p>
    </div>
  </div>
)

export default function StickyAsk() {
  const [show, setShow] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const pathname = usePathname();
  const hideOn = ['/concierge', '/ask', '/account', '/login'];

  const demoScript = [
    {
      speaker: "You",
      message: "Hi, I'm looking for a 2-bedroom flat in London near Canary Wharf.",
      timestamp: "Just now",
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Hello! I'd be happy to help you find the perfect 2-bedroom flat near Canary Wharf. What's your budget range?",
      timestamp: "2s ago",
      isAI: true
    },
    {
      speaker: "You",
      message: "Around £3,000-4,000 per month. I'd prefer somewhere safe with good restaurants.",
      timestamp: "5s ago", 
      isAI: false
    },
    {
      speaker: "Ask Relo AI",
      message: "Perfect! I recommend Greenwich or Isle of Dogs. Both offer excellent DLR connections (15-20 mins), great dining, and fit your budget. Would you like me to show you specific properties?",
      timestamp: "3s ago",
      isAI: true
    }
  ]

  const startDemo = () => {
    setHasStarted(true)
    setCurrentStep(0)
    
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

  const openWidget = () => {
    setWidgetOpen(true)
  }

  const closeWidget = () => {
    setWidgetOpen(false)
    setHasStarted(false)
    setIsRecording(false)
    setCurrentStep(0)
  }

  useEffect(() => {
    if (hideOn.includes(pathname)) { setShow(false); return; }
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Listen for voice widget trigger from header
    const handleOpenWidget = () => {
      setWidgetOpen(true);
    };
    window.addEventListener('openVoiceWidget', handleOpenWidget);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('openVoiceWidget', handleOpenWidget);
    };
  }, [pathname]);

  return (
    <>
      <style jsx>{`
        @keyframes pulseAsk {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 32px rgba(201, 162, 74, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 48px rgba(201, 162, 74, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.3);
          }
        }
        .animate-pulse-ask {
          animation: pulseAsk 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
      
      {/* Sticky Ask Button - Only show when scrolled */}
      {show && (
        <button 
          onClick={openWidget}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full px-8 py-5 bg-[#C9A24A] hover:bg-[#B8923D] text-white transition-all duration-300 border-2 border-white font-bold text-base transform hover:scale-110 animate-pulse-ask focus-ring"
          style={{ 
            background: 'linear-gradient(135deg, #C9A24A 0%, #B8923D 100%)'
          }}
          aria-label="Ask Relo AI Assistant"
        >
          <Mic className="w-5 h-5 mr-3" />
          Ask Relo
        </button>
      )}

      {/* Voice Widget Modal */}
      {widgetOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeWidget}
          />
          
          {/* Widget */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-[#C9A24A] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ask Relo AI</h3>
                    <p className="text-xs text-white/80">Your London relocation assistant</p>
                  </div>
                </div>
                <button 
                  onClick={closeWidget}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Voice Interface */}
            <div className="p-6 text-center border-b border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Start Speaking</h4>
              <p className="text-sm text-gray-600 mb-4">Click the microphone and ask about London relocation</p>
              
              {/* Voice Control */}
              <button
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all hover:scale-105 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                    : 'bg-[#C9A24A] hover:bg-[#B8923D] text-white shadow-lg'
                }`}
              >
                {isRecording ? (
                  <Square className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </button>
              
              <div className="mb-4 h-6">
                <VoiceWaveform isActive={isRecording} />
              </div>
              
              <p className="text-sm text-gray-600">
                {!hasStarted ? 'Click to start demo conversation' :
                 isRecording ? 'Listening...' : 
                 'Click to speak'}
              </p>

              {/* Demo Status */}
              {hasStarted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center justify-center gap-2 text-green-800 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Demo Active - AI Assistant Ready
                  </div>
                </div>
              )}
            </div>

            {/* Conversation Display */}
            <div className="p-4 h-64 overflow-y-auto">
              {hasStarted ? (
                <div className="space-y-3">
                  {demoScript.slice(0, currentStep + 1).map((msg, index) => (
                    <ConversationMessage key={index} {...msg} />
                  ))}
                  
                  {/* Typing indicator */}
                  {currentStep < demoScript.length - 1 && currentStep % 2 === 0 && (
                    <div className="flex items-center gap-2 text-[#C9A24A] text-sm">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Ask Relo AI is typing...
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">Ready for Demo</p>
                  <p className="text-sm">Click the microphone to start</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex gap-3">
                <Button 
                  size="sm"
                  className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg"
                  onClick={closeWidget}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue Chat
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => window.location.href = '/'}
                >
                  Homepage
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Upgrade to premium plans for human assistance
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}