'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { articleUrl, editorialArticles } from '@/lib/editorial-articles'

type FormStatus = { state: 'idle' | 'submitting' | 'success' | 'error'; message: string }

export default function NewsletterPage() {
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
      if (!response.ok || !body.success) throw new Error(body.error || 'We could not add you just now.')

      setEmail('')
      setStatus({ state: 'success', message: 'You’re on the list. Look out for The London Brief.' })
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'We could not add you just now.',
      })
    }
  }

  return (
    <Layout>
      <main>
        <section className="brief-hero">
          <span className="vertical-label">JOURNAL</span>
          <div>
            <span className="brief-eyebrow">THE LONDON BRIEF</span>
            <h1>A CITY WORTH READING.</h1>
            <p>
              Neighbourhood intelligence, relocation guidance and selected expertise for people making London home.
            </p>
          </div>
          <form onSubmit={subscribe} className="brief-signup">
            <label htmlFor="brief-email">Delivered thoughtfully, never noisily.</label>
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
                {status.state === 'submitting' ? 'JOINING' : 'SUBSCRIBE'}
              </button>
            </div>
            <p className={`brief-signup__status is-${status.state}`} aria-live="polite">
              {status.message || 'Free to join. Unsubscribe at any time.'}
            </p>
          </form>
        </section>

        <section className="brief-archive">
          <div className="brief-archive__heading">
            <span>01</span>
            <h2>THE ARCHIVE</h2>
          </div>
          <div className="brief-archive__grid">
            {editorialArticles.map((article) => (
              <article key={article.slug}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={articleUrl(article.slug)}>Read the briefing <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
