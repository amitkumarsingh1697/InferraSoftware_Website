import { articles } from "./meta";
import type { ArticleMeta } from "../types";

export { articles, articleTopics } from "./meta";

/** Static import map keeps every article statically analysable by the bundler. */
export const loaders: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "planning-legacy-java-modernization": () => import("./planning-legacy-java-modernization.mdx"),
  "integrating-llms-into-existing-products": () => import("./integrating-llms-into-existing-products.mdx"),
  "safer-agentic-workflows": () => import("./safer-agentic-workflows.mdx"),
  "reliable-bigquery-data-pipelines": () => import("./reliable-bigquery-data-pipelines.mdx"),
  "production-readiness-checklist": () => import("./production-readiness-checklist.mdx"),
};

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

export function sortedArticles(): ArticleMeta[] {
  return [...articles].sort((a, b) => b.published.localeCompare(a.published));
}
