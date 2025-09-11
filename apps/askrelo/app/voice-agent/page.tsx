'use client'

import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import VoiceAgent from '../../components/VoiceAgent'
import { Mic, Phone, Volume2, Shield, Clock, Globe, MessageSquare } from 'lucide-react'
import { Button } from '@/ui/components/button'

export default function VoiceAgentPage() {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check browser support
    const checkSupport = () => {
      const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
    }

    if (typeof window !== 'undefined') {
      checkSupport()
    }
  }, [])

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] rounded-2xl mb-6">
            <MessageSquare className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            24/7 Voice Assistant
          </h1>
          
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
            Experience the future of relocation assistance with our AI-powered voice agent. 
            Get instant answers about London properties, visa requirements, and relocation services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsVoiceAgentOpen(true)}
              disabled={!isSupported}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-3"
            >
              <Mic className="h-5 w-5" />
              Start Voice Chat
            </Button>
            
            <Button
              onClick={() => window.open('tel:+442079460958', '_self')}
              variant="outline"
              className="border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white text-lg px-8 py-4 rounded-lg flex items-center justify-center gap-3"
            >
              <Phone className="h-5 w-5" />
              Call: +44 20 7946 0958
            </Button>
          </div>

          {!isSupported && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto">
              <p className="text-amber-800 text-sm">
                Voice features require a modern browser with microphone access. 
                Please call us directly for assistance.
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 text-center">
            <Clock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">24/7 Availability</h3>
            <p className="text-[#6B7280] text-sm">Always available to answer your relocation questions, any time of day or night.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 text-center">
            <Volume2 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Natural Speech</h3>
            <p className="text-[#6B7280] text-sm">Speak naturally and get intelligent responses in clear, British English.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 text-center">
            <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Secure & Private</h3>
            <p className="text-[#6B7280] text-sm">Your conversations are encrypted and private, never stored or shared.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#0B1B2B]/10 text-center">
            <Globe className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">Expert Knowledge</h3>
            <p className="text-[#6B7280] text-sm">Trained on London relocation expertise from 100s of successful moves.</p>
          </div>
        </div>

        {/* What You Can Ask */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#0B1B2B]/10 mb-16">
          <h2 className="text-3xl font-bold text-[#0B1B2B] text-center mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            What Can You Ask?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Property & Accommodation
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"Find me a flat in Marylebone"</li>
                <li>"What areas are best for families?"</li>
                <li>"Property prices in Kensington"</li>
                <li>"School catchment areas"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Visa & Legal Support
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"What visa do I need?"</li>
                <li>"Immigration requirements"</li>
                <li>"Legal document checklist"</li>
                <li>"Work permit guidance"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Services & Pricing
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"How much do services cost?"</li>
                <li>"What's included in packages?"</li>
                <li>"Emergency relocation options"</li>
                <li>"Corporate solutions"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Partnership Opportunities
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"Lead Machine partnership"</li>
                <li>"Market Dominator benefits"</li>
                <li>"Revenue sharing details"</li>
                <li>"Partnership requirements"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Schools & Education
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"Best schools in London"</li>
                <li>"International school options"</li>
                <li>"School application process"</li>
                <li>"University preparation"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                Emergency Services
              </h3>
              <ul className="space-y-2 text-[#6B7280] text-sm">
                <li>"Urgent relocation help"</li>
                <li>"Emergency accommodation"</li>
                <li>"Fast-track services"</li>
                <li>"Priority support"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Requirements */}
        <div className="bg-gradient-to-r from-[#0B1B2B] to-[#1F2937] rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Technical Requirements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#C9A24A]">Browser Support</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Chrome 25+ (recommended)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Safari 14.1+
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Edge 79+
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Firefox (limited support)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#C9A24A]">Requirements</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Microphone access permission
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Stable internet connection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  HTTPS secure connection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                  Audio output (speakers/headphones)
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/80 mb-4">
              Having technical difficulties? Our human agents are always available.
            </p>
            <Button
              onClick={() => window.open('tel:+442079460958', '_self')}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
            >
              Call +44 20 7946 0958
            </Button>
          </div>
        </div>
      </div>

      {/* Voice Agent Modal */}
      {isVoiceAgentOpen && (
        <VoiceAgent 
          isMinimized={false} 
          onToggle={() => setIsVoiceAgentOpen(false)} 
        />
      )}
    </Layout>
  )
}