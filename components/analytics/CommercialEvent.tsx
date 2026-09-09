'use client'

import { useEffect } from 'react'
import { trackCommercialEvent } from '@/lib/commercial-analytics'
import type { CommercialEventName } from '@/lib/commercial-events'

export default function CommercialEvent({ event, journey }: {
  event: CommercialEventName
  journey: 'newsletter' | 'ask_relo' | 'relocation' | 'partner'
}) {
  useEffect(() => trackCommercialEvent(event, journey), [event, journey])
  return null
}
