export const landingListEmails = [
  {
    day: 0,
    subject: 'Your London Landing List',
    html: (email: string) =>
      emailFrame(
        'Your London Landing List',
        `<p>London gets easier when the decisions are made in the right order.</p><p><a href="https://www.therelonetwork.com/london-landing-list">Open your 30-point Landing List →</a></p><p>Start with the move date, the non-negotiables and the journeys you will repeat every week.</p>`,
        email
      ),
  },
  {
    day: 3,
    subject: 'The neighbourhood question most people ask too late',
    html: (email: string) =>
      emailFrame(
        'Choose the week, not the postcode',
        `<p>A beautiful address can still produce the wrong daily life. Compare the commute, school run, Sunday routine and evening journey before comparing properties.</p><p><a href="https://www.therelonetwork.com/ask-relo?q=Help%20me%20compare%20London%20neighbourhoods">Ask Relo to frame the comparison →</a></p>`,
        email
      ),
  },
  {
    day: 8,
    subject: 'Schools and homes are one decision',
    html: (email: string) =>
      emailFrame(
        'Run these searches together',
        `<p>For families, school timing can change the sensible property radius. Treat admissions, commute and housing as one connected brief.</p>`,
        email
      ),
  },
  {
    day: 15,
    subject: 'The London admin sequence',
    html: (email: string) =>
      emailFrame(
        'Sequence beats speed',
        `<p>Referencing, banking, Right to Rent, utilities, healthcare and insurance each depend on information created elsewhere. Build the sequence before arrival.</p>`,
        email
      ),
  },
  {
    day: 25,
    subject: 'Would a London move briefing help?',
    html: (email: string) =>
      emailFrame(
        'Turn the list into your plan',
        `<p>If your move now has real dates, constraints and trade-offs, The Relo Network can turn them into an actionable London brief.</p><p><a href="https://www.therelonetwork.com/move">Explore managed relocation →</a></p>`,
        email
      ),
  },
];
function emailFrame(title: string, body: string, email: string) {
  return `<div style="max-width:620px;margin:auto;padding:40px 24px;font-family:Arial;color:#172234"><p style="letter-spacing:3px;color:#b77d2d">THE RELO NETWORK</p><h1 style="font-family:Georgia;font-weight:400">${title}</h1>${body}<hr style="border:0;border-top:1px solid #ddd;margin:32px 0"><small><a href="mailto:hello@therelonetwork.com?subject=Unsubscribe%20${encodeURIComponent(email)}">Unsubscribe</a></small></div>`;
}
