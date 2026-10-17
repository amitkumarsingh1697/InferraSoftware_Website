# Deployment guide

Nothing has been deployed, and no domain or paid service has been purchased.
This guide is for whoever does the launch.

## 1. Choose and buy a domain

Candidates to check (availability and price were **not** verified):

- `inferra.software`
- `inferrasoftware.com`
- `inferra.dev`
- `inferrasoftware.in` (useful as an India-facing redirect)
- `getinferra.com`

Before buying, also check trademark conflicts in your main markets and that
matching LinkedIn and GitHub handles are free. Whatever you choose is set in
**one place**: the `NEXT_PUBLIC_SITE_URL` environment variable.

## 2. Hosting: Vercel (recommended)

The site is a standard Next.js 16 app; Vercel supports it with no extra
configuration. Any Node.js host that runs `next build && next start` also works.

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository. Framework preset:
   Next.js. Build command, output directory and install command can stay as
   default.
3. Set environment variables (Project → Settings → Environment Variables):

   | Variable | Production | Preview |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>` | leave empty |
   | `SITE_INDEXING` | `enabled` (only when ready to be found) | leave empty |
   | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | set | optional (separate key recommended) |
   | `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | optional | optional |
   | `NEXT_PUBLIC_BOOKING_URL` | optional | optional |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | leave empty |

   Mark `RESEND_API_KEY` and `ENQUIRY_WEBHOOK_SECRET` as **Sensitive**.

4. Deploy. Preview deployments are automatically `noindex`, even if
   `SITE_INDEXING` is set, because the site checks `VERCEL_ENV`.

The Vercel Hobby plan is for non-commercial use; a company site should use the
Pro plan or another host. Confirm current pricing before committing.

## 3. DNS

In Vercel, Project → Settings → Domains, add the apex domain and `www`.
Choose one as primary (for example the apex) and let Vercel redirect the
other. At your registrar, create the records Vercel shows, typically:

- apex: `A` record to Vercel's IP, or an `ALIAS`/`ANAME` if supported;
- `www`: `CNAME` to Vercel's target.

HTTPS certificates are issued automatically. The site sends HSTS headers, so
make sure HTTPS works on both hostnames before launch.

## 4. Enquiry email (Resend)

1. Create a Resend account and add your domain (or a subdomain such as
   `mail.<your-domain>`).
2. Add the SPF, DKIM (and recommended DMARC) DNS records Resend shows; wait for
   verification.
3. Create an API key with "sending access" only.
4. Set `ENQUIRY_FROM_EMAIL` to an address on the verified domain, e.g.
   `Inferra Website <website@<your-domain>>`, and `ENQUIRY_TO_EMAIL` to the inbox
   (or comma-separated inboxes) that should receive enquiries.
5. Redeploy, then send a test enquiry (see smoke test).

The visitor's email is set as `reply_to`, so replying from your inbox goes
straight to them.

Optional: set `ENQUIRY_WEBHOOK_URL` to also send each enquiry to a CRM or an
automation tool. The JSON body contains `id`, `receivedAt`, `text` and the
validated `enquiry` object.

## 5. Analytics (optional)

Create a site in Plausible for your domain, then set
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. If you self-host Plausible or proxy the script,
also set `NEXT_PUBLIC_PLAUSIBLE_SRC`. Mark these as goals in Plausible:
`enquiry_submitted`, `call_click`, `booking_click`, `cta_click`,
`partnership_enquiry`, `career_enquiry`.

## 6. Search engines

When the content is final and the domain works:

1. Set `SITE_INDEXING=enabled` for Production and redeploy.
2. Check `https://<domain>/robots.txt` now allows crawling and lists the sitemap.
3. Submit `https://<domain>/sitemap.xml` in Google Search Console and Bing
   Webmaster Tools.

## 7. Launch smoke test

Run on the production URL after every significant deployment:

- [ ] Home, a service page, a work page, an article, contact, privacy and terms load.
- [ ] An unknown URL shows the custom 404 page (status 404).
- [ ] The header services menu and the mobile menu open and navigate.
- [ ] Tapping the phone number on a phone starts a call to +91 98918 55259.
- [ ] A test enquiry arrives in the inbox, with the correct reply-to, and the
      visitor sees the confirmation with a reference ID.
- [ ] Response headers include `Content-Security-Policy` and
      `Strict-Transport-Security`; no `X-Robots-Tag` on production once indexing is on.
- [ ] Sharing a page on LinkedIn or Slack shows the Open Graph image.
- [ ] No errors in the browser console.

Automated equivalent against a deployed URL:

```bash
PLAYWRIGHT_BASE_URL=https://<domain> npx playwright test
```

(The enquiry API tests expect delivery to be unconfigured, so expect the
"unconfigured delivery" test to fail on production. Skip it with
`--grep-invert "unconfigured"`.)

## 8. Rollback

Vercel keeps every deployment. To roll back, open Deployments, choose the last
good deployment and select **Promote to Production** (or "Instant Rollback").
Environment variable changes need a redeploy to take effect, and can be
reverted the same way.

## Notes on scaling and hardening

- The enquiry rate limiter is in memory per instance. If spam becomes a
  problem, move it to a shared store (Upstash Redis or Vercel KV) or add a
  CAPTCHA such as Cloudflare Turnstile.
- If you later add third-party embeds (video, scheduling widgets, chat), add
  their origins to the CSP in `src/lib/security-headers.ts`.
