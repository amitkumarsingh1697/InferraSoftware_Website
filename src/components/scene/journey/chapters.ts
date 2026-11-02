/**
 * The homepage journey: one chapter per homepage section, in page order.
 *
 * `scene` must match the section's data-scene attribute. `label` is the short
 * name shown in the chapter rail. `set` picks the 3D set the camera visits,
 * and `tone` (1-4) picks one of the --scene-tone-* colours in tokens.css as
 * the colour grade of that stretch of the flight. To add a
 * chapter, add a section with data-scene and an entry here.
 */
export type SetKind = "sculpture" | "monoliths" | "constellation" | "lattice" | "gates" | "frames" | "pillars" | "stack" | "pages";

export interface Chapter {
  scene: string;
  label: string;
  set: SetKind;
  tone: 1 | 2 | 3 | 4;
}

export const chapters: Chapter[] = [
  { scene: "hero", label: "Intro", set: "sculpture", tone: 1 },
  { scene: "credibility", label: "Why us", set: "monoliths", tone: 2 },
  { scene: "capabilities", label: "Capabilities", set: "constellation", tone: 1 },
  { scene: "services", label: "Featured", set: "lattice", tone: 3 },
  { scene: "approach", label: "Approach", set: "gates", tone: 1 },
  { scene: "work", label: "Work", set: "frames", tone: 2 },
  { scene: "team", label: "Team", set: "pillars", tone: 1 },
  { scene: "technology", label: "Technology", set: "stack", tone: 3 },
  { scene: "insights", label: "Insights", set: "pages", tone: 4 },
  { scene: "closing", label: "Contact", set: "sculpture", tone: 1 },
];
