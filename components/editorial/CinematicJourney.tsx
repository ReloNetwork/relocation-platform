'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import FlightFilm from './FlightFilm';

const scenes = [
  {
    id: 'arrive',
    number: '01',
    label: 'ARRIVE',
    eyebrow: 'YOUR LONDON, BEFORE YOU LAND',
    title: 'LONDON,\nBUT BETTER.',
    body: 'Independent city intelligence and a named advisor, working ahead of your arrival.',
    prompt: 'Where should we live if I work in Mayfair?',
    image: '/images/editorial/london-arrival-cinematic.webp',
  },
  {
    id: 'move',
    number: '02',
    label: 'MOVE',
    eyebrow: 'ARRIVE ALREADY SETTLED',
    title: 'THE SEARCH\nSTARTS WITH YOU.',
    body: 'Homes, schools and practicalities shortlisted around the life you are actually moving for.',
    prompt: 'Compare Notting Hill and Hampstead for our family',
    image: '/images/editorial/london-street-hero.webp',
  },
  {
    id: 'live',
    number: '03',
    label: 'LIVE',
    eyebrow: 'THE LIVING INDEX',
    title: 'WHERE LONDON\nACTUALLY WORKS.',
    body: 'Commutes, school runs, Sunday rhythms and the details that decide whether an area feels right.',
    prompt: 'Which areas give us a 30-minute school run?',
    image: '/images/editorial/london-interior.webp',
  },
  {
    id: 'discover',
    number: '04',
    label: 'DISCOVER',
    eyebrow: 'THE CITY, EDITED',
    title: 'LIVE LIKE YOU\nBELONG HERE.',
    body: 'The tables, galleries, clubs and specialists our advisors would recommend to a friend.',
    prompt: 'Plan our first perfect Saturday in London',
    image: '/images/editorial/london-table.webp',
  },
  {
    id: 'ask',
    number: '05',
    label: 'ASK RELO',
    eyebrow: 'CITY INTELLIGENCE · 24/7',
    title: 'DON’T SEARCH\nLONDON. ASK IT.',
    body: 'One conversation that remembers your move, connects the decisions and brings in a human when it matters.',
    prompt: 'What have we not thought about yet?',
    image: '/images/editorial/london-arrival-cinematic.webp',
  },
];

// Chapter boundaries follow the actual seven-shot film rather than dividing
// its duration into arbitrary equal slices.
const chapterStarts = [0, 0.28, 0.43, 0.68, 0.86];

const filmLegs = [
  { time: '00:00', start: 0, label: 'LONDON AERIAL' },
  { time: '00:05', start: 5.041667 / 35.291667, label: 'TOWER BRIDGE · RIVER' },
  { time: '00:10', start: 10.083334 / 35.291667, label: 'RIVER · UNDERPASS' },
  { time: '00:15', start: 15.125001 / 35.291667, label: 'UNDERPASS · WALKWAY' },
  { time: '00:20', start: 20.166668 / 35.291667, label: 'WALKWAY · BLACK DOOR' },
  { time: '00:25', start: 25.208335 / 35.291667, label: 'BLACK DOOR · BLUE DOOR' },
  { time: '00:30', start: 30.270285 / 35.291667, label: 'BLUE DOOR · ENTRANCE' },
];

export default function CinematicJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [question, setQuestion] = useState(scenes[0].prompt);

  const active = chapterStarts.reduce(
    (chapter, start, index) => (progress >= start ? index : chapter),
    0
  );
  const scene = scenes[active];
  const activeLeg = filmLegs.reduce(
    (leg, item, index) => (progress >= item.start ? index : leg),
    0
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const next = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
      setProgress(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [active]);

  useEffect(() => setQuestion(scene.prompt), [scene.prompt]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const query = question.trim();
    window.location.assign(
      query ? `/ask-relo?q=${encodeURIComponent(query)}` : '/ask-relo'
    );
  }

  function goToScene(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + chapterStarts[index] * distance + 2,
      behavior: 'smooth',
    });
  }

  function goToFilmLeg(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + filmLegs[index].start * distance + 2,
      behavior: 'smooth',
    });
  }

  return (
    <section
      ref={sectionRef}
      className="cinematic-world"
      aria-label="Your London journey"
    >
      <div className="cinematic-world__stage">
        <div className="cinematic-world__media" aria-hidden="true">
          <FlightFilm progress={progress} fallback={scene.image} />
        </div>
        <div className="cinematic-world__wash" />
        <div className="cinematic-world__grain" />

        <aside className="cinematic-world__rail" aria-label="Journey chapters">
          <span>THE LONDON EDIT</span>
          <div>
            {scenes.map((item, index) => (
              <button
                className={index === active ? 'is-active' : ''}
                key={item.id}
                aria-label={item.label}
                onClick={() => goToScene(index)}
              >
                <i />
                <b>{item.number}</b>
              </button>
            ))}
          </div>
        </aside>

        <div className="cinematic-world__copy" key={scene.id} id={scene.id}>
          <p className="eyebrow">{scene.eyebrow}</p>
          <h1>
            {scene.title.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="cinematic-world__body">{scene.body}</p>
          {active === 0 && (
            <div className="cinematic-world__actions">
              <Link className="button button--gold" href="/move">
                START YOUR MOVE
              </Link>
              <Link
                className="button button--glass"
                href="/london-landing-list"
              >
                GET THE LANDING LIST
              </Link>
            </div>
          )}
        </div>

        <div className="cinematic-world__chapter">
          <span>{scene.number}</span>
          <small>{scene.label}</small>
        </div>

        <nav className="cinematic-film-map" aria-label="Continuous flight film chapters">
          <div className="cinematic-film-map__status">
            <span>CONTINUOUS FLIGHT</span>
            <b>{filmLegs[activeLeg].label}</b>
            <small>{filmLegs[activeLeg].time} / 00:35</small>
          </div>
          <div className="cinematic-film-map__track">
            {filmLegs.map((leg, index) => (
              <button
                type="button"
                key={leg.label}
                className={index === activeLeg ? 'is-active' : ''}
                onClick={() => goToFilmLeg(index)}
                aria-label={`Jump to ${leg.label} at ${leg.time}`}
              >
                <i />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </nav>

        <form className="cinematic-ask" onSubmit={submit}>
          <div>
            <small>ASK RELO</small>
            <span>YOUR LONDON, INTELLIGENTLY ANSWERED</span>
          </div>
          <label className="sr-only" htmlFor="cinematic-question">
            Ask Relo
          </label>
          <input
            id="cinematic-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <button type="submit" aria-label="Ask Relo">
            →
          </button>
        </form>

        <span className="cinematic-world__hint">SCROLL TO ENTER LONDON</span>
      </div>
    </section>
  );
}
