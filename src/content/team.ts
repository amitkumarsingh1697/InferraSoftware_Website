import type { TeamMember } from "./types";

/**
 * Team profiles. Only confirmed facts belong here.
 *
 * - photo: add an image to /public/team/ and set the path, e.g. "/team/amit.jpg".
 *   Until then an abstract, clearly non-photographic avatar is shown.
 * - bio: paragraphs written or approved by the person. Leave empty until then;
 *   nothing is shown on the live site for an empty bio.
 * - links: https URLs only (LinkedIn, GitHub, personal site).
 *
 * Add a new person by appending an object. The About page and homepage
 * adapt automatically.
 */
export const team: TeamMember[] = [
  {
    id: "amit-kumar-singh",
    name: "Amit Kumar Singh",
    role: "Founder",
    photo: null,
    bio: [
      "Amit founded Inferra Software after more than eight years in software engineering and technical leadership.",
      "Amit has led engineering teams and delivered enterprise-grade software across multiple functional domains. In earlier professional roles, Amit contributed to products and platforms used by millions of end users.",
    ],
    expertise: ["Software engineering", "Technical leadership", "Enterprise software delivery"],
    links: [],
    hue: 265,
  },
  {
    id: "vipin-bhatt",
    name: "Vipin Bhatt",
    role: "Chief Technology Officer",
    photo: null,
    bio: [
      "Vipin Bhatt serves as Chief Technology Officer at Inferra Software. He brings five years of professional experience in the data transformation and data ingestion domain.",
      "Over the past two years, Vipin has focused on agentic AI systems, AI evaluation and the frameworks that support them.",
    ],
    expertise: ["Data ingestion", "Data transformation", "Agentic AI", "AI evaluation"],
    links: [],
    hue: 195,
  },
  {
    id: "sumit-mishra",
    name: "Sumit Mishra",
    role: "Chief Operating Officer",
    photo: null,
    bio: [
      "Sumit Mishra serves as Chief Operating Officer at Inferra Software. He began his career in manual quality assurance and went on to work extensively with SAP systems.",
      "Sumit also brings experience in team leadership.",
    ],
    expertise: ["SAP systems", "Quality assurance", "Team leadership"],
    links: [],
    hue: 310,
  },
];

export const founder = team[0];
