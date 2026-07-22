# MAHA Events

A single immersive, scroll-driven site for MAHA Events — South Asian wedding & event decor and luxury proposal design across Sacramento, the Bay Area, Central Valley, and Yuba City. "Har Pal, styled by Maha."

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## The experience

1. **Loader** — a 2.2s counter over limewash cream, then a curtain-wipe reveal.
2. **Hero** — dim, candlelit brand intro.
3. **The Walk** (`components/journey.tsx`) — a pinned ~2500px scroll section that scrubs a 120-frame image sequence on `<canvas>`, mapped 1:1 to scroll progress via GSAP ScrollTrigger, with story lines cross-fading in sync. Falls back to a static image + stacked story text under `prefers-reduced-motion` or `saveData` connections — no pinning, no canvas.
4. **Services** — Proposals, Wedding Decor, Rokha, Mehndi, Custom Signage.
5. **The Reveal** (`components/reveal-section.tsx`) — a shorter pinned section: a letter board reading "Will You Marry Me ♡" fades in over rising candlelight, then one CTA.
6. **Footer** — Instagram, inquiry CTA, booking status, service areas.

## Structure

- `lib/content.ts` — all site copy (services, story lines, service areas) as typed data
- `lib/gsap.ts` — registers ScrollTrigger once, exports the single `power3.inOut` easing used everywhere
- `lib/frames.ts` — frame path + preload helpers for the canvas sequence
- `lib/use-reduced-motion.ts` — drives every reduced-motion fallback in the app
- `components/smooth-scroll-provider.tsx` — wires Lenis into GSAP's ticker and `ScrollTrigger.update`; skipped entirely under reduced motion
- `public/frames/` — the 120-frame placeholder sequence (`frame_0000.webp` … `frame_0119.webp`)
- `public/reveal.webp` — the placeholder final-reveal background (board left blank; the text is a real animated HTML layer in `reveal-section.tsx`)
- `scripts/gen-frames.mjs`, `scripts/gen-reveal.mjs` — regenerate the placeholder art (thin limewash/candlelight illustrations). Swap real photography/video frames into `public/frames/` and `public/reveal.webp` under the same filenames — no code changes needed.

## Performance notes

- Frames are preloaded in parallel as soon as the journey section mounts (in parallel with the loader).
- Canvas backing resolution is capped at devicePixelRatio 1 below 768px viewport width.
- Only `transform`/`opacity` are animated; canvas and pinned layers get `will-change: transform`.
- `prefers-reduced-motion` and `navigator.connection.saveData` both route to static, non-pinned fallbacks for the two pinned sections.
