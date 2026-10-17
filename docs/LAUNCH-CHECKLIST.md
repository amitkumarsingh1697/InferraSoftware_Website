# Launch checklist

What the founder needs to provide or decide before the site goes live. Items
are grouped by priority. File paths show where each answer goes.

## Must have before launch

- [ ] **Domain.** Choose and buy one (candidates in `DEPLOYMENT.md`; none were
      checked for availability). Set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Business email address** for the site and for receiving enquiries,
      e.g. on the new domain. Set `contact.email` in `src/config/site.ts` and
      `ENQUIRY_TO_EMAIL`.
- [ ] **Enquiry delivery.** Create a Resend account, verify the domain, set
      `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`. Until then the
      form tells visitors to call instead.
- [ ] **Hosting account** (Vercel Pro or equivalent) and production environment
      variables.
- [ ] **Legal review of the Privacy Policy and Terms** (`src/content/legal/`) by
      a qualified adviser, including which data-protection laws apply to the
      markets you sell into (for example India's DPDP Act, UK/EU GDPR). Then
      turn off the draft banner (see `CONTENT-GUIDE.md`).
- [ ] **Legal entity name** (if registered) for the footer and legal pages:
      `legalName` in `src/config/site.ts`. The legal pages currently say
      "Inferra Software"; update them if the registered name differs.
- [ ] **Confirm the phone number** +91 98918 55259 is the one to publish
      everywhere, and optionally **calling hours**
      (`contact.availability`, for example in IST).
- [ ] **Founder review of claims** (wording you should be comfortable defending):
  - [ ] The founder bio on About (`src/content/team.ts`): "more than eight years
        in software engineering and technical leadership"; "led engineering teams
        and delivered enterprise-grade software across multiple functional
        domains"; "contributed to products and platforms used by millions of end
        users" in earlier roles.
  - [ ] "Happy to sign an NDA before detailed discussions" on the contact page.
  - [ ] Technology "established strength" vs "project-dependent" split
        (`src/content/technology.ts`).
  - [ ] SAP & BASIS scope and its candid note (`src/content/services.ts`).
  - [ ] Engagement models and the six-stage approach (`src/content/approach.ts`).
- [ ] Turn on indexing (`SITE_INDEXING=enabled`) and submit the sitemap.

## Should have soon after launch

- [ ] **Team profiles for Vipin Bhatt and Sumit Mishra**: approved short bios,
      key skills, optional LinkedIn links (`src/content/team.ts`). Until then
      only names and titles are shown.
- [ ] **Founder photo and team photos** (square, at least 600×600) if you want
      them instead of the abstract avatars.
- [ ] **LinkedIn company page** (and GitHub / X if used): `social` in
      `src/config/site.ts`.
- [ ] **Booking link** (Calendly, Cal.com or similar): `NEXT_PUBLIC_BOOKING_URL`.
- [ ] **Analytics decision**: Plausible (cookieless, paid) or none. Set
      `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if yes.
- [ ] **Business address**, if you want one public (`contact.address`). Not
      required.
- [ ] Review the five insight articles; edit, keep or replace them. They are
      attributed to "Inferra Software Engineering".

## When available

- [ ] **Real case studies** with written client approval (replace or sit
      alongside the demonstrators; see `CONTENT-GUIDE.md`).
- [ ] **Testimonials or client logos**, only with written permission.
- [ ] **Certifications or partnerships** (e.g. cloud partner tiers), only once
      held.
- [ ] **Open roles** for the careers page (`src/content/careers.ts`).
- [ ] Translations or regional pages if you target specific markets.

## Brand decisions to confirm

- [ ] Logo and colours (`docs/BRAND.md`, files in `public/brand/`).
- [ ] Slogan: *Complex ideas. Engineered into reality.* (alternatives listed in
      `docs/BRAND.md`).
- [ ] Trademark search for "Inferra" in your main markets before investing in
      the name.

## Technical go-live checks

Run the smoke test in `DEPLOYMENT.md` on the production URL, including one real
enquiry, a call link test from a phone, and a quick look in Safari and Firefox.
