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
        className={`font-(family-name:--font-script) -ml-4 inline-block pl-4 text-6xl leading-[1.5] text-(--color-ivory) sm:text-7xl lg:text-8xl ${
          play ? "signature-write" : "signature-hidden"
        }`}
        style={{
          filter:
            "drop-shadow(0 0 18px rgba(211,171,110,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
        }}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
