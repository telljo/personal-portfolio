import { copyFile } from 'node:fs/promises';

// Firebase serves this file with HTTP 404 for paths without a static page.
const outputDirectory = new URL('../dist/personal-portfolio/browser/', import.meta.url);
await copyFile(
  new URL('404/index.html', outputDirectory),
  new URL('404.html', outputDirectory)
);
