// middleware.ts (relocation-platform)
import { NextResponse, type NextRequest } from 'next/server';

function challenge() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Relo Portal"' },
  });
}

const exempt = [
  /^\/_next\//,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
  /^\/sitemap.*\.xml$/,
  /^\/api\/health$/,
  /^\/api\/webhooks\/.*$/,   // <-- Cal.com webhooks
];

function basicAuthCheck(req: NextRequest) {
  const { pathname } = new URL(req.url);
  if (exempt.some((rx) => rx.test(pathname))) return null;

  const auth = req.headers.get('authorization');
  if (!auth) return challenge();
  const [type, value] = auth.split(' ');
  if (type !== 'Basic' || !value) return challenge();

  const [user, pass] = Buffer.from(value, 'base64').toString().split(':');
  if (user !== process.env.BASIC_AUTH_USER || pass !== process.env.BASIC_AUTH_PASS) {
    return challenge();
  }
  return null;
}

export default function middleware(req: NextRequest) {
  const gate = basicAuthCheck(req);
  if (gate) return gate;
  return NextResponse.next();
}

export const config = { matcher: ['/:path*'] };
