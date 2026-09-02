# Go-live checklist

Updated: 27 August 2026

This is the launch checklist for the redesigned website. A checked item needs evidence, not only a configured setting.

Run the automated configuration check against the current target at any time:

```bash
npm run launch:check -- https://your-preview-or-production-domain
```

The command returns a failing exit code until every qualification-first launch service and required database table reports ready. Stripe and Ask Relo voice are shown separately as optional.

Run the public route, redirect, rendered-copy and sitemap checks with:

```bash
npm run launch:smoke -- https://your-preview-or-production-domain
```

## Fastest safe launch

The public website can launch with a qualification-first commercial model:

- Relocation clients submit a private brief, then book a qualification call.
- Newsletter readers subscribe through Beehiiv.
- Ask Relo offers three complimentary beta questions, then directs people to the private brief.
- Partners apply for an editorial pilot, receive the media pack and move into a reviewed sales pipeline.

Stripe checkout and Ask Relo voice can remain disabled for the first release. They are separate launch gates and should not delay the website if no public page promises them.

## 1. Production database

- [ ] Confirm the correct Supabase production project.
- [ ] Apply `20260821000100_ask_relo_usage.sql`.
- [ ] Apply `20260821000200_executive_intake_leads.sql`.
- [ ] Apply `20260826000100_partner_sales_leads.sql`.
- [ ] Apply `20260826000200_commercial_events.sql`.
- [ ] Apply `20260902000100_ask_relo_followups.sql`.
- [ ] Generate authoritative Supabase types from the production project.
- [ ] Verify row-level security and service-role access.
- [ ] Confirm backups and a tested recovery route.
- [ ] Submit one record through each public journey and confirm that it appears once in the correct table.

## 2. Vercel production settings

- [ ] Add production Supabase URL, anonymous key and service-role key.
- [ ] Add `RESEND_API_KEY` and a verified `RESEND_FROM_EMAIL`.
- [ ] Add `EXECUTIVE_INTAKE_EMAIL` for relocation alerts.
- [ ] Add `PARTNER_ENQUIRY_EMAIL` for partner alerts.
- [ ] Add `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`.
- [ ] Add `BEEHIIV_LANDING_LIST_AUTOMATION_ID`.
- [ ] Add `OPENAI_API_KEY` and a long random `ASK_RELO_USAGE_SECRET`.
- [ ] Add `NEXT_PUBLIC_CAL_COM_EMBED_ID` and confirm the public booking page.
- [ ] Add `NEXT_PUBLIC_SITE_URL` using the final canonical domain.
- [ ] Add `RETELL_API_KEY` and the published `RETELL_AGENT_ID` as server-side values.
- [ ] Add `RETELL_WEBHOOK_KEY` if Retell provides a separate webhook-badged key.
- [ ] Set `NEXT_PUBLIC_ASK_RELO_VOICE_ENABLED=1` after the controlled voice test passes.
- [ ] Confirm the Retell knowledge base, scope boundaries, AI disclosure, five-minute call limit and privacy settings.
- [ ] Add and verify the internal and cron secrets used by protected routes.
- [ ] Confirm that no preview or test value is present in the Production environment.

## 3. Domain and email

- [ ] Confirm the primary domain. The recommended default is `https://www.therelonetwork.com`.
- [ ] Redirect every alternative host to the primary host, including the non-`www` version.
- [ ] Point Vercel Production to the approved commit.
- [ ] Verify the canonical URL, sitemap, robots file and RSS feed on the live domain.
- [ ] Verify SPF, DKIM and DMARC for the sending domain.
- [ ] Confirm that Resend and Beehiiv both show the sending domain as verified.
- [ ] Send test messages to Gmail, Outlook and Apple Mail and check the spam folder.

## 4. Newsletter and Landing List

- [ ] Submit the main newsletter form with a consented test address.
- [ ] Submit the London Landing List form with a different consented test address.
- [ ] Confirm source, campaign and consent data in Beehiiv.
- [ ] Confirm that the Landing List automation starts once and delivers the correct first email.
- [ ] Confirm double opt-in if it is enabled.
- [ ] Test unsubscribe and verify that the address is suppressed from later sends.
- [ ] Send a complete test issue of The London Brief before the first public campaign.
- [ ] Remove or import any old subscriber list only when consent history is known.

## 5. Relocation client journey

