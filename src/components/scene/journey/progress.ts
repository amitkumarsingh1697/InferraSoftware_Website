import { chapters } from "./chapters";

/**
 * Turns the page's scroll position into a fractional chapter index (0 at the
 * hero, 1 at the next section, and so on), measured from the data-scene
 * sections on the page. The camera holds at a chapter while its section is
 * read and travels during the last part of the scroll towards the next one.
 * Shared by the 3D journey and the chapter rail so they always agree.
 */
export class ChapterProgress {
  private stops: { index: number; at: number }[] = [];

  measure() {
    const vh = window.innerHeight;
    this.stops = [];
    chapters.forEach((c, index) => {
      const el = document.querySelector<HTMLElement>(`[data-scene="${c.scene}"]`);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      this.stops.push({ index, at: Math.max(0, top - vh * 0.25) });
    });
  }

  get count() {
    return this.stops.length;
  }

  /** Scroll position for a chapter, for jump links. */
  scrollFor(index: number) {
    return this.stops.find((s) => s.index === index)?.at ?? 0;
  }

  chapterAt(scrollY: number): number {
    const s = this.stops;
    if (s.length === 0) return 0;
    if (scrollY <= s[0].at) return s[0].index;
    for (let i = 0; i < s.length - 1; i++) {
      const a = s[i];
      const b = s[i + 1];
      if (scrollY < b.at) {
        const travelStart = b.at - (b.at - a.at) * 0.5;
        const t = scrollY <= travelStart ? 0 : (scrollY - travelStart) / (b.at - travelStart);
        return a.index + (b.index - a.index) * t;
      }
    }
    return s[s.length - 1].index;
  }
}
