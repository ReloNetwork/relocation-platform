import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
export const metadata = { title: 'The Network' };
export default function Page() {
  return (
    <Layout>
      <EditorialPage
        label="NETWORK"
        title="FIND THE RIGHT PEOPLE."
        intro="Browse specialists in property, education, law, tax and household services. A paid partnership never decides who we suggest to a client."
        image="/images/editorial/london-interior.webp"
        sectionTitle="EXPERTISE"
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
            text: 'Clearly labelled articles and newsletter placements for businesses that help people settle in London.',
            href: '/partner-application',
            action: 'Request the partner brief',
          },
        ]}
        partnership={{
          eyebrow: 'WORK WITH THE RELO NETWORK',
          title: 'SHARE USEFUL EXPERTISE.',
          text: 'Selected businesses can sponsor a practical guide, create a reviewed business profile or place a clear partner message in The London Brief.',
          formats: [
            'Sponsored practical guide',
            'Reviewed business profile',
            'Expert Q&A series',
          ],
        }}
      />
    </Layout>
  );
}
