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
            title: 'Canary Wharf beyond the working week',
            text: 'A practical test of homes, connections and daily life beyond the office.',
            href: '/newsletter/canary-wharf-guide',
          },
          {
            title: 'Planning an American curriculum move',
            text: 'Admissions, timing and continuity for families moving to London.',
            href: '/newsletter/american-school-london-guide',
          },
          {
            title: 'The London Brief',
            text: 'Neighbourhood notes, practical moving advice and selected partner expertise, delivered by email.',
            href: '/newsletter',
            action: 'Browse and subscribe',
          },
        ]}
        partnership={{
          eyebrow: 'SUPPORTED EDITORIAL',
          title: 'USEFUL SERIES, BUILT TO LAST.',
          text: 'Selected partners can support practical reporting for professionals, founders and families moving to London. The reader question comes first, and The Relo Network keeps editorial control.',
          formats: [
            'The London Landing Plan',
            'Area Decoder',
            'Family and Founder Landing',
          ],
        }}
      />
    </Layout>
  );
}
