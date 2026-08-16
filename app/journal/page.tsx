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
            title: 'Notting Hill in the quiet months',
            text: 'Which streets hold their light and what the school run costs in minutes.',
          },
          {
            title: 'Twelve tables worth crossing town for',
            text: 'Where our advisers book when the diary is tight.',
          },
          {
            title: 'Furnishing a period flat in six weeks',
            text: 'The trades to book first and what to buy second-hand.',
          },
        ]}
      />
    </Layout>
  );
}
