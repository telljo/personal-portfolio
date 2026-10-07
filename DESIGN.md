---
name: "Josh Tell Portfolio"
description: "A clear, personal portfolio for a senior full stack engineer and contractor."
colors:
  background: "#111415"
  surface-container-low: "#191c1d"
  surface-intro: "#17292d"
  primary: "#44dce4"
  primary-fixed: "#66f7ff"
  primary-fixed-dim: "#41dae2"
  on-primary: "#003739"
  on-surface: "#e1e3e4"
  on-surface-variant: "#bbc9ca"
  outline: "#859394"
  outline-variant: "#3c494a"
  outline-navigation: "#294044"
  error: "#ffb4ab"
typography:
  hero:
    fontFamily: "Space Grotesk, Source Sans 3, sans-serif"
    fontSize: "clamp(3.5rem, 7vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  page-heading:
    fontFamily: "Space Grotesk, Source Sans 3, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  section-heading:
    fontFamily: "Space Grotesk, Source Sans 3, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  entry-title:
    fontFamily: "Space Grotesk, Source Sans 3, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
  metadata:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  none: "0"
  sm: "0.125rem"
  lg: "0.75rem"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
  "16": "4rem"
  "20": "5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-fixed}"
  button-primary-active:
    backgroundColor: "{colors.primary-fixed-dim}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.surface-container-low}"
  input:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "1rem"
  navigation:
    backgroundColor: "{colors.surface-intro}"
    textColor: "{colors.on-surface-variant}"
    height: "4.5rem"
  text-link:
    textColor: "{colors.primary}"
  work-row:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.none}"
    padding: "2rem 0 2.5rem"
  career-detail:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    padding: "1.5rem 0"
---

# Design System: Josh Tell Portfolio

## Overview

**Creative North Star: "The simpler incumbent charcoal/cyan portfolio"**

The approved incumbent direction is a simpler dark charcoal and cyan portfolio: clear, personal, and grounded in Josh's actual work. Space Grotesk headings, Source Sans 3 copy, original photographs, and project screenshots carry the identity. Plain, specific language lets engineering experience and contracting contexts earn attention.

The finished pages use generous left-aligned headings and flat, rule-separated entries. Cyan marks actions and selected states. Broad ink-to-charcoal introductions add atmosphere. Compact charcoal contact rows provide a calm ending; content remains the main visual interest. This records the approved refinement and the supplied product voice, so no new metaphor, aesthetic decision, or preference interview is needed.

**Key Characteristics:**
- Dark charcoal with restrained blue-green surface variation and a cyan action accent.
- Sentence-case headings and readable, restrained type.
- Flat work rows, original imagery, and open spacing.
- Visible focus, native links and details, and clear form feedback.

## Colors

Cyan gives the dark charcoal palette a clear action color; cool light neutrals keep long work descriptions readable. Frontmatter records the canonical source values.

### Primary

- **Clear cyan** (`primary`): main buttons, text links, current navigation, engagement labels, focus rings, and details indicators.
- **Bright cyan** (`primary-fixed`): primary button and text-link hover.
- **Pressed cyan** (`primary-fixed-dim`): primary button active state.
- **Deep cyan ink** (`on-primary`): text on filled cyan buttons and selected text.

### Neutral

- **Charcoal** (`background`): reading sections.
- **Intro ink** (`surface-intro`): the same blue-green opening on all four pages, fading vertically into charcoal over 40rem.
- **Low charcoal** (`surface-container-low`): contact fields, image loading surfaces, and ghost-button hover.
- **Light cool text** (`on-surface`): headings, important copy, controls.
- **Soft cool text** (`on-surface-variant`): descriptions, metadata, secondary navigation.
- **Readable outline** (`outline`): contact field and ghost-button borders.
- **Quiet rule** (`outline-variant`): logo-tile outlines and work-entry dividers.
- **Navigation rule** (`outline-navigation`): a subtle blue-green divider beneath the fixed header.

The error token is warm coral, used only for invalid-field borders and error copy. It is feedback, not a second brand accent.

**The Action Accent Rule.** Use cyan for actions, current navigation, engagement labels, and interaction indicators. Keep ordinary descriptions in the neutral text colors.

## Typography

**Display Font:** Space Grotesk, with Source Sans 3 and sans-serif fallbacks.
**Body Font:** Source Sans 3, with a sans-serif fallback.

The pairing retains the engineering character without making every heading a poster. Current heading rules override the older foundation display presets: weight is medium, case is natural, and letter spacing is gently tightened.

### Hierarchy

- **Hero:** the home name, with the `hero` frontmatter role.
- **Page heading:** the shared page title, with the `page-heading` role.
- **Section heading:** shared section introductions, with the `section-heading` role. Contact section titles use a fixed smaller size; closing invitations share the section-heading scale, while the personal section uses its observed larger clamp.
- **Entry title:** organisation and project names, with the `entry-title` role.
- **Body:** descriptions and controls, with the `body` role. Introductory copy is slightly larger (1.1rem). Work and project copy stay around 65ch, and introductory paragraphs 48–60ch.
- **Label and metadata:** field labels use `label`; dates, form hints, and captions use `metadata`; skills use semibold body text at the same size. Dates and character counts use tabular numerals. Button labels are semibold (600).

**The Plain Heading Rule.** Use left-aligned, sentence-case Space Grotesk headings at the observed medium weight. Keep metadata in Source Sans 3 without decorative uppercase labels.

## Layout

The shared container is capped at 72rem. It leaves 1rem gutters below the medium breakpoint and 2rem gutters from 48rem upward. The fixed navigation is 4.5rem high. Pages start below that height plus 3rem of space, increasing to 4rem at 64rem; the shared page bottom is 4rem.

