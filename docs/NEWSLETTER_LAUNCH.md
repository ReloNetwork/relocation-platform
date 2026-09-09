# Newsletter launch configuration

Beehiiv is the subscriber source of truth. Supabase is an optional CRM mirror for
website attribution; a mirror failure must not undo a successful Beehiiv signup.

## Required Vercel variables

- `BEEHIIV_API_KEY`: server-only Beehiiv API key with subscription write access.
- `BEEHIIV_PUBLICATION_ID`: The London Brief publication ID (`pub_...`).
- `BEEHIIV_LANDING_LIST_AUTOMATION_ID`: active Beehiiv automation with an
  **Add by API** trigger. This automation owns delivery of the London Landing
  List and its follow-up sequence.
- `BEEHIIV_RELOCATION_INDEX_AUTOMATION_ID`: Add by API automation for the
  legacy Relocation Index article campaign. If that campaign is retired, redirect
  its article before launch instead of configuring this variable.

Configure these directly in Vercel for Preview first and Production only after
approval. Never commit or paste live keys into the repository.

## Beehiiv setup

1. Create or confirm The London Brief publication.
2. Enable the publication's preferred double opt-in policy.
3. Build the London Landing List automation and activate its Add by API trigger.
4. Add the automation ID to the Preview environment.
5. Submit one test address through `/london-landing-list` and confirm the
   subscriber, attribution and automation enrolment in Beehiiv.
6. Submit a different test address through `/newsletter` and confirm the normal
   publication welcome flow.
7. Test unsubscribe and suppression before enabling Production variables.

## Legacy sequence migration

New signups do not enter the Supabase/Resend sequence. The existing cron route is
disabled unless `ENABLE_LEGACY_LANDING_LIST_SEQUENCE=1`. If old queued leads must
finish the previous sequence, enable the switch temporarily, drain that queue,
then disable it permanently.

## Readiness

`/api/health` reports whether the Beehiiv subscription API and Landing List
automation are configured. It does not create a test subscriber. A real consented
test signup remains the final acceptance check.
