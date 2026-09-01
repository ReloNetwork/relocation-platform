import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Discover London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="DISCOVER"
        title="THE CITY, EDITED."
        intro="Explore neighbourhoods, restaurants, galleries and interiors through shortlists shaped by people who know the city."
        image="/images/editorial/london-table.webp"
        sectionTitle="WHERE TO START"
        items={[
          {
            number: '01',
            title: 'West',
            text: 'Notting Hill, Holland Park and Kensington.',
          },
          {
            number: '02',
            title: 'Central',
            text: 'Marylebone, Fitzrovia and Clerkenwell.',
          },
          {
            number: '03',
            title: 'South',
            text: 'Battersea, Barnes and Dulwich.',
          },
          {
            number: '04',
            title: 'North',
            text: 'Hampstead, Primrose Hill and Islington.',
          },
        ]}
        partnership={{
          eyebrow: 'AREA DECODER',
          title: 'NEIGHBOURHOODS, PROPERLY EXAMINED.',
          text: 'Property, accommodation and destination partners may support on-the-ground neighbourhood reporting. Every guide keeps the same comparison criteria and names the trade-offs.',
          formats: [
            'Area briefing',
            'Reader itinerary',
            'Newsletter placement',
          ],
        }}
      />
    </Layout>
  );
}
