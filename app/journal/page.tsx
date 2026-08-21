import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'Journal' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="JOURNAL"
        title="NOTES FROM THE CITY."
        intro="Reporting for people moving to London and those who want to understand it better."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="LATEST"
        items={[
          {
            title: 'Mayfair: a resident’s guide',
            text: 'Homes, private clubs, culture and the quieter rhythms behind London’s most recognised address.',
            href: '/newsletter/mayfair-guide',
          },
          {
            title: 'Marylebone: village life, central London',
            text: 'A practical neighbourhood briefing for families and professionals considering the area.',
            href: '/newsletter/marylebone-guide',
          },
          {
            title: 'The London property market',
            text: 'A relocation-focused reading of timing, supply and decision-making in the capital.',
            href: '/newsletter/london-property-trends-2025',
          },
          {
            title: 'The London Brief',
            text: 'Neighbourhood notes, relocation intelligence and selected partner expertise, delivered by email.',
            href: '/newsletter',
            action: 'Browse and subscribe',
          },
        ]}
      />
    </Layout>
  );
}
