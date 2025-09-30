// Simple analytics tracking for Relo Network
// This will help track conversion funnel for the £50K weekly target

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: number
}

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production'
  private userId: string | null = null
  private sessionId: string
  
  constructor() {
    this.sessionId = this.generateSessionId()
    
    // Initialize user ID from localStorage if available
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('relo_user_id')
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Set user ID for tracking
  identify(userId: string) {
    this.userId = userId
    if (typeof window !== 'undefined') {
      localStorage.setItem('relo_user_id', userId)
    }
  }

  // Track events
  track(event: string, properties: Record<string, any> = {}) {
    const eventData: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        userId: this.userId,
        url: typeof window !== 'undefined' ? window.location.href : null,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : null,
        timestamp: Date.now()
      },
      timestamp: Date.now()
    }

    // Log to console in development
    if (!this.isProduction) {
      console.log('📊 Analytics Event:', eventData)
    }

    // Send to your analytics endpoint
    this.sendEvent(eventData)
  }

  private async sendEvent(eventData: AnalyticsEvent) {
    try {
      // You can replace this with your preferred analytics service
      // For now, we'll store locally and could batch send later
      if (typeof window !== 'undefined') {
        const events = JSON.parse(localStorage.getItem('relo_analytics_events') || '[]')
        events.push(eventData)
        
        // Keep only last 100 events to prevent localStorage bloat
        if (events.length > 100) {
          events.splice(0, events.length - 100)
        }
        
        localStorage.setItem('relo_analytics_events', JSON.stringify(events))
      }

      // In production, send to your analytics service
      if (this.isProduction) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        }).catch(err => console.warn('Analytics send failed:', err))
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error)
    }
  }

  // Conversion funnel tracking methods
  trackPageView(page: string) {
    this.track('Page View', { page })
  }

  trackReloAIInteraction(question: string, response?: string) {
    this.track('Relo AI Interaction', { 
      question: question.substring(0, 100), // Truncate for privacy
      hasResponse: !!response,
      questionLength: question.length
    })
  }

  trackVoiceCallStarted() {
    this.track('Voice Call Started')
  }

  trackVoiceCallEnded(duration: number) {
    this.track('Voice Call Ended', { duration })
  }

  trackServiceInterest(serviceType: string, price?: number) {
    this.track('Service Interest', { serviceType, price })
  }

  trackLeadCapture(method: string, email?: string) {
    this.track('Lead Captured', { 
      method, 
      hasEmail: !!email 
    })
  }

  trackFormSubmission(formType: string, success: boolean) {
    this.track('Form Submission', { formType, success })
  }

  trackPartnerInterest(partnerType: string) {
    this.track('Partner Interest', { partnerType })
  }

  trackPricingView(tier: string) {
    this.track('Pricing Viewed', { tier })
  }

  trackContactAttempt(method: string) {
    this.track('Contact Attempt', { method })
  }

  // Get analytics data for reporting
  getAnalyticsData(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('relo_analytics_events') || '[]')
  }

  // Clear analytics data
  clearAnalyticsData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('relo_analytics_events')
    }
  }
}

// Create singleton instance
const analytics = new Analytics()

export default analytics

// Convenience hooks for React components
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    identify: analytics.identify.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackReloAIInteraction: analytics.trackReloAIInteraction.bind(analytics),
    trackVoiceCallStarted: analytics.trackVoiceCallStarted.bind(analytics),
    trackVoiceCallEnded: analytics.trackVoiceCallEnded.bind(analytics),
    trackServiceInterest: analytics.trackServiceInterest.bind(analytics),
    trackLeadCapture: analytics.trackLeadCapture.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackPartnerInterest: analytics.trackPartnerInterest.bind(analytics),
    trackPricingView: analytics.trackPricingView.bind(analytics),
    trackContactAttempt: analytics.trackContactAttempt.bind(analytics)
  }
}