import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner with The Relo Network',
  description: 'Request the editorial, newsletter or professional network partner brief from The Relo Network.',
  alternates: {
    canonical: 'https://www.therelonetwork.com/partner-application',
  },
  openGraph: {
    title: 'Partner with The Relo Network',
    description: 'Useful expertise and carefully disclosed brand collaborations for international Londoners.',
    url: 'https://www.therelonetwork.com/partner-application',
    type: 'website',
  },
}

export default function PartnerApplicationLayout({ children }: { children: React.ReactNode }) {
  return children
}
