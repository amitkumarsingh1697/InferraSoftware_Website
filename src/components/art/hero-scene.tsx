import { ParallaxStage, ParallaxLayer } from "./parallax";

/**
 * "The Inference Core": original key art for Inferra Software.
 *
 * A lone engineer stands on a cantilevered platform above a night city,
 * looking up at a luminous orbital core. Data streams from across the city
 * converge into it: complex ideas, engineered into reality.
 *
 * Built entirely from SVG so it is crisp at any size, weighs a few KB, needs no
 * external images and can be animated with CSS. Three layers move at
 * different depths for a gentle parallax on desktop pointers.
 */

// Deterministic pseudo-random generator so the skyline is identical on every render.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const VIEW = "0 0 1600 1000";

function Stars() {
  const r = rng(7);
  const stars = Array.from({ length: 70 }, (_, i) => ({
    x: r() * 1600,
    y: r() * 460,
    s: r() * 1.3 + 0.3,
    d: (r() * 5).toFixed(2),
    tw: i % 4 === 0,
  }));
  return (
    <g fill="#E9E5FF">
      {stars.map((st, i) => (
        <circle
          key={i}
          cx={st.x.toFixed(1)}
          cy={st.y.toFixed(1)}
          r={st.s.toFixed(2)}
          opacity={st.tw ? undefined : 0.45}
          className={st.tw ? "animate-twinkle" : undefined}
          style={st.tw ? { animationDelay: `${st.d}s` } : undefined}
        />
      ))}
    </g>
  );
}

