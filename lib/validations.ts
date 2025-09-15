import { z } from 'zod';

// Waitlist schema
export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  full_name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  current_location: z.string().optional(),
  target_location: z.string().optional(),
  move_timeframe: z.enum(['1-3 months', '3-6 months', '6-12 months', '12+ months']).optional(),
  source: z.string().default('website'),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

// Message schema
export const messageSchema = z.object({
  body: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
  case_id: z.string().uuid('Invalid case ID'),
  attachments: z.array(z.string()).optional(),
});

export type MessageInput = z.infer<typeof messageSchema>;

// Task schema
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  case_id: z.string().uuid('Invalid case ID'),
  assignee_role: z.enum(['client', 'concierge', 'supplier']),
  assignee_id: z.string().uuid().optional(),
  due_at: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
});

export type TaskInput = z.infer<typeof taskSchema>;

// Task update schema
export const taskUpdateSchema = z.object({
  id: z.string().uuid('Invalid task ID'),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: z.enum(['todo', 'doing', 'blocked', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  due_at: z.string().datetime().optional(),
  assignee_id: z.string().uuid().optional(),
});

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;

// Appointment schema
export const appointmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  case_id: z.string().uuid('Invalid case ID'),
  starts_at: z.string().datetime('Invalid start time'),
  ends_at: z.string().datetime('Invalid end time'),
  location: z.string().max(200, 'Location too long').optional(),
  attendees: z.array(z.string().email()).optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// File upload schema
export const uploadSchema = z.object({
  case_id: z.string().uuid('Invalid case ID'),
  category: z.enum(['general', 'visa', 'housing', 'legal', 'financial']).default('general'),
  file_name: z.string().min(1, 'File name required'),
  content_type: z.string().min(1, 'Content type required'),
  file_size: z.number().max(10 * 1024 * 1024, 'File too large (max 10MB)'),
});

export type UploadInput = z.infer<typeof uploadSchema>;

// Supplier listing schema
export const supplierListingSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  category: z.enum(['mover', 'housing', 'local_expert', 'visa', 'legal', 'financial', 'other']),
  description: z.string().max(500, 'Description too long').optional(),
  contact_email: z.string().email('Invalid email address'),
  contact_phone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
  coverage_areas: z.array(z.string()).min(1, 'At least one coverage area required'),
  insurance_million: z.number().min(0).optional(),
  memberships: z.array(z.string()).optional(),
});

export type SupplierListingInput = z.infer<typeof supplierListingSchema>;

// Supplier checkout schema
export const supplierCheckoutSchema = z.object({
  plan_id: z.string().uuid('Invalid plan ID'),
  billing_cycle: z.enum(['monthly', 'annual']),
  supplier_id: z.string().uuid('Invalid supplier ID'),
});

export type SupplierCheckoutInput = z.infer<typeof supplierCheckoutSchema>;