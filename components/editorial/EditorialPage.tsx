'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AskReloBand from './AskReloBand';
import EditorialPartnershipBand, {
  type EditorialPartnership,
} from './EditorialPartnershipBand';
import FlightFilm from './FlightFilm';
import EditorialSubjectNav from './EditorialSubjectNav';
import type { EditorialSubjectId } from '@/lib/editorial-subjects';

type Item = {
  title: string;
  text: string;
  number?: string;
  href?: string;
  action?: string;
};

export default function EditorialPage({
  label,
  title,
  intro,
  image,
  sectionTitle,
  items,
  partnership,
  activeSubject,
}: {
  label: string;
  title: string;
  intro: string;
  image: string;
  sectionTitle: string;
  items: Item[];
  partnership?: EditorialPartnership;
  activeSubject?: EditorialSubjectId;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const chapter: Record<string, [number, number]> = {
    MOVE: [0.28, 0.43],
    LIVE: [0.43, 0.68],
    DISCOVER: [0.68, 0.86],
    NETWORK: [0.72, 0.9],
    JOURNAL: [0.5, 0.72],
    ABOUT: [0.12, 0.3],
  };
  const [start, end] = chapter[label] ?? [0, 0.18];
  const filmProgress = start + heroProgress * (end - start);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(
        1,
        hero.offsetHeight + window.innerHeight * 0.25
      );
      setHeroProgress(Math.min(1, Math.max(0, -rect.top / distance + 0.18)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <section ref={heroRef} className="editorial-hero editorial-hero--film">
        <span className="vertical-label">{label}</span>
        <div className="editorial-hero__copy">
          <h1>{title}</h1>
          <i />
          <p>{intro}</p>
        </div>
        <div className="editorial-hero__portal">
          <FlightFilm progress={filmProgress} fallback={image} />
          <span>{label} / LONDON</span>
        </div>
      </section>
      {activeSubject ? (
        <EditorialSubjectNav
          activeSubject={activeSubject}
          basePath="/journal"
        />
      ) : null}
      <section className="editorial-grid">
        <h2>{sectionTitle}</h2>
        <div>
          {items.length === 0 ? (
            <article className="editorial-grid__empty">
              <span>IN PRODUCTION</span>
              <h3>The first briefing is being prepared.</h3>
              <p>
                This subject is part of the editorial programme. Explore another
                section now or join The London Brief for new editions.
              </p>
              <Link className="editorial-grid__link" href="/newsletter">
                Visit The London Brief <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ) : null}
          {items.map((item) => (
            <article key={item.title}>
              {item.number && <span>{item.number}</span>}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.href && (
                <Link className="editorial-grid__link" href={item.href}>
                  {item.action ?? 'Read more'} <span aria-hidden="true">↗</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
      {partnership ? (
        <EditorialPartnershipBand partnership={partnership} />
      ) : null}
      <AskReloBand
        compact
        placeholder={`Ask Relo about ${label.toLowerCase()} in London`}
      />
    </main>
  );
}
