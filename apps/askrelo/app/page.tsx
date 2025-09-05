'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import { Calendar, ChevronRight, Star, Shield, Mic, Play, Volume2, ArrowRight, Clock, Users, Award, Eye, Building2 } from 'lucide-react'

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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-white text-lg font-bold mb-2 drop-shadow-lg">Launch Countdown</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold font-mono shadow-2xl">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-white/90 mt-3 font-semibold drop-shadow">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-white/80 text-sm font-medium drop-shadow">Until Official Launch • September 15th, 2025</p>
      </div>
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
    <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/30 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white drop-shadow">Ask Relo AI</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/90 drop-shadow">Live Demo</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsActive(!isActive)}
            className="backdrop-blur-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 font-semibold shadow-lg transition-all duration-300"
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
                  ? 'backdrop-blur-sm bg-white/10 border border-white/20 text-white' 
                  : 'backdrop-blur-sm bg-yellow-400/20 border border-yellow-300/30 text-white'
              }`}>
                <p className="text-sm font-medium drop-shadow">{conversation[currentMessage].text}</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/ask'}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
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
    <div className="min-h-screen">
      {/* Launch Announcement Bar */}
      <div className="backdrop-blur-md bg-yellow-400/20 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div 
            className="flex items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-all duration-300 rounded-lg px-4 py-2"
            onClick={scrollToWaitlist}
          >
            <Calendar className="w-5 h-5 text-white" />
            <span className="font-bold text-sm text-white drop-shadow">
              🚀 Official Launch: Monday, September 15th • Founding Members get 50% off • Limited to 100 Members
            </span>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Premium Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="font-serif text-3xl font-bold text-white tracking-tight drop-shadow-lg">
              Relo Network
            </div>
            <div className="flex items-center space-x-8">
              <a href="/directory" className="text-white/90 hover:text-white font-semibold transition drop-shadow">
                Directory
              </a>
              <a href="/concierge" className="text-white/90 hover:text-white font-semibold transition drop-shadow">
                Concierge
              </a>
              <a href="/partners" className="text-white/90 hover:text-white font-semibold transition drop-shadow">
                Partners
              </a>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 font-bold shadow-xl transform hover:scale-105 transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* London Skyline Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        {/* London Skyline Background */}
        <div className="absolute inset-0">
          {/* Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-blue-300 to-blue-400"></div>
          
          {/* London Skyline SVG */}
          <svg viewBox="0 0 1200 600" className="absolute bottom-0 w-full h-full" preserveAspectRatio="xMidYEnd slice">
            {/* Thames River */}
            <rect x="0" y="520" width="1200" height="80" fill="url(#thamesGradient)" />
            
            {/* Building Silhouettes */}
            {/* The Shard */}
            <polygon points="850,520 860,100 880,520" fill="#374151" />
            
            {/* Gherkin */}
            <ellipse cx="750" cy="350" rx="25" ry="170" fill="#475569" />
            
            {/* London Eye */}
            <circle cx="200" cy="400" r="80" fill="none" stroke="#6B7280" strokeWidth="8" />
            <circle cx="200" cy="400" r="60" fill="none" stroke="#6B7280" strokeWidth="2" />
            
            {/* Tower Bridge */}
            <rect x="300" y="450" width="20" height="70" fill="#374151" />
            <rect x="380" y="450" width="20" height="70" fill="#374151" />
            <rect x="300" y="420" width="100" height="15" fill="#475569" />
            
            {/* Big Ben */}
            <rect x="100" y="300" width="30" height="220" fill="#374151" />
            <rect x="105" y="280" width="20" height="20" fill="#475569" />
            
            {/* Various Buildings */}
            <rect x="500" y="400" width="40" height="120" fill="#475569" />
            <rect x="600" y="380" width="35" height="140" fill="#374151" />
            <rect x="950" y="420" width="50" height="100" fill="#475569" />
            <rect x="1050" y="440" width="30" height="80" fill="#374151" />
            <rect x="50" y="480" width="25" height="40" fill="#6B7280" />
            <rect x="450" y="460" width="30" height="60" fill="#6B7280" />
            
            <defs>
              <linearGradient id="thamesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Atmospheric Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[80vh]">
            
            {/* Left Column - Editorial Content */}
            <div className="space-y-10">
              {/* Founding Member Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-6 py-3 shadow-2xl">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-bold text-sm drop-shadow">50% Off Launch Rates</span>
              </div>

              {/* Editorial Headline */}
              <div className="space-y-8">
                <h1 className="font-serif text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                  Relocate to London.<br />
                  <span className="text-yellow-400">Effortlessly.</span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-lg font-medium drop-shadow">
                  An invitation-only concierge service for discerning professionals. 
                  100+ vetted partners, 24/7 AI expertise, and white-glove coordination 
                  for London's elite relocations.
                </p>
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Join Waiting List <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => window.location.href = '/ask'}
                  className="backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 px-8 py-4 text-lg font-bold shadow-lg transition-all duration-300"
                >
                  Meet Ask Relo <Mic className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Social Proof */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white drop-shadow">100+</div>
                  <div className="text-sm text-white/90 font-semibold drop-shadow">Vetted Partners</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white drop-shadow">24/7</div>
                  <div className="text-sm text-white/90 font-semibold drop-shadow">AI Concierge</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white drop-shadow">London ↔ NYC</div>
                  <div className="text-sm text-white/90 font-semibold drop-shadow">Premium Routes</div>
                </div>
              </div>
            </div>

            {/* Right Column - Countdown & Demo */}
            <div className="lg:pl-8 space-y-8">
              {/* Glassmorphic Countdown Timer */}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl">
                <CountdownTimer />
              </div>
              
              {/* Ask Relo Demo */}
              <AskReloDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Cards Section - "The London Standard" */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-bold text-gray-900 mb-6">
              The London Standard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Why London's elite professionals choose Relo Network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* AI Concierge Card - Blue */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl h-full">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 relative">
                  <div className="absolute top-4 right-4 text-white/20 text-6xl font-bold">
                    AI
                  </div>
                  <Mic className="w-12 h-12 text-white mb-4 drop-shadow-lg relative z-10" />
                </div>
                {/* Glass Content Area */}
                <div className="backdrop-blur-sm bg-white/70 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Concierge</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    24/7 intelligent assistant that learns your preferences, 
                    anticipates needs, and provides instant London expertise.
                  </p>
                  <div className="flex items-center text-blue-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    Try Ask Relo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Vetted Network Card - Emerald */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl overflow-hidden shadow-2xl h-full">
                {/* Header */}
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-6">
                  <Shield className="w-12 h-12 text-emerald-600 mb-4 drop-shadow-sm" />
                </div>
                {/* Glass Content Area */}
                <div className="backdrop-blur-sm bg-white/70 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vetted Network</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    100+ premium partners personally screened and continuously 
                    monitored for exceptional service quality.
                  </p>
                  <div className="flex items-center text-emerald-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Service Card - Purple */}
            <div className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-2xl h-full">
                {/* Header */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6">
                  <Award className="w-12 h-12 text-purple-600 mb-4 drop-shadow-sm" />
                </div>
                {/* Glass Content Area */}
                <div className="backdrop-blur-sm bg-white/70 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-700">White Glove Service</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    Executive-level coordination handling every detail 
                    from property search to settling-in services.
                  </p>
                  <div className="flex items-center text-purple-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    See Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusivity Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl p-12 shadow-3xl">
            <div className="inline-flex items-center gap-2 backdrop-blur-md bg-yellow-400/20 border border-yellow-300/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-yellow-600 fill-current" />
              <span className="text-yellow-800 font-bold">✨ Invitation Only • Limited Founding Members</span>
            </div>

            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              For Those Who Know London—<br />
              <span className="text-blue-600">And Those Who Want To.</span>
            </h2>

            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              An exclusive network limited to just 100 Founding Members. 
              Join London's most discerning professionals in redefining relocation excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button 
                onClick={scrollToWaitlist}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Request Invitation
              </Button>
              <Button 
                className="backdrop-blur-md bg-white/20 border border-white/30 text-gray-700 hover:bg-white/40 px-8 py-4 text-lg font-bold shadow-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-gray-600 font-medium">
              <strong className="text-gray-900">🎯 Just 100 Founding Members</strong> • 50% off launch rates • Priority access
            </p>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Glass Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400/5 to-yellow-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-serif text-3xl font-bold mb-4 text-white">Relo Network</div>
              <p className="text-gray-300 mb-6 font-medium">
                Relocate to London, Effortlessly.
              </p>
              <div className="flex items-center gap-4 text-sm text-yellow-400 font-semibold">
                <span>BAR</span> • <span>FIDI</span> • <span>ARP</span> • <span>GDPR</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/directory" className="hover:text-yellow-400 transition font-medium">Premium Directory</a></li>
                <li><a href="/ask" className="hover:text-yellow-400 transition font-medium">Ask Relo AI</a></li>
                <li><a href="/concierge" className="hover:text-yellow-400 transition font-medium">Concierge Service</a></li>
                <li><a href="/corporate" className="hover:text-yellow-400 transition font-medium">Corporate Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Partners</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/partners" className="hover:text-yellow-400 transition font-medium">Join Network</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Partner Benefits</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Success Stories</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Terms of Service</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition font-medium">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-gray-300">
            <p className="font-medium">&copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center p-4 z-50 backdrop-blur-lg">
          <div className="backdrop-blur-xl bg-white/90 border border-white/30 max-w-lg w-full rounded-3xl p-10 shadow-3xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-3 mb-6">
                <Star className="w-5 h-5 text-emerald-600 fill-current" />
                <span className="text-emerald-800 font-bold text-sm">✨ Founding Member Invitation</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-3">
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
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/80 font-medium"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/80 font-medium"
              />
              <select className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/70 font-medium">
                <option value="">When are you planning to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-4 font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                onClick={() => {
                  // Handle form submission
                  setShowWaitlist(false)
                }}
              >
                Join Waiting List
              </Button>
              <Button 
                onClick={() => setShowWaitlist(false)}
                className="backdrop-blur-xl bg-white/25 border border-white/30 text-gray-600 hover:bg-white/40 py-4 font-semibold transition-all duration-300"
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
          className="inline-flex items-center justify-center rounded-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 shadow-2xl border-2 border-white font-bold text-sm transform hover:scale-110"
          style={{ boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)' }}
        >
          <Mic className="w-4 h-4 mr-2" />
          Ask Relo
        </a>
      </div>
    </div>
  )
}