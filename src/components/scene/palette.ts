import { Color } from "three";
import { readToken } from "@/design/motion";

/** Scene colours come from the --scene-* tokens in src/design/tokens.css. */
export function readScenePalette() {
  const c = (name: string, fallback: string) => new Color(readToken(`--scene-${name}`) || fallback);
  return {
    ceramic: c("ceramic", "#efe4d4"),
    bronze: c("bronze", "#9a6b40"),
    coffee: c("coffee", "#4a2f1f"),
    gold: c("gold", "#c9a06a"),
    lightKey: c("light-key", "#fff1dc"),
    lightFill: c("light-fill", "#e8c9a4"),
    fog: c("fog", "#f5eee3"),
    /** Chapter colour grades for the homepage journey (chapters.ts picks 1-4). */
    tones: [c("tone-1", "#d9bb86"), c("tone-2", "#c98a4b"), c("tone-3", "#7fb0a4"), c("tone-4", "#c2876a")],
  };
}

export type ScenePalette = ReturnType<typeof readScenePalette>;
