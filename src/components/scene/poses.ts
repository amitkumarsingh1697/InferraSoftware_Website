/**
 * Scroll choreography for the 3D sculpture.
 *
 * Any element with data-scene="<pose name>" becomes a stop. As the visitor
 * scrolls from one stop to the next, the sculpture glides between the two
 * poses. Add, remove or reorder sections freely: the choreography follows the
 * DOM. To change where the sculpture sits for a section, edit its pose here.
 *
 *   x, y, z  position in world units (x > 0 is the right-hand side)
 *   scale    overall size
 *   spin     extra rotation (radians) layered on the idle motion
 *   tilt     forward tilt (radians)
 *   veil     0 to 1: how strongly the page colour washes over the scene,
 *            raised where text sits close to the sculpture
 */
export interface Pose {
  x: number;
  y: number;
  z: number;
  scale: number;
  spin: number;
  tilt: number;
  veil: number;
}

const base: Pose = { x: 0, y: 0, z: 0, scale: 1, spin: 0, tilt: 0, veil: 0.35 };

export const poses: Record<string, Pose> = {
  hero: { ...base, x: 2.75, y: -0.1, scale: 0.85, veil: 0 },
  // Section headings sit top-left, so the sculpture usually rests in the open
  // space at the upper right, varying depth, spin and tilt from stop to stop.
  credibility: { ...base, x: 3.0, y: -1.55, z: -1.2, scale: 0.5, spin: 1.1, tilt: 0.25, veil: 0.15 },
  capabilities: { ...base, x: 2.9, y: 1.05, z: -1.5, scale: 0.6, spin: 2.2, tilt: -0.2, veil: 0.15 },
  services: { ...base, x: 3.0, y: 1.0, z: -1.5, scale: 0.6, spin: 3.1, tilt: 0.35, veil: 0.15 },
  approach: { ...base, x: 3.1, y: 1.1, z: -2.6, scale: 0.8, spin: 4.0, tilt: 0.1, veil: 0.25 },
  work: { ...base, x: 3.5, y: 1.75, z: -2.4, scale: 0.5, spin: 5.0, tilt: -0.3, veil: 0.25 },
  team: { ...base, x: -2.7, y: -1.8, z: -1.4, scale: 0.45, spin: 5.8, tilt: 0.2, veil: 0.15 },
  technology: { ...base, x: 3.5, y: 1.7, z: -2.4, scale: 0.52, spin: 6.6, tilt: -0.15, veil: 0.2 },
  insights: { ...base, x: 3.5, y: 1.75, z: -2.4, scale: 0.5, spin: 7.4, tilt: 0.25, veil: 0.2 },
  closing: { ...base, x: 2.7, y: 0, z: -1.2, scale: 0.9, spin: 8.4, tilt: 0, veil: 0.1 },
  /** Interior pages without their own artwork. */
  page: { ...base, x: 3.1, y: 0.25, z: -0.8, scale: 0.68, spin: 0.6, tilt: 0.15, veil: 0.15 },
  /** Used after the last stop on a page: the sculpture recedes into the distance. */
  away: { ...base, x: 2.0, y: 1.6, z: -8, scale: 0.6, spin: 2, tilt: 0, veil: 0.6 },
};

/**
 * Narrow screens: the sculpture moves behind the content, slightly higher and
 * more veiled, so text never competes with it.
 */
export function adaptForNarrow(p: Pose): Pose {
  return { ...p, x: p.x * 0.15, y: p.y * 0.3 + 1.7, z: p.z - 1.4, scale: p.scale * 0.72, veil: Math.min(0.75, p.veil + 0.4) };
}

export function mixPose(a: Pose, b: Pose, t: number): Pose {
  const m = (k: keyof Pose) => a[k] + (b[k] - a[k]) * t;
  return { x: m("x"), y: m("y"), z: m("z"), scale: m("scale"), spin: m("spin"), tilt: m("tilt"), veil: m("veil") };
}
