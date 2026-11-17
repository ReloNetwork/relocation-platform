import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Property Hunt LIVE | London Property Collaborations',
  description: 'Explore Property Hunt LIVE with Relo Network: considered, interactive London home tours for international movers. Property agents and developers can propose a collaboration.',
  alternates: { canonical: '/property-hunt-live' },
};

const steps = [
  ['01', 'Choose the property', 'Tell us about a London home or development that suits internationally mobile renters or buyers. We discuss fit, access and any filming restrictions first.'],
  ['02', 'Shape the viewing', 'Agree the property details, areas we can film, timing, on-camera permissions and the questions that matter to prospective movers.'],
  ['03', 'Bring the home to life', 'The proposed format guides viewers through the property and its neighbourhood, discussing genuine strengths and trade-offs rather than reading out a listing.'],
  ['04', 'Review what follows', 'Before filming, we would agree permitted clips, partner attribution and appropriate enquiry handling. Performance reporting depends on available platform data.'],
];

export default function PropertyHuntLivePage() {
  return <Layout><main className="bg-[#F7F4ED] text-[#0B1B2B]">
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-24 lg:grid-cols-2 lg:pt-32">
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.25em] text-[#8B6C2F]">RELO NETWORK / PROPERTY HUNT LIVE</p>
        <h1 className="font-serif text-5xl leading-[1.06] md:text-7xl">London homes.<br/>Real conversations.<br/>Live from the property.</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#374151]">A considered way to introduce London homes to international professionals and families. Property Hunt LIVE is our developing series of interactive property viewings. The aim is to explore homes on camera, answer practical questions and show how a home fits into everyday London life.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/partner-application?interest=property-live" className="bg-[#0B1B2B] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white">Propose a property</Link>
          <Link href="/move" className="border border-[#0B1B2B] px-6 py-4 text-sm font-semibold uppercase tracking-wide">Planning your move?</Link>
        </div>
        <p className="mt-4 text-sm text-[#586170]">For estate agents, developers, building managers and property teams. Access and filming are always subject to agreement.</p>
      </div>
      <div className="relative min-h-[380px] overflow-hidden bg-[#DDD6CA] md:min-h-[570px]">
        <Image src="/images/editorial/london-interior.webp" alt="Considered London home interior" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/>
        <span className="absolute bottom-5 left-5 bg-[#F7F4ED]/95 px-4 py-3 text-xs font-semibold uppercase tracking-[.18em]">The property, and the life around it</span>
      </div>
    </section>
    <section className="border-y border-[#D7C8A6] bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8B6C2F]">THE IDEA</p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl md:text-5xl">Not just a tour. A better-informed property decision.</h2>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          <article><h3 className="font-serif text-2xl">The home</h3><p className="mt-3 leading-relaxed text-[#4B5563]">Layout, light, specification, amenities and practical details that photographs do not always explain.</p></article>
          <article><h3 className="font-serif text-2xl">The neighbourhood</h3><p className="mt-3 leading-relaxed text-[#4B5563]">Connections, daily routines, character and meaningful location trade-offs.</p></article>
          <article><h3 className="font-serif text-2xl">The conversation</h3><p className="mt-3 leading-relaxed text-[#4B5563]">Audience questions, context and useful next steps, with no invented availability or promises of enquiries.</p></article>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8B6C2F]">HOW A COLLABORATION WORKS</p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">{steps.map(([n,title,body])=><article key={n} className="border-t border-[#C9A24A] pt-5"><span className="text-sm text-[#8B6C2F]">{n}</span><h3 className="mt-4 font-serif text-3xl">{title}</h3><p className="mt-3 max-w-lg leading-relaxed text-[#4B5563]">{body}</p></article>)}</div>
    </section>
    <section className="bg-[#0B1B2B] px-6 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div><p className="text-xs uppercase tracking-[.22em] text-[#D9BB71]">A SAMPLE VIEWING BRIEF</p><h2 className="mt-4 font-serif text-4xl">What does £6,000 a month offer in Islington?</h2><p className="mt-5 leading-relaxed text-white/75">A proposed episode could compare a property's interior, local atmosphere, daily journeys and compromises for someone moving to London. The precise property, format and timing would be agreed with its representative.</p></div>
        <div className="border border-white/25 p-7"><h3 className="font-serif text-2xl">Good property partners</h3><p className="mt-3 leading-relaxed text-white/75">Agents and developers with well-presented London homes, accurate listing details, someone authorised to approve filming and a willingness to discuss the property with transparency.</p><p className="mt-5 text-sm leading-relaxed text-white/60">Sample concept only, not a claim that an episode or property partnership has been confirmed. Coverage is independent and any paid collaborations will be disclosed.</p></div>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8B6C2F]">WORK WITH RELO NETWORK</p>
      <h2 className="mt-4 font-serif text-4xl md:text-5xl">Have a property worth showing properly?</h2>
      <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#4B5563]">Tell us about the home, who it suits and when a viewing might be possible. We will review your proposal and discuss whether a Property Hunt LIVE viewing is a good fit.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/partner-application?interest=property-live" className="bg-[#0B1B2B] px-7 py-4 font-semibold text-white">PROPOSE A PROPERTY</Link><a href="mailto:hello@therelonetwork.com?subject=Property%20Hunt%20LIVE%20enquiry" className="border border-[#0B1B2B] px-7 py-4 font-semibold">EMAIL RELO NETWORK</a></div>
    </section>
  </main></Layout>;
}
