"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Fog, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Choreography } from "./choreography";
import { Dust } from "./dust";
import { readScenePalette } from "./palette";
import { poses, type Pose } from "./poses";
import { Sculpture } from "./sculpture";
import { Journey } from "./journey/journey";

/** Soft studio reflections, generated in memory (no files to download). */
function StudioLighting({ palette, lights = true }: { palette: ReturnType<typeof readScenePalette>; lights?: boolean }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // Three.js scene objects are mutable by design; this is how R3F scenes are configured.
    /* eslint-disable react-hooks/immutability */
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    if (lights) scene.fog = new Fog(palette.fog, 7, 19);
    return () => {
      env.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
    /* eslint-enable react-hooks/immutability */
  }, [gl, scene, palette, lights]);
  if (!lights) return null;
  return (
    <>
      <hemisphereLight args={[palette.lightKey, palette.coffee, 0.7]} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color={palette.lightKey} />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color={palette.lightFill} />
      <pointLight position={[-2, 1.5, 4]} intensity={6} distance={12} color={palette.lightFill} />
    </>
  );
}

/** Feeds scroll position and pointer into refs, and the veil opacity into CSS. */
function Driver({
  choreography,
  targetRef,
  scrollRef,
  animate,
  onVeil,
}: {
  choreography: Choreography;
  targetRef: React.RefObject<Pose>;
  scrollRef: React.RefObject<number>;
  animate: boolean;
  onVeil: (v: number) => void;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const veil = useRef(-1);
  const last = useRef(-1);
  useFrame(() => {
    const y = window.scrollY;
    if (y === last.current && animate) return;
    last.current = y;
    scrollRef.current = y;
    targetRef.current = choreography.poseAt(y);
    const v = Math.round(targetRef.current.veil * 100) / 100;
    if (v !== veil.current) {
      veil.current = v;
      onVeil(v);
    }
  });
  // In reduced-motion mode the canvas renders on demand: redraw on scroll.
  useEffect(() => {
    if (animate) return;
    const onScroll = () => invalidate(2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [animate, invalidate]);
  return null;
}

export default function Experience({ reduced, onVeil, onReady }: { reduced: boolean; onVeil: (v: number) => void; onReady: () => void }) {
  const pathname = usePathname();
  const journey = pathname === "/";
  const palette = useMemo(() => readScenePalette(), []);
  const choreography = useMemo(() => new Choreography(), []);
  const target = useRef<Pose>(poses.hero);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [narrow] = useState(() => window.matchMedia("(max-width: 899px), (pointer: coarse)").matches);
  const [dpr, setDpr] = useState<[number, number]>(narrow ? [1, 1.5] : [1, 1.75]);
  const animate = !reduced;

  // Re-read section positions after navigation and whenever layout changes.
  useEffect(() => {
    const measure = () => {
      choreography.measure();
      target.current = choreography.poseAt(window.scrollY);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const raf = requestAnimationFrame(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [choreography, pathname]);

  useEffect(() => {
    if (journey) onVeil(narrow ? 0.4 : 0.08);
  }, [journey, narrow, onVeil]);

  useEffect(() => {
    if (!animate || narrow) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate, narrow]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0, 7.2], fov: 38, near: 0.1, far: 40 }}
      gl={{ antialias: !narrow, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady()}
      aria-hidden
    >
      <AdaptiveResolution onLow={() => setDpr([1, 1])} enabled={animate} />
      <StudioLighting palette={palette} lights={!journey} />
      {journey ? (
        <Journey palette={palette} animate={animate} detail={narrow ? "low" : "high"} />
      ) : (
        <>
          <Driver choreography={choreography} targetRef={target} scrollRef={scroll} animate={animate} onVeil={onVeil} />
          <Sculpture palette={palette} targetRef={target} pointerRef={pointer} animate={animate} detail={narrow ? "low" : "high"} />
          <Dust palette={palette} count={narrow ? 260 : 900} scrollRef={scroll} animate={animate} />
        </>
      )}
    </Canvas>
  );
}

/** If frames are consistently slow, drop to 1x pixel ratio once. */
function AdaptiveResolution({ onLow, enabled }: { onLow: () => void; enabled: boolean }) {
  const samples = useRef<number[]>([]);
  const done = useRef(false);
  useFrame((_, delta) => {
    if (!enabled || done.current) return;
    samples.current.push(delta);
    if (samples.current.length < 90) return;
    const avg = samples.current.reduce((a, b) => a + b, 0) / samples.current.length;
    samples.current = [];
    if (avg > 1 / 40) {
      done.current = true;
      onLow();
    }
  });
  return null;
}
