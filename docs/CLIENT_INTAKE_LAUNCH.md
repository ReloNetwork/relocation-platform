# Relocation client intake launch

The public executive intake is qualification-first. A prospect submits a
private relocation brief; The Relo Network reviews fit and scope before sending
any payment link.

## Required configuration

1. Apply `supabase/migrations/20260821_executive_intake_leads.sql` to the
   production Supabase project.
2. Configure these Vercel Preview variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `EXECUTIVE_INTAKE_EMAIL`
   - `NEXT_PUBLIC_CAL_COM_EMBED_ID` if the receipt page should offer a real
     qualification-call link.
3. Verify the Resend sending domain and the inbox used by
   `EXECUTIVE_INTAKE_EMAIL`.

Never paste service-role keys or API keys into chat, source control or a client
component.

## Acceptance test

Use one controlled test prospect on the Preview deployment and confirm:

1. The form returns a server-generated `RL-...` reference.
2. The lead exists in `executive_intake_leads` with the expected quality and
   fit score.
3. The internal notification reaches the configured operations inbox.
4. The prospect acknowledgement contains the same reference.
5. No Stripe customer, Checkout Session or payment is created.
6. The receipt page never claims that work, a booking or payment has completed.
7. `/api/health` reports `executiveIntake.ok: true` without revealing any
   credential values.

After qualification, create a scoped Stripe payment link manually. Automated
payment-link issuance should wait until the offer catalogue and fulfilment
capacity are operationally locked.

Before opening the form to paid or high-volume traffic, add a managed bot check
such as Cloudflare Turnstile. The server-side validation and locked-down database
table protect data integrity, but they are not a substitute for abuse prevention.
