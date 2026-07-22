// Generates soft, blush-toned line-art illustrations for the prototype —
// delicate single-stroke botanicals on a candlelit cream ground, matching the
// Maha Events Co brand mark and moodboard (blush, brass gold, olive ink).
// Client photography replaces these files 1:1 (same filenames) when available.
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../public/images/", import.meta.url);
mkdirSync(OUT, { recursive: true });

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const INK = "#5b4f3d";
const GOLD = "#ad8253";
const GOLD_SOFT = "#c99a5f";
const TEAL = "#3c6b68";

const GROUNDS = {
  blush: ["#f6e9dd", "#e9cdb6"],
  cream: ["#faf3ea", "#efdccb"],
  rose: ["#f5e2d8", "#e3bfab"],
  sage: ["#f0ece0", "#d9d3ba"],
  teal: ["#eee5da", "#d7c9b4"],
};

function outlineFlower(cx, cy, r, stroke, rand, petals = 5) {
  let s = `<g fill="none" stroke="${stroke}" stroke-width="${Math.max(1, r * 0.05)}">`;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 + rand() * 0.2;
    const px = cx + Math.cos(angle) * r * 0.62;
    const py = cy + Math.sin(angle) * r * 0.62;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r * 0.5).toFixed(1)}" ry="${(r * 0.3).toFixed(1)}" transform="rotate(${(angle * 180) / Math.PI} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.14).toFixed(1)}" fill="${stroke}" stroke="none"/>`;
  s += `</g>`;
  return s;
}

function outlineLeafSprig(cx, cy, len, angleDeg, stroke) {
  const sw = Math.max(1, len * 0.045);
  let s = `<g stroke="${stroke}" stroke-width="${sw}" fill="none" transform="rotate(${angleDeg} ${cx} ${cy})">`;
  s += `<path d="M ${cx} ${cy} Q ${cx + len * 0.5} ${cy - len * 0.1} ${cx + len} ${cy}" />`;
  for (let i = 1; i <= 3; i++) {
    const t = i / 4;
    const lx = cx + len * t;
    const dir = i % 2 === 0 ? -1 : 1;
    s += `<path d="M ${lx} ${cy - dir * 2} q ${len * 0.12} ${-dir * len * 0.16} ${len * 0.05} ${-dir * len * 0.28}" />`;
  }
  s += `</g>`;
  return s;
}

function candle(x, y, h, w, glowColor) {
  return `
    <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="${w / 2}" fill="none" stroke="${INK}" stroke-width="${Math.max(1, w * 0.12)}"/>
    <circle cx="${x}" cy="${y - h - w * 1.6}" r="${w * 2.6}" fill="${glowColor}" opacity="0.28"/>
    <path d="M ${x} ${y - h - 2} q ${w * 0.5} ${-w * 1.4} 0 ${-w * 2.4} q ${-w * 0.5} ${w} 0 ${w * 2.4}" fill="${GOLD_SOFT}"/>
  `;
}

function archMotif(w, h, rand, accent) {
  const cx = w / 2;
  const baseY = h * 0.94;
  const archW = w * 0.5;
  const archTopY = h * 0.14;
  const r = archW / 2;
  const sw = Math.max(2, w * 0.006);
  let s = `<path d="M ${cx - r} ${baseY} L ${cx - r} ${archTopY + r} A ${r} ${r} 0 0 1 ${cx + r} ${archTopY + r} L ${cx + r} ${baseY}" fill="none" stroke="${GOLD}" stroke-width="${sw}"/>`;
  const unit = Math.min(w, h);
  const stops = [0, 0.2, 0.4, 0.6, 0.8, 1];
  for (const t of stops) {
    const angle = Math.PI + t * Math.PI;
    const px = cx + Math.cos(angle) * r;
    const py = archTopY + r - Math.sin(angle) * r;
    s += outlineFlower(px, py, unit * 0.05 + rand() * unit * 0.02, INK, rand);
    s += outlineLeafSprig(px, py, unit * 0.07, rand() * 60 - 30, accent);
  }
  s += outlineFlower(cx, baseY - 4, unit * 0.045, INK, rand);
  for (let i = 0; i < 4; i++) {
    s += candle(w * (0.2 + i * 0.2), baseY + unit * 0.02, unit * (0.05 + rand() * 0.03), unit * 0.012, GOLD_SOFT);
  }
  return s;
}

