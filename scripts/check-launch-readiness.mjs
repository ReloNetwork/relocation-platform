const target = process.argv[2] || process.env.LAUNCH_URL

if (!target) {
  console.error('Usage: npm run launch:check -- https://your-preview-or-production-domain')
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

const required = [
  'supabase',
  'databaseSchema',
  'resend',
  'executiveIntake',
  'askRelo',
  'partnerSales',
  'commercialAnalytics',
]
const optional = ['stripe', 'beehiiv', 'cal', 'askReloVoice']

const healthUrl = new URL('/api/health', baseUrl)
let response
try {
  response = await fetch(healthUrl, { signal: AbortSignal.timeout(20_000) })
} catch (error) {
  console.error(`Could not reach ${healthUrl}: ${error.message}`)
  process.exit(1)
}

if (!response.ok) {
  console.error(`Readiness endpoint returned HTTP ${response.status}.`)
  process.exit(1)
}

const health = await response.json()
const label = (value) => value.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
const result = (key, requiredForLaunch) => {
  const item = health[key] || { configured: false, ok: false, detail: 'not reported' }
  const status = item.ok ? 'PASS' : requiredForLaunch ? 'BLOCKED' : 'OPTIONAL'
  console.log(`${status.padEnd(8)} ${label(key).padEnd(22)} ${item.detail || 'not configured'}`)
  return item.ok
}

console.log(`Launch readiness for ${baseUrl.origin}\n`)
const requiredPassed = required.map((key) => result(key, true)).every(Boolean)
console.log('')
optional.forEach((key) => result(key, false))

if (!requiredPassed) {
  console.error('\nLaunch is blocked. Complete the required items above, then run this command again.')
  process.exit(1)
}

console.log('\nAll qualification-first launch services report ready. Complete the controlled journey tests before announcing publicly.')
