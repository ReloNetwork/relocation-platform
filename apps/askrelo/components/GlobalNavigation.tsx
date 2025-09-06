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
        .glass-nav {
          backdrop-filter: blur(20px);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-nav.scrolled {
          backdrop-filter: blur(24px);
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
        
        .nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }
        
        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
        }
        
        .nav-link.active {
          color: white;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
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
              <div className="w-10 h-10 nav-logo rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white text-xl font-bold hidden sm:block">Relo Network</span>
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
              <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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

