import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { heroScroll } from "../../lib/sceneState";
import { pointerState } from "../../lib/webgl";
import { useInViewport } from "../../hooks/useInViewport";
import { ParticleField } from "./ParticleField";

/* ---------------------------------- rigs ---------------------------------- */

function CameraRig({ mobile }: { mobile: boolean }) {
  const look = useRef(new THREE.Vector3(mobile ? 0 : 0.5, 0, 0));
  useFrame((state, delta) => {
    const p = heroScroll.progress;
    const cam = state.camera;
    const baseY = mobile ? 0.55 : 0.45;
    const baseZ = mobile ? 10.6 : 8.6;
    const tx = pointerState.x * (mobile ? 0.25 : 0.6);
    const ty = baseY + pointerState.y * 0.32 + p * 1.35;
    const tz = baseZ - p * 2.9;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, tx, 2.4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, ty, 2.4, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, tz, 2.4, delta);
    look.current.y = THREE.MathUtils.damp(look.current.y, p * -0.4, 2.4, delta);
    cam.lookAt(look.current);
  });
  return null;
}

/* ------------------------------- structure -------------------------------- */

const BLOCK_COUNT = 9;

function Structure({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const core = useRef<THREE.Group>(null!);
  const satellite = useRef<THREE.Mesh>(null!);
  const disc = useRef<THREE.Mesh>(null!);

  const blocks = useMemo(
    () =>
      Array.from({ length: mobile ? 5 : BLOCK_COUNT }, (_, i) => {
        const a = (i / BLOCK_COUNT) * Math.PI * 2 + 0.35;
        const r = 3.15 + (i % 3) * 0.35;
        return {
          position: [
            Math.cos(a) * r,
            -1.4 + (i % 5) * 0.72,
            Math.sin(a) * r * 0.85,
          ] as [number, number, number],
          scale: 0.24 + (i % 4) * 0.09,
          speed: 1.4 + (i % 3) * 0.5,
        };
      }),
    [mobile]
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = heroScroll.progress;
    const g = group.current;

    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      t * 0.1 + p * 1.5 + pointerState.x * 0.18,
      2.2,
      delta
    );
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      -0.06 - pointerState.y * 0.1 + p * 0.28,
      2.2,
      delta
    );
    g.position.y = THREE.MathUtils.damp(g.position.y, -p * 1.15, 2.6, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1 - p * 0.15, 2.6, delta));

    ringA.current.rotation.x = Math.sin(t * 0.16) * 0.24;
    ringB.current.rotation.y = Math.cos(t * 0.13) * 0.3;
    core.current.rotation.y = t * 0.12;
    disc.current.rotation.z = t * 0.06;

    const a = t * 0.45;
    satellite.current.position.set(
      Math.cos(a) * 2.62,
      Math.sin(a * 0.6) * 0.35,
      Math.sin(a) * 2.62
    );
  });

  return (
    <group
      ref={group}
      position={[mobile ? 0 : 1.8, mobile ? 0.55 : 0.15, 0]}
      scale={mobile ? 0.7 : 1}
    >
      {/* Core monolith — brushed metal */}
      <group ref={core}>
        <RoundedBox args={[1.35, 1.85, 1.35]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#b9b9c0" metalness={1} roughness={0.3} envMapIntensity={1.25} />
        </RoundedBox>
        <RoundedBox args={[1.36, 0.06, 1.36]} radius={0.02} position={[0, 0.32, 0]}>
          <meshStandardMaterial color="#0c0c0e" metalness={0.9} roughness={0.28} envMapIntensity={1.1} />
        </RoundedBox>
        <RoundedBox args={[1.36, 0.06, 1.36]} radius={0.02} position={[0, -0.32, 0]}>
          <meshStandardMaterial color="#0c0c0e" metalness={0.9} roughness={0.28} envMapIntensity={1.1} />
        </RoundedBox>
      </group>

      {/* Gyro rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.3, 0]}>
        <torusGeometry args={[2.18, 0.045, 24, 128]} />
        <meshStandardMaterial color="#cfcfd6" metalness={1} roughness={0.22} envMapIntensity={1.3} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.6, -0.4, 0.2]}>
        <torusGeometry args={[2.62, 0.028, 24, 128]} />
        <meshStandardMaterial color="#3c3c44" metalness={1} roughness={0.35} envMapIntensity={1} />
      </mesh>

      {/* Ember accent orbit */}
      <mesh rotation={[Math.PI / 2.6, -0.4, 0.2]}>
        <torusGeometry args={[2.62, 0.006, 8, 128]} />
        <meshBasicMaterial color="#C8102E" toneMapped={false} />
      </mesh>
      <mesh ref={satellite}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#FF3B47" toneMapped={false} />
      </mesh>

      {/* Glass lens */}
      <mesh ref={disc} rotation={[Math.PI / 2.1, 0, 0.4]} position={[0, 0.9, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.07, 56]} />
        {mobile ? (
          <meshPhysicalMaterial
            color="#dfe3ea"
            metalness={0.1}
            roughness={0.08}
            transparent
            opacity={0.22}
            envMapIntensity={1.4}
          />
        ) : (
          <meshPhysicalMaterial
            color="#e8ecf2"
            transmission={0.95}
            thickness={1.1}
            roughness={0.06}
            ior={1.45}
            envMapIntensity={1.3}
          />
        )}
      </mesh>

      {/* Floating architecture blocks */}
      {blocks.map((b, i) => (
        <Float
          key={i}
          speed={b.speed}
          rotationIntensity={0.5}
          floatIntensity={0.8}
          position={b.position}
        >
          <RoundedBox args={[b.scale, b.scale, b.scale]} radius={0.03}>
            <meshStandardMaterial
              color={i % 3 === 0 ? "#2e1b20" : "#a9a9b2"}
              metalness={1}
              roughness={0.3 + (i % 3) * 0.08}
              envMapIntensity={1.15}
            />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
}

/* --------------------------------- scene ---------------------------------- */

export function HeroScene({ mobile }: { mobile: boolean }) {
  const { ref, inView } = useInViewport<HTMLDivElement>("0px");
  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, mobile ? 1.3 : 1.7]}
        camera={{ position: [0, 0.45, mobile ? 10.6 : 8.6], fov: 38, near: 0.1, far: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
      <color attach="background" args={["#fcfbf9"]} />
      <fog attach="fog" args={["#fcfbf9", 9.5, 24]} />

      {/* Cinematic studio lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 7, 4]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-6, 3, -5]} intensity={1.6} color="#ffd9c8" />
      <directionalLight position={[0, -4, 3]} intensity={0.3} color="#9db1ff" />
      <pointLight position={[-3, -1.4, 2.5]} intensity={2.4} distance={9} color="#C8102E" />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="circle" intensity={3.2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="rect" intensity={1.6} position={[-5, 1, -1]} scale={[3, 0.8]} color="#cfd8e8" />
          <Lightformer form="rect" intensity={1.4} position={[5, -1, 0]} scale={[3, 0.8]} color="#ffd9c8" />
          <Lightformer form="rect" intensity={0.7} position={[0, -5, 2]} scale={[4, 1]} color="#8a93a8" />
        </group>
      </Environment>

      <CameraRig mobile={mobile} />
      <Structure mobile={mobile} />
      <ParticleField count={mobile ? 90 : 230} />

      <gridHelper
        args={[36, 36, "#cbb9bd", "#e6dcdf"]}
        position={[0, -2.45, 0]}
        material-transparent
        material-opacity={0.85}
      />
      <ContactShadows
        position={[0, -2.44, 0]}
        scale={17}
        blur={3}
        far={4.4}
        opacity={0.28}
        color="#160a0d"
      />
      </Canvas>
    </div>
  );
}
