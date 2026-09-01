import Layout from '@/components/Layout';
import EditorialPage from '@/components/editorial/EditorialPage';
import { articleUrl, editorialArticles } from '@/lib/editorial-articles';
import {
  editorialSubjectLabel,
  isEditorialSubjectId,
} from '@/lib/editorial-subjects';
export const metadata = { title: 'Journal' };

export default function Page({
  searchParams,
}: {
  searchParams?: { subject?: string | string[] };
}) {
  const requestedSubject = Array.isArray(searchParams?.subject)
    ? searchParams?.subject[0]
    : searchParams?.subject;
  const activeSubject = isEditorialSubjectId(requestedSubject)
    ? requestedSubject
    : 'all';
  const visibleArticles = editorialArticles.filter(
    (article) => activeSubject === 'all' || article.subject === activeSubject
  );
  const items = visibleArticles.map((article) => ({
    title: article.title,
    text: article.excerpt,
    href: articleUrl(article.slug),
  }));

  if (activeSubject === 'all') {
    items.push({
      title: 'The London Brief',
      text: 'Neighbourhood notes, practical moving advice and selected partner expertise, delivered by email.',
      href: '/newsletter',
    });
  }

  return (
    <Layout>
      <EditorialPage
        label="JOURNAL"
        title="NOTES FROM THE CITY."
        intro="Reporting for people moving to London and those who want to understand it better."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle={
          activeSubject === 'all'
            ? 'LATEST'
            : editorialSubjectLabel(activeSubject).toUpperCase()
        }
        items={items}
        activeSubject={activeSubject}
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
