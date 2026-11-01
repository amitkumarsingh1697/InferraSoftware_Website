"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, type Points } from "three";
import type { ScenePalette } from "./palette";

/**
 * Fine golden dust spread through a deep volume. It drifts slowly and shifts
 * with scroll at a different rate from the sculpture, which gives the page its
 * sense of depth.
 */
export function Dust({ palette, count, scrollRef, animate }: { palette: ScenePalette; count: number; scrollRef: React.RefObject<number>; animate: boolean }) {
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const pos = new Float32Array(count * 3);
    // Deterministic pseudo-random spread so server and client match and reloads look the same.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 18;
      pos[i * 3 + 1] = (rand() - 0.5) * 26;
      pos[i * 3 + 2] = -rand() * 12 + 2;
    }
    g.setAttribute("position", new BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    const target = (scrollRef.current / vh) * 0.9;
    p.position.y = animate ? p.position.y + (target - p.position.y) * 0.08 : target;
    if (animate) p.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color={palette.gold} size={0.035} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
}
