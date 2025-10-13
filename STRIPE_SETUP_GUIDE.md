# Stripe Payment Setup Guide - Relo Network Partners

## Overview
Your payment system is currently in test mode with fallback pricing. To accept real payments tomorrow, follow these steps:

## 1. Stripe Account Setup
1. Go to https://dashboard.stripe.com
2. Complete business verification (required for live payments)
3. Add bank account details for payouts
4. Verify business documents if prompted

## 2. Create Products in Stripe Dashboard

### Founding Partner Charter - £25,000
1. Go to Products → Create Product
2. Name: "Founding Partner Charter"
3. Description: "12 months category exclusivity"
4. Create Price:
   - Amount: £25,000.00
   - Currency: GBP
   - Billing: One-time payment
   - **IMPORTANT**: Set lookup key to `founding_partner`

### Premium Sponsor - £5,000
1. Go to Products → Create Product  
2. Name: "Premium Sponsor"
3. Description: "90 days featured placement"
4. Create Price:
   - Amount: £5,000.00
   - Currency: GBP
   - Billing: One-time payment
   - **IMPORTANT**: Set lookup key to `premium_sponsor`

## 3. Get Live API Keys
1. In Stripe Dashboard, go to Developers → API Keys
2. Toggle to "Live" mode (top right)
3. Copy the "Secret key" (starts with `sk_live_`)

## 4. Update Environment Variables
Replace in `.env.local`:
```bash
# Replace this placeholder key:
STRIPE_SECRET_KEY=sk_test_51PlaceholderKeyForDevelopmentMode123456789ABCDEF

# With your live key:
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_LIVE_KEY_HERE
```

## 5. Test Payment Flow
1. Restart development server: `npm run dev`
2. Visit Partners page
3. Click "Select Partnership"
4. Verify checkout opens with correct pricing
5. Complete test purchase with real card details

## 6. Go Live Checklist
- [ ] Business verification complete
- [ ] Bank account added
- [ ] Products created with correct lookup keys
- [ ] Live API key updated in environment
- [ ] Test purchase completed successfully
- [ ] "TEST MODE" banner should disappear

## Troubleshooting
- If products not found: Check lookup keys match exactly (`founding_partner`, `premium_sponsor`)
- If still showing test mode: Verify live API key starts with `sk_live_`
- If checkout fails: Check Stripe logs in dashboard for detailed errors

## Support
- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Documentation: https://stripe.com/docs
- Contact: hello@therelonetwork.com for technical issues