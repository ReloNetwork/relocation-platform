import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'The Network' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="NETWORK"
        title="A CITY RUNS ON PEOPLE."
        intro="Vetted specialists across property, education, law and design—plus the members who use them. Introductions are made personally, never sold."
        image="/images/editorial/london-interior.webp"
        sectionTitle="PARTNERS"
        items={[
          {
            title: 'Property & search',
            text: 'Buying agents, lettings specialists and surveyors.',
          },
          {
            title: 'Education',
            text: 'Admissions consultants, tutors and school specialists.',
          },
          {
            title: 'Legal & tax',
            text: 'Immigration counsel and cross-border advisers.',
          },
          {
            title: 'Design & build',
            text: 'Architects, joiners, dealers and trusted trades.',
          },
          {
            title: 'Household',
            text: 'Staffing, shipping, storage and insurance.',
          },
          {
            title: 'Corporate mobility',
            text: 'Programmes for firms relocating teams.',
          },
        ]}
      />
    </Layout>
  );
}
