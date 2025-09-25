// Retell AI Integration for Relo Voice Agent

export interface RetellConfig {
  apiKey: string
  agentId?: string
}

export interface CallSession {
  callId: string
  status: 'connecting' | 'active' | 'ended'
  duration?: number
  transcript?: string[]
  metadata?: {
    userType?: string
    inquiryType?: string
    location?: string
  }
}

export class RetellAI {
  private apiKey: string
  private baseUrl = 'https://api.retellai.com'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.RETELL_API_KEY || ''
  }

  // Create a new voice agent specifically for Relo
  async createReloAgent(): Promise<string> {
    const agentConfig = {
      agent_name: "Relo - London Relocation Assistant",
      voice_id: "11labs-Adrian", // Professional British voice
      voice_temperature: 0.7,
      voice_speed: 1.0,
      responsiveness: 0.8,
      interruption_sensitivity: 0.7,
      language: "en-GB",
      llm_websocket_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/retell/llm-websocket`,
      agent_prompt: `You are Relo, a sophisticated AI assistant specializing in luxury London relocations. You work for Relo Network, London's most exclusive relocation service.

## Your Role:
- Expert advisor on all aspects of London relocation
- Professional, knowledgeable, and reassuring tone
- British accent and terminology preferred
- Focus on high-net-worth individuals and corporate executives

## Core Services You Help With:
1. **Property Search** - Prime areas, market insights, budget planning
2. **Visa & Immigration** - Requirements, timelines, legal processes  
3. **Education** - International schools, admissions, catchment areas
4. **Banking & Finance** - Account setup, wealth management, tax implications
5. **Transport** - Optimal travel routes, car vs public transport
6. **Lifestyle Integration** - Cultural adaptation, networking, amenities

## Key Knowledge Base:
- **Prime Areas**: Marylebone (£1,200-£2,000/sq ft), Kensington (£1,500-£3,000/sq ft), Canary Wharf (£800-£1,400/sq ft)
- **Transport**: Zone 1-2 focus, £1,576 annual travelcard, congestion charges
- **Schools**: American School London, International School London, Francis Holland
- **Visa Types**: Skilled Worker, Global Talent, Investment, Intra-company Transfer
- **Banking**: HSBC Expat, Barclays International, private banking options

## Conversation Style:
- Start with warm greeting and ask how you can help with their London move
- Ask qualifying questions to understand their specific needs
- Provide detailed, actionable advice with specific examples
- Offer to connect them with relevant Relo Network partners
- Always end with next steps or offering a consultation

## Partner Network:
- Prime Properties London (luxury property search)
- Elite Immigration Advisors (visa specialists)  
- Sterling Wealth Management (banking & finance)
- Education Consultants (school placement)
- Executive Transport Services

## Call Flow:
1. Greeting + qualification (individual/corporate, timeline, budget range)
2. Detailed advice on their primary concern
3. Secondary questions about other relocation needs
4. Partner recommendations with specific next steps
5. Offer consultation booking or additional resources

Remember: You represent London's most exclusive relocation network. Maintain professionalism while being genuinely helpful and knowledgeable.`,

      begin_message: "Hello! I'm Relo, your personal London relocation assistant. I'm here to help make your move to London effortless and successful. Whether you're looking for property advice, visa guidance, or insights into London life, I'm here to help. What aspect of your London relocation can I assist you with today?",

      general_prompt: "Maintain your role as an expert London relocation advisor. Always be helpful, professional, and focus on providing actionable advice. If asked about topics outside relocation, gently redirect to how it might relate to their London move.",

      general_tools: [
        {
          type: "end_call",
          name: "end_call",
          description: "End the call when the user indicates they're finished or satisfied with the consultation."
        }
      ],

      response_engine: {
        type: "retell-llm",
        llm_id: "gpt-4"
      },

      boosted_keywords: [
        "London", "relocation", "moving", "property", "visa", "immigration", 
        "schools", "education", "banking", "finance", "transport", "areas",
        "Marylebone", "Kensington", "Canary Wharf", "Greenwich", "consultation"
      ]
    }

    if (!this.apiKey) {
      // Demo mode - return mock agent ID
      console.log('Demo mode: Retell AI agent configuration:', agentConfig)
      return 'demo_agent_relo_london_001'
    }

    try {
      const response = await fetch(`${this.baseUrl}/v2/create-agent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agentConfig)
      })

      const data = await response.json()
      return data.agent_id
    } catch (error) {
      console.error('Failed to create Retell agent:', error)
      return 'demo_agent_relo_london_001'
    }
  }

  // Start a phone call with the Relo agent
  async startCall(phoneNumber: string, agentId: string): Promise<CallSession> {
    const callConfig = {
      from_number: process.env.RETELL_PHONE_NUMBER || '+442070000000',
      to_number: phoneNumber,
      agent_id: agentId,
      metadata: {
        service: 'relo_consultation',
        source: 'website',
        timestamp: new Date().toISOString()
      }
    }

    if (!this.apiKey) {
      // Demo mode
      const mockCall: CallSession = {
        callId: `demo_call_${Date.now()}`,
        status: 'connecting',
        metadata: {
          userType: 'demo',
          inquiryType: 'general',
          location: 'website'
        }
      }
      console.log('Demo mode: Starting call with config:', callConfig)
      return mockCall
    }

    try {
      const response = await fetch(`${this.baseUrl}/v2/create-phone-call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(callConfig)
      })

      const data = await response.json()
      
      return {
        callId: data.call_id,
        status: 'connecting',
        metadata: callConfig.metadata
      }
    } catch (error) {
      console.error('Failed to start Retell call:', error)
      throw new Error('Failed to initiate call')
    }
  }

  // Get call details and transcript
  async getCall(callId: string): Promise<CallSession | null> {
    if (!this.apiKey || callId.startsWith('demo_')) {
      // Demo mode
      return {
        callId,
        status: 'ended',
        duration: 180,
        transcript: [
          "Relo: Hello! I'm Relo, your personal London relocation assistant...",
          "User: Hi, I'm looking to move to London for work",
          "Relo: Excellent! I'd be happy to help with your relocation..."
        ],
        metadata: {
          userType: 'individual',
          inquiryType: 'corporate_relocation'
        }
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/get-call/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      const data = await response.json()
      
      return {
        callId: data.call_id,
        status: data.call_status,
        duration: data.duration,
        transcript: data.transcript,
        metadata: data.metadata
      }
    } catch (error) {
      console.error('Failed to get call details:', error)
      return null
    }
  }

  // Create web call (browser-to-agent)
  async createWebCall(agentId?: string): Promise<{ accessToken: string; callId: string }> {
    // Use existing agent if no specific agent provided
    const actualAgentId = agentId || 'agent_31b176c443ce1f449761c5a979'
    
    const webCallConfig = {
      agent_id: actualAgentId,
      metadata: {
        source: 'web_widget',
        timestamp: new Date().toISOString()
      }
    }

    // Always use production mode now that we have valid API key
    if (!this.apiKey) {
      throw new Error('Retell API key is required for web calls')
    }

    try {
      const response = await fetch(`${this.baseUrl}/v2/create-web-call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(webCallConfig)
      })

      const data = await response.json()
      
      return {
        accessToken: data.access_token,
        callId: data.call_id
      }
    } catch (error) {
      console.error('Failed to create web call:', error)
      throw new Error('Failed to create web call')
    }
  }
}

// Singleton instance
export const retellAI = new RetellAI()

// Utility functions - use the existing published agent
export async function startVoiceConsultation(phoneNumber: string): Promise<CallSession> {
  // Use the existing published agent ID directly
  const agentId = 'agent_31b176c443ce1f449761c5a979'
  return retellAI.startCall(phoneNumber, agentId)
}

export async function createWebVoiceCall(): Promise<{ accessToken: string; callId: string }> {
  // Use the existing published agent ID directly
  const agentId = 'agent_31b176c443ce1f449761c5a979'
  return retellAI.createWebCall(agentId)
}