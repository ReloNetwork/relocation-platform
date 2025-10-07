import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Executive\'s London Newsletter | Relo Network - Fortune 500 Relocation Intelligence',
  description: 'Weekly insights, exclusive partner spotlights, and insider intelligence for Fortune 500 executives relocating to London. Featuring The Chancery Rosewood, Fragomen Immigration, Coutts International, and London\'s premier service providers.',
  keywords: [
    'executive relocation newsletter London',
    'Fortune 500 London relocation',
    'luxury London accommodation newsletter',
    'corporate immigration insights',
    'London property market executive',
    'The Chancery Rosewood newsletter',
    'Fragomen immigration updates',
    'Coutts private banking',
    'American School London updates',
    'London executive lifestyle',
    'Mayfair relocation guide',
    'C-suite London relocation',
    'international school London',
    'London luxury transport',
    'corporate relocation trends'
  ].join(', '),
  openGraph: {
    title: 'The Executive\'s London Newsletter | Relo Network',
    description: 'Weekly insights and exclusive partner spotlights for Fortune 500 executives relocating to London.',
    type: 'website',
    url: 'https://therelonetwork.com/newsletter',
    siteName: 'Relo Network',
    images: [
      {
        url: '/images/newsletter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Executive\'s London Newsletter - Relo Network'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Executive\'s London Newsletter | Relo Network',
    description: 'Weekly insights and exclusive partner spotlights for Fortune 500 executives relocating to London.',
    images: ['/images/newsletter-twitter.jpg']
  },
  alternates: {
    canonical: 'https://therelonetwork.com/newsletter'
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