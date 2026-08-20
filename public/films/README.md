# Relo continuous-flight masters

The shared scroll player accepts two silent, frame-matched masters:

- `relo-continuous-flight-desktop.mp4` — 16:9, H.264, fast-start, no audio
- `relo-continuous-flight-mobile.mp4` — native 9:16, H.264, fast-start, no audio

The accepted desktop film is a 35-second, seven-leg journey from the Thames to
a prepared London interior. Its five editorial chapter boundaries are: Arrive,
Move, Live, Discover, Ask Relo. The homepage scrubs the complete film. Public
editorial subpages reuse the cached master and open inside their relevant
chapter.

The desktop master is fetched into a seekable Blob URL. On mobile the approved
high-resolution stills remain active until a separately generated native 9:16
chain is supplied. The desktop film is intentionally not centre-cropped and
misrepresented as a native mobile production.

Until the masters are present, the player deliberately falls back to the
approved high-resolution editorial stills. Missing film files therefore do not
break the site or leave an empty hero.
