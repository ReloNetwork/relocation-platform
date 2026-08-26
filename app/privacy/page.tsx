import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return <LegalDocument eyebrow="PRIVACY" title="Privacy, plainly stated." summary="This notice explains what The Relo Network collects, why we use it and the choices available to you. It applies to our website, newsletter, Ask Relo and relocation and partner enquiries." updated="26 August 2026" sections={[
    { title: 'Who is responsible', paragraphs: ['The Relo Network is operated by Relo Network Ltd in London, United Kingdom. We act as controller for the personal information described in this notice. Privacy enquiries and rights requests may be sent to hello@therelonetwork.com.'] },
    { title: 'Information we collect', bullets: [
      'Newsletter: email address, consent record, source and subscription status.',
      'Relocation briefs: contact details, current location, move timing, housing preferences, household composition and the support you request.',
      'Partner applications: professional contact details, company, website, service category, campaign objectives, budget range and application notes.',
      'Ask Relo: the questions and recent conversation context needed to generate an answer; a random session identifier and a one-way hash used to enforce complimentary usage limits.',
      'Website measurement: anonymised page and conversion events, referral source and campaign parameters. We do not include email addresses, chat text or relocation-brief content in analytics events.',
    ] },
    { title: 'Why we use it', bullets: [
      'To take steps you request before entering a contract and to deliver an agreed relocation service.',
      'To respond to enquiries, assess partner fit and operate the service securely under our legitimate interests, balanced against your rights.',
      'To send The London Brief and related requested sequences when you have consented. You may unsubscribe at any time.',
      'To comply with accounting, fraud-prevention and other legal obligations.',
    ] },
    { title: 'Ask Relo and automated assistance', paragraphs: [
      'Ask Relo uses an OpenAI API model to generate decision support. Requests are sent with storage disabled and are not used by us to make legal or similarly significant decisions about you. We do not store the question text in our Supabase database, although the API provider may process it under its applicable service terms.',
      'Do not enter passport numbers, payment-card details, medical records or other highly sensitive information. Ask Relo can be wrong and is not legal, immigration, tax, financial, medical or school-admissions advice. A human can review a separate relocation brief when requested.',
    ] },
    { title: 'Service providers and sharing', paragraphs: ['Depending on the feature used, information may be processed by Supabase for secure application data, beehiiv for newsletter subscriptions and delivery, Resend for service emails, Vercel for hosting and cookie-free web analytics, OpenAI for Ask Relo answers, and Stripe or a scheduling provider when a payment or appointment is arranged. We disclose information to relocation specialists only when needed for an agreed service or introduction, and not merely because they advertise with us.'] },
    { title: 'International processing', paragraphs: ['Some providers may process information outside the United Kingdom. Where required, we rely on the provider’s contractual safeguards and applicable transfer mechanisms. Provider privacy information is available from the relevant service.'] },
    { title: 'How long we keep it', bullets: [
      'Newsletter records: while subscribed, with a minimal suppression record retained after unsubscribe so we can respect the request.',
      'Unconverted relocation and partner enquiries: normally up to 24 months after the last meaningful contact.',
      'Client, payment and contractual records: for the period needed to deliver the service and satisfy legal, tax, accounting or dispute requirements.',
      'Ask Relo abuse-prevention counters: up to 90 days.',
      'Anonymous commercial analytics events: up to 13 months.',
    ] },
    { title: 'Your rights', paragraphs: ['Depending on the circumstances, you may ask for access, correction, deletion, restriction, portability or objection, and may withdraw consent at any time. You may also complain to the UK Information Commissioner’s Office. We may need to verify your identity before acting on a request.'] },
    { title: 'Security and contact', paragraphs: ['We use access controls, encrypted transmission and restricted service credentials, but no online system is completely risk-free. Please email hello@therelonetwork.com if you believe information has been mishandled or wish to exercise a right.'] },
  ]} />
}
