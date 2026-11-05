import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import MoveMapCheckout from './checkout-form';
import { MOVE_MAP_ORDER_TERMS } from '@/lib/london-move-map';

export const metadata: Metadata = {
  title: 'London Home & Life Map | £249 Digital Consultation',
  description: 'A personal London location consultation for people moving alone, with a partner or with children. Written area comparison, video walkthrough and a follow-up question.',
};

export default function MoveMapPage() {
  return <Layout><main className="bg-[#F7F4ED] text-[#0B1B2B]">
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-20 md:pt-28">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[.25em] text-[#8B6C2F]">The Relo Network / A focused first step</p>
      <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Choose the London life before the London home.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#374151]">Moving alone, with a partner or with children? Get a personalised decision map for where to live, shaped around your work, budget and everyday life. Whether you start in a hotel, serviced apartment or rental, we consider the route to your longer-term home.</p>
    </section>
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 md:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8B6C2F]">Your digital consultation / £249 total</p>
        <h2 className="mt-5 font-serif text-3xl">London Home &amp; Life Map</h2>
        <ul className="mt-6 space-y-4 leading-relaxed text-[#374151]">
          <li>01 / An interactive brief that helps you define what matters before you search.</li>
          <li>02 / A written comparison of up to three London areas against your priorities, accommodation budget and daily journeys. School considerations are included when relevant.</li>
          <li>03 / A recommended starting point, how temporary accommodation could fit your move, and three checks before you commit.</li>
          <li>04 / A short personalised video walkthrough explaining our recommendation.</li>
          <li>05 / One follow-up question by email within seven days of delivery.</li>
        </ul>
        <div className="mt-9 border-t border-[#D7C8A6] pt-6 text-sm leading-relaxed text-[#4B5563]">
          <p><strong>Delivery:</strong> your written map and video are emailed within three working days after payment and a complete brief. If clarification is needed, the delivery period begins when we have that information.</p>
          <p className="mt-4">A focused consultation, delivered by email. It does not include a live call, school admissions, live accommodation availability, bookings, viewings or a property search. Check availability and journeys directly before committing.</p>
          <p className="mt-4">For hands-on search and coordination, we can discuss a separate Executive London Setup after you receive your map.</p>
        </div>
        <details className="mt-7 border-t border-[#D7C8A6] pt-5 text-sm leading-relaxed" id="order-terms">
          <summary className="cursor-pointer font-medium">Order terms and cancellation</summary>
          <p className="mt-4">{MOVE_MAP_ORDER_TERMS}</p>
          <p className="mt-4">Cancellation template: I wish to cancel my London Home &amp; Life Map order, ordered on [date]. My name is [name] and my order reference is [reference]. Email it to hello@therelonetwork.com.</p>
          <p className="mt-4">Provided by Relo Network Ltd, London, United Kingdom. Contact hello@therelonetwork.com. Read our <a href="/terms" className="underline">website terms</a> and <a href="/privacy" className="underline">privacy notice</a>.</p>
        </details>
      </div>
      <MoveMapCheckout />
    </section>
  </main></Layout>;
}
