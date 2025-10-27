import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Match everything except static assets and health
export const config = { matcher: ["/:path*"] };

function challenge() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Relo Portal"' },
  });


function basicAuthCheck(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // Exempt static & health endpoints from auth prompts
  const exempt = [
    /^\/_next\//,
    /^\/favicon\.ico$/,
    /^\/robots\.txt$/,
    /^\/sitemap\.xml$/,
    /^\/api\/health$/,
  ];
  if (exempt.some((rx) => rx.test(pathname))) return null;

  const auth = req.headers.get("authorization");
  if (!auth) return challenge();

  const [type, value] = auth.split(" ");
  if (type !== "Basic" || !value) return challenge();

  const [user, pass] = Buffer.from(value, "base64").toString().split(":");
  if (user !== process.env.BASIC_AUTH_USER || pass !== process.env.BASIC_AUTH_PASS) return challenge();

  return null; // OK
}

export default function middleware(req: NextRequest) {
  // robust host detection
  const host = req.headers.get("host") || req.nextUrl.hostname;

  // OPTION A (robust host test – recommended)
  const requireAuth =
    host === "app.therelonetwork.com" || host?.startsWith("app.");

  // OPTION B (TEMP: prove middleware runs — then revert to A)
  // const requireAuth = true;

  if (requireAuth) {
    const gate = basicAuthCheck(req);
    if (gate) return gate;
  }

  // ...keep your existing dev-route guard below...
  return NextResponse.next();
}

