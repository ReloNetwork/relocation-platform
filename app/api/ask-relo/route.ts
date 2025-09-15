import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CONCIERGE_EMAIL = process.env.RELO_CONCIERGE_EMAIL || "concierge@therelonetwork.com";

export const runtime = "nodejs";

const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  from: z.string().min(2),
  to: z.string().min(2),
  move_date: z.string().optional(),
  budget: z.string().optional(),
  household: z.string().optional(),
  urgency: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    if (!SB_URL || !SB_SERVICE) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    const supa = createClient(SB_URL, SB_SERVICE);

    const input = Schema.parse(await req.json());
    const summary = `${input.from} → ${input.to} ${input.move_date ? `on ${input.move_date}` : ""}`.trim();

    // 1) Store a lightweight lead in waitlist (compatible with your seed schema)
    await supa.from("waitlist").insert({
      name: input.name,
      email: input.email,
      move_window: summary, // using move_window field to capture route+date
    });

    // 2) Send concierge an email with full details (if configured)
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: "Relo Intake <intake@therelonetwork.com>",
        to: [CONCIERGE_EMAIL],
        reply_to: input.email,
        subject: `New Ask Relo intake: ${input.from} → ${input.to}`,
        text: [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Route: ${input.from} -> ${input.to}`,
          `Move date: ${input.move_date || "n/a"}`,
          `Budget: ${input.budget || "n/a"}`,
          `Household: ${input.household || "n/a"}`,
          `Urgency: ${input.urgency || "n/a"}`,
          `Notes: ${input.notes || "n/a"}`,
        ].join("\n"),
      });
    }

    // (Optional next step: if user is authenticated, create a draft move_cases row here)

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = e?.issues?.[0]?.message || e?.message || "Error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}