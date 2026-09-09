import { describe, expect, it } from 'vitest';
import {
  getActiveHomepageEditorialCampaign,
  type HomepageEditorialCampaign,
} from '@/lib/homepage-editorial';

const campaign: HomepageEditorialCampaign = {
  status: 'approved',
  disclosure: 'Paid partnership',
  partnerName: 'Preview Partner',
  eyebrow: 'The London Landing Plan',
  title: 'A useful London arrival guide.',
  body: 'A clearly labelled and independently edited homepage feature.',
  href: '/journal',
  action: 'Read the guide',
  startsAt: '2026-09-01T08:00:00.000Z',
  endsAt: '2026-09-08T08:00:00.000Z',
  media: {
    kind: 'image',
    src: '/images/editorial/london-arrival-cinematic.webp',
    alt: 'A London arrival scene',
  },
};

describe('homepage editorial campaign gate', () => {
  it('shows only an approved campaign inside its contracted window', () => {
    expect(
      getActiveHomepageEditorialCampaign(
        campaign,
        new Date('2026-09-03T12:00:00.000Z')
      )
    ).toEqual(campaign);
  });

  it('returns the permanent film before and after the campaign window', () => {
    expect(
      getActiveHomepageEditorialCampaign(
        campaign,
        new Date('2026-08-31T12:00:00.000Z')
      )
    ).toBeNull();
    expect(
      getActiveHomepageEditorialCampaign(
        campaign,
        new Date('2026-09-08T08:00:00.000Z')
      )
    ).toBeNull();
  });

  it('rejects missing and invalid campaign windows', () => {
    expect(getActiveHomepageEditorialCampaign(null)).toBeNull();
    expect(
      getActiveHomepageEditorialCampaign(
        { ...campaign, endsAt: campaign.startsAt },
        new Date('2026-09-03T12:00:00.000Z')
      )
    ).toBeNull();
  });
});
