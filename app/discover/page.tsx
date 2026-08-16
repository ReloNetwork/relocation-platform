import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Discover London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="DISCOVER"
        title="THE CITY, EDITED."
        intro="Neighbourhoods, tables, galleries and interiors—the shortlists our advisers keep current through the people who live on those streets."
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
      />
    </Layout>
  );
}
