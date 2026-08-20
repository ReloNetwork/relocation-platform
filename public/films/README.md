# Relo continuous-flight masters

The shared scroll player accepts two silent, frame-matched masters:

- `relo-continuous-flight-desktop.mp4` — 16:9, H.264, fast-start, no audio
- `relo-continuous-flight-mobile.mp4` — reserved for the future native 9:16 chain

The accepted desktop film is a 35-second, seven-leg journey from the Thames to
a prepared London interior. Its five editorial chapter boundaries are: Arrive,
Move, Live, Discover, Ask Relo. The homepage scrubs the complete film. Public
editorial subpages reuse the cached master and open inside their relevant
chapter.

The desktop master is delivered directly from Vercel with HTTP byte-range
support and hardened for phone playback with coalesced seeks, first-touch
priming and responsive canvas redraws. It is still centre-cropped on a phone and
must not be described as the native mobile production. Replace it with a
separately generated, frame-locked 9:16 chain before treating mobile as final
art direction.

Until the masters are present, the player deliberately falls back to the
approved high-resolution editorial stills. Missing film files therefore do not
break the site or leave an empty hero.
