// Professional Partners Data Structure
// These partners get homepage hero background placement and editorial spotlight

export interface PartnerArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  publishedDate: string
  readTime: string
  featured: boolean
}

export interface ProfessionalPartner {
  id: string
  name: string
  category: string
  description: string
  heroImage?: string
  logo?: string
  website?: string
  specialization: string
  placement: 'homepage' | 'directory'
  articles: PartnerArticle[]
  metadata: {
    founded?: string
    location?: string
    employees?: string
    awards?: string[]
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

// Current Professional Partners with homepage hero placement
export const professionalPartners: ProfessionalPartner[] = [
  {
    id: 'knight-frank',
    name: 'Knight Frank',
    category: 'Property Advisory',
    description: 'Global property consultancy specializing in prime London residential and executive relocations',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    logo: '/partners/knight-frank-logo.png',
    website: 'https://knightfrank.com',
    specialization: 'Prime Property & Relocation Services',
    placement: 'homepage',
    articles: [
      {
        id: 'knight-frank-property-insights',
        title: 'Knight Frank: Navigating London\'s Prime Property Market for Executive Relocations',
        slug: 'knight-frank-prime-property-guide',
        excerpt: 'Expert insights on securing prime London residences for C-suite executives. From Mayfair to Belgravia, discover the perfect neighborhoods for your relocation.',
        category: 'property-insights',
        publishedDate: '2025-01-08',
        readTime: '6 min read',
        featured: true
      },
      {
        id: 'london-property-market-2025',
        title: 'London Property Market 2025: Executive Housing Trends and Opportunities',
        slug: 'london-executive-housing-trends',
        excerpt: 'Knight Frank\'s analysis of London\'s prime residential market, rental yields, and investment opportunities for international executives.',
        category: 'market-analysis',
        publishedDate: '2025-01-06',
        readTime: '8 min read',
        featured: true
      }
    ],
    metadata: {
      founded: '1896',
      location: 'Mayfair, London W1',
      employees: '20,000+',
      awards: ['International Property Awards 2024', 'Best Global Property Consultancy']
    },
    seo: {
      title: 'Knight Frank - Property Advisory Partner | Relo Network',
      description: 'Professional Partner spotlight: Knight Frank provides expert property consultancy and prime residential services for executive relocations to London.',
      keywords: ['property consultancy London', 'executive property search', 'prime residential', 'relocation services', 'luxury property advisory']
    }
  },
  {
    id: 'fragomen-london',
    name: 'Fragomen London',
    category: 'Immigration Law',
    description: 'Global immigration law firm specializing in corporate relocations and executive visa processing',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    logo: '/partners/fragomen-logo.png',
    website: 'https://fragomen.com',
    specialization: 'Corporate Immigration & Executive Visas',
    placement: 'homepage',
    articles: [
      {
        id: 'fragomen-immigration-excellence',
        title: 'Corporate Immigration Excellence: How Leading London Firms Transform Executive Visa Processing',
        slug: 'fragomen-corporate-immigration-excellence',
        excerpt: 'Discover how global immigration expertise delivers sophisticated visa solutions and seamless corporate relocations for Fortune 500 executives.',
        category: 'immigration-insights',
        publishedDate: '2025-01-05',
        readTime: '5 min read',
        featured: true
      },
      {
        id: 'executive-visa-guide-2025',
        title: 'Executive Visa Guide 2025: Navigate UK Immigration with Confidence',
        slug: 'executive-visa-guide-2025',
        excerpt: 'Comprehensive guide to UK executive visas, processing timelines, and corporate immigration strategies for Fortune 500 relocations.',
        category: 'immigration-insights',
        publishedDate: '2025-01-04',
        readTime: '7 min read',
        featured: false
      }
    ],
    metadata: {
      founded: '1951',
      location: 'City of London',
      employees: '500+',
      awards: ['Chambers Global Immigration Law Firm 2024', 'Legal 500 Tier 1 Immigration']
    },
    seo: {
      title: 'Fragomen London - Immigration Law Partner | Relo Network',
      description: 'Professional Partner spotlight: Fragomen London provides expert corporate immigration and executive visa services for Fortune 500 relocations.',
      keywords: ['immigration law London', 'corporate visa services', 'executive immigration', 'UK work permits', 'business immigration']
    }
  },
  {
    id: 'coutts-international',
    name: 'Coutts International',
    category: 'Private Banking',
    description: 'Royal warrant private bank providing wealth management for high-net-worth individuals',
    // heroImage: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80', // Temporarily removed
    logo: '/partners/coutts-logo.png',
    website: 'https://coutts.com',
    specialization: 'Private Banking & Wealth Management',
    placement: 'homepage',
    articles: [
      {
        id: 'coutts-wealth-management',
        title: 'Coutts International: Royal Banking Excellence for Executive Relocations',
        slug: 'coutts-private-banking-executives',
        excerpt: 'How royal warrant private banking supports Fortune 500 executives with comprehensive wealth management during London relocations.',
        category: 'banking-insights',
        publishedDate: '2025-01-07',
        readTime: '5 min read',
        featured: true
      }
    ],
    metadata: {
      founded: '1692',
      location: 'Strand, London WC2',
      employees: '3000+',
      awards: ['Royal Warrant Holder', 'Private Banker International Awards 2024']
    },
    seo: {
      title: 'Coutts International - Private Banking Partner | Relo Network',
      description: 'Professional Partner spotlight: Coutts International provides royal warrant private banking and wealth management for executive relocations.',
      keywords: ['private banking London', 'wealth management', 'executive banking', 'high net worth banking', 'royal warrant banking']
    }
  }
]

// Get all articles from professional partners for newsletter integration
export const getProfessionalPartnerArticles = (): PartnerArticle[] => {
  return professionalPartners.flatMap(partner => 
    partner.articles.map(article => ({
      ...article,
      partnerName: partner.name,
      partnerCategory: partner.category,
      partnerLogo: partner.logo
    }))
  ).sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
}

// Get current featured partner for hero
export const getCurrentFeaturedPartner = (): ProfessionalPartner => {
  const homepagePartners = professionalPartners.filter(p => p.placement === 'homepage')
  return homepagePartners[0] || professionalPartners[0]
}

// Get rotating hero partners
export const getHeroPartners = (): ProfessionalPartner[] => {
  return professionalPartners.filter(p => p.placement === 'homepage')
}

// Get partner by ID
export const getPartnerById = (id: string): ProfessionalPartner | undefined => {
  return professionalPartners.find(p => p.id === id)
}

// Get partner articles by category
export const getPartnerArticlesByCategory = (category: string): PartnerArticle[] => {
  return getProfessionalPartnerArticles().filter(article => article.category === category)
}

// Get featured partner articles for homepage banner
export const getFeaturedPartnerArticles = (limit: number = 3): PartnerArticle[] => {
  return getProfessionalPartnerArticles()
    .filter(article => article.featured)
    .slice(0, limit)
}