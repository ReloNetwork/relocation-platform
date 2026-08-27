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
              London gives you endless choices. The hard part is knowing which
              ones fit your life. We give you clear advice, current local insight
              and trusted people, so you can make your first decisions with confidence.
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
                'Tell us what matters and when you need to move.',
              ],
              ['02', 'SHORTLIST', 'See a focused list of areas and homes that fit.'],
              ['03', 'SETTLE IN', 'We coordinate the practical details and help you settle in.'],
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
          <LandingListSignup />
        </section>
        <AskReloBand />
      </main>
    </Layout>
  );
}