Spacing follows the quarter-rem foundation scale in frontmatter. Entry padding is usually 2rem above and 2.5rem below; major sections use 4–5rem of separation. Headings and actions wrap naturally rather than compressing labels.

Layouts begin in one column. At 48rem, work and recent experience rows use a 1:2 identity/copy split, project rows use a 1.25:1 image/copy split, and contact uses a 2:1 form/details split. The home introduction uses 1.5:1 copy/portrait columns. On mobile, these return to a single reading column with no timeline indentation. Earlier-career details align dates, identity, and expansion control horizontally only at the medium breakpoint.

Contact places its form before secondary details in document and visual order. Image widths follow their container; screenshot heights stay natural. The home portrait is the intentional square crop, capped at 22rem.

## Elevation & Depth

The four refined routes remain flat. Static ink-to-charcoal gradients distinguish introductions; reading sections settle into charcoal, and compact charcoal closing invitations mark the next action. Low charcoal fields, thin rules, and whitespace provide the remaining depth. They do not use the legacy ambient, panel, glow, or glass shadow vocabulary. Retained definitions elsewhere are not normative for these routes.

**The Flat Work Rule.** Separate work entries with thin rules and whitespace. Let the content and original images provide hierarchy rather than adding raised card shells.

Route navigation uses the existing native horizontal view transition (420ms, decelerating easing). The fixed navigation stays visually steady. Reduced-motion settings shorten that transition to 1ms and disable smooth scrolling. Ordinary button state changes take 180ms; no repeated reveal animation is part of this refinement.

## Shapes

Buttons, contact fields, and organisation logos use the small corner token. Portraits and project images use the larger corner token. Work rows and career details have square, unboxed geometry. Dividers and field borders are thin (1px), and focus rings are clear (2px) with an offset.

## Components

### Buttons

Direct, sentence-case controls with compact corners, semibold Source Sans 3 labels, a minimum height (3rem), and inline icon gaps. Primary uses cyan with deep cyan text; hover brightens and active presses to the dim cyan token. Ghost uses a readable outline, transparent fill, and a low-charcoal hover. Disabled submission controls fade to 0.6 opacity and use a waiting cursor. Focus uses the global cyan ring, offset by 4px.

### Text links

Cyan text and a visible underline sit in a minimum target height (2.75rem). The underline strengthens on hover while the text brightens. Directional and external-link icons use the existing inline SVG paths, inherit current color, and remain decorative when the label already communicates the action.

### Work rows and image containers

Identity and substantive copy sit across a thin divider in desktop columns and stack on mobile. Technology stacks are semantic wrapping lists with compact labels: semibold, bright text on a low charcoal fill, a thin outline, and small corners. They are noninteractive and use an 8px gap. Project screenshots sit in rounded image containers without dark gradient overlays; work rows themselves carry no shadow or card background.

### Page canvas and closing invitations

Opening gradients use the same colour, vertical direction, stops, and 40rem fade depth on all four pages. They cover the route width and settle into charcoal, so long pages keep a steady reading surface. Closing invitations continue the charcoal canvas with a thin divider aligned to the content container and 3rem vertical padding. Heading and copy form one tightly spaced group; at 48rem and above the button sits alongside it, while mobile stacks the text before the button. They have no rounded frame, shadow, or animated background.

### Inputs / Fields

Contact inputs use a low charcoal fill, readable outline, small corners, and comfortable inset padding. Focus changes the border to cyan and uses a 2px outline offset by 3px. Invalid fields use the error token and nearby specific error copy. The textarea resizes vertically and has a minimum height (10rem). Hints and the character count use metadata sizing. Submission feedback stays in the form reading flow, with a direct-email recovery link on error.

### Navigation

The fixed header matches the opening gradient’s blue-green origin and has a subtle blue-green bottom rule, the supplied JT logo linking home, and natural-case Source Sans 3 links. Secondary text brightens on hover; the current route is cyan and underlined. Below 48rem, an SVG menu button reveals stacked links in the same bar; above it, links run horizontally. The logo displays at 3.5rem square inside a thin outlined, rounded tile with an accessible home-link label. On a fine pointer, hover brightens the border to cyan and lifts the tile 2px over 160ms; pressing settles it back. Keyboard focus also brightens the border. Reduced motion preserves colour feedback and removes the lift. Link and toggle targets have a minimum height (2.75rem).

### Earlier-career details

Experience entries show the supplied organisation logo beside the company name in an 80 × 64px box with contained proportions. Earlier-career summaries show the logo beside the company and role, including while collapsed. Native details/summary keeps older roles compact and expands the actual content in place. A thin CSS plus becomes a minus when open. Metadata, identity, and the control share the row; visible keyboard focus is preserved. There is no timeline rail or reveal effect.

## Do's and Don'ts

### Do:

- Do keep the charcoal/cyan identity and Space Grotesk/Source Sans 3 pairing.
- Do use sentence-case, left-aligned headings and plain, specific personal language.
- Do show original photographs and screenshots clearly, with natural image proportions where the build does so.
- Do preserve visible focus, underlined text links, readable neutral copy, and useful field errors.
- Do use the shared container, spacing rhythm, and mobile-first column collapse for new surfaces.

### Don't:

- Don't add generic marketing slogans, fabricated outcomes, testimonials, or availability promises.
- Don't reintroduce dark screenshot gradients, repeated reveal effects, or decorative card frames around every work entry.
- Don't substitute Unicode glyphs for the existing SVG icon system.
- Don't inherit unused legacy uppercase display styles, decorative label styles, glow shadows, or glass surfaces as the four-route house style.
