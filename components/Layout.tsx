'use client'

import GlobalNavigationFixed from './GlobalNavigationFixed'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  showFooter?: boolean
}

export default function Layout({ children, className = '', showFooter = true }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      <GlobalNavigationFixed />
      <main className="pt-16">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && (
        <footer className="bg-[#0B1B2B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-[#C9A24A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Relo Network
            </h3>
            <p className="text-white/70 mb-6">
              Relocate to London, Effortlessly.
            </p>
            <p className="text-white/70">
              © 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}