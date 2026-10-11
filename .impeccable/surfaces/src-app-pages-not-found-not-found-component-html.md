---
version: 1
slug: "src-app-pages-not-found-not-found-component-html"
primary_target: "src/app/pages/not-found/not-found.component.html"
related_targets: ["src/app/pages/not-found/not-found.component.scss","src/app/pages/not-found/not-found.component.ts"]
---

# Not-found page

Mode: Operate. Scope: `/404` and the prerendered static error document. Help visitors recover from an unknown address through working links to the four portfolio pages. Preserve the shared navigation, footer, existing routes, and static HTTP 404 behavior.

## Direction contract

THESIS: A calm, useful recovery page that belongs to the portfolio. Replace legacy panels and terminal decoration with the established flat reading flow.

OWN-WORLD: Inherit the charcoal/cyan canvas, medium Space Grotesk headings, Source Sans 3 copy, open spacing, thin rules, and shared controls from DESIGN.md.

STORY: Visitors understand that the address is missing, return home or view projects, and can reach Experience or Contact without searching.

FIRST VIEWPORT: A left-aligned page title and short error explanation sit at the normal page inset. A cyan home action and underlined project link form one group. A quiet divider introduces the remaining two destinations below. The footer stays in the shared shell.

FORM: Local extension of the approved design system; no concept seed or new visual world. Mobile stacks and wraps the same reading order.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

No raster assets are created. Use the existing SVG icons, keyboard focus, and route transition.

## Shipped verification

Finish verdict: ship, with no material fixes. The 404 template, local SCSS, and component host were checked against PRODUCT.md, DESIGN.md, `.impeccable/design.json`, shared `patterns/_portfolio.scss`, and `patterns/_buttons.scss`. The page inherits the shared canvas, container, heading, primary button, text links, spacing scale, and quiet rule. A labelled section sits within the shell's main landmark. Recovery links retain home, projects, experience, and contact in the agreed order; the existing SVG arrow remains decorative. No tokens or raster assets were added.

Rendered captures in `.impeccable/review/not-found/` confirm the shared shell, readable sentence-case explanation, action hierarchy, and natural wrapping: `desktop.png` (1280 × 720); `mobile.png` (nominal viewport 390 × 844, PNG 375 × 844); `narrow-mobile.png` (nominal viewport 320 × 844, PNG 305 × 844). Narrow mobile wraps the heading and stacks the action group without clipping. Capture PNG dimensions were independently checked; these are review evidence, not shipping raster assets.

DESIGN.md and its sidecar remain unchanged for this ordinary local extension. Pre-existing drift is not canonized or repaired: the sidecar's Action Accent Rule still allows cyan engagement labels, while DESIGN.md requires compact work-type labels to remain neutral. The 404 uses cyan only for actions and does not inherit that discrepancy.
