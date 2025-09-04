// Analytics tracking for conversion optimization
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, properties)
  }

  // Custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties: {
          ...properties,
          timestamp: Date.now(),
          url: window.location.href,
          referrer: document.referrer
        }
      })
    }).catch(console.error)
  }
}

// Conversion tracking
export const trackConversion = (type: 'partner_signup' | 'voice_subscription' | 'directory_subscription' | 'corporate_inquiry', value?: number) => {
  trackEvent('conversion', {
    conversion_type: type,
    value: value || 0,
    currency: 'GBP'
  })
}

// Page view tracking
export const trackPageView = (page: string) => {
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: page
  })
}

// Pricing interaction tracking
export const trackPricingInteraction = (action: 'view' | 'click' | 'upgrade', plan: string, page: string) => {
  trackEvent('pricing_interaction', {
    action,
    plan,
    page,
    timestamp: Date.now()
  })
}

// Lead generation tracking
export const trackLead = (source: 'partner' | 'voice' | 'directory' | 'corporate', email?: string) => {
  trackEvent('lead_generated', {
    source,
    has_email: !!email,
    timestamp: Date.now()
  })
}

// Revenue tracking
export const trackRevenue = (amount: number, currency: 'GBP' | 'USD', source: string, plan: string) => {
  trackEvent('purchase', {
    transaction_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    value: amount,
    currency,
    source,
    plan
  })
}

// Funnel tracking
export const trackFunnelStep = (step: string, funnel: 'partner' | 'voice' | 'directory' | 'corporate') => {
  trackEvent('funnel_step', {
    step,
    funnel,
    timestamp: Date.now()
  })
}

// Error tracking
export const trackError = (error: string, page: string, context?: Record<string, any>) => {
  trackEvent('error', {
    error_message: error,
    page,
    context: context || {}
  })
}

// Engagement tracking
export const trackEngagement = (action: string, element: string, value?: string | number) => {
  trackEvent('engagement', {
    action,
    element,
    value: value || null
  })
}

// Declare global types for analytics
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    fbq: (action: string, eventName: string, parameters?: any) => void
  }
}