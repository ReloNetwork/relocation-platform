'use client'

import type { CommercialEventName } from '@/lib/commercial-events'

let pageSessionId: string | undefined

function campaignValue(params: URLSearchParams, key: string) {
  return params.get(key)?.slice(0, 120) || undefined
}

export function trackCommercialEvent(
  event: CommercialEventName,
  journey: 'newsletter' | 'ask_relo' | 'relocation' | 'partner',
  metadata: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === 'undefined') return
  pageSessionId ||= crypto.randomUUID()
  const params = new URLSearchParams(window.location.search)
  let referrerHost: string | undefined
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname : undefined
  } catch {
    referrerHost = undefined
  }

  const body = {
    event,
    journey,
    sessionId: pageSessionId,
    path: window.location.pathname,
    referrerHost,
    utmSource: campaignValue(params, 'utm_source'),
    utmMedium: campaignValue(params, 'utm_medium'),
    utmCampaign: campaignValue(params, 'utm_campaign'),
    metadata,
  }

  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => undefined)
}
