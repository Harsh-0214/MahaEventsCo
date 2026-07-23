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
    <span
      className={`-ml-4 inline-block pl-4 ${play ? "signature-write" : "signature-hidden"}`}
    >
      <span
        className={`signature-glow-base font-(family-name:--font-script) inline-block whitespace-nowrap text-[11vw] leading-[1.5] text-(--color-ivory) sm:text-6xl lg:text-7xl xl:text-8xl ${
          play ? "signature-glow" : ""
        }`}
      >
        {siteConfig.name}
      </span>
    </span>
  );
}
