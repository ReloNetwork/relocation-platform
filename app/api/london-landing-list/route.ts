import { NextRequest } from 'next/server';
import { POST as subscribe } from '@/app/api/newsletter/subscribe/route';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  return subscribe(
    new NextRequest(new URL('/api/newsletter/subscribe', request.url), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...body,
        source: body.source || 'london-landing-list',
        campaign: 'london-landing-list',
      }),
    })
  );
}
