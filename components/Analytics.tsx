'use client'

import Script from 'next/script'

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            // Enhanced e-commerce and business tracking
            allow_google_signals: true,
            send_page_view: true,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
            // Custom dimensions for business tracking
            custom_map: {
              'custom_dimension_1': 'client_type',
              'custom_dimension_2': 'package_type', 
              'custom_dimension_3': 'conversion_source'
            }
          });

          // Enhanced conversion tracking for business goals
          window.trackBusinessEvent = function(action, category, label, value) {
            gtag('event', action, {
              event_category: category,
              event_label: label,
              value: value,
              currency: 'GBP'
            });
          };

          // Track key business metrics
          window.trackConversion = function(type, packageType, value) {
            gtag('event', 'conversion', {
              event_category: 'business',
              event_label: type,
              value: value,
              currency: 'GBP',
              custom_dimension_2: packageType
            });
          };

          // Track client dashboard access
          window.trackDashboardAccess = function(token, packageType) {
            gtag('event', 'dashboard_access', {
              event_category: 'client_engagement',
              event_label: 'premium_dashboard',
              custom_dimension_2: packageType,
              custom_dimension_3: 'payment_success'
            });
          };
        `}
      </Script>
    </>
  )
}