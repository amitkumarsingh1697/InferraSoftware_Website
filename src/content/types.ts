/**
 * Shared content models. Every page that lists or renders structured content
 * is typed against these interfaces, so a missing field is a type error
 * rather than a broken page.
 */
import type { IconName } from "@/components/ui/icon";

export interface TitledItem {
  title: string;
  description: string;
}

export type CapabilityPillar = "build" | "modernize" | "intelligence" | "connect" | "strengthen";

export interface Service {
  slug: string;
  title: string;
  /** Shorter label for menus and tags. */
  shortTitle: string;
  pillar: CapabilityPillar;
  icon: IconName;
  /** One or two sentences for cards and menus. */
  summary: string;
  metaDescription: string;
  hero: { eyebrow: string; headline: string; intro: string };
  /** "What the service solves". Paragraphs. */
  solves: string[];
  challenges: string[];
  capabilities: TitledItem[];
  approaches: TitledItem[];
  /** Illustrative only: these are examples of what the service could address, not past work. */
  useCases: TitledItem[];
  engagement: TitledItem[];
  quality: TitledItem[];
  /** A candid note: limits, trade-offs or when the service is not the right fit. */
  candidNote?: { title: string; body: string[] };
  technologies: string[];
  related: string[];
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  metaDescription: string;
  intro: string;
  challenges: TitledItem[];
  solutions: TitledItem[];
  /** Service slugs. */
  capabilities: string[];
  useCases: TitledItem[];
  dataConsiderations: string[];
  securityConsiderations: string[];
}

export type WorkStatus = "demonstrator" | "illustrative" | "client";

export interface CaseStudy {
  slug: string;
  title: string;
  /**
   * "demonstrator" = an engineering exploration Inferra designs to show an approach.
   * "illustrative" = a hypothetical scenario used to explain a type of engagement.
   * "client" = verified, approved client work (only use with written approval).
   */
  status: WorkStatus;
  projectType: string;
  context: string;
  summary: string;
  hue: number;
  capabilities: string[];
  services: string[];
  stack: string[];
  challenge: string[];
  requirements: string[];
  constraints: string[];
  approach: string[];
  architecture: { summary: string; components: TitledItem[] };
  implementation: TitledItem[];
  validation: string[];
  /** Only real, approved metrics for client work. Demonstrators describe intended outcomes. */
  outcomes: { label: string; items: string[] };
  lessons: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/amit.jpg". Null shows the abstract avatar. */
  photo: string | null;
  /** Paragraphs. Leave empty until the person has written or approved it. */
  bio: string[];
  expertise: string[];
  links: { label: string; href: string }[];
  /** Hue for the abstract avatar. */
  hue: number;
}

export interface Role {
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** Set false to hide without deleting. */
  open: boolean;
}

export interface TechItem {
  name: string;
  depth: "core" | "project";
}

export interface TechGroup {
  id: string;
  title: string;
  role: string;
  icon: IconName;
  items: TechItem[];
  practices: string[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  /** Author label. Use an individual only when that person wrote or approved the article. */
  author: string;
  published: string; // ISO date
  updated?: string;
  topic: ArticleTopic;
  tags: string[];
  /** Content type label shown on the card. */
  kind: "Guide" | "Perspective" | "Checklist";
  hue: number;
  related?: string[];
}

export type ArticleTopic = "Architecture" | "Modernization" | "AI Engineering" | "Data" | "Delivery";
