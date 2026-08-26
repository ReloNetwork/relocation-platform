import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'

export const metadata: Metadata = { title: 'Editorial and Partnership Standard' }

export default function EditorialPolicyPage() {
  return <LegalDocument eyebrow="EDITORIAL STANDARD" title="Trust is the inventory." summary="Our commercial model depends on useful, recognisable and accountable work. These rules separate independent guidance from paid media activity." updated="26 August 2026" sections={[
    { title: 'Clear labelling', paragraphs: ['Material created with payment and brand editorial control is labelled “Advertisement Feature”. Other paid collaborations are labelled “Sponsored” or “Paid partnership” prominently enough to be understood before engagement. A disclosure is not hidden at the end of an article.'] },
    { title: 'Editorial independence', bullets: ['A sponsor cannot purchase favourable independent coverage.', 'Payment does not secure a client introduction or Ask Relo recommendation.', 'We may decline, amend, postpone or withdraw material that is inaccurate, unsafe or unsuitable for the audience.', 'Commercial relationships are disclosed when they are relevant to understanding a recommendation.'] },
    { title: 'Verification and corrections', paragraphs: ['Time-sensitive claims should identify a source date and, where appropriate, an official source. Partners must substantiate objective claims about price, performance, qualifications and availability. Material errors are corrected promptly and significant corrections are noted.'] },
    { title: 'Ask Relo knowledge contributions', paragraphs: ['A business may contribute verified expertise or source material, but inclusion does not guarantee that it will be quoted or recommended. Ask Relo must not represent paid rank as independent judgement. Provider selection for a client remains based on fit, verification, availability and the client’s interests.'] },
    { title: 'Measurement', paragraphs: ['Campaign reports distinguish delivered audience, opens, clicks, article views and attributed enquiries. We do not promise results or present projections as achieved performance. Audience and campaign claims must identify their measurement period.'] },
    { title: 'Complaints', paragraphs: ['Editorial corrections, disclosure concerns and commercial-content complaints may be sent to hello@therelonetwork.com with the relevant URL and a clear description of the issue.'] },
  ]} />
}
