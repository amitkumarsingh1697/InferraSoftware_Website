import type { CapabilityPillar, Service } from "./types";

/**
 * Service catalogue. Each entry renders /services/[slug].
 * Use cases are illustrative examples of problems the service addresses,
 * not descriptions of past client engagements.
 */
export const services: Service[] = [
  {
    slug: "full-stack-development",
    title: "Full-Stack & Backend Engineering",
    shortTitle: "Full-Stack & Backend",
    pillar: "build",
    icon: "layers",
    summary:
      "Web applications, APIs, microservices and integrations, engineered end to end by senior developers who own the result.",
    metaDescription:
      "Full-stack and backend engineering from Inferra Software: frontend and backend development, APIs, Java and Spring Boot, Python, microservices, integrations, authentication, testing and deployment.",
    hero: {
      eyebrow: "Build · Full-stack & backend",
      headline: "Software that holds up when real users, real data and real load arrive.",
      intro:
        "We design and build the frontends, services and APIs behind your product, with the same attention to the parts users never see: data models, failure handling, security and the deployment path.",
    },
    solves: [
      "Many applications work in a demo and struggle in production. Requests slow down as data grows, integrations fail silently, and every change feels risky because nothing is tested and nobody is sure how the pieces fit together.",
      "Our full-stack and backend engagements focus on building software that is straightforward to run and safe to change. That means clear service boundaries, explicit contracts between frontend and backend, automated tests at the levels that matter, and a deployment process you can repeat on an ordinary Tuesday.",
    ],
    challenges: [
      "A product or internal tool needs to be built, but the in-house team lacks backend or frontend capacity.",
      "An existing codebase has grown without structure and new features take longer every quarter.",
      "APIs are inconsistent, undocumented or tightly coupled to a single client application.",
      "Integrations with payment, identity, ERP or partner systems are brittle and hard to debug.",
      "Authentication and authorization have been added piecemeal and are difficult to reason about.",
      "There is no reliable automated test suite, so releases depend on manual checks.",
    ],
    capabilities: [
      {
        title: "Frontend applications",
        description:
          "Responsive, accessible web interfaces with React and Next.js, built on typed API contracts and sensible state management rather than ad-hoc data fetching.",
      },
      {
        title: "Backend services and APIs",
        description:
          "REST and event-driven services in Java with Spring Boot, Python with FastAPI or Django, or Node.js and TypeScript, chosen to fit your team and constraints.",
      },
      {
        title: "Microservices and distributed systems",
        description:
          "Service decomposition where it genuinely helps, with attention to data ownership, idempotency, retries, messaging and observability. We are equally comfortable recommending a well-structured modular monolith.",
      },
      {
        title: "Integrations",
        description:
          "Connecting your application to third-party APIs, enterprise systems, identity providers, payment platforms and internal services, with clear error handling and reconciliation.",
      },
      {
        title: "Authentication and authorization",
        description:
          "OAuth 2.0 and OpenID Connect flows, session handling, role and attribute-based access control, and secure handling of secrets and tokens.",
      },
      {
        title: "Testing, deployment and maintenance",
        description:
          "Unit, integration and end-to-end tests, CI/CD pipelines, containerisation and infrastructure that your team can operate after we hand over.",
      },
    ],
    approaches: [
      {
        title: "Contract-first APIs",
        description:
          "We agree API shapes early, using OpenAPI or typed schemas, so frontend and backend work can proceed in parallel and integration surprises surface on day one rather than week six.",
      },
      {
        title: "Boundaries before services",
        description:
          "We model the domain and its data ownership first. Splitting into services comes later, and only where independent scaling, deployment or team ownership justifies the operational cost.",
      },
      {
        title: "Failure is a feature",
        description:
          "Timeouts, retries with backoff, idempotency keys and dead-letter handling are designed in, not discovered during the first incident.",
      },
      {
        title: "Observable by default",
        description:
          "Structured logs, metrics and traces are part of the definition of done, so production behaviour can be understood without guesswork.",
      },
    ],
    useCases: [
      {
        title: "Customer-facing web platform",
        description:
          "A business needs a portal where its customers can manage accounts, orders or bookings, integrated with existing back-office systems.",
      },
      {
        title: "Internal operations tool",
        description:
          "Teams currently coordinate through spreadsheets and email. A focused internal application replaces them with workflows, permissions and an audit trail.",
      },
      {
        title: "API platform for partners",
        description:
          "A company wants to expose its capabilities to partners through a secure, versioned and documented API with rate limits and usage visibility.",
      },
      {
        title: "Backend for a mobile app",
        description:
          "A mobile team needs a dependable backend: authentication, data sync, notifications and integrations, designed to scale with adoption.",
      },
    ],
    engagement: [
      {
        title: "Project delivery",
        description: "A defined scope delivered by our team, with agreed milestones, demos and acceptance criteria.",
      },
      {
        title: "Embedded engineering",
        description: "Senior developers join your team, follow your practices and raise the bar on code review and testing.",
      },
      {
        title: "White-label delivery",
        description: "We build under your agency or consultancy brand, working to your client's standards and processes.",
      },
    ],
    quality: [
      {
        title: "Security",
        description: "Input validation, least-privilege access, dependency scanning and secrets kept out of source control.",
      },
      {
        title: "Reliability",
        description: "Graceful degradation, health checks and clear rollback paths for every release.",
      },
      {
        title: "Maintainability",
        description: "Readable code, documented decisions and tests that describe behaviour, so your team can extend the system confidently.",
      },
    ],
    technologies: ["Java", "Spring Boot", "Python", "FastAPI", "TypeScript", "Node.js", "React", "Next.js", "PostgreSQL", "Kafka", "Docker", "REST", "OpenAPI"],
    related: ["software-product-development", "application-modernization", "architecture-advisory"],
  },
  {
    slug: "software-product-development",
    title: "End-to-End Software Product Development",
    shortTitle: "Product Development",
    pillar: "build",
    icon: "rocket",
    summary:
      "From an idea or early prototype to a production product: discovery, architecture, build, launch and iteration with one accountable team.",
    metaDescription:
      "End-to-end software product development: product discovery, requirements, architecture, implementation, integrations, testing, deployment and iteration for new and existing products.",
    hero: {
      eyebrow: "Build · Product development",
      headline: "Turn a product idea into software people can rely on.",
      intro:
        "We help founders and product teams shape what to build, build it properly, and keep improving it after launch. One team carries the context from the first workshop to the production release.",
    },
    solves: [
      "Building a product involves far more than writing code. Requirements are often unclear, priorities compete, and early technical shortcuts quietly become the constraints that slow every later release.",
      "Our product development work connects business intent to engineering decisions. We help define a focused first release, choose an architecture that fits the stage of the product, and put the testing and deployment foundations in place so that iteration stays fast as the product grows.",
    ],
    challenges: [
      "A validated idea needs a first production release, but there is no in-house engineering team yet.",
      "A prototype or MVP has proven demand but was not built to scale or to be maintained.",
      "An existing product needs new modules, integrations or a significant feature set delivered alongside the current team.",
      "Requirements live in conversations and slide decks rather than in a shared, prioritised backlog.",
      "Releases are infrequent and stressful because deployment and testing are manual.",
    ],
    capabilities: [
      {
        title: "Product discovery",
        description:
          "Workshops to clarify users, problems, constraints and success measures, producing a prioritised scope for the first meaningful release.",
      },
      {
        title: "Requirements and backlog",
        description:
          "User journeys, acceptance criteria and a backlog that engineers and stakeholders can both read, kept current as the product evolves.",
      },
      {
        title: "Architecture for the stage",
        description:
          "An architecture proportionate to the product: simple enough to ship quickly, structured enough that growth does not require a rewrite.",
      },
      {
        title: "Design-to-code implementation",
        description:
          "Frontend, backend, data and integrations built together, with regular demos so stakeholders see working software early and often.",
      },
      {
        title: "Launch readiness",
        description:
          "Environments, monitoring, backups, security review and a release checklist, so launch day is uneventful.",
      },
      {
        title: "Iteration and growth",
        description:
          "Post-launch improvements guided by real usage, plus the documentation and handover needed if you later build your own team.",
      },
    ],
    approaches: [
      {
        title: "Thin vertical slices",
        description:
          "We deliver complete, usable slices of functionality rather than building every layer in isolation, which surfaces integration and usability issues early.",
      },
      {
        title: "Decisions on the record",
        description:
          "Significant technical decisions are captured as short architecture decision records, so future team members understand why the system looks the way it does.",
      },
      {
        title: "Automate the path to production",
        description:
          "Continuous integration and repeatable deployments arrive in the first weeks, not the last, because they make every later change cheaper.",
      },
      {
        title: "Measure what matters",
        description:
          "We agree a small set of product and technical signals up front and instrument the product to capture them, with privacy in mind.",
      },
    ],
    useCases: [
      {
        title: "SaaS product first release",
        description:
          "A founder with domain expertise needs a multi-tenant SaaS application with subscriptions, roles and a clean admin experience.",
      },
      {
        title: "Marketplace or platform",
        description:
          "A business wants to connect two groups of users, such as suppliers and buyers, with onboarding, matching, messaging and payments.",
      },
      {
        title: "Productising internal expertise",
        description:
          "A consultancy turns a repeatable internal process into a software product its clients can use directly.",
      },
      {
        title: "Extending an established product",
        description:
          "A product team needs a significant new module, such as reporting, integrations or an AI-assisted feature, without pausing its roadmap.",
      },
    ],
    engagement: [
      {
        title: "New product",
        description:
          "We start with a short discovery phase, agree a first release, then build in iterations with regular demos and transparent progress.",
      },
      {
        title: "Existing product",
        description:
          "We begin with a codebase and delivery review, then take on defined features or modules alongside your team.",
      },
      {
        title: "Phased commitment",
        description:
          "Engagements can be structured in phases, so you can evaluate each stage before committing to the next.",
      },
    ],
    quality: [
      {
        title: "Product quality",
        description: "Accessibility, performance and usability are treated as requirements, not polish.",
      },
      {
        title: "Data protection",
        description: "Personal data is minimised, protected and handled in line with the obligations that apply to your product.",
      },
      {
        title: "Ownership",
        description: "You own the code, infrastructure accounts and documentation. Nothing is locked inside our tools.",
      },
    ],
    technologies: ["TypeScript", "React", "Next.js", "Java", "Spring Boot", "Python", "PostgreSQL", "Google Cloud", "Docker", "GitHub Actions", "Playwright"],
    related: ["full-stack-development", "ai-llm-engineering", "architecture-advisory"],
  },
  {
    slug: "application-modernization",
    title: "Application Modernization & Performance Engineering",
    shortTitle: "Modernization",
    pillar: "modernize",
    icon: "refresh",
    summary:
      "Upgrade legacy Java and other ageing platforms, reduce technical debt and improve performance without betting the business on a rewrite.",
    metaDescription:
      "Application modernization and performance engineering: legacy Java upgrades, technical debt reduction, performance tuning, migration planning, compatibility, testing and operational readiness.",
    hero: {
      eyebrow: "Modernize · Legacy & performance",
      headline: "Modernize the systems your business depends on, one safe step at a time.",
      intro:
        "Critical software often runs on old frameworks, unsupported runtimes and knowledge held by a few people. We help you understand what you have, decide what to change, and modernize incrementally with tests as the safety net.",
    },
    solves: [
      "Legacy systems usually earn their place: they encode years of business rules and keep revenue flowing. The problem is that they become expensive to change, hard to secure and difficult to staff.",
      "We approach modernization as risk management. Rather than proposing a big-bang rewrite, we map the system, add characterisation tests around critical behaviour, and plan a sequence of upgrades and extractions that each deliver value and can each be rolled back.",
    ],
    challenges: [
      "Applications run on end-of-life Java versions, application servers or frameworks with known vulnerabilities.",
      "Response times have degraded and nobody is certain where the time goes.",
      "Every release risks regressions because automated test coverage is thin.",
      "Key knowledge sits with a few individuals and documentation is out of date.",
      "Infrastructure costs keep rising while the platform becomes harder to scale.",
      "A move to containers or the cloud has been discussed but never planned in detail.",
    ],
    capabilities: [
      {
        title: "Modernization assessment",
        description:
          "Codebase, dependency and architecture analysis that identifies risks, quick wins and a realistic, sequenced roadmap.",
      },
      {
        title: "Java and framework upgrades",
        description:
          "Upgrading older Java versions to current LTS releases, migrating to modern Spring Boot, and replacing deprecated libraries and APIs.",
      },
      {
        title: "Performance engineering",
        description:
          "Profiling, load testing, query optimisation, caching strategy, connection pooling and JVM tuning, guided by measurements rather than hunches.",
      },
      {
        title: "Technical debt reduction",
        description:
          "Targeted refactoring of the areas that slow delivery most, with tests added first so behaviour is preserved.",
      },
      {
        title: "Incremental migration",
        description:
          "Strangler-fig extraction of modules into services, API facades over legacy components, and staged data migrations.",
      },
      {
        title: "Operational readiness",
        description:
          "Containerisation, CI/CD, observability and runbooks, so the modernized system is easier to operate than the old one.",
      },
    ],
    approaches: [
      {
        title: "Measure first",
        description:
          "Baseline performance, error rates and build times before changing anything, so improvements and regressions are visible.",
      },
      {
        title: "Characterisation tests",
        description:
          "Tests that capture what the system does today, including its quirks, make it safe to change code nobody fully understands.",
      },
      {
        title: "Small, reversible steps",
        description:
          "Each change is deployable on its own and can be rolled back. Feature flags and parallel runs reduce risk further where appropriate.",
      },
      {
        title: "Compatibility planning",
        description:
          "We map dependencies, integration contracts and data formats early, so downstream systems are not surprised by an upgrade.",
      },
    ],
    useCases: [
      {
        title: "Java 8 to current LTS",
        description:
          "A business-critical application on an old Java runtime needs a supported version, updated libraries and a working build pipeline.",
      },
      {
        title: "Slow reporting module",
        description:
          "A module that generates reports takes minutes to respond. Profiling reveals query and memory issues that can be fixed without redesigning the system.",
      },
      {
        title: "Monolith to modular services",
        description:
          "A large monolith slows down several teams. A carefully chosen set of modules is extracted behind stable APIs, while the rest is restructured internally.",
      },
      {
        title: "Data centre to cloud",
        description:
          "An on-premises application is prepared for containers and cloud hosting, with configuration, secrets and observability modernized along the way.",
      },
    ],
    engagement: [
      {
        title: "Assessment",
        description: "A time-boxed review producing findings, risks and a sequenced modernization plan you can act on with or without us.",
      },
      {
        title: "Modernization delivery",
        description: "We execute the plan in increments, reporting progress against agreed measures.",
      },
      {
        title: "Performance sprint",
        description: "A focused engagement on a specific performance problem, ending with fixes, evidence and recommendations.",
      },
    ],
    quality: [
      {
        title: "Risk control",
        description: "Every increment has a rollback path, and high-risk changes get additional validation in staging.",
      },
      {
        title: "Security",
        description: "Upgrades prioritise components with known vulnerabilities and remove unsupported dependencies.",
      },
      {
        title: "Knowledge transfer",
        description: "We document the system as we learn it, so knowledge is no longer held by a few individuals.",
      },
    ],
    candidNote: {
      title: "What we will tell you honestly",
      body: [
        "Not every legacy application can be migrated cheaply or without constraints. Some depend on unsupported vendor products, undocumented integrations or data that needs cleansing first. Sometimes the right answer is to stabilise and contain a system rather than modernize it.",
        "Our assessment will say so plainly, along with the trade-offs of each option, so you can make an informed decision.",
      ],
    },
    technologies: ["Java", "Spring Boot", "Jakarta EE", "Maven", "Gradle", "JUnit", "Testcontainers", "JMeter", "Gatling", "Docker", "Kubernetes", "OpenTelemetry"],
    related: ["full-stack-development", "architecture-advisory", "cloud-data-engineering"],
  },
  {
    slug: "ai-llm-engineering",
    title: "AI & LLM Application Engineering",
    shortTitle: "AI & LLM Engineering",
    pillar: "intelligence",
    icon: "brain",
    summary:
      "Integrate large language models into real products: retrieval, structured outputs, evaluation, observability and data protection included.",
    metaDescription:
      "AI and LLM engineering: LLM integration, retrieval-augmented generation (RAG), structured outputs, application integration, evaluation, observability, data protection and production operations.",
    hero: {
      eyebrow: "Intelligence · AI & LLMs",
      headline: "LLM features engineered like the rest of your software: tested, observable and safe.",
      intro:
        "A convincing demo is easy. A dependable AI feature is engineering. We build LLM-powered capabilities into your products and workflows with the evaluation, guardrails and operational discipline they need in production.",
    },
    solves: [
      "Many organisations have experimented with large language models and found that prototypes behave unpredictably once real users, real documents and real edge cases arrive. Costs are hard to forecast, answers are hard to verify and nobody is sure whether a prompt change made things better or worse.",
      "We treat LLM features as software components with inputs, outputs, failure modes and quality measures. That means grounding responses in your data, constraining outputs to structures your application can trust, measuring quality against representative test sets, and monitoring behaviour after release.",
    ],
    challenges: [
      "A promising AI prototype gives inconsistent or unverifiable answers.",
      "Teams want to use internal knowledge with an LLM but are unsure how to handle access control and sensitive data.",
      "Outputs need to feed other systems, but free-form text is unreliable to parse.",
      "Model and API costs are growing without visibility into where they come from.",
      "There is no way to tell whether a model upgrade or prompt change improved results.",
    ],
    capabilities: [
      {
        title: "LLM integration",
        description:
          "Integrating hosted or self-hosted models into applications through well-designed service layers, with provider abstraction where switching models is a realistic need.",
      },
      {
        title: "Retrieval-augmented generation",
        description:
          "Document ingestion, chunking, embeddings, hybrid search and re-ranking, with permission-aware retrieval and source citations in responses.",
      },
      {
        title: "Structured outputs",
        description:
          "Schema-constrained generation and validation, so AI output can safely drive downstream logic, forms and integrations.",
      },
      {
        title: "Application integration",
        description:
          "Embedding AI capabilities into existing products and workflows: user interfaces, APIs, background jobs and human review steps.",
      },
      {
        title: "Evaluation and observability",
        description:
          "Test sets, automated checks and tracing of prompts, retrieved context, latency and cost, so behaviour is measurable before and after release.",
      },
      {
        title: "Data protection",
        description:
          "Data minimisation, redaction, retention controls and provider configuration aligned with your security and privacy requirements.",
      },
    ],
    approaches: [
      {
        title: "Start from the task",
        description:
          "We define what a good output looks like for your use case, with examples, before choosing models, prompts or frameworks.",
      },
      {
        title: "Ground and cite",
        description:
          "Answers are grounded in retrieved, permissioned sources and show their references, which makes them easier to verify and trust.",
      },
      {
        title: "Constrain and validate",
        description:
          "Outputs are validated against schemas and business rules; failures trigger retries, fallbacks or human review rather than silent errors.",
      },
      {
        title: "Operate deliberately",
        description:
          "Rate limits, timeouts, caching, cost budgets and model version pinning are designed in, with dashboards that make behaviour visible.",
      },
    ],
    useCases: [
      {
        title: "Knowledge assistant",
        description:
          "Staff ask questions in natural language and receive cited answers drawn from policies, manuals and documentation they are allowed to access.",
      },
      {
        title: "Document processing",
        description:
          "Contracts, invoices or forms are classified and key fields extracted into structured data, with confidence thresholds and human review.",
      },
      {
        title: "Support augmentation",
        description:
          "Support agents receive suggested replies and relevant knowledge articles, while staying in control of what is sent to customers.",
      },
      {
        title: "Product feature",
        description:
          "An existing SaaS product adds summarisation, search or drafting features that fit naturally into its user experience.",
      },
    ],
    engagement: [
      {
        title: "Feasibility sprint",
        description: "A short, evidence-led exploration of whether an LLM approach can meet your quality bar, using your data and a test set.",
      },
      {
        title: "Production build",
        description: "Design and implementation of the AI feature, including evaluation, monitoring and handover.",
      },
      {
        title: "Hardening",
        description: "Taking an existing prototype to production readiness: evaluation, guardrails, observability and cost control.",
      },
    ],
    quality: [
      {
        title: "Privacy and security",
        description: "Sensitive data handling, prompt injection awareness and least-privilege access to tools and data sources.",
      },
      {
        title: "Reliability",
        description: "Fallbacks for provider outages, timeouts and malformed outputs, plus regression tests for known failure cases.",
      },
      {
        title: "Transparency",
        description: "Users can see sources, and the business can see quality, cost and usage trends.",
      },
    ],
    candidNote: {
      title: "When AI is not the answer",
      body: [
        "Some problems are better solved with conventional software: deterministic rules, a well-designed search index, a database query or a better form. These options are usually cheaper, faster and easier to verify.",
        "If a conventional approach will meet your needs more reliably, we will recommend it. Where AI does add value, we often combine it with conventional components so each does what it is best at.",
      ],
    },
    technologies: ["Python", "TypeScript", "OpenAI API", "Anthropic API", "Google Vertex AI", "LangGraph", "pgvector", "Elasticsearch", "Pydantic", "Zod", "OpenTelemetry"],
    related: ["agentic-ai-automation", "llm-evaluation", "cloud-data-engineering"],
  },
  {
    slug: "agentic-ai-automation",
    title: "Agentic AI, Intelligent Automation & MCP Integrations",
    shortTitle: "Agentic AI & Automation",
    pillar: "intelligence",
    icon: "workflow",
    summary:
      "Agent workflows that use tools and systems with clear permissions, human approval, audit trails and designed-in failure handling.",
    metaDescription:
      "Agentic AI and intelligent automation: tool calling, workflow orchestration, Model Context Protocol (MCP) integrations, permissions, human approval, guardrails, auditability and failure handling.",
    hero: {
      eyebrow: "Intelligence · Agents & automation",
      headline: "Automation that acts on your systems, with controls you can trust.",
      intro:
        "AI agents can read, decide and act across tools and systems. That power needs engineering: scoped permissions, approval steps, audit logs and predictable behaviour when something goes wrong.",
    },
    solves: [
      "Many business processes involve repetitive coordination: gathering information from several systems, making routine decisions and updating records. Agentic workflows can take on parts of this work, but only if they are designed with the same rigour as any system that changes data.",
      "We build agentic and automated workflows where the scope of each agent is explicit, its tools are narrowly defined, high-impact actions require human approval, and every step is logged. Where a fixed workflow is more reliable than open-ended autonomy, we use one.",
    ],
    challenges: [
      "Teams spend hours each week moving information between systems and following routine procedures.",
      "AI pilots can draft or summarise, but cannot safely take action in business systems.",
      "Internal tools and data need to be exposed to AI assistants in a controlled, auditable way.",
      "There is concern about agents taking unintended actions or accessing data they should not.",
      "Existing automation scripts are fragile and break when inputs vary.",
    ],
    capabilities: [
      {
        title: "Tool calling and orchestration",
        description:
          "Designing tool interfaces, orchestration logic and state management for single-agent and multi-step workflows.",
      },
      {
        title: "MCP servers and integrations",
        description:
          "Building Model Context Protocol servers that expose your systems and data to AI clients with authentication, scoping and logging.",
      },
      {
        title: "Workflow automation",
        description:
          "Combining deterministic workflow steps with AI judgement where it adds value, including retries, timeouts and compensation logic.",
      },
      {
        title: "Permissions and approvals",
        description:
          "Least-privilege credentials per tool, approval gates for sensitive actions and clear escalation to humans.",
      },
      {
        title: "Guardrails",
        description:
          "Input and output validation, policy checks, rate limits, spend limits and defences against prompt injection from untrusted content.",
      },
      {
        title: "Audit and observability",
        description:
          "Complete traces of what the agent saw, decided and did, so behaviour can be reviewed, explained and improved.",
      },
    ],
    approaches: [
      {
        title: "Narrow before broad",
        description:
          "We start with a well-defined task and a small set of tools, prove reliability, then expand scope deliberately.",
      },
      {
        title: "Human in the loop by design",
        description:
          "Actions are classified by impact. Low-risk steps can run automatically; consequential ones wait for approval with full context.",
      },
      {
        title: "Assume inputs can be hostile",
        description:
          "Content from emails, documents and websites is treated as untrusted data that must never be able to redirect the agent's instructions.",
      },
      {
        title: "Fail visibly and safely",
        description:
          "When a step fails or confidence is low, the workflow stops, records why and hands over to a person rather than guessing.",
      },
    ],
    useCases: [
      {
        title: "Operations triage",
        description:
          "Incoming requests are classified, enriched with data from internal systems and routed, with drafts prepared for human review.",
      },
      {
        title: "AI access to internal systems",
        description:
          "An MCP server gives approved AI assistants read access to a ticketing system and documentation, with every query logged.",
      },
      {
        title: "Finance back-office assistant",
        description:
          "Invoices are matched against purchase orders and exceptions are prepared for approval, with no payment action taken automatically.",
      },
      {
        title: "Engineering productivity",
        description:
          "Workflows that gather context from repositories, issue trackers and logs to help engineers investigate incidents faster.",
      },
    ],
    engagement: [
      {
        title: "Process discovery",
        description: "We map a candidate process, identify where automation adds value and define the controls it needs.",
      },
      {
        title: "Pilot",
        description: "A scoped pilot with real systems in a controlled environment, evaluated against agreed success and safety criteria.",
      },
      {
        title: "Production rollout",
        description: "Hardening, monitoring, runbooks and a staged rollout with clear criteria for expanding scope.",
      },
    ],
    quality: [
      {
        title: "Security",
        description: "Scoped credentials, secrets management, network boundaries and review of every tool an agent can call.",
      },
      {
        title: "Auditability",
        description: "Immutable logs of inputs, decisions, tool calls and approvals for every run.",
      },
      {
        title: "Reliability",
        description: "Evaluation suites for agent behaviour and regression tests for previously observed failures.",
      },
    ],
    candidNote: {
      title: "A realistic view of agents",
      body: [
        "Autonomous agents are not inherently safe or fully reliable. Language models can misread instructions, be manipulated by untrusted content or take plausible but wrong actions.",
        "We design every agentic system on that assumption: limiting what it can do, verifying what it did and keeping people in control of consequential decisions.",
      ],
    },
    technologies: ["Model Context Protocol", "Python", "TypeScript", "LangGraph", "Temporal", "REST", "Webhooks", "OAuth 2.0", "OpenTelemetry", "PostgreSQL"],
    related: ["ai-llm-engineering", "llm-evaluation", "full-stack-development"],
  },
  {
    slug: "llm-evaluation",
    title: "LLM Evaluation & Reliability Engineering",
    shortTitle: "LLM Evaluation",
    pillar: "intelligence",
    icon: "gauge",
    summary:
      "Evaluation datasets, regression suites and production monitoring that tell you whether your AI application is actually getting better.",
    metaDescription:
      "LLM evaluation and reliability engineering: evaluation datasets, regression testing, model and prompt comparison, output quality checks, reliability testing and production monitoring for AI applications.",
    hero: {
      eyebrow: "Intelligence · Evaluation",
      headline: "Know whether your AI application works, and keep knowing after every change.",
      intro:
        "Without evaluation, every prompt edit and model upgrade is a guess. We build the datasets, metrics and pipelines that turn AI quality into something you can measure, compare and monitor.",
    },
    solves: [
      "LLM applications fail in ways traditional tests do not catch: an answer can be fluent and wrong, a model upgrade can quietly change tone or accuracy, and a fix for one case can break three others.",
      "We help teams define what quality means for their specific application and risk profile, build representative evaluation sets, automate scoring where it is trustworthy, and keep humans in the loop where it is not. The result is a regression suite for AI behaviour that runs before every release and a monitoring view that shows how the system performs in production.",
    ],
    challenges: [
      "Quality is judged by trying a few examples by hand before each release.",
      "Teams cannot compare models or prompts objectively, so decisions rest on impressions.",
      "Users report problems that the team cannot reproduce or measure.",
      "A model provider update changed behaviour and nobody noticed for weeks.",
      "Stakeholders want evidence of reliability before approving a wider rollout.",
    ],
    capabilities: [
      {
        title: "Evaluation strategy",
        description:
          "Defining quality dimensions, such as correctness, groundedness, completeness, safety, format and tone, weighted by what matters for your use case.",
      },
      {
        title: "Evaluation datasets",
        description:
          "Curating representative, edge-case and adversarial examples from real usage and domain expertise, with versioning and clear labelling guidelines.",
      },
      {
        title: "Automated and model-graded checks",
        description:
          "Deterministic checks where possible, carefully calibrated model-graded evaluation where needed, and agreement analysis against human reviewers.",
      },
      {
        title: "Regression testing",
        description:
          "Evaluation suites wired into CI so prompt, retrieval and model changes are scored before they reach users.",
      },
      {
        title: "Model and prompt comparison",
        description:
          "Structured experiments comparing quality, latency and cost across models, prompts and retrieval configurations.",
      },
      {
        title: "Production monitoring",
        description:
          "Sampling, feedback capture, drift detection and dashboards that track quality and reliability over time.",
      },
    ],
    approaches: [
      {
        title: "Tailored to risk",
        description:
          "A marketing copy assistant and a tool that summarises medical or financial documents need very different evaluation depth. We size the effort to the consequences of failure.",
      },
      {
        title: "Ground truth first",
        description:
          "Before automating any scoring, we establish what correct looks like with domain experts, so automated metrics are anchored to real judgement.",
      },
      {
        title: "Validate the evaluator",
        description:
          "Model-graded checks are themselves tested against human labels; we report where they agree and where they cannot be trusted.",
      },
      {
        title: "Close the loop",
        description:
          "Production failures become new test cases, so the suite grows in exactly the places the system has struggled.",
      },
    ],
    useCases: [
      {
        title: "Pre-launch confidence",
        description:
          "Before rolling a RAG assistant out company-wide, a team needs measured evidence of answer accuracy and citation quality.",
      },
      {
        title: "Model migration",
        description:
          "A team wants to move to a newer or cheaper model and needs to know exactly what changes in quality, latency and cost.",
      },
      {
        title: "Extraction accuracy",
        description:
          "A document extraction pipeline needs field-level accuracy measurements and thresholds that decide when to route to human review.",
      },
      {
        title: "Safety regression suite",
        description:
          "A customer-facing assistant needs consistent checks against harmful, off-topic or policy-violating responses on every release.",
      },
    ],
    engagement: [
      {
        title: "Evaluation audit",
        description: "Review of current quality practices with a prioritised plan and a starter evaluation set.",
      },
      {
        title: "Evaluation pipeline build",
        description: "Implementation of datasets, scoring, CI integration and reporting for your application.",
      },
      {
        title: "Ongoing reliability support",
        description: "Periodic evaluation reviews, dataset maintenance and support for model or prompt changes.",
      },
    ],
    quality: [
      {
        title: "Reproducibility",
        description: "Versioned datasets, prompts and model configurations make every result traceable and repeatable.",
      },
      {
        title: "Honest reporting",
        description: "Results include uncertainty, sample sizes and known blind spots, not just headline scores.",
      },
      {
        title: "Data handling",
        description: "Evaluation data drawn from production is anonymised or minimised according to your policies.",
      },
    ],
    technologies: ["Python", "pytest", "Pandas", "Jupyter", "OpenTelemetry", "BigQuery", "GitHub Actions", "Langfuse", "Promptfoo"],
    related: ["ai-llm-engineering", "agentic-ai-automation", "architecture-advisory"],
  },
  {
    slug: "sap-basis",
    title: "SAP Development & BASIS Services",
    shortTitle: "SAP & BASIS",
    pillar: "connect",
    icon: "server",
    summary:
      "SAP-related development, administration, troubleshooting and BASIS support, scoped to your landscape and confirmed against available expertise.",
    metaDescription:
      "SAP development and BASIS services: SAP-related development, implementation support, system administration, troubleshooting, integration and BASIS operations scoped to your landscape.",
    hero: {
      eyebrow: "Connect · SAP & BASIS",
      headline: "Keep your SAP landscape healthy, connected and moving forward.",
      intro:
        "SAP systems sit at the centre of many enterprises. We provide SAP-related development and BASIS support, and connect SAP with the wider application and data estate, scoped carefully to your landscape and our confirmed expertise.",
    },
    solves: [
      "SAP environments need steady care: system administration, transports, performance, user and authorisation management, upgrades and integration with surrounding applications. Specialist capacity is often scarce exactly when it is needed.",
      "We work with organisations and their partners to provide SAP-related development and BASIS services where our expertise matches the requirement. Every engagement begins by understanding your landscape, versions and support model, so scope and responsibilities are clear before work starts.",
    ],
    challenges: [
      "BASIS administration tasks are queuing up because in-house capacity is limited.",
      "System performance issues or recurring errors need structured troubleshooting.",
      "SAP needs to exchange data with modern applications, cloud platforms or analytics tools.",
      "An upgrade, migration or system copy needs additional hands and careful planning.",
      "Custom developments are poorly documented and difficult to maintain.",
    ],
    capabilities: [
      {
        title: "BASIS administration",
        description:
          "System monitoring, transport management, client administration, user and role administration support, background jobs and housekeeping.",
      },
      {
        title: "Troubleshooting and performance",
        description:
          "Structured analysis of system errors, dumps, performance bottlenecks and interface failures, with documented root causes and fixes.",
      },
      {
        title: "Technical operations support",
        description:
          "Support for system copies, refreshes, kernel and support package updates and related technical activities, planned around your change windows.",
      },
      {
        title: "SAP-related development",
        description:
          "Custom development and enhancements where they fit our confirmed skill set, with documentation and testing.",
      },
      {
        title: "Integration",
        description:
          "Connecting SAP with external applications and data platforms through APIs, middleware and data pipelines, built with the wider engineering team.",
      },
      {
        title: "Documentation and runbooks",
        description:
          "Capturing landscape knowledge, procedures and configuration so operations depend less on individual memory.",
      },
    ],
    approaches: [
      {
        title: "Landscape first",
        description:
          "We start by understanding your systems, versions, hosting, support contracts and change processes before proposing work.",
      },
      {
        title: "Clear responsibilities",
        description:
          "We agree what we own, what your team or other partners own, and how escalation works, especially for production systems.",
      },
      {
        title: "Change discipline",
        description:
          "Changes follow your transport and approval processes, with backups and rollback plans for technical activities.",
      },
      {
        title: "Bridging SAP and modern engineering",
        description:
          "Our broader software and data engineering skills help when SAP needs to connect with cloud platforms, analytics or custom applications.",
      },
    ],
    useCases: [
      {
        title: "Additional BASIS capacity",
        description:
          "An IT team needs reliable BASIS support for routine administration while its own specialists focus on a major project.",
      },
      {
        title: "Recurring interface failures",
        description:
          "Interfaces between SAP and a warehouse system fail intermittently. Structured troubleshooting identifies the cause and adds monitoring.",
      },
      {
        title: "SAP data into analytics",
        description:
          "Finance wants SAP data available alongside other sources in a cloud data warehouse for reporting.",
      },
      {
        title: "Partner subcontracting",
        description:
          "A system integrator needs a dependable partner to deliver part of an SAP-related engagement under its governance.",
      },
    ],
    engagement: [
      {
        title: "Scoping call",
        description: "We discuss your landscape and requirements and confirm whether our expertise is the right fit.",
      },
      {
        title: "Defined tasks",
        description: "Specific activities delivered against an agreed plan, such as a system copy or troubleshooting exercise.",
      },
      {
        title: "Ongoing support",
        description: "A recurring support arrangement with agreed scope, communication channels and response expectations.",
      },
    ],
    quality: [
      {
        title: "Production safety",
        description: "Changes are planned, approved and reversible wherever the platform allows.",
      },
      {
        title: "Access control",
        description: "We work with the minimum access required and follow your security policies for privileged accounts.",
      },
      {
        title: "Transparency",
        description: "Every activity is documented, and findings are shared in plain language as well as technical detail.",
      },
    ],
    candidNote: {
      title: "How we scope SAP work",
      body: [
        "SAP is a broad ecosystem with many products and versions. We do not claim expertise across all of it, and we hold no SAP partnership or certification that we have not stated.",
        "Before any engagement we confirm the specific products, versions and tasks involved, and we will tell you plainly if a requirement falls outside what we can deliver well.",
      ],
    },
    technologies: ["SAP NetWeaver", "SAP BASIS", "ABAP", "SAP Solution Manager", "OData", "SAP HANA", "Linux", "Integration middleware"],
    related: ["cloud-data-engineering", "architecture-advisory", "full-stack-development"],
  },
  {
    slug: "cloud-data-engineering",
    title: "Cloud & Data Engineering",
    shortTitle: "Cloud & Data",
    pillar: "connect",
    icon: "database",
    summary:
      "Data pipelines, BigQuery warehouses and cloud infrastructure built for quality, observability and dependable day-to-day operation.",
    metaDescription:
      "Cloud and data engineering: data integration, Google Cloud, BigQuery, data pipelines, reporting, data quality, observability and operational reliability.",
    hero: {
      eyebrow: "Connect · Cloud & data",
      headline: "Data you can trust, arriving where it is needed, on time.",
      intro:
        "We design and build data pipelines, warehouses and cloud infrastructure that turn scattered operational data into dependable reporting and a foundation for analytics and AI.",
    },
    solves: [
      "Organisations often have valuable data spread across applications, spreadsheets and SaaS tools. Reports disagree, pipelines fail quietly overnight and nobody is quite sure which numbers to believe.",
      "We build data platforms with the same discipline as application software: version-controlled transformations, automated tests for data quality, monitoring with alerts that reach the right people and clear ownership of each dataset. Our particular strength is Google Cloud and BigQuery, and we work with other platforms where a project requires it.",
    ],
    challenges: [
      "Reporting depends on manual exports and spreadsheet manipulation.",
      "Data pipelines fail silently and problems are discovered by the people reading reports.",
      "Metrics are defined differently by different teams.",
      "Warehouse costs are rising without clarity on which queries or jobs drive them.",
      "Teams want to use data for AI or advanced analytics, but the foundations are not reliable.",
    ],
    capabilities: [
      {
        title: "Data integration",
        description:
          "Batch and streaming ingestion from databases, SaaS APIs, files and event streams, with change data capture where appropriate.",
      },
      {
        title: "BigQuery data warehousing",
        description:
          "Dataset design, partitioning and clustering, cost controls, access policies and performance tuning for BigQuery.",
      },
      {
        title: "Transformation and modelling",
        description:
          "Version-controlled SQL transformations, dimensional and semantic models and documented metric definitions.",
      },
      {
        title: "Data quality",
        description:
          "Automated tests for freshness, completeness, uniqueness and business rules, with quarantine and alerting for failures.",
      },
      {
        title: "Reporting enablement",
        description:
          "Curated, well-documented datasets that power dashboards and self-service analysis in the BI tools your teams use.",
      },
      {
        title: "Cloud infrastructure",
        description:
          "Infrastructure as code, IAM, networking, CI/CD and observability on Google Cloud, designed to be operated by a small team.",
      },
    ],
    approaches: [
      {
        title: "Data as a product",
        description:
          "Each important dataset has an owner, documentation, quality checks and a clear contract with its consumers.",
      },
      {
        title: "Idempotent, replayable pipelines",
        description:
          "Pipelines can be safely rerun for any period, which makes backfills and recovery routine rather than risky.",
      },
      {
        title: "Observability end to end",
        description:
          "Freshness, volume and quality are monitored alongside job health, so issues are caught before stakeholders notice.",
      },
      {
        title: "Cost awareness",
        description:
          "Partitioning, query patterns, scheduling and budgets are designed to keep spend predictable as data grows.",
      },
    ],
    useCases: [
      {
        title: "Unified reporting",
        description:
          "Sales, finance and operations data from several systems are consolidated into BigQuery with consistent metric definitions.",
      },
      {
        title: "Pipeline reliability",
        description:
          "Fragile scheduled scripts are replaced with orchestrated, tested pipelines that alert on failure and support backfills.",
      },
      {
        title: "Event analytics",
        description:
          "Product events are streamed into the warehouse to analyse usage and feed product decisions.",
      },
      {
        title: "AI-ready data foundation",
        description:
          "Clean, governed datasets and document stores are prepared for retrieval-augmented generation and machine learning use cases.",
      },
    ],
    engagement: [
      {
        title: "Data platform review",
        description: "An assessment of your current data flows, quality and costs with a prioritised roadmap.",
      },
      {
        title: "Platform build",
        description: "Design and delivery of pipelines, warehouse models and monitoring for defined data domains.",
      },
      {
        title: "Reliability and optimisation",
        description: "Targeted work on pipeline stability, data quality or warehouse cost and performance.",
      },
    ],
    quality: [
      {
        title: "Governance",
        description: "Access controls, column-level security and audit logging for sensitive data.",
      },
      {
        title: "Reliability",
        description: "Retries, alerting, runbooks and documented recovery procedures for every critical pipeline.",
      },
      {
        title: "Privacy",
        description: "Personal data minimised, pseudonymised where possible and retained only as long as required.",
      },
    ],
    candidNote: {
      title: "A note on platforms",
      body: [
        "We have hands-on strength in Google Cloud and BigQuery. We do not hold official cloud partner status, and we do not claim certifications we have not earned. Where your organisation is committed to another cloud, we will discuss honestly how our experience applies.",
      ],
    },
    technologies: ["Google Cloud", "BigQuery", "Cloud Composer", "Dataflow", "Pub/Sub", "Cloud Run", "dbt", "Python", "SQL", "Terraform", "Looker Studio"],
    related: ["ai-llm-engineering", "sap-basis", "architecture-advisory"],
  },
  {
    slug: "architecture-advisory",
    title: "Architecture Reviews & Technical Advisory",
    shortTitle: "Architecture & Advisory",
    pillar: "strengthen",
    icon: "compass",
    summary:
      "Independent architecture and code reviews, production-readiness assessments and technical roadmaps from senior engineers.",
    metaDescription:
      "Architecture reviews and technical advisory: architecture and code reviews, scalability, cost, maintainability, reliability, production readiness, technical roadmaps and engineering process improvement.",
    hero: {
      eyebrow: "Strengthen · Architecture & advisory",
      headline: "An experienced second opinion before the expensive decisions.",
      intro:
        "We review architectures, codebases and delivery practices with fresh, senior eyes, then give you clear findings and practical recommendations, prioritised by impact and effort.",
    },
    solves: [
      "Technical decisions made early, such as data models, service boundaries, hosting and frameworks, shape cost, speed and reliability for years. Teams under delivery pressure rarely have time to step back and examine them.",
      "Our advisory work gives leaders an independent, evidence-based view of their systems. We look at the code, the architecture, the operational reality and the way the team works, and we explain what we find in terms that both engineers and business stakeholders can act on.",
    ],
    challenges: [
      "A major investment, such as a new platform, a re-architecture or a scale-up, needs independent validation.",
      "Leadership needs to understand the real state of a codebase before an acquisition, funding round or vendor change.",
      "The system struggles under growth and the team disagrees about the cause.",
      "Cloud costs are rising faster than usage.",
      "Delivery has slowed and it is unclear whether the problem is technical, organisational or both.",
    ],
    capabilities: [
      {
        title: "Architecture review",
        description:
          "Assessment of structure, data flows, integration patterns, scalability and resilience against your current and expected requirements.",
      },
      {
        title: "Code review",
        description:
          "Evaluation of code quality, test coverage, security practices, dependency health and maintainability across representative areas of the codebase.",
      },
      {
        title: "Production-readiness assessment",
        description:
          "Checks of observability, incident response, backups, security controls, deployment safety and capacity before launch or scale-up.",
      },
      {
        title: "Cost and scalability analysis",
        description:
          "Identifying the drivers of infrastructure cost and the bottlenecks that will limit growth, with options and trade-offs.",
      },
      {
        title: "Technical roadmaps",
        description:
          "A sequenced plan that balances new features, technical debt, platform investments and risk reduction.",
      },
      {
        title: "Engineering process improvement",
        description:
          "Practical improvements to code review, testing strategy, CI/CD, incident learning and technical decision-making.",
      },
    ],
    approaches: [
      {
        title: "Evidence over opinion",
        description:
          "Findings are backed by code references, metrics, diagrams and reproducible observations, not general best-practice lists.",
      },
      {
        title: "Context matters",
        description:
          "We judge decisions against your stage, team size, budget and goals. A startup and a regulated enterprise need different answers.",
      },
      {
        title: "Prioritised, not exhaustive",
        description:
          "Recommendations are ranked by impact, effort and risk, so the first steps are obvious.",
      },
      {
        title: "Respect for the team",
        description:
          "We work with your engineers, acknowledge the constraints behind past decisions and focus on the way forward.",
      },
    ],
    useCases: [
      {
        title: "Pre-scale review",
        description:
          "A growing SaaS company expects significantly more customers and wants to know what will break first.",
      },
      {
        title: "Technical due diligence",
        description:
          "An investor or acquirer needs an independent assessment of a product's technical health and risks.",
      },
      {
        title: "Vendor handover",
        description:
          "A business is taking over a system from an outgoing supplier and needs to understand what it is inheriting.",
      },
      {
        title: "Re-architecture decision",
        description:
          "A team proposes moving to microservices; leadership wants an independent view of the benefits, costs and alternatives.",
      },
    ],
    engagement: [
      {
        title: "Focused review",
        description: "A time-boxed assessment of a specific system or question, with a written report and walkthrough.",
      },
      {
        title: "Fractional technical leadership",
        description: "Ongoing senior guidance for teams without a full-time architect or CTO, for an agreed number of days.",
      },
      {
        title: "Review plus delivery",
        description: "We can help implement the recommendations, or support your team as they do.",
      },
    ],
    quality: [
      {
        title: "Confidentiality",
        description: "We are comfortable working under NDA and with restricted, read-only access to code and systems.",
      },
      {
        title: "Independence",
        description: "Recommendations are not tied to selling a particular technology or a follow-on project.",
      },
      {
        title: "Clarity",
        description: "Reports include an executive summary, detailed findings and concrete next steps.",
      },
    ],
    technologies: ["Architecture decision records", "C4 model", "OpenTelemetry", "Static analysis", "Load testing", "Threat modelling", "Cloud cost analysis"],
    related: ["application-modernization", "full-stack-development", "engineering-hiring"],
  },
  {
    slug: "engineering-hiring",
    title: "Engineering Hiring & Technical Assessment",
    shortTitle: "Hiring & Assessment",
    pillar: "strengthen",
    icon: "users",
    summary:
      "Technical screening, interview design and assessment frameworks that help you hire engineers with confidence.",
    metaDescription:
      "Engineering hiring support and technical assessment: technical screening, interview design, assessment frameworks and candidate evaluation, scoped to your requirements.",
    hero: {
      eyebrow: "Strengthen · Hiring & assessment",
      headline: "Hire engineers based on evidence, not interview luck.",
      intro:
        "Hiring the wrong engineer is expensive; missing the right one is worse. We help you design fair, relevant technical assessments and can run technical evaluations on your behalf.",
    },
    solves: [
      "Many companies, especially those without senior technical staff, struggle to evaluate engineering candidates. Interviews drift into trivia, take-home tasks are either too long or too shallow, and good candidates drop out of slow processes.",
      "Drawing on experience of building and leading engineering teams, we help you define what the role actually needs, design an assessment that tests it, and evaluate candidates consistently. The exact scope depends on your requirements: from reviewing your process to conducting technical interviews.",
    ],
    challenges: [
      "A non-technical founder or manager needs to hire a first senior engineer.",
      "Interview processes are inconsistent across interviewers.",
      "Take-home assignments are causing candidates to drop out.",
      "The team is growing fast and senior engineers are spending too much time interviewing.",
      "An agency or consultancy needs an independent technical check of contractors before deployment to a client.",
    ],
    capabilities: [
      {
        title: "Role definition",
        description:
          "Translating business needs into a clear role profile: responsibilities, required skills, desirable skills and seniority expectations.",
      },
      {
        title: "Interview design",
        description:
          "Structured interview stages with relevant technical, system design and collaboration exercises, and clear scoring rubrics.",
      },
      {
        title: "Assessment frameworks",
        description:
          "Reusable rubrics and calibration guides so different interviewers evaluate candidates consistently.",
      },
      {
        title: "Technical screening",
        description:
          "Initial technical screens to assess fundamentals and communication before candidates reach your team.",
      },
      {
        title: "Candidate evaluation",
        description:
          "In-depth technical interviews conducted on your behalf, with written, evidence-based feedback.",
      },
      {
        title: "Process review",
        description:
          "Reviewing your current hiring funnel for fairness, candidate experience, speed and signal quality.",
      },
    ],
    approaches: [
      {
        title: "Test the real job",
        description:
          "Exercises resemble the work the person will actually do, rather than puzzles unrelated to the role.",
      },
      {
        title: "Structured and fair",
        description:
          "Every candidate faces the same core questions and rubric, which reduces bias and makes comparisons meaningful.",
      },
      {
        title: "Respect candidates' time",
        description:
          "Assessments are scoped to a reasonable time commitment and candidates receive a clear explanation of the process.",
      },
      {
        title: "You make the decision",
        description:
          "We provide evidence and recommendations; hiring decisions remain yours.",
      },
    ],
    useCases: [
      {
        title: "First engineering hire",
        description:
          "A startup founder without a technical background needs help evaluating senior backend candidates.",
      },
      {
        title: "Interview kit for a scale-up",
        description:
          "A growing company wants a consistent interview process for backend, frontend and data roles.",
      },
      {
        title: "Contractor vetting",
        description:
          "A consultancy wants independent technical evaluation of engineers before placing them with clients.",
      },
      {
        title: "Specialist assessment",
        description:
          "A team hiring for AI engineering wants exercises that distinguish real production experience from surface familiarity.",
      },
    ],
    engagement: [
      {
        title: "Process design",
        description: "A one-off engagement to design roles, interview stages and rubrics for your team.",
      },
      {
        title: "Per-candidate evaluation",
        description: "Technical interviews and written evaluations for candidates you shortlist.",
      },
      {
        title: "Hiring support period",
        description: "Ongoing support through a hiring push, adapting the process as you learn.",
      },
    ],
    quality: [
      {
        title: "Candidate privacy",
        description: "Candidate information is handled confidentially and used only for the evaluation you requested.",
      },
      {
        title: "Fairness",
        description: "Structured rubrics and job-relevant exercises help reduce bias in evaluation.",
      },
      {
        title: "Scope clarity",
        description: "We are not a recruitment agency; scope, responsibilities and any sourcing support are agreed explicitly.",
      },
    ],
    technologies: ["Structured interviews", "System design exercises", "Code review exercises", "Scoring rubrics", "Calibration"],
    related: ["architecture-advisory", "full-stack-development", "software-product-development"],
  },
];

