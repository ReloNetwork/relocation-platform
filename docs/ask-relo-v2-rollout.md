# Ask Relo 2.0: staged delivery

This branch is a **foundation**, not a deployed or production-approved AI concierge.

## Implemented
- Shared adviser policy between text and Retell voice code, including £249 Home & Life Map and appropriate premium-service handoff.
- Optional `ASK_RELO_AI_PROVIDER=xai` server-side text provider; existing OpenAI behaviour remains default.
- Model selection via `XAI_MODEL` (default `grok-4.7`). The `XAI_API_KEY` must be set in the *server's* secret environment, not in source code.
- Voice retains the existing Retell agent and call implementation; it is **not yet powered by Grok**.

## Required before rollout
1. Run `npm ci`, `npm run type-check`, and `npm test` in CI or a local checkout. Code has not yet been run against production credentials.
2. Confirm deployed env settings, Retell dashboard agent, actual voice LLM, available custom functions, usage allowances, rate limits and consent/retention choices.
3. Create an approved-source Relo knowledge base with source URLs, checked dates and review ownership; implement retrieval for **both** text and Retell voice. No retrieval is added in this branch.
4. Implement customer brief persistence with explicit consent, access control, retention/deletion, and safe session-to-user linking.
5. Add 30+ scenarios with expert-reviewed expected answers, multi-turn constraint changes, refusal-to-invent property availability, and London-specific verification needs. Compare OpenAI and xAI on accuracy, personalisation, tone, latency and cost.
6. Validate xAI Responses API behaviour in a private preview, including timeout and output parsing; do not enable without an API key and measured success.
7. Integrate Retell knowledge functions with the same sources, and test actual phone-like conversational turns, voice interruptions, pronunciations and spoken latency.
8. Check commercial path, monitoring, error logs and rollback. Do not merge until all required security and acceptance checks pass.

## Environment
```
# Default / unchanged when absent
ASK_RELO_AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-mini

# Only if explicitly running private xAI tests
ASK_RELO_AI_PROVIDER=xai
XAI_API_KEY=...
XAI_MODEL=grok-4.7
```

Never commit credentials. Roll back by setting `ASK_RELO_AI_PROVIDER=openai` and redeploying (assuming configured OpenAI credentials).

## Known caveats
- The current text path only sends the last ten messages; shared long-term context requires a separate persistence and consent implementation.
- The current five-question allowance may be too restrictive for an involved relocation decision.
- The current Retell flow is configured separately from text; this branch aligns prompts but does not unify runtime context or source retrieval.
- Current model-generated prices, school availability and journey times are not live verified.
