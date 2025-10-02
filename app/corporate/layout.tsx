import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Relocation Services | Relo Network - Executive Emergency Moves',
  description: 'Emergency corporate relocation services for Fortune 500 companies. 14-day executive moves, white-glove service, and guaranteed delivery. Available 24/7 for urgent business relocations.',
  keywords: 'corporate relocation London, emergency business relocation, executive relocation services, Fortune 500 relocation, urgent business moves, corporate relocation emergency, executive emergency moves, business relocation 24/7',
  authors: [{ name: 'Relo Network', url: 'https://therelonetwork.com' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://therelonetwork.com'),
  alternates: {
    canonical: '/corporate',
    languages: {
      'en-GB': '/corporate',
      'x-default': '/corporate'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://therelonetwork.com/corporate',
    siteName: 'Relo Network',
    title: 'Corporate Emergency Relocation | 14-Day Executive Moves',
    description: 'Emergency corporate relocation services for business-critical moves. 24/7 availability, Fortune 500 trusted, white-glove executive service with guaranteed delivery.',
    images: [
      {
        url: '/images/og-corporate-emergency.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network Corporate Emergency Relocation Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'Corporate Emergency Relocation | 14-Day Executive Moves',
    description: 'Emergency corporate relocation services available 24/7. Fortune 500 trusted for business-critical executive moves.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}