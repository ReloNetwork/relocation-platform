// Beehiiv integration utility

export interface BeehiivSubscriber {
  email: string
  name?: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  customFields?: Record<string, any>
}

export class BeehiivAPI {
  private apiKey: string
  private publicationId: string
  private baseUrl = 'https://api.beehiiv.com/v2'

  constructor(apiKey?: string, publicationId?: string) {
    this.apiKey = apiKey || process.env.BEEHIIV_API_KEY || ''
    this.publicationId = publicationId || process.env.BEEHIIV_PUBLICATION_ID || ''
  }

  async subscribe(subscriber: BeehiivSubscriber): Promise<{ success: boolean; error?: string }> {
    try {
      // For demo purposes, we'll simulate the API call
      // In production, you would replace this with actual Beehiiv API integration
      
      if (!this.apiKey || !this.publicationId) {
        console.log('Demo mode: Newsletter subscription simulation for:', subscriber.email)
        return { success: true }
      }

      const response = await fetch(`${this.baseUrl}/publications/${this.publicationId}/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscriber.email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: subscriber.utmSource,
          utm_medium: subscriber.utmMedium,
          utm_campaign: subscriber.utmCampaign,
          referring_site: subscriber.source,
          custom_fields: subscriber.customFields,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        return { success: false, error }
      }

      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getSubscriberCount(): Promise<number> {
    try {
      // For demo purposes, return a simulated count
      if (!this.apiKey || !this.publicationId) {
        return 2547 // Simulated subscriber count
      }

      const response = await fetch(`${this.baseUrl}/publications/${this.publicationId}/stats/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        return 0
      }

      const data = await response.json()
      return data.data?.total_subscriptions || 0
    } catch (error) {
      return 0
    }
  }
}

// Singleton instance
export const beehiiv = new BeehiivAPI()

// Utility function for easy subscription
export async function subscribeToNewsletter(
  email: string, 
  options: Omit<BeehiivSubscriber, 'email'> = {}
): Promise<{ success: boolean; error?: string }> {
  return beehiiv.subscribe({
    email,
    source: 'relo-network-website',
    utmSource: 'website',
    utmMedium: 'organic',
    ...options
  })
}