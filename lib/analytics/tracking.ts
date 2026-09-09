/**
 * Advanced Analytics Configuration for Luxury Brand Tracking
 * Vercel Analytics + Google Analytics with luxury positioning insights
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: { track: (event: string, properties?: Record<string, unknown>) => void }
  }
}

// Analytics Events for Luxury Brand Tracking
export const luxuryTrackingEvents = {
  // Premium engagement tracking
  LUXURY_INQUIRY: 'luxury_inquiry_submitted',
  CORPORATE_CONSULTATION: 'corporate_consultation_requested', 
  VIP_DIRECTORY_ACCESS: 'vip_directory_access_upgraded',
  EXECUTIVE_PACKAGE_VIEW: 'executive_package_viewed',
  FORTUNE_500_FORM: 'fortune_500_form_started',
  
  // Partner network tracking
  PARTNER_APPLICATION: 'partner_application_started',
  LEAD_MACHINE_SIGNUP: 'lead_machine_signup_completed',
  MARKET_DOMINATOR_SIGNUP: 'market_dominator_signup_completed',
  
  // AI concierge tracking
  AI_CONSULTATION_START: 'ai_consultation_started',
  PROPERTY_SEARCH_INITIATED: 'property_search_initiated',
  VOICE_DEMO_COMPLETED: 'voice_demo_completed',
  
  // Directory engagement
  DIRECTORY_SEARCH: 'directory_search_performed',
  PARTNER_PROFILE_VIEW: 'partner_profile_viewed',
  DIRECTORY_UPGRADE: 'directory_access_upgraded',
  
  // Conversion funnel
  WAITLIST_JOIN: 'waitlist_joined',
  PREMIUM_CONSULTATION: 'premium_consultation_booked',
  EXECUTIVE_BRIEF_DOWNLOAD: 'executive_brief_downloaded',
  CORPORATE_BROCHURE_DOWNLOAD: 'corporate_brochure_downloaded'
} as const

export interface LuxuryAnalyticsEvent {
  event: string
  properties: {
    category: 'luxury' | 'corporate' | 'partner' | 'directory' | 'ai'
    label?: string
    value?: number
    tier?: 'standard' | 'premium' | 'executive' | 'vip'
    clientType?: 'individual' | 'corporate' | 'fortune500'
    revenue?: number
    currency?: 'GBP' | 'USD' | 'EUR'
  }
}

// Google Analytics 4 Configuration
export const GA4_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  config: {
    // Enhanced e-commerce for luxury services
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
    
    // Custom dimensions for luxury positioning
    custom_map: {
      custom_dimension_1: 'client_tier',      // standard, premium, executive
      custom_dimension_2: 'service_category', // relocation, corporate, directory
      custom_dimension_3: 'lead_source',      // organic, paid, referral, ai_mention
      custom_dimension_4: 'company_size',     // startup, mid_market, enterprise, fortune_500
      custom_dimension_5: 'relocation_type'  // individual, corporate, executive, c_suite
    }
  }
}

// Track luxury brand interactions
export const trackLuxuryEvent = (event: LuxuryAnalyticsEvent) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.event, {
      event_category: event.properties.category,
      event_label: event.properties.label,
      value: event.properties.value,
      currency: event.properties.currency || 'GBP',
      custom_dimension_1: event.properties.tier,
      custom_dimension_2: event.properties.category,
      custom_dimension_4: event.properties.clientType,
      custom_dimension_5: event.properties.clientType
    })
  }
  
  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va.track(event.event, event.properties)
  }
  
  // Console logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🏛️ Luxury Analytics Event:', event)
  }
}

// Enhanced conversion tracking for luxury services
export const trackConversion = (
  eventName: string, 
  value: number, 
  tier: 'standard' | 'premium' | 'executive' | 'vip',
  currency: 'GBP' | 'USD' | 'EUR' = 'GBP'
) => {
  trackLuxuryEvent({
    event: 'conversion',
    properties: {
      category: 'luxury',
      label: eventName,
      value,
      tier,
      currency,
      revenue: value
    }
  })
  
  // Enhanced e-commerce tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `luxury_${Date.now()}`,
      value,
      currency,
      items: [{
        item_id: eventName,
        item_name: `Luxury ${tier} Service`,
        category: 'Relocation Services',
        price: value,
        quantity: 1
      }]
    })
  }
}

// Page view tracking with luxury context
export const trackLuxuryPageView = (
  page: string, 
  title: string,
  category: 'luxury' | 'corporate' | 'partner' | 'directory' | 'ai'
) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA4_CONFIG.measurementId, {
      page_title: title,
      page_location: window.location.href,
      custom_dimension_2: category
    })
  }
  
  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va.track('pageview', {
      page,
      title,
      category,
      url: window.location.href,
      referrer: document.referrer
    })
  }
}

// A/B testing for luxury positioning
export const luxuryABTests = {
  HERO_MESSAGING: 'luxury_hero_messaging',
  PRICING_DISPLAY: 'luxury_pricing_display', 
  CTA_POSITIONING: 'luxury_cta_positioning',
  TESTIMONIAL_FORMAT: 'luxury_testimonial_format'
} as const

export const trackABTest = (
  testName: string,
  variant: string,
  category: string
) => {
  trackLuxuryEvent({
    event: 'ab_test_viewed',
    properties: {
      category: category as any,
      label: `${testName}_${variant}`,
      tier: 'premium'
    }
  })
}

// Performance monitoring for luxury UX
export const trackPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    if (navigation) {
      trackLuxuryEvent({
        event: 'navigation_timing',
        properties: {
          category: 'luxury',
          label: 'TTFB',
          value: Math.round(navigation.responseStart)
        }
      })
    }
  }
}
