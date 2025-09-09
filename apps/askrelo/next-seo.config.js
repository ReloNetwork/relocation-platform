/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEO = {
  titleTemplate: '%s | Relo Network - Luxury Executive Relocation',
  defaultTitle: 'Relo Network - Luxury Executive Relocation Services',
  description: 'Premium relocation services for discerning executives and their families. Experience seamless transitions with our bespoke concierge approach to international and domestic moves.',
  canonical: 'https://relo-network.vercel.app',
  
  // Open Graph configuration with luxury branding
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://relo-network.vercel.app',
    siteName: 'Relo Network',
    title: 'Relo Network - Luxury Executive Relocation Services',
    description: 'Premium relocation services for discerning executives and their families. Experience seamless transitions with our bespoke concierge approach.',
    images: [
      {
        url: 'https://relo-network.vercel.app/og-image-luxury.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network - Luxury Executive Relocation',
        type: 'image/jpeg',
      },
      {
        url: 'https://relo-network.vercel.app/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Relo Network - Premium Relocation Services',
        type: 'image/jpeg',
      }
    ],
  },
  
  // Twitter Card configuration with premium positioning
  twitter: {
    handle: '@ReloNetwork',
    site: '@ReloNetwork',
    cardType: 'summary_large_image',
  },
  
  // Additional meta tags for luxury branding
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: '#1e3a8a' // Navy blue from luxury color scheme
    },
    {
      name: 'msapplication-TileColor',
      content: '#1e3a8a'
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
      content: 'telephone=no'
    },
    {
      name: 'author',
      content: 'Relo Network'
    },
    {
      name: 'robots',
      content: 'index,follow'
    },
    {
      name: 'googlebot',
      content: 'index,follow'
    },
    {
      property: 'business:contact_data:locality',
      content: 'London'
    },
    {
      property: 'business:contact_data:region',
      content: 'Greater London'
    },
    {
      property: 'business:contact_data:country_name',
      content: 'United Kingdom'
    }
  ],
  
  // Additional link tags
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
    }
  ]
}

export default defaultSEO