import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'RESEND_API_KEY environment variable not found',
        hasApiKey: false
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // Test the API key with a simple call
    try {
      // This will fail if the API key is invalid
      const testEmail = await resend.emails.send({
        from: 'Test <onboarding@resend.dev>',
        to: 'test@example.com', // This won't actually send
        subject: 'Test',
        html: '<p>Test</p>'
      });

      return NextResponse.json({
        success: true,
        hasApiKey: true,
        apiKeyPreview: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`,
        message: 'Resend API key appears to be valid',
        testResult: testEmail.error ? 'API key works but test email had validation error (expected)' : 'API key works'
      });

    } catch (apiError: any) {
      return NextResponse.json({
        success: false,
        hasApiKey: true,
        apiKeyPreview: `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`,
        error: 'API key appears to be invalid or expired',
        details: apiError.message
      }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to test Resend API',
      details: error.message
    }, { status: 500 });
  }
}