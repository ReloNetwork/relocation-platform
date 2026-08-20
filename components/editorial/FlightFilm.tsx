'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DESKTOP_FILM = '/films/relo-continuous-flight-desktop.mp4';

export default function FlightFilm({
  progress,
  fallback,
}: {
  progress: number;
  fallback: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seekFrame = useRef(0);
  const paintRetry = useRef(0);
  const pendingTime = useRef<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => () => window.clearTimeout(paintRetry.current), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;
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
    connection?.addEventListener('change', update);
    return () => {
      reducedMotion.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  const drawDecodedFrame = useCallback((video: HTMLVideoElement) => {
    const canvas = canvasRef.current;
    if (!canvas || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)
      return;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const outputWidth = Math.round(width * ratio);
    const outputHeight = Math.round(height * ratio);
    if (canvas.width !== outputWidth || canvas.height !== outputHeight) {
      canvas.width = outputWidth;
      canvas.height = outputHeight;
    }
    const context = canvas.getContext('2d', { alpha: false });
    if (!context || !video.videoWidth || !video.videoHeight) return;
    const sourceRatio = video.videoWidth / video.videoHeight;
    const outputRatio = outputWidth / outputHeight;
    let sx = 0;
    let sy = 0;
    let sw = video.videoWidth;
    let sh = video.videoHeight;
    if (sourceRatio > outputRatio) {
      sw = video.videoHeight * outputRatio;
      sx = (video.videoWidth - sw) / 2;
    } else {
      sh = video.videoWidth / outputRatio;
      sy = (video.videoHeight - sh) / 2;
    }
    context.drawImage(video, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight);
    setReady(true);
  }, []);

  const scheduleDecodedFrame = useCallback(
    (video: HTMLVideoElement) => {
      window.clearTimeout(paintRetry.current);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => drawDecodedFrame(video));
      });
      paintRetry.current = window.setTimeout(() => {
        drawDecodedFrame(video);
      }, 180);
    },
    [drawDecodedFrame]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || !Number.isFinite(video.duration)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nextTime =
      Math.min(1, Math.max(0, progress)) * Math.max(0, video.duration - 0.06);
    window.cancelAnimationFrame(seekFrame.current);
    seekFrame.current = window.requestAnimationFrame(() => {
      if (video.seeking) {
        pendingTime.current = nextTime;
        return;
      }
      if (Math.abs(video.currentTime - nextTime) > 0.025) {
        video.currentTime = nextTime;
      } else {
        scheduleDecodedFrame(video);
      }
    });
    return () => window.cancelAnimationFrame(seekFrame.current);
  }, [progress, ready, scheduleDecodedFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !ready) return;
    const observer = new ResizeObserver(() => drawDecodedFrame(video));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [drawDecodedFrame, ready]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    const prime = () => {
      const time = video.currentTime;
      void video
        .play()
        .then(() => {
          video.pause();
          video.currentTime = time;
        })
        .catch(() => undefined);
    };
    window.addEventListener('pointerdown', prime, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener('pointerdown', prime);
  }, [shouldLoad]);

  function revealDecodedFrame(video: HTMLVideoElement) {
    video.removeAttribute('poster');
    scheduleDecodedFrame(video);
  }

  return (
    <div
      className={`flight-film ${ready ? 'is-ready' : 'is-loading'}`}
      aria-hidden="true"
    >
      <div
        className={`flight-film__fallback ${ready ? '' : 'is-active'}`}
        style={{ backgroundImage: `url(${fallback})` }}
      />
      {shouldLoad && (
        <>
          <canvas ref={canvasRef} className={ready ? 'is-ready' : ''} />
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={ready ? undefined : fallback}
            src={DESKTOP_FILM}
            disablePictureInPicture
            onLoadedMetadata={(event) => {
              const target =
                Math.min(1, Math.max(0, progress)) *
                Math.max(0, event.currentTarget.duration - 0.06);
              event.currentTarget.currentTime = Math.max(0.001, target);
            }}
            onLoadedData={(event) => revealDecodedFrame(event.currentTarget)}
            onCanPlay={(event) => revealDecodedFrame(event.currentTarget)}
            onSeeked={(event) => {
              const nextTime = pendingTime.current;
              if (nextTime !== null) {
                pendingTime.current = null;
                if (
                  Math.abs(event.currentTarget.currentTime - nextTime) > 0.025
                ) {
                  event.currentTarget.currentTime = nextTime;
                  return;
                }
              }
              scheduleDecodedFrame(event.currentTarget);
            }}
            onError={(event) => {
              if (event.currentTarget.error) setReady(false);
            }}
          />
        </>
      )}
      {shouldLoad && !ready && (
        <span className="flight-film__loading">PREPARING 35-SECOND FLIGHT</span>
      )}
    </div>
  );
}
