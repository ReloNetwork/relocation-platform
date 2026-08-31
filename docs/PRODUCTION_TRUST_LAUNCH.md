# Production trust launch

This pass aligns the public promises, data handling, editorial inventory and commercial measurement used for launch.

## Apply before production

1. Apply `20260826000200_commercial_events.sql` after the existing intake, partner-sales and Ask Relo migrations.
2. Confirm `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `CRON_SECRET` are set in Vercel Production.
3. Review `/api/health`; `commercialAnalytics` should be configured.
4. Submit one controlled event in each journey and verify `/admin/launch-metrics` contains no contact details or question/form text.
5. Invoke `/api/cron/data-retention` with the cron bearer secret and confirm a successful response.
6. Have UK counsel review the public Privacy, Terms and Cookies pages plus paid-service order terms before consumer payments are enabled.

## Operating rules

- Analytics may contain the event name, journey, page, referring host, UTM values and short non-identifying properties only.
- Never send emails, names, phone numbers, chat text, relocation details or free-form partner answers to `/api/analytics`.
- Sponsored work must use the labels and independence rules in `/editorial-policy`.
- Archive articles require a named owner, fixed publication/review date and claim-level source notes before publication.
- Old checkout and voice endpoints remain production-blocked until their offer, fulfilment and privacy contracts are separately approved.

## Retention schedule

- Ask Relo abuse counters: 90 days.
- Anonymous commercial events: 13 months.
- Unconverted or closed/nurture enquiries: 24 months.
- Contract, client, payment and tax records: governed by the applicable engagement and legal obligations.

Retention cleanup runs monthly through Vercel Cron. Failed deletion from any table returns a non-success response so the run can be investigated rather than appearing complete.
