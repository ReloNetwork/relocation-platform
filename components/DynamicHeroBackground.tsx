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
        
        {/* Light gradient overlays for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B2B]/40 via-[#0B1B2B]/30 to-[#0B1B2B]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B2B]/30 via-transparent to-[#0B1B2B]/20" />
        
        {/* Mobile optimization: Add subtle overlay on mobile for text visibility */}
        <div className="absolute inset-0 bg-[#0B1B2B]/10 md:bg-transparent" />
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