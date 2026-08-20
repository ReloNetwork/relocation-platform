'use client';

import { useEffect, useRef, useState } from 'react';

const DESKTOP_FILM = '/films/relo-continuous-flight-desktop.mp4';

export default function FlightFilm({
  progress,
  fallback,
}: {
  progress: number;
  fallback: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekFrame = useRef(0);
  const pendingTime = useRef<number | null>(null);
  const primed = useRef(false);
  const paintRequest = useRef(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const update = () => {
      const constrained =
        connection?.saveData ||
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g';
      // The cinematic is part of the product on desktop and mobile. Only explicit
      // accessibility or data-saving preferences should replace it with a still.
      setShouldLoad(!reducedMotion.matches && !constrained);
    };
    update();
    reducedMotion.addEventListener('change', update);
    return () => {
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || !Number.isFinite(video.duration)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nextTime = Math.min(1, Math.max(0, progress)) * Math.max(0, video.duration - 0.06);
    window.cancelAnimationFrame(seekFrame.current);
    seekFrame.current = window.requestAnimationFrame(() => {
      if (video.seeking) {
        pendingTime.current = nextTime;
        return;
      }
      // Stop the tiny compositor-play below before asking the decoder for the next
      // scroll position. This keeps the film locked to the page rather than time.
      if (!video.paused) video.pause();
      if (Math.abs(video.currentTime - nextTime) > 0.025) {
        video.currentTime = nextTime;
      } else {
        paintDecodedFrame(video);
      }
    });
    return () => window.cancelAnimationFrame(seekFrame.current);
  }, [progress, ready]);

  function paintDecodedFrame(video: HTMLVideoElement) {
    const request = ++paintRequest.current;
    const finish = () => {
      if (request !== paintRequest.current) return;
      video.pause();
    };

    // Chromium can decode a seek successfully without replacing the poster/stale
    // GPU texture. Let one decoded video frame enter the compositor, then pause on
    // it. Muted inline playback is permitted without user interaction.
    const playback = video.play();
    if (!playback) return;
    playback
      .then(() => {
        if ('requestVideoFrameCallback' in video) {
          video.requestVideoFrameCallback(finish);
        } else {
          window.requestAnimationFrame(finish);
        }
      })
      .catch(() => {
        // The still fallback remains visible if a browser explicitly blocks muted
        // inline playback; normal desktop and mobile browsers take the path above.
      });
  }

  function revealAndPrime(video: HTMLVideoElement) {
    setReady(true);
    // A paused video can keep painting its poster even while currentTime changes.
    // Remove it once decoded data exists, then briefly play/pause the muted film so
    // Chrome and iOS both promote the video frame to the compositor.
    video.removeAttribute('poster');
    if (primed.current) return;
    primed.current = true;
    const targetTime = Math.min(1, Math.max(0, progress)) * Math.max(0, video.duration - 0.06);
    const playback = video.play();
    if (!playback) return;
    playback
      .then(() => {
        video.pause();
        video.currentTime = targetTime;
      })
      .catch(() => {
        // Scroll seeking still works when autoplay policy blocks the prime. Removing
        // the poster above is enough for desktop browsers to paint the decoded frame.
        video.currentTime = targetTime;
      });
  }

  return (
    <div className={`flight-film ${ready ? 'is-ready' : 'is-loading'}`} aria-hidden="true">
      <div
        className={`flight-film__fallback ${ready ? '' : 'is-active'}`}
        style={{ backgroundImage: `url(${fallback})` }}
      />
      {shouldLoad && (
        <video
          ref={videoRef}
          className={ready ? 'is-ready' : ''}
          muted
          playsInline
          preload="auto"
          poster={ready ? undefined : fallback}
          src={DESKTOP_FILM}
          disablePictureInPicture
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 0.001;
          }}
          onLoadedData={(event) => revealAndPrime(event.currentTarget)}
          onCanPlay={(event) => revealAndPrime(event.currentTarget)}
          onSeeked={(event) => {
            const nextTime = pendingTime.current;
            if (nextTime !== null) {
              pendingTime.current = null;
              if (Math.abs(event.currentTarget.currentTime - nextTime) > 0.025) {
                event.currentTarget.currentTime = nextTime;
                return;
              }
            }
            paintDecodedFrame(event.currentTarget);
          }}
          onError={() => setReady(false)}
        />
      )}
      {shouldLoad && !ready && (
        <span className="flight-film__loading">PREPARING 35-SECOND FLIGHT</span>
      )}
    </div>
  );
}
