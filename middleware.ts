import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRouteDecision } from '@/lib/route-policy';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const decision = getRouteDecision(pathname, {
    isProduction: process.env.NODE_ENV === 'production',
    devToolsEnabled: process.env.DEV_TOOLS === '1',
  });

  if (decision.action === 'not-found') {
    return new NextResponse('Not available', { status: 404 });
  }

  if (decision.action === 'gone') {
    return new NextResponse('This legacy page has been retired.', {
      status: 410,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    });
  }

  if (decision.action === 'redirect') {
    const destination = req.nextUrl.clone();
    destination.pathname = decision.destination;
    return NextResponse.redirect(destination, 308);
  }

  const response = NextResponse.next();
  if (!decision.indexable) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
