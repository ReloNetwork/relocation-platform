# Stripe Products Quick Reference

## Product 1: Founding Partner Charter
```
Name: Founding Partner Charter
Description: 12 months category exclusivity
Price: £25,000.00
Currency: GBP
Type: One-time payment
Lookup Key: founding_partner
```

## Product 2: Premium Sponsor
```
Name: Premium Sponsor  
Description: 90 days featured placement
Price: £5,000.00
Currency: GBP
Type: One-time payment
Lookup Key: premium_sponsor
```

## Critical Note
The `lookup_key` values MUST match exactly:
- `founding_partner` (no spaces, lowercase)
- `premium_sponsor` (no spaces, lowercase)

These keys are used in `/app/api/checkout/route.ts:44-47` to find the correct pricing.