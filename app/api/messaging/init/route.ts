/*
-- Messaging Tables Schema
CREATE TABLE IF NOT EXISTS threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID NOT NULL,
  case_id UUID REFERENCES move_cases(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_threads_org_id ON threads(org_id);
CREATE INDEX IF NOT EXISTS idx_threads_case_id ON threads(case_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_author_id ON messages(author_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- RLS Policies
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Threads: Only org members can read/write their org's threads
CREATE POLICY "Org members can view threads" ON threads
  FOR SELECT USING (
    org_id IN (
      SELECT org_id FROM org_memberships 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Org members can create threads" ON threads
  FOR INSERT WITH CHECK (
    org_id IN (
      SELECT org_id FROM org_memberships 
      WHERE user_id = auth.uid()
    )
  );

-- Messages: Only org members can read/write messages in their org's threads
CREATE POLICY "Org members can view messages" ON messages
  FOR SELECT USING (
    thread_id IN (
      SELECT t.id FROM threads t
      JOIN org_memberships om ON t.org_id = om.org_id
      WHERE om.user_id = auth.uid()
    )
  );

CREATE POLICY "Org members can create messages" ON messages
  FOR INSERT WITH CHECK (
    thread_id IN (
      SELECT t.id FROM threads t
      JOIN org_memberships om ON t.org_id = om.org_id
      WHERE om.user_id = auth.uid()
    )
  );

CREATE POLICY "Org members can update message read status" ON messages
  FOR UPDATE USING (
    thread_id IN (
      SELECT t.id FROM threads t
      JOIN org_memberships om ON t.org_id = om.org_id
      WHERE om.user_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_threads_updated_at
  BEFORE UPDATE ON threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
*/

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth'
import { requireUserWithOrg } from '@/lib/org'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser()
    const { userId, orgId } = await requireUserWithOrg(user.id)
    
    const { caseId } = await request.json()

    if (!caseId) {
      return NextResponse.json({ error: 'Case ID is required' }, { status: 400 })
    }

    const supabase = createClient()

    // Verify the case belongs to the user's org
    const { data: moveCase } = await supabase
      .from('move_cases')
      .select('id, org_id')
      .eq('id', caseId)
      .single()

    if (!moveCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    // Check if user has access to this org's cases
    const { data: membership } = await supabase
      .from('org_memberships')
      .select('org_id')
      .eq('user_id', userId)
      .eq('org_id', moveCase.org_id)
      .single()

    if (!membership) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Check if thread already exists for this case
    const { data: existingThread } = await supabase
      .from('threads')
      .select('id')
      .eq('case_id', caseId)
      .eq('org_id', moveCase.org_id)
      .single()

    if (existingThread) {
      return NextResponse.json({ threadId: existingThread.id })
    }

    // Create new thread
    const { data: newThread, error: threadError } = await supabase
      .from('threads')
      .insert({
        org_id: moveCase.org_id,
        case_id: caseId
      })
      .select('id')
      .single()

    if (threadError) {
      console.error('Error creating thread:', threadError)
      return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 })
    }

    return NextResponse.json({ threadId: newThread.id })

  } catch (error) {
    console.error('Error in messaging init:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}