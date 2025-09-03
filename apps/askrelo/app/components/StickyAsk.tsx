'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyAsk() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const hideOn = ['/ask', '/account', '/login'];

  useEffect(() => {
    if (hideOn.includes(pathname)) { setShow(false); return; }
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!show) return null;

  return (
    <a href="/ask"
       className="fixed bottom-4 right-4 z-50 rounded-full px-5 py-3 bg-[var(--primary)] text-white shadow-lg focus-ring"
       aria-label="Ask Relo">
      Ask Relo
    </a>
  );
}