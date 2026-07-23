// Generates elegant placeholder decor illustrations — soft ivory/forest/gold
// line-and-wash florals — so the site runs before real photography exists.
// Swap files under public/images/ 1:1 with real photos later (same names).
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = fileURLToPath(new URL("../public/images/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const IVORY = "#faf6ef";
const LINEN = "#e9dfc9";
const FOREST_DEEP = "#1e2921";
const SAGE = "#7c8f74";
const GOLD = "#b68a4e";
const GOLD_SOFT = "#d3ab6e";

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function petal(cx, cy, r, rot, fill, opacity) {
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(r * 0.6).toFixed(1)}" ry="${(r * 0.34).toFixed(1)}" fill="${fill}" opacity="${opacity}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
}

function bloom(cx, cy, r, fill, rand, petals = 6, opacity = 0.95) {
  let s = "<g>";
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * 360 + rand() * 14;
    s += petal(cx, cy, r, angle, fill, opacity);
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(1)}" fill="${GOLD_SOFT}" opacity="0.9"/>`;
  s += "</g>";
  return s;
}

function leaf(cx, cy, len, rot, fill, opacity = 0.6) {
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${len}" ry="${len * 0.28}" fill="${fill}" opacity="${opacity}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
}

function candle(x, y, h, w, flicker) {
  return `
    <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${w / 2}" fill="#fdf8ee" opacity="0.95"/>
    <ellipse cx="${x}" cy="${y - h - 5}" rx="${3.2 * flicker}" ry="${6 * flicker}" fill="${GOLD}"/>
    <ellipse cx="${x}" cy="${y - h - 5}" rx="${11 * flicker}" ry="${15 * flicker}" fill="${GOLD}" opacity="0.2" filter="url(#blur)"/>
  `;
}

