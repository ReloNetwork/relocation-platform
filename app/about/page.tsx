import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'About' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="ABOUT"
        title="THE PEOPLE BEHIND THE MOVE."
        intro="Finding a property is only one part of moving to London. We help you understand the city well enough to choose where your life can work."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle="HOW WE WORK"
        items={[
          {
            number: '01',
            title: 'Independent',
            text: 'Our advice answers to you and nobody else.',
          },
          {
            number: '02',
            title: 'Evidence-led',
            text: 'We check commutes, schools and current market information before making a recommendation.',
          },
          {
            number: '03',
            title: 'Present',
            text: 'You have one clear conversation from the first call through the first weeks in London.',
          },
        ]}
      />
    </Layout>
  );
}
