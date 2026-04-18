export const SITE_URL = 'https://joshtell.dev';
export const DEFAULT_ROBOTS = 'index, follow';
export const SITE_NAME = 'Josh Tell';
export const SITE_ALTERNATE_NAME = 'joshtell.dev';

export type SeoData = {
  name?: string;
  description: string;
  canonicalPath: string;
  robots?: string;
};

export type ResolvedSeoData = {
  description: string;
  canonicalPath: string;
  robots: string;
};

export const DEFAULT_SEO: ResolvedSeoData = {
  description:
    'Josh Tell is a senior full stack engineer building scalable web products, durable interfaces, and thoughtful product experiences.',
  canonicalPath: '/',
  robots: DEFAULT_ROBOTS
};
