# Relo Network website messaging contract (November 2026)

The current public-facing offer structure should be consistent across page copy, forms, confirmations and partner communications.

## Customer offer ladder

| Route | Promise | Payment | Action |
| --- | --- | --- | --- |
| /ask-relo | Introductory AI guidance about moving to or living in London. Five complimentary questions at present; not verified live inventory or personalised professional advice. | Free preview | Ask Relo |
| /london-move-map | Personalised **£249** digital consultation: up to three area comparison, recommended starting point, short personalised video and one email follow-up within seven days. Delivered within three working days of complete brief. Does **not** include property search, viewings or a live consultation. | £249, one time | Continue to secure payment |
| /executive-intake | Private enquiry for hands-on home search, negotiation and other relocation support. Human review to discuss scope and next step; **no bespoke consultation or report is promised for submitting this enquiry**. | No payment for enquiry | Send private brief |
| /property-hunt-live | Developing interactive property viewing programme; property owners, estate agents and developers can propose editorial collaborations subject to filming permission and approval. Not guaranteed enquiries, distribution or existing viewership. | No mandatory sponsorship commitment for editorial proposal | Propose a property |
| /partner-application | Partner enquiry for property viewings or separate commercial editorial opportunities. Paid collaborations are disclosed, with independent recommendations. | No payment for enquiry | Send partner enquiry |

## Language guardrails
- “Start Your Move” means an enquiry, not a free strategy session or a confirmed paid engagement.
- Use “£249 London Home & Life Map” consistently, never “Executive London Setup” for this digital product.
- Do not promise a response within one business day unless an operational SLA is confirmed, staffed and monitored.
- “Property Hunt LIVE” is a proposed/developing programme until real broadcasts, authorised footage and measured reach can be substantiated.
- Avoid claiming a company-wide team of advisers, named partner endorsements, performance metrics, school or property availability, or actively vetted suppliers without evidence.
- Give solo movers, couples and families equally visible examples. Residential rentals are the core focus; temporary stays and buying may be considered where relevant.
- Preserve independence: payment for coverage must never imply favourable editorial recommendations.

## Remaining launch acceptance checks
- View deployed Vercel preview as a guest on desktop and mobile; verify fonts, media, routes, CTA targets and form states.
- Confirm /executive-intake creates a Supabase lead and emails a response with expected wording; test property-live in /partner-application.
- Confirm live domain and preview match expected branches; inspect and deindex obsolete URLs and unverified claims.
- Confirm payment checkout is truly ready via Stripe readiness, webhook and controlled purchase/refund.
- Review all remaining legacy pages, search snippets and automatic email templates.
- Run project type check, test suite and production build before merging.
