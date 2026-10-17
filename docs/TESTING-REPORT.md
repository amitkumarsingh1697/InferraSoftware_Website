# Testing report

Date: 17 October 2026. Environment: Linux, Node.js 22.22, Chromium 141
(Playwright 1.56.1), Next.js 16.4.2 production build served locally with
`next start`. No enquiry delivery, analytics or indexing was configured.

Everything below was actually run; results are as observed.

## Summary

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Pass, 0 errors, 0 warnings |
| Type check | `npm run typecheck` | Pass |
| Unit tests | `npm test` | **38 / 38 passed** (6 files) |
| Production build | `npm run build` | Pass, 69 static pages generated |
| Browser tests | `npm run test:e2e` | **47 passed, 0 failed** (+1 mobile-only test skipped on the desktop project, and run on the mobile project) |
| Lighthouse | Lighthouse 12.8 on 4 pages | Accessibility 100, Best practices 100, Performance 91–92 mobile / 100 desktop (details below) |
| Visual review | Screenshots at 390 px and 1440 px | Reviewed; issues found were fixed (below) |
| Dependency audit | `npm audit` | 5 high-severity advisories, all in dev-only lint tooling (see below) |

## Unit tests (Vitest)

- **Enquiry schema** (7): valid enquiry and normalisation, consent required,
  invalid email / short message / unknown options rejected, company required
  except for careers, https-only portfolio links, message length cap, step-one
  fields exist in the schema.
- **Rate limiter** (3): limit and retry-after, independent keys and window
  expiry, bounded memory.
- **Email formatting** (6): HTML escaping, header-injection protection,
  truncation, user content escaped in the HTML email, single-line subject,
  readable labels.
- **Configuration** (8): confirmed phone number, no placeholder email/address,
  slogan in config, https-only external URLs, booking URL from env and unsafe
  values ignored, no social links until configured.
- **Security headers** (6): noindex by default, indexing only on production,
  never on Vercel previews, CSP directives, analytics origin added only when
  configured, standard hardening headers.
- **Content integrity** (8): ten services, unique slugs everywhere,
  disclosures on non-client work, no invented bios, founder metrics not
  presented as company results, table of contents matches heading ids, reading
  time, path traversal rejected.

## Browser tests (Playwright)

Run against a production build at 1440×900 (desktop) and Pixel 7 emulation
(mobile).

**Routes and SEO**
- The sitemap lists all 36 public URLs, including all 10 service pages.
- Every sitemap URL returns 200, has exactly one `h1`, an "Inferra" title, a
  meta description, no console errors and **no CSP violations**.
- An unknown URL returns 404 with the custom page; unknown service, work,
  insight and industry slugs return 404.
- `robots.txt` disallows crawling while indexing is off; `X-Robots-Tag:
  noindex, nofollow`, CSP and `nosniff` are present; no `X-Powered-By`;
  manifest and Open Graph image respond.
- Structured data on a service page includes Organization, Service and
  BreadcrumbList.

**Navigation**
- Desktop services menu opens, closes with Escape (focus returns to the
  trigger) and navigates to the SAP service page.
- Primary links navigate and set `aria-current`.
- Skip link is the first tab stop and moves to the main content.
- Mobile menu opens as a modal dialog, expands services, navigates and closes;
  Escape closes it.
- All `tel:` links use `+919891855259`.
- Demonstrator labels and disclosures are visible.
- Article table of contents links scroll to the heading.
- A crawler following every internal link from the home page found no broken
  links.

**Enquiry form**
- Step one shows a focused error summary and inline `aria-invalid` errors, and
  does not validate step-two fields early.
- Step two validates required fields and consent.
- Successful submission (mocked API) shows the confirmation and reference ID;
  the request carries consent, an empty honeypot, the start time and UTM
  attribution captured from the landing URL.
- Delivery failure (mocked) keeps the message in the form and offers the phone
  number.
- `?type=partnership` and `?service=sap-basis` links pre-fill the form;
  careers enquiries hide project-only fields and show the portfolio field.

