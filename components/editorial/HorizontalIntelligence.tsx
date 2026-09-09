'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  {
    number: '01',
    kicker: 'NEIGHBOURHOODS',
    title: 'Choose a life,\nnot a postcode.',
    text: 'Compare areas by commute, schools, pace and the way everyday life feels.',
    image: '/images/editorial/london-street-hero.webp',
    ask: 'Compare neighbourhoods',
    href: '/live',
  },
  {
    number: '02',
    kicker: 'CULTURE & LIFESTYLE',
    title: 'The city,\nproperly edited.',
    text: 'Restaurants worth booking, galleries worth the detour and places you will want to return to.',
    image: '/images/editorial/london-table.webp',
    ask: 'Build my London weekend',
    href: '/discover',
  },
  {
    number: '03',
    kicker: 'DESIGN & LIVING',
    title: 'Make it feel\nlike yours.',
    text: 'Homes, interiors and trusted specialists who can help a new place feel like yours.',
    image: '/images/editorial/london-interior.webp',
    ask: 'Find trusted specialists',
    href: '/network',
  },
  {
    number: '04',
    kicker: 'ASK RELO',
    title: 'Ask one question,\nthen the next.',
    text: 'Ask Relo remembers the questions in your conversation, so its answers can be more useful.',
    image: '/images/editorial/london-arrival-cinematic.webp',
    ask: 'Ask Relo now',
    href: '/ask-relo',
  },
];

export default function HorizontalIntelligence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(1, distance))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="intelligence-world">
      <div className="intelligence-world__sticky">
        <header>
          <span className="vertical-label">THE LONDON INDEX</span>
          <p className="eyebrow">EXPLORE LONDON</p>
          <h2>FIND THE LONDON THAT FITS YOU.</h2>
          <div className="intelligence-world__progress">
            <i style={{ width: `${progress * 100}%` }} />
          </div>
        </header>
        <div
          className="intelligence-world__track"
          style={{ transform: `translate3d(-${progress * 75}%,0,0)` }}
        >
          {chapters.map((chapter) => (
            <article key={chapter.number}>
              <div className="intelligence-world__image">
                <Image src={chapter.image} fill sizes="80vw" alt="" />
                <span>{chapter.number}</span>
              </div>
              <div className="intelligence-world__text">
                <p className="eyebrow">{chapter.kicker}</p>
                <h3>
                  {chapter.title.split('\n').map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p>{chapter.text}</p>
                <Link href={chapter.href}>
                  {chapter.ask} <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
