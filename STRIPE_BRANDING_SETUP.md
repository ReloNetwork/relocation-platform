# Stripe Checkout Branding Setup

To make Stripe checkout pages fully brand-consistent with Relo Network, you need to configure the branding in your Stripe Dashboard.

## Stripe Dashboard Configuration

### 1. Access Branding Settings
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings > Branding**

### 2. Upload Brand Assets
- **Logo**: Upload the Relo Network logo (recommended: 512x512px PNG with transparent background)
- **Icon**: Upload the Relo Network favicon (recommended: 32x32px ICO or PNG)
- **Primary Color**: Set to `#C9A24A` (Relo Network gold)
- **Background Color**: Set to `#FAFAF9` (Light background)

### 3. Typography Settings
- **Font**: Select a clean, professional font (recommend keeping default or "Inter" if available)

### 4. Additional Customization
- **Accent Color**: `#B8923D` (Darker gold for hover states)
- **Error Color**: `#DC2626` (Error red)
- **Success Color**: `#16A34A` (Success green)

## Code Implementation

The following checkout routes now include:

### ✅ Custom Text Messages
- **Lead Machine**: "Join the Lead Machine Partnership and start receiving qualified leads within 24-48 hours."
- **Market Dominator**: "Secure your Market Dominator status and eliminate competition in your category."
- **Directory Premium**: "Access our premium directory of verified service providers."
- **Directory VIP**: "Unlock VIP access with your personal account manager and priority support."
- **Executive Packages**: "Secure your [Package Name] relocation package - our team will begin coordination immediately."

### ✅ Enhanced Product Descriptions
All checkout sessions now include comprehensive bullet-point benefit lists that appear on the left side of the checkout.

### ✅ Consistent UI Mode
- All sessions use `ui_mode: 'hosted'` for optimal appearance control
- Billing address collection enabled for professional appearance
- Custom expiration times where appropriate

## Result

Once Stripe Dashboard branding is configured, all checkout pages will display:
- Relo Network logo and colors
- Consistent typography matching your brand
- Professional custom messaging
- Detailed product benefit descriptions
- Cohesive visual experience across all pricing tiers

## Test the Experience

After configuring Stripe Dashboard branding, test each checkout route:
1. `/api/partners/lead-machine-checkout` 
2. `/api/partners/market-dominator-checkout`
3. `/api/directory/checkout`
4. `/api/payments/create-checkout-session`

All should now reflect consistent Relo Network branding.