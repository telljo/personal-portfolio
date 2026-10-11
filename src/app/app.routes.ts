import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PagesComponent } from './pages/pages.component';
import { type SeoData } from './seo';

const siteTitle = 'Josh Tell';
const pageTitle = (label: string): string =>
  label === 'Home' ? `${siteTitle} | Senior Full Stack Engineer` : `${label} | ${siteTitle}`;
const canonicalPath = (path: string): string => path === '/' ? '/' : `/${path}`;

// Keep primary navigation ready on initial load instead of fetching a page's
// JavaScript on its first click. The less common 404 route remains lazy.
const portfolioRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: pageTitle('Home'),
    data: {
      name: 'Home',
      description:
        'Josh Tell is a senior full stack engineer and contractor based in New Zealand. Explore client work, personal projects, and engineering experience.',
      canonicalPath: canonicalPath('/')
    } satisfies SeoData
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    title: pageTitle('Experience'),
    data: {
      name: 'Experience',
      description:
        'Explore Josh Tell’s software engineering and contracting experience at IFSO, Banqer, DXC Technology, ANZ, and Go Cloud Systems.',
      canonicalPath: canonicalPath('experience')
    } satisfies SeoData
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: pageTitle('Projects'),
    data: {
      name: 'Projects',
      description:
        'Explore Josh Tell’s client work for IFSO and Banqer, alongside personal projects including Footprints and Bookshelf.',
      canonicalPath: canonicalPath('projects')
    } satisfies SeoData
  },
  {
    path: 'contact',
    component: ContactComponent,
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
