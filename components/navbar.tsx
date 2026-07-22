"use client";

import { useEffect, useState, useCallback } from "react";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="origin-center transition-transform duration-200 ease-out"
        style={
          open
            ? { transform: "translateY(5px) rotate(45deg)" }
            : undefined
        }
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="transition-opacity duration-150 ease-out"
        style={open ? { opacity: 0 } : undefined}
      />
      <line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="origin-center transition-transform duration-200 ease-out"
        style={
          open
            ? { transform: "translateY(-5px) rotate(-45deg)" }
            : undefined
        }
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isSolid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out",
        isSolid
          ? "bg-(--color-ivory)/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <a
          href="#hero"
          className={cn(
            "font-(family-name:--font-serif) text-xl tracking-wide transition-colors duration-300",
            isSolid ? "text-(--color-accent-strong)" : "text-(--color-ink)",
          )}
        >
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative py-2 text-sm font-medium tracking-wide transition-colors duration-200",
                  isSolid
                    ? "text-(--color-text)/80 hover:text-(--color-accent-strong)"
                    : "text-(--color-ink)/80 hover:text-(--color-ink)",
                  activeHref === link.href &&
                    (isSolid
                      ? "text-(--color-accent-strong)"
                      : "text-(--color-ink)"),
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out",
                    activeHref === link.href && "scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <Magnetic range={70} intensity={0.2} className="hidden md:block">
          <a
            href="#contact"
            className={cn(
              "inline-flex rounded-full border px-5 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.97]",
              isSolid
                ? "border-(--color-accent) text-(--color-accent-strong) hover:bg-(--color-accent) hover:text-white"
                : "border-(--color-ink)/40 text-(--color-ink) hover:bg-(--color-ink)/5",
            )}
          >
            Inquire Now
          </a>
        </Magnetic>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={cn(
            "-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:hidden",
            isSolid ? "text-(--color-accent-strong)" : "text-(--color-ink)",
          )}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-(--color-ivory) transition-[grid-template-rows] duration-300 ease-out md:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center text-base font-medium text-(--color-text) transition-colors duration-150 hover:text-(--color-accent-strong)"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-center rounded-full bg-(--color-accent) px-5 text-base font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                Inquire Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
