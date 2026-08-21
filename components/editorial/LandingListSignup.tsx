'use client';

import { FormEvent, useState } from 'react';

export default function LandingListSignup() {
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
  }
  if (status === 'success')
    return (
      <p className="signup-success">Your London Landing List is on its way.</p>
    );
  return (
    <form className="landing-signup" onSubmit={submit}>
      <label htmlFor="landing-email">THE LONDON LANDING LIST</label>
      <p>Thirty decisions to make before London starts making them for you.</p>
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
