'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { trackCommercialEvent } from '@/lib/commercial-analytics'

type FormStatus = {
  state: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export default function BriefSignup({ enabled }: { enabled: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>({ state: 'idle', message: '' })

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ state: 'submitting', message: 'Joining…' })

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'london-brief' }),
      })
      const body = await response.json()
      if (!response.ok || !body.success) {
        throw new Error(body.error || 'We could not add you just now.')
      }

      setEmail('')
      window.localStorage.setItem('relo_london_brief_subscribed', 'true')
      trackCommercialEvent('newsletter_submitted', 'newsletter')
      setStatus({
        state: 'success',
        message: 'You’re in. The next London Brief will arrive in your inbox.',
      })
    } catch (error) {
      setStatus({
        state: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not add you just now.',
      })
    }
  }

  if (!enabled) {
    return (
      <div className="brief-signup brief-signup--paused">
        <label>THE LONDON BRIEF</label>
        <p>
          Email sign-ups will open shortly. You can read the Journal now.
        </p>
        <Link href="/journal">BROWSE THE JOURNAL →</Link>
      </div>
    )
  }

  return (
    <form onSubmit={subscribe} className="brief-signup">
      <label htmlFor="brief-email">
        The London email you will actually look forward to.
      </label>
      <div>
        <input
          id="brief-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          autoComplete="email"
          required
        />
        <button type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'JOINING' : 'JOIN THE BRIEF'}
        </button>
      </div>
      <p
        className={`brief-signup__status is-${status.state}`}
        aria-live="polite"
      >
        {status.message || 'Thoughtfully chosen. Delivered directly to your inbox.'}
      </p>
    </form>
  )
}
