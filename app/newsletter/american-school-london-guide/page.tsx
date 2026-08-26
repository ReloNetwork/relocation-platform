import type { Metadata } from 'next'
import JournalArticle from '@/components/editorial/JournalArticle'
export const metadata: Metadata = { title: 'Planning an American curriculum move', description: 'A practical education-transition briefing for families relocating to London.' }
export default function Page() { return <JournalArticle slug="american-school-london-guide" /> }
