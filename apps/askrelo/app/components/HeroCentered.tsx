'use client';
export default function HeroCentered(){
  return (
    <section className="bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-6 min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="w-full text-center">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight tracking-tight max-w-4xl mx-auto">
            Relocate to London, Effortlessly.
          </h1>
          <div className="h-[3px] w-16 bg-[var(--accent)] rounded-full mt-3 mx-auto" />
          <p className="mt-4 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Vetted experts, elite services, and a 24/7 AI concierge. One accountable partner from landing to 'I live here.'
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/ask"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-[var(--primary)] text-[var(--primary)] bg-white hover:bg-[color-mix(in_srgb,var(--primary)_6%,white)] transition shadow-sm focus-ring"
              data-testid="cta-ask-relo"
            >
              Ask Relo
            </a>
            <a
              href="/join-waitlist"
              className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-gray-300 text-[var(--ink)] bg-white hover:bg-gray-50 transition focus-ring"
              data-testid="cta-join-waitlist"
            >
              Join Waiting List
            </a>
          </div>

          <p className="mt-3 text-sm text-[var(--muted)]">
            100+ vetted partners · 24/7 support · Priority routes: London ↔ NYC and beyond
          </p>
        </div>
      </div>
    </section>
  );
}