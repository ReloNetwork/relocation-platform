import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The London Brief',
  description: 'Trusted neighbourhood guides, practical moving advice and places worth knowing for people making London home.',
  keywords: [
    'executive relocation newsletter London',
    'London relocation newsletter',
    'London neighbourhood guides',
    'moving to London advice',
    'London property insights',
    'Mayfair relocation guide',
    'international school London',
    'corporate relocation trends'
  ].join(', '),
  openGraph: {
    title: 'The London Brief | The Relo Network',
    description: 'Trusted neighbourhood guides, practical moving advice and places worth knowing for people making London home.',
    type: 'website',
    url: 'https://www.therelonetwork.com/newsletter',
    siteName: 'The Relo Network',
    images: [
      {
        url: '/images/editorial/london-street-hero.webp',
        width: 1200,
        height: 630,
        alt: 'The London Brief by The Relo Network'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The London Brief | The Relo Network',
    description: 'Trusted neighbourhood guides, practical moving advice and places worth knowing for people making London home.',
    images: ['/images/editorial/london-street-hero.webp']
  },
  alternates: {
    canonical: 'https://www.therelonetwork.com/newsletter'
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
  }
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
