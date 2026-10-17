/** Delivery lifecycle shown on the homepage and About page. */
export const approachStages = [
  {
    id: "discover",
    title: "Discover",
    summary: "Understand the business problem.",
    detail:
      "We learn the goals, users, constraints and existing systems, and agree what success looks like before choosing a solution.",
  },
  {
    id: "architect",
    title: "Architect",
    summary: "Define the solution and technical approach.",
    detail:
      "We shape an architecture proportionate to the problem, record key decisions and identify risks worth tackling early.",
  },
  {
    id: "build",
    title: "Build",
    summary: "Implement with sound engineering practice.",
    detail:
      "Working software in short iterations, with code review, automated tests and regular demos so progress is visible.",
  },
  {
    id: "validate",
    title: "Validate",
    summary: "Test functionality, quality and reliability.",
    detail:
      "Functional, integration, performance and security checks appropriate to the risk, plus evaluation for AI components.",
  },
  {
    id: "deliver",
    title: "Deliver",
    summary: "Prepare for production and deployment.",
    detail:
      "Environments, monitoring, documentation and a release plan with rollback, so going live is controlled and uneventful.",
  },
  {
    id: "evolve",
    title: "Evolve",
    summary: "Support improvements where agreed.",
    detail:
      "Post-launch support, iteration and knowledge transfer, scoped to what you need, including handover to your own team.",
  },
] as const;

export const engagementModels = [
  {
    title: "Project delivery",
    description: "A defined outcome delivered by our team, with milestones, demos and acceptance criteria.",
  },
  {
    title: "Dedicated engineering capacity",
    description: "Senior engineers working as part of your team on an ongoing basis.",
  },
  {
    title: "Partner & white-label delivery",
    description: "Delivery for agencies, consultancies and system integrators, under your brand and governance.",
  },
  {
    title: "Advisory & assessment",
    description: "Time-boxed reviews, technical leadership and hiring support.",
  },
] as const;
