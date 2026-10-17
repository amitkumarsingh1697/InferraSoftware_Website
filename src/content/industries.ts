import type { Industry } from "./types";

/**
 * Industry pages describe common engineering needs in each sector and how
 * Inferra's capabilities apply. They are general expertise, not claims of
 * client experience in the sector. Add, edit or remove entries freely;
 * /industries/[slug] is generated from this list.
 */
export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services & Fintech",
    icon: "landmark",
    summary:
      "Secure, auditable systems for lenders, payment businesses, insurers and fintech products, where correctness and traceability are non-negotiable.",
    metaDescription:
      "Software engineering for financial services and fintech: secure APIs, integrations, data platforms, modernization and carefully governed AI.",
    intro:
      "Financial software has little tolerance for error. Balances must reconcile, every change must be traceable, and systems must remain available while regulations, products and partners evolve. Engineering in this space rewards precision, strong testing and conservative change management.",
    challenges: [
      {
        title: "Legacy core systems",
        description: "Critical platforms built on older technology are expensive to change and difficult to integrate with modern channels.",
      },
      {
        title: "Integration sprawl",
        description: "Payment providers, credit bureaus, KYC services and banking partners each bring their own APIs, formats and failure modes.",
      },
      {
        title: "Auditability",
        description: "Every transaction, decision and configuration change needs a reliable record that can be produced on request.",
      },
      {
        title: "Responsible AI adoption",
        description: "AI can help with documents, operations and support, but outputs must be explainable, governed and reviewed.",
      },
    ],
    solutions: [
      {
        title: "Secure transaction services",
        description: "APIs and services designed for idempotency, consistency and complete audit logging.",
      },
      {
        title: "Integration layers",
        description: "Normalised adapters for external providers with retries, reconciliation and monitoring.",
      },
      {
        title: "Incremental modernization",
        description: "API facades and staged extraction that reduce dependence on legacy systems without disrupting operations.",
      },
      {
        title: "Document and operations AI",
        description: "Extraction and summarisation workflows with confidence thresholds and human approval.",
      },
    ],
    capabilities: ["full-stack-development", "application-modernization", "cloud-data-engineering", "ai-llm-engineering", "architecture-advisory"],
    useCases: [
      {
        title: "Loan application workflow",
        description: "A digital application flow integrating identity verification, document upload and an underwriting rules engine.",
      },
      {
        title: "Reconciliation pipeline",
        description: "Automated daily reconciliation between internal ledgers and payment provider settlement files, with exception queues.",
      },
      {
        title: "Policy document assistant",
        description: "An internal assistant that answers staff questions about products and procedures with citations to approved documents.",
      },
    ],
    dataConsiderations: [
      "Strong consistency and idempotency for anything that moves money or changes balances.",
      "Clear data lineage from source systems to reports.",
      "Retention and deletion rules aligned with applicable regulatory requirements.",
    ],
    securityConsiderations: [
      "Encryption in transit and at rest, with careful key and secret management.",
      "Least-privilege access and separation of duties for production systems.",
      "Security review of third-party integrations and dependencies.",
    ],
  },
  {
    slug: "saas-technology",
    name: "SaaS & Technology Companies",
    icon: "cpu",
    summary:
      "Engineering capacity and senior expertise for product companies that need to ship faster, scale reliably and add AI capabilities.",
    metaDescription:
      "Software engineering for SaaS and technology companies: product development, multi-tenant architecture, AI features, scalability and engineering capacity.",
    intro:
      "Technology companies live and die by their ability to ship. Their challenge is rarely a lack of ideas; it is turning a roadmap into reliable releases while the platform scales, customers demand integrations and competitors add AI to everything.",
    challenges: [
      {
        title: "Roadmap pressure",
        description: "Product ambitions outpace the size of the engineering team.",
      },
      {
        title: "Scaling a young architecture",
        description: "Decisions that worked for the first customers start to limit performance, tenancy and deployment speed.",
      },
      {
        title: "Adding AI credibly",
        description: "Customers expect AI features, but they must be accurate, affordable and consistent with the product experience.",
      },
      {
        title: "Integration demands",
        description: "Enterprise customers expect SSO, APIs, webhooks and connectors to their existing tools.",
      },
    ],
    solutions: [
      {
        title: "Embedded product engineering",
        description: "Senior engineers who join the team and deliver roadmap features to its standards.",
      },
      {
        title: "Multi-tenant architecture",
        description: "Tenant isolation, configuration, billing integration and observability designed for growth.",
      },
      {
        title: "AI product features",
        description: "LLM-powered features with evaluation pipelines and cost controls from day one.",
      },
      {
        title: "Platform APIs",
        description: "Public APIs, webhooks and SSO that make the product easier to adopt for larger customers.",
      },
    ],
    capabilities: ["software-product-development", "full-stack-development", "ai-llm-engineering", "llm-evaluation", "architecture-advisory"],
    useCases: [
      {
        title: "Enterprise readiness",
        description: "Adding SSO, role-based access, audit logs and a public API to win larger customers.",
      },
      {
        title: "AI summarisation feature",
        description: "Summaries of customer activity inside the product, backed by an evaluation suite that runs on every release.",
      },
      {
        title: "Performance at scale",
        description: "Profiling and re-architecting a slow, heavily used workflow before a major customer onboarding.",
      },
    ],
    dataConsiderations: [
      "Tenant data isolation enforced at the data layer, not only in application code.",
      "Event data captured with consent and privacy in mind for product analytics.",
      "Customer data used for AI features only within agreed terms.",
    ],
    securityConsiderations: [
      "Secure software development practices and dependency scanning in CI.",
      "Support for customer security questionnaires with clear technical evidence.",
      "Isolation of AI tool access to the data each user is permitted to see.",
    ],
  },
  {
    slug: "retail-commerce",
    name: "Retail & Commerce",
    icon: "shop",
    summary:
      "Commerce platforms, integrations and data pipelines that keep inventory, orders and customer experiences in sync across channels.",
    metaDescription:
      "Software engineering for retail and commerce: commerce integrations, order and inventory systems, data platforms, personalisation and AI-assisted operations.",
    intro:
      "Retail and commerce businesses run on a web of systems: storefronts, marketplaces, payment providers, warehouses, ERPs and marketing tools. Customers notice immediately when they fall out of sync. Engineering value here comes from robust integrations, accurate data and performance during peak demand.",
    challenges: [
      {
        title: "Fragmented systems",
        description: "Stock, pricing and order data are spread across platforms that do not always agree.",
      },
      {
        title: "Peak traffic",
        description: "Promotions and seasonal events create sudden load that exposes weak points.",
      },
      {
        title: "Data for decisions",
        description: "Merchandising and marketing teams need timely, trustworthy data from many sources.",
      },
      {
        title: "Operational efficiency",
        description: "Customer service and catalogue management involve repetitive work that could be assisted.",
      },
    ],
    solutions: [
      {
        title: "Order and inventory integration",
        description: "Event-driven synchronisation between storefronts, marketplaces, warehouses and ERP.",
      },
      {
        title: "Performance engineering",
        description: "Load testing, caching and scaling strategies prepared ahead of peak events.",
      },
      {
        title: "Commerce data platform",
        description: "Unified sales, inventory and customer data in a cloud warehouse with consistent metrics.",
      },
      {
        title: "Catalogue and service AI",
        description: "Assisted product content generation and support reply drafting with human review.",
      },
    ],
    capabilities: ["full-stack-development", "cloud-data-engineering", "agentic-ai-automation", "application-modernization"],
    useCases: [
      {
        title: "Multi-channel stock sync",
        description: "Near-real-time inventory updates across a web store and marketplaces to reduce overselling.",
      },
      {
        title: "Sales reporting in BigQuery",
        description: "Daily consolidated reporting across channels, replacing manual spreadsheet consolidation.",
      },
      {
        title: "Product content assistant",
        description: "Drafting product descriptions from structured attributes for merchandisers to review and approve.",
      },
    ],
    dataConsiderations: [
      "Clear system-of-record decisions for stock, price and customer data.",
      "Event ordering and deduplication for order and inventory updates.",
      "Customer data used for analytics in line with consent and privacy obligations.",
    ],
    securityConsiderations: [
      "Payment handling delegated to compliant providers rather than stored locally.",
      "Bot and abuse protection for public endpoints.",
      "Secure management of marketplace and partner API credentials.",
    ],
  },
  {
    slug: "enterprise-operations",
    name: "Enterprise Operations",
    icon: "building",
    summary:
      "Internal platforms, workflow automation and system integrations that help large organisations run complex operations with less friction.",
    metaDescription:
      "Software engineering for enterprise operations: internal tools, workflow automation, SAP and ERP integration, modernization and governed agentic AI.",
    intro:
      "Large organisations depend on many systems and many hand-offs. Much of the friction lives between systems, in spreadsheets, email threads and manual re-keying. Well-engineered internal tools, integrations and carefully governed automation can remove that friction without disrupting core platforms.",
    challenges: [
      {
        title: "Manual hand-offs",
        description: "Processes depend on people copying data between systems and chasing approvals.",
      },
      {
        title: "Core system constraints",
        description: "ERP and legacy platforms are difficult to extend directly and changes need careful governance.",
      },
      {
        title: "Visibility",
        description: "Leaders lack timely operational data because it is scattered across systems.",
      },
      {
        title: "Automation risk",
        description: "Automation must respect permissions, approvals and audit requirements.",
      },
    ],
    solutions: [
      {
        title: "Internal workflow platforms",
        description: "Focused applications that replace spreadsheet-driven processes with roles, workflows and audit trails.",
      },
      {
        title: "Enterprise integration",
        description: "APIs and pipelines connecting ERP, SAP, CRM and custom systems.",
      },
      {
        title: "Governed agentic automation",
        description: "AI-assisted workflows with scoped permissions, approvals and complete logs.",
      },
      {
        title: "Operational reporting",
        description: "Consolidated operational data and dashboards built on reliable pipelines.",
      },
    ],
    capabilities: ["agentic-ai-automation", "sap-basis", "full-stack-development", "cloud-data-engineering", "application-modernization"],
    useCases: [
      {
        title: "Procurement request workflow",
        description: "A request-and-approval application integrated with the ERP, replacing email-based approvals.",
      },
      {
        title: "Service desk triage",
        description: "Incoming requests classified and enriched automatically, with routing suggestions for agents to confirm.",
      },
      {
        title: "SAP data integration",
        description: "Operational SAP data made available to analytics and other applications through governed interfaces.",
      },
    ],
    dataConsiderations: [
      "Respecting the system of record and avoiding uncontrolled data copies.",
      "Master data quality as a prerequisite for automation.",
      "Data access aligned with organisational roles and policies.",
    ],
    securityConsiderations: [
      "Integration with corporate identity providers and single sign-on.",
      "Change management aligned with enterprise governance processes.",
      "Audit logging for automated and AI-assisted actions.",
    ],
  },
  {
    slug: "data-intensive-businesses",
    name: "Data-Intensive Businesses",
    icon: "database",
    summary:
      "Pipelines, warehouses and AI foundations for organisations whose products or decisions depend on large volumes of data.",
    metaDescription:
      "Software and data engineering for data-intensive businesses: data pipelines, BigQuery, data quality, observability and AI-ready data platforms.",
    intro:
      "For some organisations, data is the product. For others, it is the basis of every important decision. Either way, the value of the data depends on its freshness, correctness and accessibility, and on infrastructure that keeps working as volume grows.",
    challenges: [
      {
        title: "Volume and velocity",
        description: "Growing data volumes strain pipelines, budgets and query performance.",
      },
      {
        title: "Trust",
        description: "Silent data quality issues undermine confidence in reports and models.",
      },
      {
        title: "Cost control",
        description: "Cloud data warehouse spend grows unpredictably without design discipline.",
      },
      {
        title: "From data to AI",
        description: "Teams want to build AI capabilities but lack clean, governed, well-documented datasets.",
      },
    ],
    solutions: [
      {
        title: "Scalable pipelines",
        description: "Batch and streaming pipelines designed for replayability and observability.",
      },
      {
        title: "Data quality frameworks",
        description: "Automated checks, alerts and quarantine for critical datasets.",
      },
      {
        title: "Warehouse optimisation",
        description: "Partitioning, clustering and query design that keep BigQuery performance and costs predictable.",
      },
      {
        title: "AI-ready foundations",
        description: "Governed datasets and document stores prepared for analytics, retrieval and machine learning.",
      },
    ],
    capabilities: ["cloud-data-engineering", "ai-llm-engineering", "llm-evaluation", "architecture-advisory"],
    useCases: [
      {
        title: "Streaming ingestion",
        description: "High-volume event ingestion into BigQuery with deduplication and late-arriving data handling.",
      },
      {
        title: "Data quality monitoring",
        description: "Freshness and anomaly checks across critical tables with alerts routed to dataset owners.",
      },
      {
        title: "Semantic search over documents",
        description: "A retrieval layer over a large document corpus, evaluated for relevance before use in AI features.",
      },
    ],
    dataConsiderations: [
      "Partitioning and lifecycle policies designed from the start.",
      "Documented schemas and data contracts between producers and consumers.",
      "Lineage that makes it possible to trace any figure back to its sources.",
    ],
    securityConsiderations: [
      "Column- and row-level access controls for sensitive fields.",
      "Pseudonymisation of personal data where analysis does not require identity.",
      "Monitoring and alerting on unusual data access patterns.",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
