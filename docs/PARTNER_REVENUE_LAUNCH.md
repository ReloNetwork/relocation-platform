# Partner revenue launch

The launch journey is qualification-first:

`inventory → application → scoring and storage → media-pack delivery → review → scoped proposal → invoice/payment → campaign reporting`

There is no public self-service partner checkout. A paid placement does not buy
client introductions, undisclosed coverage or priority in Ask Relo answers.

## Configuration

1. Apply `supabase/migrations/20260826_partner_sales_leads.sql`.
2. Configure these Vercel Preview variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `PARTNER_ENQUIRY_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
3. Confirm the sender domain is verified in Resend.
4. Ensure the founder's Supabase user belongs to an organisation with an
   `admin` membership so `/admin/partner-applications` is available.

## Controlled test

1. Submit a consented test application through `/partner-application`.
2. Confirm the record exists in `partner_sales_leads` with a reference, score,
   quality and initial pipeline status.
3. Confirm the internal alert and applicant media-pack email were delivered.
4. Confirm the success state links to `/partner-application/media-pack`.
5. Open `/admin/partner-applications`, set an estimated value and next action,
   move the record through the pipeline and confirm the changes persist.
6. Verify the legacy application and checkout APIs return `404` in production.

## Launch inventory

- The London Brief: one lead sponsor per issue.
- Journal: up to two commissioned sponsored briefings per month.
- Editorial Partner Pilot: one sponsored briefing, two newsletter placements,
  a reviewed Network profile where appropriate and a campaign report.
- Launch pilot pricing begins at £2,500. Larger or category-specific programmes
  require a scoped proposal.

Do not publish audience sizes, open rates, enquiry volumes or partner return on
investment until the underlying reporting period and source can be shown.
