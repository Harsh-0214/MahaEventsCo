// Generates rich, brand-consistent botanical illustrations for the prototype —
// a confident stationery-illustration style (dense florals, gold linework,
// deep jewel-toned grounds) rather than an attempt at fake photography.
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

const TONES = {
  olive: { bg: ["#3a4326", "#1c2113"], petal: "#f4ede3", petal2: "#c9a469", line: "#c9a469", deep: "#12150c" },
  ink: { bg: ["#332a20", "#191410"], petal: "#e8dcc8", petal2: "#b08d57", line: "#c9a469", deep: "#0f0c09" },
  gold: { bg: ["#7a5a28", "#40300f"], petal: "#f4ede3", petal2: "#5f6b41", line: "#f4ede3", deep: "#241a0a" },
  rose: { bg: ["#5c342c", "#2c1815"], petal: "#f0ddc4", petal2: "#c9a469", line: "#e8b45a", deep: "#1a0f0d" },
  taupe: { bg: ["#544a37", "#2c261b"], petal: "#f4ede3", petal2: "#8a9767", line: "#c9a469", deep: "#181510" },
};

function flower(cx, cy, r, petalColor, centerColor, petals, rand) {
  let s = `<g>`;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 + rand() * 0.25;
    const px = cx + Math.cos(angle) * r * 0.6;
    const py = cy + Math.sin(angle) * r * 0.6;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r * 0.62).toFixed(1)}" ry="${(r * 0.38).toFixed(1)}" fill="${petalColor}" opacity="0.96" transform="rotate(${(angle * 180) / Math.PI} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.36).toFixed(1)}" fill="${centerColor}"/>`;
  s += `</g>`;
  return s;
}

function leaf(cx, cy, len, angleDeg, color, opacity) {
  return `<path d="M ${cx} ${cy} Q ${cx + len * 0.3} ${cy - len * 0.5} ${cx + len} ${cy} Q ${cx + len * 0.3} ${cy + len * 0.5} ${cx} ${cy} Z" fill="${color}" opacity="${opacity}" transform="rotate(${angleDeg} ${cx} ${cy})"/>`;
}

function cluster(cx, cy, scale, tone, rand) {
  let s = "";
  const leafCount = 5 + Math.floor(rand() * 3);
  for (let i = 0; i < leafCount; i++) {
    const a = rand() * 360;
    const len = scale * (0.55 + rand() * 0.5);
    s += leaf(
      cx + (rand() - 0.5) * scale * 0.6,
      cy + (rand() - 0.5) * scale * 0.6,
      len,
      a,
      i % 2 ? tone.petal2 : tone.line,
      0.7 + rand() * 0.15,
    );
  }
  const flowerCount = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < flowerCount; i++) {
    const fx = cx + (rand() - 0.5) * scale * 0.9;
    const fy = cy + (rand() - 0.5) * scale * 0.9;
    const fr = scale * (0.16 + rand() * 0.14);
    s += flower(fx, fy, fr, i % 2 ? tone.petal : tone.petal2, tone.deep, 6, rand);
  }
  return s;
}

function grainFilter(id) {
  return `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/></filter>`;
}

function archMotif(w, h, tone, rand) {
  const cx = w / 2;
  const baseY = h * 0.92;
  const archW = w * 0.58;
  const archTopY = h * 0.16;
  const r = archW / 2;
  const strokeW = Math.max(6, w * 0.008);
  let s = `<path d="M ${cx - r} ${baseY} L ${cx - r} ${archTopY + r} A ${r} ${r} 0 0 1 ${cx + r} ${archTopY + r} L ${cx + r} ${baseY}" fill="none" stroke="${tone.line}" stroke-width="${strokeW}" opacity="0.85"/>`;
  const unit = Math.min(w, h);
  for (let i = 0; i < 6; i++) {
    const t = i / 5;
    const angle = Math.PI + t * Math.PI;
    const px = cx + Math.cos(angle) * r;
    const py = archTopY + r - Math.sin(angle) * r;
    s += cluster(px, py, unit * 0.16, tone, rand);
  }
  s += cluster(cx, baseY - unit * 0.02, unit * 0.22, tone, rand);
  s += cluster(cx - r * 0.9, baseY - unit * 0.02, unit * 0.16, tone, rand);
  s += cluster(cx + r * 0.9, baseY - unit * 0.02, unit * 0.16, tone, rand);
  // corner sprays so the frame reads full even when cropped by object-cover
  s += cluster(w * 0.08, h * 0.14, unit * 0.16, tone, rand);
  s += cluster(w * 0.92, h * 0.14, unit * 0.16, tone, rand);
  s += cluster(w * 0.08, h * 0.5, unit * 0.13, tone, rand);
  s += cluster(w * 0.92, h * 0.5, unit * 0.13, tone, rand);
  return s;
}

