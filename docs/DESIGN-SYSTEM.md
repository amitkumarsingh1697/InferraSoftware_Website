# Design system and 3D experience

The site uses a warm editorial look: cream and beige paper, coffee-brown ink,
caramel and terracotta accents, a Fraunces serif for headings and Inter for
body text. A 3D sculpture sits behind the content and moves as you scroll.

## Where to tune things

| What | Where |
| --- | --- |
| Colours, fonts, spacing, radii, motion timing | `src/design/tokens.css` (the single source of truth) |
| 3D scene colours | `--scene-*` variables at the bottom of `src/design/tokens.css` |
| Where the sculpture sits for each section | `src/components/scene/poses.ts` |
| Motion helpers that read the tokens | `src/design/motion.ts` |
| Copy | `src/config/messaging.ts`, `src/content/*`, and the home section components |

Tailwind utilities are generated from the tokens, so `bg-canvas`, `text-fg`,
`text-highlight`, `bg-espresso`, `py-section` and `ease-editorial` all follow
any change you make there. Every text colour passes WCAG 2.2 AA on the light
backgrounds; `accent` is decorative only.

## How the 3D scroll works

- `src/components/scene/scene-layer.tsx` mounts one fixed, full-screen canvas
  behind every page. It loads after the page is idle, ignores pointer events and
  is hidden from screen readers.
- Any element with `data-scene="<pose>"` is a stop. As you scroll from one stop
  to the next, the sculpture eases between the two poses in `poses.ts`. Adding,
  removing or reordering sections needs no code changes in the scene.
- `veil` in each pose washes the page colour over the scene where text sits
  close to it.
- Interior pages without their own artwork use the `page` pose in their header.
  Pages whose first stop is further down keep the sculpture in the distance
  until that section comes into view.

### Performance and accessibility

- Narrow screens and touch devices get fewer particles, lower geometry detail,
  no antialiasing, a capped pixel ratio, and the sculpture moves behind the
  content with a stronger veil.
- If frames are consistently slow, the scene drops to 1x pixel ratio.
- With reduced motion: no smooth scrolling, no reveal or hero animations, and
  the scene renders only when you scroll, snapping between poses with no idle
  movement.
- Without WebGL, and in automated browsers, a static warm gradient is shown.
  Add `?scene=on` to the URL to force the scene in a test browser.
- Three.js is loaded on demand in its own chunk, so it never delays the first
  paint or the text.

### Motion layer

- `components/motion/smooth-scroll.tsx`: Lenis inertial scrolling (mouse and
  trackpad only; native scrolling underneath).
- `components/motion/scroll-progress.tsx`: hairline reading-progress bar.
- `components/motion/reveal.tsx`: `Reveal`, `RevealGroup` and `RevealItem` for
  rise-and-fade entrances. The existing `.reveal` class (CSS scroll-driven) is
  still available for simple cases.
- `components/home/hero-motion.tsx`: staggered hero entrance and scroll fade.

## Swapping content and media

- Text: edit the content files above. Layouts use flexible grids and
  `text-wrap: balance`, so longer or shorter copy reflows without layout changes.
- Media: use `<MediaSlot src="/path.jpg" alt="..." />` from
  `src/components/ui/media-slot.tsx`. Without `src` it shows the generated art or
  a labelled placeholder.

## Placeholders to replace

- **Team photos**: abstract avatars are shown until `photo` is set in
  `src/content/team.ts`.
- **Case study and article covers**: generated warm-toned art (`CoverArt`). Pass
  real imagery through `MediaSlot` when available.
- **Apple touch icon** (`src/app/apple-icon.png`) and the files produced by
  `npm run brand` still use the previous violet palette. `src/app/icon.svg` and
  the manifest colours have been updated.
- **Social preview images** (`src/lib/og.tsx`) use the new palette with a dark
  espresso background; review them once the brand direction is final.
