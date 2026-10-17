import type { CaseStudy, WorkStatus } from "./types";

/**
 * Portfolio entries.
 *
 * Every current entry is an ENGINEERING DEMONSTRATOR: a reference design that
 * shows how Inferra approaches a type of problem. None of them describes
 * client work or a production deployment, and the pages say so prominently.
 *
 * To add real client work: copy an entry, set status: "client", replace the
 * content with approved facts and only include metrics the client has
 * approved for publication. See docs/CONTENT-GUIDE.md.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-knowledge-assistant",
    title: "A Production-Oriented AI Knowledge Assistant",
    status: "demonstrator",
    projectType: "AI application · Reference design",
    context: "Internal knowledge for a mid-sized organisation",
    summary:
      "A reference design for a permission-aware assistant that answers staff questions from internal documents, with citations, evaluation and cost controls built in.",
    hue: 265,
    capabilities: ["RAG", "Evaluation", "Access control", "Observability"],
    services: ["ai-llm-engineering", "llm-evaluation", "cloud-data-engineering"],
    stack: ["Python", "FastAPI", "PostgreSQL + pgvector", "Next.js", "OpenTelemetry", "Google Cloud Run"],
    challenge: [
      "Staff in a growing organisation spend significant time searching for policies, procedures and product information spread across wikis, shared drives and ticket histories.",
      "A simple chatbot prototype answers fluently but sometimes cites outdated documents, occasionally reveals content a user should not see, and gives no way to measure whether changes help or hurt.",
    ],
    requirements: [
      "Answers grounded in approved internal sources, with citations users can open.",
      "Respect existing document permissions so users only receive content they can already access.",
      "Measurable answer quality before launch and after every change.",
      "Predictable cost per query and graceful behaviour during provider outages.",
    ],
    constraints: [
      "Documents arrive in mixed formats with inconsistent structure.",
      "Some content is sensitive and must not leave approved processing regions.",
      "The organisation's identity provider is the single source of truth for access.",
    ],
    approach: [
      "Define success with domain experts first: a labelled set of representative questions with acceptable answers and the sources that support them.",
      "Build ingestion as a repeatable pipeline that extracts, cleans, chunks and embeds documents while carrying their access control lists alongside the content.",
      "Filter retrieval by the requesting user's permissions before ranking, so restricted content never reaches the model's context.",
      "Constrain responses to cite retrieved passages and fall back to 'I could not find this in approved sources' rather than guessing.",
    ],
    architecture: {
      summary:
        "A small set of services with clear responsibilities, deployable on managed infrastructure and observable end to end.",
      components: [
        { title: "Ingestion pipeline", description: "Scheduled and event-triggered jobs that parse documents, chunk content, compute embeddings and store vectors with ACL metadata." },
        { title: "Retrieval service", description: "Hybrid keyword and vector search with permission filtering and re-ranking." },
        { title: "Answer service", description: "Prompt assembly, model invocation with timeouts and retries, schema-validated output and citation checks." },
        { title: "Evaluation harness", description: "Versioned question sets scored for groundedness, correctness and citation accuracy in CI." },
        { title: "Web interface", description: "A chat interface showing sources inline, with feedback capture on each answer." },
      ],
    },
    implementation: [
      { title: "Permission-aware retrieval", description: "Access lists are synchronised from the identity provider and applied as filters inside the search query, not after retrieval." },
      { title: "Structured answers", description: "The model returns an answer plus cited passage identifiers; responses citing passages that were not retrieved are rejected and retried." },
      { title: "Cost and latency controls", description: "Per-user rate limits, response caching for repeated questions and model version pinning keep behaviour predictable." },
      { title: "Tracing", description: "Each request records retrieved passages, prompt version, latency and token usage for debugging and review." },
    ],
    validation: [
      "Offline evaluation against the labelled question set before every release.",
      "Red-team questions attempting to retrieve restricted documents or override instructions.",
      "Load tests to confirm latency targets under concurrent use.",
      "A staged pilot with feedback capture before wider rollout.",
    ],
    outcomes: {
      label: "Design goals",
      items: [
        "Every answer traceable to an approved, permitted source.",
        "Quality changes visible before release, not discovered by users.",
        "Clear operating costs and behaviour during provider incidents.",
      ],
    },
    lessons: [
      "Permission handling belongs in retrieval, not in the prompt.",
      "A modest, well-labelled evaluation set is more valuable than a large unlabelled one.",
      "Honest 'not found' responses build more trust than confident guesses.",
    ],
  },
  {
    slug: "modular-saas-architecture",
    title: "A Modular SaaS Application Architecture",
    status: "demonstrator",
    projectType: "Product architecture · Reference design",
    context: "Early-stage B2B SaaS product",
    summary:
      "A reference architecture for a multi-tenant SaaS product that ships quickly as a modular monolith and can separate modules into services only when needed.",
    hue: 200,
    capabilities: ["Multi-tenancy", "Modular monolith", "CI/CD", "Observability"],
    services: ["software-product-development", "full-stack-development", "architecture-advisory"],
    stack: ["TypeScript", "Next.js", "Java", "Spring Boot", "PostgreSQL", "Docker", "GitHub Actions"],
    challenge: [
      "Early-stage SaaS teams face a familiar tension: move fast enough to find product-market fit, without making decisions that force a rewrite when the first large customers arrive.",
      "Common failure modes include premature microservices that slow a small team down, or an unstructured codebase where tenancy, billing and permissions are scattered everywhere.",
    ],
    requirements: [
      "Strict tenant data isolation from the first release.",
      "Role-based access control with an audit trail.",
      "Subscription billing integration and usage tracking.",
      "Fast, repeatable deployments for a small team.",
    ],
    constraints: [
      "A small engineering team with limited operational capacity.",
      "Uncertain future scale and feature direction.",
      "Enterprise customers expected to require SSO and security reviews later.",
    ],
    approach: [
      "Start with a modular monolith: one deployable application with strongly separated modules that communicate through explicit interfaces.",
      "Enforce tenant isolation in the data layer using row-level security, backed by automated tests that attempt cross-tenant access.",
      "Treat identity, billing and audit as platform modules with stable interfaces that product modules depend on.",
      "Automate the delivery pipeline from the first week so every merge is tested and deployable.",
    ],
    architecture: {
      summary:
        "A single deployable unit organised into bounded modules, with clear seams where future extraction is likely.",
      components: [
        { title: "Web application", description: "Next.js frontend consuming a typed API contract." },
        { title: "Application core", description: "Spring Boot application with modules for accounts, product domain, billing, notifications and audit." },
        { title: "Data layer", description: "PostgreSQL with row-level security policies keyed on tenant identity." },
        { title: "Async work", description: "A job queue for emails, exports and integrations, designed for idempotent retries." },
        { title: "Platform", description: "Containerised deployment, managed database, centralised logs, metrics and traces." },
      ],
    },
    implementation: [
      { title: "Module boundaries", description: "Architecture tests fail the build if one module reaches into another's internals." },
      { title: "Tenant context", description: "Tenant identity is resolved once per request and propagated to the database session, so queries cannot forget it." },
      { title: "Audit events", description: "Security-relevant actions emit immutable audit events from a shared platform module." },
      { title: "Extraction readiness", description: "Modules communicate via interfaces and domain events, so a module can later move behind a network boundary." },
    ],
    validation: [
      "Automated cross-tenant access tests on every build.",
      "Contract tests between frontend and API.",
      "End-to-end tests for sign-up, billing and core workflows.",
      "Load testing of the busiest endpoints before onboarding large tenants.",
    ],
    outcomes: {
      label: "Design goals",
      items: [
        "A small team can ship and deploy daily with confidence.",
        "Enterprise requirements such as SSO and audit logs can be added without restructuring.",
        "Services can be extracted later where scale or ownership demands it.",
      ],
    },
    lessons: [
      "A well-structured monolith is a strong default for small teams.",
      "Tenant isolation is easiest to get right on day one and hardest to retrofit.",
      "Architecture tests keep module boundaries honest as the team grows.",
    ],
  },
  {
    slug: "legacy-java-modernization",
    title: "A Legacy Java Modernization Path",
    status: "demonstrator",
    projectType: "Modernization · Reference approach",
    context: "Business-critical Java application on an end-of-life stack",
    summary:
      "A step-by-step reference approach for moving a legacy Java application to a supported runtime and modern framework without a big-bang rewrite.",
    hue: 30,
    capabilities: ["Java upgrades", "Characterisation testing", "Performance", "Containerisation"],
    services: ["application-modernization", "architecture-advisory", "full-stack-development"],
    stack: ["Java", "Spring Boot", "Maven", "JUnit", "Testcontainers", "Docker", "OpenTelemetry"],
    challenge: [
      "Many organisations rely on Java applications built a decade or more ago, running on old Java versions, application servers and libraries that no longer receive security updates.",
      "These systems work, but they are hard to change, hard to hire for, and increasingly risky to operate.",
    ],
    requirements: [
      "Move to a supported Java LTS release and maintained framework versions.",
      "Preserve existing business behaviour and integration contracts.",
      "Improve build, test and deployment repeatability.",
      "Keep the system operating throughout the modernization.",
    ],
    constraints: [
      "Limited existing test coverage and documentation.",
      "Downstream systems depending on current data formats and APIs.",
      "Change windows constrained by business operations.",
    ],
    approach: [
      "Establish a baseline: build reproducibility, dependency inventory, vulnerability scan and performance measurements.",
      "Write characterisation tests around the most critical business flows before changing code.",
      "Upgrade in stages: build tooling, then Java version, then frameworks and libraries, deploying and validating at each step.",
      "Containerise and add observability, so the upgraded application is easier to operate and diagnose.",
    ],
    architecture: {
      summary:
        "The target keeps the application's core structure while replacing its foundations, with seams prepared for later extraction where useful.",
      components: [
        { title: "Build and dependency layer", description: "Reproducible builds with managed dependency versions and automated vulnerability checks." },
        { title: "Application runtime", description: "Current Java LTS and Spring Boot replacing an ageing application server deployment." },
        { title: "Test harness", description: "Characterisation and integration tests running against real databases in containers." },
        { title: "Operations", description: "Container images, health checks, structured logs and traces." },
      ],
    },
    implementation: [
      { title: "Dependency triage", description: "Each library is classified as upgrade, replace or remove, prioritising known vulnerabilities." },
      { title: "API compatibility", description: "Integration contracts are captured as tests, so downstream consumers are protected during upgrades." },
      { title: "Incremental releases", description: "Each upgrade stage is released independently with a rollback plan." },
      { title: "Performance comparison", description: "Baseline measurements are re-run after each stage to catch regressions." },
    ],
    validation: [
      "Characterisation test suite passing before and after each stage.",
      "Side-by-side comparison of outputs for critical batch processes.",
      "Performance benchmarks against the original baseline.",
      "Staged rollout with monitoring and rollback criteria.",
    ],
    outcomes: {
      label: "Design goals",
      items: [
        "A supported, patchable runtime and framework stack.",
        "Automated tests that make future change safer.",
        "A deployment process the team can repeat with confidence.",
      ],
    },
    lessons: [
      "Tests that capture current behaviour are the foundation of any safe modernization.",
      "Upgrading in stages makes problems easier to isolate.",
      "Some legacy constraints are better contained than removed; the assessment should say which.",
    ],
  },
  {
    slug: "data-ingestion-reporting-pipeline",
    title: "A Data Ingestion & Reporting Pipeline",
    status: "demonstrator",
    projectType: "Data platform · Reference design",
    context: "Multi-source operational reporting",
    summary:
      "A reference design for consolidating operational data from several systems into BigQuery with tested transformations, quality checks and alerting.",
    hue: 180,
    capabilities: ["BigQuery", "Data quality", "Orchestration", "Cost control"],
    services: ["cloud-data-engineering", "architecture-advisory"],
    stack: ["Google Cloud", "BigQuery", "Cloud Composer", "dbt", "Python", "Terraform", "Looker Studio"],
    challenge: [
      "Operational reporting often depends on manual exports from several systems, combined in spreadsheets. Figures disagree, errors are hard to trace and reports arrive late.",
      "Earlier attempts at automation, such as scheduled scripts, fail silently and leave reports stale without anyone noticing.",
    ],
    requirements: [
      "Daily consolidated reporting from several source systems.",
      "Consistent, documented metric definitions.",
      "Automatic detection of late, missing or invalid data.",
      "Predictable warehouse costs.",
    ],
    constraints: [
      "Source systems with rate-limited APIs and inconsistent data quality.",
      "A small team responsible for operating the platform.",
      "Personal data that must be restricted to authorised users.",
    ],
    approach: [
      "Land raw data unchanged, then transform it in version-controlled, tested stages.",
      "Design every load to be idempotent so any day can be safely reprocessed.",
      "Define metrics once in a documented semantic layer used by all reports.",
      "Monitor freshness, volume and quality alongside pipeline health.",
    ],
    architecture: {
      summary:
        "A layered warehouse on BigQuery orchestrated by managed Airflow, with infrastructure defined as code.",
      components: [
        { title: "Ingestion", description: "Python extractors and managed connectors landing data into raw datasets, partitioned by load date." },
        { title: "Transformation", description: "dbt models building staged, cleaned and reporting layers with tests and documentation." },
        { title: "Orchestration", description: "Cloud Composer DAGs coordinating dependencies, retries and backfills." },
        { title: "Quality and alerting", description: "Freshness and data tests that block downstream models and notify owners." },
        { title: "Access", description: "Authorised views and policy tags restricting sensitive columns." },
      ],
    },
    implementation: [
      { title: "Partitioning and clustering", description: "Tables are partitioned by date and clustered by common filters to control cost and improve performance." },
      { title: "Idempotent loads", description: "Partition overwrite patterns make reruns safe and backfills routine." },
      { title: "Data contracts", description: "Expected schemas for each source are tested, so upstream changes are caught at ingestion." },
      { title: "Cost guardrails", description: "Query quotas, scheduled query reviews and budget alerts keep spend visible." },
    ],
    validation: [
      "dbt tests for uniqueness, nulls, relationships and business rules.",
      "Reconciliation of key totals against source systems.",
      "Backfill tests over historical periods.",
      "Review of reports with business owners before switching off manual processes.",
    ],
    outcomes: {
      label: "Design goals",
      items: [
        "One trusted set of numbers, available on schedule.",
        "Data issues detected before stakeholders see them.",
        "A platform a small team can operate and extend.",
      ],
    },
    lessons: [
      "Keeping raw data unchanged makes recovery and auditing far easier.",
      "Metric definitions are a business agreement first and a technical artefact second.",
      "Alerting is only useful when it reaches a named owner.",
    ],
  },
  {
    slug: "agentic-workflow-approvals",
    title: "An Agentic Workflow with Approval & Audit Controls",
    status: "demonstrator",
    projectType: "Agentic AI · Reference design",
    context: "Back-office operations automation",
    summary:
      "A reference design for an AI-assisted workflow that gathers information across systems, proposes actions and requires human approval before anything consequential happens.",
    hue: 300,
    capabilities: ["Tool calling", "MCP", "Human approval", "Audit trail"],
    services: ["agentic-ai-automation", "llm-evaluation", "full-stack-development"],
    stack: ["Python", "Model Context Protocol", "PostgreSQL", "TypeScript", "React", "OpenTelemetry"],
    challenge: [
      "Operations teams often handle requests that require gathering information from several systems, applying policy and then updating records. The work is repetitive but consequential.",
      "Fully autonomous agents are risky in this setting: they can misinterpret requests, be manipulated by untrusted content in emails or documents, or take irreversible actions.",
    ],
    requirements: [
      "Reduce the manual effort of gathering context and preparing actions.",
      "No consequential action without explicit human approval.",
      "Complete, reviewable records of every run.",
      "Narrow, auditable access to each connected system.",
    ],
    constraints: [
      "Inputs include untrusted content from external parties.",
      "Connected systems have different authentication models.",
      "Operators need to understand and trust each proposed action quickly.",
    ],
    approach: [
      "Model the process as a workflow with explicit states, using AI only for steps that benefit from judgement, such as classification and summarisation.",
      "Expose each system through narrowly scoped tools, implemented as MCP servers with their own credentials and logs.",
      "Classify every tool by impact: read-only tools run freely; write tools produce proposals that wait for approval.",
      "Treat all external content as data and keep it separate from instructions.",
    ],
    architecture: {
      summary:
        "A durable workflow engine coordinates AI steps, tools and approvals, with every transition recorded.",
      components: [
        { title: "Workflow orchestrator", description: "Durable state machine controlling steps, retries, timeouts and approval waits." },
        { title: "Agent step", description: "LLM calls for classification, context gathering and drafting, with schema-validated outputs." },
        { title: "Tool layer (MCP)", description: "Scoped MCP servers for each system, enforcing per-tool permissions and logging." },
        { title: "Approval interface", description: "A review screen showing context, the proposed action, its rationale and the sources used." },
        { title: "Audit store", description: "Append-only records of inputs, model outputs, tool calls, approvals and results." },
      ],
    },
    implementation: [
      { title: "Impact classification", description: "Each tool declares whether it reads or writes; write tools can only create pending proposals." },
      { title: "Injection resistance", description: "External content is delimited and labelled as untrusted, and tool access does not depend on content instructions." },
      { title: "Confidence and fallback", description: "Low-confidence classifications or validation failures route straight to a human queue." },
      { title: "Replayable runs", description: "Runs can be inspected step by step to explain behaviour and create new evaluation cases." },
    ],
    validation: [
      "Evaluation suite of representative and adversarial requests.",
      "Tests confirming write tools cannot execute without an approval record.",
      "Prompt injection test cases drawn from realistic inputs.",
      "Shadow mode trial where proposals are compared with human decisions before go-live.",
    ],
    outcomes: {
      label: "Design goals",
      items: [
        "Operators spend their time on decisions rather than gathering information.",
        "Nothing consequential happens without a named approver.",
        "Every action can be explained after the fact.",
      ],
    },
    lessons: [
      "A workflow with AI steps is usually more reliable than an open-ended agent.",
      "Permissions belong in the tool layer, not in the prompt.",
      "Approval screens need context, not just a yes or no button.",
    ],
  },
];

export const workStatusLabel: Record<WorkStatus, string> = {
  demonstrator: "Engineering Demonstrator",
  illustrative: "Illustrative Project",
  client: "Client Engagement",
};

export const workStatusDisclosure: Record<WorkStatus, string | null> = {
  demonstrator:
    "This is an engineering demonstrator: a reference design showing how Inferra Software would approach this type of problem. It is not a client engagement, it has not been deployed for a client, and its outcomes are design goals rather than measured results.",
  illustrative:
    "This is an illustrative project used to explain a type of engagement. It does not describe work for a real client.",
  client: null,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
