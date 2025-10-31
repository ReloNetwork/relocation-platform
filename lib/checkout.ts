// Checkout utility functions for Relo Network 2025 pricing

interface CheckoutOptions {
  plan: string;
  cadence?: 'monthly' | 'annual' | 'one_time';
  email?: string;
}

export async function redirectToCheckout(options: CheckoutOptions) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: options.plan,
        cadence: options.cadence || 'one_time',
        email: options.email,
      }),
    });

    const data = await response.json();

    if (response.ok && (data.checkoutUrl || data.url)) {
      window.location.href = data.checkoutUrl || data.url;
    } else {
      console.error('Checkout error:', data);
      alert('Unable to start checkout. Please try again or contact support.');
    }
  } catch (error) {
    console.error('Checkout request failed:', error);
    alert('Unable to start checkout. Please try again or contact support.');
  }
}

// Plan-specific checkout functions for easy use
export const checkoutFunctions = {
  foundingPartner: () => redirectToCheckout({ plan: 'founding_partner' }),
  premiumSponsor: () => redirectToCheckout({ plan: 'premium_sponsor' }),
  executiveIntake: () => window.location.href = '/executive-intake', // Redirect to 72-Hour Audit flow
  setupAudit: () => window.location.href = '/executive-intake', // New 72-Hour Setup Audit
  plusMonthly: () => redirectToCheckout({ plan: 'plus', cadence: 'monthly' }),
  plusAnnual: () => redirectToCheckout({ plan: 'plus', cadence: 'annual' }),
  proMonthly: () => redirectToCheckout({ plan: 'pro', cadence: 'monthly' }),
  proAnnual: () => redirectToCheckout({ plan: 'pro', cadence: 'annual' }),
  dayPass: () => redirectToCheckout({ plan: 'day_pass' }),
  introPack3: () => redirectToCheckout({ plan: 'intro_pack_3' }),
  introPack10: () => redirectToCheckout({ plan: 'intro_pack_10' }),
  // AI Solutions
  aiExecutive: () => redirectToCheckout({ plan: 'ai_executive' }),
  aiEnterprise: () => redirectToCheckout({ plan: 'ai_enterprise' }),
  aiShowcase: () => redirectToCheckout({ plan: 'ai_showcase' }),
};

// Convenience function for form submissions
export function handleFormCheckout(plan: string, email?: string) {
  const emailParam = email ? { email } : {};
  return redirectToCheckout({ plan, ...emailParam });
}