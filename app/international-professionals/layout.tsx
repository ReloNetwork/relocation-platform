import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan Your London Move',
  description:
    'A practical starting plan for international professionals moving to London or making a new decision about life here.',
  alternates: { canonical: '/international-professionals' },
}

export default function InternationalProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return children
}
