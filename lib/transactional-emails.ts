import type { ExecutiveIntake } from '@/lib/executive-intake';
import type { AskReloMessage } from '@/lib/ask-relo';
import {
  PARTNER_MEDIA_PACK_VERSION,
  type PartnerApplication,
} from '@/lib/partner-sales';

type LeadQuality = 'priority' | 'qualified' | 'nurture';

type EmailRow = {
  label: string;
  value: string;
};

type EmailLayoutOptions = {
  preheader: string;
  eyebrow: string;
  title: string;
  referenceId: string;
  body: string;
  footerNote?: string;
};

export function escapeEmailHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#039;',
        '"': '&quot;',
      })[character] as string
  );
}

function formatText(value: string | undefined, fallback = 'Not provided') {
  const clean = value?.trim();
  return escapeEmailHtml(clean || fallback).replace(/\n/g, '<br />');
}

function titleCase(value: string) {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatBudget(value: ExecutiveIntake['budget']) {
  const labels: Record<ExecutiveIntake['budget'], string> = {
    '2000-3000': '£2,000 to £3,000 per month',
    '3000-5000': '£3,000 to £5,000 per month',
    '5000-7500': '£5,000 to £7,500 per month',
    '7500-10000': '£7,500 to £10,000 per month',
    '10000+': '£10,000+ per month',
  };
  return labels[value];
}

function formatPartnerBudget(value: PartnerApplication['budget']) {
  const labels: Record<PartnerApplication['budget'], string> = {
    'under-2500': 'Under £2,500',
    '2500-5000': '£2,500 to £5,000',
    '5000-15000': '£5,000 to £15,000',
    '15000-plus': '£15,000+',
    unsure: 'Not yet defined',
  };
  return labels[value];
}

function formatTiming(value: PartnerApplication['timing']) {
  const labels: Record<PartnerApplication['timing'], string> = {
    '0-30': 'Within 30 days',
    '31-90': 'Within 31 to 90 days',
    '90-plus': 'More than 90 days',
    exploring: 'Exploring for now',
  };
  return labels[value];
}

function detailTable(rows: EmailRow[]) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:28px 0;background:#fffdf8;border:1px solid #ddd8cc;">
    ${rows
      .map(
        ({ label, value }) => `<tr>
          <td class="detail-label" width="34%" valign="top" style="padding:15px 18px;border-bottom:1px solid #e9e3d7;color:#746f66;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.2px;line-height:1.5;text-transform:uppercase;">${escapeEmailHtml(label)}</td>
          <td valign="top" style="padding:15px 18px;border-bottom:1px solid #e9e3d7;color:#142e50;font-family:Arial,sans-serif;font-size:14px;line-height:1.65;">${value}</td>
        </tr>`
      )
      .join('')}
  </table>`;
}

function callout(title: string, copy: string) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0;border-collapse:collapse;">
    <tr>
      <td style="padding:22px 24px;background:#dceaf6;border-left:4px solid #be8431;">
        <p style="margin:0 0 7px;color:#142e50;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;line-height:1.4;text-transform:uppercase;">${escapeEmailHtml(title)}</p>
        <p style="margin:0;color:#3e4b59;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;">${copy}</p>
      </td>
    </tr>
  </table>`;
}

