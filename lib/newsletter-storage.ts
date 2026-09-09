// Simple newsletter subscription storage
// This stores subscriptions in Supabase for now

import { createClient } from '@supabase/supabase-js'

let supabase: any = null

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
} catch (error) {
  console.warn('Newsletter storage: Supabase not available due to missing keys')
}

export interface NewsletterSubscription {
  email: string
  name?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  subscription_date?: string
  source_page?: string
}

export async function storeNewsletterSubscription(subscription: NewsletterSubscription) {
  if (!supabase) {
    return { success: false, message: 'Newsletter service is unavailable' }
  }

  try {
    // First, check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', subscription.email)
      .maybeSingle()

    if (existing) {
      return { success: true, message: 'Already subscribed' }
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: subscription.email,
        name: subscription.name,
        source: subscription.source || 'website',
        utm_source: subscription.utm_source || 'website',
        utm_medium: subscription.utm_medium || 'organic',
        utm_campaign: subscription.utm_campaign,
        subscription_date: subscription.subscription_date || new Date().toISOString(),
        source_page: subscription.source_page,
        status: 'active',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error storing newsletter subscription:', error)
      return { success: false, message: 'Unable to save subscription' }
    }

    return { success: true, message: 'Successfully subscribed', data }
  } catch (error) {
    console.error('Newsletter storage error:', error)
    return { success: false, message: 'Unable to save subscription' }
  }
}

export async function getNewsletterSubscriptions() {
  if (!supabase) {
    return { success: false, data: [] }
  }

  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching newsletter subscriptions:', error)
      return { success: false, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Newsletter fetch error:', error)
    return { success: false, data: [] }
  }
}

export async function getNewsletterCount() {
  if (!supabase) {
    return 0
  }

  try {
    const { count, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    if (error) {
      console.error('Error counting newsletter subscriptions:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Newsletter count error:', error)
    return 0
  }
}
