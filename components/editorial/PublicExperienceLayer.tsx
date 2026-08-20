'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const privatePrefixes = [
  '/admin',
  '/account',
  '/auth',
  '/case',
  '/checkout',
  '/client',
  '/dashboard',
  '/debug',
  '/demo-dashboard',
  '/documents-demo',
  '/email-sender',
  '/login',
  '/onboarding',
  '/payment',
  '/tasks',
  '/test',
];

export default function PublicExperienceLayer() {
  const pathname = usePathname();
  const isPrivate = privatePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isPrivate || pathname === '/ask-relo' || pathname === '/ask') return null;

  return (
    <Link className="ask-relo-orbit" href="/ask-relo" aria-label="Open Ask Relo">
      <span>ASK RELO</span>
      <i>→</i>
    </Link>
  );
}
