import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { hasBasicAdminAccess } from '@/lib/api-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  // SECURITY: Require authentication for admin endpoint
  if (!hasBasicAdminAccess(req)) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
  }

  try {
    const { email, moveCase } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create Supabase service client
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find user by email
    const { data: existingUsers } = await supa.auth.admin.listUsers();
    const user = existingUsers.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's move cases
    const { data: moveCases, error: moveCaseError } = await supa
      .from('move_cases')
      .select('*')
      .eq('client_user_id', user.id)
      .order('created_at', { ascending: false });

    if (moveCaseError) {
      return NextResponse.json({ error: 'Error fetching move cases' }, { status: 500 });
    }

    if (!moveCases || moveCases.length === 0) {
      return NextResponse.json({ error: 'No move cases found for this user' }, { status: 404 });
    }

    // Use specified move case or default to most recent
    const targetMoveCase = moveCase 
      ? moveCases.find(mc => mc.id === moveCase) 
      : moveCases[0];

    if (!targetMoveCase) {
      return NextResponse.json({ error: 'Move case not found' }, { status: 404 });
    }

    // Generate personalized dashboard link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://therelonetwork.com';
    const dashboardLink = `${baseUrl}/dashboard?case=${targetMoveCase.id}`;
    
    // Generate magic link for easy login
    const { data: magicLinkData, error: magicLinkError } = await supa.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: dashboardLink
      }
    });

    if (magicLinkError) {
      console.warn('Could not generate magic link:', magicLinkError);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      moveCase: {
        id: targetMoveCase.id,
        status: targetMoveCase.status,
        route_from: targetMoveCase.route_from,
        route_to: targetMoveCase.route_to,
        created_at: targetMoveCase.created_at
      },
      links: {
        dashboard: dashboardLink,
        magicLink: magicLinkData?.properties?.action_link || null
      },
      moveCases: moveCases.map(mc => ({
        id: mc.id,
        status: mc.status,
        route_from: mc.route_from,
        route_to: mc.route_to,
        created_at: mc.created_at
      }))
    });

  } catch (error) {
    console.error('Error generating dashboard link:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // SECURITY: Require authentication for admin endpoint
  if (!hasBasicAdminAccess(req)) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
  }

  try {
    // Create Supabase service client
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Find user by email
    const { data: existingUsers } = await supa.auth.admin.listUsers();
    const user = existingUsers.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's move cases
    const { data: moveCases, error: moveCaseError } = await supa
      .from('move_cases')
      .select('*')
      .eq('client_user_id', user.id)
      .order('created_at', { ascending: false });

    if (moveCaseError) {
      return NextResponse.json({ error: 'Error fetching move cases' }, { status: 500 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      moveCases: moveCases?.map(mc => ({
        id: mc.id,
        status: mc.status,
        route_from: mc.route_from,
        route_to: mc.route_to,
        created_at: mc.created_at
      })) || []
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
