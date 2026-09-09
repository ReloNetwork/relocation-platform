import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Live in London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="LIVE"
        title="WHERE LONDON ACTUALLY WORKS."
        intro="Compare neighbourhoods through daily life: your commute, the school run, weekends and how each street feels throughout the year."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="PRACTICAL LONDON"
        items={[
          {
            title: 'Schooling',
            text: 'Understand school choices, application dates and the daily journey.',
          },
          {
            title: 'Healthcare',
            text: 'Plan GP registration, private care and the support your family needs.',
          },
          {
            title: 'Getting around',
            text: 'Compare public transport, walking, cycling and whether you need a car.',
          },
        ]}
        partnership={{
          eyebrow: 'FAMILY LANDING',
          title: 'PRACTICAL SUPPORT, CLEARLY LABELLED.',
          text: 'Schools, healthcare and family routines need careful, current information. Suitable organisations may support this reporting without buying a ranking or recommendation.',
          formats: [
            'Expert-reviewed guide',
            'Family checklist',
            'London Brief edition',
          ],
        }}
      />
    </Layout>
  );
}
