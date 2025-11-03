import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Match everything except static assets and health
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)"],
};

function challenge() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Relo Portal"' },
  });
}

function basicAuthCheck(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // Exempt static & health endpoints from auth prompts
  const exempt = [
    /^\/_next\//,
    /^\/favicon\.ico$/,
    /^\/robots\.txt$/,
    /^\/sitemap\.xml$/,
    /^\/api\/health$/,
    /^\/api\/webhooks\/.*$/,
    /^\/api\/client\/.*$/,  // Allow client API endpoints
    /^\/client\/.*$/,       // Allow client dashboard routes
    /^\/payment-success$/,  // Allow payment success page
    /^\/admin\/partnership-outreach.*$/, // Temporarily allow partnership outreach and all its resources
    /^\/api\/send-email$/ // Allow email sending endpoint
  ];
  if (exempt.some((rx) => rx.test(pathname))) return null;

  const auth = req.headers.get("authorization");
  if (!auth) return challenge();

  const [type, value] = auth.split(" ");
  if (type !== "Basic" || !value) return challenge();

  try {
    const [user, pass] = atob(value).split(":");
    if (user !== process.env.BASIC_AUTH_USER || pass !== process.env.BASIC_AUTH_PASS) return challenge();
  } catch (error) {
    return challenge();
  }

  return null; // OK
}

export default function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    
    // TEMPORARILY DISABLED FOR PARTNERSHIP OUTREACH - CHECK FIRST
    if (pathname.startsWith('/admin/partnership-outreach') || pathname === '/api/send-email') {
      console.log('Partnership outreach path detected, bypassing auth:', pathname);
      return NextResponse.next(); // Skip auth for partnership outreach
    }
    
    // TEMPORARILY DISABLE AUTH FOR PARTNERSHIP OUTREACH TESTING
    // Gate the portal hosts
    const host = req.nextUrl.hostname;
    // TEMP: Disable auth for all Vercel deployments during partnership outreach
    const isVercelDeployment = host.includes('vercel.app');
    const requireAuth = !isVercelDeployment && (host === "app.therelonetwork.com" || host === "therelonetwork.com" || host === "www.therelonetwork.com");
    // const requireAuth = true; // TEMP: gate all hosts to prove middleware is running
    if (requireAuth) {
      const gate = basicAuthCheck(req);
      if (gate) return gate; // triggers Basic Auth prompt
    }

    // Your existing dev-route guard (kept from your file)
    const isDevPath = pathname.startsWith("/api/dev") || pathname.startsWith("/integrations");
    const devEnabled = process.env.DEV_TOOLS === "1" && process.env.NODE_ENV !== "production";
    if (isDevPath && !devEnabled) {
      return new NextResponse("Not available", { status: 404 });
    }

    return NextResponse.next();
  } catch (error) {
    // If middleware fails, just pass through
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}
