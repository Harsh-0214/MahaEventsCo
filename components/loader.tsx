"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const MIN_DURATION = 2.2;

/**
 * Renders on top of the already-mounted page. Counts up, then slides itself
 * away (curtain wipe) to reveal the hero beneath, rather than cutting away —
 * that's the "color-wipe reveal."
 */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const restoreScroll = () => {
      document.body.style.overflow = previousOverflow;
    };

    if (reducedMotion) {
      const id = window.setTimeout(() => {
        setPercent(100);
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            restoreScroll();
            onComplete();
          },
        });
      }, 300);
      return () => window.clearTimeout(id);
    }

    const counter = { value: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      value: 100,
      duration: MIN_DURATION,
      ease: "power3.inOut",
      onUpdate: () => setPercent(Math.round(counter.value)),
    }).to(rootRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: "power3.inOut",
      delay: 0.15,
      onComplete: () => {
        restoreScroll();
        onComplete();
      },
    });

    return () => {
      tl.kill();
      restoreScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-(--color-cream)"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${percent}%`}
    >
      <p className="font-(family-name:--font-display) px-6 text-center text-xl italic text-(--color-plum) sm:text-2xl">
        Har Pal — every moment, styled by Maha.
      </p>
      <p className="mt-8 font-(family-name:--font-display) text-4xl tabular-nums text-(--color-gold) sm:text-5xl">
        {percent}%
      </p>
    </div>
  );
}
