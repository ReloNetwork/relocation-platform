import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner with Us | Relo Network - Join London\'s Elite Relocation Network',
  description: 'Join Relo Network\'s exclusive partner program. Access high-value clients, guaranteed quality leads, and white-label solutions. Charter partnership rates available until October 2024.',
  keywords: 'Relo Network partners, luxury relocation partners London, charter partnership, B2B relocation services, partner program London, relocation network join, business partnership opportunities, luxury service providers',
  authors: [{ name: 'Relo Network', url: 'https://therelonetwork.com' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://therelonetwork.com'),
  alternates: {
    canonical: '/partners',
    languages: {
      'en-GB': '/partners',
      'x-default': '/partners'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://therelonetwork.com/partners',
    siteName: 'Relo Network',
    title: 'Partner with Relo Network | London\'s Premier Relocation Network',
    description: 'Join our exclusive network of vetted relocation specialists. Access high-net-worth clients, guaranteed leads, and premium partnership benefits. Charter rates ending soon.',
    images: [
      {
        url: '/images/og-partnership-program.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network Partnership Program - Join Elite London Relocation Network'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'Partner with Relo Network | Elite Relocation Partnership',
    description: 'Join London\'s most exclusive relocation network. Charter partnership rates available - secure high-value client leads now.'
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

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}