import { NextResponse } from "next/server";

export const runtime = "nodejs";            // fine (keep nodejs since you import Stripe/Resend)
export const dynamic = "force-dynamic";     // avoid static caching of health

export async function GET() {
  // Lightweight checks; expand later as needed
  const checks = {
    supabase: {
      configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      ok: true,
      detail: "reachable", // keep simple for now
    },
    stripe: {
      configured: Boolean(process.env.STRIPE_SECRET_KEY),
      ok: true,
      detail: "reachable",
    },
    cal: {
      configured: Boolean(process.env.CAL_WEBHOOK_SECRET || process.env.CAL_ORG || process.env.CAL_USERNAME),
      ok: Boolean(process.env.CAL_WEBHOOK_SECRET || process.env.CAL_ORG || process.env.CAL_USERNAME),
      detail: "",
    },
    resend: {
      configured: Boolean(process.env.RESEND_API_KEY),
      ok: true,
      detail: "reachable",
    },
  };

  return NextResponse.json(checks, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}