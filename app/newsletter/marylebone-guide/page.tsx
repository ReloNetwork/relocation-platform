import type { Metadata } from 'next';
import JournalArticle from '@/components/editorial/JournalArticle';
export const metadata: Metadata = {
  title: {
    absolute: 'Marylebone: village life, central London | The Relo Network',
  },
  description: 'A practical relocation briefing for evaluating Marylebone.',
  alternates: { canonical: '/newsletter/marylebone-guide' },
  openGraph: { url: '/newsletter/marylebone-guide', type: 'article' },
};
export default function Page() {
  return <JournalArticle slug="marylebone-guide" />;
}
