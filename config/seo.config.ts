import { DefaultSeoProps } from 'next-seo';
import { Organization, WebSite, BreadcrumbList } from 'schema-dts';

// Luxury brand colors - navy/gold theme
export const BRAND_COLORS = {
  primary: '#0B1B2B',    // Deep navy
  gold: '#D4AF37',       // Classic gold
  white: '#FFFFFF',
  charcoal: '#2C2C2C'
};

export const SITE_CONFIG = {
  name: 'Relo Network',
  description: "London's most exclusive relocation network. Vetted experts, elite services, and a 24/7 AI concierge - one accountable partner from landing to \"I live here.\"",
  url: 'https://relocation-platform.vercel.app',
  logo: 'https://relocation-platform.vercel.app/images/logo-luxury.svg',
  author: 'Relo Network',
  twitter: '@ReloNetwork',
  linkedin: 'https://www.linkedin.com/company/relo-network',
  phone: '+44-20-7946-0958',
  email: 'hello@relocnetwork.com',
  address: {
    street: 'One Canada Square',
    locality: 'Canary Wharf', 
    region: 'London',
    postcode: 'E14 5AB',
    country: 'GB'
  }
};

// Default SEO configuration with luxury positioning
export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Relo Network - Luxury London Relocation',
  defaultTitle: 'Relo Network - Relocate to London. Effortlessly.',
  description: SITE_CONFIG.description,
  canonical: SITE_CONFIG.url,
  
  // Open Graph configuration with luxury branding
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Relo Network - London\'s Most Exclusive Relocation Network',
    description: 'Vetted experts, elite services, and a 24/7 AI concierge. Join our exclusive founding member programme.',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-luxury-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Relo Network - Luxury London Relocation Services',
        type: 'image/jpeg',
      },
      {
        url: `${SITE_CONFIG.url}/images/og-luxury-services.jpg`,
        width: 1200,
        height: 630, 
        alt: 'Premium Relocation Services - Concierge, Property, Visa',
        type: 'image/jpeg',
      },
      {
        url: `${SITE_CONFIG.url}/images/og-luxury-testimonials.jpg`,
        width: 1200,
        height: 630,
        alt: 'Client Success Stories - Fortune 500 & High-Net-Worth Relocations',
        type: 'image/jpeg',
      }
    ],
  },
  
  // Twitter Cards with premium positioning
  twitter: {
    handle: SITE_CONFIG.twitter,
    site: SITE_CONFIG.twitter,
    cardType: 'summary_large_image',
  },
  
  // Additional meta tags for luxury positioning
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'London relocation, luxury relocation services, corporate relocation, international moving London, expatriate services, premium relocation, executive relocation, high-net-worth relocation, Fortune 500 relocation, white-glove relocation services',
    },
    {
      name: 'author',
      content: SITE_CONFIG.author,
    },
    {
      name: 'creator',
      content: SITE_CONFIG.author,
    },
    {
      name: 'publisher',
      content: SITE_CONFIG.author,
    },
    {
      name: 'robots',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    },
    {
      name: 'bingbot',
      content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    },
    {
      name: 'theme-color',
      content: BRAND_COLORS.primary,
    },
    {
      name: 'msapplication-TileColor',
      content: BRAND_COLORS.primary,
    },
    {
      name: 'application-name',
      content: SITE_CONFIG.name,
    },
    {
      name: 'apple-mobile-web-app-title',
      content: SITE_CONFIG.name,
    },
    {
      name: 'format-detection',
      content: 'telephone=yes',
    },
    // Geo-targeting for London
    {
      name: 'geo.region',
      content: 'GB-LND',
    },
    {
      name: 'geo.placename',
      content: 'London',
    },
    {
      name: 'geo.position',
      content: '51.5074;-0.1278',
    },
    {
      name: 'ICBM',
      content: '51.5074, -0.1278',
    },
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
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon', 
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'dns-prefetch',
      href: '//fonts.googleapis.com',
    },
    {
      rel: 'dns-prefetch', 
      href: '//images.unsplash.com',
    },
    {
      rel: 'dns-prefetch',
      href: '//vercel-insights.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

// Organization Schema with luxury positioning
export const organizationSchema: Organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.name,
  legalName: 'Relo Network Limited',
  description: "London's most exclusive relocation network serving high-net-worth individuals and Fortune 500 corporations with guaranteed quality and performance.",
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logo,
  image: `${SITE_CONFIG.url}/images/og-luxury-hero.jpg`,
  foundingDate: '2024-01-01',
  slogan: 'Relocate to London. Effortlessly.',
  knowsAbout: [
    'Luxury Relocation Services',
    'Executive Relocation Management',
    'High-Net-Worth Individual Services',
    'Corporate Relocation Solutions', 
    'Premium Property Search & Advisory',
    'VIP Concierge Services',
    'International Tax Planning',
    'Visa & Immigration Services',
    'School Placement Services',
    'Cultural Integration Programs'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    contactType: 'customer support',
    areaServed: 'GB',
    availableLanguage: ['English'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    }
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.locality,
    addressRegion: SITE_CONFIG.address.region,
    postalCode: SITE_CONFIG.address.postcode,
    addressCountry: SITE_CONFIG.address.country
  },
  areaServed: {
    '@type': 'City',
    name: 'London',
    sameAs: 'https://en.wikipedia.org/wiki/London'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1
  },
  sameAs: [
    SITE_CONFIG.linkedin,
    `https://twitter.com/${SITE_CONFIG.twitter.replace('@', '')}`,
    `${SITE_CONFIG.url}/directory`,
    `${SITE_CONFIG.url}/corporate`,
    `${SITE_CONFIG.url}/partners`
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Luxury Relocation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'AI Concierge Service',
        price: '295',
        priceCurrency: 'GBP',
        description: '24/7 AI-powered relocation assistant with property recommendations and visa advice',
        category: 'Digital Service'
      },
      {
        '@type': 'Offer',
        name: 'Managed Service',
        price: '8500',
        priceCurrency: 'GBP', 
        description: 'Full-service relocation management with dedicated account manager',
        category: 'Premium Service'
      },
      {
        '@type': 'Offer',
        name: 'Executive Service',
        price: '15000',
        priceCurrency: 'GBP',
        description: 'White-glove corporate solutions with priority visa processing',
        category: 'Luxury Service'
      }
    ]
  }
};

