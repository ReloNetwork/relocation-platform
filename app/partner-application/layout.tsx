import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with us',
  description:
    'Explore clearly labelled editorial partnerships for businesses that help international professionals and families settle in London.',
  alternates: { canonical: '/partner-application' },
};

export default function PartnerApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
