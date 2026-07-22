// Generates a placeholder 120-frame "dolly forward" sequence through a
// candlelit proposal setup, plus the final reveal image — tasteful
// limewash-cream + candle-glow stand-ins so the scroll journey runs before
// real photography/video frames exist. Swap files under public/frames/ and
// public/reveal.webp 1:1 with real assets later (same names, same count).
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const FRAMES_DIR = new URL("../public/frames/", import.meta.url);
mkdirSync(FRAMES_DIR, { recursive: true });

const W = 960;
const H = 540;
const FRAME_COUNT = 120;

const CREAM = "#EDE6D6";
const GOLD = "#C9A66B";
const SAGE = "#8A9A7B";
const MAUVE = "#B79AA0";
const PLUM = "#4A2C33";

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ease for the "camera" so motion doesn't feel linear
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function bloom(cx, cy, r, fill, opacity, blur) {
  return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" opacity="${opacity.toFixed(2)}" ${blur ? `filter="url(#blur${blur})"` : ""}/>`;
}

function petal(cx, cy, r, rot, fill, opacity) {
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(r * 0.6).toFixed(1)}" ry="${(r * 0.36).toFixed(1)}" fill="${fill}" opacity="${opacity.toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
}

function rose(cx, cy, r, fill, rand, opacity = 0.94) {
  let s = `<g>`;
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * 360 + rand() * 20;
    s += petal(cx, cy, r, angle, fill, opacity);
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r * 0.22).toFixed(1)}" fill="#F4EDE0" opacity="${(opacity * 0.96).toFixed(2)}"/>`;
  s += `</g>`;
  return s;
}

function candleFlame(x, y, flicker) {
  const h = 9 * flicker;
  return `
    <ellipse cx="${x}" cy="${y}" rx="${5 * flicker}" ry="${9 * flicker}" fill="${GOLD}" opacity="0.9"/>
    <ellipse cx="${x}" cy="${y}" rx="${14 * flicker}" ry="${20 * flicker}" fill="${GOLD}" opacity="0.16" filter="url(#blur2)"/>
    <ellipse cx="${x}" cy="${y - h * 0.3}" rx="${2.4 * flicker}" ry="${4.5 * flicker}" fill="#FFF3D6" opacity="0.95"/>
  `;
}

function frameSVG(i, count) {
  const rawT = i / (count - 1);
  const t = easeInOut(rawT);
  const rand = seededRand(1000 + i * 7);

  // camera "dolly forward": foreground elements scale up + spread outward,
  // background bokeh drifts slower (parallax), a warm glow builds toward the
  // end, foreshadowing the reveal.
  const spread = lerp(1, 2.6, t);
  const glowOpacity = lerp(0.08, 0.55, Math.pow(t, 1.6));
  const vignette = lerp(0.35, 0.14, t);

  let s = "";

  // background gradient (deep plum edges -> warm cream center, dims as we
  // "enter" the candlelight)
  s += `<rect width="${W}" height="${H}" fill="url(#bg)"/>`;

  // deep background bokeh (slow parallax layer)
  for (let i2 = 0; i2 < 10; i2++) {
    const bx = (0.5 + Math.sin(i2 * 12.9) * 0.42) * W;
    const by = (0.5 + Math.cos(i2 * 7.2) * 0.38) * H;
    const r = lerp(10, 16, rand()) * lerp(1, 1.3, t);
    s += bloom(bx, by, r, GOLD, 0.1 + rand() * 0.08, 3);
  }

  // mid-layer candle glows, spreading outward with the dolly
  const midCandles = 6;
  for (let i2 = 0; i2 < midCandles; i2++) {
    const angle = (i2 / midCandles) * Math.PI * 2 + 0.3;
    const baseR = lerp(120, 60, t * 0.4);
    const cx = W / 2 + Math.cos(angle) * baseR * spread * 0.5;
    const cy = H * 0.62 + Math.sin(angle) * baseR * 0.32 * spread * 0.5;
    const flicker = 0.85 + rand() * 0.3;
    s += candleFlame(cx, cy, flicker * lerp(0.7, 1.3, t));
  }

  // foreground floral silhouettes at left/right, ballooning larger and
  // closer as the camera dollies past them
  const leftX = lerp(-10, -40, t);
  const rightX = lerp(W + 10, W + 40, t);
  const foreR = lerp(55, 260, Math.pow(t, 1.3));
  const foreOpacity = lerp(0.94, 0.8, t);
  s += rose(leftX + foreR * 0.55, H * 0.4, foreR, CREAM, rand, foreOpacity);
  s += rose(leftX + foreR * 0.35, H * 0.78, foreR * 0.75, CREAM, rand, foreOpacity);
  s += rose(rightX - foreR * 0.55, H * 0.36, foreR, CREAM, rand, foreOpacity);
  s += rose(rightX - foreR * 0.38, H * 0.76, foreR * 0.8, CREAM, rand, foreOpacity);

  // eucalyptus sprigs, sage accent, drifting at mid-depth
  for (let i2 = 0; i2 < 5; i2++) {
    const ex = lerp(0.15, 0.85, i2 / 4) * W + Math.sin(t * 6 + i2) * 20;
    const ey = H * (0.15 + rand() * 0.15);
    const len = lerp(30, 46, t);
    s += `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${len}" ry="${len * 0.3}" fill="${SAGE}" opacity="0.5" transform="rotate(${(i2 * 35 + t * 20).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)})"/>`;
  }

  // dusty mauve depth accents near the base (drapery hint)
  s += `<ellipse cx="${W * 0.5}" cy="${H * 1.05}" rx="${W * 0.7 * spread * 0.4}" ry="${H * 0.22}" fill="${MAUVE}" opacity="0.18"/>`;

  // rising warm glow foreshadowing the reveal
  s += `<circle cx="${W / 2}" cy="${H * 0.58}" r="${lerp(40, 220, Math.pow(t, 1.4))}" fill="${GOLD}" opacity="${glowOpacity.toFixed(2)}" filter="url(#blur4)"/>`;

  // vignette
  s += `<rect width="${W}" height="${H}" fill="url(#vig)" opacity="${vignette.toFixed(2)}"/>`;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="46%" r="75%">
        <stop offset="0%" stop-color="${CREAM}"/>
        <stop offset="55%" stop-color="#DCC9A8"/>
        <stop offset="100%" stop-color="${PLUM}"/>
      </radialGradient>
      <radialGradient id="vig" cx="50%" cy="50%" r="72%">
        <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>
      <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
      <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
      <filter id="blur4"><feGaussianBlur stdDeviation="14"/></filter>
    </defs>
    ${s}
  </svg>`;
}

async function main() {
  const jobs = [];
  for (let i = 0; i < FRAME_COUNT; i++) {
    const svg = frameSVG(i, FRAME_COUNT);
    const name = `frame_${String(i).padStart(4, "0")}.webp`;
    jobs.push(
      sharp(Buffer.from(svg))
        .webp({ quality: 68 })
        .toFile(fileURLToPath(new URL(name, FRAMES_DIR))),
    );
  }
  await Promise.all(jobs);
  console.log(`Generated ${FRAME_COUNT} frames in public/frames/`);
}

main();
