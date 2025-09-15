'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Mic } from 'lucide-react';

export default function StickyAsk() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const hideOn = ['/concierge', '/ask', '/account', '/login'];

  useEffect(() => {
    if (hideOn.includes(pathname)) { setShow(false); return; }
    const onScroll = () => setShow(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!show) return null;

  return (
    <>
      <style jsx>{`
        @keyframes pulseAsk {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 32px rgba(201, 162, 74, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 48px rgba(201, 162, 74, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.3);
          }
        }
        .animate-pulse-ask {
          animation: pulseAsk 2.5s ease-in-out infinite;
        }
      `}</style>
      <a 
        href="/concierge"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full px-8 py-5 bg-[#C9A24A] hover:bg-[#B8923D] text-white transition-all duration-300 border-2 border-white font-bold text-base transform hover:scale-110 animate-pulse-ask focus-ring"
        style={{ 
          background: 'linear-gradient(135deg, #C9A24A 0%, #B8923D 100%)'
        }}
        aria-label="Ask Relo AI Assistant"
      >
        <Mic className="w-5 h-5 mr-3" />
        Ask Relo
      </a>
    </>
  );
}