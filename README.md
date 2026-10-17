# Inferra Software website

The corporate website for **Inferra Software**: a cinematic, midnight-violet,
multi-page marketing site with an enquiry form, insights articles and
engineering demonstrators.

> *Complex ideas. Engineered into reality.*

Built with Next.js 16 (App Router, Turbopack, Cache Components), React 19,
TypeScript, Tailwind CSS v4 and MDX. Every page is statically prerendered;
the only server code is the enquiry API.

## Quick start

Requirements: Node.js 20.9 or newer (developed on Node 22) and npm.

```bash
npm install
npm run dev            # http://localhost:3000
```

No environment variables are needed to run the site. Copy `.env.example` to
`.env.local` when you want to turn on integrations.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type-checks and prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core web vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Browser tests (Playwright): builds, starts and tests the site |
| `npm run check` | Lint, type check, unit tests and build in one go |
| `npm run brand` | Regenerate the SVG logo files from `scripts/generate-brand-assets.mjs` |
| `npm run brand:png` | Re-render PNG icons from the SVGs (needs Playwright Chromium) |

For Playwright, install a browser once with `npx playwright install chromium`,
or point `PLAYWRIGHT_CHROMIUM_PATH` at an existing Chromium binary.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, credibility, capability explorer, featured services, approach, demonstrators, team, technology, insights, call to action |
| `/about` | Company story, principles, founder and team |
| `/services` | All ten services, grouped into five capability areas |
| `/services/[slug]` | Ten service pages (full-stack, product development, modernization, AI & LLM, agentic AI, LLM evaluation, SAP & BASIS, cloud & data, architecture & advisory, hiring & assessment) |
| `/industries`, `/industries/[slug]` | Five industry pages, written as general expertise, not client claims |
| `/technology` | Technology groups with established strengths vs project-dependent tools |
| `/work`, `/work/[slug]` | Five clearly labelled engineering demonstrators |
| `/insights`, `/insights/[slug]` | Five MDX articles with table of contents, reading progress and share links |
| `/careers` | Engineering principles, talent network and partnership enquiries |
| `/contact` | Phone (primary), two-step enquiry form, optional booking link |
| `/privacy`, `/terms` | Draft legal pages (marked for legal review) |
| Unknown URLs | Custom 404; runtime errors show a branded error page |

Generated files: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`,
Open Graph images (`/opengraph-image` and per service, work and article page),
`/icon.svg` and `/apple-icon.png`.

## Project structure

```
src/
  app/                 Routes, metadata files, API route
  components/          UI, layout, artwork, page sections, form
  config/              site.ts (contact, links, SEO), messaging.ts (slogan and copy), navigation.ts
  content/             Typed content: services, industries, work, team, careers, technology, insights (MDX), legal (MDX)
  lib/                 SEO, security headers, structured data, analytics, enquiry validation and delivery
public/brand/          Logo files (SVG + PNG)
scripts/               Brand asset generators
tests/unit/            Vitest
tests/e2e/             Playwright
docs/                  Brand, content, deployment, testing and launch documents
```

## Editing content

Almost all copy lives in `src/config` and `src/content`, not in components.
See **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)** for how to change
contact details, add a team bio, publish an article, add a demonstrator or a
real case study, and open a job role.

The rule throughout: **leave a value `null` or empty until it is real.**
Components hide anything that is missing, so placeholders never reach the
live site. In development, small dashed "dev notes" mark where information is
still needed; they never render in production.

## Integrations

All integrations are configured with environment variables (see
`.env.example`) and are off until configured.

- **Canonical domain**: `NEXT_PUBLIC_SITE_URL`. The domain appears in no source
  file. Without it, canonical links are omitted.
- **Indexing**: `SITE_INDEXING=enabled`. Off by default; preview deployments on
  Vercel are never indexed, even when it is set (`X-Robots-Tag`, robots meta and
  `robots.txt` all follow this switch).
- **Enquiry email**: `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`.
- **Enquiry webhook**: `ENQUIRY_WEBHOOK_URL` (+ optional `ENQUIRY_WEBHOOK_SECRET`)
  posts each enquiry as JSON, for a CRM or automation tool. Email and webhook
  can run together; delivery succeeds if either accepts it.
- **Booking link**: `NEXT_PUBLIC_BOOKING_URL` shows "Book a call" buttons.
- **Analytics**: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` loads cookieless Plausible and
  sends the events listed in `src/lib/analytics.ts` (CTA, call, booking clicks,
  enquiry outcomes, service/case study/article views). The CSP is widened only
  for the analytics origin when enabled.

## Enquiry form

Two steps, with client and server validation sharing one zod schema
(`src/lib/enquiry/schema.ts`). Protections on `POST /api/enquiry`:

- same-origin check, JSON only, 20 KB body limit;
- rate limit of 5 requests per 10 minutes per client (hashed IP);
- honeypot field and a minimum fill time, both answered with a silent success;
- duplicate suppression for 10 minutes;
- HTML escaping and header sanitisation in outgoing email; enquiry content is never logged.

If delivery is not configured, or fails, the form keeps the visitor's message
and offers the phone number (and email or booking link when configured),
plus a "copy message" button. Nothing is ever silently lost.

UTM parameters and the referrer are captured on the first page view
(sessionStorage) and attached to the enquiry.

## Decisions worth knowing

- **Static CSP with `'unsafe-inline'` scripts.** Pages are prerendered, so
  per-request nonces would force every page to render dynamically. All other
  directives are strict (`frame-ancestors 'none'`, `object-src 'none'`,
  `form-action 'self'`, no third-party origins unless analytics is enabled).
- **In-memory rate limiting.** Adequate for a low-traffic marketing site and
  still stops bursts, but each serverless instance has its own memory. Swap
  the store in `src/lib/enquiry/rate-limit.ts` for Upstash Redis or Vercel KV
  if abuse appears.
- **Plausible for analytics.** Cookieless, so no cookie banner is required for
  analytics in most cases; confirm for your markets.
- **Real 404 status codes.** Detail pages stream, so `src/proxy.ts` checks
  slugs before rendering to return a true 404 for unknown pages.
- **Artwork is code.** The hero scene, pillar illustrations, cover art and
  avatars are SVG components: no stock images, no photographs of people,
  instant loading. Abstract avatars are deliberately non-photographic.
- **Fonts are self-hosted** (Inter, Sora, JetBrains Mono; SIL Open Font License),
  so no requests go to Google Fonts.

## Documentation

- [docs/BRAND.md](docs/BRAND.md): logo, rationale, colour tokens and contrast, typography, voice
- [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md): how to edit everything
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): domain, Vercel, DNS, email, launch smoke test, rollback
- [docs/TESTING-REPORT.md](docs/TESTING-REPORT.md): what was tested and the results
- [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md): information the founder must provide before launch
