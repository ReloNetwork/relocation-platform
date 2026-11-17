import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import HomepageLead from '@/components/editorial/HomepageLead';
import HorizontalIntelligence from '@/components/editorial/HorizontalIntelligence';
import AskReloBand from '@/components/editorial/AskReloBand';
import LandingListSignup from '@/components/editorial/LandingListSignup';
import {
  getActiveHomepageEditorialCampaign,
  homepageEditorialCampaign,
} from '@/lib/homepage-editorial';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

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
              LONDON,
              <br />
              MADE CLEARER.
            </h2>
            <p>
              We help international professionals, individuals, couples and families choose where to live, navigate London home searches and settle in with the right support.
            </p>
            <div className="home-intro__actions">
              <Link className="button button--gold" href="/move">
                PLAN YOUR MOVE
              </Link>
              <Link className="button button--ink" href="/journal">
                READ LONDON GUIDES
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
        <section className="bg-[#0B1B2B] px-6 py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#D9BB71]">PROPERTY HUNT LIVE</p>
              <h2 className="mt-3 font-serif text-4xl">London homes. Live from the property.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/75">Interactive home viewings and neighbourhood insight for people moving to London. Estate agents and developers can discuss potential property-viewing collaborations.</p>
            </div>
            <Link href="/property-hunt-live" className="shrink-0 border border-white/60 px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white">Explore Property Hunt LIVE</Link>
          </div>
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
                'ASK ONE QUESTION',
                'Get free introductory answers about London areas, housing or the first steps in a move.',
                '/ask-relo',
                'Ask Relo',
              ],
              [
                '02',
                'LEARN ABOUT LONDON',
                'Read practical guides and get The London Brief by email.',
                '/journal',
                'Read the Journal',
              ],
              [
                '03',
                'TELL US ABOUT YOUR MOVE',
                'Enquire about hands-on home search and relocation support. No payment or commitment to enquire.',
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
