import { NextRequest, NextResponse } from 'next/server'

// Simple server-side analytics tracking
const trackServerEvent = (event: string, properties: any = {}) => {
  console.log('📊 Server Analytics Event:', {
    event,
    timestamp: new Date().toISOString(),
    ...properties
  })
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

interface ChatSession {
  id: string
  messages: ChatMessage[]
  context: {
    userType?: 'individual' | 'corporate' | 'partner'
    relocationType?: 'visa' | 'housing' | 'education' | 'banking' | 'lifestyle'
    location?: string
    budget?: string
  }
}

// Enhanced AI response system with better context understanding
const generateAIResponse = async (messages: ChatMessage[], context: any): Promise<string> => {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  const conversationHistory = messages.slice(0, -1)
  const isFirstMessage = messages.length <= 1
  const hasPreviousConversation = conversationHistory.length > 0
  
  // Extract context from previous messages
  const previousTopics = conversationHistory.map(msg => msg.content.toLowerCase()).join(' ')
  const discussedProperty = previousTopics.includes('property') || previousTopics.includes('area')
  const discussedVisa = previousTopics.includes('visa') || previousTopics.includes('immigration')
  const discussedSchools = previousTopics.includes('school') || previousTopics.includes('education')
  const discussedBanking = previousTopics.includes('bank') || previousTopics.includes('finance')
  
  // Enhanced question analysis
  const isQuestion = lastMessage.includes('?') || lastMessage.startsWith('how') || lastMessage.startsWith('what') || lastMessage.startsWith('where') || lastMessage.startsWith('when') || lastMessage.startsWith('why') || lastMessage.includes('i need') || lastMessage.includes('can you')
  const isGreeting = lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hey')
  
  // Direct answer system for specific questions
  if (isQuestion || lastMessage.includes('i need') || lastMessage.includes('looking for')) {
    
    // Airport taxi specific questions
    if ((lastMessage.includes('taxi') || lastMessage.includes('uber') || lastMessage.includes('cab')) && lastMessage.includes('airport')) {
      return `For airport taxis in London, here are your best options:

**From Heathrow:**
• Black cab: £45-75 (45-90 mins to central London)
• Uber: £35-65 (usually 10-20% cheaper)
• Pre-booked: Addison Lee from £55

**From Gatwick:**
• Black cab: £60-90 (60-90 mins)
• Uber: £50-80
• Gatwick Express + taxi often cheaper for central London

**From Stansted/Luton:**
• Black cab: £55-80
• Uber: £45-70

**Booking Tips:**
• Book in advance for better rates
• Download FREE NOW app for black cabs
• Avoid surge pricing during peak times (Mon AM, Fri PM)

Which airport are you flying into? I can give more specific advice.`
    }
    
    // Housing/property questions
    if (lastMessage.includes('where') && (lastMessage.includes('live') || lastMessage.includes('area') || lastMessage.includes('neighbourhood'))) {
      return `For choosing where to live in London, here are the best areas by lifestyle:

**For Professionals:**
• **Canary Wharf** - Finance workers, modern apartments, excellent transport
• **Marylebone** - Central location, great amenities, upscale
• **Shoreditch** - Tech hub, trendy, good nightlife

**For Families:**
• **Greenwich** - Great schools, parks, 20-min to City
• **Richmond** - Suburban feel, outstanding schools, riverside
• **Clapham** - Family community, good transport links

**Best Value:**
• **Stratford** - Olympic area, improving rapidly, great transport
• **Walthamstow** - Village feel, more affordable
• **Zone 2-3** generally offers best value for money

What's most important to you - commute time, budget, or lifestyle? I can narrow down recommendations.`
    }
    
    // Budget/cost questions
    if (lastMessage.includes('cost') || lastMessage.includes('expensive') || lastMessage.includes('budget') || lastMessage.includes('much')) {
      return `London living costs vary significantly by area and lifestyle:

**Monthly Essentials (Individual):**
• Rent Zone 1: £1,800-3,500 (1-bed)
• Rent Zone 2: £1,500-2,800 (1-bed)
• Transport: £130-250 (Oyster card)
• Food/groceries: £300-600
• Utilities: £100-200

**Family Additional Costs:**
• School fees: £1,250-2,900/month per child (private)
• Childcare: £1,200-2,000/month
• Larger accommodation: +£1,000-3,000

**Quick Budget Guide:**
• £30k salary = comfortable sharing
• £50k salary = own 1-bed in Zone 2-3
• £80k+ = central London lifestyle

What specific costs are you most concerned about?`
    }
  }
  
  // Greeting responses (only for first message)
  if (isFirstMessage || (lastMessage.includes('hello') || lastMessage.includes('hi')) && !hasPreviousConversation) {
    return `Hello! I'm Relo, your AI assistant for London relocation. I provide instant answers and guidance for moving to London.

I can help you with:
• Property areas, prices & recommendations
• Visa requirements & processes
• School options & admissions  
• Banking setup & requirements
• Transport costs & options
• Living costs & lifestyle tips

What would you like to know about London?`
  }

  // Property/Housing queries
  if (lastMessage.includes('property') || lastMessage.includes('housing') || lastMessage.includes('flat') || lastMessage.includes('apartment') || lastMessage.includes('area')) {
    // More specific responses based on context
    if (lastMessage.includes('budget') || lastMessage.includes('cost') || lastMessage.includes('price')) {
      return `London property costs vary significantly by area:

**Rental Costs (1-bed flat):**
• **Zone 1 (Central)**: £1,800-£3,500/month - Bank, Marylebone, City
• **Zone 2**: £1,500-£2,800/month - Greenwich, Clapham, Shoreditch  
• **Zone 3**: £1,200-£2,200/month - Stratford, Walthamstow

**Purchase Prices:**
• **Prime areas**: £1,200-£3,000/sq ft (Marylebone, Kensington)
• **Financial districts**: £800-£1,400/sq ft (Canary Wharf, City)
• **Family areas**: £600-£1,000/sq ft (Greenwich, Richmond)

**Additional costs:** Council tax (£1,000-£3K/year), utilities (£150-250/month), deposit (1-6 weeks rent).

Most professionals find Zone 2 offers the best value - good transport links with 30-40% savings vs Zone 1.`
    }
    
    if (lastMessage.includes('family') || lastMessage.includes('children') || lastMessage.includes('kids')) {
      return `For families, I'd recommend these areas:

**Greenwich** - Excellent schools, parks, river views, £600-1,000/sq ft, 20-min train to City
**Richmond** - Suburban feel, outstanding primaries, riverside walks, royal park access  
**Clapham** - Family-friendly community, good transport, trendy restaurants, strong social scene
**Marylebone** - Premium area with excellent schools nearby, central location but higher costs

**School timing:** Most international schools require 12-18 months advance application, so start early. Many families strategically choose homes within catchment areas of outstanding state schools to combine great education with property investment.`
    }
    
    if (lastMessage.includes('work') || lastMessage.includes('commute') || lastMessage.includes('office')) {
      return `Your commute determines the best areas to live:

**City/Bank workers** - Marylebone (Central line), Shoreditch (walking/cycle), Bank areas
**Canary Wharf** - Greenwich (DLR 15-min), Stratford (Jubilee line), Isle of Dogs
**West End** - Camden (Northern line), King's Cross (Piccadilly/Circle), Fitzrovia
**Tech hub (Shoreditch)** - Liverpool Street connections, Old Street, cycle-friendly areas

**Smart strategy:** Zone 1-2 annual travelcard costs £1,576. Many choose Zone 2-3 for 30-40% housing savings while keeping commutes under 30 minutes.`
    }
    
    // Generic property response if no specific context
    if (!discussedProperty) {
      return `Here are London's best areas for different needs:

**For Professionals:** Marylebone (central location), Shoreditch (tech hub), Bank area (finance)
**For Families:** Greenwich (schools/parks), Richmond (suburban feel), Clapham (community)  
**Best Value:** Stratford (improving area), Walthamstow (village feel), Lewisham (up-and-coming)

**Quick costs:** Zone 1 rentals £1,800-3,500/month, Zone 2 £1,500-2,800/month.

Zone 2 typically offers the best balance of location, transport links, and value for money.`
    } else {
      return `Each area has distinct advantages. Marylebone offers central convenience, Greenwich provides family amenities with good transport, while Shoreditch is perfect for tech professionals. Zone 2 locations generally provide the best value with excellent connectivity.`
    }
  }

  // Visa/Legal queries
  if (lastMessage.includes('visa') || lastMessage.includes('legal') || lastMessage.includes('immigration')) {
    if (discussedVisa) {
      return `Most professionals use the Skilled Worker Visa (£610 fee + £624/year health surcharge) which requires a job offer with sponsorship. Processing takes 3-8 weeks typically. The Global Talent visa (£623) is excellent for tech/science/arts leaders as it doesn't require a job offer. Start your application 3+ months before your planned move date.`
    }
    
    return `The visa you need depends on your situation:

**Most Common Options:**
• **Skilled Worker** - Requires job offer with sponsorship, £610 + £624/year health surcharge
• **Global Talent** - For tech/science/arts leaders, £623 fee, no job offer needed
• **Intra-company Transfer** - For company transfers, £610-£1,408 fee
• **Investment Visa** - For investors with £2M+, £2,404 fee

**Processing Timeline:** 3-8 weeks (priority service available for faster processing). Most people start applications 3+ months before their planned move date to allow for any delays or additional documentation requests.`
  }

  // Education/Schools queries
  if (lastMessage.includes('school') || lastMessage.includes('education') || lastMessage.includes('children')) {
    return `London offers world-class educational opportunities! I'll help you navigate the options.

**Top International Schools:**
• **American School in London** - Ages 4-18, American curriculum
• **International School of London** - IB program, multiple campuses
• **University College School** - Academic excellence, ages 11-18
• **Francis Holland School** - Prestigious girls' school

**Key Considerations:**
• Application deadlines (typically 12-18 months ahead)
• Entry requirements and assessments
• School fees: £15,000-£35,000 annually
• Location relative to your housing choice

**State School Options:**
• Outstanding rated primaries in Marylebone & Kensington
• Grammar schools for academic excellence
• Catchment area considerations

Would you like specific recommendations based on your children's ages and educational preferences?`
  }

  // Banking/Finance queries
  if (lastMessage.includes('bank') || lastMessage.includes('finance') || lastMessage.includes('money') || lastMessage.includes('account')) {
    return `Banking setup is essential for your London life. Let me guide you through the process.

**Major UK Banks for Internationals:**
• **HSBC Expat** - Specialist international services
• **Barclays International** - Premier banking options
• **Lloyds International** - Comprehensive packages
• **Private Banks** - For high-net-worth clients

**Requirements Typically Include:**
• Proof of UK address
• Employment letter/contract
• Passport and visa documentation
• Credit history (where available)
• Minimum deposit amounts

**Our Partner:**
**Sterling Wealth Management** provides dedicated banking setup services and ongoing financial advisory.

**Timeline:** 2-4 weeks for full account setup with our partner assistance.

Would you like me to connect you with Sterling Wealth for a consultation, or do you have specific banking questions?`
  }


  // Budget/Cost queries
  if (lastMessage.includes('cost') || lastMessage.includes('budget') || lastMessage.includes('expensive') || lastMessage.includes('price')) {
    return `London costs vary significantly by lifestyle and location. Here's a realistic breakdown:

**Monthly Living Costs (Individual):**
• **Accommodation** - £1,500-£4,000+ (Zone 1-2)
• **Transport** - £130-£250 (depends on zones)
• **Food/Dining** - £400-£800
• **Utilities** - £100-£200
• **Entertainment** - £200-£500

**Family Costs Add:**
• **School fees** - £1,250-£2,900/month per child
• **Childcare** - £1,200-£2,000/month
• **Larger accommodation** - +£1,000-£3,000

**Professional Services:**
• **Relo Network managed service** - One-time comprehensive support
• **Partner discounts** - 10-15% savings on key services

**Money-Saving Tips:**
• Live in Zone 2-3 for better value
• Use annual transport passes
• Take advantage of corporate benefits

Would you like a personalized budget assessment based on your specific situation?`
  }

  // General questions  
  if (lastMessage.includes('how much') || lastMessage.includes('cost') || lastMessage.includes('expensive')) {
    return `Here are typical London living costs:

**Monthly Expenses (Individual):**
• Rent (Zone 1-2): £1,500-£3,500
• Transport: £130-£250 (Oyster card)
• Food/groceries: £300-£600
• Utilities: £100-£200
• Mobile phone: £15-£50

**One-time Costs:**
• Deposit: 1-6 weeks rent
• Agency fees: £200-£500
• Council tax: £1,000-£3,000/year

**Salary Guide:**
• £30K = Comfortable sharing
• £50K = Own 1-bed in Zone 2-3  
• £80K+ = Central London lifestyle

What specific costs would you like to know more about?`
  }

  // Areas and neighborhoods
  if (lastMessage.includes('area') || lastMessage.includes('neighborhood') || lastMessage.includes('where to live')) {
    return `Here are London's best areas for different needs:

**For Professionals:**
• **Bank/City** - Financial district, excellent transport
• **Marylebone** - Central, upscale, great amenities
• **Shoreditch** - Tech hub, trendy, good nightlife

**For Families:**
• **Greenwich** - Great schools, parks, river views
• **Richmond** - Suburban feel, excellent schools
• **Clapham** - Family-friendly, good transport

**For Budget-Conscious:**
• **Stratford** - Olympic area, improving rapidly
• **Lewisham** - Up-and-coming, affordable
• **Walthamstow** - Village feel, good value

**Transport Zones:**
• Zone 1: Central London (most expensive)
• Zone 2-3: Best value for money
• Zone 4+: Suburban, longer commutes

What type of lifestyle are you looking for?`
  }

  // Partner queries
  if (lastMessage.includes('partner') || lastMessage.includes('service') || lastMessage.includes('recommendation')) {
    return `Our vetted partner network ensures quality service at every step:

**Property Partners:**
• **Prime Properties London** - Luxury property search
• **Executive Rentals** - Short-term accommodation

**Legal & Visa:**
• **Elite Immigration Advisors** - Visa specialists
• **London Legal Partners** - Property law experts

**Financial Services:**
• **Sterling Wealth Management** - Banking & investments
• **Tax Advisory London** - International tax planning

**Family Services:**
• **Education Consultants** - School placement
• **International Healthcare** - Private medical

**Lifestyle:**
• **Concierge Services** - Daily life assistance
• **Cultural Integration** - London orientation

**Quality Guarantee:**
• All partners vetted for excellence
• Client satisfaction guaranteed
• Preferred rates for Relo Network clients

Would you like me to connect you with specific partners, or would you prefer a comprehensive consultation covering multiple services?`
  }

  // Fallback response - more conversational based on context
  if (hasPreviousConversation) {
    // Provide helpful follow-up information based on what's been discussed
    if (discussedProperty && !discussedVisa) {
      return `Since you're looking at London property, visa status is crucial for rental applications. Most landlords require valid UK visa documentation. The Skilled Worker visa is most common for professionals (£610 + £624/year health surcharge, requires job offer). Processing takes 3-8 weeks, so plan accordingly.`
    }
    
    if (discussedVisa && !discussedBanking) {
      return `With visa planning sorted, UK banking setup is your next step. This typically takes 2-4 weeks and requires proof of address and employment documentation. HSBC Expat and Barclays International offer good services for newcomers. Some banks can start the process before you arrive with proper documentation.`
    }
    
    if (discussedProperty && discussedVisa && !discussedSchools) {
      return `With housing and visa covered, education is important if you have children. London has excellent international schools but most require 12-18 months advance application. American School in London and International School of London are popular choices. Many families also consider outstanding state schools in certain catchment areas.`
    }
    
    // General follow-up for ongoing conversation
    const topics = ['transport', 'banking', 'schools', 'living costs']
    const uncoveredTopics = topics.filter(topic => !previousTopics.includes(topic))
    
    if (uncoveredTopics.length > 0) {
      return `Other important aspects for London relocation include ${uncoveredTopics.slice(0, 2).join(' and ')}. Transport costs around £130-250/month depending on zones, and overall living costs vary significantly by lifestyle and location.`
    }
    
    return `London offers excellent quality of life with world-class amenities, transport, and cultural opportunities. The key is planning each aspect systematically - property, visa, banking, schools (if needed), and understanding transport zones for cost efficiency.`
  }
  
  // Only show full intro for completely new conversations
  return `I'm here to help with your London relocation! Ask me anything specific like:

• "What areas are good for families?"
• "How much does transport cost?"  
• "What visa do I need?"
• "How do I set up banking?"

What would you like to know?`
}

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId, context } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Track AI interaction for analytics
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user') {
      trackServerEvent('AI Chat Interaction', {
        sessionId,
        messageLength: lastMessage.content.length,
        messageCount: messages.length,
        context: context || {}
      })
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(messages, context)

    // Create response message
    const responseMessage: ChatMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: responseMessage,
      sessionId: sessionId || `session_${Date.now()}`,
      context: context || {}
    })

  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Relo AI Chat API',
    status: 'active',
    capabilities: [
      'Property guidance',
      'Visa assistance', 
      'Education advice',
      'Banking setup',
      'Transport planning',
      'Partner recommendations'
    ]
  })
}