'use client'

import React, { useState, useEffect } from 'react'
import { Crown, X } from 'lucide-react'
import { checkoutFunctions } from '../lib/checkout'

interface ExecutiveIntakeNudgeProps {
  trigger: 'partner_views' | 'day_pass_upgrade' | 'plus_pro_upgrade'
  nudgeText: string
  ctaText?: string
  showCredit?: boolean
  creditAmount?: number
}

export default function ExecutiveIntakeNudge({ 
  trigger, 
  nudgeText, 
  ctaText = "Start Executive Intake - £1,500",
  showCredit = false,
  creditAmount = 0
}: ExecutiveIntakeNudgeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if this nudge has already been dismissed for this session
    const dismissed = sessionStorage.getItem(`nudge-dismissed-${trigger}`)
    if (dismissed) return

    // Different trigger logic based on type
    if (trigger === 'partner_views') {
      // Track partner profile views
      const viewCount = parseInt(sessionStorage.getItem('partner_views') || '0')
      const newCount = viewCount + 1
      sessionStorage.setItem('partner_views', newCount.toString())
      
      // Show after 2-3 partner views
      if (newCount >= 2 && !hasTriggered) {
        setTimeout(() => setIsVisible(true), 3000) // 3 second delay
        setHasTriggered(true)
      }
    } else if (trigger === 'day_pass_upgrade') {
      // Show immediately for day pass upgrade
      setTimeout(() => setIsVisible(true), 1000)
      setHasTriggered(true)
    } else if (trigger === 'plus_pro_upgrade') {
      // Track curated intro usage
      const introCount = parseInt(sessionStorage.getItem('curated_intros_used') || '0')
      if (introCount >= 2 && !hasTriggered) {
        setTimeout(() => setIsVisible(true), 2000)
        setHasTriggered(true)
      }
    }
  }, [trigger, hasTriggered])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem(`nudge-dismissed-${trigger}`, 'true')
  }

  const handleExecutiveIntake = () => {
    checkoutFunctions.executiveIntake()
    handleDismiss()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 max-w-sm bg-white border border-[#C9A24A]/30 rounded-2xl shadow-2xl p-6 z-50 animate-in slide-in-from-bottom duration-300">
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-[#6B7280] hover:text-[#0B1B2B] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[#C9A24A]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-[#C9A24A]" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#0B1B2B] text-sm mb-2">Too many options?</h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">{nudgeText}</p>
        </div>
      </div>

      {showCredit && creditAmount > 0 && (
        <div className="bg-[#C9A24A]/10 rounded-lg p-3 mb-4 text-center">
          <div className="text-sm font-semibold text-[#C9A24A]">
            Auto-apply £{creditAmount} credit
          </div>
        </div>
      )}

      <button
        onClick={handleExecutiveIntake}
        className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 px-4 rounded-lg font-semibold text-sm hover:scale-105 transition-all shadow-lg"
      >
        {ctaText}
      </button>
    </div>
  )
}