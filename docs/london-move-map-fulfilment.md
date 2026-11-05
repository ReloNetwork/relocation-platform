# London Home & Life Map

£249 total, one-time. Deliver a written comparison of up to three areas and short personal video within three working days after payment and a complete brief. One follow-up question, submitted within seven days of delivery, is included. This is an asynchronous consultation, not a live appointment.

## Fulfil each paid order
1. Verify the Stripe order is paid, £249 GBP. The signed webhook emails the full brief to EXECUTIVE_INTAKE_EMAIL (default hello@therelonetwork.com) and confirms the order to the buyer. The brief and accepted terms version remain in Stripe session metadata. Do not act on an unpaid or emailed claim of payment.
2. Read the household, first-stay preference, longer-term rent/buy goal, temporary stay length, budget, journeys, priorities and decision question. Ask for clarification if needed and confirm when the delivery period starts.
3. Recommend one starting area. Compare up to three areas by budget fit, home needs, daily journeys, routine, compromises and current source links. Add schools only when relevant. Include hotel/serviced/rental sequencing where useful. Distinguish fact from judgement; never promise a school place, home, rate or unverified travel time.
4. Give three next checks and practical actions. Record a short personal video explaining the decisive trade-off, rather than reading the document aloud. Email the map and private video link. Invite the included follow-up question and answer it in writing.
5. Discuss Executive London Setup only when the customer wants hands-on search or coordination. Property shortlists, bookings, viewings, purchase searches and admissions are separate services.

## Payment setup and launch checks
Use the existing Stripe secret key, webhook signing secret and Resend key in the hosting environment. An enabled Stripe webhook at the same origin's /api/webhooks/stripe must listen for checkout.session.completed. Checkout checks that registration and account charges_enabled before creating a session. /api/london-move-map/status reports readiness and test/live mode, never credentials.

Before advertising, verify a test-mode £249 checkout, authenticated paid confirmation, team and customer email receipt, webhook retry behaviour, and return after cancelled checkout. Then verify the production mode and checkout total. Do not describe an untested deployment as payment-ready.

## Cancellation
The order terms and explicit early-start request are displayed before payment and copied into the confirmation. Requests go to hello@therelonetwork.com. Do not treat delivery of the map alone as completion while the included follow-up service is still outstanding.

Sources: https://www.gov.uk/online-and-distance-selling-for-businesses and https://www.legislation.gov.uk/uksi/2013/3134/part/3
