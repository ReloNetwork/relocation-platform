import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
};
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="ABOUT"
        title="LONDON, SEEN THROUGH YOUR LIFE."
        intro="Relo Network is a founder-led London relocation service for international professionals, individuals, couples and families. We help you identify the right neighbourhood, find a home that fits your life and connect with useful local expertise. Our Property Hunt LIVE programme brings that same perspective to real London homes and the streets around them."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="HOW WE WORK"
        items={[
          {
            number: '01',
            title: 'Founder-led',
            text: 'A personal, practical approach to home search and settling in, grounded in international relocation experience.',
          },
          {
            number: '02',
            title: 'Thoughtful trade-offs',
            text: 'We consider homes alongside commutes, schools when relevant, community and everyday routines. Time-sensitive details require fresh verification.',
          },
          {
            number: '03',
            title: 'See London for yourself',
            text: 'Property Hunt LIVE brings homes and neighbourhoods to international audiences through honest, interactive exploration. Property representatives can propose viewing collaborations through our dedicated programme.',
          },
        ]}
      />
    </Layout>
  );
}