function heartArchMotif(w, h, rand, accent, opts = {}) {
  const { cxRatio = 0.5, scale = 1, topYRatio = 0.16 } = opts;
  const cx = w * cxRatio;
  const topY = h * topYRatio;
  const bottomY = topY + h * 0.46 * scale;
  const halfW = w * 0.22 * scale;
  const sw = Math.max(2, w * 0.007);
  const path = `M ${cx} ${bottomY}
    C ${cx - halfW * 1.6} ${bottomY - halfW * 0.6}, ${cx - halfW} ${topY}, ${cx - halfW * 0.4} ${topY}
    C ${cx - halfW * 0.1} ${topY}, ${cx} ${topY + halfW * 0.35}, ${cx} ${topY + halfW * 0.35}
    C ${cx} ${topY + halfW * 0.35}, ${cx + halfW * 0.1} ${topY}, ${cx + halfW * 0.4} ${topY}
    C ${cx + halfW} ${topY}, ${cx + halfW * 1.6} ${bottomY - halfW * 0.6}, ${cx} ${bottomY} Z`;
  let s = `<path d="${path}" fill="none" stroke="${GOLD}" stroke-width="${sw}"/>`;
  const unit = Math.min(w, h);
  const count = 10;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = Math.PI * 0.15 + t * Math.PI * 1.7;
    const px = cx + Math.cos(angle) * halfW * 1.15;
    const py = (topY + bottomY) / 2 + Math.sin(angle) * (bottomY - topY) * 0.42;
    s += outlineFlower(px, py, unit * 0.035 + rand() * unit * 0.015, INK, rand);
  }
  s += outlineLeafSprig(cx - halfW * 0.6, topY + halfW * 0.5, unit * 0.06, -30, accent);
  s += outlineLeafSprig(cx + halfW * 0.6, topY + halfW * 0.5, unit * 0.06, 30, accent);
  for (let i = 0; i < 5; i++) {
    s += candle(w * (0.14 + i * 0.18), h * 0.86, unit * (0.05 + rand() * 0.035), unit * 0.012, GOLD_SOFT);
  }
  return s;
}

function tableMotif(w, h, rand, accent) {
  const unit = Math.min(w, h);
  const lineY = h * 0.6;
  let s = `<line x1="0" y1="${lineY}" x2="${w}" y2="${lineY}" stroke="${GOLD}" stroke-width="${Math.max(1.5, unit * 0.005)}"/>`;
  const positions = [0.18, 0.4, 0.62, 0.84];
  positions.forEach((p) => {
    s += candle(w * p, lineY, unit * (0.16 + rand() * 0.08), unit * 0.022, GOLD_SOFT);
  });
  s += outlineFlower(w * 0.28, lineY - 4, unit * 0.06, INK, rand);
  s += outlineFlower(w * 0.72, lineY - 4, unit * 0.06, INK, rand);
  s += outlineLeafSprig(w * 0.5, h * 0.2, unit * 0.1, 0, accent);
  return s;
}

function sprigMotif(w, h, rand, accent) {
  const unit = Math.min(w, h);
  let s = "";
  const spots = [
    [0.24, 0.22],
    [0.78, 0.3],
    [0.3, 0.72],
    [0.72, 0.8],
    [0.5, 0.5],
  ];
  spots.forEach(([px, py], i) => {
    s += outlineFlower(w * px, h * py, unit * (0.06 + rand() * 0.03), INK, rand);
    s += outlineLeafSprig(w * px, h * py, unit * 0.09, i * 70 + rand() * 40, i % 2 ? accent : GOLD);
  });
  return s;
}

function paisleyMotif(w, h, rand, accent) {
  const unit = Math.min(w, h);
  const cx = w / 2;
  const cy = h * 0.42;
  let s = "";
  for (let ring = 0; ring < 2; ring++) {
    const r = unit * (0.16 + ring * 0.14);
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${GOLD}" stroke-width="${Math.max(1, unit * 0.003)}"/>`;
  }
  const petalCount = 8;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const r = unit * 0.3;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.85;
    s += outlineFlower(x, y, unit * 0.045, i % 2 ? INK : accent, rand);
  }
  s += outlineFlower(cx, cy, unit * 0.09, INK, rand, 7);
  s += outlineLeafSprig(w * 0.16, h * 0.84, unit * 0.12, -20, GOLD);
  s += outlineLeafSprig(w * 0.84, h * 0.84, unit * 0.12, 20, accent);
  return s;
}

