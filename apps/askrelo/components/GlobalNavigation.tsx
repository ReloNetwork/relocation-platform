'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/ui/components/button'

export default function GlobalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/ask-relo-pricing', label: 'AI Pricing' },
    { href: '/partners', label: 'Partners' },
    { href: '/corporate', label: 'Corporate' },
    { href: '/directory', label: 'Directory' }
  ]

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        .brand-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
          font-size: 1.35rem;
          background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .glass-nav {
          backdrop-filter: blur(20px);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-nav.scrolled {
          backdrop-filter: blur(24px);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .nav-link {
          position: relative;
          color: rgba(96, 165, 250, 0.9);
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(96, 165, 250, 0.2);
        }
        
        .nav-link:hover {
          color: rgb(96, 165, 250);
          background: rgba(96, 165, 250, 0.1);
          backdrop-filter: blur(8px);
        }
        
        .nav-link.active {
          color: rgb(59, 130, 246);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
        }
        
        .nav-logo {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }
        
        .nav-logo:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.5);
        }
        
        .btn-nav {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .btn-nav::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .btn-nav:hover::before {
          opacity: 1;
        }
        
        .btn-nav:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
        }
        
        .mobile-menu {
          backdrop-filter: blur(24px);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
      
      <nav className={`glass-nav fixed top-0 left-0 right-0 z-50 py-4 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  {/* Network nodes and connections */}
                  <circle cx="12" cy="12" r="3" fill="url(#logoGradient)" />
                  <circle cx="28" cy="12" r="3" fill="url(#logoGradient)" />
                  <circle cx="20" cy="28" r="3" fill="url(#logoGradient)" />
                  {/* Connecting lines with arrow suggestion */}
                  <path d="M15 12 L25 12" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M26 14 L22 26" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14 14 L18 26" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
                  {/* Subtle directional indicators */}
                  <polygon points="24,11 27,12 24,13" fill="url(#logoGradient)" />
                  <polygon points="21,25 20,28 19,25" fill="url(#logoGradient)" />
                </svg>
              </div>
              <span className="brand-logo hidden sm:block">Relo Network</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="btn-nav relative z-10">
                <span className="relative z-10">Sign In</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden text-blue-300 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu md:hidden absolute top-full left-0 right-0 p-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link block ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20"></div>
    </>
  )
}

