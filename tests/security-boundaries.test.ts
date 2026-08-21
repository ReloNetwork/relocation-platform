import { afterEach, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { hasBasicAdminAccess, hasCronAccess, hasInternalAccess } from '@/lib/api-auth'
import { POST as migrateDocuments } from '@/app/api/admin/migrate-documents/route'
import { GET as getSubmissions } from '@/app/api/get-submissions/route'
import { POST as executeAutomation } from '@/app/api/automation/execute/route'
import { GET as getDirectoryAccess } from '@/app/api/directory/access-manager/route'
import { GET as runSlaAlerts } from '@/app/api/cron/sla-alerts/route'
import { POST as sendEmail } from '@/app/api/send-email/route'
import { POST as submitConsultation } from '@/app/api/consultations/submit/route'
import { POST as submitContact } from '@/app/api/contact/route'

const jsonRequest = (url: string, body: unknown = {}) =>
  new NextRequest(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

afterEach(() => {
  delete process.env.INTERNAL_API_SECRET
  delete process.env.CRON_SECRET
  delete process.env.CRON_API_KEY
  delete process.env.BASIC_AUTH_USER
  delete process.env.BASIC_AUTH_PASS
})

describe('server-only authentication', () => {
  it('fails closed when secrets are not configured', () => {
    const request = new NextRequest('https://example.test')
    expect(hasInternalAccess(request)).toBe(false)
    expect(hasCronAccess(request)).toBe(false)
    expect(hasBasicAdminAccess(request)).toBe(false)
  })

  it('accepts configured credentials and rejects near matches', () => {
    process.env.INTERNAL_API_SECRET = 'internal-secret-value'
    process.env.CRON_SECRET = 'cron-secret-value'
    process.env.BASIC_AUTH_USER = 'admin'
    process.env.BASIC_AUTH_PASS = 'strong-password'

    expect(hasInternalAccess(new Request('https://example.test', {
      headers: { authorization: 'Bearer internal-secret-value' },
    }))).toBe(true)
    expect(hasInternalAccess(new Request('https://example.test', {
      headers: { authorization: 'Bearer internal-secret-valu' },
    }))).toBe(false)
    expect(hasCronAccess(new Request('https://example.test', {
      headers: { authorization: 'Bearer cron-secret-value' },
    }))).toBe(true)
    expect(hasBasicAdminAccess(new NextRequest('https://example.test', {
      headers: { authorization: `Basic ${Buffer.from('admin:strong-password').toString('base64')}` },
    }))).toBe(true)
  })
})

describe('sensitive route boundaries', () => {
  it('hides internal and destructive routes without credentials', async () => {
    expect((await migrateDocuments(new Request('https://example.test'))).status).toBe(404)
    expect((await getSubmissions(new Request('https://example.test'))).status).toBe(404)
    expect((await executeAutomation(jsonRequest('https://example.test'))).status).toBe(404)
    expect((await getDirectoryAccess(new NextRequest('https://example.test?email=test@example.com'))).status).toBe(404)
  })

  it('rejects unauthenticated cron and email requests', async () => {
    expect((await runSlaAlerts(new Request('https://example.test'))).status).toBe(401)
    expect((await sendEmail(jsonRequest('https://example.test'))).status).toBe(401)
  })
})

describe('conversion routes', () => {
  it('validates consultation and contact submissions before side effects', async () => {
    expect((await submitConsultation(jsonRequest('https://example.test'))).status).toBe(400)
    expect((await submitContact(jsonRequest('https://example.test'))).status).toBe(400)
  })
})
