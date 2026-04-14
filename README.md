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

## Notes

- Prefer `yarn` over `npm` in this repo.
- Avoid `npm audit fix` here unless you intentionally want to switch package managers, since it creates a `package-lock.json` and can desynchronize dependencies from `yarn.lock`.
