import { describe, expect, it } from 'vitest'
import { getRouteDecision } from '@/lib/route-policy'

const production = { isProduction: true, devToolsEnabled: false }

describe('route lifecycle policy', () => {
  it('keeps the redesigned public and conversion journeys indexable', () => {
    expect(getRouteDecision('/move', production)).toEqual({ action: 'allow', indexable: true })
    expect(getRouteDecision('/executive-intake', production)).toEqual({ action: 'allow', indexable: true })
    expect(getRouteDecision('/newsletter/mayfair-guide', production)).toEqual({ action: 'allow', indexable: true })
    expect(getRouteDecision('/partner-application/', production)).toEqual({ action: 'allow', indexable: true })
  })

  it('redirects superseded public journeys to their editorial equivalents', () => {
    expect(getRouteDecision('/concierge', production)).toEqual({ action: 'redirect', destination: '/ask-relo' })
    expect(getRouteDecision('/directory', production)).toEqual({ action: 'redirect', destination: '/network' })
    expect(getRouteDecision('/book-consultation', production)).toEqual({ action: 'redirect', destination: '/executive-intake' })
    expect(getRouteDecision('/newsletter/get-started', production)).toEqual({ action: 'redirect', destination: '/newsletter' })
    expect(getRouteDecision('/api/newsletter-signup', production)).toEqual({ action: 'redirect', destination: '/api/newsletter/subscribe' })
  })

  it('retires obsolete pages and hides mock APIs in production', () => {
    expect(getRouteDecision('/demo-dashboard', production)).toEqual({ action: 'gone' })
    expect(getRouteDecision('/partners/lead-machine', production)).toEqual({ action: 'gone' })
    expect(getRouteDecision('/api/partners/recommendations', production)).toEqual({ action: 'not-found' })
    expect(getRouteDecision('/api/tasks/123', production)).toEqual({ action: 'not-found' })
    expect(getRouteDecision('/api/beehiiv/launch-distribution', production)).toEqual({ action: 'not-found' })
    expect(getRouteDecision('/api/partners/applications', production)).toEqual({ action: 'not-found' })
    expect(getRouteDecision('/api/partners/checkout/founding-partner', production)).toEqual({ action: 'not-found' })
  })

  it('allows development diagnostics only when explicitly enabled outside production', () => {
    expect(getRouteDecision('/debug-auth', production)).toEqual({ action: 'not-found' })
    expect(getRouteDecision('/debug-auth', { isProduction: false, devToolsEnabled: true })).toEqual({
      action: 'allow',
      indexable: false,
    })
  })

  it('keeps private and unknown application routes reachable but out of search', () => {
    expect(getRouteDecision('/admin', production)).toEqual({ action: 'allow', indexable: false })
    expect(getRouteDecision('/checkout/success', production)).toEqual({ action: 'allow', indexable: false })
    expect(getRouteDecision('/future-route', production)).toEqual({ action: 'allow', indexable: false })
    expect(getRouteDecision('/partner-application/media-pack', production)).toEqual({ action: 'allow', indexable: false })
  })
})
