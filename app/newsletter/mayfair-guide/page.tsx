import type { Metadata } from 'next';
import JournalArticle from '@/components/editorial/JournalArticle';
export const metadata: Metadata = {
  title: { absolute: 'Mayfair: a resident’s guide | The Relo Network' },
  description:
    'A practical relocation briefing for evaluating a home in Mayfair.',
  alternates: { canonical: '/newsletter/mayfair-guide' },
  openGraph: { url: '/newsletter/mayfair-guide', type: 'article' },
};
export default function Page() {
  return <JournalArticle slug="mayfair-guide" />;
}
