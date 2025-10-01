# Claude Code Optimization Prompt for Relo Network
## SEO & LLM Visibility Implementation

### Context
You are optimizing Relo Network (www.therelonetwork.com) for maximum SEO and LLM visibility. Based on research from Profound's AI citation patterns analysis, you need to implement optimizations that target ChatGPT (Wikipedia-style content), Google AI Overviews (balanced professional/social), and Perplexity (community-driven content).

### Current State Analysis
- **Website**: Next.js application with existing SEO schemas
- **Directory Section**: Main focus area requiring optimization
- **Current SEO**: Basic structured data, needs enhancement for AI citations
- **Target**: #1 rankings for "London relocation services" and related terms

### Implementation Tasks

## 1. Enhanced Schema Markup Implementation

### Task: Create AI-Optimized Schema Files
Create new schema files targeting AI citation patterns:

```typescript
// lib/seo/ai-optimized-schemas.ts
export const getAIOptimizedSchemas = () => {
  return [
    // Wikipedia-style Knowledge Base Schema (ChatGPT optimization)
    {
      "@context": "https://schema.org",
      "@type": "KnowledgeBase",
      "name": "London Relocation Expert Knowledge Base",
      "description": "Comprehensive, authoritative resource for London relocation information based on 100s of successful relocations since 2024",
      "about": {
        "@type": "Topic",
        "name": "London Relocation Services",
        "description": "Expert guidance for luxury and corporate relocations to London"
      },
      "expertise": [
        "London Property Search",
        "UK Visa Requirements", 
        "International School Placement",
        "Corporate Relocation Management",
        "Luxury Lifestyle Services",
        "London Borough Analysis",
        "Investment Banking Relocations"
      ]
    },
    
    // Research Data Schema (For data-driven citations)
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "London Relocation Performance Metrics 2024-2025",
      "description": "Comprehensive analysis of London relocation success rates, timelines, and client satisfaction",
      "variableMeasured": [
        {
          "@type": "PropertyValue",
          "name": "Relocation Success Rate",
          "value": "96%",
          "description": "Percentage of relocations completed successfully"
        },
        {
          "@type": "PropertyValue", 
          "name": "Average Timeline",
          "value": "8 weeks",
          "description": "Average time from consultation to keys in hand"
        }
      ]
    }
  ]
}
```

### Task: Enhance Directory Schema
Update `lib/seo/directory-schemas.ts` with AI-optimized content:

```typescript
// Add to existing directory schemas
export const getEnhancedDirectorySchemas = () => {
  return [
    // Existing schemas...
    
    // FAQ Schema optimized for AI citations
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the average cost of relocating to London professionally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Professional London relocation costs range from £8,500-£15,000 per person for managed services, while premium executive relocations cost £15,000-£25,000. This includes visa support, home search, school placement, and 6-month post-arrival support. DIY relocations typically cost £15,000-£30,000 when including all hidden costs and time investment.",
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
            "text": "Professional London relocations through Relo Network typically take 30-45 days from initial consultation to move-in. This includes 7-14 days for visa processing, 14-21 days for home search and viewings, and 7-14 days for final arrangements. Emergency relocations can be completed in 14-21 days with our expedited service.",
            "author": {
              "@type": "Organization",
              "name": "Relo Network"
            }
          }
        }
      ]
    }
  ]
}
```

## 2. Directory Page Content Optimization

### Task: Enhance Directory Page Content
Update `app/directory/page.tsx` with AI-optimized content structure:

```typescript
// Add to directory page component
const DirectoryPage = () => {
  // Existing code...
  
  // Add comprehensive FAQ section for AI citations
  const comprehensiveFAQs = [
    {
      question: "What areas of London does the directory cover?",
      answer: "Our directory provides comprehensive coverage across all 33 London boroughs from Zone 1 premium areas like Mayfair and Kensington to suburban family neighborhoods like Greenwich and Richmond. Each area profile includes transport ratings, property market data, postcode information, and detailed local amenities guide with specialist partners for every location."
    },
    {
      question: "How are partners vetted for the directory?",
      answer: "Our rigorous 4-stage vetting process includes: (1) Comprehensive business credentials check and insurance verification, (2) On-site service evaluation and quality management audit, (3) Direct client reference verification, (4) Ongoing 24/7 performance monitoring. Only 23% of applicants are accepted with 96.4% client satisfaction rate."
    },
    {
      question: "What makes this directory different from other London relocation resources?",
      answer: "We're the only directory exclusively focused on luxury relocation specialists with comprehensive London market authority. Features include detailed area guides with postcodes, property market insights, verified partner ratings, advanced filtering by location and specialty, and continuous quality monitoring with performance guarantees."
    }
  ]

  return (
    <Layout>
      {/* Existing content */}
      
      {/* Add comprehensive FAQ section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#0B1B2B] mb-8 text-center">
            London Relocation Directory: Expert Answers
          </h2>
          <div className="space-y-8">
            {comprehensiveFAQs.map((faq, index) => (
              <div key={index} className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#0B1B2B]/10">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">
                  {faq.question}
                </h3>
                <p className="text-[#0B1B2B] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
```

