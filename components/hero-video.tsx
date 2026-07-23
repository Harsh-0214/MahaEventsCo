"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const announceReady = () => window.dispatchEvent(new Event("hero-video-canplay"));
    if (video.readyState >= 3) {
      announceReady();
    } else {
      video.addEventListener("canplaythrough", announceReady, { once: true });
    }

    const playVideo = () => {
      video.play().catch(() => {});
    };
    window.addEventListener("hero-enter", playVideo);

    return () => {
      video.removeEventListener("canplaythrough", announceReady);
      window.removeEventListener("hero-enter", playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src="/images/hero-animation.mp4"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
