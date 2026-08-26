import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { beehiiv } from '@/lib/beehiiv';

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
  };

  const commercialAnalyticsConfigured = has(process.env.NEXT_PUBLIC_SUPABASE_URL) && has(process.env.SUPABASE_SERVICE_ROLE_KEY);
  out.commercialAnalytics = {
    configured: commercialAnalyticsConfigured,
    ok: commercialAnalyticsConfigured,
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
    ok: partnerSalesConfigured,
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
    ok: askReloConfigured,
    detail: askReloConfigured
      ? 'answer generation and privacy-preserving usage limits configured'
      : `missing ${Object.entries(askReloConfiguration)
          .filter(([, configured]) => !configured)
          .map(([name]) => name)
          .join(', ')}`,
  };

  const voiceEnabled = process.env.NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED === '1';
  const voiceConfigured =
    voiceEnabled &&
    has(process.env.RETELL_API_KEY) &&
    has(process.env.RETELL_AGENT_ID);
  out.askReloVoice = {
    configured: voiceConfigured,
    ok: voiceConfigured,
    detail: voiceConfigured
      ? 'published browser voice agent configured'
      : voiceEnabled
        ? 'voice enabled but Retell configuration is incomplete'
        : 'voice intentionally disabled',
  };

  const intakeConfiguration = {
    supabaseUrl: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: has(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resend: has(process.env.RESEND_API_KEY),
    destination: has(process.env.EXECUTIVE_INTAKE_EMAIL),
  };
  const intakeConfigured = Object.values(intakeConfiguration).every(Boolean);
  out.executiveIntake = {
    configured: intakeConfigured,
    ok: intakeConfigured,
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

  // Cal.com – check handle page or common event slugs
  const CAL = process.env.NEXT_PUBLIC_CAL_USERNAME;
  if (has(CAL)) {
    out.cal.configured = true;
    try {
      const tryUrls = [`https://cal.com/${CAL}`, `https://cal.com/${CAL}/15min`, `https://cal.com/${CAL}/intro`];
      let ok = false, detail = '';
      for (const u of tryUrls) {
        const resp = await fetch(u, { method:'HEAD' });
        if (resp.ok) { ok = true; detail = 'public page reachable'; break; }
        detail = `status ${resp.status}`;
      }
      out.cal.ok = ok; out.cal.detail = detail;
    } catch (e:any){ out.cal.detail = e?.message ?? 'error'; }
  }

  return NextResponse.json(out);
}
