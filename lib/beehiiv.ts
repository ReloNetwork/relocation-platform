import 'server-only';

export type BeehiivCustomFieldValue = string | number | boolean;

export interface BeehiivSubscriber {
  email: string;
  name?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referringSite?: string;
  automationIds?: string[];
  newsletterListIds?: string[];
  sendWelcomeEmail?: boolean;
  reactivateExisting?: boolean;
  customFields?: Record<string, BeehiivCustomFieldValue>;
}

export type BeehiivSubscriptionResult =
  | {
      success: true;
      subscriptionId?: string;
      status?: string;
    }
  | {
      success: false;
      code: 'not_configured' | 'request_failed' | 'network_error';
      error: string;
      status?: number;
    };

type BeehiivSubscriptionResponse = {
  data?: {
    id?: string;
    status?: string;
  };
};

type BeehiivClientOptions = {
  apiKey?: string;
  publicationId?: string;
  fetcher?: typeof fetch;
};

const BEEHIIV_API_BASE_URL = 'https://api.beehiiv.com/v2';

export class BeehiivAPI {
  private readonly configuredApiKey?: string;
  private readonly configuredPublicationId?: string;
  private readonly configuredFetcher?: typeof fetch;

  constructor(options: BeehiivClientOptions = {}) {
    this.configuredApiKey = options.apiKey;
    this.configuredPublicationId = options.publicationId;
    this.configuredFetcher = options.fetcher;
  }

  private get apiKey() {
    return this.configuredApiKey || process.env.BEEHIIV_API_KEY || '';
  }

  private get publicationId() {
    return (
      this.configuredPublicationId || process.env.BEEHIIV_PUBLICATION_ID || ''
    );
  }

  isConfigured() {
    return Boolean(this.apiKey && this.publicationId);
  }

  async subscribe(
    subscriber: BeehiivSubscriber
  ): Promise<BeehiivSubscriptionResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        code: 'not_configured',
        error: 'Beehiiv is not configured',
      };
    }

    const customFields = Object.entries({
      ...(subscriber.name ? { 'First Name': subscriber.name } : {}),
      ...subscriber.customFields,
    }).map(([name, value]) => ({ name, value }));

    const payload = {
      email: subscriber.email.trim().toLowerCase(),
      reactivate_existing: subscriber.reactivateExisting ?? false,
      send_welcome_email: subscriber.sendWelcomeEmail ?? true,
      double_opt_override: 'not_set',
      utm_source: subscriber.utmSource || subscriber.source,
      utm_medium: subscriber.utmMedium,
      utm_campaign: subscriber.utmCampaign,
      utm_term: subscriber.utmTerm,
      utm_content: subscriber.utmContent,
      referring_site: subscriber.referringSite,
      automation_ids: subscriber.automationIds,
      newsletter_list_ids: subscriber.newsletterListIds,
      custom_fields: customFields.length ? customFields : undefined,
    };

    try {
      const response = await (this.configuredFetcher || fetch)(
        `${BEEHIIV_API_BASE_URL}/publications/${encodeURIComponent(this.publicationId)}/subscriptions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10_000),
        }
      );

      if (!response.ok) {
        const responseBody = await response.text();
        console.error('Beehiiv subscription request failed', {
          status: response.status,
          response: responseBody.slice(0, 500),
        });
        return {
          success: false,
          code: 'request_failed',
          error: 'Beehiiv rejected the subscription request',
          status: response.status,
        };
      }

      const body = (await response.json()) as BeehiivSubscriptionResponse;
      return {
        success: true,
        subscriptionId: body.data?.id,
        status: body.data?.status,
      };
    } catch (error) {
      console.error('Beehiiv subscription request failed', error);
      return {
        success: false,
        code: 'network_error',
        error: 'Beehiiv could not be reached',
      };
    }
  }
}

export const beehiiv = new BeehiivAPI();
