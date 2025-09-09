import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import StickyAsk from './components/StickyAsk';
import { Analytics } from '@vercel/analytics/react';

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
  metadataBase: new URL('https://askrelo.com'),
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
    url: 'https://askrelo.com',
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
        
        {/* Luxury Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization", 
              "@id": "https://askrelo.com#organization",
              "name": "Relo Network",
              "legalName": "Relo Network Limited",
              "description": "London's most exclusive relocation network serving high-net-worth individuals and Fortune 500 corporations with guaranteed quality and performance.",
              "url": "https://askrelo.com",
              "logo": "https://askrelo.com/images/logo-luxury.svg",
              "foundingDate": "2024-01-01",
              "knowsAbout": [
                "Luxury Relocation Services",
                "Executive Relocation Management", 
                "High-Net-Worth Individual Services",
                "Corporate Relocation Solutions",
                "Premium Property Search & Advisory",
                "VIP Concierge Services"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-20-7946-0958",
                "contactType": "customer support",
                "areaServed": "GB",
                "availableLanguage": ["English"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "City of London",
                "addressLocality": "London",
                "addressRegion": "London",
                "postalCode": "EC1V 2NX",
                "addressCountry": "GB"
              },
              "areaServed": {
                "@type": "City",
                "name": "London",
                "sameAs": "https://en.wikipedia.org/wiki/London"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.9,
                "reviewCount": 247,
                "bestRating": 5,
                "worstRating": 1
              },
              "sameAs": [
                "https://www.linkedin.com/company/relo-network",
                "https://twitter.com/ReloNetwork"
              ]
            })
          }}
        />
        
        {/* FAQ Schema for AI Citations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://askrelo.com#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the average cost of relocating to London?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Professional London relocation costs vary by service level. Relo Network's managed service costs £8,500, executive service costs £15,000, while DIY relocations typically cost £25,000+ when including all hidden expenses and time investment.",
                    "author": {
                      "@type": "Organization",
                      "name": "Relo Network"
                    }
                  }
                },
                {
                  "@type": "Question", 
                  "name": "How long does a professional London relocation take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Professional London relocations through Relo Network typically take 30-45 days from initial consultation to move-in, compared to 60-120 days for DIY relocations. Emergency relocations can be completed in 14-21 days.",
                    "author": {
                      "@type": "Organization",
                      "name": "Relo Network"
                    }
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the best London areas for luxury relocations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Based on 100s of successful relocations, top areas include Marylebone (£4,500-£8,000/mo), Kensington (£5,000-£12,000/mo), Canary Wharf (£3,000-£6,000/mo), and Greenwich (£2,500-£4,500/mo).",
                    "author": {
                      "@type": "Organization",
                      "name": "Relo Network"
                    }
                  }
                }
              ]
            })
          }}
        />
        
        {/* Service Schema for AI Citations */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://askrelo.com#service",
              "name": "London Luxury Relocation Services",
              "description": "Comprehensive relocation services for high-net-worth individuals and corporations moving to London",
              "provider": {
                "@type": "Organization",
                "@id": "https://askrelo.com#organization"
              },
              "areaServed": {
                "@type": "City",
                "name": "London",
                "sameAs": "https://en.wikipedia.org/wiki/London"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Relocation Service Tiers",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "name": "AI Concierge Service",
                    "price": "295",
                    "priceCurrency": "GBP",
                    "description": "24/7 AI-powered relocation assistant with property recommendations and visa advice"
                  },
                  {
                    "@type": "Offer", 
                    "name": "Managed Service",
                    "price": "8500",
                    "priceCurrency": "GBP",
                    "description": "Full-service relocation management with dedicated account manager"
                  },
                  {
                    "@type": "Offer",
                    "name": "Executive Service", 
                    "price": "15000",
                    "priceCurrency": "GBP",
                    "description": "White-glove corporate solutions with priority visa processing"
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.8,
                "reviewCount": 247,
                "bestRating": 5,
                "worstRating": 1
              }
            })
          }}
        />
        
        {/* Expert Author Schemas for Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://askrelo.com/team/sarah-mitchell",
              "name": "Sarah Mitchell",
              "jobTitle": "Head of Client Services",
              "worksFor": {
                "@type": "Organization",
                "@id": "https://askrelo.com#organization"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "London School of Economics",
                "sameAs": "https://en.wikipedia.org/wiki/London_School_of_Economics"
              },
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "Certified Relocation Professional (CRP)",
                  "credentialCategory": "Professional Certification"
                },
                {
                  "@type": "EducationalOccupationalCredential", 
                  "name": "MBA",
                  "educationalLevel": "Master's Degree",
                  "recognizedBy": {
                    "@type": "Organization",
                    "name": "London School of Economics"
                  }
                }
              ],
              "knowsAbout": [
                "Executive Relocation",
                "Cross-border Tax Planning", 
                "Cultural Integration",
                "Fortune 500 Corporate Services"
              ]
            })
          }}
        />
        
        {/* Review Schema for Client Testimonials */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://askrelo.com#reviews",
              "name": "London Luxury Relocation Services",
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Alexandra Thompson",
                    "worksFor": {
                      "@type": "Organization",
                      "name": "Goldman Sachs"
                    }
                  },
                  "datePublished": "2024-08-15",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": 5,
                    "bestRating": 5
                  },
                  "description": "Relo Network transformed our family's move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours.",
                  "itemReviewed": {
                    "@type": "Service",
                    "name": "Managed Service Package"
                  }
                },
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person", 
                    "name": "Marcus Weber",
                    "worksFor": {
                      "@type": "Organization",
                      "name": "McKinsey & Company"
                    }
                  },
                  "datePublished": "2024-07-22",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": 5,
                    "bestRating": 5
                  },
                  "description": "As a senior partner relocating from Singapore, I needed white-glove service. Relo Network's executive package exceeded all expectations.",
                  "itemReviewed": {
                    "@type": "Service",
                    "name": "Executive Service Package"
                  }
                }
              ]
            })
          }}
        />
        
        {/* Awards & Recognition Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://askrelo.com#awards",
              "name": "Relo Network",
              "award": [
                {
                  "@type": "Award",
                  "name": "Best Innovation in Relocation - PropTech Awards 2024",
                  "awarder": {
                    "@type": "Organization",
                    "name": "PropTech Awards"
                  },
                  "dateAwarded": "2024-06-15"
                }
              ],
              "member": [
                {
                  "@type": "Organization",
                  "name": "British Association for Removers (BAR)",
                  "sameAs": "https://www.bar.co.uk"
                },
                {
                  "@type": "Organization", 
                  "name": "FIDI Global Alliance",
                  "sameAs": "https://www.fidi.org"
                },
                {
                  "@type": "Organization",
                  "name": "Association of Relocation Professionals",
                  "sameAs": "https://www.arp-relocation.com"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <StickyAsk />
        <Analytics />
      </body>
    </html>
  );
}