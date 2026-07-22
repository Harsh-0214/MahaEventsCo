// Generates the placeholder final-reveal image: a letter board reading
// "WILL YOU MARRY ME" nestled in white roses and candlelight. Swap
// public/reveal.webp with real photography later (same filename).
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = fileURLToPath(new URL("../public/reveal.webp", import.meta.url));

const W = 1600;
const H = 1000;
const CREAM = "#EDE6D6";
const GOLD = "#C9A66B";
const SAGE = "#8A9A7B";
const PLUM = "#4A2C33";

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rand = seededRand(42);

function petal(cx, cy, r, rot, opacity) {
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(r * 0.6).toFixed(1)}" ry="${(r * 0.36).toFixed(1)}" fill="${CREAM}" opacity="${opacity}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
}

function rose(cx, cy, r, opacity = 0.96) {
  let s = `<g>`;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * 360 + rand() * 16;
    s += petal(cx, cy, r, angle, opacity);
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.2).toFixed(1)}" fill="#F7F1E4" opacity="${opacity}"/>`;
  s += `</g>`;
  return s;
}

function candle(x, y, h, flicker) {
  return `
    <rect x="${x - 5}" y="${y}" width="10" height="${h}" rx="5" fill="#F4EDE0" opacity="0.95"/>
    <ellipse cx="${x}" cy="${y - 6}" rx="${4 * flicker}" ry="${7 * flicker}" fill="${GOLD}"/>
    <ellipse cx="${x}" cy="${y - 6}" rx="${16 * flicker}" ry="${22 * flicker}" fill="${GOLD}" opacity="0.22" filter="url(#blurGlow)"/>
  `;
}


function buildSVG() {
  let s = "";
  s += `<rect width="${W}" height="${H}" fill="url(#bg)"/>`;

  // ambient background bokeh
  for (let i = 0; i < 22; i++) {
    const bx = rand() * W;
    const by = rand() * H * 0.7;
    s += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(8 + rand() * 14).toFixed(1)}" fill="${GOLD}" opacity="${(0.06 + rand() * 0.08).toFixed(2)}" filter="url(#blurGlow)"/>`;
  }

  // large rose clusters framing the board
  const roseSpots = [
    [W * 0.12, H * 0.62, 110],
    [W * 0.22, H * 0.82, 90],
    [W * 0.06, H * 0.4, 80],
    [W * 0.88, H * 0.6, 110],
    [W * 0.78, H * 0.82, 92],
    [W * 0.94, H * 0.4, 78],
    [W * 0.32, H * 0.92, 70],
    [W * 0.68, H * 0.92, 70],
  ];
  for (const [x, y, r] of roseSpots) s += rose(x, y, r);

  // eucalyptus sprigs along the top edge
  for (let i = 0; i < 9; i++) {
    const ex = lerpN(W * 0.1, W * 0.9, i / 8);
    const ey = H * (0.06 + rand() * 0.05);
    const len = 46 + rand() * 20;
    s += `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${len}" ry="${len * 0.28}" fill="${SAGE}" opacity="0.55" transform="rotate(${(i * 22 - 90).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)})"/>`;
  }

  // letter board
  const boardW = W * 0.42;
  const boardH = H * 0.24;
  const boardX = W / 2 - boardW / 2;
  const boardY = H * 0.42;
  s += `<rect x="${boardX}" y="${boardY}" width="${boardW}" height="${boardH}" rx="6" fill="${PLUM}" opacity="0.94"/>`;
  s += `<rect x="${boardX}" y="${boardY}" width="${boardW}" height="${boardH}" rx="6" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.5"/>`;

  // candles along the base
  const candleXs = [0.2, 0.32, 0.44, 0.56, 0.68, 0.8];
  for (const cx of candleXs) {
    const flicker = 0.85 + rand() * 0.3;
    s += candle(W * cx, H * 0.86, 40 + rand() * 20, flicker);
  }

  // warm glow rising behind the board
  s += `<ellipse cx="${W / 2}" cy="${boardY + boardH / 2}" rx="${boardW * 0.9}" ry="${boardH * 1.3}" fill="${GOLD}" opacity="0.22" filter="url(#blurGlow)"/>`;

  // vignette
  s += `<rect width="${W}" height="${H}" fill="url(#vig)"/>`;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="75%">
        <stop offset="0%" stop-color="${CREAM}"/>
        <stop offset="55%" stop-color="#DCC9A8"/>
        <stop offset="100%" stop-color="${PLUM}"/>
      </radialGradient>
      <radialGradient id="vig" cx="50%" cy="46%" r="72%">
        <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
      </radialGradient>
      <filter id="blurGlow"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    ${s}
  </svg>`;
}

function lerpN(a, b, t) {
  return a + (b - a) * t;
}

await sharp(Buffer.from(buildSVG())).webp({ quality: 82 }).toFile(OUT);
console.log("Generated public/reveal.webp");
