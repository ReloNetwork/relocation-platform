'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getAllEnhancedSchemas } from '../lib/seo/enhanced-schemas'

export default function HomePage() {
  const schemas = getAllEnhancedSchemas()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-15T14:00:00Z')
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden">
      {/* Enhanced Structured Data for AI Citations */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}

      {/* Countdown Banner */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="animate-pulse">
            <div className="text-[#C9A24A] font-semibold text-sm uppercase tracking-wide mb-2">
              🚀 Launch Day Approaching
            </div>
            <div className="text-white text-lg mb-3">
              <strong>September 15, 2025 • 2:00 PM GMT</strong> - Limited to 100 Founding Members
            </div>
            <div className="flex justify-center items-center gap-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wide">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wide">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wide">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.seconds}</div>
                <div className="text-xs uppercase tracking-wide">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocate to <span className="text-[#C9A24A]">London</span><br />
            <span className="text-4xl font-light text-[#6B7280]">Effortlessly.</span>
          </h1>
          <p className="text-2xl text-[#0B1B2B] mb-4">
            London&apos;s most exclusive relocation network.
          </p>
          <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
            AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
          </p>
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#C9A24A]/30 rounded-full px-6 py-3 mb-4">
              <div className="w-3 h-3 bg-[#C9A24A] rounded-full animate-pulse"></div>
              <span className="text-[#0B1B2B] font-semibold text-sm">
                Accepting Founding Members • {100 - Math.floor(Math.random() * 25)} spots remaining
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0B1B2B] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Secure Founding Membership
            </button>
            <button className="border-2 border-[#0B1B2B]/20 text-[#0B1B2B] px-8 py-4 rounded-md font-semibold text-lg hover:border-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relo Network
          </h3>
          <p className="text-white/70 mb-6">
            Relocate to London, Effortlessly.
          </p>
          <p className="text-white/70">
            &copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
          </p>
        </div>
      </footer>
    </Layout>
  )
}