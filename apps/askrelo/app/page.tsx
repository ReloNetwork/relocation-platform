'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import { Calendar, ChevronRight, Star, Shield, Mic, Play, Volume2, ArrowRight, Clock, Users, Award } from 'lucide-react'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('September 15, 2025 09:00:00 GMT')
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-6 justify-center">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="bg-[#0B1B2B] text-[#C9A24A] w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold font-mono border border-[#C9A24A]/20">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-600 mt-2 font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const AskReloDemo = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const conversation = [
    { type: 'user', text: "I need a flat in Canary Wharf with good transport links" },
    { type: 'ai', text: "Perfect! I've found 12 properties near the DLR and Elizabeth Line. The average commute to central London is 18 minutes. Would you like me to show you the top 3 options with virtual tours?" },
    { type: 'user', text: "Yes, and what about schools nearby?" },
    { type: 'ai', text: "Excellent question! There are 4 outstanding primary schools within walking distance, including St Luke's CoE which is rated Outstanding by Ofsted. I can book viewings for flats near the best school catchment areas." }
  ]

  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % conversation.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [isActive])

  return (
    <div className="bg-gradient-to-br from-[#0B1B2B] via-[#1A2B3B] to-[#0B1B2B] rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border border-[#C9A24A] rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#C9A24A] rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24A] to-[#D4B158] flex items-center justify-center">
              <Mic className="w-5 h-5 text-[#0B1B2B]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ask Relo AI</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live Demo</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsActive(!isActive)}
            className="bg-[#C9A24A] hover:bg-[#B8923D] text-[#0B1B2B] font-semibold"
          >
            {isActive ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Listening...' : 'Try Demo'}
          </Button>
        </div>

        <div className="space-y-4 mb-6 h-32">
          {isActive && conversation[currentMessage] && (
            <div className={`flex ${conversation[currentMessage].type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-xs p-4 rounded-2xl ${
                conversation[currentMessage].type === 'user' 
                  ? 'bg-[#C9A24A] text-[#0B1B2B]' 
                  : 'bg-white/10 text-white backdrop-blur-sm'
              }`}>
                <p className="text-sm">{conversation[currentMessage].text}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/ask'}
            className="bg-white text-[#0B1B2B] hover:bg-gray-100 font-semibold"
          >
            Try Ask Relo Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const scrollToWaitlist = () => {
    setShowWaitlist(true)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Launch Announcement Bar */}
      <div className="bg-gradient-to-r from-[#C9A24A] to-[#D4B158] text-[#0B1B2B]">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div 
            className="flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition"
            onClick={scrollToWaitlist}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-semibold text-sm">
              Official Launch: Monday, September 15th • Founding Members get 50% off • Limited to 100 Members
            </span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Premium Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-serif text-3xl font-bold text-[#0B1B2B] tracking-tight">
              Relo Network
            </div>
            <div className="flex items-center space-x-8">
              <a href="/directory" className="text-[#6B7280] hover:text-[#0B1B2B] font-medium transition">
                Directory
              </a>
              <a href="/concierge" className="text-[#6B7280] hover:text-[#0B1B2B] font-medium transition">
                Concierge
              </a>
              <a href="/partners" className="text-[#6B7280] hover:text-[#0B1B2B] font-medium transition">
                Partners
              </a>
              <Button variant="outline" className="border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Editorial Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Editorial Content */}
            <div className="space-y-8">
              {/* Founding Member Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A24A]/10 to-[#D4B158]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-[#C9A24A] fill-current" />
                <span className="text-[#C9A24A] font-semibold text-sm">50% Off Launch Rates</span>
              </div>

              {/* Editorial Headline */}
              <div className="space-y-6">
                <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#0B1B2B] leading-tight">
                  Relocate to London.<br />
                  <span className="text-[#C9A24A]">Effortlessly.</span>
                </h1>
                
                <p className="text-xl text-[#6B7280] leading-relaxed max-w-lg">
                  An invitation-only concierge service for discerning professionals. 
                  100+ vetted partners, 24/7 AI expertise, and white-glove coordination 
                  for London's elite relocations.
                </p>
              </div>

              {/* Live Countdown */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#0B1B2B] uppercase tracking-wide">
                  Official Launch In:
                </p>
                <CountdownTimer />
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-[#0B1B2B] hover:bg-[#1A2B3B] text-white px-8 py-4 text-lg font-semibold"
                >
                  Join Waiting List <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/ask'}
                  className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-8 py-4 text-lg font-semibold"
                >
                  Meet Ask Relo <Mic className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0B1B2B]">100+</div>
                  <div className="text-sm text-[#6B7280]">Vetted Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0B1B2B]">24/7</div>
                  <div className="text-sm text-[#6B7280]">AI Concierge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0B1B2B]">London ↔ NYC</div>
                  <div className="text-sm text-[#6B7280]">Premium Routes</div>
                </div>
              </div>
            </div>

            {/* Right Column - Ask Relo Demo */}
            <div className="lg:pl-8">
              <AskReloDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Cards Section - "The London Standard" */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#0B1B2B] mb-4">
              The London Standard
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Why London's elite professionals choose Relo Network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* AI Concierge Card - Dark */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#0B1B2B] via-[#1A2B3B] to-[#0B1B2B] text-white rounded-2xl p-8 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[#C9A24A] text-6xl font-bold opacity-20">
                  AI
                </div>
                <div className="relative z-10">
                  <Mic className="w-12 h-12 text-[#C9A24A] mb-6" />
                  <h3 className="text-2xl font-bold mb-4">AI Concierge</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    24/7 intelligent assistant that learns your preferences, 
                    anticipates needs, and provides instant London expertise.
                  </p>
                  <div className="flex items-center text-[#C9A24A] font-semibold group-hover:gap-3 gap-2 transition-all">
                    Try Ask Relo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vetted Network Card - White */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow">
                <Shield className="w-12 h-12 text-[#C9A24A] mb-6" />
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Vetted Network</h3>
                <p className="text-[#6B7280] mb-6 leading-relaxed">
                  100+ premium partners personally screened and continuously 
                  monitored for exceptional service quality.
                </p>
                <div className="flex items-center text-[#C9A24A] font-semibold group-hover:gap-3 gap-2 transition-all">
                  View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* White Glove Service Card - Gold */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-[#C9A24A] to-[#D4B158] text-[#0B1B2B] rounded-2xl p-8 h-full relative overflow-hidden">
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#0B1B2B]/20 rounded-full opacity-20"></div>
                <div className="relative z-10">
                  <Award className="w-12 h-12 text-[#0B1B2B] mb-6" />
                  <h3 className="text-2xl font-bold mb-4">White Glove Service</h3>
                  <p className="text-[#0B1B2B]/80 mb-6 leading-relaxed">
                    Executive-level coordination handling every detail 
                    from property search to settling-in services.
                  </p>
                  <div className="flex items-center text-[#0B1B2B] font-semibold group-hover:gap-3 gap-2 transition-all">
                    See Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusivity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A24A]/10 to-[#D4B158]/10 border border-[#C9A24A]/20 rounded-full px-6 py-3 mb-8">
            <Star className="w-5 h-5 text-[#C9A24A] fill-current" />
            <span className="text-[#C9A24A] font-semibold">Invitation Only • Limited Founding Members</span>
          </div>

          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0B1B2B] mb-6 leading-tight">
            For Those Who Know London—<br />
            And Those Who Want To.
          </h2>

          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto leading-relaxed">
            An exclusive network limited to just 100 Founding Members. 
            Join London's most discerning professionals in redefining relocation excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToWaitlist}
              className="bg-[#0B1B2B] hover:bg-[#1A2B3B] text-white px-8 py-4 text-lg font-semibold"
            >
              Request Invitation
            </Button>
            <Button 
              variant="outline" 
              className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </Button>
          </div>

          <p className="text-sm text-[#6B7280]">
            <strong className="text-[#0B1B2B]">Just 100 Founding Members</strong> • 50% off launch rates • Priority access
          </p>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-[#0B1B2B] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-serif text-2xl font-bold mb-4">Relo Network</div>
              <p className="text-gray-300 mb-6">
                Relocate to London, Effortlessly.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>BAR</span> • <span>FIDI</span> • <span>ARP</span> • <span>GDPR</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/directory" className="hover:text-[#C9A24A] transition">Premium Directory</a></li>
                <li><a href="/ask" className="hover:text-[#C9A24A] transition">Ask Relo AI</a></li>
                <li><a href="/concierge" className="hover:text-[#C9A24A] transition">Concierge Service</a></li>
                <li><a href="/corporate" className="hover:text-[#C9A24A] transition">Corporate Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Partners</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/partners" className="hover:text-[#C9A24A] transition">Join Network</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Partner Benefits</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Success Stories</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-[#C9A24A] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A24A]/10 to-[#D4B158]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-4">
                <Star className="w-4 h-4 text-[#C9A24A] fill-current" />
                <span className="text-[#C9A24A] font-semibold text-sm">Founding Member Invitation</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1B2B] mb-2">
                Join the Waiting List
              </h3>
              <p className="text-[#6B7280]">
                Secure your spot as one of our first 100 Founding Members and get 50% off launch rates.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none"
              />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none">
                <option value="">When are you planning to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-[#0B1B2B] hover:bg-[#1A2B3B] text-white py-3"
                onClick={() => {
                  // Handle form submission
                  setShowWaitlist(false)
                }}
              >
                Join Waiting List
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowWaitlist(false)}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 py-3"
              >
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-center text-[#6B7280] mt-4">
              By joining, you'll receive exclusive updates about our September 15th launch and founding member benefits.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Ask Relo Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="/ask"
          className="inline-flex items-center justify-center rounded-full px-6 py-4 bg-[#C9A24A] text-[#0B1B2B] hover:bg-[#B8923D] transition shadow-2xl border-2 border-white font-semibold text-sm"
          style={{ boxShadow: '0 10px 25px rgba(201, 162, 74, 0.3)' }}
        >
          <Mic className="w-4 h-4 mr-2" />
          Ask Relo
        </a>
      </div>
    </div>
  )
}