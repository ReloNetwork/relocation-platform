import Link from 'next/link'
import Layout from '@/components/Layout'
import { PARTNER_MEDIA_PACK_VERSION, partnerInventory } from '@/lib/partner-sales'

export const metadata = {
  title: 'Partner Media Pack | The Relo Network',
  robots: { index: false, follow: false },
}

export default function PartnerMediaPackPage() {
  return (
    <Layout>
      <main className="partner-pack">
        <section className="partner-pack__cover">
          <p className="brief-eyebrow">PARTNER MEDIA PACK · {PARTNER_MEDIA_PACK_VERSION}</p>
          <h1>REACH PEOPLE<br />BUILDING A LIFE<br />IN LONDON.</h1>
          <p className="partner-pack__lede">
            The Relo Network is an editorial concierge for international professionals,
            founders, executives and families moving to, visiting or settling in London.
          </p>
          <div className="partner-pack__principle">
            Useful expertise earns attention. Payment buys defined media inventory—not
            favourable advice, undisclosed coverage or client introductions.
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">LAUNCH INVENTORY</p>
            <h2>Finite by design.</h2>
            <p>
              We are opening a small number of launch placements while we establish
              benchmark audience and campaign data. Every proposal states the exact
              placement, delivery date and reporting scope.
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
                <li>Campaign briefing and suitability review</li>
                <li>One disclosed sponsored Journal briefing</li>
                <li>Two defined London Brief placements</li>
                <li>Reviewed Network profile where appropriate</li>
                <li>Tracked links and a closing campaign report</li>
              </ul>
            </div>
            <div>
              <h3>Measured</h3>
              <ul>
                <li>Delivered newsletter audience</li>
                <li>Opens and unique clicks</li>
                <li>Article views and engaged visits</li>
                <li>Tracked partner-site visits</li>
                <li>Attributed enquiries where available</li>
              </ul>
            </div>
            <div>
              <h3>Never sold</h3>
              <ul>
                <li>Undisclosed editorial coverage</li>
                <li>Guaranteed enquiries or revenue</li>
                <li>Purchased Ask Relo recommendation rank</li>
                <li>Unverified audience or performance claims</li>
                <li>Use of subscriber personal data</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="partner-pack__section">
          <div className="partner-pack__intro">
            <p className="brief-eyebrow">A GOOD FIT</p>
            <h2>Brands that reduce relocation friction.</h2>
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
          <h2>We qualify the fit before proposing the inventory.</h2>
          <p>
            Tell us the audience you serve, the outcome you want and when you hope to
            begin. Suitable applicants receive a scoped recommendation rather than a
            generic rate card.
          </p>
          <Link href="/partner-application">APPLY TO PARTNER</Link>
          <small>Questions: hello@therelonetwork.com</small>
        </section>
      </main>
    </Layout>
  )
}
