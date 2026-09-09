import type { Metadata } from 'next';
import JournalArticle from '@/components/editorial/JournalArticle';
export const metadata: Metadata = {
  title: { absolute: 'Reading London’s property market | The Relo Network' },
  description: 'A decision framework for people searching for a London home.',
  alternates: { canonical: '/newsletter/london-property-trends-2025' },
  openGraph: {
    url: '/newsletter/london-property-trends-2025',
    type: 'article',
  },
};
export default function Page() {
  return <JournalArticle slug="london-property-trends-2025" />;
}
