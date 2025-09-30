'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import RetellVoiceAgent from '@/components/RetellVoiceAgent';
import ErrorBoundary, { AIChatErrorFallback } from '@/components/ErrorBoundary';

export default function StickyAsk() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const hideOn = ['/concierge', '/ask', '/account', '/login'];

  useEffect(() => {
    if (hideOn.includes(pathname)) { setShow(false); return; }
    
    // Always show on homepage, show on scroll for other pages
    let onScroll: (() => void) | undefined;
    
    if (pathname === '/') {
      setShow(true);
    } else {
      onScroll = () => setShow(window.scrollY > 280);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    return () => {
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <ErrorBoundary fallback={AIChatErrorFallback}>
      <RetellVoiceAgent variant="floating" />
    </ErrorBoundary>
  );
}