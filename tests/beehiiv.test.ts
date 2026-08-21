import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { BeehiivAPI } from '@/lib/beehiiv';
import { POST as subscribe } from '@/app/api/newsletter/subscribe/route';

function clearBeehiivEnvironment() {
  delete process.env.BEEHIIV_API_KEY;
  delete process.env.BEEHIIV_PUBLICATION_ID;
  delete process.env.BEEHIIV_LANDING_LIST_AUTOMATION_ID;
  delete process.env.BEEHIIV_RELOCATION_INDEX_AUTOMATION_ID;
}

beforeEach(clearBeehiivEnvironment);

afterEach(() => {
  clearBeehiivEnvironment();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Beehiiv API client', () => {
  it('fails closed when credentials are missing', async () => {
    const result = await new BeehiivAPI().subscribe({
      email: 'reader@example.com',
    });

    expect(result).toMatchObject({
      success: false,
      code: 'not_configured',
    });
  });

  it('sends the documented API v2 subscription payload', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ data: { id: 'sub_123', status: 'active' } }),
          { status: 201, headers: { 'content-type': 'application/json' } }
        )
      );
    const client = new BeehiivAPI({
      apiKey: 'test-key',
      publicationId: 'pub_123',
      fetcher,
    });

    const result = await client.subscribe({
      email: ' Reader@Example.com ',
      source: 'london-landing-list',
      utmSource: 'website',
      utmMedium: 'organic',
      utmCampaign: 'london-landing-list',
      automationIds: ['aut_123'],
      sendWelcomeEmail: false,
      reactivateExisting: true,
    });

    expect(result).toEqual({
      success: true,
      subscriptionId: 'sub_123',
      status: 'active',
    });
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, init] = fetcher.mock.calls[0];
    expect(url).toBe(
      'https://api.beehiiv.com/v2/publications/pub_123/subscriptions'
    );
    expect(JSON.parse(init.body)).toMatchObject({
      email: 'reader@example.com',
      reactivate_existing: true,
      send_welcome_email: false,
      double_opt_override: 'not_set',
      utm_source: 'website',
      utm_medium: 'organic',
      utm_campaign: 'london-landing-list',
      automation_ids: ['aut_123'],
    });
  });

  it('does not convert an upstream rejection into success', async () => {
    const client = new BeehiivAPI({
      apiKey: 'test-key',
      publicationId: 'pub_123',
      fetcher: vi
        .fn()
        .mockResolvedValue(new Response('Unauthorized', { status: 401 })),
    });

    await expect(
      client.subscribe({ email: 'reader@example.com' })
    ).resolves.toMatchObject({
      success: false,
      code: 'request_failed',
      status: 401,
    });
  });
});

describe('newsletter signup route', () => {
  it('validates email before calling Beehiiv', async () => {
    const response = await subscribe(
      new NextRequest('https://example.test/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email' }),
      })
    );

    expect(response.status).toBe(400);
  });

  it('returns service unavailable instead of simulated success', async () => {
    const response = await subscribe(
      new NextRequest('https://example.test/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'reader@example.com' }),
      })
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });

  it('treats Beehiiv as authoritative when the optional CRM mirror is unavailable', async () => {
    process.env.BEEHIIV_API_KEY = 'test-key';
    process.env.BEEHIIV_PUBLICATION_ID = 'pub_123';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ data: { id: 'sub_123', status: 'active' } }),
          {
            status: 201,
            headers: { 'content-type': 'application/json' },
          }
        )
      )
    );

    const response = await subscribe(
      new NextRequest('https://example.test/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'reader@example.com' }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
  });

  it('requires the Landing List automation before promising delivery', async () => {
    process.env.BEEHIIV_API_KEY = 'test-key';
    process.env.BEEHIIV_PUBLICATION_ID = 'pub_123';

    const response = await subscribe(
      new NextRequest('https://example.test/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: 'reader@example.com',
          campaign: 'london-landing-list',
        }),
      })
    );

    expect(response.status).toBe(503);
  });
});
