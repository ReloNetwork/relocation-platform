import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import LandingListSignup from '@/components/editorial/LandingListSignup';
import AskReloBand from '@/components/editorial/AskReloBand';
export const metadata: Metadata = {
  title: 'The London Landing List',
  description:
    'Thirty decisions to make before relocating to London, covering neighbourhoods, schools, housing, healthcare and your first ninety days.',
  alternates: { canonical: '/london-landing-list' },
};
const sections: Array<[string, string[]]> = [
  [
    'THE BRIEF',
    [
      'Set the real move window',
      'List the journeys you will repeat',
      'Separate needs from preferences',
      'Define your workable housing budget',
      'Name the decisions requiring expert advice',
    ],
  ],
  [
    'WHERE TO LIVE',
    [
      'Compare weekly life, not postcodes',
      'Test peak-time commutes',
      'Map school options before property viewings',
      'Visit on a weekday and Sunday',
      'Check future construction and transport',
    ],
  ],
  [
    'THE HOME',
    [
      'Prepare referencing documents',
      'Understand deposit and holding-payment rules',
      'Price utilities and council tax',
      'Plan furniture and storage',
      'Record tenancy condition carefully',
    ],
  ],
  [
    'FAMILY & SCHOOLS',
    [
      'Identify admissions timelines',
      'Check catchments independently',
      'Plan childcare early',
      'Map clubs and activities',
      'Include every family member in the brief',
    ],
  ],
  [
    'LANDING ADMIN',
    [
      'Prepare Right to Rent evidence',
      'Arrange banking and payments',
      'Register healthcare',
      'Choose insurance cover',
      'Sequence broadband, utilities and mobile',
    ],
  ],
  [
    'THE FIRST 90 DAYS',
    [
      'Create a local trusted-contact list',
      'Book the first essential appointments',
      'Build a weekly London rhythm',
      'Review what is not working',
      'Keep one accountable move record',
    ],
  ],
];
export default function Page() {
  let n = 0;
  return (
    <Layout>
      <main>
        <section className="editorial-hero">
          <span className="vertical-label">THE LIST</span>
          <div>
            <p className="eyebrow">FREE LONDON RELOCATION GUIDE</p>
            <h1>LAND READY.</h1>
            <i />
            <p>
              Thirty practical decisions in a clear order, so you can avoid missed
              steps and costly changes later.
            </p>
          </div>
          <div
            style={{ background: '#142e50', padding: '55px', color: 'white' }}
          >
            <LandingListSignup
              enabled={Boolean(
                process.env.BEEHIIV_API_KEY &&
                  process.env.BEEHIIV_PUBLICATION_ID &&
                  process.env.BEEHIIV_LANDING_LIST_AUTOMATION_ID
              )}
            />
          </div>
        </section>
        <section className="discover-section">
          <h2>
            THE LONDON
            <br />
            LANDING LIST
          </h2>
          {sections.map(([title, items]) => (
            <section
              key={title}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                borderTop: '1px solid #ddd',
                padding: '35px 0',
              }}
            >
              <h3
                style={{
                  color: '#142e50',
                  letterSpacing: '.16em',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 12,
                }}
              >
                {title}
              </h3>
              <div>
                {(items as string[]).map((item) => (
                  <p
                    key={item}
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 25,
                      borderBottom: '1px solid #e5e0d7',
                      paddingBottom: 18,
                    }}
                  >
                    <span
                      style={{
                        color: '#be8431',
                        fontSize: 14,
                        marginRight: 20,
                      }}
                    >
                      {String(++n).padStart(2, '0')}
                    </span>
                    {item}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </section>
        <AskReloBand />
      </main>
    </Layout>
  );
}
