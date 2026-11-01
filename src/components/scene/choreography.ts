import { adaptForNarrow, mixPose, poses, type Pose } from "./poses";

interface Stop {
  pose: Pose;
  /** Scroll position at which this stop is fully in pose (its top reaches 20% of the viewport). */
  at: number;
  /** Scroll position at which the stop's section has scrolled away. */
  end: number;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Reads data-scene stops from the page and turns scroll position into a pose. */
export class Choreography {
  private stops: Stop[] = [];
  private narrow = false;

  measure() {
    const vh = window.innerHeight;
    this.narrow = window.innerWidth < 900;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    this.stops = els
      .map((el) => {
        const name = el.dataset.scene ?? "";
        const pose = poses[name];
        if (!pose) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return { pose: this.narrow ? adaptForNarrow(pose) : pose, at: Math.max(0, top - vh * 0.2), end: top + rect.height - vh * 0.35 };
      })
      .filter((s): s is Stop => s !== null)
      .sort((a, b) => a.at - b.at);
  }

  get active() {
    return this.stops.length > 0;
  }

  poseAt(scrollY: number): Pose {
    const s = this.stops;
    const away = this.narrow ? adaptForNarrow(poses.away) : poses.away;
    if (s.length === 0) return away;
    if (scrollY <= s[0].at) {
      // A page whose first stop is further down keeps the sculpture in the
      // distance until that section approaches.
      const lead = window.innerHeight;
      if (s[0].at < lead * 0.5) return s[0].pose;
      const t = Math.max(0, (scrollY - (s[0].at - lead)) / lead);
      return mixPose(away, s[0].pose, ease(Math.min(1, t)));
    }
    for (let i = 0; i < s.length - 1; i++) {
      const a = s[i];
      const b = s[i + 1];
      if (scrollY < b.at) {
        // Hold the pose while the section is being read, then travel.
        const travelStart = Math.max(a.at, b.at - (b.at - a.at) * 0.55);
        const t = scrollY <= travelStart ? 0 : (scrollY - travelStart) / (b.at - travelStart);
        return mixPose(a.pose, b.pose, ease(Math.min(1, t)));
      }
    }
    const last = s[s.length - 1];
    if (scrollY <= last.end) return last.pose;
    const t = Math.min(1, (scrollY - last.end) / (window.innerHeight * 0.8));
    return mixPose(last.pose, { ...away, spin: last.pose.spin + 1 }, ease(t));
  }
}
