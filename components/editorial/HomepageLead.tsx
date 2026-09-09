'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { HomepageEditorialCampaign } from '@/lib/homepage-editorial';
import CinematicJourney from './CinematicJourney';

export default function HomepageLead({
  campaign,
}: {
  campaign: HomepageEditorialCampaign | null;
}) {
  const [active, setActive] = useState(Boolean(campaign));

  useEffect(() => {
    if (!campaign) {
      setActive(false);
      return;
    }

    const remaining = Date.parse(campaign.endsAt) - Date.now();
    if (remaining <= 0) {
      setActive(false);
      return;
    }

    setActive(true);
    const timer = window.setTimeout(
      () => setActive(false),
      Math.min(remaining, 2_147_483_647)
    );
    return () => window.clearTimeout(timer);
  }, [campaign]);

  if (!campaign || !active) return <CinematicJourney />;

  return (
    <section
      className="homepage-takeover"
      aria-label="Homepage paid partnership"
    >
      <div className="homepage-takeover__media">
        {campaign.media.kind === 'image' ? (
          <Image
            src={campaign.media.src}
            alt={campaign.media.alt}
            fill
            priority
            sizes="100vw"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={campaign.media.poster}
            aria-label={campaign.media.alt}
          >
            <source src={campaign.media.src} />
          </video>
        )}
      </div>
      <div className="homepage-takeover__wash" />
      <div className="homepage-takeover__copy">
        <p className="homepage-takeover__disclosure">
          {campaign.disclosure} with {campaign.partnerName}
        </p>
        <p className="eyebrow">{campaign.eyebrow}</p>
        <h1>{campaign.title}</h1>
        <p>{campaign.body}</p>
        <Link className="button button--gold" href={campaign.href}>
          {campaign.action}
        </Link>
        <small>
          The Relo Network chooses the subject and final wording. Partner
          payment never changes an Ask Relo answer.
        </small>
      </div>
    </section>
  );
}
