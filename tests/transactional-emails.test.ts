import { describe, expect, it } from 'vitest';
import {
  executiveConfirmationEmail,
  executiveNotificationEmail,
  partnerConfirmationEmail,
  partnerNotificationEmail,
} from '@/lib/transactional-emails';
import type { ExecutiveIntake } from '@/lib/executive-intake';
import type { PartnerApplication } from '@/lib/partner-sales';

const intake: ExecutiveIntake = {
  name: 'Alex <Morgan>',
  email: 'alex@example.com',
  phone: '+44 20 0000 0000',
  currentLocation: 'New York, USA',
  moveDate: '2026-12-15',
  flexibility: 'Flexible',
  budget: '5000-7500',
  budgetFlexible: true,
  preferredAreas: ['Richmond', 'Hampstead'],
  avoidAreas: '',
  propertyType: 'house',
  propertyPriority: 'high',
  schoolsPriority: 'medium',
  visaPriority: 'low',
  adults: '2',
  children: '0',
  childrenAges: '',
  pets: false,
  visaSupport: false,
  taxationSupport: false,
  bankingSupport: false,
  schoolingSupport: false,
  lifestyleSupport: true,
  otherRequirements: 'A calm first month. <script>alert(1)</script>',
  urgency: 'normal',
  specialRequirements: '',
  consent: true,
};

const application: PartnerApplication = {
  name: 'Sam <Taylor>',
  email: 'sam@example.com',
  role: 'partnerships',
  company: 'Example & Co',
  website: 'https://example.com',
  serviceCategory: 'Property advice',
  partnershipInterest: 'editorial',
  audienceFit: 'yes',
  objective: 'thought-leadership',
  budget: '2500-5000',
  timing: '31-90',
  message:
    'We help international families understand London property decisions with practical, clearly sourced guidance.',
  consent: 'yes',
};

describe('transactional email templates', () => {
  it('uses the lighter homepage palette for the shared email shell', () => {
    const html = partnerConfirmationEmail({
      application,
      referenceId: 'PR-TEST1234',
      mediaPackUrl:
        'https://preview.example.com/partner-application/media-pack',
    });

    expect(html).toContain('background:#f7f4ed');
    expect(html).toContain('background:#dceaf6');
    expect(html).toContain('background:#fffdf8');
    expect(html).toContain('color:#142e50');
    expect(html).not.toContain('padding:54px 42px 24px;background:#142e50');
  });

  it('renders a branded executive notification with useful internal detail', () => {
    const html = executiveNotificationEmail({
      intake,
      referenceId: 'RL-TEST1234',
      quality: 'qualified',
      score: 6,
    });

    expect(html).toContain('A NEW MOVE TO REVIEW.');
    expect(html).toContain('RL-TEST1234');
    expect(html).toContain('£5,000 to £7,500 per month');
    expect(html).toContain('Alex &lt;Morgan&gt;');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>alert(1)</script>');
  });

  it('renders a reassuring executive confirmation with a safe Journal action', () => {
    const html = executiveConfirmationEmail({
      intake,
      referenceId: 'RL-TEST1234',
      journalUrl: 'https://preview.example.com/journal',
    });

    expect(html).toContain('YOUR MOVE IS NOW IN VIEW.');
    expect(html).toContain('No payment has been taken.');
    expect(html).toContain('https://preview.example.com/journal');
  });

  it('renders a branded partner notification with human-readable values', () => {
    const html = partnerNotificationEmail({
      application,
      referenceId: 'PR-TEST1234',
      quality: 'qualified',
      score: 6,
    });

    expect(html).toContain('A PARTNERSHIP TO ASSESS.');
    expect(html).toContain('PR-TEST1234');
    expect(html).toContain('£2,500 to £5,000');
    expect(html).toContain('Example &amp; Co');
  });

  it('renders the partner confirmation with the media-pack action', () => {
    const html = partnerConfirmationEmail({
      application,
      referenceId: 'PR-TEST1234',
      mediaPackUrl:
        'https://preview.example.com/partner-application/media-pack',
    });

    expect(html).toContain('USEFUL WORK STARTS HERE.');
    expect(html).toContain('View the partner media pack');
    expect(html).toContain(
      'https://preview.example.com/partner-application/media-pack'
    );
    expect(html).toContain('Version 2026.09');
  });
});
