import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const Schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  role: z.enum(['Professional','Entrepreneur','Investor','Other']),
  desired_outcome: z.string().optional().nullable(),
  frustration: z.string().optional().nullable(),
  price_point: z.string().optional().nullable(),
  extra: z.string().optional().nullable(),
});

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    if (!SB_URL || !SB_SERVICE) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    const supa = createClient(SB_URL, SB_SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });

    const input = Schema.parse(await req.json());

    const { error } = await supa.from('audience_intake').insert({
      name: input.name,
      email: input.email,
      role: input.role,
      desired_outcome: input.desired_outcome ?? null,
      frustration: input.frustration ?? null,
      price_point: input.price_point ?? null,
      extra: input.extra ?? null,
      source: 'join',
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = e?.message || e?.issues?.[0]?.message || 'Error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}