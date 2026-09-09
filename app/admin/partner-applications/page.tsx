import Link from 'next/link'
import { redirect } from 'next/navigation'
import Layout from '@/components/Layout'
import { requireUser } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { updatePartnerLead } from './actions'

export const dynamic = 'force-dynamic'

type PartnerLead = {
  id: string
  reference_id: string
  status: string
  lead_quality: string
  fit_score: number
  name: string
  email: string
  company: string
  website: string | null
  service_category: string
  partnership_interest: string
  audience_fit: string
  objective: string
  budget: string
  timing: string
  message: string
  media_pack_status: string
  notification_status: string
  estimated_value_gbp: number | null
  next_action_at: string | null
  notes: string | null
  created_at: string
}

const pipelineStatuses = [
  'new',
  'reviewing',
  'discovery_booked',
  'proposal_sent',
  'negotiating',
  'won',
  'nurture',
  'declined',
] as const

function label(value: string) {
  return value.replace(/[_-]/g, ' ')
}

export default async function PartnerApplicationsPage() {
  const user = await requireUser()
  const sessionClient = createClient()
  const { data: membership } = await sessionClient
    .from('org_memberships')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle()
  if (!membership) redirect('/dashboard')

  const service = createServiceClient()
  const { data, error } = await service
    .from('partner_sales_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  const leads = (data || []) as PartnerLead[]
  const active = leads.filter((lead) => !['won', 'nurture', 'declined'].includes(lead.status))
  const pipelineValue = active.reduce((sum, lead) => sum + (lead.estimated_value_gbp || 0), 0)

  return (
    <Layout>
      <main className="min-h-screen bg-[#f4f0e7] px-5 py-12 text-[#14291f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[#725449]">PARTNER REVENUE</p>
              <h1 className="mt-2 font-serif text-4xl">Editorial sales pipeline</h1>
              <p className="mt-2 text-sm text-[#5d685f]">Qualified applications, delivery status and next commercial action.</p>
            </div>
            <Link className="border border-[#14291f] px-4 py-3 text-xs font-semibold tracking-widest" href="/partner-application/media-pack">
              VIEW MEDIA PACK
            </Link>
          </div>

          {error ? (
            <div className="mb-7 border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              The pipeline table is unavailable. Apply the partner-sales migration before using this dashboard.
            </div>
          ) : null}

          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="bg-white p-5"><span className="text-xs tracking-widest text-[#6b746d]">TOTAL LEADS</span><strong className="mt-2 block font-serif text-3xl">{leads.length}</strong></div>
            <div className="bg-white p-5"><span className="text-xs tracking-widest text-[#6b746d]">ACTIVE PIPELINE</span><strong className="mt-2 block font-serif text-3xl">{active.length}</strong></div>
            <div className="bg-white p-5"><span className="text-xs tracking-widest text-[#6b746d]">ESTIMATED VALUE</span><strong className="mt-2 block font-serif text-3xl">£{pipelineValue.toLocaleString('en-GB')}</strong></div>
          </section>

          <div className="space-y-5">
            {leads.map((lead) => (
              <article key={lead.id} className="grid gap-6 bg-white p-6 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#14291f] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f7f0df]">{lead.lead_quality} · {lead.fit_score}/10</span>
                    <span className="bg-[#ece7dd] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">{label(lead.status)}</span>
                    <span className="text-xs text-[#7b817c]">{lead.reference_id}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl">{lead.company}</h2>
                  <p className="mt-1 text-sm">{lead.name} · <a className="underline" href={`mailto:${lead.email}`}>{lead.email}</a></p>
                  <p className="mt-4 text-sm leading-6 text-[#5d685f]">{lead.message}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm sm:grid-cols-3">
                    <div><dt className="text-xs uppercase text-[#858b86]">Category</dt><dd className="capitalize">{lead.service_category}</dd></div>
                    <div><dt className="text-xs uppercase text-[#858b86]">Interest</dt><dd className="capitalize">{label(lead.partnership_interest)}</dd></div>
                    <div><dt className="text-xs uppercase text-[#858b86]">Objective</dt><dd className="capitalize">{label(lead.objective)}</dd></div>
                    <div><dt className="text-xs uppercase text-[#858b86]">Budget</dt><dd className="capitalize">{label(lead.budget)}</dd></div>
                    <div><dt className="text-xs uppercase text-[#858b86]">Timing</dt><dd className="capitalize">{label(lead.timing)}</dd></div>
                    <div><dt className="text-xs uppercase text-[#858b86]">Delivery</dt><dd>Pack {lead.media_pack_status} · Alert {lead.notification_status}</dd></div>
                  </dl>
                </div>

                <form action={updatePartnerLead} className="border-l-0 border-[#ded8cc] lg:border-l lg:pl-6">
                  <input type="hidden" name="id" value={lead.id} />
                  <label className="mb-4 block text-xs font-semibold tracking-wider">
                    PIPELINE STATUS
                    <select name="status" defaultValue={lead.status} className="mt-2 block w-full border border-[#cdc6b8] bg-white p-3 text-sm font-normal">
                      {pipelineStatuses.map((status) => <option key={status} value={status}>{label(status)}</option>)}
                    </select>
                  </label>
                  <label className="mb-4 block text-xs font-semibold tracking-wider">
                    ESTIMATED VALUE (£)
                    <input name="estimatedValue" type="number" min="0" step="100" defaultValue={lead.estimated_value_gbp ?? ''} className="mt-2 block w-full border border-[#cdc6b8] p-3 text-sm font-normal" />
                  </label>
                  <label className="mb-4 block text-xs font-semibold tracking-wider">
                    NEXT ACTION
                    <input name="nextActionAt" type="datetime-local" defaultValue={lead.next_action_at?.slice(0, 16) ?? ''} className="mt-2 block w-full border border-[#cdc6b8] p-3 text-sm font-normal" />
                  </label>
                  <label className="mb-4 block text-xs font-semibold tracking-wider">
                    SALES NOTES
                    <textarea name="notes" rows={3} defaultValue={lead.notes ?? ''} className="mt-2 block w-full border border-[#cdc6b8] p-3 text-sm font-normal" />
                  </label>
                  <button className="w-full bg-[#14291f] px-4 py-3 text-xs font-semibold tracking-widest text-[#f7f0df]">SAVE PIPELINE UPDATE</button>
                </form>
              </article>
            ))}
            {!error && leads.length === 0 ? <p className="bg-white p-8 text-center text-sm text-[#6b746d]">No partner applications yet.</p> : null}
          </div>
        </div>
      </main>
    </Layout>
  )
}
