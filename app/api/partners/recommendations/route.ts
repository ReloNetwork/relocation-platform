import { NextResponse } from 'next/server'

// Demo partner data with service categories
const partners = [
  // Immigration Partners
  {
    id: '1',
    name: 'Global Visa Solutions',
    category: 'immigration',
    services: ['visa applications', 'work permits', 'residency permits', 'citizenship applications'],
    description: 'Expert immigration lawyers specializing in UK visa processes',
    contact: {
      phone: '+44 20 7123 4567',
      email: 'info@globalvisasolutions.co.uk',
      website: 'https://globalvisasolutions.co.uk'
    },
    rating: 4.8,
    location: 'London, UK',
    specialties: ['Tier 2 Work Visas', 'Family Visas', 'Investor Visas']
  },
  {
    id: '2',
    name: 'Immigration Expert Partners',
    category: 'immigration',
    services: ['document preparation', 'legal consultation', 'application review'],
    description: 'Comprehensive immigration support with 15+ years experience',
    contact: {
      phone: '+44 20 7234 5678',
      email: 'help@immigrationexperts.uk',
      website: 'https://immigrationexperts.uk'
    },
    rating: 4.9,
    location: 'Manchester, UK',
    specialties: ['Complex Cases', 'Appeals', 'Business Immigration']
  },

  // Housing Partners
  {
    id: '3',
    name: 'Prime Property Finders',
    category: 'housing',
    services: ['property search', 'rental assistance', 'lease negotiation', 'property management'],
    description: 'Premier property search service for relocating professionals',
    contact: {
      phone: '+44 20 7345 6789',
      email: 'rentals@primepropertyfinders.com',
      website: 'https://primepropertyfinders.com'
    },
    rating: 4.7,
    location: 'London, UK',
    specialties: ['Executive Rentals', 'Family Homes', 'Short-term Lets']
  },
  {
    id: '4',
    name: 'Relocation Housing Services',
    category: 'housing',
    services: ['property viewings', 'tenant screening', 'utilities setup', 'home insurance'],
    description: 'End-to-end housing solutions for international relocations',
    contact: {
      phone: '+44 20 7456 7890',
      email: 'housing@relocservices.co.uk',
      website: 'https://relochousing.co.uk'
    },
    rating: 4.6,
    location: 'Birmingham, UK',
    specialties: ['Furnished Rentals', 'Pet-Friendly Properties', 'School Catchments']
  },

  // Banking Partners
  {
    id: '5',
    name: 'International Banking Solutions',
    category: 'banking',
    services: ['account opening', 'credit assessment', 'mortgage advice', 'investment planning'],
    description: 'Specialized banking services for international professionals',
    contact: {
      phone: '+44 20 7567 8901',
      email: 'international@bankingsolutions.co.uk',
      website: 'https://intlbanking.co.uk'
    },
    rating: 4.5,
    location: 'London, UK',
    specialties: ['Expat Banking', 'Business Accounts', 'International Transfers']
  },
  {
    id: '6',
    name: 'Expat Financial Services',
    category: 'banking',
    services: ['financial planning', 'tax advice', 'pension transfers', 'insurance'],
    description: 'Comprehensive financial services for expatriates',
    contact: {
      phone: '+44 20 7678 9012',
      email: 'advice@expatfinancial.com',
      website: 'https://expatfinancial.com'
    },
    rating: 4.8,
    location: 'Edinburgh, UK',
    specialties: ['Tax Planning', 'Retirement Planning', 'Wealth Management']
  },

  // Education Partners
  {
    id: '7',
    name: 'Education Placement Services',
    category: 'education',
    services: ['school search', 'application assistance', 'admissions support', 'tutoring'],
    description: 'Expert guidance for school placements and educational support',
    contact: {
      phone: '+44 20 7789 0123',
      email: 'admissions@educationplacement.co.uk',
      website: 'https://educationplacement.co.uk'
    },
    rating: 4.9,
    location: 'London, UK',
    specialties: ['Independent Schools', 'International Schools', 'State School Admissions']
  },
  {
    id: '8',
    name: 'International School Consultants',
    category: 'education',
    services: ['curriculum advice', 'school visits', 'entrance exam prep', 'educational planning'],
    description: 'Specialized consultancy for international school placements',
    contact: {
      phone: '+44 20 7890 1234',
      email: 'consultants@intlschools.org.uk',
      website: 'https://intlschoolconsultants.co.uk'
    },
    rating: 4.7,
    location: 'Oxford, UK',
    specialties: ['IB Programs', 'American Curriculum', 'British Curriculum']
  },

  // Healthcare Partners
  {
    id: '9',
    name: 'Private Healthcare Network',
    category: 'healthcare',
    services: ['GP registration', 'health insurance', 'specialist referrals', 'medical records transfer'],
    description: 'Comprehensive healthcare support for new residents',
    contact: {
      phone: '+44 20 7901 2345',
      email: 'registration@privatehealthcare.co.uk',
      website: 'https://privatehealthnetwork.co.uk'
    },
    rating: 4.6,
    location: 'London, UK',
    specialties: ['Executive Health', 'Family Medicine', 'Dental Care']
  },
  {
    id: '10',
    name: 'Expat Medical Services',
    category: 'healthcare',
    services: ['NHS registration', 'private consultations', 'health screenings', 'vaccination services'],
    description: 'Medical services tailored for international relocations',
    contact: {
      phone: '+44 20 8012 3456',
      email: 'services@expatmedical.co.uk',
      website: 'https://expatmedical.co.uk'
    },
    rating: 4.8,
    location: 'Bristol, UK',
    specialties: ['Occupational Health', 'Travel Medicine', 'Mental Health']
  },

  // Employment Partners
  {
    id: '11',
    name: 'Executive Career Services',
    category: 'employment',
    services: ['contract review', 'salary negotiation', 'benefits consultation', 'career coaching'],
    description: 'Professional services for executive employment matters',
    contact: {
      phone: '+44 20 8123 4567',
      email: 'careers@executiveservices.co.uk',
      website: 'https://executivecareer.co.uk'
    },
    rating: 4.7,
    location: 'London, UK',
    specialties: ['C-Suite Placements', 'Contract Negotiations', 'Executive Coaching']
  },

  // Lifestyle Partners
  {
    id: '12',
    name: 'Urban Lifestyle Consultants',
    category: 'lifestyle',
    services: ['social integration', 'cultural activities', 'hobby groups', 'wellness services'],
    description: 'Expert guidance for settling into your new lifestyle and community',
    contact: {
      phone: '+44 20 8234 5678',
      email: 'lifestyle@urbanlifestyle.co.uk',
      website: 'https://urbanlifestyle.co.uk'
    },
    rating: 4.6,
    location: 'London, UK',
    specialties: ['Social Networking', 'Cultural Events', 'Fitness & Wellness']
  },
  {
    id: '13',
    name: 'Community Connect Services',
    category: 'lifestyle',
    services: ['club memberships', 'community events', 'social meetups', 'recreational activities'],
    description: 'Connect with local communities and build lasting friendships',
    contact: {
      phone: '+44 20 8345 6789',
      email: 'connect@communityconnect.org.uk',
      website: 'https://communityconnect.org.uk'
    },
    rating: 4.7,
    location: 'Multiple Cities',
    specialties: ['Professional Networks', 'Family Activities', 'Hobby Groups']
  },

  // Transport Partners
  {
    id: '14',
    name: 'UK Transport Solutions',
    category: 'transport',
    services: ['driving license exchange', 'vehicle leasing', 'vehicle rental', 'insurance', 'transport planning'],
    description: 'Complete transport solutions for new UK residents',
    contact: {
      phone: '+44 20 8456 7890',
      email: 'transport@uktransport.co.uk',
      website: 'https://uktransportsolutions.co.uk'
    },
    rating: 4.5,
    location: 'London, UK',
    specialties: ['License Exchange', 'Vehicle Rental', 'Company Cars']
  },
  {
    id: '15',
    name: 'Metropolitan Mobility',
    category: 'transport',
    services: ['commuter planning', 'season tickets', 'bike schemes', 'corporate transport', 'chauffeur services'],
    description: 'Navigate the UK transport system with confidence',
    contact: {
      phone: '+44 20 8567 8901',
      email: 'mobility@metromobility.co.uk',
      website: 'https://metromobility.co.uk'
    },
    rating: 4.4,
    location: 'Manchester, UK',
    specialties: ['Public Transport', 'Cycle to Work', 'Professional Drivers']
  },
  {
    id: '22',
    name: 'Premier Transport & Chauffeur',
    category: 'transport',
    services: ['chauffeur services', 'executive transfers', 'vehicle rental', 'luxury car hire', 'corporate transport'],
    description: 'Premium chauffeur and vehicle rental services for business professionals',
    contact: {
      phone: '+44 20 8890 1234',
      email: 'bookings@premiertransport.co.uk',
      website: 'https://premiertransport.co.uk'
    },
    rating: 4.9,
    location: 'London, UK',
    specialties: ['Executive Chauffeurs', 'Luxury Vehicle Rental', '24/7 Service']
  },

  // Travel Partners
  {
    id: '16',
    name: 'Relocation Travel Specialists',
    category: 'travel',
    services: ['flight bookings', 'travel insurance', 'pet relocation', 'travel documentation'],
    description: 'Specialized travel services for international relocations',
    contact: {
      phone: '+44 20 8678 9012',
      email: 'travel@reloctravel.co.uk',
      website: 'https://reloctravel.co.uk'
    },
    rating: 4.8,
    location: 'London, UK',
    specialties: ['International Flights', 'Pet Transport', 'Travel Insurance']
  },
  {
    id: '17',
    name: 'Global Move Travel',
    category: 'travel',
    services: ['visa support', 'travel documentation', 'airport services', 'temporary accommodation'],
    description: 'End-to-end travel support for global relocations',
    contact: {
      phone: '+44 20 8789 0123',
      email: 'moves@globalmovetravel.com',
      website: 'https://globalmovetravel.com'
    },
    rating: 4.6,
    location: 'Birmingham, UK',
    specialties: ['Visa Assistance', 'Airport Services', 'Short-term Housing']
  },
  {
    id: '18',
    name: 'International Travel Concierge',
    category: 'travel',
    services: ['flight arrangements', 'travel itineraries', 'accommodation booking', 'travel emergencies'],
    description: 'Personal travel concierge services for complex international moves',
    contact: {
      phone: '+44 20 8890 1234',
      email: 'concierge@intltravelconcierge.co.uk',
      website: 'https://internationaltravelconcierge.co.uk'
    },
    rating: 4.7,
    location: 'London, UK',
    specialties: ['Complex Itineraries', '24/7 Support', 'Group Travel']
  },

  // Logistics Partners
  {
    id: '19',
    name: 'International Shipping Solutions',
    category: 'logistics',
    services: ['household goods shipping', 'document shipping', 'customs clearance', 'storage solutions'],
    description: 'Comprehensive international shipping and logistics services',
    contact: {
      phone: '+44 20 8901 2345',
      email: 'shipping@intlshipping.co.uk',
      website: 'https://internationalshippingsolutions.co.uk'
    },
    rating: 4.7,
    location: 'London, UK',
    specialties: ['Household Removals', 'Express Documents', 'Secure Storage']
  },
  {
    id: '20',
    name: 'Global Logistics Partners',
    category: 'logistics',
    services: ['freight forwarding', 'door-to-door delivery', 'packing services', 'vehicle shipping'],
    description: 'Professional logistics solutions for international relocations',
    contact: {
      phone: '+44 20 9012 3456',
      email: 'logistics@globallogistics.co.uk',
      website: 'https://globallogisticspartners.co.uk'
    },
    rating: 4.6,
    location: 'Manchester, UK',
    specialties: ['Full Container Load', 'Vehicle Transport', 'White Glove Service']
  },
  {
    id: '21',
    name: 'Express Courier Network',
    category: 'logistics',
    services: ['same-day delivery', 'international courier', 'document services', 'secure transport'],
    description: 'Fast and secure courier services for urgent relocations needs',
    contact: {
      phone: '+44 20 0123 4567',
      email: 'express@couriernet.co.uk',
      website: 'https://expresscouriernetwork.co.uk'
    },
    rating: 4.5,
    location: 'Multiple Locations',
    specialties: ['Same Day Service', 'Tracked Delivery', 'High Value Items']
  },

  // Tax Services Partners
  {
    id: '24',
    name: 'UK Tax Advisory Services',
    category: 'tax',
    services: ['personal tax returns', 'corporate tax planning', 'VAT registration', 'HMRC compliance', 'tax investigations'],
    description: 'Specialist tax advisors for UK residents and businesses',
    contact: {
      phone: '+44 20 9123 4567',
      email: 'advice@uktaxadvisory.co.uk',
      website: 'https://uktaxadvisory.co.uk'
    },
    rating: 4.8,
    location: 'London, UK',
    specialties: ['Expat Tax Planning', 'Double Taxation Relief', 'HMRC Investigations']
  },
  {
    id: '25',
    name: 'International Tax Consultants',
    category: 'tax',
    services: ['cross-border tax planning', 'treaty benefits', 'transfer pricing', 'international compliance'],
    description: 'Expert guidance on international tax matters for global relocations',
    contact: {
      phone: '+44 20 9234 5678',
      email: 'international@taxconsultants.co.uk',
      website: 'https://internationaltaxconsultants.co.uk'
    },
    rating: 4.9,
    location: 'London, UK',
    specialties: ['Multi-Jurisdiction Tax', 'Treaty Planning', 'Offshore Structures']
  },
  {
    id: '26',
    name: 'Expat Tax Solutions',
    category: 'tax',
    services: ['US/UK tax compliance', 'FATCA reporting', 'foreign income reporting', 'tax treaty optimization'],
    description: 'Specialized tax services for US and UK expatriates',
    contact: {
      phone: '+44 20 9345 6789',
      email: 'expat@taxsolutions.co.uk',
      website: 'https://expattaxsolutions.co.uk'
    },
    rating: 4.7,
    location: 'Manchester, UK',
    specialties: ['US-UK Tax Treaties', 'FBAR Compliance', 'State Tax Issues']
  },

  // General Services
  {
    id: '27',
    name: 'Relocation Support Services',
    category: 'general',
    services: ['document translation', 'cultural orientation', 'admin support', 'concierge services'],
    description: 'Comprehensive support for all relocation needs',
    contact: {
      phone: '+44 20 8890 1234',
      email: 'support@relocationsupport.co.uk',
      website: 'https://relocationsupport.co.uk'
    },
    rating: 4.5,
    location: 'Multiple Locations',
    specialties: ['Document Services', 'Cultural Training', 'Personal Assistance']
  }
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const taskId = searchParams.get('taskId')

    let recommendedPartners = partners

    // Filter by category if provided
    if (category) {
      recommendedPartners = partners.filter(partner => 
        partner.category === category || partner.category === 'general'
      )
    }

    // Add relevance scoring based on task context
    const partnersWithScore = recommendedPartners.map(partner => ({
      ...partner,
      relevanceScore: calculateRelevanceScore(partner, category),
      supportingLinks: generateSupportingLinks(partner.category)
    }))

    // Sort by relevance score and rating
    partnersWithScore.sort((a, b) => 
      (b.relevanceScore * b.rating) - (a.relevanceScore * a.rating)
    )

    return NextResponse.json({
      ok: true,
      partners: partnersWithScore.slice(0, 6), // Return top 6 recommendations
      category,
      totalResults: partnersWithScore.length
    })

  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message || 'Internal server error'
    }, { status: 500 })
  }
}

