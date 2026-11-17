# Property Hunt LIVE: partner outreach readiness gate

Branch: `property-hunt-outreach-readiness`. **No production deployment made**.

## Implemented in this branch
- `/property-hunt-live`: dedicated property collaboration proposition, editorial safeguards, sample concept, and direct enquiry/email CTAs.
- Homepage, site navigation and footer routes to Property Hunt LIVE.
- Updated `/live` and `/about` messaging for property hunt and founder-led relocation, without invented metrics, property partners or client testimonials.
- Partner form accepts and preselects `property-live` using `?interest=property-live`; schema accepts it and remains compatible with existing Supabase text columns. The standard media pack still supports editorial partnerships; LIVE collaborations are discussed individually.

## MUST verify in deployment before property company outreach
1. Confirm that `www.therelonetwork.com` and apex domain actually point to the redesigned Vercel release. A cached web index returned an **older** homepage boasting unverified client metrics, guarantees, partner claims and testimonials. This is not proof the current site is still showing it. Verify in a fresh browser and inspect indexed legacy URLs; remove misleading claims and reindex.
2. Check homepage film (35s), visual composition, text contrast, sticky navigation, keyboard accessibility and page load on iPhone/Android and desktop; check `/property-hunt-live` and `/partner-application?interest=property-live` in both layouts.
3. Submit a **test** partner enquiry through preview: Supabase row, notification to partner mailbox, confirmation email, and correct media pack access. Do not submit a fictitious production lead.
4. Verify Beehiiv keys and Landing List subscription workflow, opt-in consent and welcome mail. Don't imply a working newsletter signup solely because UI renders.
5. Verify Stripe live account / webhook readiness and exercise a controlled test purchase/refund in an approved environment. The £249 checkout route is code-complete but not proven to accept real payment.
6. Verify Ask Relo is responsive and truthful; its 2.0 upgrade is tracked separately in draft PR #24. Do not merge or advertise unverified AI concierge abilities.
7. Confirm property filming permission, listing information rights, client privacy, fair editorial standards, distribution platform permissions and paid partnership disclosures.
8. Add founder-provided professional photo and actual footage **only with appropriate permissions**; do not create fake showcase footage or endorsements.
9. Run `npm ci`, `npm run type-check`, `npm test`, `npm run build`, and browser QA in CI/Work or local. GitHub connector writes in chat do not run tests.

## Outreach go/no-go
Do not send broad agent/developer outreach until deployed URL, contact route and claims have passed checks 1-3. We can begin selective relationship conversations without representing the site as fully verified.

## Content principle
First collaborations are proposed as mutually agreed editorial viewings, not guaranteed lead-generation, audience size or sponsored reach. If paying, disclosure is clear and recommendations independent.
