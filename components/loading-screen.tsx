"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/content";

const MIN_DISPLAY_MS = 1200;
const FALLBACK_MS = 4000;

export function LoadingScreen() {
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_DISPLAY_MS);
    const fallbackTimer = setTimeout(() => setVideoReady(true), FALLBACK_MS);
    const onReady = () => setVideoReady(true);
    window.addEventListener("hero-video-canplay", onReady);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("hero-video-canplay", onReady);
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !minTimeElapsed || exiting) return;

    setExiting(true);
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("hero-enter"));

    const hideTimer = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(hideTimer);
  }, [videoReady, minTimeElapsed, exiting]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-(--color-charcoal-deep) transition-opacity duration-700 ease-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/maha-logo.png"
          alt=""
          width={200}
          height={200}
          priority
          className="h-20 w-20 animate-pulse sm:h-24 sm:w-24"
        />
        <span className="font-(family-name:--font-display) text-lg italic tracking-wide text-white/90">
          {siteConfig.name}
        </span>
      </div>
    </div>
  );
}
