import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send blueprint delivery email
    const emailResult = await resend.emails.send({
      from: 'hello@therelonetwork.com',
      to: email,
      subject: 'Your £180K Platform Blueprint (Download Inside)',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #0B1B2B, #1e3a5f); padding: 40px 20px; text-align: center;">
            <h1 style="color: #C9A24A; font-size: 28px; margin: 0 0 10px 0;">
              Your Platform Blueprint is Here! 🎯
            </h1>
            <p style="color: white; font-size: 18px; margin: 0;">
              The complete roadmap to £180K+ platform revenue
            </p>
          </div>
          
          <div style="background: white; padding: 40px 20px;">
            <h2 style="color: #0B1B2B; font-size: 24px; margin: 0 0 20px 0;">
              Thank you for downloading the Executive's Platform Blueprint!
            </h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              You now have access to the complete 30-page guide that documents my journey from consultant to £180K+ platform owner.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0B1B2B; font-size: 20px; margin: 0 0 15px 0;">📋 What's Inside:</h3>
              <ul style="color: #333; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>8-week implementation timeline with daily checklists</li>
                <li>Complete technology stack costing £200/month vs £50K development</li>
                <li>Partnership strategies generating £8K+ monthly recurring revenue</li>
                <li>Premium market research framework (P.R.E.M.I.U.M. method)</li>
                <li>Real revenue breakdowns with Stripe dashboard screenshots</li>
                <li>Email templates, business model canvas, and legal frameworks</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://therelonetwork.com/blueprint-download" 
                 style="display: inline-block; background: #C9A24A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                📖 Download Your Blueprint Now
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <h3 style="color: #0B1B2B; font-size: 18px; margin: 0 0 15px 0;">🎥 What's Next?</h3>
              
              <div style="background: #fff5e6; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">
                  📺 Subscribe to my YouTube channel for weekly implementation videos
                </p>
                <p style="color: #666; font-size: 14px; margin: 0;">
                  I share behind-the-scenes content, live platform builds, and real revenue updates every week.
                </p>
              </div>
              
              <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">
                  🚀 Join the early access list for my complete course
                </p>
                <p style="color: #666; font-size: 14px; margin: 0;">
                  I'm developing a comprehensive course with 1-on-1 support. Early access members get 50% off.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">
                Questions about implementing the blueprint? Just reply to this email.
              </p>
              <p style="color: #333; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>[Your Name]</strong><br>
                Founder, Relo Network
              </p>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              You're receiving this because you downloaded the Platform Blueprint from ${source}.<br>
              <a href="#" style="color: #C9A24A;">Unsubscribe</a> | 
              <a href="https://therelonetwork.com" style="color: #C9A24A;">Visit Relo Network</a>
            </p>
          </div>
        </div>
      `
    });

    // Add to ConvertKit or email list (you'll need to set this up)
    // await addToEmailList(email, source);

    return NextResponse.json({ 
      success: true, 
      message: 'Blueprint sent successfully!' 
    });

  } catch (error: any) {
    console.error('Blueprint download error:', error);
    return NextResponse.json({ 
      error: 'Failed to send blueprint', 
      details: error.message 
    }, { status: 500 });
  }
}