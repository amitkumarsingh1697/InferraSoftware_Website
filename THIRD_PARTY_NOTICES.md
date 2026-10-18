# Third-party notices

The Inferra Software website includes or depends on the following third-party
software and assets. Each keeps its own licence.

## Fonts (bundled in this repository)

| Font | Files | Licence | Copyright |
| --- | --- | --- | --- |
| Inter | `src/app/fonts/inter-*`, `src/assets/og/inter-*` | SIL Open Font License 1.1, [licenses/fonts/OFL-Inter.txt](licenses/fonts/OFL-Inter.txt) | The Inter Project Authors |
| Sora | `src/app/fonts/sora-*`, `src/assets/og/sora-*` | SIL Open Font License 1.1, [licenses/fonts/OFL-Sora.txt](licenses/fonts/OFL-Sora.txt) | The Sora Project Authors |
| JetBrains Mono | `src/app/fonts/jetbrains-mono-*`, `src/assets/og/jetbrains-mono-*` | SIL Open Font License 1.1, [licenses/fonts/OFL-JetBrainsMono.txt](licenses/fonts/OFL-JetBrainsMono.txt) | The JetBrains Mono Project Authors |

The font files were taken unmodified from the `@fontsource` packages (Latin
subsets). The Inferra wordmark in `public/brand/` is outlined from Sora
SemiBold, which the OFL permits for logos and artwork.

## npm dependencies (installed, not bundled in the repository)

Main runtime dependencies and their licences:

| Package | Licence |
| --- | --- |
| next, @next/mdx | MIT |
| react, react-dom | MIT |
| tailwindcss | MIT |
| zod | MIT |
| lucide-react | ISC |
| motion | MIT |
| clsx | MIT |
| @mdx-js/react, @mdx-js/loader | MIT |
| remark-gfm, rehype-slug, github-slugger | MIT / ISC |

Development tools (TypeScript, ESLint, Vitest, Playwright, axe-core) are used
only to build and test the site. Run `npx license-checker --summary` for a
complete, current list.
