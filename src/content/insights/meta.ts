import type { ArticleMeta, ArticleTopic } from "../types";

/**
 * Article registry. To publish an article:
 * 1. Write src/content/insights/<slug>.mdx (Markdown + optional JSX).
 * 2. Add its metadata below and a loader line in `loaders` (index.ts).
 * Author: use "Inferra Software Engineering" for team-written pieces. Name an
 * individual only when that person wrote or approved the article.
 */
export const articles: ArticleMeta[] = [
  {
    slug: "planning-legacy-java-modernization",
    title: "Planning a Legacy Java Modernization Without a Big-Bang Rewrite",
    description:
      "A practical, step-by-step way to move an ageing Java application onto a supported stack while it keeps running the business.",
    author: "Inferra Software Engineering",
    published: "2026-10-17",
    topic: "Modernization",
    tags: ["Java", "Spring Boot", "Technical debt", "Testing"],
    kind: "Guide",
    hue: 30,
    related: ["production-readiness-checklist", "integrating-llms-into-existing-products"],
  },
  {
    slug: "integrating-llms-into-existing-products",
    title: "Integrating LLMs Into an Existing Product: An Engineering Checklist",
    description:
      "What to decide before, during and after adding an LLM-powered feature to software that real customers already depend on.",
    author: "Inferra Software Engineering",
    published: "2026-10-17",
    topic: "AI Engineering",
    tags: ["LLMs", "RAG", "Structured outputs", "Evaluation"],
    kind: "Checklist",
    hue: 265,
    related: ["safer-agentic-workflows", "production-readiness-checklist"],
  },
  {
    slug: "safer-agentic-workflows",
    title: "Building Safer Agentic Workflows: Permissions, Approvals and Audit",
    description:
      "Agents that act on real systems need engineering controls. Here is how to scope tools, gate consequential actions and keep a usable record.",
    author: "Inferra Software Engineering",
    published: "2026-10-17",
    topic: "AI Engineering",
    tags: ["Agentic AI", "MCP", "Security", "Governance"],
    kind: "Guide",
    hue: 300,
    related: ["integrating-llms-into-existing-products", "reliable-bigquery-data-pipelines"],
  },
  {
    slug: "reliable-bigquery-data-pipelines",
    title: "Engineering Reliable Data Pipelines on BigQuery",
    description:
      "Patterns for pipelines that can be rerun safely, detect bad data early and keep warehouse costs predictable.",
    author: "Inferra Software Engineering",
    published: "2026-10-17",
    topic: "Data",
    tags: ["BigQuery", "Google Cloud", "Data quality", "dbt"],
    kind: "Guide",
    hue: 180,
    related: ["production-readiness-checklist", "integrating-llms-into-existing-products"],
  },
  {
    slug: "production-readiness-checklist",
    title: "A Production-Readiness Checklist for New Applications",
    description:
      "The questions worth answering before launch day, from observability and backups to rollbacks and on-call ownership.",
    author: "Inferra Software Engineering",
    published: "2026-10-17",
    topic: "Delivery",
    tags: ["Production readiness", "Observability", "Reliability", "Security"],
    kind: "Checklist",
    hue: 220,
    related: ["planning-legacy-java-modernization", "reliable-bigquery-data-pipelines"],
  },
];

export const articleTopics: ArticleTopic[] = ["Architecture", "Modernization", "AI Engineering", "Data", "Delivery"];
