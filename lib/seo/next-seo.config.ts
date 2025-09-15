import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | Relo Network - London\'s Premier Relocation Partner',
  defaultTitle: 'Relo Network - London\'s Most Exclusive Relocation Network',
  description: 'London\'s premier luxury relocation network. Executive relocations, corporate services, and AI-powered property search. Trusted by Fortune 500 companies and discerning professionals.',
  canonical: 'https://askrelo.com',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://askrelo.com',
    siteName: 'Relo Network',
    title: 'Relo Network - London\'s Most Exclusive Relocation Network',
    description: 'London\'s premier luxury relocation network. Executive relocations, corporate services, and AI-powered property search. Trusted by Fortune 500 companies and discerning professionals.',
    images: [
      {
        url: 'https://askrelo.com/og-image-luxury.png',
        width: 1200,
        height: 630,
        alt: 'Relo Network - London\'s Premier Relocation Partner',
        type: 'image/png',
      },
      {
        url: 'https://askrelo.com/og-image-square.png',
        width: 1080,
        height: 1080,
        alt: 'Relo Network - Luxury London Relocations',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    handle: '@ReloNetwork',
    site: '@ReloNetwork',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'London relocation, luxury relocation, executive relocation, corporate relocation, premium property search, AI concierge, Fortune 500 relocation, C-suite relocation, international relocation, London property, executive housing'
    },
    {
      name: 'author',
      content: 'Relo Network'
    },
    {
      name: 'robots',
      content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
    },
    {
      name: 'googlebot',
      content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
    },
    {
      name: 'theme-color',
      content: '#C9A24A'
    },
    {
      name: 'msapplication-TileColor',
      content: '#0B1B2B'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    },
    {
      name: 'format-detection',
      content: 'telephone=yes'
    },
    {
      name: 'geo.region',
      content: 'GB-LND'
    },
    {
      name: 'geo.placename',
      content: 'London'
    },
    {
      name: 'geo.position',
      content: '51.5074;-0.1278'
    },
    {
      name: 'ICBM',
      content: '51.5074, -0.1278'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-32x32.png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png',
      sizes: '16x16'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://www.google-analytics.com'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://vercel.live'
    }
  ]
}

export default config