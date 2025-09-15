// Relo Network brand-consistent Stripe appearance configuration
export const reloNetworkAppearance = {
  theme: 'stripe' as const,
  variables: {
    // Brand colors
    colorPrimary: '#C9A24A', // Relo Network gold
    colorBackground: '#FAFAF9', // Light background
    colorText: '#0B1220', // Dark text
    colorDanger: '#DC2626', // Error red
    colorSuccess: '#16A34A', // Success green
    
    // Typography
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSizeBase: '16px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
    
    // Spacing and layout
    spacingUnit: '6px',
    borderRadius: '8px',
    
    // Input styling
    colorTextSecondary: '#6B7280',
    colorTextPlaceholder: '#9CA3AF',
    
    // Button styling
    buttonPrimaryColorBackground: '#C9A24A',
    buttonPrimaryColorText: '#FFFFFF',
    buttonPrimaryColorBorder: '#C9A24A',
    
    // Focus states
    focusBoxShadow: '0 0 0 2px rgba(201, 162, 74, 0.2)',
    focusOutline: 'none',
  },
  rules: {
    '.Tab': {
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      boxShadow: 'none',
    },
    '.Tab:hover': {
      backgroundColor: '#F9FAFB',
      borderColor: '#C9A24A',
    },
    '.Tab--selected': {
      backgroundColor: '#C9A24A',
      borderColor: '#C9A24A',
      color: '#FFFFFF',
    },
    '.Input': {
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '16px',
      padding: '12px 14px',
      backgroundColor: '#FFFFFF',
    },
    '.Input:focus': {
      borderColor: '#C9A24A',
      boxShadow: '0 0 0 2px rgba(201, 162, 74, 0.2)',
      outline: 'none',
    },
    '.Label': {
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px',
    },
    '.Block': {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      border: '1px solid #E5E7EB',
      padding: '16px',
      marginBottom: '12px',
    },
    '.AccordionItem': {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
    },
    '.Button--primary': {
      backgroundColor: '#C9A24A',
      borderColor: '#C9A24A',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      padding: '14px 24px',
      textTransform: 'none',
    },
    '.Button--primary:hover': {
      backgroundColor: '#B8923D',
      borderColor: '#B8923D',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(201, 162, 74, 0.3)',
    },
    '.Button--primary:focus': {
      backgroundColor: '#B8923D',
      borderColor: '#B8923D',
      boxShadow: '0 0 0 2px rgba(201, 162, 74, 0.2)',
    },
    '.Text--redirect': {
      color: '#6B7280',
      fontSize: '14px',
    },
    '.RedirectText': {
      color: '#C9A24A',
      fontWeight: '500',
    },
  }
}

// Custom branding configuration
export const reloBrandingConfig = {
  logo: 'https://relocation-platform.vercel.app/images/relo-logo-dark.png', // Add your logo URL
  icon: 'https://relocation-platform.vercel.app/favicon.ico', // Add your favicon
}

// Helper function to apply appearance to Stripe checkout sessions
export function applyReloAppearance(sessionOptions: any, customText?: string) {
  return {
    ...sessionOptions,
    ui_mode: 'hosted',
    custom_text: customText ? {
      submit: { message: customText }
    } : sessionOptions.custom_text,
    // Note: appearance customization requires Stripe Checkout Sessions API v2 or Stripe Elements
    // For hosted checkout, we rely on custom_text and branding set in Stripe Dashboard
  }
}