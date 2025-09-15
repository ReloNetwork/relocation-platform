import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET() {
  // Safety: never run in prod
  if (process.env.NODE_ENV === 'production' || process.env.DEV_TOOLS !== '1') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) {
    return NextResponse.json({ ok: false, error: 'Supabase env vars missing' }, { status: 500 });
  }

  try {
    // Server-side: allowed to use service role. Do NOT expose this to the client.
    const supa = createClient(url, service);

    // Ensure the bucket exists (create if missing). Private by default.
    const { data: buckets } = await supa.storage.listBuckets();
    const hasDocs = buckets?.some(b => b.name === 'docs');
    if (!hasDocs) {
      const { error: createErr } = await supa.storage.createBucket('docs', { public: false });
      if (createErr) throw createErr;
    }

    const stamp = Date.now();
    const path = `healthcheck/${stamp}.txt`;
    const content = new Blob([`hello from relo ${new Date().toISOString()}\n`], { type: 'text/plain' });

    // Upload a tiny file
    const { error: uploadErr } = await supa.storage.from('docs').upload(path, content, {
      contentType: 'text/plain',
      upsert: false,
    });
    if (uploadErr && !/exists/i.test(uploadErr.message)) throw uploadErr;

    // Make a short-lived signed URL so you can click it in the browser
    const { data: signed, error: signedErr } = await supa.storage.from('docs').createSignedUrl(path, 60);
    if (signedErr) throw signedErr;

    return NextResponse.json({ ok: true, path, signedUrl: signed.signedUrl });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}