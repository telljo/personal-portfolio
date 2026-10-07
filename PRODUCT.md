# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Potential contracting and consulting clients, recruiters, and hiring teams are equally important audiences. They visit to assess Josh's work and experience and decide whether to contact him about a project or engineering role.

## Product Purpose

Josh Tell's personal portfolio demonstrates his engineering experience and work. Success means visitors are impressed by the evidence and get in touch.

## Positioning

Josh is a senior full stack engineer who has also been contracting over the past year. Give contracting a more prominent place alongside his engineering background without excluding employment opportunities.

Scalable engineering, product thinking, and thoughtful interfaces remain accurate themes. Express them through specific work and plain language rather than relying on these phrases as a generic tagline. Final public wording for the contractor emphasis is undecided.

## Operating Context

Visitors can explore career experience and personal projects, follow project and professional profile links, and contact Josh through the contact page.

The existing web application uses Angular, TypeScript, and SCSS, with Firebase Hosting and a Firebase Function for contact messages. The repository uses Yarn and Node 22.14.0; `yarn start` serves the application at `http://localhost:4200/`. See `README.md` for build and deployment instructions.

## Capabilities and Constraints

- Existing routes are home (`/`), experience (`/experience`), projects (`/projects`), and contact (`/contact`), with a not-found page.
- The contact form collects name, email, and message, supplies an email subject automatically, and includes validation and submission feedback. Drafts are saved per browser tab when session storage is available. It posts to `/api/contact`; the Firebase Function sends email through Resend. Backend configuration is required to test delivery; the Angular development server alone does not provide this endpoint.
- Direct email, GitHub, LinkedIn, and WhatsApp links provide additional contact and profile options.
- Keep factual career and project content accurate. Changes to factual claims require confirmation; repository copy is existing content, not independent verification.
- Availability, engagement terms, and any response-time promise have not been confirmed during initialization. Do not turn existing contact-page wording into a durable guarantee.
- No requirement to retain a particular palette, font, or layout was established during initialization.

## Brand Commitments

The public identity is Josh Tell at joshtell.dev.

Use plain, specific, personal language. Josh wants the site to feel less AI-looking; avoid generic presentation and formulaic marketing copy. Preserve the engineering substance while making the person and actual work clear. Visual direction remains to be decided in design work.

## Evidence on Hand

Existing repository content and assets provide the starting evidence:

- Current IFSO and Banqer contract engagements are shared from `src/app/shared/portfolio-content.ts`. Career entries in `src/app/pages/experience/experience.component.ts` also describe earlier Banqer employment, DXC Technology, ANZ, Go Cloud Systems, and University of Otago education.
- Project entries in `src/app/pages/projects/projects.component.ts` describe Footprints, Bookshelf, this portfolio, and work on the Otago University Squash Club website, with external links and screenshots.
- `src/assets/Images/` contains Josh's portrait, project screenshots, and organisation logos.

No testimonials or quantified business outcomes were supplied during initialization. Do not fabricate them. Confirm freshness before expanding existing dates, job descriptions, project status, or client claims.

## Product Principles

1. Serve prospective clients and hiring teams equally.
2. Let actual work and experience earn interest and enquiries.
3. Make contracting experience easy to understand alongside the senior engineering role.
4. Use concrete, personal language instead of interchangeable claims.
5. Keep contact straightforward after visitors have assessed the work.
