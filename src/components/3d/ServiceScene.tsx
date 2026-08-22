import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { pointerState } from "../../lib/webgl";
import { useInViewport } from "../../hooks/useInViewport";
import { useSceneClock } from "../../hooks/useSceneClock";

interface Slot {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: [number, number, number];
}

interface Formation {
  core: { pos: [number, number, number]; scale: number; spin: number };
  slots: Slot[];
}

const PANELS = 8;

const formation = (slots: Slot[], core: Formation["core"]): Formation => ({ slots, core });

const s = (
  x: number,
  y: number,
  z: number,
  sx: number,
  sy: number,
  sz: number,
  rx = 0,
  ry = 0,
  rz = 0
): Slot => ({ pos: [x, y, z], rot: [rx, ry, rz], scale: [sx, sy, sz] });

const FORMATIONS: Formation[] = [
  // 01 Web Development — stacked architecture
  formation(
    Array.from({ length: PANELS }, (_, i) => {
      const even = i % 2 === 0;
      return s(
        even ? -0.24 : 0.24,
        -1.35 + i * 0.4,
        0,
        1.5 - i * 0.06,
        0.2,
        1.5 - i * 0.06,
        0,
        i * 0.06,
        0
      );
    }),
    { pos: [0, 0.1, 0], scale: 0.42, spin: 0.35 }
  ),
  // 02 UI/UX — floating interface panels
  formation(
    Array.from({ length: PANELS }, (_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return s(
        (col - 1.5) * 1.06,
        row === 0 ? 0.62 : -0.62,
        (col % 2) * -0.25,
        0.92,
        0.58,
        0.05,
        -0.04,
        0.06,
        0
      );
    }),
    { pos: [0, 0, -1.1], scale: 0.5, spin: 0.2 }
  ),
  // 03 3D Web — spatial cluster
  formation(
    Array.from({ length: PANELS }, (_, i) => {
      const a = (i / PANELS) * Math.PI * 2;
      return s(
        Math.cos(a) * 1.75,
        Math.sin(i * 1.1) * 0.85,
        Math.sin(a) * 1.75,
        0.34,
        0.34,
        0.34,
        i * 0.4,
        i * 0.7,
        0
      );
    }),
    { pos: [0, 0, 0], scale: 1.15, spin: 0.7 }
  ),
  // 04 E-Commerce — product carousel
  formation(
    Array.from({ length: PANELS }, (_, i) => {
      const a = (i / PANELS) * Math.PI * 2;
      return s(
        Math.cos(a) * 1.85,
        -0.05 + Math.sin(i * 2.2) * 0.12,
        Math.sin(a) * 1.85,
        0.62,
        0.8,
        0.05,
        0,
        -a + Math.PI / 2,
        0
      );
    }),
    { pos: [0, -0.05, 0], scale: 0.8, spin: 0.25 }
  ),
  // 05 Custom Applications — connected network
  formation(
    Array.from({ length: PANELS }, (_, i) => {
      const inner = i >= 6;
      const a = ((i % 6) / 6) * Math.PI * 2 + (inner ? 0.5 : 0);
      const r = inner ? 0.95 : 1.7;
      return s(
        Math.cos(a) * r,
        inner ? (i === 6 ? 0.5 : -0.5) : Math.sin(i * 1.7) * 0.55,
        Math.sin(a) * r * 0.8,
        0.4,
        0.4,
        0.4,
        0,
        a,
        0
      );
    }),
    { pos: [0, 0, 0], scale: 0.9, spin: 0.5 }
  ),
  // 06 Performance & SEO — velocity line
  formation(
    Array.from({ length: PANELS }, (_, i) =>
      s(-2.5 + i * 0.72, (i % 2) * 0.14 - 0.07, -i * 0.5, 0.5, 0.72, 0.04, 0, 0.55, 0)
    ),
    { pos: [0, -0.95, 0], scale: 0.5, spin: 1.4 }
  ),
];

function MorphingStructure({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const panels = useRef<(THREE.Group | null)[]>([]);
  // Continuous clock — `state.clock.elapsedTime` resets to zero whenever the
  // canvas pauses (`frameloop="never"`), which would otherwise make the
  // structure whip around fast when scrolling back into view.
  const sceneTime = useSceneClock();

  useFrame((_, delta) => {
    const t = sceneTime.advance(delta);
    const f = FORMATIONS[active] ?? FORMATIONS[0];

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      t * 0.07 + pointerState.x * 0.14,
      2.4,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointerState.y * 0.08,
      2.4,
      delta
    );

    panels.current.forEach((p, i) => {
      if (!p) return;
      const target = f.slots[i];
      const k = 4.2;
      p.position.set(
        THREE.MathUtils.damp(p.position.x, target.pos[0], k, delta),
        THREE.MathUtils.damp(p.position.y, target.pos[1], k, delta),
        THREE.MathUtils.damp(p.position.z, target.pos[2], k, delta)
      );
      p.rotation.set(
        THREE.MathUtils.damp(p.rotation.x, target.rot[0], k, delta),
        THREE.MathUtils.damp(p.rotation.y, target.rot[1], k, delta),
        THREE.MathUtils.damp(p.rotation.z, target.rot[2], k, delta)
      );
      p.scale.set(
        THREE.MathUtils.damp(p.scale.x, target.scale[0], k, delta),
        THREE.MathUtils.damp(p.scale.y, target.scale[1], k, delta),
        THREE.MathUtils.damp(p.scale.z, target.scale[2], k, delta)
      );
    });

    core.current.position.y = THREE.MathUtils.damp(
      core.current.position.y,
      f.core.pos[1],
      4,
      delta
    );
    core.current.scale.setScalar(
      THREE.MathUtils.damp(core.current.scale.x, f.core.scale, 4, delta)
    );
    core.current.rotation.y += delta * f.core.spin;
    core.current.rotation.x += delta * f.core.spin * 0.35;
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial color="#c3c3cb" metalness={1} roughness={0.24} envMapIntensity={1.25} />
      </mesh>
      <mesh scale={0.78}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial color="#C8102E" wireframe transparent opacity={0.25} toneMapped={false} />
      </mesh>
      {Array.from({ length: PANELS }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            panels.current[i] = el;
          }}
        >
          <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.28}>
            <RoundedBox args={[1, 1, 1]} radius={0.045}>
              {i % 2 === 0 ? (
                <meshPhysicalMaterial
                  color="#dde2ea"
                  transmission={0.85}
                  thickness={0.8}
                  roughness={0.12}
                  ior={1.42}
                  envMapIntensity={1.2}
                />
              ) : (
                <meshStandardMaterial
                  color="#9d9da7"
                  metalness={1}
                  roughness={0.32}
                  envMapIntensity={1.1}
                />
              )}
            </RoundedBox>
          </Float>
        </group>
      ))}
    </group>
  );
}

export function ServiceScene({ active }: { active: number }) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.4, 5.6], fov: 34, near: 0.1, far: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
      <color attach="background" args={["#140a0d"]} />
      <fog attach="fog" args={["#140a0d", 7, 15]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 5, 4]} intensity={1.1} />
      <directionalLight position={[-5, 2, -4]} intensity={1.3} color="#ffd9c8" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, -6]} scale={[3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-4, 0, 0]} scale={[2, 0.7]} color="#cfd8e8" />
        <Lightformer form="rect" intensity={1} position={[4, -1, 1]} scale={[2, 0.7]} color="#ffd9c8" />
      </Environment>
      <MorphingStructure active={active} />
      </Canvas>
    </div>
  );
}
