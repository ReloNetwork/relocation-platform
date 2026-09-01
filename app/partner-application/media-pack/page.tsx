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
            Partners pay for clearly described articles, profiles or promotional spaces.
            They cannot buy a positive recommendation, hidden coverage or client data.
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">PARTNERSHIP OPTIONS</p>
            <h2>Choose one clear place to start.</h2>
            <p>
              Every proposal explains what we will make, where it will appear,
              how long it will run and what results we will report.
            </p>
          </div>
          <div className="partner-pack__inventory">
            {partnerInventory.map((item, index) => (
              <article key={item.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.name}</h3>
                <strong>{item.availability}</strong>
                <p>{item.includes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="partner-pack__section partner-pack__section--ivory">
          <div>
            <p className="brief-eyebrow">EXAMPLE PACKAGE</p>
            <h2>Practical guide campaign · £2,500</h2>
          </div>
          <div className="partner-pack__columns">
            <div>
              <h3>Included</h3>
              <ul>
                <li>A planning call</li>
                <li>One clearly labelled practical guide</li>
                <li>One downloadable checklist or reader tool</li>
                <li>Two mentions in The London Brief</li>
                <li>A suitable business profile and final report</li>
              </ul>
            </div>
            <div>
              <h3>Measured</h3>
              <ul>
                <li>How many emails were delivered</li>
                <li>Opens and clicks</li>
                <li>Article views and time spent reading</li>
                <li>Tracked visits to your website</li>
                <li>Relevant enquiries when we can trace them</li>
              </ul>
            </div>
            <div>
              <h3>Never sold</h3>
              <ul>
                <li>Undisclosed editorial coverage</li>
                <li>Promises of enquiries or sales</li>
                <li>Paid priority in Ask Relo answers</li>
                <li>Audience or performance claims we cannot prove</li>
                <li>Use of subscriber personal data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">A GOOD FIT</p>
            <h2>Businesses that can help people move and settle in.</h2>
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
          <h2>Tell us about your business and what you want to achieve.</h2>
          <p>
            We will check whether your expertise is useful for our readers. If it is,
            we will suggest a clear option, schedule and price.
          </p>
          <Link href="/partner-application">SEND A PARTNER ENQUIRY</Link>
          <small>Questions: hello@therelonetwork.com</small>
        </section>
      </main>
    </Layout>
  )
}
