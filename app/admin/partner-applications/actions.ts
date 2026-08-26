'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'

const pipelineUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'reviewing', 'discovery_booked', 'proposal_sent', 'negotiating', 'won', 'nurture', 'declined']),
  estimatedValue: z.union([z.coerce.number().int().min(0).max(1_000_000), z.literal('')]),
  nextActionAt: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/), z.literal('')]),
  notes: z.string().trim().max(4000),
})

export async function updatePartnerLead(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: membership } = await supabase
    .from('org_memberships')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle()
  if (!membership) throw new Error('Unauthorized')

  const parsed = pipelineUpdateSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
    estimatedValue: formData.get('estimatedValue'),
    nextActionAt: formData.get('nextActionAt'),
    notes: formData.get('notes'),
  })
  if (!parsed.success) throw new Error('Invalid pipeline update')

  const service = createServiceClient()
  const { error } = await service
    .from('partner_sales_leads')
    .update({
      status: parsed.data.status,
      estimated_value_gbp: parsed.data.estimatedValue === '' ? null : parsed.data.estimatedValue,
      next_action_at: parsed.data.nextActionAt
        ? new Date(parsed.data.nextActionAt).toISOString()
        : null,
      notes: parsed.data.notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', parsed.data.id)
  if (error) throw new Error('The partner lead could not be updated')
  revalidatePath('/admin/partner-applications')
}
