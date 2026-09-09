import type { Metadata } from 'next';
import JournalArticle from '@/components/editorial/JournalArticle';
export const metadata: Metadata = {
  title: {
    absolute: 'Planning an American curriculum move | The Relo Network',
  },
  description:
    'A practical education-transition briefing for families relocating to London.',
  alternates: { canonical: '/newsletter/american-school-london-guide' },
  openGraph: {
    url: '/newsletter/american-school-london-guide',
    type: 'article',
  },
};
export default function Page() {
  return <JournalArticle slug="american-school-london-guide" />;
}