function Skyline({ seed, baseY, minH, maxH, color, edge, windows, count, xStart = 0, xEnd = 1600 }: {
  seed: number;
  baseY: number;
  minH: number;
  maxH: number;
  color: string;
  edge: string;
  windows: string;
  count: number;
  xStart?: number;
  xEnd?: number;
}) {
  const r = rng(seed);
  const span = (xEnd - xStart) / count;
  const towers = Array.from({ length: count }, (_, i) => {
    const w = span * (0.55 + r() * 0.5);
    const x = xStart + i * span + r() * (span - w);
    // Taller towers cluster toward the core's position.
    const pull = 1 - Math.min(1, Math.abs(x - 1150) / 900) * 0.55;
    const h = (minH + r() * (maxH - minH)) * pull;
    const spire = r() > 0.72;
    const stepped = r() > 0.6;
    return { x, w, h, spire, stepped };
  });
  return (
    <g>
      {towers.map((t, i) => {
        const top = baseY - t.h;
        return (
          <g key={i}>
            {t.stepped ? (
              <path
                d={`M${t.x} ${baseY}V${top + 30}h${t.w * 0.18}V${top}h${t.w * 0.64}v30h${t.w * 0.18}V${baseY}z`}
                fill={color}
              />
            ) : (
              <rect x={t.x} y={top} width={t.w} height={t.h} fill={color} />
            )}
            <rect x={t.x} y={top} width={t.w} height={t.h} fill={windows} opacity="0.9" />
            {/* light from the core catches the right-hand edge */}
            <rect x={t.x + t.w - 1.5} y={top + (t.stepped ? 30 : 0)} width="1.5" height={t.h} fill={edge} />
            {t.spire && (
              <>
                <rect x={t.x + t.w / 2 - 1} y={top - 38} width="2" height="38" fill={color} />
                <circle cx={t.x + t.w / 2} cy={top - 40} r="2.2" fill="#F472B6" className="animate-twinkle" style={{ animationDelay: `${i % 5}s` }} />
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function HeroScene() {
  return (
    <ParallaxStage className="absolute inset-0 overflow-hidden">
      {/* Layer 1: sky, core, beams and data streams */}
      <ParallaxLayer depth={6}>
        <svg viewBox={VIEW} preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#05030F" />
              <stop offset="0.45" stopColor="#120A30" />
              <stop offset="0.72" stopColor="#2A1458" />
              <stop offset="1" stopColor="#0A0718" />
            </linearGradient>
            <radialGradient id="hs-glow" cx="1150" cy="360" r="620" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.55" />
              <stop offset="0.35" stopColor="#6D28D9" stopOpacity="0.22" />
              <stop offset="1" stopColor="#6D28D9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hs-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.25" stopColor="#CFFAFE" />
              <stop offset="0.55" stopColor="#67E8F9" stopOpacity="0.85" />
              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hs-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
              <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hs-stream" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#A78BFA" stopOpacity="0" />
              <stop offset="0.6" stopColor="#A78BFA" stopOpacity="0.7" />
              <stop offset="1" stopColor="#67E8F9" />
            </linearGradient>
            <linearGradient id="hs-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#24164F" />
              <stop offset="1" stopColor="#1A1040" />
            </linearGradient>
          </defs>

          <rect width="1600" height="1000" fill="url(#hs-sky)" />
          <rect width="1600" height="1000" fill="url(#hs-glow)" />
          <Stars />

          {/* distant megastructure ridge */}
          <path
            d="M0 660 L120 640 L170 600 L260 610 L340 560 L420 590 L520 540 L600 575 L700 520 L760 548 L880 500 L980 530 L1060 470 L1180 505 L1260 470 L1380 520 L1460 500 L1600 540 V1000 H0Z"
            fill="url(#hs-far)"
            opacity="0.85"
          />

          {/* light column from the core down into the city */}
          <path d="M1120 380 L1180 380 L1300 900 L1000 900Z" fill="url(#hs-beam)" opacity="0.35" />

          {/* data streams converging on the core */}
          <g fill="none" strokeLinecap="round">
            {[
              "M-40 520 C 300 470, 700 520, 1110 372",
              "M-40 300 C 380 260, 760 300, 1112 352",
              "M200 760 C 520 620, 860 520, 1124 386",
              "M1640 220 C 1440 250, 1300 300, 1176 350",
              "M1640 620 C 1460 560, 1300 470, 1178 382",
              "M640 860 C 820 700, 980 520, 1136 392",
            ].map((d, i) => (
              <g key={i}>
                <path d={d} stroke="#8B5CF6" strokeOpacity="0.14" strokeWidth="1" />
                <path
                  d={d}
                  stroke="url(#hs-stream)"
                  strokeWidth={i % 2 ? 1.6 : 2.2}
                  strokeDasharray="6 26 2 18"
                  className="animate-stream"
                  style={{ animationDuration: `${8 + i * 1.7}s` }}
                />
              </g>
            ))}
          </g>

          {/* the Inference Core */}
          <g transform="translate(1150 360)">
            <circle r="210" fill="url(#hs-core)" opacity="0.18" />
            <g className="animate-core-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <circle r="62" fill="url(#hs-core)" />
            </g>
            <circle r="16" fill="#FFFFFF" />
            <g fill="none" stroke="#C4B5FD" strokeWidth="1.4">
              <ellipse rx="150" ry="44" transform="rotate(-18)" strokeOpacity="0.8" />
              <ellipse rx="128" ry="36" transform="rotate(32)" strokeOpacity="0.55" stroke="#67E8F9" />
              <ellipse rx="176" ry="58" transform="rotate(76)" strokeOpacity="0.35" />
              <circle r="96" strokeOpacity="0.25" strokeDasharray="2 10" />
            </g>
            {/* orbiting nodes */}
            <circle cx="142" cy="-46" r="4" fill="#67E8F9" />
            <circle cx="-110" cy="-70" r="3" fill="#A78BFA" />
            <circle cx="-60" cy="118" r="3.5" fill="#67E8F9" />
            {/* chevrons from the logo, framing the core */}
            <path d="M-238 -70 L-282 0 L-238 70" fill="none" stroke="#A78BFA" strokeOpacity="0.45" strokeWidth="3" />
            <path d="M238 -70 L282 0 L238 70" fill="none" stroke="#A78BFA" strokeOpacity="0.45" strokeWidth="3" />
          </g>
        </svg>
      </ParallaxLayer>

      {/* Layer 2: the city */}
      <ParallaxLayer depth={14}>
        <svg viewBox={VIEW} preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="hs-win-far" width="9" height="12" patternUnits="userSpaceOnUse">
              <rect x="2" y="3" width="2" height="3" fill="#A78BFA" opacity="0.35" />
              <rect x="6" y="8" width="1.5" height="2" fill="#67E8F9" opacity="0.25" />
            </pattern>
            <pattern id="hs-win-near" width="12" height="16" patternUnits="userSpaceOnUse">
              <rect x="2" y="3" width="3" height="4" fill="#C4B5FD" opacity="0.28" />
              <rect x="7" y="10" width="3" height="3" fill="#67E8F9" opacity="0.22" />
            </pattern>
            <linearGradient id="hs-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2A1458" stopOpacity="0" />
              <stop offset="1" stopColor="#1A0F3D" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <Skyline seed={11} baseY={900} minH={150} maxH={330} color="#1B1142" edge="#7C6BD6" windows="url(#hs-win-far)" count={30} />
          <rect y="640" width="1600" height="300" fill="url(#hs-haze)" />
          <Skyline seed={23} baseY={1000} minH={180} maxH={360} color="#0F0A26" edge="#67E8F9" windows="url(#hs-win-near)" count={16} />
        </svg>
      </ParallaxLayer>

      {/* Layer 3: platform and the observer */}
      <ParallaxLayer depth={26}>
        <svg viewBox={VIEW} preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="hs-rim" x1="-60" y1="0" x2="26" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#67E8F9" stopOpacity="0" />
              <stop offset="0.7" stopColor="#67E8F9" stopOpacity="0.35" />
              <stop offset="1" stopColor="#CFFAFE" />
            </linearGradient>
            <linearGradient id="hs-ledge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#120B2C" />
              <stop offset="1" stopColor="#05030F" />
            </linearGradient>
            <linearGradient id="hs-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0A0718" stopOpacity="0" />
              <stop offset="1" stopColor="#0A0718" />
            </linearGradient>
          </defs>

          {/* cantilevered platform */}
          <path d="M820 872 L1600 846 L1600 1000 L800 1000Z" fill="url(#hs-ledge)" />
          <path d="M820 872 L1600 846" stroke="#67E8F9" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M820 872 L1600 846" stroke="#67E8F9" strokeOpacity="0.15" strokeWidth="8" />
          <g stroke="#A78BFA" strokeOpacity="0.35" strokeWidth="1.5">
            <path d="M830 846 L1600 820" />
            {Array.from({ length: 12 }, (_, i) => {
              const x = 840 + i * 66;
              const y = 871 - (x - 820) * (26 / 780);
              return <path key={i} d={`M${x} ${y} V${y - 26}`} />;
            })}
          </g>

          {/* the observer: original figure, rim-lit by the core */}
          <g transform="translate(1010 866) scale(1.12)">
            <g className="animate-drift" style={{ animationDuration: "14s" }}>
            {/* scarf trailing in the wind */}
            <path d="M-4 -118 C -22 -122 -44 -110 -70 -120 C -50 -104 -26 -108 -6 -111Z" fill="#7C3AED" opacity="0.9" />
            <path
              d="M5 -120 L17 -114 L20 -100 L22 -78 L19 -60 L16 -60 L17 -40 L21 -22 L9 -22 L8 0 L13 0 L13 2 L3 2 L3 -20 L0 -22 L-3 -20 L-4 2 L-13 2 L-11 0 L-8 -22 L-18 -22 L-34 -17 L-50 -24 L-36 -33 L-26 -44 L-20 -70 L-19 -100 L-16 -114 L-5 -120Z"
              fill="#04020C"
              stroke="url(#hs-rim)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <ellipse cx="0" cy="-131" rx="10" ry="12" fill="#04020C" stroke="url(#hs-rim)" strokeWidth="1.2" />
            {/* wind-swept hair */}
            <path
              d="M10 -134 C 9 -146 -3 -150 -12 -143 L -27 -147 L -17 -139 L -31 -136 L -16 -132 L -23 -124 L -10 -127 L -5 -121 L 3 -125 L 9 -127Z"
              fill="#04020C"
              stroke="url(#hs-rim)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* a small glowing interface in the observer's hand */}
            <rect x="17" y="-62" width="9" height="6" rx="1" fill="#67E8F9" opacity="0.85" />
            <circle cx="21" cy="-59" r="10" fill="#67E8F9" opacity="0.12" />
            </g>
          </g>

          <rect y="760" width="1600" height="240" fill="url(#hs-floor)" />
        </svg>
      </ParallaxLayer>
    </ParallaxStage>
  );
}
