import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { beehiiv } from '@/lib/beehiiv';
import { createServiceClient } from '@/lib/supabase/service';

export const runtime = 'nodejs';
const has = (s?: string | null) => !!(s && s.trim().length > 0);

export async function GET() {
  const out: Record<string, {configured:boolean; ok:boolean; detail:string}> = {
    supabase:{configured:false,ok:false,detail:''},
    stripe:{configured:false,ok:false,detail:''},
    cal:{configured:false,ok:false,detail:''},
    resend:{configured:false,ok:false,detail:''},
    beehiiv:{configured:false,ok:false,detail:''},
    executiveIntake:{configured:false,ok:false,detail:''},
    askRelo:{configured:false,ok:false,detail:''},
    askReloVoice:{configured:false,ok:false,detail:''},
    partnerSales:{configured:false,ok:false,detail:''},
    commercialAnalytics:{configured:false,ok:false,detail:''},
    databaseSchema:{configured:false,ok:false,detail:''},
  };

  const commercialAnalyticsConfigured = has(process.env.NEXT_PUBLIC_SUPABASE_URL) && has(process.env.SUPABASE_SERVICE_ROLE_KEY);
  out.commercialAnalytics = {
    configured: commercialAnalyticsConfigured,
    ok: false,
    detail: commercialAnalyticsConfigured
      ? 'privacy-minimised conversion storage configured'
      : 'Supabase service configuration missing',
  };

  const partnerSalesConfiguration = {
    supabaseUrl: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resend: has(process.env.RESEND_API_KEY),
    destination: has(process.env.PARTNER_ENQUIRY_EMAIL),
  };
  const partnerSalesConfigured = Object.values(partnerSalesConfiguration).every(Boolean);
  out.partnerSales = {
    configured: partnerSalesConfigured,
    ok: false,
    detail: partnerSalesConfigured
      ? 'durable partner pipeline and media-pack delivery configured'
      : `missing ${Object.entries(partnerSalesConfiguration)
          .filter(([, configured]) => !configured)
          .map(([name]) => name)
          .join(', ')}`,
  };

  const askReloConfiguration = {
    openai: has(process.env.OPENAI_API_KEY),
    usageSecret: has(process.env.ASK_RELO_USAGE_SECRET),
    supabaseUrl: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
  const askReloConfigured = Object.values(askReloConfiguration).every(Boolean);
  out.askRelo = {
    configured: askReloConfigured,
    ok: false,
    detail: askReloConfigured
      ? 'answer generation and privacy-preserving usage limits configured'
      : `missing ${Object.entries(askReloConfiguration)
          .filter(([, configured]) => !configured)
          .map(([name]) => name)
          .join(', ')}`,
  };

  const voiceEnabled = process.env.NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED === '1';
  const voiceConfiguration = {
    enabled: voiceEnabled,
    retellApi: has(process.env.RETELL_API_KEY),
    retellAgent: has(process.env.RETELL_AGENT_ID),
    retellWebhookSigning: has(process.env.RETELL_WEBHOOK_KEY),
    usageSecret: has(process.env.ASK_RELO_USAGE_SECRET),
    supabaseUrl: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };
  const voiceConfigured = Object.values(voiceConfiguration).every(Boolean);
  out.askReloVoice = {
    configured: voiceConfigured,
    ok: false,
    detail: voiceConfigured
      ? 'published browser voice agent and usage limits configured'
      : `missing ${Object.entries(voiceConfiguration)
          .filter(([, configured]) => !configured)
          .map(([name]) => name)
          .join(', ')}`,
  };

  if (voiceConfigured) {
    try {
      const response = await fetch(
        `https://api.retellai.com/get-agent/${encodeURIComponent(process.env.RETELL_AGENT_ID!)}`,
        {
          headers: { Authorization: `Bearer ${process.env.RETELL_API_KEY}` },
          cache: 'no-store',
          signal: AbortSignal.timeout(7_000),
        },
      );
      out.askReloVoice.ok = response.ok;
      out.askReloVoice.detail = response.ok
        ? 'published browser voice agent reachable with usage limits configured'
        : 'Retell agent could not be reached';
    } catch {
      out.askReloVoice.detail = 'Retell agent reachability check failed';
    }
  }

  const intakeConfiguration = {
    supabaseUrl: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resend: has(process.env.RESEND_API_KEY),
    destination: has(process.env.EXECUTIVE_INTAKE_EMAIL),
  };
  const intakeConfigured = Object.values(intakeConfiguration).every(Boolean);
  out.executiveIntake = {
    configured: intakeConfigured,
    ok: false,
    detail: intakeConfigured
      ? 'durable lead storage and email handoff configured'
      : `missing ${Object.entries(intakeConfiguration)
          .filter(([, configured]) => !configured)
          .map(([name]) => name)
          .join(', ')}`,
  };

  const beehiivConfigured = beehiiv.isConfigured();
  out.beehiiv = {
    configured: beehiivConfigured,
    ok: beehiivConfigured,
    detail: beehiivConfigured
      ? process.env.BEEHIIV_LANDING_LIST_AUTOMATION_ID
        ? 'subscription API and Landing List automation configured'
        : 'subscription API configured; Landing List automation missing'
      : 'API key or publication ID missing',
  };

  // Supabase
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (has(SB_URL) && has(SB_ANON)) {
    out.supabase.configured = true;
    try {
      // Quick format sanity
      if (!/^https:\/\/[a-z0-9\-]+\.supabase\.co\/?$/.test(SB_URL!)) {
        throw new Error('URL must look like https://xxxx.supabase.co');
      }
      const supa = createClient(SB_URL!, SB_ANON!, { auth:{ persistSession:false } });
      const { error } = await supa.from('suppliers').select('id', { head:true, count:'exact' }).limit(1);
      out.supabase.ok = true;
      out.supabase.detail = error ? 'reachable (RLS likely blocking selects)' : 'reachable';
    } catch (e:any) {
      out.supabase.detail = e?.message ?? 'error';
    }
  }

  const schemaConfigured = has(SB_URL) && has(process.env.SUPABASE_SERVICE_ROLE_KEY);
  out.databaseSchema.configured = schemaConfigured;
  if (schemaConfigured) {
    try {
      const service = createServiceClient();
      const requiredTables = [
        'executive_intake_leads',
        'ask_relo_usage',
        'partner_sales_leads',
        'commercial_events',
        'ask_relo_followups',
        'retell_call_events',
      ] as const;
      const tableResults = await Promise.all(requiredTables.map(async (table) => {
        const { error } = await service.from(table).select('id', { head: true, count: 'exact' }).limit(1);
        return { table, error };
      }));
      const missingTables = tableResults
        .filter(({ error }) => error)
        .map(({ table }) => table);

      out.databaseSchema.ok = missingTables.length === 0;
      out.databaseSchema.detail = missingTables.length === 0
        ? 'all six launch tables reachable'
        : `unavailable ${missingTables.join(', ')}`;

      out.executiveIntake.ok = intakeConfigured && !missingTables.includes('executive_intake_leads');
      out.askRelo.ok = askReloConfigured &&
        !missingTables.includes('ask_relo_usage') &&
        !missingTables.includes('ask_relo_followups');
      out.askReloVoice.ok = out.askReloVoice.ok &&
        !missingTables.includes('retell_call_events');
      out.partnerSales.ok = partnerSalesConfigured && !missingTables.includes('partner_sales_leads');
      out.commercialAnalytics.ok = commercialAnalyticsConfigured && !missingTables.includes('commercial_events');
    } catch (error: any) {
      out.databaseSchema.detail = error?.message ?? 'schema check failed';
    }
  } else {
    out.databaseSchema.detail = 'Supabase service configuration missing';
  }

  // Stripe
  const SK = process.env.STRIPE_SECRET_KEY;
  if (has(SK)) {
    out.stripe.configured = true;
    try {
      if (!/^sk_(test|live)_/.test(SK!)) throw new Error('Use a Secret key starting with sk_');
      const stripe = new Stripe(SK!, { apiVersion: '2023-10-16' });
      await stripe.prices.list({ limit:1 });
      out.stripe.ok = true; out.stripe.detail = 'reachable';
    } catch (e:any) { out.stripe.detail = e?.message ?? 'error'; }
  }

  // Resend
  const RK = process.env.RESEND_API_KEY;
  if (has(RK)) {
    out.resend.configured = true;
    try { const r = new Resend(RK!); await r.domains.list(); out.resend.ok = true; out.resend.detail = 'reachable'; }
    catch (e:any){ out.resend.detail = e?.message ?? 'error'; }
  }

  // Cal.com: this is the public booking path used by the intake receipt page.
  const CAL = process.env.NEXT_PUBLIC_CAL_COM_EMBED_ID;
  if (has(CAL)) {
    out.cal.configured = true;
    try {
      const resp = await fetch(`https://cal.com/${CAL}`, { method:'HEAD' });
      out.cal.ok = resp.ok;
      out.cal.detail = resp.ok ? 'public booking page reachable' : `status ${resp.status}`;
    } catch (e:any){ out.cal.detail = e?.message ?? 'error'; }
  }

  return NextResponse.json(out);
}
