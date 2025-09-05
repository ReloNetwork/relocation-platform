'use client'

import GlobalNavigation from './GlobalNavigation'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen ${className}`}>
      <GlobalNavigation />
      <main>
        {children}
      </main>
    </div>
  )
}