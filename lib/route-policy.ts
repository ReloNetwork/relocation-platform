export type RouteDecision =
  | { action: 'allow'; indexable: boolean }
  | { action: 'redirect'; destination: string }
  | { action: 'not-found' }
  | { action: 'gone' }

const INDEXABLE_ROUTES = new Set([
  '/',
  '/about',
  '/ask-relo',
  '/contact',
  '/cookies',
  '/discover',
  '/editorial-policy',
  '/executive-intake',
  '/journal',
  '/live',
  '/london-landing-list',
  '/move',
  '/network',
  '/newsletter',
  '/newsletter/american-school-london-guide',
  '/newsletter/canary-wharf-guide',
  '/newsletter/london-property-trends-2025',
  '/newsletter/marylebone-guide',
  '/newsletter/mayfair-guide',
  '/partner-application',
  '/privacy',
  '/terms',
])

const INDEXABLE_PREFIXES: string[] = []

const LEGACY_REDIRECTS: Record<string, string> = {
  '/api/newsletter-signup': '/api/newsletter/subscribe',
  '/ai-talent-assessment': '/executive-intake',
  '/articles': '/journal',
  '/ask': '/ask-relo',
  '/auth-new': '/login',
  '/blueprint': '/journal',
  '/book': '/executive-intake',
  '/book-consultation': '/executive-intake',
  '/concierge': '/ask-relo',
  '/consultation': '/executive-intake',
  '/directory': '/network',
  '/directory/signup': '/network',
  '/education': '/discover',
  '/executive': '/executive-intake',
  '/guides/london-relocation-cost-guide': '/journal',
  '/join-waitlist': '/london-landing-list',
  '/newsletter/get-started': '/newsletter',
  '/partners': '/network',
  '/partners/apply': '/partner-application',
  '/pricing': '/move',
  '/relosolutions': '/ask-relo',
}

const DEVELOPMENT_ONLY_PREFIXES = [
  '/api/dev',
  '/api/test-',
  '/debug-',
  '/integrations',
]

const RETIRED_PAGE_PREFIXES = [
  '/ai-demo',
  '/ai-solutions',
  '/ai-talent-assessment-test',
  '/checkout/dev-success',
  '/concierge/demo-success',
  '/corporate/payment',
  '/corporate/test-payment',
  '/demo-dashboard',
  '/documents-demo',
  '/email-sender',
  '/newsletter/fragomen-immigration-guide',
  '/newsletter/launch-edition',
  '/newsletter/london-luxury-transport',
  '/partners/lead-machine',
  '/partners/market-dominator',
  '/partners/onboard',
  '/simple-auth',
  '/tasks-demo',
  '/tasks/kanban',
  '/test',
]

const RETIRED_API_PREFIXES = [
  '/api/checkout',
  '/api/directory/checkout',
  '/api/education/create-checkout',
  '/api/payment-links',
  '/api/payments/create-checkout-session',
  '/api/suppliers/checkout',
  '/api/beehiiv/launch-distribution',
  '/api/beehiiv/test',
  '/api/ai-demo',
  '/api/client/validate',
  '/api/consultations/book',
  '/api/contact',
  '/api/docs/interpret',
  '/api/lindy/calls',
  '/api/partners/feedback',
  '/api/forms/partner-application',
  '/api/partner-applications',
  '/api/partners/applications',
  '/api/partners/checkout',
  '/api/partners/lead-machine',
  '/api/partners/market-dominator',
  '/api/partners/payment',
  '/api/partners/recommendations',
  '/api/retell/llm-websocket',
  '/api/submit-ai-talent',
  '/api/tasks',
]

const PRIVATE_PAGE_PREFIXES = [
  '/account',
  '/admin',
  '/auth',
  '/case',
  '/client',
  '/dashboard',
  '/executive-intake/success',
  '/login',
  '/onboarding',
  '/partner-application/media-pack',
]

const NON_DOCUMENT_EXTENSIONS = /\.[a-z0-9]{2,8}$/i

function normalisePath(pathname: string) {
  if (pathname === '/') return pathname
  return pathname.replace(/\/+$/, '') || '/'
}

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) =>
    prefix.endsWith('-')
      ? pathname.startsWith(prefix)
      : pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function getRouteDecision(
  rawPathname: string,
  options: { isProduction: boolean; devToolsEnabled: boolean },
): RouteDecision {
  const pathname = normalisePath(rawPathname)

  if (
    matchesPrefix(pathname, DEVELOPMENT_ONLY_PREFIXES) &&
    !(options.devToolsEnabled && !options.isProduction)
  ) {
    return { action: 'not-found' }
  }

  const destination = LEGACY_REDIRECTS[pathname]
  if (destination) return { action: 'redirect', destination }

  if (options.isProduction && matchesPrefix(pathname, RETIRED_API_PREFIXES)) {
    return { action: 'not-found' }
  }

  if (options.isProduction && matchesPrefix(pathname, RETIRED_PAGE_PREFIXES)) {
    return { action: 'gone' }
  }

  if (NON_DOCUMENT_EXTENSIONS.test(pathname) || pathname.startsWith('/_next/')) {
    return { action: 'allow', indexable: false }
  }

  if (pathname.startsWith('/api/')) {
    return { action: 'allow', indexable: false }
  }

  const indexable =
    INDEXABLE_ROUTES.has(pathname) ||
    INDEXABLE_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (indexable || matchesPrefix(pathname, PRIVATE_PAGE_PREFIXES)) {
    return { action: 'allow', indexable }
  }

  return options.isProduction
    ? { action: 'gone' }
    : { action: 'allow', indexable: false }
}
