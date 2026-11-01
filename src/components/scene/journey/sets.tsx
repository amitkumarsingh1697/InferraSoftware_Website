"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  type Group,
  IcosahedronGeometry,
  type InstancedMesh,
  Object3D,
  OctahedronGeometry,
  TorusGeometry,
} from "three";
import type { ScenePalette } from "../palette";
import type { SetKind } from "./chapters";

interface SetProps {
  palette: ScenePalette;
  tone: Color;
  animate: boolean;
  detail: "high" | "low";
}

/** A dark, satin body outlined with fine glowing edges: the visual signature of every set. */
function Edged({
  geometry,
  palette,
  tone,
  position,
  rotation,
  scale,
  edgeOpacity = 0.85,
}: {
  geometry: BufferGeometry;
  palette: ScenePalette;
  tone: Color;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  edgeOpacity?: number;
}) {
  const edges = useMemo(() => new EdgesGeometry(geometry, 20), [geometry]);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={palette.coffee} roughness={0.55} metalness={0.6} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={tone} transparent opacity={edgeOpacity} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

function useSpin(speed: number, animate: boolean) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (animate && ref.current) ref.current.rotation.y += dt * speed;
  });
  return ref;
}

/** Why us: three faceted monoliths, the foundations. */
function Monoliths({ palette, tone, animate }: SetProps) {
  const ref = useSpin(0.06, animate);
  const geo = useMemo(() => new CylinderGeometry(0.55, 0.75, 1, 5, 1), []);
  return (
    <group ref={ref}>
      <Edged geometry={geo} palette={palette} tone={tone} position={[-1.3, -0.3, 0.2]} scale={[1, 3.4, 1]} rotation={[0, 0.3, 0.06]} />
      <Edged geometry={geo} palette={palette} tone={tone} position={[0.2, 0.2, -0.6]} scale={[1.15, 4.4, 1.15]} rotation={[0, 1.1, -0.04]} />
      <Edged geometry={geo} palette={palette} tone={tone} position={[1.5, -0.6, 0.5]} scale={[0.9, 2.6, 0.9]} rotation={[0, 2.2, 0.1]} />
    </group>
  );
}

