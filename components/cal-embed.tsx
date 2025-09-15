'use client';

import { useEffect } from 'react';

interface CalEmbedProps {
  calLink?: string;
  config?: {
    name?: string;
    email?: string;
    guests?: string[];
    theme?: 'light' | 'dark' | 'auto';
  };
  className?: string;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed({ 
  calLink = 'relo-network/consultation', 
  config = {},
  className = 'w-full h-[600px]' 
}: CalEmbedProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Cal) {
        window.Cal('init', {
          origin: 'https://app.cal.com'
        });
      }
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const embedConfig = {
    theme: config.theme || 'auto',
    hideEventTypeDetails: false,
    layout: 'month_view',
    ...config
  };

  const configString = encodeURIComponent(JSON.stringify(embedConfig));

  return (
    <div className={className}>
      <iframe
        src={`https://app.cal.com/${calLink}/embed?embed-type=inline&config=${configString}`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}
        title="Cal.com Booking"
      />
    </div>
  );
}

// Popup version for modal usage
export function CalPopup({ 
  calLink = 'relo-network/consultation',
  config = {},
  children,
  className = ''
}: CalEmbedProps & { 
  children: React.ReactNode;
}) {
  const handleClick = () => {
    if (window.Cal) {
      window.Cal('openModal', calLink, config);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}