import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'About' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="ABOUT"
        title="HELP FOR THE WHOLE MOVE."
        intro="Finding a home is only one part of moving to London. We help you understand your choices and plan the move in a sensible order."
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
            title: 'Carefully checked',
            text: 'We check journeys, schools and current market information before making a recommendation.',
          },
          {
            number: '03',
            title: 'Easy to reach',
            text: 'You have one clear point of contact from the first call through your first weeks in London.',
          },
        ]}
      />
    </Layout>
  );
}
