import { fileURLToPath } from "node:url";
import sharp from "sharp";

const svg = `<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" fill="#4A2C33"/>
  <text x="128" y="168" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="140" fill="#C9A66B">M</text>
</svg>`;

await sharp(Buffer.from(svg)).resize(32, 32).png().toFile(fileURLToPath(new URL("../app/icon.png", import.meta.url)));
console.log("Generated app/icon.png");
