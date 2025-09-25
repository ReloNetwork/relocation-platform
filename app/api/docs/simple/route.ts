import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const caseId = String(form.get('case_id') || '');

    if (!file || !caseId) {
      return NextResponse.json({ 
        ok: false, 
        error: 'missing file/case_id' 
      }, { status: 400 });
    }

    const service = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const path = `${caseId}/${Date.now()}-${file.name}`;
    const { error: uErr } = await service.storage.from('documents').upload(path, file, { upsert: false });
    
    if (uErr) throw uErr;

    return NextResponse.json({ ok: true, path });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}