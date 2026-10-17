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
    role: "Senior Developer",
    photo: null,
    bio: [],
    expertise: [],
    links: [],
    hue: 195,
  },
  {
    id: "sumit-mishra",
    name: "Sumit Mishra",
    role: "Senior Developer",
    photo: null,
    bio: [],
    expertise: [],
    links: [],
    hue: 310,
  },
];

export const founder = team[0];
