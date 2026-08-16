import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL('https://www.therelonetwork.com'),
  title: {
    default: 'The Relo Network | London, intelligently answered',
    template: '%s | The Relo Network',
  },
  description:
    'Independent London relocation guidance, neighbourhood intelligence and trusted introductions for international professionals and families.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Relo Network',
    description: 'London, intelligently answered.',
    url: '/',
    siteName: 'The Relo Network',
    type: 'website',
    images: ['/images/editorial/london-street-hero.webp'],
  },
  robots: { index: true, follow: true },
};
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.therelonetwork.com/#organisation',
      name: 'The Relo Network',
      url: 'https://www.therelonetwork.com',
      areaServed: 'London',
      email: 'hello@therelonetwork.com',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.therelonetwork.com/#website',
      url: 'https://www.therelonetwork.com',
      name: 'The Relo Network',
      publisher: { '@id': 'https://www.therelonetwork.com/#organisation' },
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
