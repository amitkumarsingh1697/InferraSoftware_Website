import {
  Activity,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  ClipboardCheck,
  Cloud,
  Compass,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Gauge,
  GitBranch,
  Handshake,
  Landmark,
  Layers,
  Network,
  Orbit,
  RefreshCcw,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Terminal,
  Users,
  Workflow,
  type LucideProps,
} from "lucide-react";

/**
 * Content files reference icons by name so they stay plain data.
 * Add an entry here to make a new icon available to content.
 */
const icons = {
  activity: Activity,
  book: BookOpen,
  bot: Bot,
  brain: BrainCircuit,
  building: Building2,
  checklist: ClipboardCheck,
  cloud: Cloud,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  factory: Factory,
  flask: FlaskConical,
  gauge: Gauge,
  branch: GitBranch,
  handshake: Handshake,
  landmark: Landmark,
  layers: Layers,
  network: Network,
  orbit: Orbit,
  refresh: RefreshCcw,
  rocket: Rocket,
  server: Server,
  shield: ShieldCheck,
  shop: ShoppingBag,
  terminal: Terminal,
  users: Users,
  workflow: Workflow,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" {...props} />;
}
