"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MIN_DISPLAY_MS = 1200;
const FALLBACK_MS = 4000;

export function LoadingScreen() {
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = Date.now();

    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_DISPLAY_MS);
    const fallbackTimer = setTimeout(() => setVideoReady(true), FALLBACK_MS);
    const onReady = () => setVideoReady(true);
    window.addEventListener("hero-video-canplay", onReady);

    const tick = setInterval(() => {
      if (doneRef.current) return;
      const elapsed = Date.now() - start;
      setProgress(Math.min(92, 92 * (1 - Math.exp(-elapsed / 1000))));
    }, 60);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      clearInterval(tick);
      window.removeEventListener("hero-video-canplay", onReady);
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !minTimeElapsed || doneRef.current) return;
    doneRef.current = true;
    setProgress(100);

    const exitTimer = setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("hero-enter"));
    }, 250);

    const hideTimer = setTimeout(() => setVisible(false), 250 + 700);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [videoReady, minTimeElapsed]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-(--color-linen) transition-opacity duration-700 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8 px-6">
        <Image
          src="/images/maha-logo-hd.jpeg"
          alt="Maha Events Co"
          width={1024}
          height={1024}
          priority
          className="h-56 w-56 object-contain sm:h-72 sm:w-72"
        />
        <div className="h-1 w-48 overflow-hidden rounded-full bg-(--color-charcoal-deep)/10 sm:w-64">
          <div
            className="h-full rounded-full bg-(--color-gold-soft) transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