function arch(cx, baseY, topY, halfW, stroke, sw) {
  return `<path d="M ${cx - halfW} ${baseY} L ${cx - halfW} ${topY + halfW} A ${halfW} ${halfW} 0 0 1 ${cx + halfW} ${topY + halfW} L ${cx + halfW} ${baseY}" fill="none" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function scene({ w, h, seed, variant }) {
  const rand = seededRand(seed);
  let s = `<rect width="${w}" height="${h}" fill="url(#bg)"/>`;

  // ambient bokeh
  for (let i = 0; i < 10; i++) {
    s += `<circle cx="${(rand() * w).toFixed(1)}" cy="${(rand() * h * 0.75).toFixed(1)}" r="${(6 + rand() * 10).toFixed(1)}" fill="${GOLD}" opacity="${(0.05 + rand() * 0.08).toFixed(2)}" filter="url(#blur)"/>`;
  }

  function cluster(cx, cy, scale) {
    let c = "";
    const n = 4 + Math.floor(rand() * 3);
    for (let i = 0; i < 3; i++) {
      const a = rand() * 360;
      const len = scale * (0.55 + rand() * 0.3);
      c += leaf(cx + (rand() - 0.5) * scale, cy + (rand() - 0.5) * scale, len, a, SAGE, 0.4);
    }
    for (let i = 0; i < n; i++) {
      const dx = (rand() - 0.5) * scale * 1.1;
      const dy = (rand() - 0.5) * scale * 1.1;
      c += bloom(cx + dx, cy + dy, scale * (0.5 + rand() * 0.28), rand() > 0.35 ? IVORY : GOLD_SOFT, rand, 6);
    }
    return c;
  }

  if (variant === "hero") {
    s += arch(w / 2, h * 0.98, h * 0.14, w * 0.24, GOLD, 6);
    const stops = [0, 0.16, 0.32, 0.5, 0.68, 0.84, 1];
    for (const t of stops) {
      const angle = Math.PI + t * Math.PI;
      const px = w / 2 + Math.cos(angle) * w * 0.24;
      const py = h * 0.14 + w * 0.24 - Math.sin(angle) * w * 0.24;
      s += cluster(px, py, 46 + rand() * 14);
    }
    s += cluster(w * 0.5, h * 0.92, 60);
    for (let i = 0; i < 7; i++) {
      s += candle(w * (0.16 + i * 0.115), h * 0.97, 50 + rand() * 22, 10, 0.9 + rand() * 0.3);
    }
  } else if (variant === "wedding") {
    s += `<rect x="0" y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="${LINEN}" opacity="0.55"/>`;
    s += cluster(w * 0.22, h * 0.58, 70);
    s += cluster(w * 0.78, h * 0.58, 70);
    s += cluster(w * 0.5, h * 0.68, 55);
    for (let i = 0; i < 5; i++) {
      s += candle(w * (0.16 + i * 0.17), h * 0.94, 44 + rand() * 18, 9, 0.9 + rand() * 0.3);
    }
    s += leaf(w * 0.12, h * 0.16, 40, -25, SAGE);
    s += leaf(w * 0.88, h * 0.18, 40, 25, SAGE);
  } else if (variant === "proposal") {
    s += arch(w / 2, h * 0.95, h * 0.18, w * 0.3, GOLD, 5);
    s += cluster(w * 0.5, h * 0.42, 50);
    s += cluster(w * 0.24, h * 0.58, 44);
    s += cluster(w * 0.76, h * 0.58, 44);
    for (let i = 0; i < 5; i++) {
      s += candle(w * (0.18 + i * 0.16), h * 0.92, 38 + rand() * 16, 8, 0.9 + rand() * 0.3);
    }
  } else if (variant === "event") {
    for (let i = 0; i < 4; i++) {
      const bx = w * (0.12 + i * 0.25);
      const by = h * (0.35 + rand() * 0.3);
      s += cluster(bx, by, 40 + rand() * 16);
    }
    s += leaf(w * 0.5, h * 0.15, 44, 0, SAGE);
  } else if (variant === "gallery") {
    const clusters = 2 + Math.floor(rand() * 2);
    for (let i = 0; i < clusters; i++) {
      const cx = w * (0.25 + rand() * 0.5);
      const cy = h * (0.25 + rand() * 0.5);
      s += cluster(cx, cy, 48 + rand() * 20);
    }
  }

  // vignette
  s += `<rect width="${w}" height="${h}" fill="url(#vig)"/>`;

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="38%" r="75%">
        <stop offset="0%" stop-color="${IVORY}"/>
        <stop offset="60%" stop-color="${LINEN}"/>
        <stop offset="100%" stop-color="${FOREST_DEEP}"/>
      </radialGradient>
      <radialGradient id="vig" cx="50%" cy="42%" r="72%">
        <stop offset="65%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.28"/>
      </radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    ${s}
  </svg>`;
}

const jobs = [
  { name: "hero", w: 1920, h: 1280, seed: 1, variant: "hero" },
  { name: "about-portrait", w: 900, h: 1100, seed: 2, variant: "gallery" },
  { name: "service-wedding", w: 800, h: 1000, seed: 3, variant: "wedding" },
  { name: "service-proposal", w: 800, h: 1000, seed: 4, variant: "proposal" },
  { name: "service-event", w: 800, h: 1000, seed: 5, variant: "event" },
  { name: "gallery-1", w: 900, h: 1100, seed: 6, variant: "gallery" },
  { name: "gallery-2", w: 1000, h: 750, seed: 7, variant: "wedding" },
  { name: "gallery-3", w: 900, h: 900, seed: 8, variant: "gallery" },
  { name: "gallery-4", w: 900, h: 900, seed: 9, variant: "gallery" },
  { name: "gallery-5", w: 900, h: 1100, seed: 10, variant: "proposal" },
  { name: "gallery-6", w: 1000, h: 750, seed: 11, variant: "event" },
];

await Promise.all(
  jobs.map((job) =>
    sharp(Buffer.from(scene(job)))
      .webp({ quality: 80 })
      .toFile(`${OUT}/${job.name}.webp`),
  ),
);
console.log(`Generated ${jobs.length} images in public/images/`);
