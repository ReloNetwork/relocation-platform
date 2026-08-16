import Image from 'next/image';
import Layout from '@/components/Layout';
import CinematicJourney from '@/components/editorial/CinematicJourney';
import HorizontalIntelligence from '@/components/editorial/HorizontalIntelligence';
import AskReloBand from '@/components/editorial/AskReloBand';
import LandingListSignup from '@/components/editorial/LandingListSignup';

export default function HomePage() {
  return (
    <Layout>
      <main>
        <CinematicJourney />
        <section className="home-intro">
          <div>
            <p className="eyebrow">THE RELO NETWORK</p>
            <h2>
              THE CITY,
              <br />
              EDITED.
            </h2>
            <p>
              London is not difficult because it lacks choices. It is difficult
              because the best choice depends on the life you are building. We
              combine independent guidance, live city intelligence and trusted
              people—so your first London decisions feel considered, not
              improvised.
            </p>
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
                'We listen, assess and map your priorities.',
              ],
              ['02', 'SHORTLIST', 'We curate options matched to your life.'],
              ['03', 'SETTLE IN', 'We handle the details so you feel at home.'],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
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
              'COMMUTE',
              '22 mins to Bank',
              '18 mins to Bank',
              '16 mins to Bank',
              '24 mins to Bank',
              'SCHOOLS',
              '★★★★★',
              '★★★★★',
              '★★★★☆',
              '★★★★☆',
              'LIFESTYLE',
              'Village feel',
              'Museums & green space',
              'Creative & connected',
              'Riverside & parks',
              'OVERALL',
              '9.2',
              '8.8',
              '8.3',
              '8.0',
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
          <LandingListSignup />
        </section>
        <AskReloBand />
      </main>
    </Layout>
  );
}
