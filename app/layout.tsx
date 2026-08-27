import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SITE_URL } from '@/lib/site-url';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Relo Network | London, intelligently answered',
    template: '%s | The Relo Network',
  },
  description:
    'Independent London relocation guidance, neighbourhood intelligence and trusted introductions for international professionals and families.',
  openGraph: {
    title: 'The Relo Network',
    description: 'London, intelligently answered.',
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
      '@id': `${SITE_URL}/#organisation`,
      name: 'The Relo Network',
      url: SITE_URL,
      areaServed: 'London',
      email: 'hello@therelonetwork.com',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'The Relo Network',
      publisher: { '@id': `${SITE_URL}/#organisation` },
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
