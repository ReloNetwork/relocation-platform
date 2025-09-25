import { NextRequest, NextResponse } from 'next/server'

// Retell AI WebSocket endpoint for real-time LLM responses
// This endpoint receives WebSocket connections from Retell and provides dynamic responses

interface RetellTranscriptItem {
  role: 'agent' | 'user'
  content: string
  words?: Array<{
    word: string
    start: number
    end: number
  }>
}

interface RetellWebSocketEvent {
  interaction_type: 'ping_pong' | 'update_only' | 'response_required' | 'reminder_required'
  response_id?: number
  timestamp?: number
  transcript?: RetellTranscriptItem[]
  turntaking?: 'agent_turn' | 'user_turn'
}

// Generate contextual responses for the Relo voice agent based on transcript
const generateVoiceResponse = (transcript: RetellTranscriptItem[]): string => {
  // Get the latest user utterance
  const latestUserMessage = transcript.filter(item => item.role === 'user').pop()
  const utterance = latestUserMessage?.content.toLowerCase() || ''
  const conversationLength = transcript.length

  // First interaction - greeting
  if (conversationLength <= 1) {
    return "Hello! I'm Relo, your personal London relocation assistant. I'm delighted to speak with you today. I specialize in helping professionals and families make their move to London as smooth and successful as possible. Whether you're looking for advice on property, visas, schools, banking, or just getting settled into London life, I'm here to help. What brings you to consider London, and how can I assist you with your relocation today?"
  }

  // Property/Housing queries
  if (utterance.includes('property') || utterance.includes('housing') || utterance.includes('flat') || utterance.includes('buy') || utterance.includes('rent')) {
    return "Excellent question about London property! The market can seem daunting, but I'll guide you through it. The key areas I typically recommend for professionals are Marylebone for that village feel in Zone 1, Kensington for luxury living, Canary Wharf if you're in finance, and Greenwich for families wanting great value. Property prices vary significantly - we're looking at roughly £1,200 to £2,000 per square foot in prime central areas. What's your budget range, and are you looking to rent or purchase? Also, will you be working in a particular area of London?"
  }

  // Visa/Immigration queries  
  if (utterance.includes('visa') || utterance.includes('immigration') || utterance.includes('legal') || utterance.includes('work permit')) {
    return "Visa requirements are absolutely crucial to get right from the start. The most common route for professionals is the Skilled Worker visa, which requires a job offer from a UK sponsor. We also have the Global Talent visa for exceptional individuals, and various investment routes for high-net-worth clients. The process typically takes 3 to 8 weeks, depending on your circumstances. I work closely with Elite Immigration Advisors who specialize in executive relocations. What's your current nationality, and do you already have a job offer in London, or are you still exploring opportunities?"
  }

  // Education/Schools queries
  if (utterance.includes('school') || utterance.includes('education') || utterance.includes('children') || utterance.includes('kids')) {
    return "London has some of the world's finest schools! For international families, I often recommend the American School in London, which offers an excellent American curriculum, or the International School of London for the IB programme. If you're considering British education, schools like University College School and Francis Holland are outstanding. The key is applying early - often 12 to 18 months in advance for the best schools. School fees typically range from £15,000 to £35,000 annually. How old are your children, and do you have a preference for American, British, or international curriculum?"
  }

  // Banking/Finance queries
  if (utterance.includes('bank') || utterance.includes('finance') || utterance.includes('account') || utterance.includes('money')) {
    return "Banking setup is essential, and I can make this much simpler for you. The main banks for international clients are HSBC Expat, Barclays International, and Lloyds International. You'll typically need proof of address, employment documentation, and passport details. The process can be tricky without proper guidance, which is why I work with Sterling Wealth Management - they specialize in banking setup for relocating executives. They can often have accounts ready before you even arrive in London. Are you looking for personal banking, business accounts, or investment services?"
  }

  // Transport queries
  if (utterance.includes('transport') || utterance.includes('car') || utterance.includes('tube') || utterance.includes('travel') || utterance.includes('commute')) {
    return "London transport is brilliant once you understand it! The Underground is incredibly efficient - an annual Travelcard for Zones 1-2 costs £1,576 and covers most of where you'll want to be. Many of my clients choose not to have a car initially, as parking is expensive and the congestion charge is £15 daily in central London. I usually recommend living within walking distance of a tube station on the right line for your commute. Where will you be working, and do you have any preferences about your commute time?"
  }

  // Budget/Cost queries
  if (utterance.includes('cost') || utterance.includes('budget') || utterance.includes('expensive') || utterance.includes('price') || utterance.includes('afford')) {
    return "London costs vary enormously depending on your lifestyle choices. For a comfortable professional lifestyle, I typically budget £4,000 to £8,000 monthly for an individual, or £7,000 to £15,000 for a family. This includes accommodation, transport, dining, and entertainment. The biggest variables are housing location and whether you have school fees. I can help you optimize your budget by choosing the right area and services. What sort of lifestyle are you hoping to maintain, and do you have a rough monthly budget in mind?"
  }

  // Timeline queries
  if (utterance.includes('when') || utterance.includes('timeline') || utterance.includes('how long') || utterance.includes('urgent')) {
    return "Timeline is crucial for a smooth relocation! Ideally, I recommend starting the process 6 to 12 months before your move date. This allows time for visa processing, school applications, and securing the right property. However, I've successfully managed relocations in as little as 4 weeks for urgent corporate moves. The key is prioritizing the critical elements first. When are you hoping to be settled in London? This will help me prioritize what we need to focus on immediately."
  }

  // Partner/Service queries
  if (utterance.includes('help') || utterance.includes('service') || utterance.includes('partner') || utterance.includes('recommend')) {
    return "I work with London's finest specialists to ensure everything goes smoothly. For property, I partner with Prime Properties London who know the luxury market inside out. For visas, Elite Immigration Advisors have a 95% success rate with executive relocations. Sterling Wealth Management handles all banking and financial setup. For schools, our Education Consultants have relationships with the top institutions. Everything is coordinated through Relo Network to ensure you have one point of contact. Would you like me to arrange consultations with any of these specialists?"
  }

  // Corporate/Company queries
  if (utterance.includes('company') || utterance.includes('corporate') || utterance.includes('business') || utterance.includes('employer')) {
    return "Excellent! Corporate relocations are one of our specialties. Many multinational companies work with Relo Network because we provide comprehensive support that reduces stress for their executives and ensures faster productivity. We can coordinate with your HR department and often provide group rates for multiple relocations. Companies like Goldman Sachs and McKinsey regularly use our services. Is your company already working with a relocation provider, or would this be something you're arranging independently?"
  }

  // Follow-up/Next steps
  if (utterance.includes('next') || utterance.includes('what now') || utterance.includes('how do we') || utterance.includes('start')) {
    return "Perfect! The next step is typically a comprehensive consultation where we dive deep into your specific needs and create a personalized relocation plan. This covers everything we've discussed - property, visas, schools, banking - with clear timelines and next steps. I can arrange this consultation for you, either in person, by video call, or I can have one of our London-based consultants meet you. We also provide you with our complete London Relocation Guide and connect you with the right partners. Would you prefer to schedule this consultation now?"
  }

  // Fallback response
  return "That's a great question, and I want to make sure I give you the most accurate and helpful advice. London relocations involve many moving parts, and every situation is unique. Based on what you've told me so far, I think the best next step would be to arrange a detailed consultation where we can explore your specific needs and circumstances. This allows me to provide much more targeted advice and connect you with exactly the right specialists. Would you like me to arrange that consultation for you? I can also send you our comprehensive London guide while we're setting that up."
}

