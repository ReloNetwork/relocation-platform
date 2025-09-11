import { NextRequest, NextResponse } from 'next/server'

// Simulated AI responses for voice agent
const generateAIResponse = (message: string, context: any): string => {
  const lowerMessage = message.toLowerCase()
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to Relo Network. I'm your personal AI assistant for London relocations. Whether you're looking for property advice, visa information, or partnership opportunities, I'm here to help 24/7."
  }
  
  // Property/accommodation queries
  if (lowerMessage.includes('property') || lowerMessage.includes('flat') || lowerMessage.includes('apartment') || lowerMessage.includes('house') || lowerMessage.includes('accommodation')) {
    return "I can help you find the perfect property in London! Our AI system analyzes over 150 factors including commute times, school ratings, and lifestyle preferences. Popular areas for relocations include Marylebone, Kensington, Canary Wharf, and Greenwich. Would you like me to connect you with our property specialists?"
  }
  
  // Pricing queries
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
    return "Our relocation services start from £295 per month for AI-powered guidance, £8,500 for managed service, and £15,000 for executive white-glove service. We also offer founding member rates with significant savings. Would you like detailed pricing information?"
  }
  
  // Partnership queries
  if (lowerMessage.includes('partner') || lowerMessage.includes('business') || lowerMessage.includes('lead') || lowerMessage.includes('referral')) {
    return "Excellent! We offer two main partnership tiers: Lead Machine at £497 per month with 8-15 guaranteed leads, and Market Dominator at £1,497 per month with exclusive category ownership. Both include founding member pricing until September 15th. Shall I connect you with our partnership team?"
  }
  
  // Visa/legal queries
  if (lowerMessage.includes('visa') || lowerMessage.includes('legal') || lowerMessage.includes('immigration') || lowerMessage.includes('permit')) {
    return "We provide comprehensive visa and legal support through our network of immigration specialists. This includes visa applications, document preparation, and ongoing compliance. Our success rate for visa applications is over 94%. Would you like to speak with our legal team?"
  }
  
  // School/education queries
  if (lowerMessage.includes('school') || lowerMessage.includes('education') || lowerMessage.includes('children') || lowerMessage.includes('kids')) {
    return "We specialize in school placement for international families! London has excellent state and independent schools. We'll help match your children with the right schools based on curriculum, location, and entry requirements. Our education specialists can arrange school visits and handle applications."
  }
  
  // Emergency/urgent queries
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('immediate') || lowerMessage.includes('asap') || lowerMessage.includes('quickly')) {
    return "I understand this is urgent. We offer emergency relocation services that can be completed in 14-21 days. Our priority response team is available 24/7. Let me connect you immediately with our emergency relocation specialists at +44 20 7946 0958."
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
    return "You're very welcome! I'm here whenever you need assistance with your London relocation. Remember, our human experts are also available 24/7 at +44 20 7946 0958. Is there anything else I can help you with today?"
  }
  
  // Default response with context awareness
  const contextualResponse = getContextualResponse(context)
  return `I'm here to help with your London relocation needs! ${contextualResponse} You can also call our expert team directly at +44 20 7946 0958 for immediate assistance. What would you like to know more about?`
}

const getContextualResponse = (context: any): string => {
  if (!context?.page) return "Whether you need property advice, visa guidance, or partnership information, I'm here to help."
  
  const page = context.page.toLowerCase()
  
  if (page.includes('concierge') || page.includes('service')) {
    return "I see you're looking at our concierge services. We offer AI-powered assistance, managed services, and executive white-glove solutions."
  }
  
  if (page.includes('partner')) {
    return "Since you're on our partners page, I can help you understand our Lead Machine and Market Dominator partnership opportunities."
  }
  
  if (page.includes('directory')) {
    return "Our directory gives you access to 500+ verified London service providers. Premium and VIP tiers include direct messaging and priority support."
  }
  
  if (page.includes('corporate')) {
    return "I see you're interested in corporate solutions. We specialize in executive relocations for Fortune 500 companies with proven ROI."
  }
  
  return "I can help with any aspect of your London relocation journey."
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