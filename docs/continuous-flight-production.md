# The Relo Network — continuous-flight production

## Creative direction

A grounded, photoreal continuous camera journey through an intelligent version
of London. Bright natural daylight, warm ivory stone, pale blue sky, navy and
brass wayfinding details, and one restrained Relo red signal at the conclusion.
The film should feel editorial and architectural—not like a game world, tourism
montage, or generic drone reel.

## Story spine

1. **Arrive** — begin above the Thames in bright daylight and approach Tower
   Bridge. The city feels legible, not overwhelming.
2. **Move** — follow the river into St Katharine Docks, pass through its brick
   passage and emerge at a white-stucco residential terrace.
3. **Live** — travel at human height along the terrace toward a pale-blue front
   entrance. London shifts from skyline to lived neighbourhood without a cut.
4. **Discover** — climb the tiled steps as the front door opens naturally and
   cross the threshold into a bright, prepared London home.
5. **Ask Relo** — settle in a calm ivory hall with brass details, flowers and a
   garden view, leaving composed negative space for the interface and headline.

## Camera continuity rules

- One forward-moving camera, human and measured; no cuts, whip pans or resets.
- Each clip starts from the exact extracted final frame of the previous clip.
- 24 fps, consistent lens language, daylight direction and colour science.
- Avoid faces in close-up, readable signage, logos, text and UI in the footage.
- Keep the centre and lower third sufficiently calm for editorial typography.
- Use one video model and one quality setting for the entire chain.

## Deliverables

- Desktop: seven matched 5-second 16:9 source clips, stitched into one master.
- Web delivery: a 1600 × 900 H.264 derivative with fast-start and a short GOP;
  the approved 1920 × 1080 source master remains local and is not deployed.
- Mobile: five separately generated 5-second 9:16 source clips following the
  same beats; do not crop or reframe the desktop master.
- Poster frames for both formats and an optional WebM derivative after approval.
- H.264 browser masters encoded with `+faststart`, stripped of audio and metadata.

## Integration contract

The final encoded files are written to `public/films/` using the names documented
there. `FlightFilm.tsx` selects the browser-ready desktop derivative, downloads
it once per application session as a seekable Blob, coalesces rapid seeks, and
scrubs it from page scroll progress. Mobile, reduced-motion, data-saver and
constrained-connection visitors retain the bright high-resolution still fallbacks.
