import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().regex(/supabase\.co$/, 'must be https://xxxxx.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_').optional(),
  NEXT_PUBLIC_CAL_COM_EMBED_ID: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().startsWith('re_').optional(),
});

export const Env = (() => {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Environment validation failed:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration. Check .env.local');
  }
  return parsed.data;
})();
