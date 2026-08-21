'use client'

import { FormEvent, useState } from 'react'
import Layout from '@/components/Layout'

type Status = { state: 'idle' | 'submitting' | 'success' | 'error'; message: string }

export default function PartnerApplicationPage() {
  const [status, setStatus] = useState<Status>({ state: 'idle', message: '' })

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ state: 'submitting', message: 'Sending your enquiry…' })
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/partner-application/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await response.json()
      if (!response.ok || !body.success) throw new Error(body.message || 'Your enquiry could not be sent.')

      form.reset()
      setStatus({
        state: 'success',
        message: 'Thank you. We’ll review the fit and reply with the relevant partner brief.',
      })
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Your enquiry could not be sent.',
      })
    }
  }

  return (
    <Layout>
      <main>
        <section className="partner-editorial-hero">
          <span className="vertical-label">PARTNERS</span>
          <div>
            <span className="brief-eyebrow">THE RELO NETWORK</span>
            <h1>BE USEFUL.<br />BE REMEMBERED.</h1>
          </div>
          <p>
            We work with selected businesses whose expertise helps international professionals and families make better decisions about London.
          </p>
        </section>

        <section className="partner-editorial-body">
          <div className="partner-editorial-notes">
            <span>WAYS TO WORK TOGETHER</span>
            <h2>Expertise before exposure.</h2>
            <p>Editorial partnerships can include useful sponsored briefings, newsletter placements and carefully disclosed brand collaborations.</p>
            <ul>
              <li>Editorial and newsletter sponsorship</li>
              <li>Neighbourhood and service briefings</li>
              <li>Ask Relo knowledge collaborations</li>
              <li>Vetted professional network enquiries</li>
            </ul>
            <small>Paid placement never guarantees a client introduction or overrides our independent recommendations.</small>
          </div>

          <form className="partner-editorial-form" onSubmit={submit}>
            <div className="partner-editorial-form__row">
              <label>
                Your name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Work email
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <div className="partner-editorial-form__row">
              <label>
                Company
                <input name="company" autoComplete="organization" required />
              </label>
              <label>
                Website
                <input name="website" type="url" placeholder="https://" />
              </label>
            </div>
            <label>
              Area of expertise
              <input name="serviceCategory" placeholder="Property, education, legal, lifestyle…" required />
            </label>
            <label>
              What are you interested in?
              <select name="partnershipInterest" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="editorial">Editorial or newsletter partnership</option>
                <option value="network">Professional network</option>
                <option value="ask-relo">Ask Relo knowledge collaboration</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </label>
            <label>
              Tell us about the fit
              <textarea name="message" rows={6} required placeholder="Your audience, London expertise and what a useful collaboration could look like." />
            </label>
            <label className="partner-editorial-form__consent">
              <input name="consent" type="checkbox" value="yes" required />
              <span>I agree that The Relo Network may use these details to respond to this enquiry.</span>
            </label>
            <button type="submit" disabled={status.state === 'submitting'}>
              {status.state === 'submitting' ? 'SENDING' : 'REQUEST THE PARTNER BRIEF'}
            </button>
            <p className={`partner-editorial-form__status is-${status.state}`} aria-live="polite">
              {status.message}
            </p>
          </form>
        </section>
      </main>
    </Layout>
  )
}
