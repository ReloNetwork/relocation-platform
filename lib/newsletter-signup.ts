import 'server-only';

import { z } from 'zod';
import { beehiiv } from '@/lib/beehiiv';
import { storeNewsletterSubscription } from '@/lib/newsletter-storage';

export const newsletterCampaignSchema = z.enum([
  'london-brief',
  'london-landing-list',
  'relocation-index',
]);

export const newsletterSignupSchema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(100).optional(),
  source: z.string().trim().max(100).optional(),
  campaign: newsletterCampaignSchema.optional(),
  utmSource: z.string().trim().max(100).optional(),
  utmMedium: z.string().trim().max(100).optional(),
  utmCampaign: z.string().trim().max(100).optional(),
  utmTerm: z.string().trim().max(100).optional(),
  utmContent: z.string().trim().max(100).optional(),
  referringSite: z.string().url().max(2048).optional(),
});

export type NewsletterSignup = z.infer<typeof newsletterSignupSchema>;

export type NewsletterSignupResult =
  | { success: true; message: string; mirroredToCrm: boolean }
  | {
      success: false;
      code: 'not_configured' | 'request_failed' | 'network_error';
      message: string;
      status: number;
    };

function campaignAutomationIds(campaign: NewsletterSignup['campaign']) {
  if (campaign === 'london-landing-list') {
    const automationId = process.env.BEEHIIV_LANDING_LIST_AUTOMATION_ID;
    return automationId ? [automationId] : null;
  }

  if (campaign === 'relocation-index') {
    const automationId = process.env.BEEHIIV_RELOCATION_INDEX_AUTOMATION_ID;
    return automationId ? [automationId] : null;
  }

  return [];
}

export async function processNewsletterSignup(
  rawSignup: NewsletterSignup
): Promise<NewsletterSignupResult> {
  const signup = newsletterSignupSchema.parse(rawSignup);
  const campaign = signup.campaign || 'london-brief';
  const automationIds = campaignAutomationIds(campaign);

  if (automationIds === null) {
    return {
      success: false,
      code: 'not_configured',
      message: 'This email delivery is not configured',
      status: 503,
    };
  }

  const result = await beehiiv.subscribe({
    email: signup.email,
    name: signup.name,
    source: signup.source || 'relo-network-website',
    utmSource: signup.utmSource || signup.source || 'website',
    utmMedium: signup.utmMedium || 'organic',
    utmCampaign: signup.utmCampaign || campaign,
    utmTerm: signup.utmTerm,
    utmContent: signup.utmContent,
    referringSite: signup.referringSite,
    automationIds,
    sendWelcomeEmail: automationIds.length === 0,
    reactivateExisting: true,
  });

  if (!result.success) {
    return {
      success: false,
      code: result.code,
      message: 'Newsletter signup is temporarily unavailable',
      status: result.code === 'not_configured' ? 503 : 502,
    };
  }

  const mirror = await storeNewsletterSubscription({
    email: signup.email.trim().toLowerCase(),
    name: signup.name,
    source: signup.source || 'relo-network-website',
    utm_source: signup.utmSource || signup.source || 'website',
    utm_medium: signup.utmMedium || 'organic',
    utm_campaign: signup.utmCampaign || campaign,
    subscription_date: new Date().toISOString(),
    source_page: signup.source,
  });

  if (!mirror.success) {
    console.warn('Beehiiv subscription succeeded but CRM mirror failed', {
      message: mirror.message,
    });
  }

  return {
    success: true,
    message:
      campaign === 'london-landing-list'
        ? 'Your London Landing List is on its way.'
        : 'You are subscribed to The London Brief.',
    mirroredToCrm: mirror.success,
  };
}
