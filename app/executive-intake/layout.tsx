import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Move',
  description:
    'Share a private London relocation brief for a human review of your timing, household and priorities.',
  alternates: { canonical: '/executive-intake' },
};

export default function ExecutiveIntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
