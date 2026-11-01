import { cn } from "@/lib/utils";

function seeded(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Generative cover art for case studies and articles: a horizon, orbital arcs
 * and connected nodes, varied by a seed and hue so every entry is distinct.
 */
export function CoverArt({ seed, hue, className, label }: { seed: string; hue: number; className?: string; label?: string }) {
  const r = seeded(seed);
  const id = `cv-${seed}`;
  const nodes = Array.from({ length: 7 }, () => ({ x: 40 + r() * 520, y: 40 + r() * 200 }));
  const cx = 160 + r() * 280;
  const cy = 90 + r() * 70;
  const w = warmHue(hue);
  const c1 = `hsl(${w} 52% 66%)`;
  const c2 = `hsl(${w + 8} 48% 74%)`;
  return (
    <svg viewBox="0 0 600 320" className={cn("h-full w-full", className)} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F140D" />
          <stop offset="1" stopColor={`hsl(${w} 30% 13%)`} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={cx} cy={cy} r="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c1} stopOpacity="0.55" />
          <stop offset="1" stopColor={c1} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="320" fill={`url(#${id}-bg)`} />
      <rect width="600" height="320" fill={`url(#${id}-glow)`} />
      <g stroke={c1} strokeOpacity="0.1">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${i * 50} 0V320`} />
        ))}
      </g>
      <g fill="none" stroke={c2}>
        <ellipse cx={cx} cy={cy} rx="120" ry="34" transform={`rotate(${-10 - r() * 20} ${cx} ${cy})`} strokeOpacity="0.6" />
        <ellipse cx={cx} cy={cy} rx="84" ry="24" transform={`rotate(${20 + r() * 30} ${cx} ${cy})`} strokeOpacity="0.4" />
      </g>
      <g stroke={c1} strokeOpacity="0.35">
        {nodes.slice(1).map((n, i) => (
          <path key={i} d={`M${nodes[i].x} ${nodes[i].y} L${n.x} ${n.y}`} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 3.5 : 2.2} fill={c2} opacity="0.85" />
      ))}
      <circle cx={cx} cy={cy} r="12" fill="#fff" opacity="0.9" />
      <circle cx={cx} cy={cy} r="28" fill={c2} opacity="0.25" />
      <path d={`M0 ${250 + r() * 20} ${Array.from({ length: 12 }, (_, i) => `L${(i + 1) * 50} ${236 + r() * 40}`).join(" ")} V320 H0Z`} fill="#1F140D" opacity="0.85" />
      {label && (
        <text x="24" y="300" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3" fill="#CDBBA5">
          {label}
        </text>
      )}
    </svg>
  );
}

/**
 * Abstract avatar for team members without a photo. Deliberately geometric
 * and non-photographic so it can never be mistaken for a real portrait.
 */
export function AbstractAvatar({ name, hue, className }: { name: string; hue: number; className?: string }) {
  const parts = name.split(/\s+/).filter(Boolean);
  const initials = (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? "?").slice(0, 2)).toUpperCase();
  const r = seeded(name);
  const id = `av-${initials}-${hue}`;
  const w = warmHue(hue);
  const c1 = `hsl(${w} 50% 68%)`;
  const c2 = `hsl(${w + 10} 45% 72%)`;
  return (
    <svg viewBox="0 0 200 200" className={cn("h-full w-full", className)} role="img" aria-label={`Abstract avatar for ${name}`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A1C13" />
          <stop offset="1" stopColor={`hsl(${w} 30% 12%)`} />
        </linearGradient>
        <linearGradient id={`${id}-st`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-bg)`} />
      <g fill="none" stroke={`url(#${id}-st)`} strokeOpacity="0.35">
        {Array.from({ length: 4 }, (_, i) => (
          <circle key={i} cx="100" cy="100" r={36 + i * 18 + r() * 6} strokeDasharray={i % 2 ? "3 7" : undefined} />
        ))}
      </g>
      <path d="M100 38 L154 100 L100 162 L46 100Z" fill="#1F140D" stroke={`url(#${id}-st)`} strokeWidth="2" />
      <text x="100" y="111" textAnchor="middle" fontFamily="var(--font-fraunces)" fontWeight="600" fontSize="30" fill="#FBF6EE" letterSpacing="2">
        {initials}
      </text>
    </svg>
  );
}

/** Compact version of the Inference Core used in CTAs and error pages. */
export function CoreEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="-200 -200 400 400" className={cn("h-full w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ce-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#F6EBDA" />
          <stop offset="0.6" stopColor="#E6C79C" stopOpacity="0.7" />
          <stop offset="1" stopColor="#A9774A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="190" fill="url(#ce-core)" opacity="0.15" />
      <g className="animate-core-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle r="52" fill="url(#ce-core)" />
      </g>
      <circle r="13" fill="#fff" />
      <g fill="none" stroke="#E9D8BE" strokeWidth="1.5">
        <ellipse rx="130" ry="38" transform="rotate(-18)" strokeOpacity="0.8" />
        <ellipse rx="110" ry="30" transform="rotate(32)" stroke="#E6C79C" strokeOpacity="0.6" />
        <ellipse rx="150" ry="50" transform="rotate(76)" strokeOpacity="0.35" />
      </g>
      <circle cx="122" cy="-40" r="4" fill="#E6C79C" />
      <circle cx="-95" cy="-60" r="3" fill="#C9A27A" />
    </svg>
  );
}

/** Maps any content hue (0 to 360) into the warm caramel-to-amber band of the palette. */
function warmHue(hue: number) {
  return 18 + Math.round(((((hue % 360) + 360) % 360) / 360) * 26);
}
