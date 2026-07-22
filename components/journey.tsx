"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { getFramePaths, preloadImages, FRAME_COUNT } from "@/lib/frames";
import { journeyLines } from "@/lib/content";

const PIN_DISTANCE = 2500;
const FADE_WINDOW = 0.12;

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const imgRatio = img.width / img.height;
  const canvasRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (imgRatio > canvasRatio) {
    sw = img.height * canvasRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / canvasRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
}

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let images: HTMLImageElement[] = [];
    let disposed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img) return;
      const rect = canvas.getBoundingClientRect();
      drawCover(ctx, img, rect.width, rect.height);
    };

    let currentFrame = -1;

    const updateLines = (progress: number) => {
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const at = journeyLines[i].at;
        const d = Math.abs(progress - at);
        const opacity = d > FADE_WINDOW ? 0 : 1 - d / FADE_WINDOW;
        gsap.set(el, { autoAlpha: opacity, y: (1 - opacity) * 12 });
      });
    };

    const paths = getFramePaths(FRAME_COUNT);
    preloadImages(paths).then((imgs) => {
      if (disposed) return;
      images = imgs;
      setReady(true);
      draw(0);
    });

    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${PIN_DISTANCE}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
          if (idx !== currentFrame) {
            currentFrame = idx;
            draw(idx);
          }
          updateLines(self.progress);
        },
      });
    }, sectionRef);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      ctxGsap.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="relative bg-(--color-plum) px-6 py-28 text-center">
        <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl">
          <Image
            src="/frames/frame_0089.webp"
            alt="A candlelit proposal setup styled with white roses and eucalyptus"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {journeyLines.map((line) => (
            <p
              key={line.text}
              className="font-(family-name:--font-display) text-2xl italic text-(--color-cream)"
            >
              {line.text}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-dvh overflow-hidden bg-(--color-plum)">
      <canvas
        ref={canvasRef}
        className="journey-canvas absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {!ready && (
        <div className="absolute inset-0 bg-(--color-plum)" aria-hidden="true" />
      )}
      <div className="pin-layer pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        {journeyLines.map((line, i) => (
          <p
            key={line.text}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className="font-(family-name:--font-display) absolute max-w-lg text-center text-3xl italic text-(--color-cream) opacity-0 [text-shadow:0_2px_24px_rgba(30,15,18,0.85),0_1px_4px_rgba(30,15,18,0.9)] sm:text-4xl"
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
