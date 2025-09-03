import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // Create partner plans first
    const { data: plans, error: plansError } = await supabase
      .from('partner_plans')
      .upsert([
        {
          name: 'Starter',
          description: 'Essential visibility for new partners',
          price_monthly_gbp: 39500, // £395.00 in pence
          price_annual_gbp: 395000, // £3,950.00 in pence (10x monthly)
          features_json: [
            'Basic directory listing',
            'Contact form leads',
            'Basic analytics',
            'Email support'
          ],
          stripe_price_monthly_id: 'price_starter_monthly',
          stripe_price_annual_id: 'price_starter_annual',
        },
        {
          name: 'Featured',
          description: 'Enhanced visibility and priority placement',
          price_monthly_gbp: 79500, // £795.00 in pence
          price_annual_gbp: 795000, // £7,950.00 in pence
          features_json: [
            'Featured directory placement',
            'Priority in search results',
            'Advanced analytics',
            'Direct client introductions',
            'Priority support'
          ],
          stripe_price_monthly_id: 'price_featured_monthly',
          stripe_price_annual_id: 'price_featured_annual',
        },
        {
          name: 'Sponsored',
          description: 'Maximum visibility and exclusive opportunities',
          price_monthly_gbp: 149500, // £1,495.00 in pence
          price_annual_gbp: 1495000, // £14,950.00 in pence
          features_json: [
            'Premium sponsored placement',
            'Exclusive client matching',
            'Custom landing pages',
            'Detailed performance analytics',
            'Dedicated account manager',
            'Priority booking slots'
          ],
          stripe_price_monthly_id: 'price_sponsored_monthly',
          stripe_price_annual_id: 'price_sponsored_annual',
        },
      ], { onConflict: 'name' });

    if (plansError) throw plansError;
    console.log('✅ Partner plans seeded');

    // Create demo users
    const demoUsers = [
      {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'admin@therelonetwork.com',
        role: 'admin',
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'concierge@therelonetwork.com',
        role: 'concierge',
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'client@demo.com',
        role: 'client',
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        email: 'supplier@demo.com',
        role: 'supplier',
      },
    ];

    const { error: usersError } = await supabase
      .from('users')
      .upsert(demoUsers, { onConflict: 'id' });

    if (usersError) throw usersError;
    console.log('✅ Demo users seeded');

    // Create client profile
    const { error: clientError } = await supabase
      .from('client_profiles')
      .upsert({
        user_id: '00000000-0000-0000-0000-000000000003',
        full_name: 'Sarah Johnson',
        phone: '+1 555 123 4567',
        timezone: 'America/New_York',
        household_json: {
          size: 2,
          pets: ['1 cat'],
          special_requirements: ['Ground floor preferred']
        },
        preferences_json: {
          budget: '£3000-5000/month',
          areas: ['Marylebone', 'Fitzrovia', 'King\'s Cross'],
          property_type: 'Apartment'
        }
      }, { onConflict: 'user_id' });

    if (clientError) throw clientError;
    console.log('✅ Client profile seeded');

    // Create demo move case
    const moveDate = new Date();
    moveDate.setDate(moveDate.getDate() + 30);

    const slaDate = new Date();
    slaDate.setDate(slaDate.getDate() + 2);

    const { data: moveCase, error: caseError } = await supabase
      .from('move_cases')
      .upsert({
        id: '00000000-0000-0000-0000-000000000100',
        client_id: '00000000-0000-0000-0000-000000000003',
        concierge_id: '00000000-0000-0000-0000-000000000002',
        route_from: 'New York, USA',
        route_to: 'London, UK',
        move_date: moveDate.toISOString().split('T')[0],
        status: 'scoping',
        sla_next_action_at: slaDate.toISOString(),
        budget_range: '£10,000-15,000',
        notes: 'Executive relocation, requires premium services'
      }, { onConflict: 'id' });

    if (caseError) throw caseError;
    console.log('✅ Demo move case seeded');

    // Create demo tasks
    const demoTasks = [
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        title: 'Complete intake questionnaire',
        description: 'Provide detailed information about relocation requirements',
        assignee_role: 'client',
        assignee_id: '00000000-0000-0000-0000-000000000003',
        status: 'done',
        priority: 'high',
        due_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        title: 'Research visa requirements',
        description: 'Determine visa type and documentation needed for UK relocation',
        assignee_role: 'concierge',
        assignee_id: '00000000-0000-0000-0000-000000000002',
        status: 'doing',
        priority: 'high',
        due_at: slaDate.toISOString(),
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        title: 'Property viewing appointments',
        description: 'Schedule virtual tours of shortlisted properties',
        assignee_role: 'concierge',
        assignee_id: '00000000-0000-0000-0000-000000000002',
        status: 'todo',
        priority: 'medium',
        due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        title: 'Moving company quotes',
        description: 'Get quotes from 3 vetted international moving companies',
        assignee_role: 'concierge',
        assignee_id: '00000000-0000-0000-0000-000000000002',
        status: 'todo',
        priority: 'medium',
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        title: 'Bank account setup',
        description: 'Research UK banks and setup process for US citizens',
        assignee_role: 'concierge',
        assignee_id: '00000000-0000-0000-0000-000000000002',
        status: 'todo',
        priority: 'low',
      },
    ];

    const { error: tasksError } = await supabase
      .from('tasks')
      .upsert(demoTasks);

    if (tasksError) throw tasksError;
    console.log('✅ Demo tasks seeded');

    // Create demo suppliers
    const demoSuppliers = [
      // Movers
      {
        name: 'Cadogan Tate',
        category: 'mover',
        description: 'International fine art and luxury goods moving specialists',
        rating: 4.8,
        contact_json: {
          phone: '+44 20 7384 2000',
          email: 'info@cadogantate.com',
          website: 'https://cadogantate.com'
        },
        coverage_areas: ['London', 'New York', 'Paris', 'Geneva'],
        insurance_million: 10.0,
        memberships: ['FIDI', 'BAR', 'IAM'],
        website: 'https://cadogantate.com',
        is_visible: true,
        status: 'sponsored'
      },
      {
        name: 'Ward Thomas Removals',
        category: 'mover',
        description: 'Master Removers Group member specializing in international relocations',
        rating: 4.7,
        contact_json: {
          phone: '+44 1483 302 763',
          email: 'info@wardthomas.co.uk'
        },
        coverage_areas: ['London', 'Surrey', 'International'],
        insurance_million: 5.0,
        memberships: ['Master Removers Group', 'BAR'],
        website: 'https://wardthomas.co.uk',
        is_visible: true,
        status: 'approved'
      },
      // Housing
      {
        name: 'Cheval Collection',
        category: 'housing',
        description: 'Luxury serviced apartments in prime London locations',
        rating: 4.9,
        contact_json: {
          phone: '+44 20 7930 0441',
          email: 'reservations@chevalcollection.com'
        },
        coverage_areas: ['Mayfair', 'Knightsbridge', 'South Kensington', 'Chelsea'],
        website: 'https://chevalcollection.com',
        is_visible: true,
        status: 'sponsored'
      },
      {
        name: 'Blueground',
        category: 'housing',
        description: 'Move-in ready furnished apartments for flexible living',
        rating: 4.6,
        contact_json: {
          phone: '+44 20 3744 0790',
          email: 'hello@theblueground.com'
        },
        coverage_areas: ['Central London', 'Canary Wharf', 'King\'s Cross'],
        website: 'https://theblueground.com',
        is_visible: true,
        status: 'approved'
      },
      // Local experts
      {
        name: 'Black Brick Property Solutions',
        category: 'local_expert',
        description: 'Prime Central London property search and acquisition specialists',
        rating: 4.9,
        contact_json: {
          phone: '+44 20 3535 1071',
          email: 'hello@black-brick.com'
        },
        coverage_areas: ['Prime Central London', 'Marylebone', 'Mayfair', 'Belgravia'],
        website: 'https://black-brick.com',
        is_visible: true,
        status: 'featured'
      },
      {
        name: 'INHOUS Relocation',
        category: 'local_expert',
        description: 'Comprehensive relocation services and London area expertise',
        rating: 4.7,
        contact_json: {
          phone: '+44 20 7993 4662',
          email: 'info@inhous.co.uk'
        },
        coverage_areas: ['Greater London', 'Home Counties'],
        website: 'https://inhous.co.uk',
        is_visible: true,
        status: 'approved'
      },
    ];

    const { error: suppliersError } = await supabase
      .from('suppliers')
      .upsert(demoSuppliers, { onConflict: 'name' });

    if (suppliersError) throw suppliersError;
    console.log('✅ Demo suppliers seeded');

    // Create demo messages
    const demoMessages = [
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        sender_id: '00000000-0000-0000-0000-000000000002',
        body: 'Welcome to Relo Network! I\'m Emma, your dedicated concierge. I\'ve reviewed your intake form and I\'m excited to help you with your move to London.',
        message_type: 'message',
        created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        sender_id: '00000000-0000-0000-0000-000000000003',
        body: 'Thank you Emma! I\'m really looking forward to working with you. When do you think we can start looking at properties in the Marylebone area?',
        message_type: 'message',
        created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      },
      {
        case_id: '00000000-0000-0000-0000-000000000100',
        sender_id: '00000000-0000-0000-0000-000000000002',
        body: 'Great question! I\'ve already reached out to our contacts at Black Brick who specialize in that area. I should have some initial options for you by end of week. I\'ve also created tasks to track our progress - you can see them in your account dashboard.',
        message_type: 'message',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const { error: messagesError } = await supabase
      .from('messages')
      .upsert(demoMessages);

    if (messagesError) throw messagesError;
    console.log('✅ Demo messages seeded');

    // Create demo knowledge entries
    const knowledgeEntries = [
      {
        title: 'UK Visa Requirements for US Citizens',
        content: 'US citizens moving to the UK need to understand the various visa options available. The most common routes include Skilled Worker visas, Global Talent visas, and Investor visas. Each has specific requirements and timelines...',
        category: 'visa',
        tags: ['visa', 'US citizens', 'UK immigration', 'skilled worker'],
        is_published: true,
        author_id: '00000000-0000-0000-0000-000000000002',
      },
      {
        title: 'Best Neighborhoods for Professionals in London',
        content: 'London offers diverse neighborhoods for professionals. Marylebone provides a village feel with excellent transport links. Fitzrovia combines Georgian architecture with modern amenities. King\'s Cross offers cutting-edge development with tech company headquarters...',
        category: 'housing',
        tags: ['neighborhoods', 'professionals', 'housing', 'London areas'],
        is_published: true,
        author_id: '00000000-0000-0000-0000-000000000002',
      },
      {
        title: 'Setting Up UK Bank Account as Foreign National',
        content: 'Opening a UK bank account as a foreign national requires specific documentation. You\'ll typically need proof of address, employment letter, and valid visa. Major banks like HSBC, Barclays, and Lloyds offer expat services...',
        category: 'financial',
        tags: ['banking', 'financial services', 'expat', 'UK banks'],
        is_published: true,
        author_id: '00000000-0000-0000-0000-000000000002',
      },
    ];

    const { error: knowledgeError } = await supabase
      .from('knowledge_entries')
      .upsert(knowledgeEntries, { onConflict: 'title' });

    if (knowledgeError) throw knowledgeError;
    console.log('✅ Knowledge entries seeded');

    // Create demo waitlist entries
    const waitlistEntries = [
      {
        email: 'jane.doe@example.com',
        full_name: 'Jane Doe',
        current_location: 'San Francisco, USA',
        target_location: 'London, UK',
        move_timeframe: '3-6 months',
        source: 'website',
      },
      {
        email: 'mark.wilson@example.com',
        full_name: 'Mark Wilson',
        current_location: 'Toronto, Canada',
        target_location: 'London, UK',
        move_timeframe: '6-12 months',
        source: 'referral',
      },
    ];

    const { error: waitlistError } = await supabase
      .from('waitlist')
      .upsert(waitlistEntries, { onConflict: 'email' });

    if (waitlistError) throw waitlistError;
    console.log('✅ Waitlist entries seeded');

    console.log('🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };