'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { trackCommercialEvent } from '@/lib/commercial-analytics';

const VIEWED_ARTICLES_KEY = 'relo_viewed_london_guides';
const SUBSCRIBED_KEY = 'relo_london_brief_subscribed';
const DISMISSED_KEY = 'relo_london_brief_prompt_dismissed_at';
const DISMISS_FOR_MS = 30 * 24 * 60 * 60 * 1000;

type PromptStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ArticleSubscriptionPrompt({
  slug,
  enabled,
}: {
  slug: string;
  enabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<PromptStatus>('idle');
  const [message, setMessage] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enabled || window.localStorage.getItem(SUBSCRIBED_KEY) === 'true') {
      return;
    }

    const dismissedAt = Number(
      window.localStorage.getItem(DISMISSED_KEY) || '0'
    );
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_FOR_MS) return;

    let viewed: string[] = [];
    try {
      viewed = JSON.parse(
        window.localStorage.getItem(VIEWED_ARTICLES_KEY) || '[]'
      );
    } catch {
      viewed = [];
    }

    const nextViewed = Array.from(new Set([...viewed, slug])).slice(-12);
    window.localStorage.setItem(VIEWED_ARTICLES_KEY, JSON.stringify(nextViewed));

    if (nextViewed.length < 3) return;
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, [enabled, slug]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setOpen(false);
  };

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('Joining…');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'three-guide-prompt' }),
      });
      const body = await response.json();
      if (!response.ok || !body.success) {
        throw new Error(body.error || 'We could not add you just now.');
      }

      window.localStorage.setItem(SUBSCRIBED_KEY, 'true');
      trackCommercialEvent('newsletter_submitted', 'newsletter');
      setEmail('');
      setStatus('success');
      setMessage('You’re in. The next London Brief will arrive in your inbox.');
      window.setTimeout(() => setOpen(false), 1800);
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not add you just now.'
      );
    }
  };

  if (!open) return null;

  return (
    <div className="article-subscribe" role="presentation">
      <button
        className="article-subscribe__backdrop"
        type="button"
        aria-label="Close The London Brief invitation"
        onClick={dismiss}
      />
      <section
        className="article-subscribe__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-subscribe-title"
      >
        <div className="article-subscribe__image" aria-hidden="true">
          <Image
            src="/images/editorial/london-arrival-cinematic.webp"
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 42vw"
          />
          <span>THE LONDON BRIEF</span>
        </div>
        <div className="article-subscribe__content">
          <button
            ref={closeButtonRef}
            className="article-subscribe__close"
            type="button"
            onClick={dismiss}
            aria-label="Close The London Brief invitation"
          >
            ×
          </button>
          <div className="article-subscribe__brand" aria-label="The Relo Network">
            <span aria-hidden="true">R</span>
            THE RELO NETWORK
          </div>
          <p className="article-subscribe__eyebrow">YOU HAVE FOUND YOUR WAY AROUND</p>
          <h2 id="article-subscribe-title">Keep London within reach.</h2>
          <p>
            You have read three of our London guides. Join The London Brief for
            neighbourhood notes, practical moving advice and places worth
            knowing, thoughtfully chosen and sent directly to you.
          </p>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="article-subscribe-email">
              Email address
            </label>
            <input
              id="article-subscribe-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              autoComplete="email"
              required
            />
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'JOINING' : 'JOIN THE LONDON BRIEF'}
            </button>
          </form>
          <p
            className={`article-subscribe__status is-${status}`}
            aria-live="polite"
          >
            {message || 'Useful London guidance, delivered with care.'}
          </p>
          <button
            className="article-subscribe__continue"
            type="button"
            onClick={dismiss}
          >
            Continue reading
          </button>
        </div>
      </section>
    </div>
  );
}
