import { NextRequest, NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv';

export const runtime = 'nodejs';

// List of ideal partners to add to newsletter for launch
const FOUNDING_PARTNERS = [
  // Luxury Accommodation
  { email: 'michael.bonsor@rosewoodhotels.com', name: 'Michael Bonsor', company: 'The Chancery Rosewood', category: 'Luxury Accommodation' },
  { email: 'bookings@hybridresi.com', name: 'Hybrid Resi Team', company: 'Hybrid Resi', category: 'Serviced Apartments' },
  { email: 'hello@phoenixluxurystays.co.uk', name: 'Phoenix Luxury Team', company: 'Phoenix Luxury Stays', category: 'Luxury Apartments' },
  
  // Legal Services
  { email: 'london@fragomen.com', name: 'Fragomen London', company: 'Fragomen', category: 'Immigration Law' },
  { email: 'immigration@kingsleynapley.co.uk', name: 'Kingsley Napley', company: 'Kingsley Napley', category: 'Immigration Law' },
  { email: 'enquiries@lauradevine.com', name: 'Laura Devine Team', company: 'Laura Devine Immigration', category: 'Immigration Law' },
  
  // Private Banking
  { email: 'international@coutts.com', name: 'Coutts International', company: 'Coutts', category: 'Private Banking' },
  { email: 'enquiries@nedbankprivatewealth.com', name: 'Nedbank Private Wealth', company: 'Nedbank', category: 'Private Banking' },
  { email: 'privatebanking@arbuthnotlatham.co.uk', name: 'Arbuthnot Latham', company: 'Arbuthnot Latham', category: 'Private Banking' },
  
  // Education
  { email: 'admissions@asl.org', name: 'ASL Admissions', company: 'American School in London', category: 'Education' },
  { email: 'admissions@southbank.org', name: 'Southbank Admissions', company: 'Southbank International School', category: 'Education' },
  { email: 'info@dslondon.org.uk', name: 'Deutsche Schule', company: 'Deutsche Schule London', category: 'Education' },
  
  // Healthcare
  { email: 'enquiries@thelondongeneralpractice.com', name: 'London General Practice', company: 'The London General Practice', category: 'Healthcare' },
  { email: 'uk.sales@axaglobalhealthcare.com', name: 'AXA Global Healthcare', company: 'AXA Global Healthcare', category: 'Healthcare' },
  
  // Transport
  { email: 'bookings@llccars.co.uk', name: 'London Luxury Chauffeuring', company: 'London Luxury Chauffeuring', category: 'Transport' },
  { email: 'bookings@ounoapp.com', name: 'OUNO Executive', company: 'OUNO', category: 'Transport' }
];

export async function POST(req: NextRequest) {
  try {
    const { type = 'all' } = await req.json();
    
    const results = [];
    const errors = [];
    
    let partnersToAdd = FOUNDING_PARTNERS;
    
    // Filter by category if specified
    if (type !== 'all') {
      partnersToAdd = FOUNDING_PARTNERS.filter(p => 
        p.category.toLowerCase().includes(type.toLowerCase())
      );
    }
    
    console.log(`Adding ${partnersToAdd.length} partners to newsletter...`);
    
    for (const partner of partnersToAdd) {
      try {
        const result = await beehiiv.subscribe({
          email: partner.email,
          name: partner.name,
          source: 'founding-partner-outreach',
          utmSource: 'launch',
          utmMedium: 'partnership',
          utmCampaign: 'founding-partners-2025',
          customFields: {
            company: partner.company,
            category: partner.category,
            partnerType: 'founding-partner',
            addedDate: new Date().toISOString()
          }
        });
        
        if (result.success) {
          results.push({
            email: partner.email,
            company: partner.company,
            status: 'success'
          });
          console.log(`✅ Added ${partner.company} (${partner.email})`);
        } else {
          errors.push({
            email: partner.email,
            company: partner.company,
            error: result.error
          });
          console.log(`❌ Failed to add ${partner.company}: ${result.error}`);
        }
        
        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        errors.push({
          email: partner.email,
          company: partner.company,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Launch distribution complete`,
      stats: {
        total: partnersToAdd.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error: any) {
    console.error('Launch distribution error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to distribute to partners', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Launch Distribution Endpoint',
    description: 'Add founding partners to newsletter for launch outreach',
    partners: {
      total: FOUNDING_PARTNERS.length,
      categories: {
        'Luxury Accommodation': FOUNDING_PARTNERS.filter(p => p.category === 'Luxury Accommodation').length,
        'Immigration Law': FOUNDING_PARTNERS.filter(p => p.category === 'Immigration Law').length,
        'Private Banking': FOUNDING_PARTNERS.filter(p => p.category === 'Private Banking').length,
        'Education': FOUNDING_PARTNERS.filter(p => p.category === 'Education').length,
        'Healthcare': FOUNDING_PARTNERS.filter(p => p.category === 'Healthcare').length,
        'Transport': FOUNDING_PARTNERS.filter(p => p.category === 'Transport').length,
      }
    },
    usage: {
      'POST /api/beehiiv/launch-distribution': 'Add all partners to newsletter',
      'POST /api/beehiiv/launch-distribution {"type": "accommodation"}': 'Add accommodation partners only',
    }
  });
}