import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { pointerState } from "../../lib/webgl";
import { useInViewport } from "../../hooks/useInViewport";
import { useSceneClock } from "../../hooks/useSceneClock";
import { ParticleField } from "./ParticleField";

function Artifact({ subdued }: { subdued: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  // Continuous clock — `state.clock.elapsedTime` resets to zero whenever the
  // canvas pauses (`frameloop="never"`), which would otherwise make the
  // artifact whip around fast when scrolling back into view.
  const sceneTime = useSceneClock();

  useFrame((_, delta) => {
    const t = sceneTime.advance(delta);
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      t * 0.12 + pointerState.x * 0.2,
      2.2,
      delta
    );
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointerState.y * 0.1, 2.2, delta);
    ring.current.rotation.z = t * 0.15;
  });

  return (
    <group ref={group}>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#c9c9d1"
          metalness={1}
          roughness={0.22}
          envMapIntensity={1.3}
        />
      </mesh>
      <mesh scale={1.55}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#C8102E" wireframe transparent opacity={subdued ? 0.1 : 0.16} toneMapped={false} />
      </mesh>

      {/* Orbit ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 128]} />
        <meshStandardMaterial color="#8b8b96" metalness={1} roughness={0.3} envMapIntensity={1.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.005, 8, 128]} />
        <meshBasicMaterial color="#C8102E" toneMapped={false} />
      </mesh>

      {/* Floating glass panels */}
      {[
        [-2.2, 0.9, -0.6],
        [2.3, -0.7, -0.4],
        [1.6, 1.5, -1.2],
      ].map((pos, i) => (
        <Float key={i} speed={1.4 + i * 0.3} rotationIntensity={0.3} floatIntensity={0.6} position={pos as [number, number, number]}>
          <RoundedBox args={[0.95, 0.6, 0.05]} radius={0.03}>
            <meshPhysicalMaterial
              color="#dfe3ea"
              transmission={0.85}
              thickness={0.8}
              roughness={0.1}
              ior={1.42}
              envMapIntensity={1.2}
            />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
}

/** Abstract technology artifact for the pricing hero and custom-project CTA. */
export function PricingScene({ subdued = false }: { subdued?: boolean }) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.3, 6], fov: 36, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <directionalLight position={[-5, 2, -4]} intensity={1.4} color="#ffd9c8" />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} position={[0, 4, -6]} scale={[3, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-4, 0, 0]} scale={[2, 0.7]} color="#cfd8e8" />
          <Lightformer form="rect" intensity={1} position={[4, -1, 1]} scale={[2, 0.7]} color="#ffd9c8" />
        </Environment>
        <Artifact subdued={subdued} />
        {!subdued && <ParticleField count={120} size={0.028} opacity={0.45} />}
      </Canvas>
    </div>
  );
}
