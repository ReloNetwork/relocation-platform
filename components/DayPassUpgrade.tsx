'use client'

import React, { useState, useEffect } from 'react'
import { Crown, ArrowUp, CheckCircle, X } from 'lucide-react'
import { checkoutFunctions } from '../lib/checkout'

interface DayPassUpgradeProps {
  trigger: 'post_purchase' | 'time_based' // Immediately after purchase or at T+60h
  className?: string
  nudgeText?: string
}

export default function DayPassUpgrade({
  trigger,
  className = '',
  nudgeText = "Convert your pass into full service — we'll quarterback the whole move.",
}: DayPassUpgradeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if this upgrade nudge has been dismissed
    const dismissed = sessionStorage.getItem(`day-pass-upgrade-dismissed-${trigger}`)
    if (dismissed) return

    if (trigger === 'post_purchase') {
      // Show immediately after Day Pass purchase
      const dayPassPurchased = sessionStorage.getItem('day_pass_purchased')
      if (dayPassPurchased && !hasTriggered) {
        setTimeout(() => setIsVisible(true), 2000) // 2 second delay
        setHasTriggered(true)
      }
    } else if (trigger === 'time_based') {
      // Show at T+60h (simulate with 60 seconds for demo)
      const purchaseTime = sessionStorage.getItem('day_pass_purchase_time')
      if (purchaseTime) {
        const elapsed = Date.now() - parseInt(purchaseTime)
        const sixtyHours = 60 * 60 * 1000 * 60 // 60 hours in milliseconds
        
        if (elapsed >= sixtyHours && !hasTriggered) {
          setTimeout(() => setIsVisible(true), 1000)
          setHasTriggered(true)
        }
      }
    }
  }, [trigger, hasTriggered])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem(`day-pass-upgrade-dismissed-${trigger}`, 'true')
  }

  const handleUpgradeToExecutive = () => {
    // Set flag for £59 credit to be applied
    sessionStorage.setItem('day_pass_credit_available', '59')
    checkoutFunctions.executiveIntake()
    handleDismiss()
  }

  if (!isVisible) return null

  return (
    <div className={`fixed top-20 right-6 max-w-sm bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white rounded-2xl shadow-2xl p-6 z-50 animate-in slide-in-from-top duration-300 ${className}`}>
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowUp className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm mb-2">Don't lose momentum</h3>
          <p className="text-white/90 text-sm leading-relaxed">
            {nudgeText}
          </p>
        </div>
      </div>

      {/* Credit highlight */}
      <div className="bg-[#C9A24A]/20 rounded-lg p-3 mb-4 text-center border border-[#C9A24A]/30">
        <div className="text-sm font-semibold text-[#C9A24A] mb-1">
          Auto-apply £59 credit
        </div>
        <div className="text-xs text-white/80">
          Your Day Pass value applied to Executive service
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-4">
        {[
          '60-min strategy call',
          'Bespoke area shortlist', 
          '3 warm introductions',
          '30-day execution plan'
        ].map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-[#C9A24A] flex-shrink-0" />
            <span className="text-white/90">{benefit}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpgradeToExecutive}
        className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 px-4 rounded-lg font-semibold text-sm hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
      >
        <Crown className="w-4 h-4" />
        Upgrade to Executive (£59 credit)
      </button>
    </div>
  )
}
