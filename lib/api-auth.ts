import { timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

function matchesSecret(actual: string | null, expected: string | undefined): boolean {
  if (!actual || !expected) return false

  const actualBuffer = Buffer.from(actual)
  const expectedBuffer = Buffer.from(expected)
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export function hasInternalAccess(request: Request): boolean {
  const expected = process.env.INTERNAL_API_SECRET
  const authorization = request.headers.get('authorization')
  const bearer = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null

  return (
    matchesSecret(bearer, expected) ||
    matchesSecret(request.headers.get('x-internal-secret'), expected)
  )
}

export function hasCronAccess(request: Request): boolean {
  const expected = process.env.CRON_SECRET || process.env.CRON_API_KEY
  const authorization = request.headers.get('authorization')
  const bearer = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null

  return matchesSecret(bearer, expected) || matchesSecret(request.headers.get('x-cron-secret'), expected)
}

export function hasBasicAdminAccess(request: NextRequest): boolean {
  const expectedUser = process.env.BASIC_AUTH_USER
  const expectedPassword = process.env.BASIC_AUTH_PASS
  const authorization = request.headers.get('authorization')

  if (!expectedUser || !expectedPassword || !authorization?.startsWith('Basic ')) return false

  try {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8')
    const separator = decoded.indexOf(':')
    if (separator < 0) return false

    return (
      matchesSecret(decoded.slice(0, separator), expectedUser) &&
      matchesSecret(decoded.slice(separator + 1), expectedPassword)
    )
  } catch {
    return false
  }
}
