import type { Metadata } from 'next'
import JournalArticle from '@/components/editorial/JournalArticle'
export const metadata: Metadata = { title: 'Mayfair: a resident’s guide', description: 'A practical relocation briefing for evaluating a home in Mayfair.' }
export default function Page() { return <JournalArticle slug="mayfair-guide" /> }
