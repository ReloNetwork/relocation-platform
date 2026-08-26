import type { Metadata } from 'next'
import JournalArticle from '@/components/editorial/JournalArticle'
export const metadata: Metadata = { title: 'Canary Wharf beyond the working week', description: 'A practical relocation briefing for evaluating Canary Wharf.' }
export default function Page() { return <JournalArticle slug="canary-wharf-guide" /> }
