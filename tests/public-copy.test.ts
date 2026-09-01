import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['app', 'components', 'lib'];
const sourcePattern = /\.(?:ts|tsx)$/;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory()
      ? sourceFiles(path)
      : sourcePattern.test(path)
        ? [path]
        : [];
  });
}

describe('website copy', () => {
  it('contains no em dash characters', () => {
    const offenders = roots
      .flatMap(sourceFiles)
      .filter((path) => readFileSync(path, 'utf8').includes('\u2014'));

    expect(offenders).toEqual([]);
  });

  it('does not repeat unsupported launch claims on approved public pages', () => {
    const publicFiles = [
      'app/page.tsx',
      'app/move/page.tsx',
      'app/contact/page.tsx',
      'app/ask-relo/page.tsx',
      'app/executive-intake/page.tsx',
      'app/newsletter/page.tsx',
      'app/partner-application/page.tsx',
      'components/editorial/CinematicJourney.tsx',
      'components/editorial/HorizontalIntelligence.tsx',
    ];
    const copy = publicFiles
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');

    expect(copy).not.toMatch(/24\s*\/\s*7/i);
    expect(copy).not.toMatch(/fortune 500/i);
    expect(copy).not.toMatch(/2,500\+?\s+(?:readers|subscribers|members)/i);
    expect(copy).not.toMatch(/reply within (?:two|2) hours/i);
  });

  it('connects the commercial funnel without collapsing the editorial layer', () => {
    const move = readFileSync('app/move/page.tsx', 'utf8');
    const intake = readFileSync('app/executive-intake/page.tsx', 'utf8');
    const home = readFileSync('app/page.tsx', 'utf8');

    expect(move).toContain('href="/executive-intake"');
    expect(move).toContain('href="/ask-relo"');
    expect(move).toContain('href="/journal"');
    expect(intake).toContain('PRIVATE RELOCATION BRIEF');
    expect(home).toContain('<CinematicJourney />');
    expect(home).toContain('href="/move"');
    expect(home).toContain("'/executive-intake'");
    expect(home).toContain("'/ask-relo'");
    expect(home).toContain('href="/journal"');
  });

  it('keeps the partner media pack inside the homepage brand palette', () => {
    const css = readFileSync('app/globals.css', 'utf8');
    const mediaPackCss = css.slice(
      css.indexOf('.partner-pack {'),
      css.indexOf('@media (max-width: 760px)')
    );

    expect(mediaPackCss).toContain('background: var(--blue)');
    expect(mediaPackCss).toContain('color: var(--navy)');
    expect(mediaPackCss).toContain('background: var(--red)');
    expect(mediaPackCss).not.toContain('#14291f');
    expect(mediaPackCss).not.toContain('#725449');
  });

  it('keeps the qualified client service private while making editorial space saleable', () => {
    const clientJourney = [
      'app/page.tsx',
      'app/move/page.tsx',
      'app/executive-intake/page.tsx',
      'components/GlobalNavigationFixed.tsx',
    ]
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');
    const editorialJourney = [
      'app/journal/page.tsx',
      'app/live/page.tsx',
      'app/discover/page.tsx',
      'app/network/page.tsx',
      'app/newsletter/page.tsx',
      'components/editorial/EditorialPartnershipBand.tsx',
      'components/editorial/JournalArticle.tsx',
    ]
      .map((path) => readFileSync(path, 'utf8'))
      .join('\n');

    expect(clientJourney).not.toMatch(/Executive London Setup/i);
    expect(clientJourney).not.toMatch(/£5,000 (?:service|concierge)/i);
    expect(editorialJourney).toContain('EditorialPartnershipBand');
    expect(editorialJourney).toContain('Paid work is clearly labelled');
    expect(editorialJourney).toContain('href="/executive-intake"');
    expect(editorialJourney).toContain('href="/partner-application"');
  });

  it('gives every approved Journal article its own canonical address', () => {
    const slugs = [
      'mayfair-guide',
      'marylebone-guide',
      'canary-wharf-guide',
      'american-school-london-guide',
      'london-property-trends-2025',
    ];

    for (const slug of slugs) {
      const page = readFileSync(`app/newsletter/${slug}/page.tsx`, 'utf8');
      expect(page).toContain(`canonical: '/newsletter/${slug}'`);
    }
  });
});
