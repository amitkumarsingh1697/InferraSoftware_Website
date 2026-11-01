/**
 * The homepage journey: one chapter per homepage section, in page order.
 *
 * `scene` must match the section's data-scene attribute. `label` is the short
 * name shown in the chapter rail. `set` picks the 3D set the camera visits,
 * and `tone` is the colour grade of that stretch of the flight. To add a
 * chapter, add a section with data-scene and an entry here.
 */
export type SetKind = "sculpture" | "monoliths" | "constellation" | "lattice" | "gates" | "frames" | "pillars" | "stack" | "pages";

export interface Chapter {
  scene: string;
  label: string;
  set: SetKind;
  tone: string;
}

export const chapters: Chapter[] = [
  { scene: "hero", label: "Intro", set: "sculpture", tone: "#d9bb86" },
  { scene: "credibility", label: "Why us", set: "monoliths", tone: "#c98a4b" },
  { scene: "capabilities", label: "Capabilities", set: "constellation", tone: "#e3c48e" },
  { scene: "services", label: "Featured", set: "lattice", tone: "#7fb0a4" },
  { scene: "approach", label: "Approach", set: "gates", tone: "#eadcc0" },
  { scene: "work", label: "Work", set: "frames", tone: "#c98a4b" },
  { scene: "team", label: "Team", set: "pillars", tone: "#d9bb86" },
  { scene: "technology", label: "Technology", set: "stack", tone: "#7fb0a4" },
  { scene: "insights", label: "Insights", set: "pages", tone: "#c2876a" },
  { scene: "closing", label: "Contact", set: "sculpture", tone: "#e3c48e" },
];
