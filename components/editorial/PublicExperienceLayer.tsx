'use client';

import { usePathname } from 'next/navigation';
import UnifiedAssistant from '@/components/UnifiedAssistant';

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

  return <UnifiedAssistant variant="floating" />;
}
