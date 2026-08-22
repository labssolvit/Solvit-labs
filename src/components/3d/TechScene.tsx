import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { technologies } from "../../data/technologies";
import { pointerState } from "../../lib/webgl";
import { useInViewport } from "../../hooks/useInViewport";
import { useSceneClock } from "../../hooks/useSceneClock";

const RINGS = [
  { radius: 1.55, tilt: [Math.PI / 2.3, 0.15, 0] as const, speed: 0.32 },
  { radius: 2.05, tilt: [Math.PI / 2.7, -0.3, 0.2] as const, speed: -0.22 },
  { radius: 2.55, tilt: [Math.PI / 2.1, 0.35, -0.15] as const, speed: 0.16 },
];

interface NodeInfo {
  ring: number;
  angle: number;
  mesh?: THREE.Mesh;
}

function Network({
  active,
  onHover,
}: {
  active: string | null;
  onHover: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  // Continuous clock — `state.clock.elapsedTime` resets to zero whenever the
  // canvas pauses (`frameloop="never"`), which would otherwise make the
  // network whip around fast when scrolling back into view.
  const sceneTime = useSceneClock();

  const nodes = useMemo<NodeInfo[]>(
    () =>
      technologies.map((_, i) => {
        const ring = i % 3;
        const slot = Math.floor(i / 3);
        return { ring, angle: (slot / 3) * Math.PI * 2 + ring * 0.7 };
      }),
    []
  );
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);
  const lineObj = useMemo(
    () =>
      new THREE.Line(
        lineGeo,
        new THREE.LineBasicMaterial({ color: "#C8102E", transparent: true, opacity: 0.85 })
      ),
    [lineGeo]
  );

  useFrame((_, delta) => {
    const t = sceneTime.advance(delta);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      t * 0.05 + pointerState.x * 0.12,
      2.4,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointerState.y * 0.07,
      2.4,
      delta
    );
    core.current.rotation.y += delta * 0.3;

    // Orbiting nodes
    nodes.forEach((n, i) => {
      const mesh = nodeRefs.current[i];
      if (!mesh) return;
      const ring = RINGS[n.ring];
      const a = n.angle + t * ring.speed;
      const x = Math.cos(a) * ring.radius;
      const z = Math.sin(a) * ring.radius;
      // Apply tilt
      const v = new THREE.Vector3(x, 0, z);
      const e = new THREE.Euler(ring.tilt[0], ring.tilt[1], ring.tilt[2]);
      v.applyEuler(e);
      mesh.position.copy(v);
      const isActive = technologies[i].id === active;
      const target = isActive ? 1.9 : 1;
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, target, 6, delta));
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        isActive ? 0.9 : 0.06,
        6,
        delta
      );
    });

    // Connection line to active node
    const activeIndex = technologies.findIndex((tech) => tech.id === active);
    const pos = lineGeo.attributes.position as THREE.BufferAttribute;
    if (activeIndex >= 0 && nodeRefs.current[activeIndex]) {
      const p = nodeRefs.current[activeIndex]!.position;
      pos.setXYZ(1, p.x, p.y, p.z);
      (lineObj.material as THREE.LineBasicMaterial).opacity = 0.85;
    } else {
      pos.setXYZ(1, 0, 0, 0);
      (lineObj.material as THREE.LineBasicMaterial).opacity = 0;
    }
    pos.needsUpdate = true;
  });

  return (
    <group ref={group}>
      {/* SOLVEX core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#c8c8d0" metalness={1} roughness={0.22} envMapIntensity={1.3} />
      </mesh>
      <mesh scale={1.42}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#C8102E" wireframe transparent opacity={0.16} toneMapped={false} />
      </mesh>

      {/* Orbit rings */}
      {RINGS.map((r, i) => (
        <mesh key={i} rotation={[r.tilt[0], r.tilt[1], r.tilt[2]]}>
          <torusGeometry args={[r.radius, 0.006, 8, 96]} />
          <meshBasicMaterial color="#3a3a42" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Technology nodes */}
      {technologies.map((tech, i) => (
        <mesh
          key={tech.id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(tech.id);
          }}
          onPointerOut={() => onHover(null)}
        >
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial
            color={tech.id === active ? "#FF3B47" : "#8f8f99"}
            metalness={1}
            roughness={0.25}
            emissive="#C8102E"
            emissiveIntensity={0.06}
            envMapIntensity={1.2}
          />
        </mesh>
      ))}

      <primitive object={lineObj} />
    </group>
  );
}

export function TechScene({
  active,
  onHover,
}: {
  active: string | null;
  onHover: (id: string | null) => void;
}) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.7, 6.4], fov: 34, near: 0.1, far: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
      <color attach="background" args={["#140a0d"]} />
      <fog attach="fog" args={["#140a0d", 8, 16]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <directionalLight position={[-5, 2, -4]} intensity={1.2} color="#ffd9c8" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 4, -6]} scale={[3, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[-4, 0, 0]} scale={[2, 0.7]} color="#cfd8e8" />
      </Environment>
      <Network active={active} onHover={onHover} />
      </Canvas>
    </div>
  );
}