function button(label: string, href: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:30px 0 8px;">
    <tr>
      <td bgcolor="#be8431" style="background:#be8431;">
        <a href="${escapeEmailHtml(href)}" style="display:inline-block;padding:15px 24px;color:#081627;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.4px;line-height:1;text-decoration:none;text-transform:uppercase;">${escapeEmailHtml(label)} &nbsp;→</a>
      </td>
    </tr>
  </table>`;
}

function layout({
  preheader,
  eyebrow,
  title,
  referenceId,
  body,
  footerNote,
}: EmailLayoutOptions) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeEmailHtml(title)}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-pad { padding-left: 24px !important; padding-right: 24px !important; }
        .email-title { font-size: 38px !important; line-height: 0.98 !important; }
        .detail-label { display: block !important; width: auto !important; padding-bottom: 3px !important; border-bottom: 0 !important; }
        .detail-label + td { display: block !important; width: auto !important; padding-top: 3px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f0ede5;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeEmailHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f0ede5;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table class="email-shell" role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px;max-width:640px;background:#fffdf8;border-collapse:collapse;box-shadow:0 18px 50px rgba(20,46,80,0.08);">
            <tr>
              <td class="email-pad" style="padding:28px 42px;background:#f7f4ed;border-top:4px solid #be8431;border-bottom:1px solid #ddd8cc;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle">
                      <span style="display:inline-block;width:34px;height:34px;border:1px solid #be8431;color:#be8431;font-family:Georgia,serif;font-size:22px;line-height:34px;text-align:center;">R</span>
                      <span style="padding-left:12px;color:#142e50;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;vertical-align:9px;">RELO NETWORK</span>
                    </td>
                    <td align="right" valign="middle" style="color:#746f66;font-family:Arial,sans-serif;font-size:9px;letter-spacing:1.4px;text-transform:uppercase;">London</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-pad" style="padding:54px 42px 30px;background:#dceaf6;border-bottom:1px solid #c8d9e7;">
                <p style="margin:0 0 18px;color:#9b6823;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;line-height:1.4;text-transform:uppercase;">${escapeEmailHtml(eyebrow)}</p>
                <h1 class="email-title" style="margin:0 0 28px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:52px;font-weight:400;letter-spacing:-1.5px;line-height:0.96;">${escapeEmailHtml(title)}</h1>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:9px 12px;background:#fffdf8;border:1px solid #aebfcd;color:#142e50;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;">Reference &nbsp; ${escapeEmailHtml(referenceId)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-pad" style="padding:34px 42px 48px;background:#fffdf8;color:#303944;font-family:Arial,sans-serif;font-size:15px;line-height:1.75;">
                ${body}
              </td>
            </tr>
            <tr>
              <td class="email-pad" style="padding:26px 42px;background:#142e50;color:#c7cfda;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;">
                <p style="margin:0 0 7px;color:#ffffff;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;">The Relo Network</p>
                <p style="margin:0;">Relocation, intelligently guided. London first, always.</p>
                ${footerNote ? `<p style="margin:12px 0 0;color:#7f8b98;">${footerNote}</p>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function executiveNotificationEmail(options: {
  intake: ExecutiveIntake;
  referenceId: string;
  quality: LeadQuality;
  score: number;
}) {
  const { intake, referenceId, quality, score } = options;
  const support = [
    intake.visaSupport && 'Visa',
    intake.taxationSupport && 'Taxation',
    intake.bankingSupport && 'Banking',
    intake.schoolingSupport && 'Schooling',
    intake.lifestyleSupport && 'Lifestyle',
  ].filter(Boolean) as string[];

  const body = `<p style="margin:0 0 18px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;">A new private relocation brief is ready for review.</p>
    <p style="margin:0 0 24px;">This lead has been scored <strong>${escapeEmailHtml(titleCase(quality))}</strong> at <strong>${score}/10</strong>. Review the complete brief before proposing a service or payment.</p>
    ${detailTable([
      { label: 'Client', value: formatText(intake.name) },
      { label: 'Email', value: formatText(intake.email) },
      { label: 'Phone', value: formatText(intake.phone) },
      { label: 'Current location', value: formatText(intake.currentLocation) },
      { label: 'Move date', value: formatText(intake.moveDate) },
      {
        label: 'Housing budget',
        value: escapeEmailHtml(formatBudget(intake.budget)),
      },
      {
        label: 'Preferred areas',
        value: formatText(intake.preferredAreas.join(', ')),
      },
      {
        label: 'Household',
        value: `${escapeEmailHtml(intake.adults)} adult(s), ${escapeEmailHtml(intake.children)} child(ren)`,
      },
      {
        label: 'Support requested',
        value: formatText(support.join(', '), 'No additional support selected'),
      },
      { label: 'Urgency', value: escapeEmailHtml(titleCase(intake.urgency)) },
      {
        label: 'Additional requirements',
        value: formatText(
          intake.otherRequirements || intake.specialRequirements
        ),
      },
    ])}
    ${callout('Internal next step', 'Review the brief and respond personally within one business day. This message is an enquiry, not a confirmed engagement.')}`;

  return layout({
    preheader: `${titleCase(quality)} relocation brief from ${intake.name}`,
    eyebrow: `Internal / ${titleCase(quality)} relocation brief`,
    title: 'A NEW MOVE TO REVIEW.',
    referenceId,
    body,
    footerNote:
      'Private operational email. Handle applicant details with care.',
  });
}

export function executiveConfirmationEmail(options: {
  intake: ExecutiveIntake;
  referenceId: string;
  journalUrl: string;
}) {
  const { intake, referenceId, journalUrl } = options;
  const body = `<p style="margin:0 0 18px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;">Dear ${formatText(intake.name)},</p>
    <p style="margin:0 0 18px;">Thank you for sharing the shape of your London move. Your private brief has arrived safely and will be reviewed by a person.</p>
    ${callout('What happens next', 'We will consider your timing, household needs and the level of support required, then reply within one business day with the clearest next step.')}
    ${detailTable([
      { label: 'Move date', value: formatText(intake.moveDate) },
      {
        label: 'Preferred areas',
        value: formatText(intake.preferredAreas.join(', ')),
      },
      {
        label: 'Housing budget',
        value: escapeEmailHtml(formatBudget(intake.budget)),
      },
    ])}
    <p style="margin:24px 0 0;"><strong>No payment has been taken.</strong> If there is a strong fit, we will recommend a private briefing call or the appropriate relocation engagement before any payment link is issued.</p>
    ${button('Read the London Journal', journalUrl)}`;

  return layout({
    preheader: `Your London relocation brief ${referenceId} has been received`,
    eyebrow: 'Start Your Move / Brief received',
    title: 'YOUR MOVE IS NOW IN VIEW.',
    referenceId,
    body,
    footerNote:
      'You received this email because a relocation brief was submitted using this address.',
  });
}

export function askReloSummaryEmail(options: {
  conversation: AskReloMessage[];
  referenceId: string;
  startMoveUrl: string;
  journalUrl: string;
}) {
  const { conversation, referenceId, startMoveUrl, journalUrl } = options;
  const exchanges = conversation
    .map(({ role, content }) => {
      const label = role === 'user' ? 'You asked' : 'Relo replied';
      return `<div style="margin:0 0 18px;padding:18px 20px;background:${role === 'user' ? '#f7f4ed' : '#dceaf6'};border-left:3px solid ${role === 'user' ? '#d7cdbc' : '#be8431'};">
        <p style="margin:0 0 7px;color:#746f66;font-family:Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;">${label}</p>
        <p style="margin:0;color:#303944;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;">${formatText(content)}</p>
      </div>`;
    })
    .join('');

  const body = `<p style="margin:0 0 18px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;">Your London move, made easier to revisit.</p>
    <p style="margin:0 0 24px;">Here are the notes you asked Relo to send. They are general guidance rather than legal, tax, immigration, school, financial or property advice.</p>
    ${exchanges}
    ${callout('A sensible next step', 'If your dates, household needs and priorities are taking shape, share the private Start Your Move brief for human review.')}
    ${button('Start Your Move', startMoveUrl)}
    <p style="margin:24px 0 0;font-size:13px;"><a href="${escapeEmailHtml(journalUrl)}" style="color:#9b6823;">Read practical London guidance in the Journal →</a></p>`;

  return layout({
    preheader: 'The notes from your Ask Relo conversation',
    eyebrow: 'Ask Relo / Your notes',
    title: 'KEEP THE THREAD.',
    referenceId,
    body,
    footerNote:
      'You received this one-off email because you asked Relo to send these notes. It does not subscribe you to marketing.',
  });
}

export function partnerNotificationEmail(options: {
  application: PartnerApplication;
  referenceId: string;
  quality: LeadQuality;
  score: number;
}) {
  const { application, referenceId, quality, score } = options;
  const body = `<p style="margin:0 0 18px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;">A new commercial partnership brief is ready for review.</p>
    <p style="margin:0 0 24px;">This application has been scored <strong>${escapeEmailHtml(titleCase(quality))}</strong> at <strong>${score}/10</strong>. Assess usefulness and audience fit before discussing inventory or pricing.</p>
    ${detailTable([
      {
        label: 'Contact',
        value: `${formatText(application.name)}<br />${formatText(application.email)}`,
      },
      { label: 'Company', value: formatText(application.company) },
      { label: 'Role', value: escapeEmailHtml(titleCase(application.role)) },
      { label: 'Website', value: formatText(application.website) },
      {
        label: 'Area of expertise',
        value: formatText(application.serviceCategory),
      },
      {
        label: 'Partnership interest',
        value: escapeEmailHtml(titleCase(application.partnershipInterest)),
      },
      {
        label: 'Objective',
        value: escapeEmailHtml(titleCase(application.objective)),
      },
      {
        label: 'Audience fit',
        value: escapeEmailHtml(titleCase(application.audienceFit)),
      },
      {
        label: 'Working budget',
        value: escapeEmailHtml(formatPartnerBudget(application.budget)),
      },
      {
        label: 'Timing',
        value: escapeEmailHtml(formatTiming(application.timing)),
      },
      { label: 'Application', value: formatText(application.message) },
    ])}
    ${callout('Editorial safeguard', 'Review expertise, audience value and campaign purpose before proposing a placement. Paid work never guarantees an introduction or changes an independent recommendation.')}`;

  return layout({
    preheader: `${titleCase(quality)} partner lead from ${application.company}`,
    eyebrow: `Internal / ${titleCase(quality)} partner lead`,
    title: 'A PARTNERSHIP TO ASSESS.',
    referenceId,
    body,
    footerNote:
      'Private operational email. Handle applicant details with care.',
  });
}

export function partnerConfirmationEmail(options: {
  application: PartnerApplication;
  referenceId: string;
  mediaPackUrl: string;
}) {
  const { application, referenceId, mediaPackUrl } = options;
  const body = `<p style="margin:0 0 18px;color:#142e50;font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.35;">Dear ${formatText(application.name)},</p>
    <p style="margin:0 0 18px;">Thank you for applying to work with The Relo Network. We have received the partnership brief for <strong>${formatText(application.company)}</strong>.</p>
    ${callout('What we review', 'We consider expertise, audience fit, timing and campaign purpose before recommending a placement. If there is a strong fit, we will reply with the most relevant next step.')}
    ${detailTable([
      {
        label: 'Interest',
        value: escapeEmailHtml(titleCase(application.partnershipInterest)),
      },
      {
        label: 'Timing',
        value: escapeEmailHtml(formatTiming(application.timing)),
      },
      {
        label: 'Media pack',
        value: `Version ${escapeEmailHtml(PARTNER_MEDIA_PACK_VERSION)}`,
      },
    ])}
    ${button('View the partner media pack', mediaPackUrl)}
    <p style="margin:26px 0 0;color:#5e6670;font-size:13px;line-height:1.7;">No payment has been taken. Paid placement never guarantees a client introduction and never changes an independent Ask Relo recommendation.</p>`;

  return layout({
    preheader: `Your Relo Network partner brief ${referenceId} has been received`,
    eyebrow: 'Partner Network / Application received',
    title: 'USEFUL WORK STARTS HERE.',
    referenceId,
    body,
    footerNote:
      'You received this email because a partner application was submitted using this address.',
  });
}
