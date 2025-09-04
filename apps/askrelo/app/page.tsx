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
    <div className="flex gap-4 justify-center">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="bg-white/70 backdrop-blur-md border border-white/30 text-[#1E40AF] w-18 h-18 rounded-2xl flex items-center justify-center text-2xl font-bold font-mono shadow-lg">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-sm text-[#4F46E5] mt-3 font-semibold">{item.label}</div>
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
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 relative overflow-hidden shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 border border-[#4F46E5] rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-[#1E40AF] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-[#1E40AF]/10 to-[#4F46E5]/10 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#4F46E5] flex items-center justify-center shadow-lg">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#1E40AF]">Ask Relo AI</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-[#4F46E5]">Live Demo</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsActive(!isActive)}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold shadow-lg"
          >
            {isActive ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Listening...' : 'Try Demo'}
          </Button>
        </div>

        <div className="space-y-4 mb-6 h-32">
          {isActive && conversation[currentMessage] && (
            <div className={`flex ${conversation[currentMessage].type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-xs p-4 rounded-2xl shadow-lg ${
                conversation[currentMessage].type === 'user' 
                  ? 'bg-[#1E40AF] text-white' 
                  : 'bg-white/80 text-[#1E40AF] backdrop-blur-sm border border-white/40'
              }`}>
                <p className="text-sm font-medium">{conversation[currentMessage].text}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/ask'}
            className="bg-white/90 text-[#1E40AF] hover:bg-white border border-white/40 font-semibold shadow-lg backdrop-blur-sm"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50">
      {/* Launch Announcement Bar */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#4F46E5] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div 
            className="flex items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition rounded-lg px-4 py-2"
            onClick={scrollToWaitlist}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-semibold text-sm">
              🚀 Official Launch: Monday, September 15th • Founding Members get 50% off • Limited to 100 Members
            </span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Premium Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="font-serif text-3xl font-bold text-[#1E40AF] tracking-tight">
              Relo Network
            </div>
            <div className="flex items-center space-x-8">
              <a href="/directory" className="text-[#4F46E5] hover:text-[#1E40AF] font-semibold transition">
                Directory
              </a>
              <a href="/concierge" className="text-[#4F46E5] hover:text-[#1E40AF] font-semibold transition">
                Concierge
              </a>
              <a href="/partners" className="text-[#4F46E5] hover:text-[#1E40AF] font-semibold transition">
                Partners
              </a>
              <Button variant="outline" className="border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white font-semibold shadow-lg">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Editorial Hero Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#1E40AF]/10 to-[#4F46E5]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#4F46E5]/10 to-[#1E40AF]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column - Editorial Content */}
            <div className="space-y-10">
              {/* Founding Member Badge */}
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 shadow-lg">
                <Star className="w-5 h-5 text-[#1E40AF] fill-current" />
                <span className="text-[#1E40AF] font-bold text-sm">50% Off Launch Rates</span>
              </div>

              {/* Editorial Headline */}
              <div className="space-y-8">
                <h1 className="font-serif text-6xl lg:text-7xl font-bold text-[#1E40AF] leading-tight">
                  Relocate to London.<br />
                  <span className="text-[#4F46E5]">Effortlessly.</span>
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-lg font-medium">
                  An invitation-only concierge service for discerning professionals. 
                  100+ vetted partners, 24/7 AI expertise, and white-glove coordination 
                  for London's elite relocations.
                </p>
              </div>

              {/* Live Countdown */}
              <div className="space-y-6">
                <p className="text-sm font-bold text-[#1E40AF] uppercase tracking-wider">
                  ⏰ Official Launch In:
                </p>
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-xl">
                  <CountdownTimer />
                </div>
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 text-lg font-bold shadow-xl"
                >
                  Join Waiting List <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/ask'}
                  className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 py-4 text-lg font-bold shadow-lg bg-white/60 backdrop-blur-md"
                >
                  Meet Ask Relo <Mic className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1E40AF]">100+</div>
                  <div className="text-sm text-[#4F46E5] font-semibold">Vetted Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1E40AF]">24/7</div>
                  <div className="text-sm text-[#4F46E5] font-semibold">AI Concierge</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1E40AF]">London ↔ NYC</div>
                  <div className="text-sm text-[#4F46E5] font-semibold">Premium Routes</div>
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
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-br from-[#4F46E5]/5 to-[#1E40AF]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-gradient-to-br from-[#1E40AF]/5 to-[#4F46E5]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-bold text-[#1E40AF] mb-6">
              The London Standard
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              Why London's elite professionals choose Relo Network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* AI Concierge Card - Blue */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-gradient-to-br from-[#1E40AF] via-[#4F46E5] to-[#3B82F6] text-white rounded-3xl p-8 h-full relative overflow-hidden shadow-2xl">
                <div className="absolute top-4 right-4 text-white/20 text-6xl font-bold">
                  AI
                </div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
                <div className="relative z-10">
                  <Mic className="w-12 h-12 text-white mb-6 drop-shadow-lg" />
                  <h3 className="text-2xl font-bold mb-4 text-white">AI Concierge</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                    24/7 intelligent assistant that learns your preferences, 
                    anticipates needs, and provides instant London expertise.
                  </p>
                  <div className="flex items-center text-white font-bold group-hover:gap-3 gap-2 transition-all">
                    Try Ask Relo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vetted Network Card - White Glassmorphic */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all">
                <Shield className="w-12 h-12 text-[#4F46E5] mb-6 drop-shadow-sm" />
                <h3 className="text-2xl font-bold text-[#1E40AF] mb-4">Vetted Network</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  100+ premium partners personally screened and continuously 
                  monitored for exceptional service quality.
                </p>
                <div className="flex items-center text-[#4F46E5] font-bold group-hover:gap-3 gap-2 transition-all">
                  View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* White Glove Service Card - Light Blue Gradient */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-400/80 via-indigo-400/80 to-blue-500/80 text-white rounded-3xl p-8 h-full relative overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full opacity-30"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
                <div className="relative z-10">
                  <Award className="w-12 h-12 text-white mb-6 drop-shadow-lg" />
                  <h3 className="text-2xl font-bold mb-4 text-white">White Glove Service</h3>
                  <p className="text-blue-50 mb-6 leading-relaxed font-medium">
                    Executive-level coordination handling every detail 
                    from property search to settling-in services.
                  </p>
                  <div className="flex items-center text-white font-bold group-hover:gap-3 gap-2 transition-all">
                    See Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusivity Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#1E40AF]/10 to-[#4F46E5]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E40AF]/10 to-[#4F46E5]/10 border border-[#1E40AF]/20 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-[#1E40AF] fill-current" />
              <span className="text-[#1E40AF] font-bold">✨ Invitation Only • Limited Founding Members</span>
            </div>

            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-[#1E40AF] mb-8 leading-tight">
              For Those Who Know London—<br />
              <span className="text-[#4F46E5]">And Those Who Want To.</span>
            </h2>

            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              An exclusive network limited to just 100 Founding Members. 
              Join London's most discerning professionals in redefining relocation excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button 
                onClick={scrollToWaitlist}
                className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 text-lg font-bold shadow-xl"
              >
                Request Invitation
              </Button>
              <Button 
                variant="outline" 
                className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 py-4 text-lg font-bold shadow-lg bg-white/60 backdrop-blur-md"
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-gray-600 font-medium">
              <strong className="text-[#1E40AF]">🎯 Just 100 Founding Members</strong> • 50% off launch rates • Priority access
            </p>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-[#1E40AF] via-[#4F46E5] to-[#3B82F6] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-serif text-3xl font-bold mb-4 text-white">Relo Network</div>
              <p className="text-blue-100 mb-6 font-medium">
                Relocate to London, Effortlessly.
              </p>
              <div className="flex items-center gap-4 text-sm text-blue-200 font-semibold">
                <span>BAR</span> • <span>FIDI</span> • <span>ARP</span> • <span>GDPR</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="/directory" className="hover:text-white transition font-medium">Premium Directory</a></li>
                <li><a href="/ask" className="hover:text-white transition font-medium">Ask Relo AI</a></li>
                <li><a href="/concierge" className="hover:text-white transition font-medium">Concierge Service</a></li>
                <li><a href="/corporate" className="hover:text-white transition font-medium">Corporate Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Partners</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="/partners" className="hover:text-white transition font-medium">Join Network</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Partner Benefits</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-blue-100">
                <li><a href="#" className="hover:text-white transition font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition font-medium">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-blue-100">
            <p className="font-medium">&copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-blue-900/70 flex items-center justify-center p-4 z-50 backdrop-blur-lg">
          <div className="bg-white/90 backdrop-blur-xl border border-white/30 max-w-lg w-full rounded-3xl p-10 shadow-3xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E40AF]/10 to-[#4F46E5]/10 border border-[#1E40AF]/20 rounded-full px-6 py-3 mb-6">
                <Star className="w-5 h-5 text-[#1E40AF] fill-current" />
                <span className="text-[#1E40AF] font-bold text-sm">✨ Founding Member Invitation</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1E40AF] mb-3">
                Join the Waiting List
              </h3>
              <p className="text-gray-700 font-medium">
                Secure your spot as one of our first 100 Founding Members and get 50% off launch rates.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none bg-white/70 backdrop-blur-sm font-medium"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none bg-white/70 backdrop-blur-sm font-medium"
              />
              <select className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent outline-none bg-white/70 backdrop-blur-sm font-medium">
                <option value="">When are you planning to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white py-4 font-bold shadow-xl"
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
                className="border-gray-300 text-gray-600 hover:bg-gray-50 py-4 font-semibold bg-white/70 backdrop-blur-sm"
              >
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-center text-gray-600 mt-6 font-medium">
              By joining, you'll receive exclusive updates about our September 15th launch and founding member benefits.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Ask Relo Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="/ask"
          className="inline-flex items-center justify-center rounded-full px-6 py-4 bg-[#1E40AF] text-white hover:bg-[#1E3A8A] transition shadow-2xl border-2 border-white font-bold text-sm backdrop-blur-xl"
          style={{ boxShadow: '0 15px 35px rgba(30, 64, 175, 0.4)' }}
        >
          <Mic className="w-4 h-4 mr-2" />
          Ask Relo
        </a>
      </div>
    </div>
  )
}