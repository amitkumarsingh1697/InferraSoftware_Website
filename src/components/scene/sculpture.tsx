"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type Group, type Mesh, type MeshPhysicalMaterial, MathUtils } from "three";
import type { ScenePalette } from "./palette";
import type { Pose } from "./poses";

/**
 * The sculpture: a ceramic core that breathes slowly, wrapped in bronze rings
 * and a few orbiting forms. `target` is the pose for the current scroll
 * position (targetRef); the group eases toward it every frame so motion stays fluid even
 * when scrolling is abrupt.
 */
export function Sculpture({
  palette,
  targetRef,
  pointerRef,
  animate,
  detail,
}: {
  palette: ScenePalette;
  targetRef: React.RefObject<Pose>;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  animate: boolean;
  detail: "high" | "low";
}) {
  const root = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const rings = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const shader = useRef<{ uniforms: { uTime: { value: number } } } | null>(null);

  const segments = detail === "high" ? 128 : 64;

  // Gentle organic displacement on the core, added to the standard physical material.
  const onBeforeCompile = useMemo(
    () => (s: Parameters<NonNullable<MeshPhysicalMaterial["onBeforeCompile"]>>[0]) => {
      s.uniforms.uTime = { value: 0 };
      s.vertexShader = s.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           float w = sin(position.x * 2.1 + uTime * 0.6) * sin(position.y * 2.4 + uTime * 0.45) * sin(position.z * 1.9 + uTime * 0.5);
           transformed += normal * w * 0.06;`,
        );
      shader.current = s as unknown as { uniforms: { uTime: { value: number } } };
    },
    [],
  );

  const satellites = useMemo(
    () =>
      [
        { r: 2.05, y: 0.35, size: 0.16, speed: 0.22, phase: 0.2, dark: true },
        { r: 2.4, y: -0.5, size: 0.11, speed: -0.16, phase: 2.1, dark: false },
        { r: 1.75, y: -0.15, size: 0.09, speed: 0.3, phase: 4.0, dark: true },
        { r: 2.75, y: 0.7, size: 0.07, speed: 0.12, phase: 5.2, dark: false },
        { r: 2.25, y: 0.05, size: 0.13, speed: -0.24, phase: 3.1, dark: false },
      ].slice(0, detail === "high" ? 5 : 3),
    [detail],
  );

  useFrame((state, delta) => {
    const g = root.current;
    const p = targetRef.current;
    if (!g || !p) return;
    const t = state.clock.elapsedTime;
    // Frame-rate independent easing toward the scroll pose.
    const k = animate ? 1 - Math.exp(-delta * 3.2) : 1;
    g.position.x = MathUtils.lerp(g.position.x, p.x, k);
    g.position.y = MathUtils.lerp(g.position.y, p.y + (animate ? Math.sin(t * 0.5) * 0.06 : 0), k);
    g.position.z = MathUtils.lerp(g.position.z, p.z, k);
    const s = MathUtils.lerp(g.scale.x, p.scale, k);
    g.scale.setScalar(s);

    const px = animate ? pointerRef.current.x : 0;
    const py = animate ? pointerRef.current.y : 0;
    g.rotation.y = MathUtils.lerp(g.rotation.y, p.spin * 0.6 + px * 0.25, k);
    g.rotation.x = MathUtils.lerp(g.rotation.x, p.tilt + py * 0.15, k);

    if (animate) {
      if (shader.current) shader.current.uniforms.uTime.value = t;
      if (core.current) core.current.rotation.y = t * 0.08;
      if (rings.current) {
        const [a, b, c] = rings.current.children;
        a.rotation.z = t * 0.12 + p.spin * 0.3;
        b.rotation.x = Math.PI / 2.4 + t * -0.09;
        b.rotation.z = p.spin * -0.25;
        c.rotation.y = t * 0.07;
      }
      if (orbit.current) orbit.current.rotation.y = t * 0.15 + p.spin * 0.2;
    }
  });

  return (
    <group ref={root}>
      <mesh ref={core} castShadow={false}>
        <icosahedronGeometry args={[1.12, detail === "high" ? 24 : 12]} />
        <meshPhysicalMaterial
          color={palette.ceramic}
          roughness={0.42}
          metalness={0}
          clearcoat={0.55}
          clearcoatRoughness={0.35}
          sheen={0.6}
          sheenColor={palette.lightFill}
          sheenRoughness={0.6}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {/* Inner coffee seed, seen through the gap between rings */}
      <mesh position={[0.95, -0.85, 0.6]}>
        <sphereGeometry args={[0.26, 48, 48]} />
        <meshPhysicalMaterial color={palette.coffee} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} />
      </mesh>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.15, 0.25, 0]}>
          <torusGeometry args={[1.62, 0.028, 24, segments * 2]} />
          <meshStandardMaterial color={palette.bronze} metalness={1} roughness={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, -0.6, 0.4]}>
          <torusGeometry args={[1.95, 0.016, 16, segments * 2]} />
          <meshStandardMaterial color={palette.gold} metalness={1} roughness={0.22} />
        </mesh>
        <mesh rotation={[0.35, 0, 0.9]}>
          <torusGeometry args={[2.35, 0.009, 12, segments * 2]} />
          <meshStandardMaterial color={palette.bronze} metalness={0.9} roughness={0.35} transparent opacity={0.8} />
        </mesh>
      </group>

      <group ref={orbit}>
        {satellites.map((s, i) => (
          <mesh key={i} position={[Math.cos(s.phase) * s.r, s.y, Math.sin(s.phase) * s.r]}>
            <sphereGeometry args={[s.size, 32, 32]} />
            {s.dark ? (
              <meshPhysicalMaterial color={palette.coffee} roughness={0.35} clearcoat={0.7} />
            ) : (
              <meshStandardMaterial color={palette.gold} metalness={1} roughness={0.25} />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}
