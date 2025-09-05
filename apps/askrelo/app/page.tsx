'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import { Calendar, ChevronRight, Star, Shield, Mic, Play, Volume2, ArrowRight, Clock, Users, Award, Eye, Building2 } from 'lucide-react'

// Enhanced CSS with refined design system
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }
  
  :root {
    --accent-blue: #3B82F6;
    --accent-blue-light: #60A5FA;
    --accent-blue-dark: #2563EB;
    --accent-blue-ultra: #1E40AF;
  }
  
  .glass-primary {
    backdrop-filter: blur(20px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .glass-hero {
    backdrop-filter: blur(24px);
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
  
  .glass-card {
    backdrop-filter: blur(16px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  }
  
  .glass-countdown {
    backdrop-filter: blur(12px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  .blue-gradient-primary {
    background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-dark) 100%);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
  }
  
  .blue-gradient-light {
    background: linear-gradient(135deg, var(--accent-blue-light) 0%, var(--accent-blue) 100%);
  }
  
  .blue-gradient-bg {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(96, 165, 250, 0.02) 100%);
  }
  
  .hero-gradient {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(59, 130, 246, 0.1) 30%,
      rgba(0, 0, 0, 0.4) 70%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
  
  .gallery-image {
    transition: all 4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: brightness(0.75) contrast(1.1) saturate(1.1);
    object-fit: cover;
    object-position: center;
  }
  
  .gallery-image.active {
    transform: scale(1.05);
  }
  
  .floating-slow {
    animation: floatSlow 12s ease-in-out infinite;
  }
  
  .floating-medium {
    animation: floatMedium 8s ease-in-out infinite 2s;
  }
  
  .floating-fast {
    animation: floatFast 6s ease-in-out infinite 1s;
  }
  
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(0.5deg); }
    50% { transform: translateY(-12px) rotate(0deg); }
    75% { transform: translateY(-6px) rotate(-0.5deg); }
  }
  
  @keyframes floatMedium {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-10px) scale(1.02); }
  }
  
  @keyframes floatFast {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  .slide-up-elegant {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
    animation: slideUpElegant 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes slideUpElegant {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .fade-in-up {
    opacity: 0;
    transform: translateY(40px);
    animation: fadeInUp 1.2s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.3s; }
  .stagger-3 { animation-delay: 0.5s; }
  .stagger-4 { animation-delay: 0.7s; }
  .stagger-5 { animation-delay: 0.9s; }
  
  .nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
  }
  
  .nav-dot::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-light));
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .nav-dot.active {
    background: var(--accent-blue);
    transform: scale(1.5);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  }
  
  .nav-dot.active::before {
    opacity: 0.2;
  }
  
  .text-display {
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .text-accent {
    background: linear-gradient(135deg, var(--accent-blue-light) 0%, var(--accent-blue) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-dark) 100%);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-blue-light) 0%, var(--accent-blue) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .btn-primary:hover::before {
    opacity: 1;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 48px rgba(59, 130, 246, 0.4);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
  }
  
  .service-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(96, 165, 250, 0.01) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .service-card:hover::before {
    opacity: 1;
  }
  
  .service-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 60px rgba(59, 130, 246, 0.15);
  }
  
  .service-header {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    position: relative;
    overflow: hidden;
  }
  
  .service-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.8s ease;
  }
  
  .service-card:hover .service-header::before {
    left: 100%;
  }
  
  .pulse-glow {
    animation: pulseGlow 3s ease-in-out infinite;
  }
  
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
  }
  
  .text-shadow-elegant {
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .editorial-layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .editorial-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
`

// Enhanced London Image Gallery Component with sophisticated transitions
const LondonGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const londonImages = [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // London Skyline
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Tower Bridge
    'https://images.unsplash.com/photo-1520637736862-4d197d17c92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Big Ben
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // London Eye
    'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'  // Financial District
  ]

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndex((prev) => (prev + 1) % londonImages.length)
    }
    
    const interval = setInterval(rotateImages, 6000)
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
            index === currentImageIndex ? 'opacity-100 active' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Enhanced Gallery Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass-primary rounded-full px-6 py-3 flex space-x-4">
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
        <div 
          key={index} 
          className={`glass-countdown rounded-2xl p-6 text-center floating-fast`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <div className="text-3xl font-bold text-white text-shadow-elegant">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-white/70 text-sm font-medium mt-2">{item.label}</div>
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
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Hero Section with Editorial Layout */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Gallery */}
        <LondonGallery />
        
        {/* Hero Gradient Overlay */}
        <div className="hero-gradient absolute inset-0 z-10"></div>

        {/* Header */}
        <header className="glass-hero relative z-20 py-6">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4 fade-in-up stagger-1">
              <div className="w-12 h-12 blue-gradient-primary rounded-xl flex items-center justify-center pulse-glow">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-white text-2xl font-bold text-shadow-elegant">Relo Network</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button className="btn-primary relative z-10">
                Sign In
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Content with Editorial Layout */}
        <div className="relative z-20 flex items-center min-h-screen pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="editorial-layout">
              {/* Left Column - Editorial Content */}
              <div className="space-y-10">
                {/* Founding Badge */}
                <div className="glass-primary rounded-2xl px-8 py-4 inline-flex items-center space-x-4 floating-slow slide-up-elegant stagger-1">
                  <div className="w-6 h-6 blue-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                  <span className="text-white font-semibold text-shadow-elegant">Founding Member Exclusive</span>
                </div>
                
                {/* Main Headline */}
                <div className="space-y-6 slide-up-elegant stagger-2">
                  <h1 className="text-display text-shadow-elegant">
                    Relocate to <span className="text-accent">London</span>
                  </h1>
                  <h2 className="text-4xl md:text-5xl font-light text-white/95 text-shadow-elegant">
                    Effortlessly.
                  </h2>
                </div>
                
                {/* Description */}
                <p className="text-xl text-white/85 leading-relaxed max-w-lg text-shadow-elegant slide-up-elegant stagger-3">
                  London's most exclusive relocation network. AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
                </p>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 slide-up-elegant stagger-4">
                  <button 
                    onClick={scrollToWaitlist}
                    className="btn-primary relative z-10"
                  >
                    Join Waiting List
                  </button>
                  <button 
                    onClick={() => window.location.href = '/ask'}
                    className="btn-secondary"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              {/* Right Column - Countdown */}
              <div className="slide-up-elegant stagger-5 floating-medium">
                <div className="glass-primary rounded-3xl p-10">
                  <h3 className="text-3xl font-bold text-white text-center mb-8 text-shadow-elegant">Launch Countdown</h3>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <CountdownTimer />
                  </div>
                  <p className="text-white/80 text-center font-medium text-shadow-elegant">September 15th, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Launch Announcement */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="text-white font-medium">
              Official Launch Monday, September 15th • Founding Members 50% Off • Limited to 100 Members
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 blue-gradient-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 fade-in-up stagger-1">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">The London Standard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Premium relocation services designed for London's most discerning professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* AI Concierge */}
            <div className="glass-card rounded-3xl overflow-hidden service-card fade-in-up stagger-2">
              <div className="service-header p-10 text-center relative">
                <div className="text-5xl font-bold text-white mb-4 relative z-10">AI</div>
                <h3 className="text-2xl font-semibold text-white relative z-10">Concierge</h3>
              </div>
              <div className="p-10">
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  24/7 AI-powered guidance for every aspect of your London relocation. From property search to school admissions.
                </p>
                <a href="#" className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors relative group">
                  Learn More 
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
            
            {/* Vetted Network */}
            <div className="glass-card rounded-3xl overflow-hidden service-card fade-in-up stagger-3">
              <div className="service-header p-10 text-center relative">
                <div className="w-16 h-16 mx-auto mb-6 blue-gradient-primary rounded-2xl flex items-center justify-center relative z-10">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white relative z-10">Vetted Network</h3>
              </div>
              <div className="p-10">
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Curated network of London's finest service providers. All verified, all exceptional, all ready to serve you.
                </p>
                <a href="#" className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors relative group">
                  Explore Partners 
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
            
            {/* Executive Service */}
            <div className="glass-card rounded-3xl overflow-hidden service-card fade-in-up stagger-4">
              <div className="service-header p-10 text-center relative">
                <div className="text-2xl font-bold text-white mb-6 relative z-10">White Glove</div>
                <h3 className="text-2xl font-semibold text-white relative z-10">Executive Service</h3>
              </div>
              <div className="p-10">
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  Bespoke relocation management for C-suite executives. Complete coordination, absolute discretion.
                </p>
                <a href="#" className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors relative group">
                  Request Consultation 
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="glass-card rounded-3xl p-16 max-w-4xl mx-auto fade-in-up floating-slow">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center pulse-glow">
              <span className="text-white text-3xl font-bold">★</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Invitation Only</h2>
            <p className="text-3xl font-light text-gray-700 mb-4">Limited Founding Members</p>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join London's most exclusive relocation network. Only 100 Founding Members will receive lifetime benefits and priority access to our premium services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={scrollToWaitlist}
                className="btn-primary bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800"
              >
                Request Invitation
              </button>
              <button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all">
                Learn More
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