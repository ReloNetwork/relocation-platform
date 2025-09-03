'use client';
import Image from 'next/image';

type Variant = 'split' | 'pure';
export default function Hero({ variant = 'split' }: { variant?: Variant }) {
  const Copy = (
    <>
      <h1 className="font-serif text-5xl md:text-6xl leading-tight tracking-tight max-w-3xl">
        Relocate to London. Effortlessly.
      </h1>
      <div className="h-[3px] w-16 bg-[var(--accent)] rounded-full mt-3 mx-auto md:mx-0" />
      <p className="mt-4 text-lg md:text-xl text-[var(--muted)] max-w-2xl">
        Vetted experts, elite services, and a 24/7 AI concierge. One accountable partner from landing to "I live here."
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href="/ask" className="inline-flex items-center justify-center rounded-md px-5 py-3 bg-[var(--primary)] text-white shadow-sm hover:shadow-md transition focus-ring">
          Ask Relo
        </a>
        <a href="/join-waitlist" className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-[var(--primary)] text-[var(--primary)] bg-white hover:bg-[color-mix(in_srgb,var(--primary) 5%,white)] transition focus-ring">
          Join Waiting List
        </a>
      </div>
      <p className="mt-3 text-sm text-[var(--muted)]">
        100+ vetted partners · 24/7 support · Priority routes: London ↔ NYC (+ more)
      </p>
    </>
  );

  if (variant === 'pure') {
    return (
      <section className="bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center md:text-left">
          {Copy}
        </div>
      </section>
    );
  }

  // split variant with editorial image card
  return (
    <section className="bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">{Copy}</div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <Image
            src="/images/hero-london.jpg"
            alt="London skyline"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 48vw"
          />
          <div className="absolute inset-0 bg-white/10" aria-hidden />
          <div className="absolute bottom-3 left-4 text-xs text-[var(--muted)]">London skyline</div>
        </div>
      </div>
    </section>
  );
}