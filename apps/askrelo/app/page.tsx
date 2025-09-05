'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import { Calendar, ChevronRight, Star, Shield, Mic, Play, Volume2, ArrowRight, Clock, Users, Award, Eye, Building2 } from 'lucide-react'

// Custom CSS for glassmorphic effects and animations
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }
  
  .glass-primary {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-secondary {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .glass-content {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.9);
  }
  
  .text-glass {
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .gallery-image {
    transition: opacity 1s ease-in-out;
    filter: brightness(0.7) contrast(1.1) saturate(1.2);
  }
  
  .countdown-digit {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .floating-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .floating-delayed {
    animation: float 6s ease-in-out infinite 2s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .premium-glow {
    box-shadow: 0 8px 32px rgba(251, 191, 36, 0.3);
  }
  
  .premium-glow:hover {
    box-shadow: 0 12px 40px rgba(251, 191, 36, 0.4);
    transform: translateY(-2px);
  }
  
  .hero-overlay {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
  
  .accent-gradient {
    background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
  }
  
  .accent-gradient:hover {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  }
`

// London Image Gallery Component
const LondonGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const londonImages = [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // London City
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Tower Bridge
    'https://images.unsplash.com/photo-1520637836862-4d197d17c92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Big Ben
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // London Eye
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'  // Financial District
  ]

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % londonImages.length)
    }
    
    const interval = setInterval(rotateImages, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {londonImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`London View ${index + 1}`}
          className={`gallery-image absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            filter: 'brightness(0.7) contrast(1.1) saturate(1.2)'
          }}
        />
      ))}
      
      {/* Gallery Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {londonImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-15T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const timeLeft = targetDate - now
      
      if (timeLeft > 0) {
        setTimeLeft({
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateCountdown() // Initial call
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="glass-primary rounded-2xl p-8 floating-delayed">
      <h3 className="text-2xl font-bold text-glass text-center mb-6">Launch Countdown</h3>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="countdown-digit rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-glass">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-glass/70 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
      <p className="text-glass/80 text-center text-sm">Until Official Launch • September 15th, 2025</p>
    </div>
  )
}

const AskReloDemo = () => {
  return (
    <div className="glass-primary rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <h3 className="text-xl font-bold text-glass">Ask Relo AI</h3>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="glass-secondary rounded-lg p-3 ml-8">
          <p className="text-glass/90 text-sm">"Find me a 2BR flat in Marylebone under £4k/month"</p>
        </div>
        <div className="bg-yellow-400/20 border border-yellow-300/30 rounded-lg p-3 mr-8">
          <p className="text-glass/90 text-sm">"I found 12 verified properties matching your criteria. The closest to Hyde Park is a gorgeous Victorian conversion at £3,800/month. Would you like me to schedule a viewing?"</p>
        </div>
      </div>
      
      <button 
        onClick={() => window.location.href = '/ask'}
        className="accent-gradient w-full py-3 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
      >
        Try Ask Relo Free
      </button>
    </div>
  )
}

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const scrollToWaitlist = () => {
    setShowWaitlist(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Hero Section with Rotating London Gallery */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image Gallery */}
        <LondonGallery />
        
        {/* Hero Overlay */}
        <div className="hero-overlay absolute inset-0 z-10"></div>

        {/* Header */}
        <header className="glass-secondary relative z-20 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-glass text-xl font-semibold">Relo Network</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/directory" className="text-glass hover:text-yellow-300 transition-colors">Services</a>
              <a href="/partners" className="text-glass hover:text-yellow-300 transition-colors">Partners</a>
              <a href="#" className="text-glass hover:text-yellow-300 transition-colors">About</a>
              <button className="accent-gradient px-6 py-2 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 premium-glow">
                Sign In
              </button>
            </nav>
          </div>
        </header>
        
        {/* Launch Announcement */}
        <div className="relative z-20 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="glass-primary rounded-xl px-6 py-3 text-center">
              <span className="text-glass text-sm md:text-base font-medium">
                Official Launch: Monday, September 15th • Founding Members get 50% off • Limited to 100 Members
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-4 pt-12 pb-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Founding Member Badge */}
              <div className="glass-primary rounded-xl px-6 py-3 inline-flex items-center space-x-3 floating-animation">
                <div className="w-6 h-6 accent-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="text-glass font-medium">Founding Member Exclusive</span>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-glass leading-tight">
                  Relocate to 
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                    London
                  </span>
                </h1>
                <h2 className="text-3xl md:text-4xl font-light text-glass">
                  Effortlessly.
                </h2>
              </div>
              
              {/* Description */}
              <p className="text-xl text-glass/90 leading-relaxed max-w-lg">
                Join London's most exclusive relocation network. AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToWaitlist}
                  className="accent-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all duration-300 premium-glow"
                >
                  Join Waiting List
                </button>
                <button 
                  onClick={() => window.location.href = '/ask'}
                  className="glass-primary px-8 py-4 rounded-xl text-glass font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Meet Ask Relo
                </button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 border-2 border-white"></div>
                </div>
                <span className="text-glass/80 text-sm">47 partners joined this month</span>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Countdown Timer */}
              <CountdownTimer />
              
              {/* Ask Relo AI Demo */}
              <AskReloDemo />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The London Standard</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Premium relocation services designed for London's most discerning professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Concierge Card */}
            <div className="group hover:scale-105 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center">
                  <div className="text-6xl font-bold text-white mb-2">AI</div>
                  <h3 className="text-xl font-semibold text-white">Concierge</h3>
                </div>
                <div className="glass-content p-8">
                  <p className="text-gray-700 mb-6">24/7 AI-powered guidance for every aspect of your London relocation. From property search to school admissions.</p>
                  <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Learn More →</a>
                </div>
              </div>
            </div>
            
            {/* Vetted Network Card */}
            <div className="group hover:scale-105 transition-all duration-500">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800">Vetted Network</h3>
                </div>
                <div className="glass-content p-8">
                  <p className="text-gray-700 mb-6">Curated network of London's finest service providers. All verified, all exceptional, all ready to serve you.</p>
                  <a href="#" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">Explore Partners →</a>
                </div>
              </div>
            </div>
            
            {/* Executive Service Card */}
            <div className="group hover:scale-105 transition-all duration-500">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 text-center">
                  <div className="text-2xl font-bold text-purple-700 mb-4">White Glove</div>
                  <h3 className="text-xl font-semibold text-purple-800">Executive Service</h3>
                </div>
                <div className="glass-content p-8">
                  <p className="text-gray-700 mb-6">Bespoke relocation management for C-suite executives. Complete coordination, absolute discretion.</p>
                  <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">Request Consultation →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-primary rounded-3xl p-12 mx-auto max-w-2xl">
            <div className="w-16 h-16 mx-auto mb-6 accent-gradient rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">★</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Invitation Only</h2>
            <p className="text-xl text-gray-700 mb-2">Limited Founding Members</p>
            <p className="text-lg text-gray-600 mb-8">Join London's most exclusive relocation network. Only <strong>100 Founding Members</strong> will receive lifetime benefits and priority access to our premium services.</p>
            
            <div className="space-y-4">
              <button 
                onClick={scrollToWaitlist}
                className="accent-gradient w-full py-4 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all duration-300 premium-glow"
              >
                Request Invitation
              </button>
              <button className="glass-secondary w-full py-4 rounded-xl text-gray-700 font-semibold hover:bg-white/30 transition-all duration-300">
                Learn More About Membership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
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
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-300/30 rounded-full px-6 py-3 mb-6">
                <Star className="w-5 h-5 text-yellow-600 fill-current" />
                <span className="text-yellow-800 font-bold text-sm">✨ Founding Member Invitation</span>
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
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/80 font-medium"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/80 font-medium"
              />
              <select className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none backdrop-blur-sm bg-white/80 font-medium">
                <option value="">When are you planning to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1 accent-gradient text-white py-4 font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 premium-glow"
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
          className="inline-flex items-center justify-center rounded-full px-6 py-4 accent-gradient text-white transition-all duration-300 shadow-2xl border-2 border-white font-bold text-sm transform hover:scale-110 premium-glow"
        >
          <Mic className="w-4 h-4 mr-2" />
          Ask Relo
        </a>
      </div>
    </div>
  )
}