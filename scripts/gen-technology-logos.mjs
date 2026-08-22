/**
 * One-off generator: extracts brand path data from public/technologies/*.svg
 * and writes src/data/technologyLogos.ts so logos render offline/synchronous.
 */
import { readFileSync, writeFileSync } from "node:fs";

const dir = "public/technologies";
const outFile = "src/data/technologyLogos.ts";

const files = {
  react: "react",
  typescript: "typescript",
  three: "three",
  next: "next",
  node: "node",
  postgres: "postgres",
  firebase: "firebase",
  aws: "aws",
  docker: "docker",
};

const lines = [];
for (const [key, file] of Object.entries(files)) {
  const svg = readFileSync(`${dir}/${file}.svg`, "utf8");
  const m = svg.match(/<path d="([^"]*)"/);
  if (!m) throw new Error(`No <path d> found in ${file}.svg`);
  lines.push(`  ${key}: ${JSON.stringify(m[1])},`);
}

const header = `/**
 * Brand SVG path data (Simple Icons, MIT) — extracted so the 3D orbiter can
 * draw logos synchronously from canvas textures (no async asset fetch).
 */
export const technologyLogos: Record<string, string> = {
`;

const footer = `};

/** Inline data-URI of the logo, for plain <img> usage (works in single-file builds). */
export function logoDataUri(id: string, color = "#ffffff"): string | null {
  const d = technologyLogos[id];
  if (!d) return null;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' +
    color +
    '"><path d="' +
    d +
    '"/></svg>';
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
`;

writeFileSync(outFile, header + lines.join("\n") + "\n" + footer);
console.log(`Wrote ${outFile} (${lines.length} entries)`);