import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask Relo',
  description:
    'Ask a London relocation question about neighbourhoods, schools, housing or the order of your move.',
  alternates: { canonical: '/ask-relo' },
};

export default function AskReloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
