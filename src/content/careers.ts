import type { Role } from "./types";

/**
 * Open positions. The list is intentionally empty: there are no confirmed
 * vacancies yet. Add a Role object with open: true to publish one; the
 * careers page switches from the talent-network view automatically.
 *
 * Example (do not publish until real):
 * {
 *   slug: "senior-backend-engineer",
 *   title: "Senior Backend Engineer (Java)",
 *   type: "Full-time · Contract considered",
 *   location: "Remote · India",
 *   summary: "...",
 *   responsibilities: ["..."],
 *   requirements: ["..."],
 *   open: true,
 * }
 */
export const roles: Role[] = [];

export const openRoles = () => roles.filter((r) => r.open);

export const engineeringPrinciples = [
  {
    title: "Ownership over hand-offs",
    description:
      "Engineers understand the problem behind the ticket and see their work through to production, not just to a merged pull request.",
  },
  {
    title: "Quality as a habit",
    description:
      "Tests, code review and documentation are part of the work, not a phase at the end of it.",
  },
  {
    title: "Honesty with clients and each other",
    description:
      "We say what we know, what we don't, and what we would do differently. Risks are raised early.",
  },
  {
    title: "The simplest thing that will last",
    description:
      "We prefer clear, maintainable solutions over clever ones, and choose technology to fit the problem rather than the trend.",
  },
  {
    title: "Continuous learning",
    description:
      "The field moves quickly. We make time to learn, share what we learn and apply it carefully.",
  },
];
