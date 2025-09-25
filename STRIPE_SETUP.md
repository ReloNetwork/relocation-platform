# Stripe Setup for Charter Partnership Checkout

## Environment Variables Required

Add these environment variables to your Vercel deployment:

1. **STRIPE_SECRET_KEY**: Your Stripe secret key (starts with `sk_live_` for production or `sk_test_` for testing)
2. **NEXT_PUBLIC_BASE_URL**: Your production domain (e.g., `https://your-domain.com`)

## Vercel Setup Steps

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following:
   - `STRIPE_SECRET_KEY`: `sk_live_your_actual_key_here`
   - `NEXT_PUBLIC_BASE_URL`: `https://your-production-domain.com`

## Fallback Behavior

If Stripe is not configured:
- Checkout buttons will redirect users to the partner application form
- Users will see a message explaining that checkout is temporarily unavailable
- The team can manually process partnerships through the application form

## Testing

1. Use `sk_test_` keys for testing
2. Use test card numbers from Stripe documentation
3. Verify checkout flow works end-to-end
4. Test fallback behavior by removing STRIPE_SECRET_KEY

## Charter Partnership Pricing

- **Founding Partner**: £25,000 (12 months)
- **Premium Sponsor**: £5,000 (90 days)

Both include the charter microcopy with benefits, timeline, and guarantee as defined in the checkout flow.