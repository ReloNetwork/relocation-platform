'use client'

import { FormEvent, useRef, useState } from 'react'
import Layout from '@/components/Layout'
import { trackCommercialEvent } from '@/lib/commercial-analytics'

type Status = {
  state: 'idle' | 'submitting' | 'success' | 'error'
  message: string
  referenceId?: string
  mediaPackUrl?: string
}

export default function PartnerApplicationPage() {
  const [status, setStatus] = useState<Status>({ state: 'idle', message: '' })
  const started = useRef(false)

  const markStarted = () => {
    if (started.current) return
    started.current = true
    trackCommercialEvent('partner_application_started', 'partner')
  }

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
      trackCommercialEvent('partner_application_submitted', 'partner', {
        interest: String(data.partnershipInterest || ''),
      })
      setStatus({
        state: 'success',
        message: 'Thank you. We have your application. You can now view the partner brief.',
        referenceId: body.referenceId,
        mediaPackUrl: body.mediaPackUrl,
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
            <h1>REACH PEOPLE<br />MOVING TO LONDON.</h1>
          </div>
          <p>
            We work with selected businesses that can give useful information or services to professionals and families moving to London.
          </p>
        </section>

        <section className="partner-editorial-body">
          <div className="partner-editorial-notes">
            <span>WAYS TO WORK WITH US</span>
            <h2>Choose a clear place to start.</h2>
            <p>Options include business profiles, newsletter messages, sponsored guides and longer content series. Prices start at £650.</p>
            <ul>
              <li>Reviewed business profile from £650 a year</li>
              <li>London Brief partner message from £750 an issue</li>
              <li>Sponsored Journal article from £1,750</li>
              <li>Clear reporting after the work is published</li>
            </ul>
            <small>Every paid feature is labelled. Payment does not guarantee a client introduction and never changes our independent recommendations.</small>
          </div>

          <form className="partner-editorial-form" onSubmit={submit} onFocusCapture={markStarted}>
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
            <label>
              Your role
              <select name="role" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="founder">Founder or owner</option>
                <option value="marketing">Marketing lead</option>
                <option value="partnerships">Partnerships lead</option>
                <option value="agency">Agency representative</option>
                <option value="other">Other</option>
              </select>
            </label>
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
                <input name="serviceCategory" placeholder="For example, property, education, legal or lifestyle" required />
            </label>
            <label>
              What are you interested in?
              <select name="partnershipInterest" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="editorial">Sponsored Journal article</option>
                <option value="newsletter">The London Brief sponsorship</option>
                <option value="network">A reviewed Network profile</option>
                <option value="ask-relo">Ask Relo partner space</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </label>
            <label>
              Do you currently serve international professionals or families moving to London?
              <select name="audienceFit" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="yes">Yes, this is a core audience</option>
                <option value="partly">Partly, and we want to grow it</option>
                <option value="not-yet">Not yet</option>
              </select>
            </label>
            <div className="partner-editorial-form__row">
              <label>
                What would you like to achieve?
                <select name="objective" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option value="authority">Build trust in our area of expertise</option>
                  <option value="reach">Reach the right audience</option>
                  <option value="enquiries">Receive relevant enquiries</option>
                  <option value="thought-leadership">Explain our expertise clearly</option>
                  <option value="knowledge">Share useful information Relo can check</option>
                </select>
              </label>
              <label>
                Working budget
                <select name="budget" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option value="under-2500">Under £2,500</option>
                  <option value="2500-5000">£2,500–£5,000</option>
                  <option value="5000-15000">£5,000–£15,000</option>
                  <option value="15000-plus">£15,000+</option>
                  <option value="unsure">Not yet defined</option>
                </select>
              </label>
            </div>
            <label>
              Preferred timing
              <select name="timing" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="0-30">Within 30 days</option>
                <option value="31-90">Within 31–90 days</option>
                <option value="90-plus">More than 90 days</option>
                <option value="exploring">Exploring for now</option>
              </select>
            </label>
            <label>
              How could this help our readers?
              <textarea name="message" rows={6} required placeholder="Tell us who you help, what you know well and what you would like to create with us." />
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
              {status.referenceId ? <> Reference: <strong>{status.referenceId}</strong>.</> : null}
            </p>
            {status.mediaPackUrl ? (
              <a className="partner-editorial-form__download" href={status.mediaPackUrl}>
                VIEW THE PARTNER MEDIA PACK
              </a>
            ) : null}
          </form>
        </section>
      </main>
    </Layout>
  )
}
