'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ScrollFlightHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (
      !video ||
      !section ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const update = () => {
      if (!video.duration) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, distance))
      );
      video.currentTime = progress * Math.max(0, video.duration - 0.1);
    };
    const ready = () => update();
    video.addEventListener('loadedmetadata', ready);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      video.removeEventListener('loadedmetadata', ready);
      window.removeEventListener('scroll', update);
    };
  }, []);
  return (
    <section ref={sectionRef} className="flight-hero">
      <div className="flight-hero__sticky">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster="/images/editorial/london-street-hero.webp"
        >
          <source src="/london-skyline-hero.mp4" type="video/mp4" />
        </video>
        <div className="flight-hero__veil" />
        <div className="flight-hero__copy">
          <span className="vertical-label">THE LONDON EDIT</span>
          <p className="eyebrow">THE RELO NETWORK · LONDON MADE CLEARER</p>
          <h1>
            LONDON,
            <br />
            BUT BETTER.
          </h1>
          <p>
            Clear help with areas, homes, schools and the people you may need
            for your move.
          </p>
          <div>
            <Link className="button button--gold" href="/ask-relo">
              ASK RELO
            </Link>
            <Link className="button button--light" href="/move">
              START YOUR MOVE
            </Link>
          </div>
        </div>
        <span className="flight-hero__index">
          01
          <br />
          <small>YOUR LONDON MOVE</small>
        </span>
      </div>
    </section>
  );
}
