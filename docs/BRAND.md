# Inferra Software brand

## Positioning

**Slogan:** *Complex ideas. Engineered into reality.*

**Positioning line:** Inferra Software is a senior-led software engineering
studio that helps businesses design, build, modernize and scale
production-ready software across stacks and domains.

**Supporting headline:** Senior-led engineering for products, platforms and
intelligent systems.

All of these live in `src/config/messaging.ts` and can be changed there.

### Why this slogan

It states the promise in the order a client experiences it: they arrive with
something complicated and leave with something that works. "Engineered" is
the important word: it separates Inferra from idea shops and from body
shops, and it fits every service line from SAP BASIS to agentic AI.

### Alternatives considered

| Line | Notes |
| --- | --- |
| From hard problems to working software. | Plainer; good as a secondary line. |
| Engineering for what comes next. | Forward-looking, but vaguer about delivery. |
| Senior engineers. Real systems. | Strong for recruitment and partnerships; narrower. |
| Inference to production. | Clever for AI work; too narrow for the full range of services. |

## Logo

Files are in `public/brand/` and are regenerated from
`scripts/generate-brand-assets.mjs` (`npm run brand`, then `npm run brand:png`).

### The mark

Two faceted chevrons face each other to form a diamond. Inside, a stem and a
glowing node form a lower-case **i**.

- **Chevrons** read as code brackets `< >`: the work is engineering.
- **The diamond** they enclose suggests something shaped and precise, a
  crystallised idea.
- **The node** above the stem is the "inference" in Inferra: a point of
  signal, rendered in electric cyan, the brand's highlight colour.
- **The geometry** is drawn on a 48-unit grid with mirrored, straight-cut
  facets, so it stays crisp at 16 px and works as a single-colour stamp.

### The wordmark

"INFERRA" set in Sora SemiBold, tracked wide, converted to outlines so it
renders identically everywhere. "SOFTWARE" sits beneath in JetBrains Mono,
widely tracked: a quiet nod to code.

### Variants

| File | Use |
| --- | --- |
| `inferra-mark.svg` | Primary mark on dark backgrounds |
| `inferra-mark-light.svg` | Mark on light backgrounds |
| `inferra-mark-mono.svg` / `-mono-white.svg` | Single colour (print, embossing, watermarks) |
| `inferra-app-icon.svg` / `.png` / `-192.png` / `-512.png` | App icon, social avatars, favicon source |
| `inferra-lockup-dark.svg` / `-light.svg` | Horizontal lockup: website header, documents |
| `inferra-lockup-mono.svg` / `-mono-white.svg` | Single-colour lockup |
| `inferra-stacked-dark.svg` / `-light.svg` | Stacked lockup: covers, slides, merchandise |
| `inferra-wordmark.svg` / `-light.svg` | Wordmark without the mark |

**Clear space:** at least the height of the node circle × 2 on every side.
**Minimum size:** mark 16 px; horizontal lockup 120 px wide.
**Don't:** recolour the chevrons outside the brand palette, add effects other
than the defined glow, rotate the mark or set the wordmark in another font.

## Colour

Midnight violet is the primary experience. Tokens are defined once in
`src/app/globals.css` (`@theme`) and used as Tailwind classes such as
`bg-ink`, `text-fg-muted` or `border-line`.

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#0A0718` | Page background |
| `ink-2` | `#100B24` | Alternate section background |
| `surface` | `#17102F` | Cards and panels |
| `surface-2` | `#1F1640` | Raised and hover surfaces |
| `accent` | `#8B5CF6` | Decorative violet, large display type |
| `accent-strong` | `#7C3AED` | Primary button fill |
| `violet-bright` | `#A78BFA` | Violet text and links on dark |
| `cyan` | `#67E8F9` | Electric highlight, focus ring, eyebrows |
| `fg` | `#F5F3FF` | Primary text |
| `fg-muted` | `#B7B0CC` | Body text |
| `fg-subtle` | `#918AAB` | Captions and metadata |

### Contrast (WCAG 2.2)

Measured against the three main backgrounds. AA requires 4.5:1 for body text
and 3:1 for large text and UI components.

| Text colour | on `ink` | on `surface` | on `surface-2` |
| --- | --- | --- | --- |
| `fg` | 18.1 | 16.6 | 15.4 |
| `fg-muted` | 9.6 | 8.8 | 8.1 |
| `fg-subtle` | 6.1 | 5.6 | 5.2 |
| `violet-bright` | 7.3 | 6.7 | 6.2 |
| `cyan` | 13.7 | 12.6 | 11.6 |
| `accent` | 4.7 | 4.3 | 4.0 |
| `danger` `#F87171` | 7.2 | 6.6 | 6.1 |

White on the `accent-strong` button: 5.7:1. `accent` is used only for large
display type and decoration, where 3:1 applies. Automated axe checks in the
test suite cover rendered pages (see `TESTING-REPORT.md`).

## Typography

| Role | Typeface | Weights |
| --- | --- | --- |
| Display and headings | Sora | 500, 600, 700 |
| Body and interface | Inter | 400, 500, 600 |
| Labels, codes, metadata | JetBrains Mono | 400, 500 |

All three are under the SIL Open Font License and self-hosted from
`src/app/fonts`.

## Visual language

- **Cinematic, anime-inspired scenes**: a luminous "inference core" over a
  night skyline, layered for parallax, with a small figure on a platform for
  scale. Built as SVG, so it is crisp and light.
- **Blueprint grids, corner brackets and system codes** (`SYS·01`…`SYS·05`)
  tie the capability areas to an engineering-console aesthetic.
- **Motion is restrained**: slow pulses, flowing data lines and scroll reveals,
  all disabled when a visitor prefers reduced motion.
- **No stock photography and no invented people.** Team members without photos
  get geometric, clearly abstract avatars.

## Voice

Confident, specific and candid. Prefer concrete engineering language to
superlatives. Say what Inferra will not do as readily as what it will. Never
present the founder's earlier career achievements as company results, and
label demonstrators as demonstrators.
