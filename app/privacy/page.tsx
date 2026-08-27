import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return <LegalDocument eyebrow="PRIVACY" title="Privacy, plainly stated." summary="This notice explains what information we collect, why we need it and what you can ask us to do with it. It covers our website, newsletter, Ask Relo and client and partner enquiries." updated="27 August 2026" sections={[
    { title: 'Who is responsible', paragraphs: ['Relo Network Ltd operates The Relo Network from London, United Kingdom. We are the data controller, which means we decide how and why the information described here is used. Email hello@therelonetwork.com with privacy questions or rights requests.'] },
    { title: 'Information we collect', bullets: [
      'Newsletter: email address, consent record, source and subscription status.',
      'Relocation briefs: contact details, current location, move timing, housing preferences, household composition and the support you request.',
      'Partner applications: professional contact details, company, website, service category, campaign objectives, budget range and application notes.',
      'Ask Relo: your questions and the recent conversation needed to answer them, plus a random session identifier and a one-way code used to enforce question limits.',
      'Website measurement: anonymised page and conversion events, referral source and campaign parameters. We do not include email addresses, chat text or relocation-brief content in analytics events.',
    ] },
    { title: 'Why we use it', bullets: [
      'To take steps you request before entering a contract and to deliver an agreed relocation service.',
      'To answer enquiries, review potential partners and keep the service secure because we have a legitimate business reason to do so and have considered your rights.',
      'To send The London Brief and related requested sequences when you have consented. You may unsubscribe at any time.',
      'To comply with accounting, fraud-prevention and other legal obligations.',
    ] },
    { title: 'Ask Relo and automated assistance', paragraphs: [
      'Ask Relo uses an OpenAI API model to create answers. We send requests with storage turned off. We do not use Ask Relo to make legal or similarly important decisions about you. We do not save your question text in our Supabase database, although OpenAI processes it under its service terms.',
      'Do not enter passport numbers, payment-card details, medical records or other highly sensitive information. Ask Relo can be wrong and is not legal, immigration, tax, financial, medical or school-admissions advice. A human can review a separate relocation brief when requested.',
    ] },
    { title: 'Service providers and sharing', paragraphs: ['Depending on the feature used, information may be processed by Supabase for secure application data, beehiiv for newsletter subscriptions and delivery, Resend for service emails, Vercel for hosting and cookie-free web analytics, OpenAI for Ask Relo answers, and Stripe or a scheduling provider when a payment or appointment is arranged. We disclose information to relocation specialists only when needed for an agreed service or introduction, and not merely because they advertise with us.'] },
    { title: 'Processing outside the UK', paragraphs: ['Some providers may process information outside the United Kingdom. Where the law requires it, we use the provider’s contracts and approved safeguards to protect the transfer. You can read each provider’s privacy information on its website.'] },
    { title: 'How long we keep it', bullets: [
      'Newsletter records: while subscribed, with a minimal suppression record retained after unsubscribe so we can respect the request.',
      'Unconverted relocation and partner enquiries: normally up to 24 months after the last meaningful contact.',
      'Client, payment and contractual records: for the period needed to deliver the service and satisfy legal, tax, accounting or dispute requirements.',
      'Ask Relo abuse-prevention counters: up to 90 days.',
      'Anonymous commercial analytics events: up to 13 months.',
    ] },
    { title: 'Your rights', paragraphs: ['Depending on the situation, you may ask to see, correct, delete, restrict or move your information, or object to how we use it. You can withdraw consent at any time. You can also complain to the UK Information Commissioner’s Office. We may need to confirm your identity first.'] },
    { title: 'Security and contact', paragraphs: ['We use access controls, encrypted transmission and restricted service credentials, but no online system is completely risk-free. Please email hello@therelonetwork.com if you believe information has been mishandled or wish to exercise a right.'] },
  ]} />
}
