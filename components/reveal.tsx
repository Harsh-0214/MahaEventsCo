"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delayMs?: number;
  className?: string;
};

const VIEWPORT_MARGIN = 80;

function isNearViewport(node: Element) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight - VIEWPORT_MARGIN && rect.bottom > 0;
}

export function Reveal({ children, as: Tag = "div", delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    let settled = false;
    let timeoutId: number | undefined;

    const trigger = () => {
      if (settled) return;
      settled = true;
      timeoutId = window.setTimeout(() => setRevealed(true), delayMs);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) trigger();
        }
      },
      { threshold: 0, rootMargin: `0px 0px -${VIEWPORT_MARGIN}px 0px` },
    );
    observer.observe(node);

    // Fallback for environments where IntersectionObserver delivery is
    // delayed or unreliable (e.g. throttled background tabs): a lightweight
    // scroll/resize check backs up the observer so reveals never get stuck.
    const handleScroll = () => {
      if (isNearViewport(node)) trigger();
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delayMs, revealed]);

  return (
    <Tag ref={ref} data-reveal data-revealed={revealed} className={className}>
      {children}
    </Tag>
  );
}