// Website Schema with sitelinks search box
export const websiteSchema: WebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}#website`,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'en-GB',
  copyrightYear: 2024,
  copyrightHolder: {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`
  }
};

// Generate breadcrumb schema for navigation
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>): BreadcrumbList => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_CONFIG.url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`
    }))
  };
};

// Page-specific SEO configurations
export const pagesSEO = {
  home: {
    title: 'Relo Network - Relocate to London. Effortlessly.',
    description: "London's most exclusive relocation network. Vetted experts, elite services, and a 24/7 AI concierge - one accountable partner from landing to \"I live here.\"",
    canonical: SITE_CONFIG.url,
  },
  directory: {
    title: 'London Relocation Directory - Premium Property & Services Access',
    description: 'Access London\'s most exclusive relocation directory. Verified premium properties, elite service providers, and insider market intelligence for discerning relocators.',
    canonical: `${SITE_CONFIG.url}/directory`,
  },
  corporate: {
    title: 'Corporate Relocation Services - Fortune 500 Employee Solutions',
    description: 'White-glove corporate relocation services for Fortune 500 companies. Executive relocations, bulk employee moves, and guaranteed delivery for enterprise clients.',
    canonical: `${SITE_CONFIG.url}/corporate`, 
  },
  partners: {
    title: 'Luxury Relocation Partners - Vetted Service Provider Network',
    description: 'Join London\'s most exclusive relocation partner network. Premium service providers, guaranteed quality standards, and access to high-net-worth client referrals.',
    canonical: `${SITE_CONFIG.url}/partners`,
  },
  concierge: {
    title: 'AI Relocation Concierge - 24/7 London Moving Assistant',
    description: '24/7 AI-powered London relocation assistant. Instant property recommendations, visa guidance, and personalized moving support from £295/month.',
    canonical: `${SITE_CONFIG.url}/concierge`,
  }
};