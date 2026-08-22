import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useSceneClock } from "../../hooks/useSceneClock";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  size?: number;
  opacity?: number;
  color?: string;
  drift?: number;
}

/** A sparse, atmospheric field of slow-drifting points. */
export function ParticleField({
  count = 220,
  radius = 9,
  size = 0.035,
  opacity = 0.5,
  color = "#84848e",
  drift = 0.018,
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null!);
  // Continuous clock — survives the canvas frameloop pause/resume, so the
  // drift keeps the same angular speed after scrolling the field back in.
  const sceneTime = useSceneClock();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.35) * 7;
      arr[i * 3] = Math.cos(theta) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r - 2;
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    ref.current.rotation.y = sceneTime.advance(delta) * drift;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
