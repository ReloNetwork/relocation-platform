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
  const [shouldLoad, setShouldLoad] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

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
    if (!shouldLoad) return;

    const controller = new AbortController();
    let objectUrl = '';

    async function prepareSeekableFilm() {
      try {
        const response = await fetch(DESKTOP_FILM, {
          signal: controller.signal,
          cache: 'force-cache',
        });
        if (!response.ok) throw new Error(`Film request failed: ${response.status}`);
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setSource(objectUrl);
      } catch (error) {
        if (controller.signal.aborted) return;
        // Keep a direct-source fallback for browsers that restrict Blob media URLs.
        setSource(DESKTOP_FILM);
      }
    }

    prepareSeekableFilm();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [shouldLoad]);

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
      if (Math.abs(video.currentTime - nextTime) > 0.025) video.currentTime = nextTime;
    });
    return () => window.cancelAnimationFrame(seekFrame.current);
  }, [progress, ready]);

  return (
    <div className={`flight-film ${ready ? 'is-ready' : 'is-loading'}`} aria-hidden="true">
      <div
        className={`flight-film__fallback ${ready && !failed ? '' : 'is-active'}`}
        style={{ backgroundImage: `url(${fallback})` }}
      />
      {!failed && shouldLoad && source && (
        <video
          ref={videoRef}
          className={ready ? 'is-ready' : ''}
          muted
          playsInline
          preload="auto"
          poster={fallback}
          src={source}
          disablePictureInPicture
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 0.001;
          }}
          onLoadedData={(event) => {
            setReady(true);
            // A muted play/pause primes frame-accurate seeking in Safari/WebKit.
            const attempt = event.currentTarget.play();
            if (attempt) {
              attempt
                .then(() => event.currentTarget.pause())
                .catch(() => undefined);
            }
          }}
          onSeeked={(event) => {
            const nextTime = pendingTime.current;
            if (nextTime === null) return;
            pendingTime.current = null;
            if (Math.abs(event.currentTarget.currentTime - nextTime) > 0.025) {
              event.currentTarget.currentTime = nextTime;
            }
          }}
          onError={() => {
            if (source !== DESKTOP_FILM) {
              setReady(false);
              setSource(DESKTOP_FILM);
              return;
            }
            setFailed(true);
          }}
        />
      )}
      {shouldLoad && !ready && !failed && (
        <span className="flight-film__loading">PREPARING 35-SECOND FLIGHT</span>
      )}
    </div>
  );
}
