'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { makeProfessionalBrief, type ProfessionalBrief } from '@/lib/professional-brief'

const initial: ProfessionalBrief = {
  situation: 'moving',
  workArea: '',
  commute: '45',
  budget: '',
  household: 'one',
  priority: 'area',
  timing: '',
}

export default function InternationalProfessionalsPage() {
  const [brief, setBrief] = useState(initial)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState('')
  const result = showResult ? makeProfessionalBrief(brief) : null

  useEffect(() => {
    const saved = sessionStorage.getItem('professional_brief_transfer_data')
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as ProfessionalBrief
      if (parsed.workArea && parsed.budget && parsed.timing) setBrief(parsed)
    } catch {
      sessionStorage.removeItem('professional_brief_transfer_data')
    }
  }, [])

  function update<K extends keyof ProfessionalBrief>(key: K, value: ProfessionalBrief[K]) {
    setBrief((current) => ({ ...current, [key]: value }))
    setShowResult(false)
    setError('')
  }

  function reveal() {
    if (!brief.workArea || !brief.budget || !brief.timing) {
      setError('Choose your work area, monthly rent budget and target date to see your plan.')
      return
    }
    if (new Date(`${brief.timing}T23:59:59`).getTime() < Date.now()) {
      setError('Choose today or a future target date.')
      return
    }
    setShowResult(true)
    window.setTimeout(() => document.getElementById('your-plan')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function continueToBrief() {
    sessionStorage.setItem('professional_brief_transfer_data', JSON.stringify(brief))
    window.location.href = '/executive-intake?from=professional-plan'
  }

  return (
    <main className="professional-page">
      <header className="professional-header">
        <Link href="/" aria-label="The Relo Network home">THE RELO NETWORK</Link>
        <a href="#start">GET YOUR STARTING PLAN</a>
      </header>

      <section className="professional-hero">
        <div className="professional-wrap">
          <p className="professional-kicker">FOR INTERNATIONAL PROFESSIONALS</p>
          <h1>Make your next London decision with a clear plan.</h1>
          <p>Moving to London, or already here and considering a change? Tell us what matters. Get a useful starting plan now, then decide whether you want our team to help you carry it out.</p>
          <a className="professional-button" href="#start">GET MY STARTING PLAN <span aria-hidden="true">→</span></a>
          <span className="professional-note">About 3 minutes · No email required to see your plan</span>
        </div>
      </section>

      <section className="professional-intro professional-wrap" aria-label="How it works">
        <div><strong>01</strong><span>Tell us your priorities</span></div>
        <div><strong>02</strong><span>Get a practical starting plan</span></div>
        <div><strong>03</strong><span>Share your brief if you want personal support</span></div>
      </section>

      <section className="professional-form-section" id="start">
        <div className="professional-wrap professional-form-layout">
          <div className="professional-form-intro">
            <p className="professional-kicker">YOUR LONDON STARTING PLAN</p>
            <h2>What decision are you trying to make?</h2>
            <p>We’ll use your answers to show what to check first. This is a starting point, not a claim that a particular home or school is available.</p>
          </div>
          <div className="professional-form-card">
            <fieldset>
              <legend>Where are you now?</legend>
              <div className="professional-choice-row">
                <label><input type="radio" name="situation" checked={brief.situation === 'moving'} onChange={() => update('situation', 'moving')} /> Moving to London</label>
                <label><input type="radio" name="situation" checked={brief.situation === 'already-here'} onChange={() => update('situation', 'already-here')} /> Already living here</label>
              </div>
            </fieldset>
            <div className="professional-two-cols">
              <label>Where will you usually work? <span>*</span>
                <select value={brief.workArea} onChange={(event) => update('workArea', event.target.value)}>
                  <option value="">Choose an area</option>
                  <option value="city">City / Liverpool Street</option>
                  <option value="canary">Canary Wharf</option>
                  <option value="west">West End / Mayfair</option>
                  <option value="kings">King’s Cross / Euston</option>
                  <option value="other">Elsewhere / varies</option>
                </select>
              </label>
              <label>Maximum one-way commute
                <select value={brief.commute} onChange={(event) => update('commute', event.target.value as ProfessionalBrief['commute'])}>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </label>
              <label>Monthly rent budget <span>*</span>
                <select value={brief.budget} onChange={(event) => update('budget', event.target.value)}>
                  <option value="">Choose a range</option>
                  <option value="2,000-3,000">£2,000–£3,000</option>
                  <option value="3,000-5,000">£3,000–£5,000</option>
                  <option value="5,000-7,500">£5,000–£7,500</option>
                  <option value="7,500-10,000">£7,500–£10,000</option>
                  <option value="10,000+">£10,000+</option>
                </select>
              </label>
              <label>Target move or decision date <span>*</span>
                <input type="date" value={brief.timing} onChange={(event) => update('timing', event.target.value)} />
              </label>
              <label>Who is this for?
                <select value={brief.household} onChange={(event) => update('household', event.target.value as ProfessionalBrief['household'])}>
                  <option value="one">Just me</option>
                  <option value="couple">Me and a partner</option>
                  <option value="family">A family with children</option>
                </select>
              </label>
              <label>What is hardest right now?
                <select value={brief.priority} onChange={(event) => update('priority', event.target.value as ProfessionalBrief['priority'])}>
                  <option value="area">Choosing an area</option>
                  <option value="home">Finding the right home</option>
                  <option value="school">Schools</option>
                  <option value="settling">Settling in / changing my setup</option>
                </select>
              </label>
            </div>
            {error && <p className="professional-error" role="alert">{error}</p>}
            <button className="professional-button" type="button" onClick={reveal}>SHOW MY STARTING PLAN <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </section>

      {result && (
        <section className="professional-result" id="your-plan" aria-live="polite">
          <div className="professional-wrap">
            <p className="professional-kicker">YOUR STARTING PLAN</p>
            <h2>{result.firstDecision}</h2>
            <p className="professional-result-lead">Based on your work area, {brief.commute}-minute commute limit, rent budget and household. Here are three decisions to make next:</p>
            <p className="professional-timing-note">{result.timingNote}</p>
            <ol>{result.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p className="professional-caveat">Area suggestions are starting points, not confirmed commute times or property availability. Check live routes, listings and school admissions before making a commitment.</p>
            <div className="professional-next">
              <div><h3>Want to talk through your next step?</h3><p>Confirm your details, then choose a time for a private London planning call. We’ll have your starting answers before we speak.</p></div>
              <button className="professional-button" type="button" onClick={continueToBrief}>CONTINUE TO BOOK A CALL <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </section>
      )}
      <footer className="professional-footer"><span>THE RELO NETWORK</span><div><Link href="/privacy">Privacy</Link><Link href="/">Main site</Link></div></footer>
    </main>
  )
}