**Enquiry API (real server)**
- Invalid input: 422 with field errors.
- Valid input with no delivery configured: 503 `delivery_unconfigured`.
- Honeypot submissions: silent 200 with no delivery.
- Cross-origin POST: 403. GET: 405.
- Burst of 7 requests from one client: first five processed, then 429.

**Accessibility (axe-core, WCAG 2.0/2.1/2.2 A and AA rules)**
- No violations on 14 pages: home, about, services, a service page, an
  industry page, technology, work, a work page, insights, an article, careers,
  contact, privacy and the 404 page.
- No violations in the contact form with validation errors showing.

**Responsive layout**
- No horizontal overflow at 360, 390, 768, 1024, 1440 and 1920 px on eight
  representative pages.

## Lighthouse

Lighthouse 12.8.2, default throttling, local production server.

| Page | Device | Performance | Accessibility | Best practices | SEO* | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Mobile | 91 | 100 | 100 | 63 | 3.5 s | 0 | 50 ms |
| Home | Desktop | 100 | 100 | 100 | 63 | 0.7 s | 0 | 0 ms |
| AI & LLM service | Mobile | 92 | 100 | 100 | 63 | 3.3 s | 0 | 90 ms |
| AI & LLM service | Desktop | 100 | 100 | 100 | 63 | 0.7 s | 0 | 0 ms |
| Contact | Mobile | 91 | 100 | 96† | 63 | 3.5 s | 0 | 70 ms |
| Contact | Desktop | 100 | 100 | 96† | 63 | 0.7 s | 0 | 0 ms |
| Article | Mobile | 91 | 100 | 100 | 63 | 3.4 s | 0 | 150 ms |
| Article | Desktop | 100 | 100 | 100 | 63 | 0.7 s | 0 | 0 ms |

\* SEO is 63 only because the site is deliberately `noindex` until launch
("page is blocked from indexing" is the single failing audit). It should
reach 100 once `SITE_INDEXING=enabled` on production; this was not measured.

† The contact page lost 4 points to a CSP report caused by the validation
library probing for `eval`. This was fixed after the Lighthouse run
(`z.config({ jitless: true })`), and the browser suite now asserts there are
no CSP violations on any page. Lighthouse was not re-run after the fix.

Mobile LCP (3.3–3.5 s under simulated slow 4G) is driven by the web fonts
swapping in on the hero paragraph; first contentful paint is 1.2 s. Possible
future tuning: subset or reduce font weights, or use `display: optional` for
the body font.

## Issues found and fixed during testing

- Capability explorer tabs widened the page on phones (191 px horizontal
  overflow at 360 px), which also made the mobile menu button hard to tap.
- Hovering then clicking "Services" closed the mega menu instead of keeping it
  open.
- Unknown detail URLs returned 200 with the 404 content (streamed); they now
  return a real 404 (`src/proxy.ts`).
- Logo link accessible name did not match its visible text (WCAG 2.5.3).
- React lint errors: state set inside effects and a ref read during render in
  the form and navigation.
- Zod `eval` probe triggered a CSP violation on pages with the form.
- `@axe-core/playwright` pulled a newer `playwright-core` than the test runner;
  pinned to match.

## Known limitations

- **`npm audit`**: 5 high-severity advisories in `eslint-config-next` →
  `fast-glob` → `braces`, development-only lint tooling that is never shipped
  to the browser or server. `npm audit fix --force` would downgrade the Next.js
  lint config; recommended to wait for an upstream release.
- Real email delivery (Resend) and webhook delivery were **not** tested end to
  end because no credentials exist yet. The delivery code paths are covered by
  type checks and the unconfigured/failure paths by tests. Send a real test
  enquiry after configuring (see `DEPLOYMENT.md`).
- Tested in Chromium only. Safari and Firefox were not available in this
  environment; spot-check them before launch, particularly the native
  `<dialog>` menu and CSS scroll-driven reveal animations (which degrade to
  static content where unsupported).
- No manual screen-reader pass (NVDA/VoiceOver) was possible here.