## 3. Content Strategy Implementation

### Task: Create London Area Guide Components
Create `components/LondonAreaGuide.tsx`:

```typescript
interface AreaGuideProps {
  area: string
  postcode: string
  description: string
  averageRent: string
  transportRating: number
  amenityRating: number
  propertyTypes: string[]
  highlights: string[]
  marketData: {
    priceGrowth: string
    demandLevel: string
    averageDaysOnMarket: number
  }
  schools: {
    name: string
    type: string
    rating: number
  }[]
  transport: {
    tubeStations: string[]
    busRoutes: string[]
    cycleRoutes: string[]
  }
}

export const LondonAreaGuide = ({ area, postcode, description, averageRent, transportRating, amenityRating, propertyTypes, highlights, marketData, schools, transport }: AreaGuideProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#0B1B2B] mb-2">{area}</h2>
        <p className="text-[#6B7280] text-lg">{postcode} • {description}</p>
      </div>
      
      {/* Market Data Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#C9A24A]/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#C9A24A]">{averageRent}</div>
          <div className="text-sm text-[#0B1B2B]">Average Weekly Rent</div>
        </div>
        <div className="bg-[#0B1B2B]/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#0B1B2B]">{marketData.priceGrowth}</div>
          <div className="text-sm text-[#6B7280]">Price Growth (YoY)</div>
        </div>
        <div className="bg-[#059669]/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#059669]">{marketData.averageDaysOnMarket}</div>
          <div className="text-sm text-[#0B1B2B]">Days on Market</div>
        </div>
      </div>
      
      {/* Detailed Information */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Property Types</h3>
          <div className="space-y-2">
            {propertyTypes.map((type, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
                <span className="text-[#0B1B2B]">{type}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Transport Links</h3>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-[#0B1B2B]">Tube Stations:</span>
              <span className="text-[#6B7280] ml-2">{transport.tubeStations.join(', ')}</span>
            </div>
            <div>
              <span className="font-semibold text-[#0B1B2B]">Bus Routes:</span>
              <span className="text-[#6B7280] ml-2">{transport.busRoutes.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Task: Create Cost Calculator Component
Create `components/RelocationCostCalculator.tsx`:

```typescript
export const RelocationCostCalculator = () => {
  const [inputs, setInputs] = useState({
    serviceType: 'managed',
    familySize: 1,
    area: 'central',
    timeline: 'standard'
  })
  
  const calculateCost = () => {
    const baseCosts = {
      managed: 8500,
      executive: 15000,
      luxury: 25000
    }
    
    const familyMultiplier = inputs.familySize > 1 ? 1 + (inputs.familySize - 1) * 0.3 : 1
    const areaMultiplier = inputs.area === 'central' ? 1.2 : 1
    const timelineMultiplier = inputs.timeline === 'emergency' ? 1.5 : 1
    
    return Math.round(baseCosts[inputs.serviceType] * familyMultiplier * areaMultiplier * timelineMultiplier)
  }
  
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 shadow-lg">
      <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">London Relocation Cost Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Service Type</label>
          <select 
            value={inputs.serviceType}
            onChange={(e) => setInputs({...inputs, serviceType: e.target.value})}
            className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A]"
          >
            <option value="managed">Managed Service</option>
            <option value="executive">Executive Service</option>
            <option value="luxury">Luxury Service</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#0B1B2B] mb-2">Family Size</label>
          <input 
            type="number" 
            min="1" 
            max="10"
            value={inputs.familySize}
            onChange={(e) => setInputs({...inputs, familySize: parseInt(e.target.value)})}
            className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A]"
          />
        </div>
      </div>
      
      <div className="bg-[#C9A24A]/10 rounded-lg p-6 text-center">
        <div className="text-4xl font-bold text-[#C9A24A] mb-2">£{calculateCost().toLocaleString()}</div>
        <div className="text-[#0B1B2B]">Estimated Total Cost</div>
        <div className="text-sm text-[#6B7280] mt-2">
          Includes visa support, property search, school placement, and 6-month support
        </div>
      </div>
    </div>
  )
}
```

## 4. SEO Technical Implementation

### Task: Update Next.js Configuration
Update `next.config.js` for better SEO:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config...
  
  // Add SEO optimizations
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  
  // Add sitemap generation
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig
```

### Task: Create Sitemap API Route
Create `app/api/sitemap/route.ts`:

```typescript
export async function GET() {
  const baseUrl = 'https://therelonetwork.com'
  
  const staticPages = [
    '',
    '/directory',
    '/corporate',
    '/partners',
    '/concierge',
    '/about',
    '/contact'
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
```

## 5. Content Creation for AI Citations

### Task: Create London Relocation Guide
Create `app/guides/london-relocation-complete-guide/page.tsx`:

