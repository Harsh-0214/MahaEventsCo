// Generates elegant, brand-consistent SVG placeholder imagery for the prototype.
// Client photography replaces these files 1:1 (same filenames) when available.
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../public/images/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const PALETTES = {
  ivory: ["#f4ede3", "#e8dcc8"],
  olive: ["#7c8a56", "#5f6b41"],
  taupe: ["#d8cab4", "#cabca8"],
  gold: ["#c9a469", "#b08d57"],
  deep: ["#454e2f", "#2b2621"],
};

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function arch(cx, cy, w, h, stroke, opacity, sw = 2) {
  return `<path d="M ${cx - w / 2} ${cy + h / 2} L ${cx - w / 2} ${cy} A ${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${cy} L ${cx + w / 2} ${cy + h / 2}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function leafSprig(cx, cy, scale, rotate, color, opacity) {
  const leaves = [];
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const lx = cx + t * 18 * scale;
    const ly = cy - Math.sin(t * Math.PI) * 30 * scale;
    leaves.push(
      `<ellipse cx="${lx}" cy="${ly}" rx="${9 * scale}" ry="${4 * scale}" fill="${color}" opacity="${opacity}" transform="rotate(${-30 + t * 60} ${lx} ${ly})"/>`,
    );
  }
  return `<g transform="rotate(${rotate} ${cx} ${cy})">${leaves.join("")}</g>`;
}

function blob(cx, cy, r, color, opacity) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
}

function svgWrapper(w, h, palette, seed, motif) {
  const rand = seededRand(seed);
  const [c1, c2] = PALETTES[palette];
  const gradId = `g${seed}`;
  const softId = `soft${seed}`;

  let motifMarkup = "";
  if (motif === "arch") {
    motifMarkup = arch(w / 2, h * 0.62, w * 0.5, h * 0.4, "#8a9767", 0.5, 2);
    motifMarkup += leafSprig(w * 0.32, h * 0.42, 1.6, 20, "#5f6b41", 0.6);
    motifMarkup += leafSprig(w * 0.68, h * 0.42, 1.6, -20, "#5f6b41", 0.6);
  } else if (motif === "sprig") {
    for (let i = 0; i < 4; i++) {
      motifMarkup += leafSprig(
        w * (0.2 + rand() * 0.6),
        h * (0.25 + rand() * 0.5),
        1 + rand(),
        rand() * 360,
        i % 2 ? "#5f6b41" : "#b08d57",
        0.45 + rand() * 0.25,
      );
    }
  } else if (motif === "rings") {
    for (let i = 0; i < 3; i++) {
      const r = w * (0.15 + i * 0.12);
      motifMarkup += `<circle cx="${w / 2}" cy="${h / 2}" r="${r}" fill="none" stroke="#8a9767" stroke-width="1.5" opacity="${0.35 - i * 0.08}"/>`;
    }
  } else if (motif === "table") {
    motifMarkup = `<rect x="0" y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#e8dcc8" opacity="0.5"/>`;
    for (let i = 0; i < 3; i++) {
      motifMarkup += blob(w * (0.25 + i * 0.25), h * 0.68, 10 + rand() * 6, "#b08d57", 0.5);
    }
  }

  for (let i = 0; i < 6; i++) {
    motifMarkup += blob(
      rand() * w,
      rand() * h,
      w * 0.02 + rand() * w * 0.015,
      rand() > 0.5 ? "#b08d57" : "#8a9767",
      0.12 + rand() * 0.1,
    );
  }

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="${softId}" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  <rect width="${w}" height="${h}" fill="url(#${softId})"/>
  ${motifMarkup}
</svg>`;
}

const images = [
  { name: "hero", w: 1920, h: 1280, palette: "olive", seed: 1, motif: "arch" },
  { name: "about-portrait", w: 900, h: 1100, palette: "taupe", seed: 2, motif: "sprig" },
  { name: "service-wedding", w: 800, h: 1000, palette: "ivory", seed: 3, motif: "arch" },
  { name: "service-southasian", w: 800, h: 1000, palette: "gold", seed: 4, motif: "rings" },
  { name: "service-proposal", w: 800, h: 1000, palette: "taupe", seed: 5, motif: "sprig" },
  { name: "service-backdrop", w: 800, h: 1000, palette: "olive", seed: 6, motif: "arch" },
  { name: "gallery-1", w: 800, h: 1100, palette: "ivory", seed: 7, motif: "sprig" },
  { name: "gallery-2", w: 1000, h: 750, palette: "olive", seed: 8, motif: "arch" },
  { name: "gallery-3", w: 900, h: 900, palette: "taupe", seed: 9, motif: "sprig" },
  { name: "gallery-4", w: 1400, h: 800, palette: "gold", seed: 10, motif: "rings" },
  { name: "gallery-5", w: 900, h: 900, palette: "ivory", seed: 11, motif: "table" },
  { name: "gallery-6", w: 800, h: 1100, palette: "olive", seed: 12, motif: "sprig" },
  { name: "gallery-7", w: 900, h: 900, palette: "taupe", seed: 13, motif: "arch" },
  { name: "gallery-8", w: 900, h: 1000, palette: "gold", seed: 14, motif: "rings" },
  { name: "gallery-9", w: 1400, h: 800, palette: "ivory", seed: 15, motif: "table" },
];

for (const img of images) {
  const svg = svgWrapper(img.w, img.h, img.palette, img.seed, img.motif);
  writeFileSync(new URL(`${img.name}.svg`, OUT), svg, "utf8");
}

console.log(`Generated ${images.length} placeholder images in public/images/`);