function calculateRelevanceScore(partner: any, category: string | null): number {
  if (!category) return 1
  
  if (partner.category === category) return 2
  if (partner.category === 'general') return 1.5
  return 1
}

function generateSupportingLinks(category: string) {
  const linksByCategory: { [key: string]: Array<{ title: string, url: string, type: string }> } = {
    immigration: [
      { title: 'UK Visa Requirements Guide', url: 'https://gov.uk/visa-requirements', type: 'official' },
      { title: 'Working in the UK - Complete Guide', url: 'https://relocnetwork.com/uk-work-guide', type: 'newsletter' },
      { title: 'Visa Application Checklist', url: 'https://relocnetwork.com/visa-checklist', type: 'resource' }
    ],
    housing: [
      { title: 'UK Rental Market Report', url: 'https://relocnetwork.com/rental-report', type: 'newsletter' },
      { title: 'Property Search Tips for Expats', url: 'https://relocnetwork.com/property-tips', type: 'resource' },
      { title: 'Tenancy Rights in the UK', url: 'https://gov.uk/tenancy-rights', type: 'official' }
    ],
    banking: [
      { title: 'Opening UK Bank Account Guide', url: 'https://relocnetwork.com/banking-guide', type: 'newsletter' },
      { title: 'Credit Building for New Residents', url: 'https://relocnetwork.com/credit-guide', type: 'resource' },
      { title: 'International Money Transfers', url: 'https://relocnetwork.com/money-transfers', type: 'newsletter' }
    ],
    education: [
      { title: 'UK School System Overview', url: 'https://relocnetwork.com/school-system', type: 'newsletter' },
      { title: 'School Application Process', url: 'https://gov.uk/school-applications', type: 'official' },
      { title: 'International Schools Directory', url: 'https://relocnetwork.com/intl-schools', type: 'resource' }
    ],
    healthcare: [
      { title: 'NHS Registration Guide', url: 'https://nhs.uk/registration', type: 'official' },
      { title: 'Healthcare for New Residents', url: 'https://relocnetwork.com/healthcare-guide', type: 'newsletter' },
      { title: 'Private vs NHS Healthcare', url: 'https://relocnetwork.com/healthcare-options', type: 'resource' }
    ],
    employment: [
      { title: 'Employment Rights in the UK', url: 'https://gov.uk/employment-rights', type: 'official' },
      { title: 'Negotiating Your UK Contract', url: 'https://relocnetwork.com/contract-tips', type: 'newsletter' },
      { title: 'Workplace Culture Guide', url: 'https://relocnetwork.com/workplace-culture', type: 'resource' }
    ],
    lifestyle: [
      { title: 'Building Social Networks in the UK', url: 'https://relocnetwork.com/social-networks', type: 'newsletter' },
      { title: 'UK Lifestyle and Culture Guide', url: 'https://relocnetwork.com/lifestyle-guide', type: 'resource' },
      { title: 'Community Groups and Clubs', url: 'https://relocnetwork.com/community-groups', type: 'resource' }
    ],
    transport: [
      { title: 'UK Driving License Exchange', url: 'https://gov.uk/exchange-foreign-driving-licence', type: 'official' },
      { title: 'Vehicle Rental and Chauffeur Services', url: 'https://relocnetwork.com/vehicle-rental-chauffeur', type: 'newsletter' },
      { title: 'Executive Transport Options', url: 'https://relocnetwork.com/executive-transport', type: 'resource' }
    ],
    travel: [
      { title: 'International Travel Requirements', url: 'https://gov.uk/foreign-travel-advice', type: 'official' },
      { title: 'Travel Planning for Relocations', url: 'https://relocnetwork.com/travel-planning', type: 'newsletter' },
      { title: 'Pet Travel and Documentation', url: 'https://relocnetwork.com/pet-travel', type: 'resource' }
    ],
    logistics: [
      { title: 'UK Customs and Import Regulations', url: 'https://gov.uk/bringing-goods-into-uk-personal-use', type: 'official' },
      { title: 'International Shipping Guide', url: 'https://relocnetwork.com/shipping-guide', type: 'newsletter' },
      { title: 'Household Goods Moving Checklist', url: 'https://relocnetwork.com/moving-checklist', type: 'resource' }
    ],
    tax: [
      { title: 'UK Tax Obligations for New Residents', url: 'https://gov.uk/tax-foreign-income', type: 'official' },
      { title: 'Tax Planning for International Relocations', url: 'https://relocnetwork.com/tax-planning-guide', type: 'newsletter' },
      { title: 'Double Taxation Treaties Guide', url: 'https://relocnetwork.com/double-taxation-treaties', type: 'resource' },
      { title: 'HMRC Guidance for Expatriates', url: 'https://gov.uk/guidance/tax-on-foreign-income', type: 'official' }
    ]
  }

  return linksByCategory[category] || [
    { title: 'General Relocation Guide', url: 'https://relocnetwork.com/general-guide', type: 'newsletter' },
    { title: 'Relocation Checklist', url: 'https://relocnetwork.com/checklist', type: 'resource' }
  ]
}