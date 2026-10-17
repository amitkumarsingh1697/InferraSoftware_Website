import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies, workStatusDisclosure } from "@/content/work";
import { articles } from "@/content/insights";
import { team } from "@/content/team";
import { getReadingTime, getToc } from "@/lib/insights";

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("content integrity", () => {
  it("has the ten required services with unique slugs", () => {
    expect(services).toHaveLength(10);
    expect(unique(services.map((s) => s.slug))).toBe(true);
  });

  it("has unique slugs for industries, work and insights", () => {
    expect(unique(industries.map((i) => i.slug))).toBe(true);
    expect(unique(caseStudies.map((c) => c.slug))).toBe(true);
    expect(unique(articles.map((a) => a.slug))).toBe(true);
  });

  it("shows a disclosure on every entry that is not approved client work", () => {
    for (const c of caseStudies) {
      if (c.status !== "client") expect(workStatusDisclosure[c.status], c.slug).toBeTruthy();
    }
  });

  it("does not invent bios for team members without confirmed details", () => {
    for (const m of team.filter((t) => t.name !== "Amit Kumar Singh")) expect(m.bio).toEqual([]);
  });

  it("does not present the founder's prior experience as company metrics", () => {
    const text = JSON.stringify({ services, industries, caseStudies });
    expect(text).not.toMatch(/millions of users/i);
  });
});

describe("article helpers", () => {
  it("builds a table of contents that matches rehype-slug ids", () => {
    const toc = getToc("production-readiness-checklist");
    expect(toc[0]).toEqual({ id: "ownership", text: "Ownership", depth: 2 });
    expect(toc.map((t) => t.id)).toContain("legal-and-communication");
  });

  it("estimates reading time for every article", () => {
    for (const a of articles) expect(getReadingTime(a.slug)).toBeGreaterThan(1);
  });

  it("rejects slugs that could traverse the file system", () => {
    expect(() => getToc("../../package")).toThrow();
  });
});
