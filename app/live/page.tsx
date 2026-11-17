import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Live in London',
  alternates: { canonical: '/live' },
};
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="LIVE"
        title="WHERE LONDON ACTUALLY WORKS."
        intro="Discover London through neighbourhood perspectives, real property viewings and the details that make a home work for you. Our Property Hunt LIVE programme invites viewers into the conversation."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="GO BEYOND THE LISTING"
        items={[
          {
            title: 'Property Hunt LIVE',
            text: 'Explore the homes, neighbourhoods and real-life trade-offs that matter to people relocating to London.',
            href: '/property-hunt-live',
          },
          {
            title: 'A neighbourhood-first search',
            text: 'Make sense of commuting, housing character, parks, restaurants and daily routines before committing.',
          },
          {
            title: 'For estate agents and developers',
            text: 'Propose a suitable home for an interactive Property Hunt LIVE viewing.',
            href: '/partner-application?interest=property-live',
          },
        ]}
        partnership={{
          eyebrow: 'PROPERTY HUNT LIVE',
          title: 'YOUR PROPERTY. A MORE INFORMED CONVERSATION.',
          text: 'A property collaboration starts with a conversation about audience fit, filming access and useful property details. Any paid content is clearly disclosed, and editorial recommendations remain independent.',
          formats: [
            'Interactive viewing concept',
            'Neighbourhood context',
            'Permitted short-form highlights',
          ],
        }}
      />
    </Layout>
  );
}