function tableMotif(w, h, tone, rand) {
  const unit = Math.min(w, h);
  const lineY = h * 0.62;
  let s = `<rect x="0" y="${lineY}" width="${w}" height="${h - lineY}" fill="${tone.deep}" opacity="0.55"/>`;
  s += `<rect x="0" y="${lineY}" width="${w}" height="${Math.max(3, unit * 0.006)}" fill="${tone.line}" opacity="0.6"/>`;
  const positions = [0.16, 0.38, 0.62, 0.84];
  positions.forEach((p) => {
    const ch = unit * (0.22 + rand() * 0.1);
    const cw = unit * 0.028;
    const x = w * p;
    const flicker = 0.85 + rand() * 0.3;
    s += `<rect x="${x - cw / 2}" y="${lineY - ch}" width="${cw}" height="${ch}" rx="${cw / 2}" fill="${tone.petal}" opacity="0.95"/>`;
    s += `<ellipse cx="${x}" cy="${lineY - ch - unit * 0.02}" rx="${3.5 * flicker}" ry="${8 * flicker}" fill="#f0b74a"/>`;
    s += `<ellipse cx="${x}" cy="${lineY - ch - unit * 0.015}" rx="${unit * 0.03 * flicker}" ry="${unit * 0.045 * flicker}" fill="#f0b74a" opacity="0.22" filter="blur(2px)"/>`;
  });
  s += cluster(w * 0.28, lineY - unit * 0.01, unit * 0.2, tone, rand);
  s += cluster(w * 0.72, lineY - unit * 0.01, unit * 0.2, tone, rand);
  s += cluster(w * 0.5, h * 0.16, unit * 0.16, tone, rand);
  return s;
}

function sprigMotif(w, h, tone, rand) {
  const unit = Math.min(w, h);
  let s = "";
  s += cluster(w * 0.24, h * 0.22, unit * 0.34, tone, rand);
  s += cluster(w * 0.78, h * 0.34, unit * 0.28, tone, rand);
  s += cluster(w * 0.32, h * 0.72, unit * 0.3, tone, rand);
  s += cluster(w * 0.74, h * 0.82, unit * 0.24, tone, rand);
  s += cluster(w * 0.52, h * 0.5, unit * 0.2, tone, rand);
  return s;
}

function paisleyMotif(w, h, tone, rand) {
  const unit = Math.min(w, h);
  const cx = w / 2;
  const cy = h * 0.42;
  let s = "";
  for (let ring = 0; ring < 3; ring++) {
    const r = unit * (0.14 + ring * 0.13);
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${tone.line}" stroke-width="${Math.max(2, unit * 0.004)}" opacity="${0.5 - ring * 0.12}"/>`;
  }
  const petalCount = 10;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const r = unit * 0.34;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.85;
    s += flower(x, y, unit * (0.05 + rand() * 0.03), i % 2 ? tone.petal : tone.petal2, tone.deep, 6, rand);
  }
  s += flower(cx, cy, unit * 0.11, tone.petal, tone.deep, 8, rand);
  s += cluster(w * 0.14, h * 0.86, unit * 0.18, tone, rand);
  s += cluster(w * 0.86, h * 0.86, unit * 0.18, tone, rand);
  return s;
}

function svgWrapper(w, h, toneKey, seed, motif) {
  const rand = seededRand(seed);
  const tone = TONES[toneKey];
  const gradId = `g${seed}`;
  const vignetteId = `v${seed}`;
  const grainId = `n${seed}`;

  let motifMarkup = "";
  if (motif === "arch") motifMarkup = archMotif(w, h, tone, rand);
  else if (motif === "table") motifMarkup = tableMotif(w, h, tone, rand);
  else if (motif === "sprig") motifMarkup = sprigMotif(w, h, tone, rand);
  else if (motif === "paisley") motifMarkup = paisleyMotif(w, h, tone, rand);

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <linearGradient id="${gradId}" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stop-color="${tone.bg[0]}"/>
      <stop offset="100%" stop-color="${tone.bg[1]}"/>
    </linearGradient>
    <radialGradient id="${vignetteId}" cx="50%" cy="42%" r="72%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
    </radialGradient>
    ${grainFilter(grainId)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  ${motifMarkup}
  <rect width="${w}" height="${h}" fill="url(#${vignetteId})"/>
  <rect width="${w}" height="${h}" filter="url(#${grainId})" opacity="0.5"/>
</svg>`;
}

const images = [
  { name: "hero", w: 1920, h: 1280, tone: "ink", seed: 1, motif: "arch" },
  { name: "about-portrait", w: 900, h: 1100, tone: "olive", seed: 2, motif: "sprig" },
  { name: "service-wedding", w: 800, h: 1000, tone: "ink", seed: 3, motif: "arch" },
  { name: "service-southasian", w: 800, h: 1000, tone: "gold", seed: 4, motif: "paisley" },
  { name: "service-proposal", w: 800, h: 1000, tone: "rose", seed: 5, motif: "sprig" },
  { name: "service-backdrop", w: 800, h: 1000, tone: "olive", seed: 6, motif: "arch" },
  { name: "gallery-1", w: 800, h: 1100, tone: "olive", seed: 7, motif: "sprig" },
  { name: "gallery-2", w: 1000, h: 750, tone: "ink", seed: 8, motif: "arch" },
  { name: "gallery-3", w: 900, h: 900, tone: "rose", seed: 9, motif: "sprig" },
  { name: "gallery-4", w: 1400, h: 800, tone: "gold", seed: 10, motif: "paisley" },
  { name: "gallery-5", w: 900, h: 900, tone: "taupe", seed: 11, motif: "table" },
  { name: "gallery-6", w: 800, h: 1100, tone: "olive", seed: 12, motif: "sprig" },
  { name: "gallery-7", w: 900, h: 900, tone: "rose", seed: 13, motif: "table" },
  { name: "gallery-8", w: 900, h: 1000, tone: "gold", seed: 14, motif: "paisley" },
  { name: "gallery-9", w: 1400, h: 800, tone: "ink", seed: 15, motif: "table" },
  { name: "contact-side", w: 900, h: 1200, tone: "olive", seed: 16, motif: "arch" },
];

for (const img of images) {
  const svg = svgWrapper(img.w, img.h, img.tone, img.seed, img.motif);
  writeFileSync(new URL(`${img.name}.svg`, OUT), svg, "utf8");
}

console.log(`Generated ${images.length} decor images in public/images/`);
