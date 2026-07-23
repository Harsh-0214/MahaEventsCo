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
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
