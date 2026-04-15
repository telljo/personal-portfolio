# PersonalPortfolio

Personal portfolio site built with Angular and deployed to Firebase Hosting.

## Tooling

- Package manager: `yarn`
- Supported Node version: `22.14.0`
- Node version file: `.nvmrc`

This project is pinned to Node 22 because the Angular 21 build stack was unstable under Node 24 in this environment.

Typical setup:

```bash
nvm use
yarn install
```

## Development server

Run:

```bash
yarn start
```

Then open `http://localhost:4200/`.

## Build

Run:

```bash
yarn build
```

The production output used for hosting is under `dist/personal-portfolio/browser`.

## Tests

Run:

```bash
yarn test
```

## Firebase Hosting

This repo uses Firebase Hosting config files:

- `firebase.json`
- `.firebaserc`

The Firebase Hosting deployment workflow uses the Firebase CLI (`firebase-tools`), not the `firebase` browser SDK package.
Removing the unused `firebase` dependency from `package.json` does not affect Hosting deploys.

Deploy options:

```bash
yarn deploy
```

or directly:

```bash
npx firebase-tools deploy --only hosting
```

### GitHub auto-deploy

This repo includes GitHub Actions workflows that:

- deploy the live site on pushes to `master`
- create Firebase Hosting preview deploys for pull requests

One-time GitHub setup:

1. Add a repository variable named `FIREBASE_PROJECT_ID` with your real Firebase project ID.
2. Add a repository secret named `FIREBASE_SERVICE_ACCOUNT` with a service account JSON key that can deploy Firebase Hosting for that project.

If `firebase init hosting:github` fails locally, you can still use these workflows. That error usually means the Firebase project ID in `.firebaserc` is no longer valid for your current account, or you are logged into the wrong Google account for that project.

Useful local checks:

```bash
firebase login --reauth
firebase projects:list
firebase use --add
```

Once `.firebaserc` points at the correct project again, local `yarn deploy` will work with the same Hosting config used by CI.

## Notes

- Prefer `yarn` over `npm` in this repo.
- Avoid `npm audit fix` here unless you intentionally want to switch package managers, since it creates a `package-lock.json` and can desynchronize dependencies from `yarn.lock`.
