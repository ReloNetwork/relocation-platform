export const commercialEventNames = [
  'newsletter_submitted',
  'landing_list_submitted',
  'ask_relo_question_answered',
  'ask_relo_limit_reached',
  'ask_relo_summary_requested',
  'ask_relo_move_handoff_started',
  'move_review_opened',
  'relocation_intake_started',
  'relocation_intake_submitted',
  'partner_application_started',
  'partner_application_submitted',
  'partner_media_pack_viewed',
  'qualification_call_booked',
  'proposal_sent',
  'commercial_win_recorded',
] as const

export type CommercialEventName = (typeof commercialEventNames)[number]
