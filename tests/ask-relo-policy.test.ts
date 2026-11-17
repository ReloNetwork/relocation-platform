import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { RELO_SHARED_POLICY } from '../lib/relo-shared-policy'

describe('Ask Relo shared guidance', () => {
  it('is referenced by the Retell voice prompts', () => {
    const voiceSource = readFileSync('lib/retell.ts', 'utf8')
    expect(voiceSource).toContain('RELO_SHARED_POLICY +')
  })
  it('includes relevant current service, safety and household coverage', () => {
    expect(RELO_SHARED_POLICY).toContain('£249')
    expect(RELO_SHARED_POLICY).toContain('/london-move-map')
    expect(RELO_SHARED_POLICY).toContain('couples')
    expect(RELO_SHARED_POLICY).toContain('Never claim a provider is vetted')
    expect(RELO_SHARED_POLICY).toContain('Do not fabricate properties')
  })
})
