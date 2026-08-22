import * as THREE from "three";
import { technologyLogos } from "../data/technologyLogos";

/**
 * Build a THREE.CanvasTexture for a technology brand logo synchronously from
 * its embedded SVG path data. No async fetch — icons always render.
 */
const cache = new Map<string, THREE.CanvasTexture>();

export function getLogoTexture(id: string, size = 256): THREE.CanvasTexture | null {
  const cached = cache.get(id);
  if (cached) return cached;

  const d = technologyLogos[id];
  if (!d) return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  try {
    const path = new Path2D(d);
    // The SVG viewBox is 24x24 — scale to canvas pixels.
    const s = size / 24;
    ctx.scale(s, s);
    ctx.fillStyle = "#ffffff";
    ctx.fill(path);
  } catch {
    return null;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  cache.set(id, tex);
  return tex;
}