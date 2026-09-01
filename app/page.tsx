import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import HomepageLead from '@/components/editorial/HomepageLead';
import HorizontalIntelligence from '@/components/editorial/HorizontalIntelligence';
import AskReloBand from '@/components/editorial/AskReloBand';
import LandingListSignup from '@/components/editorial/LandingListSignup';
import {
  getActiveHomepageEditorialCampaign,
  homepageEditorialCampaign,
} from '@/lib/homepage-editorial';

export default function HomePage() {
  const activeCampaign = getActiveHomepageEditorialCampaign(
    homepageEditorialCampaign
  );

  return (
    <Layout>
      <main>
        <HomepageLead campaign={activeCampaign} />
        <section className="home-intro">
          <div>
            <p className="eyebrow">THE RELO NETWORK</p>
            <h2>
              THE CITY,
              <br />
              EDITED.
            </h2>
            <p>
              London gives you endless choices. The hard part is knowing which
              ones fit your life. We give you clear advice, current local
              insight and trusted people, so you can make your first decisions
              with confidence.
            </p>
            <div className="home-intro__actions">
              <Link className="button button--gold" href="/move">
                EXPLORE YOUR MOVE
              </Link>
              <Link className="button button--ink" href="/journal">
                READ THE JOURNAL
              </Link>
            </div>
          </div>
          <Image
            src="/images/editorial/london-interior.webp"
            alt="A calm London interior"
            width={1000}
            height={1200}
          />
        </section>
        <HorizontalIntelligence />
        <section className="programme">
          <h2>
            MAKE THE
            <br />
            MOVE.
          </h2>
          <div>
            {[
              [
                '01',
                'UNDERSTAND',
                'Tell us what matters and when you need to move.',
                '/ask-relo',
                'Ask Relo',
              ],
              [
                '02',
                'GET ORIENTED',
                'Use the Journal and The London Brief to sharpen your view.',
                '/journal',
                'Read the Journal',
              ],
              [
                '03',
                'START THE PLAN',
                'Send a private brief when you are ready for a human review.',
                '/executive-intake',
                'Start Your Move',
              ],
            ].map(([n, t, p, href, action]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
                <Link className="editorial-grid__link" href={href}>
                  {action} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="living-index">
          <h2>LIVING INDEX</h2>
          <div className="index-table">
            {[
              '',
              'NOTTING HILL',
              'KENSINGTON',
              'CLERKENWELL',
              'BATTERSEA',
              'FEEL',
              'Colourful and relaxed',
              'Classic and central',
              'Creative and walkable',
              'Modern and riverside',
              'GOOD FOR',
              'Families and weekends',
              'Museums and green space',
              'Short City journeys',
              'New homes and parks',
              'CHECK',
              'Crowds and transport',
              'Rent and building type',
              'Noise street by street',
              'Your exact commute',
              'NEXT STEP',
              'Walk your daily route',
              'Compare the side streets',
              'Visit after work',
              'Try a full weekend',
            ].map((v, i) => (
              <div className={i % 5 === 0 ? 'row-label' : ''} key={`${v}-${i}`}>
                {v}
              </div>
            ))}
          </div>
        </section>
        <section className="landing-panel">
          <h2>
            LAND
            <br />
            READY.
          </h2>
          <LandingListSignup
            enabled={Boolean(
              process.env.BEEHIIV_API_KEY &&
              process.env.BEEHIIV_PUBLICATION_ID &&
              process.env.BEEHIIV_LANDING_LIST_AUTOMATION_ID
            )}
          />
        </section>
        <AskReloBand />
      </main>
    </Layout>
  );
}
