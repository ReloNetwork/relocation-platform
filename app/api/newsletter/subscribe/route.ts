import { NextRequest, NextResponse } from 'next/server';
import {
  newsletterSignupSchema,
  processNewsletterSignup,
} from '@/lib/newsletter-signup';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'A valid JSON body is required' },
      { status: 400 }
    );
  }

  const parsed = newsletterSignupSchema.safeParse({
    ...body,
    utmSource: body.utmSource ?? body.utm_source,
    utmMedium: body.utmMedium ?? body.utm_medium,
    utmCampaign: body.utmCampaign ?? body.utm_campaign,
    utmTerm: body.utmTerm ?? body.utm_term,
    utmContent: body.utmContent ?? body.utm_content,
    referringSite: body.referringSite ?? body.referring_site,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address' },
      { status: 400 }
    );
  }

  try {
    const result = await processNewsletterSignup(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Newsletter signup failed', error);
    return NextResponse.json(
      { success: false, error: 'Newsletter signup is temporarily unavailable' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'The London Brief subscription endpoint',
    endpoint: 'POST /api/newsletter/subscribe',
  });
}
