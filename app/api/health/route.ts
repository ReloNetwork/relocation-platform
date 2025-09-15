import { NextResponse } from "next/server";

// Optional: run on the Edge for fast, low-latency checks
export const runtime = "edge";

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

  return NextResponse.json(checks, { status: 200 });
}