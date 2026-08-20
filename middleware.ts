import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const publicPaths = [
  '/',
  '/move',
  '/live',
  '/discover',
  '/network',
  '/journal',
  '/about',
  '/ask-relo',
  '/london-landing-list',
];
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev =
    pathname.startsWith('/api/dev') ||
    pathname.startsWith('/api/test-') ||
    pathname.startsWith('/integrations') ||
    pathname.startsWith('/debug-');
  if (
    isDev &&
    !(process.env.DEV_TOOLS === '1' && process.env.NODE_ENV !== 'production')
  )
    return new NextResponse('Not available', { status: 404 });
  const response = NextResponse.next();
  const curated =
    publicPaths.includes(pathname) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.');
  if (!curated) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
