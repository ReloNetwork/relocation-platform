export type HomepageEditorialCampaign = {
  status: 'approved';
  disclosure: 'Paid partnership' | 'Sponsored';
  partnerName: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  action: string;
  startsAt: string;
  endsAt: string;
  media:
    | { kind: 'image'; src: string; alt: string }
    | { kind: 'video'; src: string; poster: string; alt: string };
};

// Keep this null until a campaign has passed editorial, commercial and rights review.
// Adding an approved campaign requires a dated record and a Preview deployment.
export const homepageEditorialCampaign: HomepageEditorialCampaign | null = null;

export function getActiveHomepageEditorialCampaign(
  campaign: HomepageEditorialCampaign | null,
  now = new Date()
) {
  if (!campaign || campaign.status !== 'approved') return null;

  const startsAt = Date.parse(campaign.startsAt);
  const endsAt = Date.parse(campaign.endsAt);
  const time = now.getTime();

  if (
    !Number.isFinite(startsAt) ||
    !Number.isFinite(endsAt) ||
    startsAt >= endsAt ||
    time < startsAt ||
    time >= endsAt
  ) {
    return null;
  }

  return campaign;
}
