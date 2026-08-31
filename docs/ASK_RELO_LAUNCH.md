# Ask Relo launch

Ask Relo now uses the OpenAI Responses API for text answers. It does not fall
back to scripted London prices, invented partners or simulated success.
The legacy public subscription checkout has been removed; the launch journey is
complimentary preview to qualified private brief, not an unproven price menu.

## Required Preview configuration

1. Apply `supabase/migrations/20260821000100_ask_relo_usage.sql`.
2. Add these Vercel Preview variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (the current default is `gpt-5-mini`)
   - `ASK_RELO_USAGE_SECRET` (a long random server-only value)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Keep `NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED=0` until the Retell agent prompt,
   voice, recording notice and live answers have passed a separate review.

The public preview allows three questions per browser session and applies a
hashed-IP daily ceiling. It stores usage counters only, not question content.
OpenAI requests set `store: false`.

## Acceptance test

Use a clean browser session on Preview and confirm:

1. A general London decision question receives a concise, relevant answer.
2. A current visa, tax, legal or school-admissions question is framed as
   time-sensitive and points to official or qualified verification.
3. Ask Relo never invents a provider, property, live availability or result.
4. The fourth question is blocked and links to `/executive-intake`.
5. The voice control is absent while voice is disabled.
6. `/api/health` reports `askRelo.ok: true`.

Do not paste API keys or the usage secret into chat, source control or any
client component.
