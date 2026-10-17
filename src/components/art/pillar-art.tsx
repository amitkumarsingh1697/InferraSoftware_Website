import type { CapabilityPillar } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Abstract technical illustrations, one per capability pillar. They share
 * a visual grammar with the hero (violet structure, cyan signal) so service
 * pages feel like scenes from the same world.
 */
export function PillarArt({ pillar, className }: { pillar: CapabilityPillar; className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={cn("h-auto w-full", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`pa-v-${pillar}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <radialGradient id={`pa-g-${pillar}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#A78BFA" strokeOpacity="0.08">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * 50} 0V300`} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`h${i}`} d={`M0 ${i * 50}H400`} />
        ))}
      </g>
      {pillar === "build" && <Build id={pillar} />}
      {pillar === "modernize" && <Modernize id={pillar} />}
      {pillar === "intelligence" && <Intelligence id={pillar} />}
      {pillar === "connect" && <Connect id={pillar} />}
      {pillar === "strengthen" && <Strengthen id={pillar} />}
    </svg>
  );
}

/** Isometric stack: interface, services, data. */
function Build({ id }: { id: string }) {
  const layer = (y: number, o: number, label: string) => (
    <g transform={`translate(200 ${y})`} opacity={o}>
      <path d="M0 -38 L96 0 L0 38 L-96 0Z" fill="#17102F" stroke={`url(#pa-v-${id})`} strokeWidth="1.5" />
      <path d="M-96 0 V14 L0 52 L96 14 V0" fill="#100B24" stroke="#A78BFA" strokeOpacity="0.4" />
      <text x="0" y="5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#B7B0CC" letterSpacing="2">
        {label}
      </text>
    </g>
  );
  return (
    <g>
      {layer(220, 1, "DATA")}
      {layer(160, 1, "SERVICES")}
      {layer(100, 1, "INTERFACE")}
      <path d="M200 62 V30" stroke="#67E8F9" strokeWidth="2" strokeDasharray="3 5" className="animate-stream" />
      <circle cx="200" cy="26" r="5" fill="#67E8F9" />
      <circle cx="200" cy="26" r="18" fill={`url(#pa-g-${id})`} opacity="0.5" />
    </g>
  );
}

/** Legacy blocks reorganising into a clean modular grid. */
function Modernize({ id }: { id: string }) {
  const old = [
    [40, 70, 70, 44],
    [60, 120, 50, 70],
    [30, 196, 90, 36],
    [118, 96, 26, 60],
  ];
  return (
    <g>
      {old.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#1F1640" stroke="#918AAB" strokeOpacity="0.5" strokeDasharray="4 3" />
      ))}
      <path d="M160 150 H222" stroke="#67E8F9" strokeWidth="2" strokeDasharray="4 6" className="animate-stream" />
      <path d="M214 142 L226 150 L214 158" fill="none" stroke="#67E8F9" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 248 + (i % 3) * 42;
        const y = 88 + Math.floor(i / 3) * 42;
        return <rect key={i} x={x} y={y} width="34" height="34" rx="6" fill="#17102F" stroke={`url(#pa-v-${id})`} strokeWidth="1.5" />;
      })}
      <circle cx="311" cy="151" r="5" fill="#67E8F9" />
    </g>
  );
}

/** A neural lattice with a bright inference node. */
function Intelligence({ id }: { id: string }) {
  const cols = [70, 150, 250, 330];
  const rows = [[90, 150, 210], [70, 120, 180, 230], [100, 150, 200], [150]];
  const nodes = cols.flatMap((x, c) => rows[c].map((y) => ({ x, y, c })));
  const edges: [typeof nodes[0], typeof nodes[0]][] = [];
  nodes.forEach((a) => nodes.forEach((b) => b.c === a.c + 1 && edges.push([a, b])));
  return (
    <g>
      {edges.map(([a, b], i) => (
        <path key={i} d={`M${a.x} ${a.y} L${b.x} ${b.y}`} stroke="#A78BFA" strokeOpacity={i % 3 ? 0.18 : 0.45} />
      ))}
      <path d="M70 150 L150 120 L250 150 L330 150" fill="none" stroke="#67E8F9" strokeWidth="2" strokeDasharray="5 7" className="animate-stream" />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.c === 3 ? 9 : 5} fill={n.c === 3 ? "#67E8F9" : "#17102F"} stroke={`url(#pa-v-${id})`} strokeWidth="1.5" />
      ))}
      <circle cx="330" cy="150" r="34" fill={`url(#pa-g-${id})`} opacity="0.5" />
    </g>
  );
}

/** Distributed systems joined through a central exchange. */
function Connect({ id }: { id: string }) {
  const sats = [
    [70, 70, "ERP"],
    [330, 70, "API"],
    [60, 230, "SAP"],
    [340, 230, "BQ"],
    [200, 40, "SaaS"],
  ] as const;
  return (
    <g>
      {sats.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} Q 200 150 200 150`} stroke="#67E8F9" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 6" className="animate-stream" style={{ animationDuration: `${7 + i}s` }} />
      ))}
      {sats.map(([x, y, label], i) => (
        <g key={`n${i}`} transform={`translate(${x} ${y})`}>
          <rect x="-26" y="-16" width="52" height="32" rx="8" fill="#17102F" stroke={`url(#pa-v-${id})`} strokeWidth="1.5" />
          <text y="4" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#B7B0CC" letterSpacing="1">
            {label}
          </text>
        </g>
      ))}
      <circle cx="200" cy="150" r="40" fill={`url(#pa-g-${id})`} opacity="0.35" />
      <path d="M200 120 L226 150 L200 180 L174 150Z" fill="#17102F" stroke="#67E8F9" strokeWidth="2" />
      <circle cx="200" cy="150" r="5" fill="#67E8F9" />
    </g>
  );
}

/** A blueprint with measured structure and a review marker. */
function Strengthen({ id }: { id: string }) {
  return (
    <g>
      <rect x="80" y="60" width="240" height="180" rx="4" fill="#100B24" stroke={`url(#pa-v-${id})`} strokeWidth="1.5" />
      <path d="M80 110 H320 M180 60 V240 M180 170 H320" stroke="#A78BFA" strokeOpacity="0.35" />
      <path d="M60 60 V240 M54 60 H66 M54 240 H66" stroke="#918AAB" strokeOpacity="0.6" />
      <path d="M80 262 H320 M80 256 V268 M320 256 V268" stroke="#918AAB" strokeOpacity="0.6" />
      <circle cx="250" cy="140" r="34" fill="none" stroke="#67E8F9" strokeWidth="2" />
      <path d="M274 164 L300 190" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round" />
      <path d="M236 140 L247 151 L266 130" fill="none" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="92" fontFamily="var(--font-mono)" fontSize="10" fill="#B7B0CC" letterSpacing="1.5">
        REVIEW · v2
      </text>
    </g>
  );
}
