import { NextRequest, NextResponse } from 'next/server'

// Simulated AI responses for voice agent
const generateAIResponse = (message: string, context: any): string => {
  const lowerMessage = message.toLowerCase()
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Ah, splendid to make your acquaintance! I'm Relo, your digital concierge for all things London relocation. I've helped rather a lot of people navigate this magnificent but occasionally bewildering city. What brings you to London, if you don't mind my asking?"
  }
  
  // Property/accommodation queries
  if (lowerMessage.includes('property') || lowerMessage.includes('flat') || lowerMessage.includes('apartment') || lowerMessage.includes('house') || lowerMessage.includes('accommodation')) {
    return "Ah, property hunting in London - my absolute favourite sport! I dare say I'm rather good at it too. I've got my digital eye on everything from charming Marylebone mews houses to those gleaming Canary Wharf towers. Tell me, are you after something with character and a bit of history, or do you prefer the modern conveniences? I do love matching people with their perfect London nest!"
  }
  
  // Pricing queries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
    return "Ah, the age-old question of cost! Well, I'm pleased to say we're not as dear as Harrods, but we're certainly worth every penny. We start at £295 monthly for my digital services - think of me as your personal London guide who never sleeps. Our full-service packages range from £8,500 to £15,000, and trust me, after dealing with London's property market yourself, you'll consider it money well spent! Founding members get rather splendid discounts too."
  }
  
  // Partnership queries
  if (lowerMessage.includes('partner') || lowerMessage.includes('business') || lowerMessage.includes('lead') || lowerMessage.includes('referral')) {
    return "Brilliant! Looking to join our merry band of relocation specialists, are we? Splendid choice! We've got the Lead Machine package - rather like having your own personal lead butler - starting at £497 monthly. Then there's the Market Dominator, which is quite the exclusive affair at £1,497 monthly. Think of it as having the entire relocation market as your oyster! Founding member rates are available until September 15th. Shall I have someone ring you about the particulars?"
  }
  
  // Visa/legal queries
  if (lowerMessage.includes('visa') || lowerMessage.includes('legal') || lowerMessage.includes('immigration') || lowerMessage.includes('permit')) {
    return "Ah, the dreaded paperwork! Don't worry, I've seen it all - from Global Talent visas to the occasional mysterious stamp that nobody quite understands. Our legal chaps have a 94% success rate, which is rather impressive considering they're dealing with government bureaucracy. They're absolute wizards at turning incomprehensible forms into approved applications. Shall I connect you with our immigration specialists?"
  }
  
  // School/education queries
  if (lowerMessage.includes('school') || lowerMessage.includes('education') || lowerMessage.includes('children') || lowerMessage.includes('kids')) {
    return "Ah, the little ones! Getting them sorted with a proper education is absolutely crucial, isn't it? London's got some absolutely brilliant schools - from the traditional establishments with centuries of history to modern international schools with all the latest gadgets. I do love helping families find the perfect fit. Some parents want Latin and cricket, others prefer coding and contemporary dance. Each to their own, I say! Shall I arrange some school visits?"
  }
  
  // Emergency/urgent queries
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('immediate') || lowerMessage.includes('asap') || lowerMessage.includes('quickly')) {
    return "Blimey, that does sound urgent! Right, no time for pleasantries then - though I do hope you'll pop back for a proper chat once you're settled. We've got emergency relocation services that can have you sorted in 14-21 days. Our rapid response chaps are standing by 24/7, ready to leap into action faster than you can say 'fish and chips'. Ring them immediately on +44 20 7946 0958 - tell them Relo sent you!"
  }
  
  // Corporate queries
  if (lowerMessage.includes('corporate') || lowerMessage.includes('company') || lowerMessage.includes('business') || lowerMessage.includes('employee') || lowerMessage.includes('executive')) {
    return "We work with 12+ investment banks and Fortune 500 companies for executive relocations. Our corporate packages include bulk discounts, dedicated account management, and comprehensive reporting. We can handle single executives or entire department relocations."
  }
  
  // General service queries
  if (lowerMessage.includes('service') || lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist')) {
    return "Relo Network offers comprehensive London relocation services including property search, visa support, school placement, and cultural integration. We have a 96% success rate and 4.8-star client rating. What specific aspect of your relocation can I help with today?"
  }
  
  // Location-specific queries
  if (lowerMessage.includes('marylebone') || lowerMessage.includes('kensington') || lowerMessage.includes('canary wharf') || lowerMessage.includes('greenwich')) {
    return "Great choice! That's one of our most popular areas for relocations. Each area has unique benefits - excellent transport links, premium schools, and strong international communities. I can provide detailed area analysis and arrange property viewings. Would you like specific information about amenities and pricing?"
  }
  
  // Contact/booking queries  
  if (lowerMessage.includes('call') || lowerMessage.includes('speak') || lowerMessage.includes('talk') || lowerMessage.includes('consultation')) {
    return "Absolutely! You can reach our expert team at +44 20 7946 0958, available 24/7. We also offer free 30-minute consultations to plan your perfect London relocation strategy. Would you like me to book that for you now?"
  }
  
  // Gratitude responses
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
    return "Oh, you're most welcome indeed! It's been an absolute pleasure chatting with you. That's what we're here for - making London feel a bit less daunting and a bit more like home. Do remember, our human colleagues are standing by at +44 20 7946 0958 should you need them. They're considerably more charming than I am, if you can believe that! Anything else I can assist with?"
  }
  
  // Default response with context awareness
  const contextualResponse = getContextualResponse(context)
  return `I say, that's an interesting question! ${contextualResponse} I'm rather good at these relocation chats, but if you'd prefer a human touch, our team is always available on +44 20 7946 0958. What particular aspect of London living has caught your attention?`
}

const getContextualResponse = (context: any): string => {
  if (!context?.page) return "Whether it's finding the perfect pied-à-terre, navigating the visa maze, or exploring partnership opportunities, I'm at your service."
  
  const page = context.page.toLowerCase()
  
  if (page.includes('concierge') || page.includes('service')) {
    return "Ah, browsing our concierge services, I see! Excellent choice. We've got everything from my digital assistance to full white-glove treatment - rather like having your own personal relocation valet."
  }
  
  if (page.includes('partner')) {
    return "I notice you're exploring our partnership opportunities - how exciting! Our Lead Machine and Market Dominator programmes are quite the ticket for ambitious relocation specialists."
  }
  
  if (page.includes('directory')) {
    return "Splendid, you've found our directory! Over 500 carefully vetted London service providers at your fingertips. Think of it as the Yellow Pages, but infinitely more useful and considerably less yellow."
  }
  
  if (page.includes('corporate')) {
    return "Corporate solutions, I see! Wonderful. We've handled relocations for some rather impressive Fortune 500 companies. Executive moves are our specialty - we do love a good challenge."
  }
  
  return "I'm here to chat about any aspect of your London adventure."
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation = [], context = {} } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Generate AI response based on the user's message and context
    const response = generateAIResponse(message, context)

    // Log the conversation for analytics (optional)
    console.log('Voice Agent Interaction:', {
      timestamp: new Date().toISOString(),
      userMessage: message,
      agentResponse: response,
      context: context
    })

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
      conversationId: context.conversationId || `conv_${Date.now()}`,
      metadata: {
        confidence: 0.95,
        responseTime: Date.now(),
        context: context.page
      }
    })

  } catch (error) {
    console.error('Voice Agent API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Voice agent temporarily unavailable',
        response: "I'm sorry, I'm having technical difficulties right now. Please call our team directly at +44 20 7946 0958 for immediate assistance.",
        fallback: true
      },
      { status: 500 }
    )
  }
}