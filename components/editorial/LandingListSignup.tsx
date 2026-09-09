'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { trackCommercialEvent } from '@/lib/commercial-analytics';

export default function LandingListSignup({ enabled = true }: { enabled?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'london-landing-list',
        campaign: 'london-landing-list',
      }),
    });
    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) trackCommercialEvent('landing_list_submitted', 'newsletter');
  }
  if (status === 'success')
    return (
      <p className="signup-success">Your London Landing List is on its way.</p>
    );
  if (!enabled)
    return (
      <div className="landing-signup landing-signup--paused">
        <label>THE LONDON LANDING LIST</label>
        <p>We are preparing the list. Read the Journal while sign-ups are closed.</p>
        <Link href="/journal">READ THE JOURNAL →</Link>
      </div>
    );
  return (
    <form className="landing-signup" onSubmit={submit}>
      <label htmlFor="landing-email">THE LONDON LANDING LIST</label>
      <p>Thirty things to decide before you move to London.</p>
      <div>
        <input
          required
          type="email"
          id="landing-email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
        />
        <button disabled={status === 'loading'}>
          {status === 'loading' ? 'SENDING…' : 'SEND THE LIST →'}
        </button>
      </div>
      {status === 'error' && (
        <small>Something went wrong. Please try again.</small>
      )}
    </form>
  );
}
