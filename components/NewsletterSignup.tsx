'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline' | 'navbar'
  source?: string
  className?: string
  title?: string
  description?: string
  buttonText?: string
}

export default function NewsletterSignup({ 
  variant = 'default',
  source = 'website',
  className = '',
  title,
  description,
  buttonText = 'Subscribe'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          utmSource: 'website',
          utmMedium: source,
          utmCampaign: `${source}-signup`
        }),
      })

      const data = await response.json()

      if (data.success) {
        setEmail('')
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setError(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent text-sm"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            {isLoading ? '...' : buttonText}
          </button>
        </form>
        {isSuccess && (
          <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            Subscribed successfully!
          </div>
        )}
        {error && (
          <div className="mt-2 text-red-600 text-sm">{error}</div>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            {title || 'Stay Updated'}
          </h3>
          <p className="text-white/80 text-sm mb-4">
            {description || 'Weekly insights and partner spotlights delivered to your inbox.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white text-[#0B1B2B] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#C9A24A] text-sm"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : buttonText}
            </button>
          </form>
          {isSuccess && (
            <div className="mt-3 flex items-center justify-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Subscribed successfully!
            </div>
          )}
          {error && (
            <div className="mt-3 text-red-400 text-sm">{error}</div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'navbar') {
    return (
      <div className={`bg-[#1A2332] w-full py-12 px-6 ${className}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title || 'More London Insights'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {description || 'Get weekly area guides, market updates, and partner spotlights delivered to your inbox.'}
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-[#0B1B2B] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#C9A24A] text-base shadow-sm"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors text-base disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : (buttonText || 'Subscribe Free')}
            </button>
          </form>
          
          <div className="mt-4 text-white/60 text-sm text-center">
            <p>Join 2,500+ professionals • Unsubscribe anytime • Weekly delivery</p>
          </div>
          
          {isSuccess && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Successfully subscribed!</span>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-red-400 text-center">{error}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl border border-[#E5E7EB] p-8 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-[#C9A24A]" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">
          {title || 'The London Relocation Report'}
        </h3>
        <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
          {description || 'Weekly insights, exclusive guides, and insider knowledge for discerning professionals relocating to London.'}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 justify-center disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {isSuccess && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Successfully subscribed!</span>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
          )}
          
          <p className="text-[#6B7280] text-sm mt-3">
            Join 2,500+ professionals • Unsubscribe anytime • Weekly delivery
          </p>
        </form>
      </div>
    </div>
  )
}