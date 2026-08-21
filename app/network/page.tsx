import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'The Network' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="NETWORK"
        title="A CITY RUNS ON PEOPLE."
        intro="Vetted specialists across property, education, law and design—plus the members who use them. Client introductions remain independent; selected partners can also collaborate with our editorial studio."
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
          {
            title: 'Editorial partnerships',
            text: 'Thoughtful features and sponsorships for brands serving international Londoners.',
            href: '/partner-application',
            action: 'Request the partner brief',
          },
        ]}
      />
    </Layout>
  );
}