- [ ] Submit a real controlled test brief on the production domain.
- [ ] Confirm the lead is stored in Supabase with the correct reference.
- [ ] Confirm the client receives the acknowledgement email.
- [ ] Confirm the internal team receives the alert.
- [ ] Book a qualification call and confirm it appears in Cal.com.
- [ ] Confirm the booking conversion event is recorded once.
- [ ] Assign an owner for new briefs and define the response window the team can consistently meet.
- [ ] Finalise the internal offer, pricing, proposal, payment and cancellation process.
- [ ] Do not enable public checkout until Stripe, webhooks, receipts and refunds pass a live-mode test.

## 6. Ask Relo beta

- [ ] Ask three controlled questions and confirm that each answer follows the safety instructions.
- [ ] Confirm the fourth question is limited and offers the private brief.
- [ ] Test legal, immigration, tax, medical and financial questions for appropriate boundaries.
- [ ] Confirm questions are not stored in Supabase and OpenAI requests use `store: false`.
- [ ] Confirm usage limiting works without storing a raw IP address.
- [ ] Test the human handoff to the relocation brief.
- [ ] Request a one-off Ask Relo email summary and confirm it arrives once.
- [ ] Configure the signed Retell webhook and confirm events are stored without transcripts or audio.
- [ ] Keep voice hidden until the agent, recording notice, consent, transcripts and escalation path are separately approved.

## 7. Partner revenue journey

- [ ] Submit one controlled partner application.
- [ ] Confirm the application is saved and the internal alert arrives.
- [ ] Confirm the applicant receives the media-pack link.
- [ ] Open the private media pack and check every placement, deliverable and metric.
- [ ] Confirm an administrator can qualify, reject and move an applicant through the pipeline.
- [ ] Finalise the pilot price range, inventory limits, editorial calendar and delivery owner.
- [ ] Finalise the proposal, order form, invoice and cancellation terms.
- [ ] Confirm every paid placement receives a clear sponsorship label.
- [ ] Confirm payment cannot buy an independent recommendation or a favourable Ask Relo answer.
- [ ] Use only measured audience figures in proposals and reports.

## 8. Legal and trust

- [ ] Confirm the exact legal company name, company number and registered office shown where required.
- [ ] Review Privacy, Terms, Cookies and Editorial Policy against the production tools and real operating process.
- [ ] Confirm the lawful basis, retention period and deletion process for each type of lead.
- [ ] Add a consent banner before enabling any non-essential cookies or tracking.
- [ ] Confirm sponsored-content disclosure and corrections procedures.
- [ ] Confirm the service is not presented as emergency, legal, tax, immigration, medical or financial advice.

## 9. Final website quality check

- [ ] Review every approved public route on iPhone Safari and a current Android browser.
- [ ] Review desktop Safari, Chrome and Edge.
- [ ] Check keyboard navigation, focus states, form labels and reduced motion.
- [ ] Test the cinematic film on a slower mobile connection and confirm that the fallback still explains the offer.
- [ ] Test every form in both success and failure states.
- [ ] Confirm there are no em dash characters in public copy.
- [ ] Check titles, descriptions, social images, canonicals and article dates.
- [ ] Check all links, redirects, 404 responses and 410 responses.
- [ ] Confirm the public sitemap contains only the approved redesigned routes.
- [ ] Confirm no browser console errors occur on the main journeys.

## 10. Cutover and first 48 hours

- [ ] Record the current production deployment so it can be restored quickly.
- [ ] Take a production database backup before cutover.
- [ ] Deploy the approved feature commit to Production without changing application data.
- [ ] Run all four controlled journey tests on the real domain.
- [ ] Invite 10 to 20 trusted users before the public announcement.
- [ ] Monitor Vercel errors, Supabase writes, email delivery, Beehiiv enrolment and form alerts.
- [ ] Assign one person to respond to relocation leads and one person to partner applications.
- [ ] Fix any lost submission, false success message or delivery failure before wider promotion.

## Launch approval evidence

The website is ready for a public announcement when all of these are true:

- [ ] All four production migrations are applied.
- [ ] The production readiness endpoint reports the required launch services as configured and reachable.
- [ ] One newsletter signup, Landing List enrolment and unsubscribe have passed.
- [ ] One relocation brief, acknowledgement, alert and qualification booking have passed.
- [ ] Three Ask Relo questions, the usage limit and human handoff have passed.
- [ ] One partner application, media-pack delivery and pipeline update have passed.
- [ ] The final domain, email authentication, legal identity and rollback plan are confirmed.
- [ ] Real-device checks are complete with no critical accessibility, form or console defect.

Stripe and voice are approved separately. If they remain unavailable and hidden, they do not block the qualification-first public launch.
