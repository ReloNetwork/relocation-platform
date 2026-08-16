import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface UnreadMessage {
  id: string;
  body: string;
  created_at: string;
  thread_id: string;
  author: {
    email: string;
    full_name?: string;
  };
  case: {
    id: string;
    route_from: string;
    route_to: string;
    org_id: string;
  };
  recipients: Array<{
    email: string;
    full_name?: string;
    role: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // Security check
    const cronSecret = request.headers.get('x-cron-secret');
    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Find messages that are 15+ minutes old and haven't been read
    const fifteenMinutesAgo = new Date(
      Date.now() - 15 * 60 * 1000
    ).toISOString();

    const { data: unreadMessages } = await supabase
      .from('messages')
      .select(
        `
        id,
        body,
        created_at,
        thread_id,
        author:users!author_id (
          email,
          full_name
        ),
        threads!thread_id (
          case_id,
          org_id,
          move_cases!case_id (
            id,
            route_from,
            route_to
          )
        )
      `
      )
      .is('read_at', null)
      .lt('created_at', fifteenMinutesAgo);

    if (!unreadMessages || unreadMessages.length === 0) {
      return NextResponse.json({ message: 'No unread messages to process' });
    }

    const emailsSent = [];

    for (const message of unreadMessages as any[]) {
      try {
        // Get org members who should receive notifications (excluding the author)
        const { data: orgMembers } = await supabase
          .from('org_memberships')
          .select(
            `
            users!user_id (
              id,
              email,
              full_name
            ),
            role
          `
          )
          .eq('org_id', message.threads.org_id)
          .neq('users.id', message.author.id);

        if (!orgMembers || orgMembers.length === 0) continue;

        const recipients = orgMembers
          .filter((member) => member.users)
          .map((member) => ({
            email: member.users.email,
            full_name: member.users.full_name,
            role: member.role,
          }));

        // Send email to each recipient
        for (const recipient of recipients) {
          const caseRoute = `${message.threads.move_cases.route_from} → ${message.threads.move_cases.route_to}`;
          const authorName =
            (message.author as any).full_name || (message.author as any).email;
          const recipientName =
            (recipient as any).full_name || (recipient as any).email;

          const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : 'https://relo-network.vercel.app';
          const caseUrl = `${siteUrl}/case`;

          await resend?.emails.send({
            from: 'Messages <messages@therelonetwork.com>',
            to: recipient.email,
            subject: `New message from ${authorName} - ${caseRoute}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #0B1B2B; color: white; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px; font-family: 'Playfair Display', Georgia, serif;">Relo Network</h1>
                </div>
                
                <div style="padding: 32px 24px; background-color: #FAFAF9;">
                  <h2 style="color: #0B1B2B; margin-bottom: 16px; font-family: 'Playfair Display', Georgia, serif;">New Message</h2>
                  
                  <p style="color: #6B7280; margin-bottom: 24px;">
                    Hello ${recipientName},
                  </p>
                  
                  <p style="color: #6B7280; margin-bottom: 24px;">
                    You have a new message from <strong>${authorName}</strong> regarding your relocation case:
                  </p>
                  
                  <div style="background-color: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                    <div style="color: #6B7280; font-size: 14px; margin-bottom: 8px;">
                      <strong>Case:</strong> ${caseRoute}
                    </div>
                    <div style="color: #0B1B2B; line-height: 1.5;">
                      "${message.body}"
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-bottom: 24px;">
                    <a href="${caseUrl}" style="background-color: #C9A24A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                      View and Reply
                    </a>
                  </div>
                  
                  <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">
                    This email was sent because a message in your case hasn't been read for 15 minutes.
                  </p>
                </div>
                
                <div style="background-color: #E5E7EB; padding: 16px 24px; text-align: center; color: #6B7280; font-size: 12px;">
                  © 2024 Relo Network. Professional relocation services.
                </div>
              </div>
            `,
            text: `
Hello ${recipientName},

You have a new message from ${authorName} regarding your relocation case (${caseRoute}):

"${message.body}"

View and reply: ${caseUrl}

This email was sent because a message in your case hasn't been read for 15 minutes.

© 2024 Relo Network
            `,
          });

          emailsSent.push({
            messageId: message.id,
            recipient: recipient.email,
            case: caseRoute,
          });
        }

        // Mark message as having email notifications sent
        await supabase
          .from('messages')
          .update({
            // We could add an email_sent_at field, but for now we'll just rely on the cron timing
            read_at: null, // Keep as unread, but we've sent the email
          })
          .eq('id', message.id);
      } catch (error) {
        console.error(`Failed to send email for message ${message.id}:`, error);
      }
    }

    return NextResponse.json({
      message: 'Message alerts processed',
      unreadMessages: unreadMessages.length,
      emailsSent: emailsSent.length,
      details: emailsSent,
    });
  } catch (error) {
    console.error('Message alerts cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