function grainFilter(id) {
  return `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0"/></filter>`;
}

function svgWrapper(w, h, groundKey, seed, motif, accentKey = "olive", heartOpts) {
  const rand = seededRand(seed);
  const ground = GROUNDS[groundKey];
  const accent = accentKey === "teal" ? TEAL : GOLD_SOFT;
  const gradId = `g${seed}`;
  const glowId = `glow${seed}`;
  const grainId = `n${seed}`;

  let motifMarkup = "";
  if (motif === "arch") motifMarkup = archMotif(w, h, rand, accent);
  else if (motif === "heart") motifMarkup = heartArchMotif(w, h, rand, accent, heartOpts);
  else if (motif === "table") motifMarkup = tableMotif(w, h, rand, accent);
  else if (motif === "sprig") motifMarkup = sprigMotif(w, h, rand, accent);
  else if (motif === "paisley") motifMarkup = paisleyMotif(w, h, rand, accent);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <linearGradient id="${gradId}" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="${ground[0]}"/>
      <stop offset="100%" stop-color="${ground[1]}"/>
    </linearGradient>
    <radialGradient id="${glowId}" cx="50%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#fff6e8" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#fff6e8" stop-opacity="0"/>
    </radialGradient>
    ${grainFilter(grainId)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  <rect width="${w}" height="${h}" fill="url(#${glowId})"/>
  ${motifMarkup}
  <rect width="${w}" height="${h}" filter="url(#${grainId})" opacity="0.4"/>
</svg>`;
}

const images = [
  {
    name: "hero",
    w: 1920,
    h: 1280,
    ground: "blush",
    seed: 1,
    motif: "heart",
    heartOpts: { cxRatio: 0.7, scale: 0.8, topYRatio: 0.06 },
  },
  { name: "about-portrait", w: 900, h: 1100, ground: "sage", seed: 2, motif: "sprig" },
  { name: "service-wedding", w: 800, h: 1000, ground: "blush", seed: 3, motif: "arch" },
  { name: "service-southasian", w: 800, h: 1000, ground: "teal", seed: 4, motif: "paisley", accent: "teal" },
  { name: "service-proposal", w: 800, h: 1000, ground: "rose", seed: 5, motif: "heart" },
  { name: "service-backdrop", w: 800, h: 1000, ground: "sage", seed: 6, motif: "arch" },
  { name: "gallery-1", w: 800, h: 1100, ground: "sage", seed: 7, motif: "sprig" },
  { name: "gallery-2", w: 1000, h: 750, ground: "blush", seed: 8, motif: "arch" },
  { name: "gallery-3", w: 900, h: 900, ground: "rose", seed: 9, motif: "sprig" },
  { name: "gallery-4", w: 1400, h: 800, ground: "teal", seed: 10, motif: "paisley", accent: "teal" },
  { name: "gallery-5", w: 900, h: 900, ground: "cream", seed: 11, motif: "table" },
  { name: "gallery-6", w: 800, h: 1100, ground: "sage", seed: 12, motif: "sprig" },
  { name: "gallery-7", w: 900, h: 900, ground: "rose", seed: 13, motif: "heart" },
  { name: "gallery-8", w: 900, h: 1000, ground: "teal", seed: 14, motif: "paisley", accent: "teal" },
  { name: "gallery-9", w: 1400, h: 800, ground: "cream", seed: 15, motif: "table" },
  { name: "contact-side", w: 900, h: 1200, ground: "blush", seed: 16, motif: "arch" },
];

for (const img of images) {
  const svg = svgWrapper(img.w, img.h, img.ground, img.seed, img.motif, img.accent, img.heartOpts);
  writeFileSync(new URL(`${img.name}.svg`, OUT), svg, "utf8");
}

console.log(`Generated ${images.length} decor images in public/images/`);
