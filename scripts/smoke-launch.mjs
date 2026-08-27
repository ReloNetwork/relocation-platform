const target = process.argv[2] || process.env.LAUNCH_URL

if (!target) {
  console.error('Usage: npm run launch:smoke -- https://your-preview-or-production-domain')
  process.exit(2)
}

let baseUrl
try {
  baseUrl = new URL(target)
} catch {
  console.error('The launch URL must be a complete http or https URL.')
  process.exit(2)
}

if (!['http:', 'https:'].includes(baseUrl.protocol)) {
  console.error('The launch URL must use http or https.')
  process.exit(2)
}

const expected = [
  ['/', 200],
  ['/move', 200],
  ['/live', 200],
  ['/discover', 200],
  ['/network', 200],
  ['/journal', 200],
  ['/about', 200],
  ['/ask-relo', 200],
  ['/london-landing-list', 200],
  ['/executive-intake', 200],
  ['/newsletter', 200],
  ['/partner-application', 200],
  ['/contact', 200],
  ['/privacy', 200],
  ['/terms', 200],
  ['/cookies', 200],
  ['/editorial-policy', 200],
  ['/newsletter/mayfair-guide', 200],
  ['/partner-application/media-pack', 200],
  ['/corporate', 410],
  ['/payment-success', 410],
  ['/newsletter/launch-edition', 410],
  ['/api/contact', 404],
  ['/api/checkout', 404],
]

const redirectChecks = [
  ['/partners', '/network'],
  ['/directory', '/network'],
  ['/concierge', '/ask-relo'],
  ['/pricing', '/move'],
]

async function request(path, options = {}) {
  return fetch(new URL(path, baseUrl), {
    redirect: 'manual',
    signal: AbortSignal.timeout(20_000),
    ...options,
  })
}

const results = await Promise.all(expected.map(async ([path, status]) => {
  try {
    const response = await request(path)
    const text = response.headers.get('content-type')?.includes('text/html')
      ? await response.text()
      : ''
    const copyOk = !text.includes('\u2014')
    return {
      path,
      passed: response.status === status && copyOk,
      detail: response.status !== status
        ? `expected ${status}, received ${response.status}`
        : copyOk
          ? `HTTP ${status}`
          : 'em dash found in rendered HTML',
    }
  } catch (error) {
    return { path, passed: false, detail: error.message }
  }
}))

const redirects = await Promise.all(redirectChecks.map(async ([path, destination]) => {
  try {
    const response = await request(path)
    const location = response.headers.get('location')
    const resolved = location ? new URL(location, baseUrl).pathname : ''
    return {
      path,
      passed: [301, 302, 307, 308].includes(response.status) && resolved === destination,
      detail: `HTTP ${response.status}, location ${resolved || 'missing'}`,
    }
  } catch (error) {
    return { path, passed: false, detail: error.message }
  }
}))

let sitemapResult
try {
  const sitemapResponse = await request('/sitemap.xml')
  const sitemap = await sitemapResponse.text()
  const requiredUrls = ['/ask-relo', '/executive-intake', '/newsletter', '/partner-application']
  const excludedUrls = ['/corporate', '/pricing', '/directory', '/payment-success']
  const complete = requiredUrls.every((path) => sitemap.includes(path))
  const clean = excludedUrls.every((path) => !sitemap.includes(`${path}</loc>`))
  sitemapResult = {
    path: '/sitemap.xml',
    passed: sitemapResponse.ok && complete && clean,
    detail: sitemapResponse.ok && complete && clean ? 'approved routes only' : 'missing or retired routes found',
  }
} catch (error) {
  sitemapResult = { path: '/sitemap.xml', passed: false, detail: error.message }
}

const allResults = [...results, ...redirects, sitemapResult]
allResults.forEach(({ path, passed, detail }) => {
  console.log(`${passed ? 'PASS' : 'FAIL'} ${path.padEnd(42)} ${detail}`)
})

const failures = allResults.filter(({ passed }) => !passed)
if (failures.length) {
  console.error(`\nSmoke test failed on ${failures.length} check${failures.length === 1 ? '' : 's'}.`)
  process.exit(1)
}

console.log(`\nAll ${allResults.length} public route, copy, redirect and sitemap checks passed.`)
