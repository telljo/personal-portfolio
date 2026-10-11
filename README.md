# Josh Tell — Personal portfolio

Source for [joshtell.dev](https://joshtell.dev), showcasing client work, engineering experience, and personal projects.

The frontend uses Angular 22, TypeScript 6, RxJS, and SCSS. Firebase Hosting serves the site; a Node.js 22 Firebase Function sends contact enquiries through Resend.

## Getting started

Use Node **22.22.3**, as specified in `.nvmrc`. Local development and GitHub builds share this version, which meets [Angular 22's compatibility requirements](https://angular.dev/reference/versions).

Run these commands from the repository root:

```bash
nvm install
nvm use
yarn install --frozen-lockfile
yarn start
```

Open [localhost:4200](http://localhost:4200/). If you do not use nvm, install Node 22.22.3 through your preferred version manager.

`yarn start` runs the frontend only. It has no `/api/contact` handler or API proxy, so sending a valid contact enquiry here returns `Cannot POST /api/contact`. Use the Firebase emulators below to test delivery.

## Commands

| Command | Purpose |
| --- | --- |
| `yarn start` | Start the Angular development server with live reload. |
| `yarn build` | Create a production build with prerendered pages and a static 404 page. |
| `yarn watch` | Rebuild continuously using the development configuration. |
| `yarn test` | Run the Jasmine/Karma tests in watch mode. |
| `yarn test --watch=false --browsers=ChromeHeadless` | Run tests once in headless Chrome. |
| `yarn deploy` | Deploy Firebase Hosting only. |

Production files are written to `dist/personal-portfolio/browser`, which matches the Hosting configuration. Tests require an installed Chrome browser and mock contact delivery rather than sending real emails.

The frontend uses Yarn and `yarn.lock`. The separate `functions/` package has its own `package-lock.json`; install its dependencies with `npm ci --prefix functions`. Avoid generating an npm lockfile at the repository root.

## Pages and content

| Route | Content |
| --- | --- |
| `/` | Introduction, recent client work, and personal-project links. |
| `/experience` | Recent work and expandable earlier experience and education. |
| `/projects` | Client work and personal projects. |
| `/contact` | Contact form, direct email, and professional profile links. |
| `/404` | Fallback for unknown routes. |

Key files:

- [`src/app/shared/portfolio-content.ts`](src/app/shared/portfolio-content.ts): shared client engagements used by Home, Experience, and Projects.
- [`src/app/pages/experience/experience.component.ts`](src/app/pages/experience/experience.component.ts): previous employment and education.
- [`src/app/pages/projects/projects.component.ts`](src/app/pages/projects/projects.component.ts): personal-project content.
- [`src/app/pages/navbar/`](src/app/pages/navbar/): shared navigation and mobile menu.
- [`src/app/app.component.html`](src/app/app.component.html): shared page shell and footer.
- [`src/styles/`](src/styles/): design tokens, shared patterns, and global styles. Page styles live alongside their components.
- [`src/assets/Images/`](src/assets/Images/): portrait, organisation logos, and project screenshots.
- [`src/app/app.routes.ts`](src/app/app.routes.ts) and [`src/app/seo.ts`](src/app/seo.ts): routes, page titles, descriptions, and canonical site URL.
- [`src/app/app.routes.server.ts`](src/app/app.routes.server.ts): routes rendered to HTML during the build.
- [`PRODUCT.md`](PRODUCT.md) and [`DESIGN.md`](DESIGN.md): product context and visual conventions.

## Static rendering

`yarn build` renders `/`, `/experience`, `/projects`, `/contact`, and `/404` to HTML at build time. Each document includes its page content, title, description, canonical URL, and social metadata. Angular hydrates the existing HTML in the browser to enable navigation and interactions.

The application uses `outputMode: static`; Firebase Hosting serves the generated files without a Node.js rendering server. The email function remains a separate backend.

The `postbuild` script in [`scripts/prepare-static-hosting.mjs`](scripts/prepare-static-hosting.mjs) copies the prerendered `/404` page to `404.html`. Hosting serves it with HTTP 404 for unknown URLs. The Hosting configuration removes trailing slashes to match canonical URLs and keeps the `/api/contact` function rewrite.

Contact drafts are restored after the first browser render, keeping the initial HTML consistent during hydration. Browser-only setup should use `afterNextRender` rather than reading browser storage during construction.

To preview the static output without running the email function:

```bash
yarn build
npx firebase-tools emulators:start --only hosting
```

Open the printed Hosting URL. `yarn watch` rebuilds page HTML, but does not run `postbuild`; use `yarn build` to refresh `404.html` before deployment.

## Contact form

The form requires name, email, and message. It supplies the subject automatically, validates input, and saves drafts in per-tab session storage when available. Failed submissions retain the draft and offer direct email as a fallback.

Delivery follows this path:

```text
Contact form → POST /api/contact → sendContactEmail → Resend → inbox
```

[`firebase.json`](firebase.json) rewrites `/api/contact` to `sendContactEmail` in `asia-southeast2`. Page URLs serve their prerendered HTML; unknown URLs receive the static 404 page.

The backend is in [`functions/index.js`](functions/index.js). Its recipient and sender are configured by `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`; the current sender is `Portfolio Contact <onboarding@resend.dev>`.

Resend's test sender can send only to the email associated with the Resend account. To send to a different recipient, verify a sending domain and update `CONTACT_FROM_EMAIL`. See [Resend's test-domain restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

### Test the contact form locally

Install the backend dependencies:

```bash
npm ci --prefix functions
```

Create `functions/.secret.local` with your Resend API key:

```dotenv
RESEND_API_KEY=replace_with_your_resend_api_key
```

This file is ignored by Git. The emulator uses it as a local secret override; production uses Secret Manager. See [Firebase secret configuration](https://firebase.google.com/docs/functions/config-env#secrets_and_credentials_in_the_cloud_functions_emulator).

Build the frontend and run both emulators from the repository root:

```bash
yarn build
npx firebase-tools emulators:start --only hosting,functions
```

Open the **Hosting emulator URL** printed in the terminal, then navigate to `/contact`. This serves the compiled frontend with the `/api/contact` rewrite. The Angular server at port 4200 remains frontend-only. See [Firebase Hosting emulator documentation](https://firebase.google.com/docs/emulator-suite/use_hosting).

Rebuild after frontend changes, or run `yarn watch` in another terminal, and refresh the emulator page. The Functions emulator reloads backend source changes; restart it after changing local secrets.

The emulator still calls the real Resend API, so a successful enquiry sends an email. It does not provide a mock email service.

## Deployment

[`firebase.json`](firebase.json) defines Hosting and the `portfolio` Functions codebase. [`.firebaserc`](.firebaserc) currently selects `personal-portfolio-2ebbc` as the default project.

### Firebase and email setup

Sign in and confirm the intended project:

```bash
npx firebase-tools login
npx firebase-tools projects:list
```

Use `npx firebase-tools use --add` if you need to configure another project alias. Deploying Cloud Functions requires the Firebase project's [Blaze pricing plan](https://firebase.google.com/docs/functions/get-started).

Set the production email secret interactively:

```bash
npx firebase-tools functions:secrets:set RESEND_API_KEY
```

The function already declares access to this secret. Redeploy Functions after setting or rotating it so the new value takes effect. Local `.secret.local` values are not a substitute for the production secret. See [Firebase secret management](https://firebase.google.com/docs/functions/config-env#store_and_access_sensitive_configuration_information).

### Deploy Hosting and Functions

For the first deployment, or changes to both frontend and backend:

```bash
npm ci --prefix functions
yarn build
npx firebase-tools deploy --only functions,hosting
```

For frontend-only changes after the backend is deployed:

```bash
yarn build
yarn deploy
```

For backend-only changes:

```bash
npx firebase-tools deploy --only functions
```

`yarn deploy` runs a Hosting-only deployment and does not build the frontend or deploy the email function.

### GitHub deployments

The workflows in [`.github/workflows/`](.github/workflows/):

- Build and deploy live Hosting on pushes to `master`.
- Build and create Hosting previews for pull requests from the same repository.

Configure these repository settings:

| Setting | Type | Value |
| --- | --- | --- |
| `FIREBASE_PROJECT_ID` | Actions variable | The target Firebase project ID. |
| `FIREBASE_SERVICE_ACCOUNT` | Actions secret | A service-account JSON credential authorised to deploy Hosting. |

These workflows deploy **Hosting only**. Deploy Functions separately; PR previews do not create an isolated email backend. Keep the workflow project ID consistent with your intended local deployment project.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `Cannot POST /api/contact` on localhost | Open the Hosting emulator URL with both Hosting and Functions running. `yarn start` alone has no backend route. |
| Contact submission returns `502` | Inspect Functions logs and Resend for an invalid/missing key or sender/recipient restrictions. |
| Frontend is live but contact delivery fails | Confirm `sendContactEmail` is deployed in `asia-southeast2` and has `RESEND_API_KEY`. Hosting deployment alone is insufficient. |
| Firebase reports an unauthorised or missing project | Check `.firebaserc`, run `npx firebase-tools projects:list`, and use `npx firebase-tools login --reauth` if needed. |
| Changes are missing in the Hosting emulator | Rebuild with `yarn build` or `yarn watch`, then refresh the page. |
