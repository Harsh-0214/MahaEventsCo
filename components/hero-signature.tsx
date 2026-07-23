"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/content";

export function HeroSignature() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const onEnter = () => setPlay(true);
    window.addEventListener("hero-enter", onEnter);
    return () => window.removeEventListener("hero-enter", onEnter);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className={`font-(family-name:--font-script) inline-block text-6xl leading-none text-(--color-ivory) sm:text-7xl lg:text-8xl ${
          play ? "signature-write" : "signature-hidden"
        }`}
        style={{
          filter:
            "drop-shadow(0 0 18px rgba(211,171,110,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
        }}
      >
        {siteConfig.name}
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-2 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-(--color-gold-soft) shadow-[0_0_10px_3px_rgba(211,171,110,0.85)] ${
          play ? "signature-pen" : "opacity-0"
        }`}
      />
    </span>
  );
}
