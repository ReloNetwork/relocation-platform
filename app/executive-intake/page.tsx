'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { ArrowRight, CheckCircle, Calendar, MapPin } from 'lucide-react'
import { trackCommercialEvent } from '@/lib/commercial-analytics'
import { buildConsultationUrl } from '@/lib/consultation-link'
import type { ProfessionalBrief } from '@/lib/professional-brief'
import { mapProfessionalBriefToIntake } from '@/lib/professional-intake-handoff'

export default function ExecutiveIntakePage() {
  const [step, setStep] = useState(1)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step1Error, setStep1Error] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [handoffMode, setHandoffMode] = useState<'loading' | 'professional' | 'standard'>('loading')
  const [professionalBrief, setProfessionalBrief] = useState<ProfessionalBrief | null>(null)
  const [isLocalPreview, setIsLocalPreview] = useState(false)
  const [formData, setFormData] = useState({
    // Move window
    moveDate: '',
    flexibility: '',
    
    // Budget
    budget: '',
    budgetFlexible: false,
    
    // Areas
    preferredAreas: [] as string[],
    avoidAreas: '',
    
    // Priorities
    propertyType: '',
    propertyPriority: 'medium',
    schoolsPriority: 'medium',
    visaPriority: 'medium',
    
    // Family details
    adults: '1',
    children: '0',
    childrenAges: '',
    pets: false,
    
    // Support requirements
    visaSupport: false,
    taxationSupport: false,
    bankingSupport: false,
    schoolingSupport: false,
    lifestyleSupport: false,
    otherRequirements: '',
    
    // Urgency
    urgency: 'normal',
    specialRequirements: '',
    
    // Contact
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    journeyStage: undefined as 'moving' | 'already-here' | undefined,
    workArea: '',
    commuteLimit: '',
  })

  const londonAreas = [
    'Marylebone', 'Kensington', 'Chelsea', 'Mayfair', 'Belgravia',
    'Canary Wharf', 'Shoreditch', 'Clapham', 'Battersea', 'Greenwich',
    'Hammersmith', 'Fulham', 'Islington', 'Camden', 'Notting Hill',
    'South Kensington', 'Paddington', 'King\'s Cross', 'Bermondsey', 'Wimbledon'
  ]

  // Load transferred data from AI Talent Assessment form
  useEffect(() => {
    setIsLocalPreview(window.location.hostname === 'localhost')
    const transferData = sessionStorage.getItem('ai_talent_transfer_data')
    if (transferData) {
      try {
        const data = JSON.parse(transferData)
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          currentLocation: data.currentLocation || '',
          moveDate: data.moveDate || '',
          budget: data.budget || '',
          otherRequirements: data.otherRequirements || ''
        }))
        // Clear the transfer data after loading
        sessionStorage.removeItem('ai_talent_transfer_data')
      } catch (error) {
        console.error('Error loading transfer data:', error)
      }
    }

    const askReloData = sessionStorage.getItem('ask_relo_transfer_data')
    if (askReloData) {
      try {
        const data = JSON.parse(askReloData)
        setFormData(prev => ({
          ...prev,
          otherRequirements: data.otherRequirements || prev.otherRequirements,
        }))
        sessionStorage.removeItem('ask_relo_transfer_data')
      } catch (error) {
        console.error('Error loading Ask Relo handoff:', error)
      }
    }

    const professionalData = new URLSearchParams(window.location.search).get('from') === 'professional-plan'
      ? sessionStorage.getItem('professional_brief_transfer_data')
      : null
    if (professionalData) {
      try {
        const data = JSON.parse(professionalData) as ProfessionalBrief
        setFormData(prev => ({
          ...prev,
          ...mapProfessionalBriefToIntake(data),
        }))
        setProfessionalBrief(data)
        setHandoffMode('professional')
      } catch (error) {
        console.error('Error loading starting plan:', error)
        setHandoffMode('standard')
      }
    } else {
      setHandoffMode('standard')
    }
  }, [])

  const handleAreaToggle = (area: string) => {
    setStep1Error('')
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setStep1Error('')
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    const missing: string[] = []
    if (!formData.moveDate) missing.push('target move date')
    if (!formData.budget) missing.push('monthly rent budget')
    if (!formData.name.trim()) missing.push('name')
    if (!formData.email.trim()) missing.push('email address')
    if (!formData.children) missing.push('number of children')

    if (missing.length > 0) {
      setStep1Error(`Please add ${missing.join(', ')} before checking your answers.`)
      return
    }

    if (step < 2) {
      setStep1Error('')
      trackCommercialEvent('relocation_intake_started', 'relocation')
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.moveDate || !formData.budget || !formData.children) {
      alert('Please complete all required fields before continuing.')
      return
    }

    if (!consentAccepted) {
      setSubmitError('Please confirm that we may review and respond to your brief.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/executive-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consent: true,
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.success && data.referenceId) {
        trackCommercialEvent('relocation_intake_submitted', 'relocation', {
          urgency: formData.urgency,
          budget: formData.budget,
        })
        sessionStorage.setItem('executive_intake_data', JSON.stringify({
          ...formData,
          referenceId: data.referenceId,
        }))
        if (handoffMode === 'professional') {
          sessionStorage.removeItem('professional_brief_transfer_data')
          const bookingUrl = buildConsultationUrl(
            process.env.NEXT_PUBLIC_CAL_COM_EMBED_ID,
            formData.name,
            formData.email,
          )
          window.location.href = bookingUrl || `/executive-intake/success?reference=${encodeURIComponent(data.referenceId)}`
        } else {
          window.location.href = `/executive-intake/success?reference=${encodeURIComponent(data.referenceId)}`
        }
      } else {
        setSubmitError(data.error || 'We could not receive your brief. Please email hello@therelonetwork.com.')
      }
    } catch (error) {
      console.error('Executive intake request failed:', error)
      setSubmitError('We could not receive your brief. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (handoffMode === 'loading') {
    return <main className="professional-handoff professional-handoff--loading">Preparing your details…</main>
  }

  if (handoffMode === 'professional' && professionalBrief) {
    const budgetLabels: Record<string, string> = {
      '2000-3000': '£2,000–£3,000',
      '3000-5000': '£3,000–£5,000',
      '5000-7500': '£5,000–£7,500',
      '7500-10000': '£7,500–£10,000',
      '10000+': '£10,000+',
    }

    return (
      <main className="professional-handoff">
        <header className="professional-header">
          <a href="/" aria-label="The Relo Network home">THE RELO NETWORK</a>
          <a href="/international-professionals#start">EDIT MY STARTING ANSWERS</a>
        </header>
        <div className="professional-handoff__wrap">
          <p className="professional-kicker">ONE LAST STEP</p>
          <h1>Choose a time to talk.</h1>
          <p className="professional-handoff__lead">We’ve carried your answers across. Add your contact details, then we’ll take you to the calendar. No need to fill in the move form again.</p>
          {isLocalPreview && <p className="professional-handoff__preview-note">Preview only: this local page does not have the live email and database connections. You can inspect the journey, but your answers cannot be saved here.</p>}
          <div className="professional-handoff__grid">
            <section className="professional-handoff__summary" aria-label="Your starting answers">
              <h2>Your answers</h2>
              <dl>
                <div><dt>Situation</dt><dd>{professionalBrief.situation === 'moving' ? 'Moving to London' : 'Already living in London'}</dd></div>
                <div><dt>Work area</dt><dd>{formData.workArea}</dd></div>
                <div><dt>Commute limit</dt><dd>{formData.commuteLimit} minutes</dd></div>
                <div><dt>Monthly rent budget</dt><dd>{budgetLabels[formData.budget]}</dd></div>
                <div><dt>Target date</dt><dd>{formData.moveDate}</dd></div>
                <div><dt>Household</dt><dd>{professionalBrief.household === 'family' ? 'Family with children' : professionalBrief.household === 'couple' ? 'Couple' : 'Just me'}</dd></div>
                <div><dt>Main concern</dt><dd>{professionalBrief.priority === 'area' ? 'Choosing an area' : professionalBrief.priority === 'home' ? 'Finding a home' : professionalBrief.priority === 'school' ? 'Schools' : 'Settling in'}</dd></div>
              </dl>
            </section>
            <form className="professional-handoff__form" onSubmit={(event) => { event.preventDefault(); void handleSubmit() }}>
              <h2>Your contact details</h2>
              <label htmlFor="professional-name">Name <span>*</span></label>
              <input id="professional-name" type="text" autoComplete="name" value={formData.name} onChange={(event) => handleInputChange('name', event.target.value)} required />
              <label htmlFor="professional-email">Email <span>*</span></label>
              <input id="professional-email" type="email" autoComplete="email" value={formData.email} onChange={(event) => handleInputChange('email', event.target.value)} required />
              {professionalBrief.household === 'family' && (
                <>
                  <label htmlFor="professional-children">How many children? <span>*</span></label>
                  <select id="professional-children" value={formData.children} onChange={(event) => handleInputChange('children', event.target.value)} required>
                    <option value="">Choose one</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3+">3 or more</option>
                  </select>
                </>
              )}
              <label htmlFor="professional-notes">Anything else we should know? <small>(optional)</small></label>
              <textarea id="professional-notes" rows={3} maxLength={2000} placeholder="For example, a school deadline or a fixed arrival date" onChange={(event) => handleInputChange('specialRequirements', event.target.value)} value={formData.specialRequirements} />
              <label className="professional-handoff__consent"><input type="checkbox" checked={consentAccepted} onChange={(event) => setConsentAccepted(event.target.checked)} required /> <span>I agree that The Relo Network may use these details to prepare for my call and contact me about my enquiry. <a href="/privacy" target="_blank" rel="noreferrer">Privacy notice</a></span></label>
              {submitError && <p className="professional-error" role="alert">{submitError}</p>}
              {submitError && isLocalPreview && (
                <p className="professional-handoff__preview-note">
                  This local preview cannot save your brief. You can still <a href={buildConsultationUrl(process.env.NEXT_PUBLIC_CAL_COM_EMBED_ID, formData.name, formData.email)} target="_blank" rel="noreferrer">view the live call calendar</a>, but these answers will not be sent to our team.
                </p>
              )}
              <button className="professional-button" type="submit" disabled={isSubmitting || !consentAccepted}>{isSubmitting ? 'SENDING YOUR DETAILS…' : submitError ? 'TRY SENDING AGAIN' : 'CONTINUE TO AVAILABLE CALL TIMES'} <span aria-hidden="true">→</span></button>
              <p className="professional-handoff__fineprint">{submitError ? 'We have not confirmed receipt of your details. Please try again before choosing a call time.' : 'We will send your details to our team before you choose a time. A call is booked only after you select a slot and confirm it on the calendar.'}</p>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <Layout className="intake-page">
      <main>
        <section className="intake-hero">
          <span className="vertical-label">START YOUR MOVE</span>
          <div>
            <p className="eyebrow">TELL US ABOUT YOUR MOVE</p>
            <h1>HELP US UNDERSTAND YOUR LONDON MOVE.</h1>
            <p>
              Share your timing, budget and priorities. Our team will bring the
              full picture together and recommend a clear way forward.
            </p>
          </div>
          <aside>
            <span>WHAT HAPPENS NEXT</span>
            <p>A person reviews your information.</p>
            <p>We identify the priorities and pressure points.</p>
            <p>We reply within one business day.</p>
          </aside>
        </section>

        <section className="intake-workspace">
          <div className="intake-progress" aria-label={`Step ${step} of 2`}>
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C9A24A]' : 'text-[#6B7280]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-[#C9A24A] bg-[#C9A24A] text-white' : 'border-[#6B7280]'}`}>1</div>
              <span className="font-medium">Brief</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-[#C9A24A]' : 'bg-[#E5E7EB]'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C9A24A]' : 'text-[#6B7280]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-[#C9A24A] bg-[#C9A24A] text-white' : 'border-[#6B7280]'}`}>2</div>
              <span className="font-medium">Review</span>
            </div>
          </div>

        {/* Step 1: Brief Form */}
        {step === 1 && (
          <div className="intake-card bg-white p-8 border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#C9A24A]" />
              Tell us about your move
            </h2>
            
            <div className="space-y-8">
              {/* Move Window */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">When are you moving?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Target move or decision date *</label>
                    <input
                      type="date"
                      value={formData.moveDate}
                      onChange={(e) => handleInputChange('moveDate', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">How flexible is the date?</label>
                    <select
                      value={formData.flexibility}
                      onChange={(e) => handleInputChange('flexibility', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Choose one</option>
                      <option value="exact">The date is fixed</option>
                      <option value="1week">About one week either side</option>
                      <option value="1month">About one month either side</option>
                      <option value="flexible">Very flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Budget</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Monthly rent budget *</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Choose a budget</option>
                      <option value="2000-3000">£2,000 - £3,000</option>
                      <option value="3000-5000">£3,000 - £5,000</option>
                      <option value="5000-7500">£5,000 - £7,500</option>
                      <option value="7500-10000">£7,500 - £10,000</option>
                      <option value="10000+">£10,000+</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="budget-flexible"
                      checked={formData.budgetFlexible}
                      onChange={(e) => handleInputChange('budgetFlexible', e.target.checked)}
                      className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                    />
                    <label htmlFor="budget-flexible" className="ml-2 text-sm text-[#6B7280]">
                      Budget is flexible for the right property
                    </label>
                  </div>
                </div>
              </div>

              {/* Areas */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C9A24A]" />
                  Areas you may want to live in (optional, choose up to 5)
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                  {londonAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => handleAreaToggle(area)}
                      disabled={!formData.preferredAreas.includes(area) && formData.preferredAreas.length >= 5}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        formData.preferredAreas.includes(area)
                          ? 'bg-[#C9A24A] text-white border-[#C9A24A]'
                          : 'bg-white text-[#0B1B2B] border-[#E5E7EB] hover:border-[#C9A24A]'
                      } disabled:opacity-50`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Areas to avoid (optional)</label>
                  <input
                    type="text"
                    value={formData.avoidAreas}
                    onChange={(e) => handleInputChange('avoidAreas', e.target.value)}
                    placeholder="e.g., Zone 4+, busy roads"
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Key Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">What kind of home do you need?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-2">Type of home</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">Any type</option>
                      <option value="flat">Flat or apartment</option>
                      <option value="house">House</option>
                      <option value="serviced">Serviced apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Family situation</label>
                    <select
                      value={formData.children}
                      onChange={(e) => handleInputChange('children', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="" disabled>Choose number of children</option>
                      <option value="0">No children</option>
                      <option value="1">1 child</option>
                      <option value="2">2 children</option>
                      <option value="3+">3+ children</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Support Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">What else would help?</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.visaSupport}
                        onChange={(e) => handleInputChange('visaSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Help finding regulated immigration advice</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.taxationSupport}
                        onChange={(e) => handleInputChange('taxationSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Help finding regulated UK tax advice</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.bankingSupport}
                        onChange={(e) => handleInputChange('bankingSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Help setting up banking</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.schoolingSupport}
                        onChange={(e) => handleInputChange('schoolingSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">School admissions support</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer md:col-span-2">
                      <input
                        type="checkbox"
                        checked={formData.lifestyleSupport}
                        onChange={(e) => handleInputChange('lifestyleSupport', e.target.checked)}
                        className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded"
                      />
                      <span className="text-[#6B7280]">Healthcare, clubs and getting to know the city</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Other specific requirements</label>
                    <textarea
                      value={formData.otherRequirements}
                      onChange={(e) => handleInputChange('otherRequirements', e.target.value)}
                      placeholder="Tell us anything else that could affect your move."
                      rows={3}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Your contact details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Phone number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g., +44 20 3105 9566"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-2">Current location</label>
                    <input
                      type="text"
                      value={formData.currentLocation}
                      onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                      placeholder="e.g., New York, USA"
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <div className="w-full">
                {step1Error && (
                  <p className="mb-4 text-sm text-red-700 text-right" role="alert">
                    {step1Error}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
                  >
                    Check your answers
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review and consent */}
        {step === 2 && (
          <div className="intake-card bg-white p-8 border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[#C9A24A]" />
              Check and send
            </h2>
            
            {/* Service Summary */}
            <div className="bg-[#FAFAF9] rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-[#0B1B2B] mb-4">What we will do</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We review your timing, household needs and housing brief</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We identify the level of support that will make the greatest difference</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We reply with a clear next step</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We shape a plan around the decisions that matter most</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A]" />
                  <span>We recommend the right support, sequence and specialists</span>
                </div>
              </div>
              
            </div>

            {/* Micro-FAQ */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 mb-8">
              <h4 className="font-bold text-[#0B1B2B] mb-4">A few useful answers</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What happens after I send this?</div>
                  <div className="text-[#6B7280]">We review your brief and reply within one business day with the right next step.</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What will I receive?</div>
                  <div className="text-[#6B7280]">A considered recommendation shaped around your timing, priorities and the decisions ahead.</div>
                </div>
                <div>
                  <div className="font-medium text-[#0B1B2B] mb-1">What if my plans are still changing?</div>
                  <div className="text-[#6B7280]">That is fine. Your brief helps us identify what is fixed, what is flexible and what to resolve first.</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <div className="text-xs text-[#6B7280]">
                  Your information is used only to assess and respond to this relocation enquiry.
                  <a href="/privacy" className="text-[#C9A24A] hover:underline ml-1">Read our privacy notice</a>
                </div>
              </div>
            </div>

            {/* Required Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="h-4 w-4 text-[#C9A24A] focus:ring-[#C9A24A] border-[#E5E7EB] rounded mt-0.5"
                  required
                />
                <span className="text-sm text-[#6B7280]">
                  I agree that The Relo Network may review this information and contact me about my relocation enquiry.
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-4 text-sm font-medium text-[#0B1B2B] underline underline-offset-4"
            >
              Edit my brief
            </button>

            <button
              onClick={handleSubmit}
              disabled={!consentAccepted || isSubmitting}
              className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'SENDING…' : 'SEND MY PRIVATE BRIEF'}
            </button>
            {submitError && (
              <p className="mt-4 text-sm text-red-700" role="alert">{submitError}</p>
            )}
          </div>
        )}
        </section>
      </main>
    </Layout>
  )
}
