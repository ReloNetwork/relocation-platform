import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Directory | Relo Network - Vetted London Relocation Specialists',
  description: 'Access London\'s most exclusive network of vetted relocation specialists. Property experts, visa lawyers, tax advisors, luxury movers, premium schools, and concierge services for executive relocations.',
  keywords: 'London relocation directory, luxury property specialists, visa lawyers London, tax advisors UK, premium moving companies, international schools London, executive relocation services, high-net-worth relocation, corporate relocation partners, luxury concierge London',
  authors: [{ name: 'Relo Network', url: 'https://therelonetwork.com' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://therelonetwork.com'),
  alternates: {
    canonical: '/directory',
    languages: {
      'en-GB': '/directory',
      'x-default': '/directory'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://therelonetwork.com/directory',
    siteName: 'Relo Network',
    title: 'Partner Directory | London\'s Elite Relocation Specialists Network',
    description: 'Browse our exclusive directory of vetted London relocation specialists. From luxury property search to visa processing, tax planning to premium moving services - all pre-screened for excellence.',
    images: [
      {
        url: '/images/og-directory-partners.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network Partner Directory - Elite London Relocation Specialists'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'Partner Directory | Elite London Relocation Specialists',
    description: 'Access London\'s most exclusive network of vetted relocation specialists for luxury moves and corporate relocations.'
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

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}