# Ask Relo launch

Ask Relo now uses the OpenAI Responses API for text answers. It does not fall
back to scripted London prices, invented partners or simulated success.
The legacy public subscription checkout has been removed; the launch journey is
complimentary preview to qualified private brief, not an unproven price menu.

## Required Preview configuration

1. Apply `supabase/migrations/20260821000100_ask_relo_usage.sql` and
   `supabase/migrations/20260902000100_ask_relo_followups.sql`.
   The existing retention job removes Ask Relo summaries and privacy-minimised
   Retell events after 90 days.
2. Add these Vercel Preview variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (the current default is `gpt-5-mini`)
   - `ASK_RELO_USAGE_SECRET` (a long random server-only value)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Add the browser voice variables:
   - `NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED=1`
   - `RETELL_API_KEY` (server-only)
   - `RETELL_AGENT_ID` (the published agent)
   - `RETELL_WEBHOOK_KEY` if Retell marks a separate key for webhook verification
   - `NEXT_PUBLIC_CAL_COM_EMBED_ID` using the public Cal.com booking path
4. In Retell, connect the approved Relo knowledge base, enable scope boundaries
   and AI disclosure, and limit calls to five minutes. Set the agent webhook to
   `https://your-preview-domain/api/webhooks/retell` and enable `call_started`,
   `call_ended` and `call_analyzed`.

The public preview allows three questions per browser session and applies a
hashed-IP daily ceiling. It stores usage counters only, not question content.
OpenAI requests set `store: false`.

## Acceptance test

Use a clean browser session on Preview and confirm:

1. A general London decision question receives a concise, relevant answer.
2. A current visa, tax, legal or school-admissions question is framed as
   time-sensitive and points to official or qualified verification.
3. Ask Relo never invents a provider, property, live availability or result.
4. A voice call connects only after microphone permission and counts as one of
   the same three complimentary Ask Relo interactions.
5. The fourth text or voice interaction is blocked and links to
   `/executive-intake`.
6. End the voice call and confirm the page offers Start Your Move and the Move
   Review without promising an automatic follow-up.
7. Test a time-sensitive question and confirm the voice agent asks the caller
   to verify it with an official or qualified source.
8. `/api/health` reports both `askRelo.ok: true` and
   `askReloVoice.ok: true`.
9. Request an email summary, confirm the one-off consent language and verify the
   `ask_relo_followups` record contains no raw IP address.
10. Confirm signed Retell events reach `retell_call_events` without transcripts
    or audio.

Do not paste API keys or the usage secret into chat, source control or any
client component. Enter them directly in Vercel and Retell.
