/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Basic configuration only
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Image optimization configuration
  images: {
    domains: [
      'images.unsplash.com',
      'relocation-platform.vercel.app'
    ],
    formats: ['image/webp', 'image/avif'],
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
  
  // Environment variables for build-time optimizations
  env: {
    CUSTOM_KEY: 'luxury-relocation-network',
    ANALYZE_BUNDLE: process.env.ANALYZE || 'false'
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