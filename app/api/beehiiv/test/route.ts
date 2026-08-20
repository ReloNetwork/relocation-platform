import { NextRequest, NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv';
import { hasInternalAccess } from '@/lib/api-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!hasInternalAccess(request)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    // Test 1: Check if API keys are configured
    const hasApiKey = !!process.env.BEEHIIV_API_KEY;
    const hasPublicationId = !!process.env.BEEHIIV_PUBLICATION_ID;
    
    // Test 2: Get subscriber count
    const subscriberCount = await beehiiv.getSubscriberCount();
    
    // Test 3: Test subscription (dummy email)
    const testSubscription = await beehiiv.subscribe({
      email: 'test@therelonetwork.com',
      name: 'Test User',
      source: 'api-test',
      utmSource: 'test',
      utmMedium: 'api',
      utmCampaign: 'launch-test'
    });

    return NextResponse.json({
      success: true,
      tests: {
        configuration: {
          hasApiKey,
          hasPublicationId,
          status: hasApiKey && hasPublicationId ? 'configured' : 'demo-mode'
        },
        subscriberCount: {
          count: subscriberCount,
          status: subscriberCount > 0 ? 'success' : 'no-data'
        },
        testSubscription: {
          success: testSubscription.success,
          error: testSubscription.error,
          status: testSubscription.success ? 'working' : 'failed'
        }
      },
      message: hasApiKey && hasPublicationId 
        ? 'Beehiiv integration is fully configured and working'
        : 'Beehiiv integration is in demo mode - add API keys to .env.local for full functionality'
    });

  } catch (error: any) {
    console.error('Beehiiv test error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Beehiiv integration test failed', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const result = await beehiiv.subscribe({
      email,
      name,
      source: source || 'launch-newsletter',
      utmSource: 'launch',
      utmMedium: 'newsletter',
      utmCampaign: 'founding-partners'
    });

    return NextResponse.json({ 
      success: result.success,
      message: result.success 
        ? 'Successfully subscribed to newsletter' 
        : 'Subscription failed',
      error: result.error
    });

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Failed to subscribe to newsletter', 
      details: error.message 
    }, { status: 500 });
  }
}
