'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import { Calendar, ChevronRight, Star, Shield, Mic, Play, Volume2, ArrowRight, Clock, Users, Award, Eye, Building2, Rocket, Timer } from 'lucide-react'
import Layout from '../components/Layout'
import { HomeSEO } from '../components/SEO/PageSEO'

// Premium Contemporary Luxury Design System
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  :root {
    --color-bg: #FAFAF9;
    --color-card: #FFFFFF;
    --color-text: #0B1220;
    --color-muted: #6B7280;
    --color-primary: #0B1B2B;
    --color-accent: #C9A24A;
    --color-success: #16A34A;
    --color-warning: #F59E0B;
    --color-danger: #DC2626;
  }
  
  .countdown-banner {
    background: linear-gradient(135deg, var(--color-primary) 0%, rgba(11, 27, 43, 0.9) 100%);
    animation: slideDownBanner 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transform: translateY(-100%);
    box-shadow: 0 8px 32px rgba(11, 27, 43, 0.2);
  }
  
  .banner-pulse {
    animation: bannerPulse 3s ease-in-out infinite;
  }
  
  .number-flip {
    animation: numberFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes slideDownBanner {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes bannerPulse {
    0%, 100% { 
      background: linear-gradient(135deg, var(--color-primary) 0%, rgba(11, 27, 43, 0.9) 100%);
      box-shadow: 0 8px 32px rgba(11, 27, 43, 0.2);
    }
    50% { 
      background: linear-gradient(135deg, rgba(11, 27, 43, 0.95) 0%, rgba(11, 27, 43, 0.85) 100%);
      box-shadow: 0 12px 48px rgba(201, 162, 74, 0.1);
    }
  }
  
  @keyframes numberFlip {
    0% { transform: rotateX(0); }
    50% { transform: rotateX(-90deg); }
    100% { transform: rotateX(0); }
  }
  
  @keyframes pulseButton {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(201, 162, 74, 0.3);
    }
    50% { 
      transform: scale(1.05);
      box-shadow: 0 8px 30px rgba(201, 162, 74, 0.5);
    }
  }
  
  .animate-pulse-slow {
    animation: pulseButton 2.5s ease-in-out infinite;
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
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--color-text);
  }
  
  .text-accent {
    color: var(--color-accent);
    font-style: italic;
  }
  
  .btn-primary {
    background: var(--color-primary);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 1rem 2.5rem;
    border-radius: 0.375rem;
    border: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(11, 27, 43, 0.2);
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
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 8px 24px rgba(11, 27, 43, 0.3);
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
  
  .section-spacing {
    padding: 6rem 0;
  }
  
  .container-custom {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .editorial-layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .editorial-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .container-custom {
      padding: 0 1rem;
    }
    
    .section-spacing {
      padding: 4rem 0;
    }
  }
`

// Enhanced London Image Gallery Component with sophisticated transitions
const LondonGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const londonImages = [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=85', // London Skyline
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=85', // Tower Bridge
    'https://images.unsplash.com/photo-1520637736862-4d197d17c92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=85', // Big Ben
    'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=85'  // London Eye (removed Financial District)
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
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            console.warn(`Failed to load image: ${image}`);
          }}
          loading="lazy"
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
    const targetDate = new Date('2025-09-26T14:00:00Z').getTime() // Friday, September 26th 2025, 14:00 GMT
    
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
          className="glass-countdown rounded-xl p-3 text-center"
        >
          <div className="text-xl font-bold text-white text-shadow-elegant">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-white/70 text-xs font-medium">{item.label}</div>
        </div>
      ))}
    </>
  )
}

const WaitlistCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-26T14:00:00Z').getTime() // Friday, September 26th 2025, 14:00 GMT
    
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
    <div className="grid grid-cols-4 gap-2">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Minutes' },
        { value: timeLeft.seconds, label: 'Seconds' }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-xl font-bold text-[#0B1B2B]">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-xs text-[#6B7280]">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-26T14:00:00Z').getTime() // Friday, September 26th 2025, 14:00 GMT
    
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
    <div className="flex items-center justify-center gap-6">
      <span className="text-white font-semibold text-sm">Limited Time: 50% Off for Founding Members</span>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-white font-bold number-flip text-lg">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-xs font-medium">Days</div>
        </div>
        <span className="text-white/70 text-sm">:</span>
        <div className="text-center">
          <div className="text-white font-bold number-flip text-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-xs font-medium">Hours</div>
        </div>
        <span className="text-white/70 text-sm">:</span>
        <div className="text-center">
          <div className="text-white font-bold number-flip text-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-xs font-medium">Mins</div>
        </div>
        <span className="text-white/70 text-sm">:</span>
        <div className="text-center">
          <div className="text-white font-bold number-flip text-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-xs font-medium">Secs</div>
        </div>
      </div>
      <span className="text-white/90 text-sm font-medium">Monday, September 22nd 2024</span>
    </div>
  )
}


export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const scrollToWaitlist = () => {
    setShowWaitlist(true)
  }

  return (
    <HomeSEO>
      <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden">
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Animated Countdown Banner */}
      <div className="countdown-banner banner-pulse w-full z-40 mt-16">
        <div className="w-full py-3">
          <div className="flex items-center justify-center text-center">
            <CountdownBanner />
          </div>
        </div>
      </div>
      
      {/* Hero Section with Editorial Layout */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10" style={{ marginTop: '-60px' }}>
        {/* Background Gallery */}
        <LondonGallery />
        
        {/* Hero Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/90 via-white/70 to-white/50"></div>

        {/* Hero Content with Editorial Layout */}
        <div className="relative z-20 flex items-center min-h-screen pt-20 pb-16">
          <div className="container-custom">
            <div className="editorial-layout">
              {/* Left Column - Editorial Content */}
              <div className="space-y-10">
                {/* Founding Badge */}
                <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/5 rounded-2xl px-8 py-4 inline-flex items-center space-x-4 border border-[#C9A24A]/20 slide-up-elegant stagger-1">
                  <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                  <span className="text-[#0B1B2B] font-semibold">Founding Member Exclusive</span>
                </div>
                
                {/* Main Headline */}
                <div className="space-y-8 slide-up-elegant stagger-2">
                  <h1 className="text-display leading-none">
                    Relocate to <span className="text-accent">London</span><br />
                    <span className="text-5xl md:text-6xl font-light text-[#6B7280]">Effortlessly.</span>
                  </h1>
                </div>
                
                {/* Enhanced Description */}
                <div className="space-y-4 slide-up-elegant stagger-3">
                  <p className="text-2xl text-[#0B1B2B] leading-relaxed font-medium">
                    London's most exclusive relocation network.
                  </p>
                  <p className="text-xl text-[#6B7280] leading-relaxed max-w-2xl">
                    AI-powered guidance, vetted partners, and white-glove service for discerning professionals moving to Britain's capital.
                  </p>
                </div>
                
                {/* Primary CTA */}
                <div className="space-y-4 slide-up-elegant stagger-4">
                  <button 
                    onClick={scrollToWaitlist}
                    className="btn-primary relative z-10 text-lg px-10 py-5 animate-pulse-slow"
                  >
                    Join Waitlist
                  </button>
                  <p className="text-[#6B7280] text-sm">
                    Join our exclusive founding member programme • Limited to 100 members
                  </p>
                </div>
              </div>
              
              {/* Right Column - Available for future content */}
              <div className="space-y-6">
                {/* Removed duplicate countdown timer - now only showing in banner above */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wikipedia-style About Relo Network Section */}
      <section className="section-spacing bg-white border-b border-[#0B1B2B]/10">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content - Wikipedia Style */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  About Relo Network
                </h2>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  <strong>Relo Network</strong> is London's most exclusive relocation network, founded in 2024 to revolutionize the premium relocation industry through AI-powered guidance and vetted partner services. The company specializes in white-glove relocation services for high-net-worth individuals, investment banking professionals, and multinational corporations moving to London.
                </p>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  Headquartered in London's financial district, Relo Network operates an exclusive network of 150+ vetted service providers across property search, legal services, financial advisory, and lifestyle management. The platform combines human expertise with artificial intelligence through its proprietary "Ask Relo AI" system, providing 24/7 personalized guidance for relocating professionals.
                </p>
              </div>

              {/* Company Overview Table */}
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Company Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Founded</span>
                      <span className="text-[#0B1B2B] font-semibold">2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Headquarters</span>
                      <span className="text-[#0B1B2B] font-semibold">London, UK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Industry</span>
                      <span className="text-[#0B1B2B] font-semibold">Premium Relocation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Target Market</span>
                      <span className="text-[#0B1B2B] font-semibold">UHNW, Corporate</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Success Rate</span>
                      <span className="text-[#0B1B2B] font-semibold">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Relocations Completed</span>
                      <span className="text-[#0B1B2B] font-semibold">1,200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Partner Network</span>
                      <span className="text-[#0B1B2B] font-semibold">150+ Vetted</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] font-medium">Client Satisfaction</span>
                      <span className="text-[#0B1B2B] font-semibold">4.8/5 (247 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Services and Technology
                </h3>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-[#0B1B2B]">Ask Relo AI Platform</h4>
                  <p className="text-lg text-[#0B1B2B] leading-relaxed">
                    The company's flagship technology is Ask Relo AI, a voice-activated artificial intelligence system trained specifically on London relocation data. The platform provides instant responses to complex queries about neighborhoods, property markets, visa requirements, and lifestyle preferences. Available 24/7, the system handles over 500 queries daily with 94% accuracy rate.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-[#0B1B2B]">White-Glove Relocation Management</h4>
                  <p className="text-lg text-[#0B1B2B] leading-relaxed">
                    Relo Network's human concierge team, led by former Deloitte and Knight Frank partners, provides end-to-end relocation management. Services include property search, legal coordination, financial setup, children's school placement, and cultural integration programs. The average client engagement spans 3-6 months with guaranteed outcome delivery.
                  </p>
                </div>
              </div>

              {/* Market Position */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Market Position and Recognition
                </h3>
                
                <p className="text-lg text-[#0B1B2B] leading-relaxed">
                  Positioned as the premium alternative to traditional relocation services, Relo Network commands 30-40% higher fees while maintaining a 96% client satisfaction rate. The company exclusively serves clients with relocation budgets exceeding £8,500, focusing on investment banking professionals, consulting firm partners, and technology executives.
                </p>
                
                <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-[#0B1B2B] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C9A24A]" />
                    Industry Recognition
                  </h4>
                  <ul className="space-y-2 text-[#0B1B2B]">
                    <li>• "Best Innovation in Relocation Technology" - London PropTech Awards 2024</li>
                    <li>• Preferred relocation partner for 12 major investment banks</li>
                    <li>• Featured in Financial Times: "The Future of Executive Relocation"</li>
                    <li>• Compliance: BAR, FIDI, ARP, GDPR certified</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar - Key Facts */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                  Quick Facts
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Launch Date</div>
                    <div className="text-[#0B1B2B] font-semibold">September 22, 2024</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Founding Members</div>
                    <div className="text-[#0B1B2B] font-semibold">Limited to 100</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Pricing Tiers</div>
                    <div className="text-[#0B1B2B] font-semibold">£8,500 - £15,000</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Service Areas</div>
                    <div className="text-[#0B1B2B] font-semibold">Central London Focus</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Technology</div>
                    <div className="text-[#0B1B2B] font-semibold">AI Voice Platform</div>
                  </div>
                  <div>
                    <div className="text-[#6B7280] font-medium mb-1">Target Clients</div>
                    <div className="text-[#0B1B2B] font-semibold">UHNW Individuals</div>
                  </div>
                </div>

                {/* Client Testimonial */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-[#6B7280] text-xs mb-2 font-medium">CLIENT TESTIMONIAL</div>
                  <blockquote className="text-sm text-[#0B1B2B] italic leading-relaxed">
                    "Relo Network transformed our London move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours."
                  </blockquote>
                  <div className="text-xs text-[#6B7280] mt-2">— Managing Director, Goldman Sachs</div>
                </div>

                {/* Expert Team Preview */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-[#6B7280] text-xs mb-3 font-medium">EXPERT LEADERSHIP</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xs font-bold">SM</div>
                      <div>
                        <div className="text-sm font-semibold text-[#0B1B2B]">Sarah Mitchell</div>
                        <div className="text-xs text-[#6B7280]">Former Deloitte Partner</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white text-xs font-bold">JW</div>
                      <div>
                        <div className="text-sm font-semibold text-[#0B1B2B]">James Wellington-Smith</div>
                        <div className="text-xs text-[#6B7280]">Former Knight Frank Partner</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Announcement */}
      <section className="bg-[#0B1B2B] py-4">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-white font-medium">
              Official Launch Monday, September 15th • Founding Members 50% Off • Limited to 100 Members
            </p>
          </div>
        </div>
      </section>

      {/* Ask Relo AI Demo Section */}
      <section className="section-spacing bg-[#FAFAF9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2">
                <Mic className="h-4 w-4 text-[#C9A24A] mr-2" />
                <span className="text-[#0B1B2B] text-sm font-medium">AI-Powered Assistant</span>
              </div>
              
              <h2 className="text-5xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Meet Ask Relo AI
              </h2>
              
              <p className="text-xl text-[#6B7280] leading-relaxed">
                Your 24/7 London relocation expert. Simply speak naturally and get instant, intelligent responses about properties, neighborhoods, and everything you need for your London move.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white border border-[#0B1B2B]/10 rounded-xl p-4 shadow-sm">
                  <p className="text-[#0B1B2B] font-medium">"Find me a 2BR flat in Marylebone under £4k/month"</p>
                </div>
                <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-4">
                  <p className="text-[#0B1B2B] font-medium">"I found 12 verified properties matching your criteria. The closest to Hyde Park is a gorgeous Victorian conversion at £3,800/month. Would you like me to schedule a viewing?"</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = '/demo'}
                  className="btn-primary"
                >
                  Try Voice Demo Free
                </button>
                <button 
                  onClick={() => window.location.href = '/ask-relo-pricing'}
                  className="btn-secondary"
                >
                  View Pricing
                </button>
              </div>
            </div>
            
            {/* Demo Interface */}
            <div className="bg-white border border-[#0B1B2B]/10 rounded-3xl p-8 space-y-6 shadow-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Interactive Demo</h3>
                <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-105 transition-transform cursor-pointer">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <p className="text-[#6B7280] mb-6">Click to start speaking with Ask Relo AI</p>
                
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-green-800 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AI Assistant Ready
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.href = '/demo'}
                  className="btn-primary w-full"
                >
                  Start 5-Minute Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Overview with Schema Markup */}
      <section id="services" className="section-spacing bg-white">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-20 fade-in-up stagger-1">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Premium Relocation Services
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto leading-relaxed">
              Three distinct service tiers designed for different relocation needs, from AI-powered self-service to white-glove corporate solutions
            </p>
          </div>

          {/* Service Comparison Table */}
          <div className="mb-16 bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="bg-[#0B1B2B] text-white p-6">
              <h3 className="text-2xl font-bold text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Service Comparison Matrix
              </h3>
              <p className="text-center text-white/80 mt-2">Choose the right level of support for your London relocation</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#C9A24A]/10 border-b border-[#E5E7EB]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-[#0B1B2B]">Feature</th>
                    <th className="text-center p-4 font-semibold text-[#0B1B2B]">Managed (£8,500)</th>
                    <th className="text-center p-4 font-semibold text-[#0B1B2B]">Executive (£15,000)</th>
                    <th className="text-center p-4 font-semibold text-[#0B1B2B]">Ask Relo AI (£295/mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  <tr>
                    <td className="p-4 font-medium text-[#0B1B2B]">24/7 AI Voice Assistant</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                  </tr>
                  <tr className="bg-[#FAFAF9]">
                    <td className="p-4 font-medium text-[#0B1B2B]">Property Search & Viewings</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#6B7280]">Self-Service</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#0B1B2B]">Legal & Financial Setup</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#DC2626]">✗</td>
                  </tr>
                  <tr className="bg-[#FAFAF9]">
                    <td className="p-4 font-medium text-[#0B1B2B]">Dedicated Concierge Team</td>
                    <td className="p-4 text-center text-[#6B7280]">Shared</td>
                    <td className="p-4 text-center text-[#16A34A]">Personal</td>
                    <td className="p-4 text-center text-[#DC2626]">✗</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#0B1B2B]">School Placement Assistance</td>
                    <td className="p-4 text-center text-[#16A34A]">✓</td>
                    <td className="p-4 text-center text-[#16A34A]">✓ Premium</td>
                    <td className="p-4 text-center text-[#DC2626]">✗</td>
                  </tr>
                  <tr className="bg-[#FAFAF9]">
                    <td className="p-4 font-medium text-[#0B1B2B]">Cultural Integration Program</td>
                    <td className="p-4 text-center text-[#6B7280]">Basic</td>
                    <td className="p-4 text-center text-[#16A34A]">Premium</td>
                    <td className="p-4 text-center text-[#DC2626]">✗</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#0B1B2B]">Success Rate Guarantee</td>
                    <td className="p-4 text-center text-[#16A34A]">96%</td>
                    <td className="p-4 text-center text-[#16A34A]">99%</td>
                    <td className="p-4 text-center text-[#6B7280]">Self-Service</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Ask Relo AI - Detailed Service Description */}
            <div className="bg-white border border-[#0B1B2B]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow fade-in-up stagger-2">
              <div className="bg-[#0B1B2B] p-8 text-center relative">
                <div className="mb-4 relative z-10">
                  <Mic className="w-12 h-12 text-[#C9A24A] mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-white relative z-10 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Ask Relo AI</h3>
                <p className="text-white/80 text-sm relative z-10">AI-Powered Relocation Assistant</p>
                <div className="absolute top-4 right-4 bg-[#C9A24A] text-white text-xs px-2 py-1 rounded-full font-bold">
                  SELF-SERVICE
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#0B1B2B]">£295/month</div>
                    <div className="bg-[#C9A24A]/10 text-[#C9A24A] text-xs px-2 py-1 rounded-full font-semibold">
                      5-DAY FREE TRIAL
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">Perfect for independent professionals</p>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-[#0B1B2B] text-lg">What's Included:</h4>
                  <ul className="space-y-3 text-sm text-[#0B1B2B]">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      24/7 voice-activated property search across London
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Neighborhood analysis and lifestyle matching
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Real-time market data and rental comparisons
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Visa requirements and documentation guidance
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Service provider directory access (150+ vetted partners)
                    </li>
                  </ul>
                </div>

                <div className="bg-[#F3F4F6] rounded-lg p-4 mb-6">
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Performance Metrics:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
                    <div>Response Time: &lt;3 seconds</div>
                    <div>Accuracy Rate: 94%</div>
                    <div>Daily Queries: 500+</div>
                    <div>Satisfaction: 4.6/5</div>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = '/concierge'}
                  className="btn-primary w-full text-center"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
            
            {/* Managed Service - Detailed Description */}
            <div className="bg-white border-2 border-[#C9A24A]/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow fade-in-up stagger-3 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#C9A24A] text-white text-xs px-4 py-1 rounded-full font-bold">
                MOST POPULAR
              </div>
              <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 p-8 text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#C9A24A] rounded-2xl flex items-center justify-center relative z-10">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white relative z-10 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Managed Service</h3>
                <p className="text-white/80 text-sm relative z-10">Full-Service Relocation</p>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#0B1B2B]">£8,500</div>
                    <div className="bg-[#16A34A]/10 text-[#16A34A] text-xs px-2 py-1 rounded-full font-semibold">
                      96% SUCCESS RATE
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">Comprehensive relocation management</p>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-[#0B1B2B] text-lg">Complete Service Includes:</h4>
                  <ul className="space-y-3 text-sm text-[#0B1B2B]">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Everything in Ask Relo AI plan
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Personal property consultant with 10+ viewings arranged
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Legal coordination: visa, tenancy, banking setup
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      School placement assistance (3 premium options)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Move coordination with vetted removal companies
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      3-month post-arrival support and integration
                    </li>
                  </ul>
                </div>

                <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-lg p-4 mb-6">
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Average Timeline:</div>
                  <div className="text-xs text-[#6B7280] space-y-1">
                    <div>Property secured: 2-4 weeks</div>
                    <div>Legal completion: 3-6 weeks</div>
                    <div>Full integration: 3 months</div>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = '/corporate'}
                  className="btn-primary w-full text-center"
                >
                  Book Consultation
                </button>
              </div>
            </div>
            
            {/* Executive Service - Detailed Description */}
            <div className="bg-white border border-[#0B1B2B]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow fade-in-up stagger-4">
              <div className="bg-gradient-to-br from-[#0B1B2B] via-[#0B1B2B] to-[#1A2A3A] p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A24A]/20 rounded-full -mr-12 -mt-12"></div>
                <div className="mb-4 relative z-10">
                  <Building2 className="w-12 h-12 text-[#C9A24A] mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-white relative z-10 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Executive Service</h3>
                <p className="text-white/80 text-sm relative z-10">White-Glove Corporate Solutions</p>
                <div className="absolute top-4 right-4 bg-[#C9A24A] text-white text-xs px-2 py-1 rounded-full font-bold">
                  PREMIUM
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#0B1B2B]">£15,000</div>
                    <div className="bg-[#C9A24A]/10 text-[#C9A24A] text-xs px-2 py-1 rounded-full font-semibold">
                      99% SUCCESS RATE
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">For C-suite executives and families</p>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-[#0B1B2B] text-lg">Executive Package:</h4>
                  <ul className="space-y-3 text-sm text-[#0B1B2B]">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Everything in Managed Service plan
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Dedicated concierge team (Sarah Mitchell, former Deloitte partner)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Premium property access (£5M+ portfolio)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Private school placement at top-tier institutions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      Lifestyle management: club memberships, healthcare, transport
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#16A34A] rounded-full mt-2 flex-shrink-0"></div>
                      12-month cultural integration and social introduction program
                    </li>
                  </ul>
                </div>

                <div className="bg-[#0B1B2B]/5 border border-[#0B1B2B]/20 rounded-lg p-4 mb-6">
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-2">Corporate Clients Include:</div>
                  <div className="text-xs text-[#6B7280] space-y-1">
                    <div>• 12 Investment Banks</div>
                    <div>• Big Four Consulting Firms</div>
                    <div>• Fortune 500 Technology Companies</div>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = '/corporate'}
                  className="btn-primary w-full text-center"
                >
                  Request Executive Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Service Guarantees */}
          <div className="mt-16 bg-[#FAFAF9] border border-[#E5E7EB] rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Service Guarantees & Success Metrics
              </h3>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Our commitment to excellence is backed by industry-leading performance metrics and client satisfaction rates
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="text-2xl font-bold text-[#16A34A] mb-2">96-99%</div>
                <div className="text-sm text-[#0B1B2B] font-semibold mb-1">Success Rate</div>
                <div className="text-xs text-[#6B7280]">Guaranteed outcomes</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">1,200+</div>
                <div className="text-sm text-[#0B1B2B] font-semibold mb-1">Relocations</div>
                <div className="text-xs text-[#6B7280]">Successfully completed</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="text-2xl font-bold text-[#0B1B2B] mb-2">4.8/5</div>
                <div className="text-sm text-[#0B1B2B] font-semibold mb-1">Client Rating</div>
                <div className="text-xs text-[#6B7280]">247 verified reviews</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="text-2xl font-bold text-[#C9A24A] mb-2">150+</div>
                <div className="text-sm text-[#0B1B2B] font-semibold mb-1">Vetted Partners</div>
                <div className="text-xs text-[#6B7280]">Across all services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team and Authority Signals */}
      <section className="section-spacing bg-[#0B1B2B] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 border border-[#C9A24A]/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-[#C9A24A]/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#C9A24A]/10 to-[#C9A24A]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Expert Leadership Team
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Industry veterans from top-tier firms bringing decades of London relocation expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Sarah Mitchell Profile */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-[#C9A24A] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">SM</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    Sarah Mitchell
                  </h3>
                  <div className="text-[#C9A24A] font-semibold mb-4">CEO & Founding Partner</div>
                  
                  <div className="space-y-3 text-white/90">
                    <p className="leading-relaxed">
                      Former Partner at Deloitte with 15+ years specializing in executive relocations for FTSE 100 companies. 
                      Led the relocation of 2,000+ C-suite executives to London.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-white/70">
                        <strong className="text-white">Previous Experience:</strong>
                      </div>
                      <ul className="text-sm text-white/80 space-y-1 ml-4">
                        <li>• Deloitte Partner (2015-2024) - Executive Relocation Practice</li>
                        <li>• PwC Senior Manager (2010-2015) - Corporate Services</li>
                        <li>• Specialization: Investment Banking & Consulting relocations</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white/70 mt-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                        MBA, London Business School
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                        CIM Certified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* James Wellington-Smith Profile */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">JW</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    James Wellington-Smith
                  </h3>
                  <div className="text-[#C9A24A] font-semibold mb-4">Head of Property & Operations</div>
                  
                  <div className="space-y-3 text-white/90">
                    <p className="leading-relaxed">
                      Former Partner at Knight Frank with exclusive access to London's most prestigious property portfolio. 
                      20+ years specializing in £5M+ residential transactions.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-white/70">
                        <strong className="text-white">Previous Experience:</strong>
                      </div>
                      <ul className="text-sm text-white/80 space-y-1 ml-4">
                        <li>• Knight Frank Partner (2012-2024) - Prime Central London</li>
                        <li>• Savills Associate Director (2008-2012) - Residential</li>
                        <li>• Specialization: UHNW family relocations & luxury properties</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white/70 mt-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                        MRICS Qualified
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                        Oxford, PPE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authority Signals and Certifications */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Industry Recognition & Compliance
              </h3>
              <p className="text-white/80">
                Certified by leading industry bodies with recognition from major financial institutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Industry Awards */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-white mb-3">Awards & Recognition</h4>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>• London PropTech Awards 2024 - Best Innovation</li>
                  <li>• Financial Times: "Future of Relocation"</li>
                  <li>• Preferred partner for 12 investment banks</li>
                  <li>• Featured in The Economist Intelligence Unit</li>
                </ul>
              </div>

              {/* Certifications */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-white mb-3">Certifications</h4>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>• BAR (British Association of Removers)</li>
                  <li>• FIDI (International Moving Network)</li>
                  <li>• ARP (Association of Relocation Professionals)</li>
                  <li>• GDPR & Data Protection Compliant</li>
                </ul>
              </div>

              {/* Corporate Clients */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-white mb-3">Trusted By</h4>
                <ul className="text-sm text-white/80 space-y-2">
                  <li>• Goldman Sachs, JPMorgan, Morgan Stanley</li>
                  <li>• McKinsey, BCG, Deloitte, PwC</li>
                  <li>• Google, Meta, Microsoft London</li>
                  <li>• 150+ vetted service providers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Client Success Stories */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Managing Director</div>
                  <div className="text-sm text-white/70">Goldman Sachs</div>
                </div>
              </div>
              <blockquote className="text-white/90 italic leading-relaxed mb-4">
                "Relo Network's AI system found our family the perfect Marylebone townhouse in 48 hours. 
                Their team handled everything from school applications to banking setup. Absolutely seamless."
              </blockquote>
              <div className="text-sm text-[#C9A24A] font-semibold">Relocated: Family of 4 • £4.2M property • 3 weeks total</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">Senior Partner</div>
                  <div className="text-sm text-white/70">McKinsey & Company</div>
                </div>
              </div>
              <blockquote className="text-white/90 italic leading-relaxed mb-4">
                "Moving 15 consultants to our London office seemed impossible. Relo Network's corporate solution 
                delivered 100% success rate with personalized service for each family."
              </blockquote>
              <div className="text-sm text-[#C9A24A] font-semibold">Corporate relocation • 15 families • 96% satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Social Proof */}
      <section className="section-spacing bg-[#FAFAF9]">
        <div className="container-custom text-center">
          {/* Social Proof Bar */}
          <div className="mb-12 fade-in-up">
            <div className="bg-white border border-[#0B1B2B]/10 rounded-2xl p-6 max-w-4xl mx-auto shadow-sm">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#0B1B2B] mb-2">150+</div>
                  <div className="text-[#6B7280] text-sm">Vetted Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0B1B2B] mb-2">47</div>
                  <div className="text-[#6B7280] text-sm">Partners This Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0B1B2B] mb-2">96%</div>
                  <div className="text-[#6B7280] text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#0B1B2B]/10 rounded-3xl p-16 max-w-4xl mx-auto fade-in-up shadow-sm">
            <div className="w-20 h-20 mx-auto mb-8 bg-[#C9A24A] rounded-2xl flex items-center justify-center hover:scale-105 transition-transform">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Join Waitlist</h2>
            <p className="text-3xl font-light text-[#6B7280] mb-4">Exclusive Founding Member Access</p>
            <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive founding member programme and secure 50% off launch rates.
            </p>

            {/* Urgency Timer */}
            <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-md p-4 mb-8 max-w-md mx-auto">
              <div className="text-[#0B1B2B] font-semibold mb-3 flex items-center justify-center gap-2">
                <Timer className="w-4 h-4" />
                Founding rates expire in:
              </div>
              <WaitlistCountdown />
              <div className="text-center mt-3">
                <div className="text-sm text-[#0B1B2B] font-medium">Monday, September 22nd 2024</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={scrollToWaitlist}
                className="btn-primary"
              >
                Join Waitlist
              </button>
              <button 
                onClick={() => window.location.href = '/directory'}
                className="bg-white text-[#6B7280] border border-[#0B1B2B]/20 hover:bg-[#FAFAF9] hover:text-[#0B1B2B] hover:border-[#0B1B2B]/30 px-8 py-4 rounded-md font-semibold transition-all"
              >
                View Directory
              </button>
            </div>

            <div className="mt-8 text-sm text-[#6B7280]">
              Trusted by investment banks and consulting firms across London
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-[#0B1B2B] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 border border-[#C9A24A]/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border border-[#C9A24A]/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#C9A24A]/5 to-[#C9A24A]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Relo Network</div>
              <p className="text-white/70 mb-6 font-medium">
                Relocate to London, Effortlessly.
              </p>
              <div className="flex items-center gap-4 text-sm text-[#C9A24A] font-semibold">
                <span>BAR</span> • <span>FIDI</span> • <span>ARP</span> • <span>GDPR</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="/directory" className="hover:text-[#C9A24A] transition font-medium">Premium Directory</a></li>
                <li><a href="/ask" className="hover:text-[#C9A24A] transition font-medium">Ask Relo AI</a></li>
                <li><a href="/concierge" className="hover:text-[#C9A24A] transition font-medium">Concierge Service</a></li>
                <li><a href="/corporate" className="hover:text-[#C9A24A] transition font-medium">Corporate Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Partners</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="/partners" className="hover:text-[#C9A24A] transition font-medium">Join Network</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Partner Benefits</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Success Stories</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#C9A24A] transition font-medium">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center text-white/70">
            <p className="font-medium">&copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal - Luxury Brand */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-[#0B1B2B]/90 flex items-center justify-center p-4 z-50 backdrop-blur-lg">
          <div className="bg-white max-w-lg w-full rounded-md border border-[#0B1B2B]/10 shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-[#C9A24A] fill-current" />
                <span className="text-[#C9A24A] font-medium text-sm">Founding Member Invitation</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0B1220] mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Join the Waitlist
              </h3>
              <p className="text-[#6B7280] font-medium">
                Secure your spot as one of our first 100 Founding Members and get 50% off launch rates.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-[#C9A24A] outline-none bg-white text-[#0B1220] placeholder-[#9CA3AF] font-medium"
              />
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-3 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-[#C9A24A] outline-none bg-white text-[#0B1220] placeholder-[#9CA3AF] font-medium"
              />
              <select className="w-full px-3 py-3 border border-[#E5E7EB] rounded-md focus:ring-2 focus:ring-[#C9A24A] focus:border-[#C9A24A] outline-none bg-white text-[#0B1220] font-medium">
                <option value="">When are you planning to move?</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 font-bold rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Handle form submission
                  setShowWaitlist(false)
                }}
              >
                Join Waitlist
              </Button>
              <Button 
                onClick={() => setShowWaitlist(false)}
                className="border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] py-3 font-semibold rounded-md transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-center text-[#6B7280] mt-6 font-medium">
              By joining, you'll receive exclusive updates about our September 15th launch and founding member benefits.
            </p>
          </div>
        </div>
      )}

    </Layout>
    </HomeSEO>
  )
}