import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'About' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="ABOUT"
        title="THE PEOPLE BEHIND THE MOVE."
        intro="The hardest part of moving to London is not finding a property. It is understanding a city of eight million people well enough to choose where your life should sit inside it."
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
            text: 'Commutes, schools and market context inform each recommendation.',
          },
          {
            number: '03',
            title: 'Present',
            text: 'One connected conversation from first call to first dinner party.',
          },
        ]}
      />
    </Layout>
  );
}
