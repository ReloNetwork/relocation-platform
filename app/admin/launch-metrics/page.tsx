import { redirect } from 'next/navigation'
import Layout from '@/components/Layout'
import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'

type EventRow = { event: string; journey: string; utm_source: string | null; utm_campaign: string | null; created_at: string }

export default async function LaunchMetricsPage() {
  const user = await requireUser()
  const session = createClient()
  const { data: membership } = await session.from('org_memberships').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle()
  if (!membership) redirect('/dashboard')

  const service = createServiceClient()
  const since = new Date(Date.now() - 30 * 86_400_000).toISOString()
  const { data, error } = await service.from('commercial_events').select('event,journey,utm_source,utm_campaign,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(5000)
  const events = (data || []) as EventRow[]
  const counts = events.reduce<Record<string, number>>((out, event) => {
    out[event.event] = (out[event.event] || 0) + 1
    return out
  }, {})
  const sources = events.reduce<Record<string, number>>((out, event) => {
    const source = event.utm_source || 'direct / untagged'
    out[source] = (out[source] || 0) + 1
    return out
  }, {})

  return <Layout>
    <main className="min-h-screen bg-[#f4f0e7] px-5 py-12 text-[#14291f]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.24em] text-[#725449]">LAST 30 DAYS</p>
        <h1 className="mt-2 font-serif text-5xl">Launch metrics</h1>
        <p className="mt-3 text-[#5d685f]">Privacy-minimised conversion events. No email addresses, relocation details or Ask Relo question text.</p>
        {error ? <p className="mt-8 border border-red-300 bg-red-50 p-4 text-red-800">Apply the commercial-events migration to activate this dashboard.</p> : null}
        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => <article className="bg-white p-5" key={name}><span className="text-xs uppercase tracking-wider text-[#6b746d]">{name.replace(/_/g, ' ')}</span><strong className="mt-3 block font-serif text-4xl">{count}</strong></article>)}
        </section>
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="bg-white p-6"><h2 className="font-serif text-2xl">Attributed sources</h2><div className="mt-5 space-y-3">{Object.entries(sources).sort((a, b) => b[1] - a[1]).map(([source, count]) => <div className="flex justify-between border-b border-[#e5dfd3] pb-2" key={source}><span>{source}</span><strong>{count}</strong></div>)}</div></article>
          <article className="bg-white p-6"><h2 className="font-serif text-2xl">Recent conversion events</h2><div className="mt-5 space-y-3">{events.slice(0, 20).map((event, index) => <div className="border-b border-[#e5dfd3] pb-2 text-sm" key={`${event.created_at}-${index}`}><strong>{event.event.replace(/_/g, ' ')}</strong><span className="ml-2 text-[#6b746d]">{new Date(event.created_at).toLocaleString('en-GB')}</span></div>)}</div></article>
        </section>
      </div>
    </main>
  </Layout>
}
