import type { Metadata } from 'next'
import JournalArticle from '@/components/editorial/JournalArticle'
export const metadata: Metadata = { title: 'Reading London’s property market', description: 'A decision framework for people searching for a London home.' }
export default function Page() { return <JournalArticle slug="london-property-trends-2025" /> }
