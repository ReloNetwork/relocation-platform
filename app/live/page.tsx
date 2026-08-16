import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Live in London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="LIVE"
        title="WHERE LONDON ACTUALLY WORKS."
        intro="Neighbourhoods compared on the measures that decide a week: the commute, the school run, what is open on Sunday and how the street feels in February."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="PRACTICAL LONDON"
        items={[
          {
            title: 'Schooling',
            text: 'Admissions, catchments and the timelines that decide both.',
          },
          {
            title: 'Healthcare',
            text: 'Registering with a GP, private cover and trusted practices.',
          },
          {
            title: 'Getting around',
            text: 'Zones, the Elizabeth line, cycling and when a car is worth keeping.',
          },
        ]}
      />
    </Layout>
  );
}
