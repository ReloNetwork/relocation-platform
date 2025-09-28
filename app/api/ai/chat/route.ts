import { NextRequest, NextResponse } from 'next/server'

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

// Simulated AI responses based on relocation expertise
const generateAIResponse = async (messages: ChatMessage[], context: any): Promise<string> => {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  // Greeting responses
  if (messages.length <= 1 || lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return `Hello! I'm Relo, your AI assistant for London relocation. I provide instant answers and guidance for moving to London.

I can help you with:
🏠 Property areas, prices & recommendations
📋 Visa requirements & processes
🎓 School options & admissions  
🏦 Banking setup & requirements
🚗 Transport costs & options
🎯 Living costs & lifestyle tips

What would you like to know about London?`
  }

  // Property/Housing queries
  if (lastMessage.includes('property') || lastMessage.includes('housing') || lastMessage.includes('flat') || lastMessage.includes('apartment')) {
    return `Here's your London property guide:

**Prime Areas & Prices:**
• **Marylebone** - Central location, £1,200-£2,000/sq ft
• **Canary Wharf** - Financial district, £800-£1,400/sq ft 
• **Kensington** - Premium area, £1,500-£3,000/sq ft
• **Greenwich** - Family-friendly, £600-£1,000/sq ft

**Rental Costs (1-bed flat):**
• Zone 1: £1,800-£3,500/month
• Zone 2: £1,500-£2,800/month  
• Zone 3: £1,200-£2,200/month

**Key Considerations:**
• Transport links to your workplace
• Council tax (£1,000-£3,000/year)
• Utilities (£150-£250/month)

What's your budget range or preferred area?`
  }

  // Visa/Legal queries
  if (lastMessage.includes('visa') || lastMessage.includes('legal') || lastMessage.includes('immigration')) {
    return `Here's your UK visa guide:

**Main Visa Types:**
• **Skilled Worker Visa** - For sponsored employment (£610 fee + £624/year health surcharge)
• **Global Talent Visa** - For leaders in tech/science/arts (£623 fee)
• **Investment Visa** - For investors (£2,404 fee, £2M+ investment)
• **Intra-company Transfer** - For company transfers (£610-£1,408 fee)

**Processing Times:**
• Inside UK: 8 weeks
• Outside UK: 3-8 weeks
• Priority service: 5-10 working days (extra cost)

**Requirements:**
• English language test (unless exempt)
• Tuberculosis test (if from certain countries)
• Biometric information
• Financial requirements proof

What's your nationality and employment situation?`
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

  // Transport queries
  if (lastMessage.includes('transport') || lastMessage.includes('travel') || lastMessage.includes('car') || lastMessage.includes('tube')) {
    return `London's transport system is excellent once you understand it! Here's your guide:

**Public Transport:**
• **Oyster Card/Contactless** - Essential for daily travel
• **Zone 1-2** - Most professionals live/work here
• **Annual Travelcard** - £1,576 for Zone 1-2
• **Peak Hours** - 7:30-9:30am, 5-7pm (avoid if possible)

**Car Considerations:**
• **Congestion Charge** - £15/day in central London
• **ULEZ** - Additional environmental charges
• **Parking** - Very expensive and limited
• **Car hire** - Often more practical than ownership

**Professional Transport:**
• Executive car services for client meetings
• Cycle to Work schemes popular
• Many choose Zone 2 living for better transport links

**Our Partners:**
• **Executive Car Services** for business travel
• **Cycle rental schemes** for eco-friendly commuting

Would you like specific advice based on where you'll be living and working?`
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

  // Fallback response
  return `I'm here to help with your London relocation! I can provide instant answers about:

• **Property** - Areas, prices, rental costs
• **Visas** - Types, requirements, processing times  
• **Schools** - International schools, state options, fees
• **Banking** - Account setup, requirements, best banks
• **Transport** - Costs, zones, Oyster cards
• **Living costs** - Monthly budgets, council tax, utilities

Just ask me something specific like "What areas are good for families?" or "How much does transport cost?" and I'll give you detailed information right away.

What would you like to know about London?`
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