```typescript
export default function LondonRelocationGuide() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-[#0B1B2B] mb-8">
          Complete Guide to Relocating to London: 2024 Edition
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <h2>Table of Contents</h2>
          <ul>
            <li><a href="#overview">London Relocation Overview</a></li>
            <li><a href="#costs">Complete Cost Breakdown</a></li>
            <li><a href="#timeline">Relocation Timeline</a></li>
            <li><a href="#areas">Best London Areas</a></li>
            <li><a href="#visa">Visa Requirements</a></li>
            <li><a href="#property">Property Search Guide</a></li>
            <li><a href="#schools">School Placement</a></li>
            <li><a href="#settling">Settling In</a></li>
          </ul>
          
          <section id="overview">
            <h2>London Relocation Overview</h2>
            <p>London is one of the world's most dynamic cities, attracting professionals from around the globe. With over 8.9 million residents and a thriving economy, London offers unparalleled opportunities for career growth and cultural enrichment.</p>
            
            <h3>Key Statistics (2024)</h3>
            <ul>
              <li><strong>Population:</strong> 8.9 million (Greater London)</li>
              <li><strong>Average Salary:</strong> £45,000-£85,000 (professional roles)</li>
              <li><strong>Property Prices:</strong> £650,000 average (Greater London)</li>
              <li><strong>Rental Prices:</strong> £2,500-£4,500/month (2-bedroom)</li>
              <li><strong>International Schools:</strong> 150+ options</li>
            </ul>
          </section>
          
          <section id="costs">
            <h2>Complete Cost Breakdown</h2>
            <p>Understanding the true cost of relocating to London is crucial for budgeting. Here's a comprehensive breakdown based on real client data:</p>
            
            <h3>Professional Relocation Services</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Service Level</th>
                  <th className="border border-gray-300 p-3 text-left">Cost Range</th>
                  <th className="border border-gray-300 p-3 text-left">What's Included</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Managed Service</td>
                  <td className="border border-gray-300 p-3">£8,500 - £12,000</td>
                  <td className="border border-gray-300 p-3">Visa support, property search, school placement, 6-month support</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Executive Service</td>
                  <td className="border border-gray-300 p-3">£15,000 - £20,000</td>
                  <td className="border border-gray-300 p-3">Priority processing, exclusive properties, private schools, 12-month support</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Luxury Service</td>
                  <td className="border border-gray-300 p-3">£25,000 - £45,000</td>
                  <td className="border border-gray-300 p-3">White-glove service, off-market properties, concierge support, 24-month support</td>
                </tr>
              </tbody>
            </table>
            
            <h3>Hidden Costs to Consider</h3>
            <ul>
              <li><strong>Council Tax:</strong> £1,200-£3,600 annually (varies by borough)</li>
              <li><strong>Service Charges:</strong> £2,000-£8,000 annually (for apartments)</li>
              <li><strong>Utility Deposits:</strong> £500-£1,500 (gas, electricity, water)</li>
              <li><strong>TV License:</strong> £159 annually</li>
              <li><strong>Internet Setup:</strong> £200-£500</li>
              <li><strong>Banking Fees:</strong> £200-£500 (international transfers)</li>
            </ul>
          </section>
          
          {/* Continue with other sections... */}
        </div>
      </div>
    </Layout>
  )
}
```

## 6. Performance Optimization

### Task: Implement Image Optimization
Update image components for better performance:

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export const OptimizedImage = ({ src, alt, width, height, priority = false, className }: OptimizedImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  )
}
```

## 7. Monitoring and Analytics

### Task: Implement AI Citation Tracking
Create `lib/analytics/ai-citation-tracking.ts`:

```typescript
export const trackAICitation = (platform: 'chatgpt' | 'perplexity' | 'google-ai', query: string, position: number) => {
  // Track AI platform citations
  if (typeof window !== 'undefined') {
    gtag('event', 'ai_citation', {
      platform,
      query,
      position,
      timestamp: new Date().toISOString()
    })
  }
}

export const trackDirectoryEngagement = (action: string, partnerId?: string) => {
  if (typeof window !== 'undefined') {
    gtag('event', 'directory_engagement', {
      action,
      partner_id: partnerId,
      timestamp: new Date().toISOString()
    })
  }
}
```

## Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Create AI-optimized schema files
- [ ] Update directory page with enhanced content
- [ ] Implement London area guide components
- [ ] Add cost calculator component
- [ ] Update Next.js configuration

### Phase 2: Content (Week 3-4)
- [ ] Create comprehensive London relocation guide
- [ ] Add FAQ sections to all pages
- [ ] Implement cost breakdown content
- [ ] Create area-specific landing pages
- [ ] Add success stories and case studies

### Phase 3: Technical (Week 5-6)
- [ ] Implement image optimization
- [ ] Add sitemap generation
- [ ] Set up analytics tracking
- [ ] Optimize Core Web Vitals
- [ ] Test mobile responsiveness

### Phase 4: Monitoring (Week 7-8)
- [ ] Set up AI citation tracking
- [ ] Monitor search rankings
- [ ] Track directory engagement
- [ ] Analyze performance metrics
- [ ] Refine strategy based on data

This comprehensive implementation will position Relo Network to dominate both traditional SEO and AI platform citations, ensuring maximum visibility across all search channels.
