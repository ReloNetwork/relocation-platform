import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import StickyAsk from './components/StickyAsk';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { DEFAULT_SEO } from '../lib/seo/config';

// Force dynamic rendering for all pages to prevent export issues
export const dynamic = 'force-dynamic';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
  preload: true
});

export const metadata = {
  title: 'Relo Network - Relocate to London. Effortlessly.',
  description: 'London\'s most exclusive relocation network. Vetted experts, elite services, and a 24/7 AI concierge - one accountable partner from landing to "I live here."',
  keywords: 'London relocation, luxury relocation services, corporate relocation, international moving London, expatriate services, premium relocation',
  authors: [{ name: 'Relo Network', url: 'https://relocation-platform.vercel.app' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://relocation-platform.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
      'x-default': '/'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://relocation-platform.vercel.app',
    siteName: 'Relo Network',
    title: 'Relo Network - London\'s Most Exclusive Relocation Network',
    description: 'Vetted experts, elite services, and a 24/7 AI concierge. Join our exclusive founding member programme.',
    images: [
      {
        url: '/images/og-luxury-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network - Luxury London Relocation Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork'
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
  verification: {
    // google: 'your-google-verification-code', // Add when available
    // yandex: 'your-yandex-verification-code', // Add when available  
    // bing: 'your-bing-verification-code' // Add when available
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//vercel-insights.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Luxury brand favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme colors for luxury branding */}
        <meta name="theme-color" content="#0B1B2B" />
        <meta name="msapplication-TileColor" content="#0B1B2B" />
      </head>
      <body className="font-sans antialiased">
        <DefaultSeo {...DEFAULT_SEO} />
        {children}
        <StickyAsk />
        <Analytics />
      </body>
    </html>
  );
}