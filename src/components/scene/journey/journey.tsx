"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, FogExp2, type Group, TubeGeometry, Vector3 } from "three";
import type { ScenePalette } from "../palette";
import type { Pose } from "../poses";
import { Sculpture } from "../sculpture";
import { chapters } from "./chapters";
import { buildJourney, curveT, damp, SPACING } from "./path";
import { ChapterProgress } from "./progress";
import { ChapterSet, Shards } from "./sets";

const STILL: Pose = { x: 0, y: 0, z: 0, scale: 1, spin: 0, tilt: 0, veil: 0 };

/**
 * The homepage as one camera flight. Scroll position becomes a fractional
 * chapter index; the camera eases along a spline through a 3D set for each
 * chapter, following a glowing gold thread, while fog and light take on each
 * chapter's colour grade.
 */
export function Journey({ palette, animate, detail, onChapter }: { palette: ScenePalette; animate: boolean; detail: "high" | "low"; onChapter?: (c: number) => void }) {
  const pathname = usePathname();
  const journey = useMemo(() => buildJourney(), []);
  const progress = useMemo(() => new ChapterProgress(), []);
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const invalidate = useThree((s) => s.invalidate);
  const current = useRef(0);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const still = useRef<Pose>(STILL);
  const stillPointer = useRef({ x: 0, y: 0 });
  const sets = useRef<Group>(null);
  const key = useRef<{ color: Color } | null>(null);
  const fog = useMemo(() => new FogExp2(palette.fog.clone(), 0.05), [palette]);
  const tone = useMemo(() => new Color(), []);
  const tmp = useMemo(() => ({ pos: new Vector3(), look: new Vector3() }), []);

  const threadGeo = useMemo(() => new TubeGeometry(journey.threadCurve, detail === "high" ? 900 : 400, 0.016, 6, false), [journey, detail]);
  const glowGeo = useMemo(() => new TubeGeometry(journey.threadCurve, detail === "high" ? 600 : 300, 0.07, 6, false), [journey, detail]);

  const dust = useMemo(() => {
    const count = detail === "high" ? 2600 : 900;
    const pos = new Float32Array(count * 3);
    let seed = 3;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const length = (chapters.length - 1) * SPACING;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 26;
      pos[i * 3 + 1] = (rand() - 0.5) * 14;
      pos[i * 3 + 2] = 14 - rand() * (length + 28);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    return g;
  }, [detail]);

  useEffect(() => {
    // Three.js scene objects are mutable by design; this is how R3F scenes are configured.
    /* eslint-disable react-hooks/immutability */
    scene.fog = fog;
    return () => {
      scene.fog = null;
    };
    /* eslint-enable react-hooks/immutability */
  }, [scene, fog]);

  // Hand the camera back in its default spot when leaving the homepage.
  useEffect(
    () => () => {
      camera.position.set(0, 0, 7.2);
      camera.lookAt(0, 0, 0);
    },
    [camera],
  );

  useEffect(() => {
    const measure = () => {
      progress.measure();
      invalidate();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const onScroll = () => invalidate();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (animate) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [progress, pathname, animate, invalidate]);

  const lastReported = useRef(-1);
  useFrame((_, dt) => {
    const target = progress.chapterAt(window.scrollY);
    const step = Math.min(dt, 0.1);
    current.current = animate ? damp(current.current, target, 2.6, step) : Math.round(target);
    const c = current.current;

    const p = pointer.current;
    p.x = damp(p.x, animate ? p.tx : 0, 3.2, step);
    p.y = damp(p.y, animate ? p.ty : 0, 3.2, step);

    const t = curveT(c);
    journey.camCurve.getPoint(t, tmp.pos);
    journey.lookCurve.getPoint(t, tmp.look);
    camera.position.set(tmp.pos.x + p.x * 0.35, tmp.pos.y - p.y * 0.25, tmp.pos.z);
    camera.lookAt(tmp.look);

    // Colour grade: blend the two neighbouring chapter tones.
    const i = Math.floor(c);
    const f = c - i;
    const a = journey.tones[Math.min(i, journey.tones.length - 1)];
    const b = journey.tones[Math.min(i + 1, journey.tones.length - 1)];
    tone.copy(a).lerp(b, f);
    fog.color.copy(palette.fog).lerp(tone, 0.07);
    if (key.current) key.current.color.copy(tone);

    // Only draw the sets near the camera; fog hides the rest anyway.
    sets.current?.children.forEach((g, k) => {
      g.visible = Math.abs(k - c) < 2.2;
    });

    const rounded = Math.round(c * 20) / 20;
    if (onChapter && rounded !== lastReported.current) {
      lastReported.current = rounded;
      onChapter(c);
    }
  });

  return (
    <>
      <hemisphereLight args={[palette.lightKey, palette.coffee, 0.35]} />
      <directionalLight ref={(l) => { key.current = l; }} position={[6, 8, 6]} intensity={2.4} />
      <directionalLight position={[-6, -3, 4]} intensity={0.5} color={palette.lightFill} />

      <mesh geometry={threadGeo}>
        <meshBasicMaterial color={palette.gold} toneMapped={false} />
      </mesh>
      <mesh geometry={glowGeo}>
        <meshBasicMaterial color={palette.gold} transparent opacity={0.1} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      <group ref={sets}>
        {chapters.map((ch, k) => {
          const at = journey.anchors[k];
          return (
            <group key={ch.scene} position={at}>
              {ch.set === "sculpture" ? (
                <group scale={k === 0 ? 1 : 1.25}>
                  <Sculpture palette={palette} targetRef={still} pointerRef={stillPointer} animate={animate} detail={detail} />
                </group>
              ) : (
                <ChapterSet kind={ch.set} palette={palette} tone={journey.tones[k]} animate={animate} detail={detail} />
              )}
            </group>
          );
        })}
      </group>

      <Shards palette={palette} count={detail === "high" ? 160 : 60} length={(chapters.length - 1) * SPACING} tone={journey.tones[0]} />

      <points geometry={dust}>
        <pointsMaterial color={palette.gold} size={0.04} sizeAttenuation transparent opacity={0.7} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
}
