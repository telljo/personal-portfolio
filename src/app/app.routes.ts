import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { type SeoData } from './seo';

const siteTitle = 'Josh Tell';
const pageTitle = (label: string): string =>
  label === 'Home' ? `${siteTitle} | Senior Full Stack Engineer` : `${label} | ${siteTitle}`;
const canonicalPath = (path: string): string => path === '/' ? '/' : `/${path}`;

const portfolioRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: pageTitle('Home'),
    data: {
      name: 'Home',
      description:
        'Josh Tell is a senior full stack engineer building scalable web products, durable interfaces, and thoughtful product experiences.',
      canonicalPath: canonicalPath('/')
    } satisfies SeoData
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/experience/experience.component').then(
        m => m.ExperienceComponent
      ),
    title: pageTitle('Experience'),
    data: {
      name: 'Experience',
      description:
        'Explore Josh Tell’s software engineering experience across Banqer, DXC Technology, ANZ, Go Cloud Systems, and the University of Otago.',
      canonicalPath: canonicalPath('experience')
    } satisfies SeoData
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        m => m.ProjectsComponent
      ),
    title: pageTitle('Projects'),
    data: {
      name: 'Projects',
      description:
        'Browse featured software projects by Josh Tell, including client work, side projects, and product experiments focused on scalable user experiences.',
      canonicalPath: canonicalPath('projects')
    } satisfies SeoData
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        m => m.ContactComponent
      ),
    title: pageTitle('Contact'),
    data: {
      name: 'Contact',
      description:
        'Contact Josh Tell about software consulting, engineering roles, product builds, and full stack development work.',
      canonicalPath: canonicalPath('contact')
    } satisfies SeoData
  }
];

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: portfolioRoutes
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    title: pageTitle('Page Not Found'),
    data: {
      name: 'Page Not Found',
      description:
        'The page you were looking for could not be found on Josh Tell’s portfolio site.',
      canonicalPath: canonicalPath('404'),
      robots: 'noindex, nofollow'
    } satisfies SeoData
  },
  { path: '**', redirectTo: '404' }
];
