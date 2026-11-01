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
      "Amit started Inferra Software to give growing businesses a software partner that builds with the same care they would bring to their own product.",
      "Over more than eight years in software engineering and technical leadership, Amit has led engineering teams, delivered enterprise-grade software across multiple functional domains and helped build products and platforms used by millions of people. Today he sets the direction for Inferra and makes sure every client gets senior attention from the first conversation to launch.",
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
      "Vipin leads technology at Inferra Software. He is the person who turns ambitious ideas into systems that hold up in the real world.",
      "His foundation is five years in data transformation and data ingestion, the careful engineering that decides whether data arrives clean, on time and ready to use. For the past two years he has been working at the frontier of agentic AI, on AI systems that can act on their own and the evaluation frameworks that show they behave as intended. That mix of disciplined data engineering and hands-on AI work shapes how Inferra designs every solution.",
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
      "Sumit runs operations at Inferra Software, keeping every project organised, on track and accountable to the people who depend on it.",
      "He began his career in manual quality assurance, where he learned to see software through the eyes of the people who use it. He then moved into SAP, working extensively on large enterprise systems, and went on to lead teams. That path from quality to enterprise systems to leadership is why Sumit holds a high bar for how work gets delivered.",
    ],
    expertise: ["SAP systems", "Quality assurance", "Team leadership"],
    links: [],
    hue: 310,
  },
];

export const founder = team[0];