export async function POST(request: NextRequest) {
  try {
    const event: RetellWebSocketEvent = await request.json()
    
    // Handle different event types
    switch (event.interaction_type) {
      case 'ping_pong':
        return NextResponse.json({
          response_type: 'ping_pong',
          timestamp: Date.now()
        })
        
      case 'response_required':
      case 'reminder_required':
        if (!event.transcript || !event.response_id) {
          throw new Error('Missing transcript or response_id')
        }
        
        const content = generateVoiceResponse(event.transcript)
        
        console.log(`Relo Voice Agent - Response generated for ${event.interaction_type}`)
        
        return NextResponse.json({
          response_type: 'response',
          response_id: event.response_id,
          content,
          content_complete: true
        })
        
      case 'update_only':
        // Just acknowledge the update, no response needed
        console.log('Transcript update received')
        return NextResponse.json({ status: 'acknowledged' })
        
      default:
        console.warn(`Unknown interaction type: ${event.interaction_type}`)
        return NextResponse.json({ status: 'unknown_event' })
    }

  } catch (error) {
    console.error('LLM websocket error:', error)
    
    // Return error response in Retell format
    return NextResponse.json({
      response_type: 'response',
      response_id: Date.now(),
      content: "I apologize, but I'm experiencing a momentary technical issue. Let me try to help you again. What aspect of your London relocation would you like to discuss?",
      content_complete: true
    }, { status: 200 }) // Return 200 to keep the call alive
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Relo AI Voice Agent - LLM Websocket Endpoint',
    agent: 'Relo - London Relocation Assistant', 
    capabilities: [
      'Property guidance and area recommendations',
      'Visa and immigration advice',
      'Education and school placement',
      'Banking and financial setup',
      'Transport and logistics planning',
      'Cultural integration support',
      'Partner specialist connections'
    ],
    status: 'active'
  })
}