export const pillars: Record<CapabilityPillar, { label: string; tagline: string; description: string; code: string }> = {
  build: {
    label: "Build",
    code: "SYS·01",
    tagline: "Software products & full-stack applications",
    description:
      "New products, platforms and internal tools engineered end to end, from discovery and architecture to frontend, backend and deployment.",
  },
  modernize: {
    label: "Modernize",
    code: "SYS·02",
    tagline: "Legacy systems & existing platforms",
    description:
      "Upgrade ageing platforms, reduce technical debt and improve performance in safe, reversible steps instead of risky rewrites.",
  },
  intelligence: {
    label: "Intelligence",
    code: "SYS·03",
    tagline: "AI, LLMs, agents & automation",
    description:
      "LLM features, agentic workflows and MCP integrations, engineered with evaluation, guardrails and human oversight.",
  },
  connect: {
    label: "Connect",
    code: "SYS·04",
    tagline: "Integrations, cloud & data",
    description:
      "Data pipelines, BigQuery, cloud infrastructure and SAP connectivity that move trustworthy data to where decisions happen.",
  },
  strengthen: {
    label: "Strengthen",
    code: "SYS·05",
    tagline: "Architecture, leadership & specialised engineering",
    description:
      "Architecture reviews, technical advisory and engineering hiring support from people who have led teams and shipped production systems.",
  },
};

export const pillarOrder: CapabilityPillar[] = ["build", "modernize", "intelligence", "connect", "strengthen"];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByPillar(pillar: CapabilityPillar): Service[] {
  return services.filter((s) => s.pillar === pillar);
}
