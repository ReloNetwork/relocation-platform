import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Move to London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="MOVE"
        title="ARRIVE ALREADY SETTLED."
        intro="A managed relocation, from the first shortlist to the day the boxes go. We run the search, paperwork, schools and logistics in parallel."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="THE PROGRAMME"
        items={[
          {
            number: '01',
            title: 'Brief',
            text: 'Priorities, budget, commute and school needs mapped.',
          },
          {
            number: '02',
            title: 'Shortlist',
            text: 'Neighbourhoods and a curated set of homes.',
          },
          {
            number: '03',
            title: 'Secure',
            text: 'Negotiation, referencing, contracts and applications.',
          },
          {
            number: '04',
            title: 'Settle',
            text: 'Utilities, registrations and your first ninety days.',
          },
        ]}
      />
    </Layout>
  );
}
