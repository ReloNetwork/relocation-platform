import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { moveMapBriefSchema } from '@/lib/london-move-map';
import { fulfilMoveMapOrder, isPaidMoveMap, moveMapReadiness } from '@/lib/london-move-map-server';
import { getRouteDecision } from '@/lib/route-policy';

const mocks = vi.hoisted(() => ({ accounts: vi.fn(), endpoints: vi.fn(), create: vi.fn(), retrieve: vi.fn(), update: vi.fn() }));
vi.mock('stripe', () => ({ default: class {
  accounts = { retrieve: mocks.accounts };
  webhookEndpoints = { list: mocks.endpoints };
  checkout = { sessions: { create: mocks.create } };
  paymentIntents = { retrieve: mocks.retrieve, update: mocks.update };
} }));
import { POST } from '@/app/api/london-move-map/checkout/route';

const brief = { name: 'Example Buyer', email: 'buyer@example.com', currentLocation: 'New York', moveTiming: 'January', household: 'solo', firstStay: 'serviced', longerTermGoal: 'rent', workDestinations: 'Liverpool Street', housingBudget: '£5,000/month', homeNeeds: 'Two bedrooms', priorities: 'Short commute', topPriority: 'commute', decisionQuestion: 'Which area works best?', consent: true, startNow: true };
const session = { id: 'cs_test_order', payment_status: 'paid', amount_total: 24900, currency: 'gbp', payment_intent: 'pi_order', customer_email: brief.email, metadata: { ...brief, type: 'london-move-map' } };
const origin = 'https://www.therelonetwork.com';
function request(body: unknown, from = origin) {
  return new NextRequest(`${origin}/api/london-move-map/checkout`, { method: 'POST', headers: { 'content-type': 'application/json', origin: from, 'idempotency-key': '0123456789abcdef' }, body: JSON.stringify(body) });
}

beforeEach(() => {
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_example'); vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'whsec_example'); vi.stubEnv('RESEND_API_KEY', 're_example');
  mocks.accounts.mockResolvedValue({ charges_enabled: true });
  mocks.endpoints.mockResolvedValue({ data: [{ url: `${origin}/api/webhooks/stripe`, status: 'enabled', enabled_events: ['checkout.session.completed'] }] });
  mocks.create.mockResolvedValue({ url: 'https://checkout.stripe.com/test' });
  mocks.retrieve.mockResolvedValue({ metadata: {} }); mocks.update.mockResolvedValue({});
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

describe('paid London consultation', () => {
  it('accepts solo and partner briefs without school data and validates families', () => {
    expect(moveMapBriefSchema.safeParse(brief).success).toBe(true);
    expect(moveMapBriefSchema.safeParse({ ...brief, household: 'partner' }).success).toBe(true);
    expect(moveMapBriefSchema.safeParse({ ...brief, household: 'children' }).success).toBe(false);
    expect(moveMapBriefSchema.safeParse({ ...brief, household: 'children', childrenAges: '7', topPriority: 'schools' }).success).toBe(true);
    expect(moveMapBriefSchema.safeParse({ ...brief, topPriority: 'schools' }).success).toBe(false);
  });
  it('requires both order agreements', () => {
    expect(moveMapBriefSchema.safeParse({ ...brief, startNow: false }).success).toBe(false);
    expect(moveMapBriefSchema.safeParse({ ...brief, consent: false }).success).toBe(false);
  });
  it('charges the server price even when a buyer supplies a different price', async () => {
    const response = await POST(request({ ...brief, price: 1, successUrl: 'https://other.example' }));
    expect(response.status).toBe(200);
    const [params, options] = mocks.create.mock.calls[0];
    expect(params.line_items[0].price_data.unit_amount).toBe(24900);
    expect(params.line_items[0].price_data.currency).toBe('gbp');
    expect(params.success_url).toBe(`${origin}/london-move-map/thank-you?session_id={CHECKOUT_SESSION_ID}`);
    expect(options.idempotencyKey).toMatch(/^move-map\//);
  });
  it('keeps checkout closed without the required webhook or account configuration', async () => {
    mocks.endpoints.mockResolvedValue({ data: [] });
    expect((await POST(request(brief))).status).toBe(503);
    expect(mocks.create).not.toHaveBeenCalled();
    vi.stubEnv('RESEND_API_KEY', '');
    expect((await moveMapReadiness(origin)).ready).toBe(false);
  });
  it('rejects cross-origin requests and incomplete briefs before creating a session', async () => {
    expect((await POST(request(brief, 'https://other.example'))).status).toBe(403);
    expect((await POST(request({ ...brief, name: '' }))).status).toBe(400);
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it('never confirms an unpaid, unrelated, underpaid or wrong-currency order', () => {
    expect(isPaidMoveMap(session as any)).toBe(true);
    for (const change of [{ payment_status: 'unpaid' }, { amount_total: 1 }, { currency: 'usd' }, { metadata: { type: 'other' } }]) expect(isPaidMoveMap({ ...session, ...change } as any)).toBe(false);
  });
  it('retries failed email delivery and marks each successful recipient separately', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ ok: true }).mockResolvedValueOnce({ ok: false, status: 503 });
    vi.stubGlobal('fetch', fetcher);
    const stripe = { paymentIntents: { retrieve: mocks.retrieve, update: mocks.update } } as any;
    await expect(fulfilMoveMapOrder(session as any, stripe)).rejects.toThrow('delivery failed');
    expect(mocks.update).toHaveBeenCalledTimes(1);
    mocks.retrieve.mockResolvedValue({ metadata: { move_map_team_sent: 'true' } });
    fetcher.mockResolvedValue({ ok: true });
    await fulfilMoveMapOrder(session as any, stripe);
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher.mock.calls[1][1].headers['Idempotency-Key']).toBe(fetcher.mock.calls[2][1].headers['Idempotency-Key']);
    expect(mocks.update).toHaveBeenLastCalledWith('pi_order', { metadata: { move_map_customer_sent: 'true' } });
  });
  it('does not resend completed order notifications', async () => {
    vi.stubGlobal('fetch', vi.fn());
    mocks.retrieve.mockResolvedValue({ metadata: { move_map_team_sent: 'true', move_map_customer_sent: 'true' } });
    await fulfilMoveMapOrder(session as any, { paymentIntents: { retrieve: mocks.retrieve, update: mocks.update } } as any);
    expect(fetch).not.toHaveBeenCalled();
  });
  it('keeps the landing page reachable and the confirmation out of search', () => {
    const production = { isProduction: true, devToolsEnabled: false };
    expect(getRouteDecision('/london-move-map', production)).toEqual({ action: 'allow', indexable: true });
    expect(getRouteDecision('/london-move-map/thank-you', production)).toEqual({ action: 'allow', indexable: false });
  });
});
