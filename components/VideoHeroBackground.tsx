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
        {/* Force video display with inline styles to override any CSS */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000'
          }}
        />
        <video
          className="min-w-full min-h-full w-auto h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'cover',
            zIndex: 1
          }}
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src={`/videos/london-skyline-panoramic.mp4?v=${Date.now()}`} type="video/mp4" />
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