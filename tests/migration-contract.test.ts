import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const migrationDirectory = join(process.cwd(), 'supabase', 'migrations')
const expectedMigrations = [
  '20260821000100_ask_relo_usage.sql',
  '20260821000200_executive_intake_leads.sql',
  '20260826000100_partner_sales_leads.sql',
  '20260826000200_commercial_events.sql',
]

describe('production migration contract', () => {
  const migrationFiles = readdirSync(migrationDirectory)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  it('contains only the four redesigned launch migrations', () => {
    expect(migrationFiles).toEqual(expectedMigrations)
  })

  it('uses a unique 14-digit version for every migration', () => {
    const versions = migrationFiles.map((file) => file.slice(0, 14))

    expect(versions.every((version) => /^\d{14}$/.test(version))).toBe(true)
    expect(new Set(versions).size).toBe(versions.length)
  })

  it.each(expectedMigrations)('%s keeps launch data server-only', (file) => {
    const sql = readFileSync(join(migrationDirectory, file), 'utf8').toLowerCase()

    expect(sql).toContain('enable row level security')
    expect(sql).toContain('revoke all on table')
    expect(sql).toContain('from anon, authenticated')
    expect(sql).toContain('to service_role')
  })
})
