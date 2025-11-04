'use client'

import React from 'react'

interface VideoHeroBackgroundProps {
  children: React.ReactNode
  className?: string
}

const VideoHeroBackground: React.FC<VideoHeroBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Simple Video Background - No conditions, always show */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="min-w-full min-h-full w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
        >
          <source src="/videos/london-skyline-panoramic.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}

export default VideoHeroBackground