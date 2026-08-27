import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Move to London' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="MOVE"
        title="ARRIVE ALREADY SETTLED."
        intro="Tell us how you want to live in London. We can help with the home search, schools, paperwork and the practical parts of settling in."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="THE PROGRAMME"
        items={[
          {
            number: '01',
            title: 'Brief',
            text: 'We learn your timing, budget, commute and family needs.',
          },
          {
            number: '02',
            title: 'Shortlist',
            text: 'You receive a focused list of areas and suitable homes.',
          },
          {
            number: '03',
            title: 'Secure',
            text: 'We help coordinate offers, references, contracts and applications.',
          },
          {
            number: '04',
            title: 'Settle',
            text: 'We help organise utilities, registrations and your first weeks.',
          },
        ]}
      />
    </Layout>
  );
}
