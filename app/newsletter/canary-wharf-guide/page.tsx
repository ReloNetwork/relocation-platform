import type { Metadata } from 'next';
import JournalArticle from '@/components/editorial/JournalArticle';
export const metadata: Metadata = {
  title: {
    absolute: 'Canary Wharf beyond the working week | The Relo Network',
  },
  description: 'A practical relocation briefing for evaluating Canary Wharf.',
  alternates: { canonical: '/newsletter/canary-wharf-guide' },
  openGraph: { url: '/newsletter/canary-wharf-guide', type: 'article' },
};
export default function Page() {
  return <JournalArticle slug="canary-wharf-guide" />;
}
