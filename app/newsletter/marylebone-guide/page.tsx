import type { Metadata } from 'next'
import JournalArticle from '@/components/editorial/JournalArticle'
export const metadata: Metadata = { title: 'Marylebone: village life, central London', description: 'A practical relocation briefing for evaluating Marylebone.' }
export default function Page() { return <JournalArticle slug="marylebone-guide" /> }
