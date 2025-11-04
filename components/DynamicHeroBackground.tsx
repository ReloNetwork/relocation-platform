'use client'

import React, { useEffect, useRef } from 'react'

interface DynamicHeroBackgroundProps {
  children: React.ReactNode
  className?: string
}

const DynamicHeroBackground: React.FC<DynamicHeroBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err)
      })
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Video Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
        >
          <source src="/videos/london-skyline-panoramic.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support mp4 */}
          <source src="/videos/london-skyline-panoramic.webm" type="video/webm" />
        </video>
        
        {/* Ultra minimal overlay - just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B2B]/5 via-transparent to-[#0B1B2B]/5" />
        
        {/* Text shadow backdrop for readability without darkening video */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center top, rgba(11, 27, 43, 0.05) 0%, transparent 50%)'
        }} />
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Schema markup for homepage video content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "@id": "https://therelonetwork.com/#hero-video",
            "name": "London Skyline - Executive Relocation Destination",
            "description": "Panoramic view of London's iconic skyline showcasing the premium destination for executive relocations",
            "thumbnailUrl": "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
            "uploadDate": new Date().toISOString(),
            "contentUrl": "https://therelonetwork.com/videos/london-skyline-panoramic.mp4",
            "embedUrl": "https://therelonetwork.com/",
            "publisher": {
              "@type": "Organization",
              "name": "The Relo Network",
              "logo": {
                "@type": "ImageObject",
                "url": "https://therelonetwork.com/logo.png"
              }
            }
          })
        }}
      />
    </div>
  )
}

export default DynamicHeroBackground