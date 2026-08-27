import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'

export const metadata: Metadata = { title: 'Editorial and Partnership Standard' }

export default function EditorialPolicyPage() {
  return <LegalDocument eyebrow="EDITORIAL STANDARD" title="Trust comes first." summary="These rules explain how we separate independent advice from paid articles and sponsorships." updated="27 August 2026" sections={[
    { title: 'Clear labels', paragraphs: ['Work created with payment and brand control is labelled “Advertisement Feature”. Other paid work is clearly labelled “Sponsored” or “Paid partnership” before you read or engage with it. We do not hide the disclosure at the end.'] },
    { title: 'Editorial independence', bullets: ['A sponsor cannot purchase favourable independent coverage.', 'Payment does not secure a client introduction or Ask Relo recommendation.', 'We may decline, amend, postpone or withdraw material that is inaccurate, unsafe or unsuitable for the audience.', 'Commercial relationships are disclosed when they are relevant to understanding a recommendation.'] },
    { title: 'Checking facts and correcting mistakes', paragraphs: ['Claims that can change should show when they were checked and link to an official source when useful. Partners must prove claims about price, results, qualifications and availability. We correct important mistakes quickly and note significant changes.'] },
    { title: 'Information supplied to Ask Relo', paragraphs: ['A business may give us checked information or source material, but that does not guarantee it will be quoted or recommended. Ask Relo must never present paid placement as independent judgement. We choose providers for clients based on their needs, our checks, availability and the client’s interests.'] },
    { title: 'Reporting', paragraphs: ['Campaign reports separate emails delivered, opens, clicks, article views and enquiries linked to the campaign. We do not promise results or present forecasts as completed performance. Audience and campaign figures must show the period they cover.'] },
    { title: 'Complaints', paragraphs: ['Editorial corrections, disclosure concerns and commercial-content complaints may be sent to hello@therelonetwork.com with the relevant URL and a clear description of the issue.'] },
  ]} />
}
