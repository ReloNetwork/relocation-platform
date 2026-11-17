import { describe, expect, it } from 'vitest'
import { RELO_SHARED_POLICY } from '../lib/relo-shared-policy'
import { ASK_RELO_VOICE_INSTRUCTIONS } from '../lib/retell'

describe('Ask Relo shared guidance', () => {
  it('uses the same core policy for voice', () => {
    expect(ASK_RELO_VOICE_INSTRUCTIONS).toContain(RELO_SHARED_POLICY)
  })
  it('includes relevant current service, safety and household coverage', () => {
    expect(RELO_SHARED_POLICY).toContain('£249')
    expect(RELO_SHARED_POLICY).toContain('/london-move-map')
    expect(RELO_SHARED_POLICY).toContain('couples')
    expect(RELO_SHARED_POLICY).toContain('Never claim a provider is vetted')
    expect(RELO_SHARED_POLICY).toContain('Do not fabricate properties')
  })
})
