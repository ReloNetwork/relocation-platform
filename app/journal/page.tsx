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
        title="PRACTICAL LONDON GUIDES."
        intro="Clear guides for people moving to London and anyone who wants to understand the city better."
        image="/images/editorial/london-street-hero.webp"
        sectionTitle={
          activeSubject === 'all'
            ? 'LATEST GUIDES'
            : editorialSubjectLabel(activeSubject).toUpperCase()
        }
        items={items}
        activeSubject={activeSubject}
        partnership={{
          eyebrow: 'PARTNER WITH THE JOURNAL',
          title: 'HELP US ANSWER A USEFUL QUESTION.',
          text: 'Selected businesses can sponsor a practical guide for people moving to London. We choose the question and keep control of the final article.',
          formats: [
            'Sponsored practical guide',
            'Sponsored neighbourhood guide',
            'Three-month content series',
          ],
        }}
      />
    </Layout>
  );
}
