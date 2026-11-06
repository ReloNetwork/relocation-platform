import Layout from '@/components/Layout';
import Link from 'next/link';
import { isPaidMoveMap, moveMapStripe } from '@/lib/london-move-map-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your London consultation order', robots: { index: false, follow: false } };

export default async function MoveMapThankYou({ searchParams }: { searchParams: { session_id?: string } }) {
  let paid = false;
  if (searchParams.session_id && /^cs_[a-zA-Z0-9_]{10,250}$/.test(searchParams.session_id)) {
    try { paid = isPaidMoveMap(await moveMapStripe().checkout.sessions.retrieve(searchParams.session_id)); } catch { /* Never infer payment from the URL alone. */ }
  }
  return <Layout><main className="min-h-[65vh] bg-[#F7F4ED] px-6 py-24 text-[#0B1B2B]"><div className="mx-auto max-w-2xl">
    <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8B6C2F]">The Relo Network</p>
    <h1 className="mt-6 font-serif text-5xl">{paid ? 'Your consultation is underway.' : 'We could not confirm this payment.'}</h1>
    <p className="mt-7 text-lg leading-relaxed">{paid ? 'Thank you. Your £249 payment is confirmed. Your London Home & Life Map and video walkthrough will arrive by email within three working days of a complete brief. You can reply with one question within seven days of delivery.' : 'Check your Stripe confirmation before paying again. If you need help, email hello@therelonetwork.com with your order reference.'}</p>
    <Link className="mt-9 inline-block border-b border-[#C9A24A] pb-1" href="/london-move-map">Return to the consultation →</Link>
  </div></main></Layout>;
}
