# Content guide

Everything a visitor reads is stored as typed data or MDX in `src/config` and
`src/content`. TypeScript checks the shape of every entry, so `npm run build`
fails loudly if a field is missing or misspelt.

After any edit, run `npm run dev` to preview, then `npm run check` before
deploying.

## Ground rules

1. **Only publish what is true and approved.** Leave a field `null` or empty
   until it is real. The site hides missing items instead of showing
   placeholders.
2. **Keep the founder's history separate from company results.** "8+ years" and
   "millions of users" describe Amit's earlier career, and the site always
   says so.
3. **Never name a client, show a logo, quote a testimonial or publish a metric
   without written permission.**
4. **Label demonstrators.** Anything that is not delivered client work keeps its
   "Engineering demonstrator" or "Illustrative" badge and disclosure.

## Company details: `src/config/site.ts`

| Field | Effect when set |
| --- | --- |
| `contact.phoneDisplay` / `phoneE164` | Phone shown everywhere; `tel:` links use the E.164 form |
| `contact.email` | Adds email to the contact page, footer, form fallback and structured data |
| `contact.address` | Adds the address to the contact page, footer and structured data (plain text, e.g. "City, State, Country") |
| `contact.availability` | Calling hours shown next to the phone number |
| `legalName` | Used in the footer copyright and structured data |
| `bookingUrl` | "Book a call" buttons (or set `NEXT_PUBLIC_BOOKING_URL`) |
| `social.linkedin` / `github` / `x` | Footer icons and `sameAs` in structured data (https only) |
| `seo.*` | Default title, description and keywords |

The production domain is **not** set here; it comes from `NEXT_PUBLIC_SITE_URL`.

## Slogan and headline copy: `src/config/messaging.ts`

Slogan, positioning line, hero, credibility headline and final call to action.

## Navigation: `src/config/navigation.ts`

Header items, services mega menu (generated from the services list) and footer
columns.

## Team: `src/content/team.ts`

To complete a profile:

1. Ask the person for a short bio (2–3 sentences) they approve, and optional
   links.
2. Put the paragraphs in `bio`, skills in `expertise`, and https links in `links`.
3. For a photo, add a square image (at least 600×600) to `public/team/`, for
   example `public/team/vipin-bhatt.jpg`, and set `photo: "/team/vipin-bhatt.jpg"`.

Add a new person by appending an object; pages adapt automatically. Write bios
without assuming pronouns unless the person has stated theirs.

## Services: `src/content/services.ts`

Each service has hero copy, challenges, capabilities, approach, technologies,
illustrative use cases, engagement models, FAQs, related services and optional
`candidNotes` (honest limits, such as SAP work being scoped to available
expertise). Change copy in place. To add a service, copy an entry, give it a
new `slug` and `pillar`, and it will appear in the menu, sitemap and services
page. Update the unit test that expects ten services.

## Industries: `src/content/industries.ts`

Written as general engineering expertise. Each page states it does not imply
existing clients in that sector. Keep it that way until there are approved
references.

## Work: `src/content/work.ts`

Each entry has a `status`:

- `demonstrator`: a reference design Inferra created to show an approach;
- `illustrative`: a hypothetical scenario;
- `client`: real, delivered work **with written approval to publish**.

To publish a real case study, add an entry with `status: "client"`, describe
only what the client approved, and use real, verifiable outcomes. The
demonstrator badge and disclosure disappear automatically for client entries.

## Insights: `src/content/insights/`

To publish an article:

1. Create `src/content/insights/<slug>.mdx`. Write Markdown; `##` and `###`
   headings build the table of contents automatically. GitHub-style tables and
   task lists are supported.
2. Add its metadata (title, description, topic, format, dates, tags, author) to
   `meta.ts`.
3. Add one loader line for it in `index.ts`.

Use "Inferra Software Engineering" as the author unless a named person wrote
or approved the piece. Internal links (`/services/...`) become client-side
links; external links open in a new tab.

## Careers: `src/content/careers.ts`

`roles` is empty, so the careers page invites people to join the talent
network instead. Add a role object (`title`, `type`, `location`, `summary`,
`responsibilities`, `requirements`, `open: true`) and it appears with an apply
button that pre-selects the careers enquiry type. Set `open: false` to hide it
without deleting it.

## Technology: `src/content/technology.ts`

Each item has `depth: "core"` (established strength, highlighted) or
`"project"` (used when a project calls for it). **Founder review needed:** the
current split is a reasonable starting point, not a confirmed inventory. Move
items so they match the team's real depth.

## Approach and engagement models: `src/content/approach.ts`

The six delivery stages and the engagement models used on the home, about and
service pages.

## Legal pages: `src/content/legal/privacy.mdx` and `terms.mdx`

Drafts that describe what the site actually does (enquiry form, Resend or
webhook delivery, optional cookieless analytics, no advertising cookies). A
banner marks them as pending legal review. Once a qualified adviser has
reviewed them, pass `draft={false}` to `<LegalPage>` in
`src/app/privacy/page.tsx` and `src/app/terms/page.tsx`, and update the
`updated` date there.

## Images and artwork

The site uses generated SVG artwork instead of photos. If you add real
images, put them in `public/`, use `next/image`, write meaningful `alt` text,
and do not use images of people who have not agreed to appear.
