'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function GlobalNavigationFixed() {
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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Directory', href: '/directory' },
    { name: 'Partners', href: '/partners' },
    { name: 'Ask Relo', href: '/ask' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#E5E7EB]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-[#C9A24A] rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  R
                </span>
              </div>
              <span className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Relo Network
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-[#C9A24A] border-b-2 border-[#C9A24A]'
                      : 'text-[#6B7280] hover:text-[#C9A24A]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <button className="text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Dashboard
                  </button>
                </Link>
                <Link href="/case">
                  <button className="text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    My Case
                  </button>
                </Link>
                <Link href="/admin">
                  <button className="text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Admin
                  </button>
                </Link>
                <Link href="/login">
                  <button className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6B7280] hover:text-[#0B1B2B] inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C9A24A]"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg border-t border-[#E5E7EB]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[#C9A24A] bg-[#C9A24A]/5'
                    : 'text-[#6B7280] hover:text-[#C9A24A] hover:bg-[#C9A24A]/5'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-[#E5E7EB] pt-4 pb-3">
              <div className="flex items-center px-3 space-y-2 flex-col">
                <Link href="/dashboard" className="w-full">
                  <button className="w-full text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors border border-[#E5E7EB]">
                    Dashboard
                  </button>
                </Link>
                <Link href="/case" className="w-full">
                  <button className="w-full text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors border border-[#E5E7EB]">
                    My Case
                  </button>
                </Link>
                <Link href="/admin" className="w-full">
                  <button className="w-full text-[#6B7280] hover:text-[#0B1B2B] px-3 py-2 rounded-md text-sm font-medium transition-colors border border-[#E5E7EB]">
                    Admin
                  </button>
                </Link>
                <Link href="/login" className="w-full">
                  <button className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}