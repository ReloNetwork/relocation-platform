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
      // Force load and play on mobile
      videoRef.current.load()
      const playPromise = videoRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Video autoplay failed, retrying:', err)
          // Try to play again after user interaction
          setTimeout(() => {
            videoRef.current?.play().catch(() => {
              console.log('Video requires user interaction to play')
            })
          }, 1000)
        })
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Video Background Layer - Works on all devices */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        {/* Hide any background images and ensure video is visible */}
        <div className="absolute inset-0 bg-black" />
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          controls={false}
          preload="auto"
          poster="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <source src="/videos/london-skyline-panoramic.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support mp4 */}
          <source src="/videos/london-skyline-panoramic.webm" type="video/webm" />
        </video>
        
        {/* NO OVERLAY - Video at full brightness */}
        {/* Text will use shadows for readability */}
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