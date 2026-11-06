import 'server-only';
import Stripe from 'stripe';
import { MOVE_MAP_NAME, MOVE_MAP_ORDER_TERMS, MOVE_MAP_PRICE_PENCE } from './london-move-map';

export function moveMapStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Stripe is not configured');
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
}

export async function moveMapReadiness(origin: string) {
  const missing = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'RESEND_API_KEY'].filter(key => !process.env[key]);
  if (missing.length) return { ready: false, mode: 'unavailable', reason: 'configuration', missing };
  const stripe = moveMapStripe();
  const [account, webhooks] = await Promise.all([
    stripe.accounts.retrieve(),
    stripe.webhookEndpoints.list({ limit: 100 }),
  ]);
  const webhookReady = webhooks.data.some(endpoint => {
    const url = new URL(endpoint.url);
    return url.origin === origin && url.pathname === '/api/webhooks/stripe' && endpoint.status === 'enabled' &&
      (endpoint.enabled_events.includes('*') || endpoint.enabled_events.includes('checkout.session.completed'));
  });
  const live = process.env.STRIPE_SECRET_KEY!.startsWith('sk_live_') || process.env.STRIPE_SECRET_KEY!.startsWith('rk_live_');
  return { ready: Boolean(account.charges_enabled && webhookReady), mode: live ? 'live' : 'test', reason: !account.charges_enabled ? 'account' : !webhookReady ? 'webhook' : 'ready', missing: [] };
}

export function isPaidMoveMap(session: Stripe.Checkout.Session) {
  return session.metadata?.type === 'london-move-map' && session.payment_status === 'paid' &&
    session.amount_total === MOVE_MAP_PRICE_PENCE && session.currency === 'gbp';
}

async function sendOrderEmail(id: string, recipient: string, subject: string, text: string, replyTo?: string) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': id },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL || 'The Relo Network <hello@therelonetwork.com>', to: [recipient], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Move map email delivery failed (${response.status})`);
}

export async function fulfilMoveMapOrder(session: Stripe.Checkout.Session, stripe: Stripe) {
  if (session.payment_status !== 'paid') return;
  if (!isPaidMoveMap(session)) throw new Error('Move map order amount or currency mismatch');
  if (!process.env.RESEND_API_KEY) throw new Error('Move map email delivery is unavailable');
  const intentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
  if (!intentId) throw new Error('Move map payment intent is missing');
  const intent = await stripe.paymentIntents.retrieve(intentId);
  const email = session.customer_details?.email || session.customer_email;
  if (!email) throw new Error('Move map customer email is missing');
  const brief = session.metadata || {};
  const briefText = Object.entries(brief).map(([key, value]) => `${key}: ${value}`).join('\n');
  if (intent.metadata.move_map_team_sent !== 'true') {
    await sendOrderEmail(`move-map-team/${session.id}`, process.env.EXECUTIVE_INTAKE_EMAIL || 'hello@therelonetwork.com', `Paid £249 consultation: ${brief.name || 'London move'}`, `Payment confirmed. Order ${session.id}\nCustomer email: ${email}\n\n${briefText}\n\nPrepare the written area comparison and short personal video within three working days of a complete brief. One follow-up question within seven days of delivery is included.\n\nOrder terms:\n${MOVE_MAP_ORDER_TERMS}`, email);
    await stripe.paymentIntents.update(intentId, { metadata: { move_map_team_sent: 'true' } });
  }
  if (intent.metadata.move_map_customer_sent !== 'true') {
    await sendOrderEmail(`move-map-customer/${session.id}`, email, `Your ${MOVE_MAP_NAME} order`, `Hello ${brief.name || 'there'},\n\nThank you. Your £249 payment is confirmed and we have your brief. We will email your written map and video within three working days of a complete brief. If we need more information, we will contact you first.\n\nYou can reply with one follow-up question within seven days of delivery.\n\nOrder reference: ${session.id}\n\nOrder terms:\n${MOVE_MAP_ORDER_TERMS}\n\nYou expressly requested that we start during the 14-day cancellation period and acknowledged the effect of completing the whole service.\n\nTo cancel, email hello@therelonetwork.com. You may use: I wish to cancel my London Home & Life Map order, ordered on [date]. My name is [name] and my order reference is [reference].\n\nThe Relo Network`);
    await stripe.paymentIntents.update(intentId, { metadata: { move_map_customer_sent: 'true' } });
  }
}
