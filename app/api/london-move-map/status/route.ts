import { NextRequest, NextResponse } from 'next/server';
import { moveMapReadiness } from '@/lib/london-move-map-server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(await moveMapReadiness(request.nextUrl.origin), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ ready: false, reason: 'connection', mode: 'unavailable' }, { status: 503 });
  }
}
