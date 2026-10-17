import type { TechGroup } from "./types";

/**
 * Technology capabilities grouped by role in delivery.
 * depth "core"    = an area of established strength for the team.
 * depth "project" = used or adopted where a project requires it.
 * Keep this honest: move items between tiers as the team's confirmed
 * experience changes.
 */
export const techGroups: TechGroup[] = [
  {
    id: "languages",
    title: "Languages & frameworks",
    role: "The foundations we build with.",
    icon: "terminal",
    items: [
      { name: "Java", depth: "core" },
      { name: "Python", depth: "core" },
      { name: "TypeScript", depth: "core" },
      { name: "JavaScript", depth: "core" },
      { name: "SQL", depth: "core" },
      { name: "Kotlin", depth: "project" },
      { name: "Go", depth: "project" },
    ],
    practices: ["Strict typing where the language allows", "Consistent formatting and linting", "Readable code over clever code"],
  },
  {
    id: "backend",
    title: "Backend & distributed systems",
    role: "Services, APIs and the plumbing between them.",
    icon: "server",
    items: [
      { name: "Spring Boot", depth: "core" },
      { name: "REST APIs", depth: "core" },
      { name: "Microservices", depth: "core" },
      { name: "FastAPI", depth: "core" },
      { name: "PostgreSQL", depth: "core" },
      { name: "Node.js", depth: "project" },
      { name: "Kafka", depth: "project" },
      { name: "Redis", depth: "project" },
      { name: "gRPC", depth: "project" },
    ],
    practices: ["Contract-first API design", "Idempotency and retries by design", "Clear data ownership between services"],
  },
  {
    id: "frontend",
    title: "Frontend & web",
    role: "Interfaces people use every day.",
    icon: "layers",
    items: [
      { name: "React", depth: "core" },
      { name: "Next.js", depth: "core" },
      { name: "Tailwind CSS", depth: "core" },
      { name: "HTML & CSS", depth: "core" },
      { name: "Accessibility (WCAG)", depth: "core" },
      { name: "React Native", depth: "project" },
    ],
    practices: ["Server-first rendering", "Accessible components", "Performance budgets"],
  },
  {
    id: "ai",
    title: "AI & LLM engineering",
    role: "Intelligent features, engineered for production.",
    icon: "brain",
    items: [
      { name: "LLM integration", depth: "core" },
      { name: "Retrieval-augmented generation", depth: "core" },
      { name: "Agentic workflows", depth: "core" },
      { name: "Model Context Protocol (MCP)", depth: "core" },
      { name: "LLM evaluation", depth: "core" },
      { name: "Vector search", depth: "project" },
      { name: "Model fine-tuning", depth: "project" },
    ],
    practices: ["Evaluation before release", "Structured, validated outputs", "Human approval for consequential actions"],
  },
  {
    id: "cloud-data",
    title: "Cloud & data",
    role: "Infrastructure and data that stay dependable.",
    icon: "cloud",
    items: [
      { name: "Google Cloud", depth: "core" },
      { name: "BigQuery", depth: "core" },
      { name: "Data pipelines", depth: "core" },
      { name: "Cloud Run", depth: "project" },
      { name: "dbt", depth: "project" },
      { name: "Terraform", depth: "project" },
      { name: "AWS", depth: "project" },
      { name: "Azure", depth: "project" },
    ],
    practices: ["Infrastructure as code", "Idempotent, replayable pipelines", "Cost visibility from day one"],
  },
  {
    id: "enterprise",
    title: "Enterprise systems",
    role: "Connecting and supporting core business platforms.",
    icon: "building",
    items: [
      { name: "SAP BASIS", depth: "core" },
      { name: "SAP integration", depth: "project" },
      { name: "ERP & CRM integration", depth: "project" },
      { name: "Identity providers (OIDC, SAML)", depth: "project" },
    ],
    practices: ["Respect the system of record", "Change governance aligned to your processes", "Documented runbooks"],
  },
  {
    id: "delivery",
    title: "Testing, delivery & reliability",
    role: "How software reaches production and stays healthy.",
    icon: "shield",
    items: [
      { name: "Automated testing", depth: "core" },
      { name: "CI/CD", depth: "core" },
      { name: "Docker", depth: "core" },
      { name: "Observability", depth: "core" },
      { name: "Playwright", depth: "project" },
      { name: "Kubernetes", depth: "project" },
      { name: "OpenTelemetry", depth: "project" },
    ],
    practices: ["Tests at the right levels", "Small, reversible releases", "Monitoring with named owners"],
  },
];

export const selectionPrinciples = [
  {
    title: "Business fit first",
    description: "Technology serves the outcome. We start from the problem, users and constraints, not from a favourite stack.",
  },
  {
    title: "Your team's future",
    description: "We favour technologies your team can hire for, operate and maintain after we hand over.",
  },
  {
    title: "Proven before novel",
    description: "Mature, well-supported tools are the default. New technology earns its place with a clear benefit.",
  },
  {
    title: "Total cost of ownership",
    description: "Licensing, hosting, operations and maintenance effort all count, not just build speed.",
  },
];
