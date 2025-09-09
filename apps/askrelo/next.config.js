/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Basic configuration only
  experimental: {
    // optimizeCss: true,  // Disable this as it requires critters
    scrollRestoration: true,
  },
  
  // Enhanced image optimization for luxury branding
  images: {
    domains: [
      'images.unsplash.com',
      'askrelo.com',
      'relo-network.com',
      'relocation-platform.vercel.app'
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year for luxury brand assets
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  
  // Redirects for SEO consolidation
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/concierge',
        permanent: true
      },
      {
        source: '/ask-relo-pricing',
        destination: '/concierge',
        permanent: true
      },
      {
        source: '/ask',
        destination: '/concierge',
        permanent: true
      }
    ]
  },
  
  // Basic optimizations
  poweredByHeader: false,
  compress: true,
  
  // Environment variables for luxury brand optimization
  env: {
    CUSTOM_KEY: 'luxury-relocation-network',
    ANALYZE_BUNDLE: process.env.ANALYZE || 'false',
    LUXURY_BRAND_MODE: 'true',
    SEO_ENHANCEMENT: 'enabled',
    ANALYTICS_MODE: 'luxury'
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = withBundleAnalyzer(nextConfig)