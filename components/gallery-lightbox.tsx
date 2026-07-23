"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/content";
import { Reveal } from "@/components/reveal";

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M13 4l-7 7 7 7" : "M9 4l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryLightbox() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    const lastIndex = activeIndex;
    setActiveIndex(null);
    if (lastIndex !== null) triggerRefs.current[lastIndex]?.focus();
  }, [activeIndex]);

  const showRelative = useCallback((delta: number) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const next = (current + delta + galleryImages.length) % galleryImages.length;
      return next;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") showRelative(1);
      if (e.key === "ArrowLeft") showRelative(-1);

      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, showRelative]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {galleryImages.map((item, index) => (
          <Reveal key={item.id} delayMs={(index % 3) * 60}>
            <button
              type="button"
              ref={(el) => {
                triggerRefs.current[index] = el;
              }}
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl"
              aria-label={`View larger image: ${item.alt}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0 bg-(--color-charcoal-deep)/0 transition-colors duration-300 ease-out [@media(hover:hover)]:group-hover:bg-(--color-charcoal-deep)/10"
                aria-hidden="true"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-100 flex items-center justify-center bg-(--color-charcoal-deep)/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={() => showRelative(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:left-6"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-2xl">
            <Image
              src={galleryImages[activeIndex].image}
              alt={galleryImages[activeIndex].alt}
              fill
              sizes="(min-width: 1024px) 640px, 90vw"
              className="object-cover"
              priority
            />
          </div>

          <button
            type="button"
            onClick={() => showRelative(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white sm:right-6"
          >
            <ArrowIcon direction="right" />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {activeIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </>
  );
}