/** Capabilities: five nodes in a ring around a bright core, joined by fine lines. */
function Constellation({ palette, tone, animate }: SetProps) {
  const ref = useSpin(0.12, animate);
  const nodes = useMemo(() => Array.from({ length: 5 }, (_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0] as [number, number, number];
  }), []);
  const lines = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((n, i) => {
      const m = nodes[(i + 1) % nodes.length];
      pts.push(...n, ...m, ...n, 0, 0, 0);
    });
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);
  const geo = useMemo(() => new IcosahedronGeometry(0.32, 0), []);
  return (
    <group ref={ref} rotation={[0.35, 0, 0]}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={tone} transparent opacity={0.55} toneMapped={false} />
      </lineSegments>
      {nodes.map((p, i) => (
        <Edged key={i} geometry={geo} palette={palette} tone={tone} position={p} />
      ))}
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color={tone} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color={tone} transparent opacity={0.12} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Featured (AI): a three-layer neural lattice. */
function Lattice({ tone, animate, detail }: SetProps) {
  const ref = useSpin(0.08, animate);
  const { points, lines } = useMemo(() => {
    const layers = detail === "high" ? [4, 6, 4] : [3, 4, 3];
    const pts: [number, number, number][][] = layers.map((n, li) =>
      Array.from({ length: n }, (_, k) => [(li - 1) * 1.8, (k - (n - 1) / 2) * 0.85, Math.sin(k + li) * 0.4] as [number, number, number]),
    );
    const seg: number[] = [];
    for (let li = 0; li < pts.length - 1; li++) for (const a of pts[li]) for (const b of pts[li + 1]) seg.push(...a, ...b);
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(seg, 3));
    return { points: pts.flat(), lines: g };
  }, [detail]);
  return (
    <group ref={ref}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={tone} transparent opacity={0.28} toneMapped={false} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={tone} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Approach: six square gates in a row, one per stage, that the thread runs through. */
function Gates({ palette, tone, animate }: SetProps) {
  const ref = useRef<Group>(null);
  const geo = useMemo(() => new TorusGeometry(1.5, 0.05, 6, 4), []);
  useFrame((state) => {
    if (!animate || !ref.current) return;
    ref.current.children.forEach((c, i) => {
      c.rotation.z = Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.4 + i * 0.6) * 0.08;
    });
  });
  return (
    <group ref={ref} rotation={[0, 0.5, 0]}>
      {Array.from({ length: 6 }, (_, i) => (
        <Edged key={i} geometry={geo} palette={palette} tone={tone} position={[0, 0, 2.5 - i * 1.4]} rotation={[0, 0, Math.PI / 4]} scale={1 - i * 0.06} />
      ))}
    </group>
  );
}

/** Work: three floating project frames with softly lit screens. */
function Frames({ palette, tone, animate }: SetProps) {
  const ref = useRef<Group>(null);
  const geo = useMemo(() => new BoxGeometry(2.4, 1.5, 0.08), []);
  useFrame((state) => {
    if (!animate || !ref.current) return;
    ref.current.children.forEach((c, i) => {
      c.position.y = [0.9, -0.2, -1.1][i] + Math.sin(state.clock.elapsedTime * 0.6 + i * 1.7) * 0.1;
    });
  });
  const layout: { p: [number, number, number]; r: [number, number, number] }[] = [
    { p: [-1.2, 0.9, 0.4], r: [0.05, 0.45, -0.04] },
    { p: [1.0, -0.2, -0.8], r: [-0.04, -0.3, 0.03] },
    { p: [-0.4, -1.1, 1.0], r: [0.08, 0.2, 0.02] },
  ];
  return (
    <group ref={ref}>
      {layout.map((l, i) => (
        <group key={i} position={l.p} rotation={l.r}>
          <Edged geometry={geo} palette={palette} tone={tone} />
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[2.2, 1.3]} />
            <meshBasicMaterial color={tone} transparent opacity={0.08 + i * 0.03} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Team: three columns of different heights, each crowned with a ring. */
function Pillars({ palette, tone, animate }: SetProps) {
  const ref = useSpin(0.05, animate);
  const col = useMemo(() => new CylinderGeometry(0.32, 0.32, 1, 6), []);
  const ring = useMemo(() => new TorusGeometry(0.5, 0.025, 6, 48), []);
  const cols: [number, number][] = [[-1.3, 3.2], [0, 4.0], [1.3, 2.7]];
  return (
    <group ref={ref}>
      {cols.map(([x, h], i) => (
        <group key={i} position={[x, -1.6, i === 1 ? -0.4 : 0.3]}>
          <Edged geometry={col} palette={palette} tone={tone} position={[0, h / 2, 0]} scale={[1, h, 1]} />
          <Edged geometry={ring} palette={palette} tone={tone} position={[0, h + 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      ))}
    </group>
  );
}

/** Technology: a tower of stacked blocks, assembled layer by layer. */
function Stack({ palette, tone, animate, detail }: SetProps) {
  const ref = useSpin(0.1, animate);
  const mesh = useRef<InstancedMesh>(null);
  const size = detail === "high" ? 4 : 3;
  const count = size * size * 4;
  const geo = useMemo(() => new BoxGeometry(0.42, 0.42, 0.42), []);
  const edges = useMemo(() => new EdgesGeometry(new BoxGeometry(size * 0.5, 4 * 0.5, size * 0.5)), [size]);
  const placed = useRef(false);
  useFrame(() => {
    if (placed.current || !mesh.current) return;
    const o = new Object3D();
    let k = 0;
    for (let y = 0; y < 4; y++)
      for (let x = 0; x < size; x++)
        for (let z = 0; z < size; z++) {
          o.position.set((x - (size - 1) / 2) * 0.5, (y - 1.5) * 0.5, (z - (size - 1) / 2) * 0.5);
          o.updateMatrix();
          mesh.current.setMatrixAt(k++, o.matrix);
        }
    mesh.current.instanceMatrix.needsUpdate = true;
    placed.current = true;
  });
  return (
    <group ref={ref} rotation={[0.25, 0.6, 0]}>
      <instancedMesh ref={mesh} args={[geo, undefined, count]}>
        <meshStandardMaterial color={palette.coffee} roughness={0.5} metalness={0.7} />
      </instancedMesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={tone} transparent opacity={0.8} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/** Insights: a fan of thin pages turning slowly. */
function Pages({ palette, tone, animate }: SetProps) {
  const ref = useRef<Group>(null);
  const geo = useMemo(() => new BoxGeometry(1.6, 2.2, 0.03), []);
  useFrame((state) => {
    if (!animate || !ref.current) return;
    ref.current.children.forEach((c, i) => {
      c.rotation.y = -0.9 + i * 0.36 + Math.sin(state.clock.elapsedTime * 0.35 + i * 0.4) * 0.06;
    });
  });
  return (
    <group ref={ref} rotation={[0.1, 0, 0.05]}>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} rotation={[0, -0.9 + i * 0.36, 0]}>
          <Edged geometry={geo} palette={palette} tone={tone} position={[0.8, 0, 0]} edgeOpacity={0.5 + i * 0.07} />
        </group>
      ))}
    </group>
  );
}

const registry: Record<Exclude<SetKind, "sculpture">, (p: SetProps) => React.ReactNode> = {
  monoliths: Monoliths,
  constellation: Constellation,
  lattice: Lattice,
  gates: Gates,
  frames: Frames,
  pillars: Pillars,
  stack: Stack,
  pages: Pages,
};

export function ChapterSet({ kind, ...props }: SetProps & { kind: Exclude<SetKind, "sculpture"> }) {
  const Component = registry[kind];
  return <Component {...props} />;
}

/** Drifting shards along the flight: they give parallax and hide the change between scenes. */
export function Shards({ palette, count, length, tone }: { palette: ScenePalette; count: number; length: number; tone: Color }) {
  const mesh = useRef<InstancedMesh>(null);
  const geo = useMemo(() => new OctahedronGeometry(0.35, 0), []);
  const placed = useRef(false);
  useFrame(() => {
    if (placed.current || !mesh.current) return;
    const o = new Object3D();
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      const z = 10 - rand() * (length + 20);
      const side = rand() < 0.5 ? -1 : 1;
      o.position.set(side * (3 + rand() * 9), (rand() - 0.5) * 9, z);
      o.rotation.set(rand() * 3, rand() * 3, rand() * 3);
      o.scale.setScalar(0.3 + rand() * 1.4);
      o.updateMatrix();
      mesh.current.setMatrixAt(i, o.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    placed.current = true;
  });
  return (
    <instancedMesh ref={mesh} args={[geo, undefined, count]}>
      <meshStandardMaterial color={palette.coffee} roughness={0.35} metalness={0.85} emissive={tone} emissiveIntensity={0.04} />
    </instancedMesh>
  );
}
