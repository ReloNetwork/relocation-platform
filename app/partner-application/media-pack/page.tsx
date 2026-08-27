import Link from 'next/link'
import Layout from '@/components/Layout'
import { PARTNER_MEDIA_PACK_VERSION, partnerInventory } from '@/lib/partner-sales'
import CommercialEvent from '@/components/analytics/CommercialEvent'

export const metadata = {
  title: 'Partner Media Pack | The Relo Network',
  robots: { index: false, follow: false },
}

export default function PartnerMediaPackPage() {
  return (
    <Layout>
      <main className="partner-pack">
        <CommercialEvent event="partner_media_pack_viewed" journey="partner" />
        <section className="partner-pack__cover">
          <p className="brief-eyebrow">PARTNER MEDIA PACK · {PARTNER_MEDIA_PACK_VERSION}</p>
          <h1>REACH PEOPLE<br />BUILDING A LIFE<br />IN LONDON.</h1>
          <p className="partner-pack__lede">
            The Relo Network helps international professionals and families make
            clearer decisions about moving to and living in London.
          </p>
          <div className="partner-pack__principle">
            Partners pay for clearly described placements. They do not pay for positive
            recommendations, hidden coverage or access to client data.
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">PLACES AVAILABLE AT LAUNCH</p>
            <h2>Starting small on purpose.</h2>
            <p>
              We are offering a small number of placements while we build reliable
              audience and campaign data. Every proposal lists what we will publish,
              when it will appear and what we will report.
            </p>
          </div>
          <div className="partner-pack__inventory">
            {partnerInventory.map((item, index) => (
              <article key={item.name}>
                <span>0{index + 1}</span>
                <h3>{item.name}</h3>
                <strong>{item.availability}</strong>
                <p>{item.includes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="partner-pack__section partner-pack__section--ivory">
          <div>
            <p className="brief-eyebrow">EDITORIAL PARTNER PILOT</p>
            <h2>From £2,500</h2>
          </div>
          <div className="partner-pack__columns">
            <div>
              <h3>Included</h3>
              <ul>
                <li>A planning call and fit check</li>
                <li>One clearly labelled sponsored Journal article</li>
                <li>Two agreed placements in The London Brief</li>
                <li>A reviewed Network profile when suitable</li>
                <li>Tracked links and a final report</li>
              </ul>
            </div>
            <div>
              <h3>Measured</h3>
              <ul>
                <li>How many emails were delivered</li>
                <li>Opens and clicks</li>
                <li>Article views and engaged visits</li>
                <li>Tracked partner-site visits</li>
                <li>Enquiries linked to the campaign when available</li>
              </ul>
            </div>
            <div>
              <h3>Never sold</h3>
              <ul>
                <li>Undisclosed editorial coverage</li>
                <li>Promises of enquiries or revenue</li>
                <li>Paid priority in Ask Relo recommendations</li>
                <li>Audience or performance claims we cannot prove</li>
                <li>Use of subscriber personal data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">A GOOD FIT</p>
            <h2>Businesses that make moving easier.</h2>
          </div>
          <div className="partner-pack__fit">
            <p>Property and accommodation</p>
            <p>Education and family support</p>
            <p>Immigration, legal and tax</p>
            <p>Shipping and household setup</p>
            <p>Healthcare and wellbeing</p>
            <p>Work, finance and executive lifestyle</p>
          </div>
        </section>

        <section className="partner-pack__cta">
          <p className="brief-eyebrow">NEXT STEP</p>
          <h2>We check the fit before suggesting a package.</h2>
          <p>
            Tell us who you help, what you want to achieve and when you want to begin.
            If there is a good fit, we will suggest a clear plan and price.
          </p>
          <Link href="/partner-application">SEND A PARTNER ENQUIRY</Link>
          <small>Questions: hello@therelonetwork.com</small>
        </section>
      </main>
    </Layout>
  )
}
