'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  launchDate?: string
  title?: string
  subtitle?: string
  className?: string
}

export default function CountdownTimer({ 
  launchDate = '2025-10-01T14:00:00Z',
  title = 'Founding Partner Pricing Ends Soon!',
  subtitle = 'Prices go up on Tuesday, 1st October at 14:00 GMT',
  className = ''
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date(launchDate).getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [launchDate])

  const isExpired = timeRemaining.days === 0 && timeRemaining.hours === 0 && 
                   timeRemaining.minutes === 0 && timeRemaining.seconds === 0

  if (isExpired) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Founding Partner Period Has Ended</h3>
          <p className="text-gray-600">Standard pricing is now in effect</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-red-50 border border-red-200 rounded-xl p-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">⏰ {title}</h3>
        <p className="text-red-700 mb-4">{subtitle}</p>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800">{timeRemaining.days}</div>
            <div className="text-sm text-red-600">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800">{timeRemaining.hours}</div>
            <div className="text-sm text-red-600">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800">{timeRemaining.minutes}</div>
            <div className="text-sm text-red-600">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-800">{timeRemaining.seconds}</div>
            <div className="text-sm text-red-600">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}