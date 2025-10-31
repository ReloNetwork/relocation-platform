// Checkout utility functions for Relo Network 2025 pricing

interface CheckoutOptions {
  plan: string;
  cadence?: 'monthly' | 'annual' | 'one_time';
  email?: string;
}

export async function redirectToCheckout(options: CheckoutOptions) {
  try {
    console.log('Starting checkout with options:', options);
    
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

    console.log('Checkout response status:', response.status);
    const data = await response.json();
    console.log('Checkout response data:', data);

    if (response.ok && (data.checkoutUrl || data.url)) {
      console.log('Redirecting to:', data.checkoutUrl || data.url);
      window.location.href = data.checkoutUrl || data.url;
    } else {
      console.error('Checkout error - Response not OK or no URL:', { 
        responseOk: response.ok, 
        hasUrl: !!(data.checkoutUrl || data.url),
        data 
      });
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
  // AI Solutions - Temporary direct checkout for testing
  aiExecutive: () => {
    console.log('AI Executive button clicked');
    // Temporary: redirect to a test page to verify button works
    window.location.href = '/ai-demo?plan=executive';
  },
  aiEnterprise: () => {
    console.log('AI Enterprise button clicked');
    window.location.href = '/ai-demo?plan=enterprise';
  },
  aiShowcase: () => {
    console.log('AI Showcase button clicked');
    window.location.href = '/ai-demo?plan=showcase';
  },
};

// Convenience function for form submissions
export function handleFormCheckout(plan: string, email?: string) {
  const emailParam = email ? { email } : {};
  return redirectToCheckout({ plan, ...emailParam });
}