import { CatmullRomCurve3, Color, Vector3 } from "three";
import { chapters } from "./chapters";

/** Distance between chapter sets along the flight. */
export const SPACING = 16;

/**
 * World layout of the journey. Each chapter set sits at an anchor that drifts
 * left, right, up and down as the path heads forward (-z). The camera stops
 * to the front-left of each set, so the set fills the right of the screen and
 * the page text keeps the left. Between stops the camera swings out and skims
 * past drifting shards, which hides the change of scene.
 */
export function buildJourney() {
  const anchors = chapters.map((_, i) => {
    const sway = Math.sin(i * 1.3) * 4.5;
    const lift = Math.cos(i * 0.9) * 1.6;
    return new Vector3(sway, lift, -i * SPACING);
  });

  const cam: Vector3[] = [];
  const look: Vector3[] = [];
  const thread: Vector3[] = [];
  anchors.forEach((a, i) => {
    cam.push(a.clone().add(new Vector3(-1.4, 0.35, 7.6)));
    look.push(a.clone().add(new Vector3(-1.9, 0, 0)));
    thread.push(a.clone().add(new Vector3(0.9, -1.35, 0.4)));
    const next = anchors[i + 1];
    if (next) {
      const mid = a.clone().lerp(next, 0.5);
      const side = i % 2 === 0 ? 1 : -1;
      cam.push(mid.clone().add(new Vector3(side * 2.2, 0.9, 7.6)));
      look.push(mid.clone().add(new Vector3(side * 0.6, 0.2, -4)));
      thread.push(mid.clone().add(new Vector3(1.6 - side * 1.2, 0.7 * side, -0.6)));
    }
  });
  // Lead-in before the first stop and a gentle rise after the last one.
  const first = anchors[0];
  const last = anchors[anchors.length - 1];
  thread.unshift(first.clone().add(new Vector3(-6, -3, 14)));
  thread.push(last.clone().add(new Vector3(3, 4, -14)));

  const camCurve = new CatmullRomCurve3(cam, false, "centripetal");
  const lookCurve = new CatmullRomCurve3(look, false, "centripetal");
  const threadCurve = new CatmullRomCurve3(thread, false, "centripetal");
  const tones = chapters.map((c) => new Color(c.tone));
  return { anchors, camCurve, lookCurve, threadCurve, tones };
}

export type Journey = ReturnType<typeof buildJourney>;

/** Curve parameter for a (fractional) chapter index: control points are evenly spaced, two per chapter gap. */
export function curveT(chapter: number) {
  const n = chapters.length - 1;
  return Math.min(1, Math.max(0, chapter / n));
}

/** Frame-rate independent smoothing, as used by ysuriadesign.co (lambda about 2.6 feels weighty). */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
