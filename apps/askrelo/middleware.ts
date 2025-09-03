import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔒 Dev routes hard block unless explicitly enabled
  const isDevPath = pathname.startsWith('/api/dev') || pathname.startsWith('/integrations');
  const devEnabled = process.env.DEV_TOOLS === '1' && process.env.NODE_ENV !== 'production';
  if (isDevPath && !devEnabled) {
    return new NextResponse('Not available', { status: 404 });
  }

  // ... keep the rest of your middleware (e.g., CSRF) here ...
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|public).*)'],
};