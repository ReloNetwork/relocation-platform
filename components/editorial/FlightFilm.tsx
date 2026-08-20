'use client';

import { useEffect, useRef, useState } from 'react';

const DESKTOP_FILM = '/films/relo-continuous-flight-desktop.mp4';

let sharedFilmUrl: string | null = null;
let sharedFilmRequest: Promise<string> | null = null;

function getSharedFilmUrl() {
  if (sharedFilmUrl) return Promise.resolve(sharedFilmUrl);
  if (sharedFilmRequest) return sharedFilmRequest;

  sharedFilmRequest = fetch(DESKTOP_FILM)
    .then((response) => {
      if (!response.ok) throw new Error(`Film request failed: ${response.status}`);
      return response.blob();
    })
    .then((blob) => {
      sharedFilmUrl = URL.createObjectURL(blob);
      return sharedFilmUrl;
    })
    .catch((error) => {
      sharedFilmRequest = null;
      throw error;
    });

  return sharedFilmRequest;
}

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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [filmUrl, setFilmUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const update = () => {
      const constrained =
        connection?.saveData ||
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g';
      setIsMobile(media.matches);
      setShouldLoad(!media.matches && !reducedMotion.matches && !constrained);
    };
    update();
    media.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (isMobile !== false || !shouldLoad) {
      setFilmUrl(null);
      return;
    }

    let cancelled = false;
    setReady(false);
    setFailed(false);

    getSharedFilmUrl()
      .then((url) => {
        if (!cancelled) setFilmUrl(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isMobile, shouldLoad]);

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
    <div className="flight-film" aria-hidden="true">
      <div
        className={`flight-film__fallback ${ready && !failed ? '' : 'is-active'}`}
        style={{ backgroundImage: `url(${fallback})` }}
      />
      {!failed && isMobile === false && filmUrl && (
        <video
          ref={videoRef}
          className={ready ? 'is-ready' : ''}
          muted
          playsInline
          preload="auto"
          poster={fallback}
          src={filmUrl}
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 0.001;
          }}
          onLoadedData={() => setReady(true)}
          onSeeked={(event) => {
            const nextTime = pendingTime.current;
            if (nextTime === null) return;
            pendingTime.current = null;
            if (Math.abs(event.currentTarget.currentTime - nextTime) > 0.025) {
              event.currentTarget.currentTime = nextTime;
            }
          }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
