import { z } from 'zod';

export const MOVE_MAP_PRICE_PENCE = 24900;
export const MOVE_MAP_NAME = 'London Home & Life Map';
export const MOVE_MAP_TERMS_VERSION = '2026-11-05';
export const MOVE_MAP_ORDER_TERMS = '£249 total, one-time payment. Written comparison of up to three London areas, a short personal video walkthrough and one follow-up question submitted within seven days of delivery. Written map and video delivered by email within three working days of payment and a complete brief. If clarification is needed, the delivery period starts when that information is received. This is an asynchronous location consultation, with no live call, property search, bookings, school admissions service or guaranteed availability. To cancel, email hello@therelonetwork.com with your name and order reference. Where UK consumer cancellation rights apply, you can cancel within 14 days of purchase. If you expressly request an earlier start and cancel after work begins, a proportionate charge may apply for work supplied. The cancellation right ends only after the whole service has been performed with your prior request and acknowledgement. Statutory rights are unaffected.';

export const moveMapBriefSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  currentLocation: z.string().trim().min(2).max(100),
  moveTiming: z.string().trim().min(2).max(100),
  household: z.enum(['solo', 'partner', 'children']),
  firstStay: z.enum(['unsure', 'hotel', 'serviced', 'rental', 'owned']),
  longerTermGoal: z.enum(['unsure', 'rent', 'buy']),
  temporaryStayLength: z.string().trim().max(100).optional().default(''),
  childrenAges: z.string().trim().max(100).optional().default(''),
  schoolNeeds: z.string().trim().max(450).optional().default(''),
  workDestinations: z.string().trim().min(2).max(250),
  housingBudget: z.string().trim().min(2).max(150),
  homeNeeds: z.string().trim().min(5).max(450),
  priorities: z.string().trim().min(5).max(450),
  topPriority: z.enum(['commute', 'space', 'budget', 'schools', 'lifestyle']),
  decisionQuestion: z.string().trim().min(5).max(450),
  areasConsidered: z.string().trim().max(250).optional().default(''),
  consent: z.literal(true),
  startNow: z.literal(true),
}).superRefine((brief, ctx) => {
  if (brief.household === 'children' && !brief.childrenAges) {
    ctx.addIssue({ code: 'custom', path: ['childrenAges'], message: 'Please include the children’s ages.' });
  }
  if (brief.household !== 'children' && brief.topPriority === 'schools') {
    ctx.addIssue({ code: 'custom', path: ['topPriority'], message: 'Choose a relevant priority.' });
  }
});

export type MoveMapBrief = z.infer<typeof moveMapBriefSchema>;
