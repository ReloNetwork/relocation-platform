import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'

export const metadata: Metadata = { title: 'Cookies and Local Storage' }

export default function CookiesPage() {
  return <LegalDocument eyebrow="COOKIES" title="A deliberately light footprint." summary="The redesigned public website does not use advertising cookies or Google Analytics. This page explains the limited browser storage and measurement used at launch." updated="26 August 2026" sections={[
    { title: 'Cookie-free website analytics', paragraphs: ['We use Vercel Web Analytics for anonymised page measurement. The launch configuration does not use third-party analytics cookies. Commercial conversion events contain an event name, page, referral or campaign parameters and timing; they exclude names, email addresses, relocation-brief content and Ask Relo question text.'] },
    { title: 'Strictly necessary storage', bullets: ['Authentication cookies may be used when an authorised client or administrator signs in.', 'Ask Relo stores a random session identifier in local storage so the browser can apply the complimentary-question journey; it does not store the question text there.', 'Short-lived session storage may carry a submitted reference or form state to a confirmation page.', 'Security and deployment systems may use essential technical data needed to deliver and protect the site.'] },
    { title: 'No advertising profiles', paragraphs: ['We do not currently run behavioural advertising pixels or sell browsing data. If non-essential cookies, advertising pixels or comparable tracking are introduced, we will update this notice and obtain consent where required before activating them.'] },
    { title: 'Your controls', paragraphs: ['You can clear cookies and local storage through your browser settings. Doing so may sign you out, reset an Ask Relo preview or remove temporary form state. Newsletter preferences and unsubscribe controls are managed through links in the relevant email.'] },
    { title: 'Contact', paragraphs: ['Questions about storage or analytics may be sent to hello@therelonetwork.com. See the Privacy Policy for the wider explanation of how personal information is used.'] },
  ]} />
}
