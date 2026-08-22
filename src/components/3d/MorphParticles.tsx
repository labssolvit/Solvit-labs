import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { pointerState } from "../../lib/webgl";
import { useInViewport } from "../../hooks/useInViewport";
import { useSceneClock } from "../../hooks/useSceneClock";

/** Procedural morph targets — no VDB needed, computed on the fly. */
function buildShapes(n: number): Float32Array[] {
  const shapes: Float32Array[] = [];

  // 0 — Orbital ring
  {
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 1.75 + (Math.random() - 0.5) * 0.1;
      a[i * 3] = Math.cos(t) * r;
      a[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      a[i * 3 + 2] = Math.sin(t) * r;
    }
    shapes.push(a);
  }
  // 1 — Sphere (fibonacci)
  {
    const a = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const theta = golden * i;
      a[i * 3] = Math.cos(theta) * rad * 1.5;
      a[i * 3 + 1] = y * 1.5;
      a[i * 3 + 2] = Math.sin(theta) * rad * 1.5;
    }
    shapes.push(a);
  }
  // 2 — Cube frame (12 edges)
  {
    const a = new Float32Array(n * 3);
    const h = 1.15;
    const corners: [number, number, number][] = [
      [-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h],
      [-h, -h, h], [h, -h, h], [h, h, h], [-h, h, h],
    ];
    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    for (let i = 0; i < n; i++) {
      const [e0, e1] = edges[i % 12];
      const p0 = corners[e0];
      const p1 = corners[e1];
      const t = Math.random();
      a[i * 3] = p0[0] + (p1[0] - p0[0]) * t + (Math.random() - 0.5) * 0.04;
      a[i * 3 + 1] = p0[1] + (p1[1] - p0[1]) * t + (Math.random() - 0.5) * 0.04;
      a[i * 3 + 2] = p0[2] + (p1[2] - p0[2]) * t + (Math.random() - 0.5) * 0.04;
    }
    shapes.push(a);
  }
  // 3 — Double helix
  {
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const strand = i % 2;
      const t = (i / n) * Math.PI * 6;
      a[i * 3] = Math.cos(t + strand * Math.PI) * 1.1;
      a[i * 3 + 1] = -1.6 + (i / n) * 3.2;
      a[i * 3 + 2] = Math.sin(t + strand * Math.PI) * 1.1;
    }
    shapes.push(a);
  }
  // 4 — Torus knot
  {
    const a = new Float32Array(n * 3);
    const p = 2, q = 3;
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const r = 0.9 + 0.35 * Math.cos(q * t);
      a[i * 3] = r * Math.cos(p * t) * 1.35;
      a[i * 3 + 1] = 0.6 * Math.sin(q * t) * 1.35;
      a[i * 3 + 2] = r * Math.sin(p * t) * 1.35;
    }
    shapes.push(a);
  }
  // 5 — Grid disc
  {
    const a = new Float32Array(n * 3);
    const side = Math.ceil(Math.sqrt(n));
    for (let i = 0; i < n; i++) {
      const gx = (i % side) / (side - 1) - 0.5;
      const gz = Math.floor(i / side) / (side - 1) - 0.5;
      const d = Math.hypot(gx, gz);
      a[i * 3] = gx * 3.6;
      a[i * 3 + 1] = Math.sin(d * 9) * 0.12;
      a[i * 3 + 2] = gz * 3.6;
    }
    shapes.push(a);
  }
  return shapes;
}

const BASE = new THREE.Color("#8f8f99");
const EMBER = new THREE.Color("#FF3B47");

function Particles({ shape, count }: { shape: number; count: number }) {
  const points = useRef<THREE.Points>(null!);
  const velocity = useRef(0);
  const targets = useMemo(() => buildShapes(count), [count]);
  // Continuous clock — `state.clock.elapsedTime` resets to zero whenever the
  // canvas pauses (`frameloop="never"`), which would otherwise make the
  // cloud whip around fast when scrolling back into view.
  const sceneTime = useSceneClock();

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(targets[0]), 3)
    );
    return geometry;
  }, [targets]);

  useFrame((_, delta) => {
    const t = sceneTime.advance(delta);
    const target = targets[shape % targets.length];
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const k = Math.min(1, delta * 3.2);
    let moved = 0;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const wobble = Math.sin(t * 1.2 + i * 0.37) * 0.012;
      const dx = target[i3] + wobble - arr[i3];
      const dy = target[i3 + 1] + wobble - arr[i3 + 1];
      const dz = target[i3 + 2] - arr[i3 + 2];
      arr[i3] += dx * k;
      arr[i3 + 1] += dy * k;
      arr[i3 + 2] += dz * k;
      moved += Math.abs(dx) + Math.abs(dy);
    }
    pos.needsUpdate = true;

    // Color responds to motion energy (igloo's speed-tinted particles).
    velocity.current = THREE.MathUtils.lerp(velocity.current, moved / count, 0.08);
    const mix = THREE.MathUtils.clamp(velocity.current * 9, 0, 1);
    const mat = points.current.material as THREE.PointsMaterial;
    mat.color.lerpColors(BASE, EMBER, mix);

    points.current.rotation.y = t * 0.08 + pointerState.x * 0.15;
    points.current.rotation.x = -pointerState.y * 0.08;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.022}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#8f8f99"
      />
    </points>
  );
}

export function MorphParticles({ shape, mobile }: { shape: number; mobile: boolean }) {
  const count = mobile ? 550 : 1300;
  const { ref, inView } = useInViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 40, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <Particles shape={shape} count={count} />
      </Canvas>
    </div>
  );
}
