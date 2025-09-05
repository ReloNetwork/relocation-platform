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
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .glass-secondary {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }
  
  .glass-content {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-card {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .text-glass {
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .gallery-image {
    transition: opacity 2s ease-in-out;
    filter: brightness(0.65) contrast(1.15) saturate(0.9) sepia(0.1);
    object-fit: cover;
    object-position: center;
  }
  
  .gallery-image.fade-out {
    opacity: 0;
  }
  
  .gallery-image.fade-in {
    opacity: 1;
  }
  
  .countdown-digit {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .floating-animation {
    animation: float 8s ease-in-out infinite;
  }
  
  .floating-delayed {
    animation: float 8s ease-in-out infinite 3s;
  }
  
  .floating-slow {
    animation: float 10s ease-in-out infinite 1s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotateZ(0deg); }
    25% { transform: translateY(-8px) rotateZ(0.5deg); }
    50% { transform: translateY(-12px) rotateZ(0deg); }
    75% { transform: translateY(-6px) rotateZ(-0.5deg); }
  }
  
  .premium-glow {
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.25);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .premium-glow:hover {
    box-shadow: 0 12px 48px rgba(99, 102, 241, 0.35);
    transform: translateY(-2px) scale(1.02);
  }
  
  .hero-overlay {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 30%,
      rgba(0, 0, 0, 0.2) 70%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
  
  .accent-gradient {
    background: linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .accent-gradient:hover {
    background: linear-gradient(135deg, #4F46E5 0%, #4338CA 50%, #3730A3 100%);
    transform: translateY(-1px);
  }
  
  .accent-secondary {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  }
  
  .accent-secondary:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }
  
  .pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
  }
  
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
    50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
  }
  
  .slide-in {
    animation: slideIn 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
  }
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  
  .image-navigation {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .nav-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .nav-dot.active {
    background: #6366F1;
    transform: scale(1.2);
  }
`

// London Image Gallery Component  
const LondonGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const londonImages = [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // London City
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Tower Bridge
    'https://images.unsplash.com/photo-1520637736862-4d197d17c92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Big Ben
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // London Eye
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'  // Financial District
  ]

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % londonImages.length)
    }
    
    const interval = setInterval(rotateImages, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="absolute inset-0 z-0">
      {londonImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`London View ${index + 1}`}
          className={`gallery-image absolute inset-0 w-full h-full ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="image-navigation rounded-full px-4 py-2 flex space-x-3">
          {londonImages.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
            />
          ))}
        </div>
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
    <>
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="countdown-digit rounded-2xl p-6 text-center">
          <div className="text-4xl font-bold text-glass">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-glass/70 text-sm font-medium mt-2">{item.label}</div>
        </div>
      ))}
    </>
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
        <header className="glass-secondary relative z-20 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 slide-in">
              <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center pulse-glow">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-glass text-2xl font-semibold">Relo Network</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-glass/90 hover:text-white transition-all duration-300 font-medium">Services</a>
              <a href="#partners" className="text-glass/90 hover:text-white transition-all duration-300 font-medium">Partners</a>
              <a href="#about" className="text-glass/90 hover:text-white transition-all duration-300 font-medium">About</a>
              <button className="accent-gradient px-8 py-3 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 premium-glow">
                Sign In
              </button>
            </nav>
          </div>
        </header>
        
        {/* Launch Announcement */}
        <div className="relative z-20 px-6 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-primary rounded-2xl px-8 py-4 text-center slide-in stagger-1">
              <span className="text-glass text-base font-medium">
                Official Launch: Monday, September 15th • Founding Members get 50% off • Limited to 100 Members
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-6 pt-16 pb-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-10">
              {/* Founding Member Badge */}
              <div className="glass-primary rounded-2xl px-8 py-4 inline-flex items-center space-x-4 floating-animation slide-in stagger-2">
                <div className="w-8 h-8 accent-gradient rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                <span className="text-glass font-semibold text-lg">Founding Member Exclusive</span>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6 slide-in stagger-3">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-glass leading-tight">
                  Relocate to 
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                    London
                  </span>
                </h1>
                <h2 className="text-4xl md:text-5xl font-light text-glass/90">
                  Effortlessly.
                </h2>
              </div>
              
              {/* Description */}
              <p className="text-xl text-glass/90 leading-relaxed max-w-xl slide-in stagger-4">
                Join London's most exclusive relocation network. AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 slide-in stagger-4">
                <button 
                  onClick={scrollToWaitlist}
                  className="accent-gradient px-10 py-5 rounded-2xl text-white font-semibold text-xl hover:scale-105 transition-all duration-300 premium-glow"
                >
                  Join Waiting List
                </button>
                <button 
                  onClick={() => window.location.href = '/ask'}
                  className="glass-primary px-10 py-5 rounded-2xl text-glass font-semibold text-xl hover:bg-white/15 transition-all duration-300"
                >
                  Meet Ask Relo
                </button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center space-x-8 pt-6 slide-in stagger-4">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-3 border-white/30 backdrop-blur-sm"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-3 border-white/30 backdrop-blur-sm"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-3 border-white/30 backdrop-blur-sm"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-3 border-white/30 backdrop-blur-sm"></div>
                </div>
                <span className="text-glass/80 text-base font-medium">47 partners joined this month</span>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              {/* Countdown Timer */}
              <div className="glass-primary rounded-3xl p-10 floating-delayed slide-in stagger-3">
                <h3 className="text-3xl font-bold text-glass text-center mb-8">Launch Countdown</h3>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <CountdownTimer />
                </div>
                <p className="text-glass/80 text-center font-medium">Until Official Launch • September 15th, 2025</p>
              </div>
              
              {/* Ask Relo AI Demo */}
              <div className="glass-primary rounded-3xl p-10 floating-slow slide-in stagger-4">
                <div className="flex items-center space-x-4 mb-8">
                  <h3 className="text-2xl font-bold text-glass">Ask Relo AI</h3>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="glass-secondary rounded-2xl p-4 ml-6">
                    <p className="text-glass/90 font-medium">"Find me a 2BR flat in Marylebone under £4k/month"</p>
                  </div>
                  <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-4 mr-6">
                    <p className="text-glass/90 font-medium">"I found 12 verified properties matching your criteria. The closest to Hyde Park is a gorgeous Victorian conversion at £3,800/month. Would you like me to schedule a viewing?"</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.href = '/ask'}
                  className="accent-gradient w-full py-4 rounded-2xl text-white font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  Try Ask Relo Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 slide-in">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">The London Standard</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Premium relocation services designed for London's most discerning professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* AI Concierge Card */}
            <div className="group hover:scale-105 transition-all duration-500 slide-in stagger-1">
              <div className="glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-center">
                  <div className="text-7xl font-bold text-white mb-4">AI</div>
                  <h3 className="text-2xl font-semibold text-white">Concierge</h3>
                </div>
                <div className="p-10">
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">24/7 AI-powered guidance for every aspect of your London relocation. From property search to school admissions.</p>
                  <a href="#" className="text-indigo-600 font-semibold text-lg hover:text-indigo-700 transition-colors">Learn More →</a>
                </div>
              </div>
            </div>
            
            {/* Vetted Network Card */}
            <div className="group hover:scale-105 transition-all duration-500 slide-in stagger-2">
              <div className="glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Vetted Network</h3>
                </div>
                <div className="p-10">
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">Curated network of London's finest service providers. All verified, all exceptional, all ready to serve you.</p>
                  <a href="#" className="text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors">Explore Partners →</a>
                </div>
              </div>
            </div>
            
            {/* Executive Service Card */}
            <div className="group hover:scale-105 transition-all duration-500 slide-in stagger-3">
              <div className="glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-12 text-center">
                  <div className="text-3xl font-bold text-white mb-6">White Glove</div>
                  <h3 className="text-2xl font-semibold text-white">Executive Service</h3>
                </div>
                <div className="p-10">
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">Bespoke relocation management for C-suite executives. Complete coordination, absolute discretion.</p>
                  <a href="#" className="text-purple-600 font-semibold text-lg hover:text-purple-700 transition-colors">Request Consultation →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="glass-card rounded-3xl p-16 mx-auto max-w-3xl slide-in">
            <div className="w-20 h-20 mx-auto mb-8 accent-gradient rounded-2xl flex items-center justify-center pulse-glow">
              <span className="text-white text-3xl font-bold">★</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Invitation Only</h2>
            <p className="text-2xl text-gray-700 mb-4 font-medium">Limited Founding Members</p>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">Join London's most exclusive relocation network. Only <strong>100 Founding Members</strong> will receive lifetime benefits and priority access to our premium services.</p>
            
            <div className="space-y-6">
              <button 
                onClick={scrollToWaitlist}
                className="accent-gradient w-full py-5 rounded-2xl text-white font-semibold text-xl hover:scale-105 transition-all duration-300 premium-glow"
              >
                Request Invitation
              </button>
              <button className="glass-secondary w-full py-5 rounded-2xl text-gray-700 font-semibold text-lg hover:bg-white/40 transition-all duration-300">
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