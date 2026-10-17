import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

const dir = path.join(process.cwd(), "src", "content", "insights");

function raw(slug: string): string {
  // Slugs come only from the static article registry, never from user input.
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Invalid article slug");
  return readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
}

export function getReadingTime(slug: string): number {
  const words = raw(slug)
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/** Builds the table of contents with the same slug algorithm as rehype-slug. */
export function getToc(slug: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of raw(slug).split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    entries.push({ id: slugger.slug(text), text, depth: m[1].length as 2 | 3 });
  }
  return entries;
}
