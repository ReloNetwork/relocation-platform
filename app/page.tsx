import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ScrollFlightHero from '@/components/editorial/ScrollFlightHero';
import AskReloBand from '@/components/editorial/AskReloBand';
import LandingListSignup from '@/components/editorial/LandingListSignup';

const cards = [
  [
    'NEIGHBOURHOODS',
    'Twelve areas, walked and written up: who lives there, what it costs and how it changes at night.',
    '/images/editorial/london-street-hero.webp',
  ],
  [
    'CULTURE & LIFESTYLE',
    'Tables worth booking, galleries worth the detour and the members’ rooms that still let you think.',
    '/images/editorial/london-table.webp',
  ],
  [
    'DESIGN & LIVING',
    'Architects, joiners and dealers we trust with a period flat and a short deadline.',
    '/images/editorial/london-interior.webp',
  ],
];
export default function HomePage() {
  return (
    <Layout>
      <main>
        <ScrollFlightHero />
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
        <section className="ask-feature">
          <h2>ASK RELO</h2>
          <p>Your London, intelligently answered.</p>
          <Link className="button button--light" href="/ask-relo">
            ASK A QUESTION →
          </Link>
        </section>
        <section className="discover-section">
          <span className="vertical-label">DISCOVER</span>
          <h2>
            THE LONDON
            <br />
            YOU CAME FOR.
          </h2>
          <div className="discover-cards">
            {cards.map(([title, text, image]) => (
              <article key={title}>
                <Image src={image} width={900} height={900} alt="" />
                <div>
                  <h3>{title} →</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
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
