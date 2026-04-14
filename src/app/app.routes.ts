import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';

const siteTitle = 'Josh Tell';
const pageTitle = (label: string): string =>
  label === 'Home' ? siteTitle : `${label} | ${siteTitle}`;

const portfolioRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: pageTitle('Home'),
    data: { animation: 'Home' }
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./pages/experience/experience.component').then(
        m => m.ExperienceComponent
      ),
    title: pageTitle('Experience'),
    data: { animation: 'Experience' }
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        m => m.ProjectsComponent
      ),
    title: pageTitle('Projects'),
    data: { animation: 'Projects' }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        m => m.ContactComponent
      ),
    title: pageTitle('Contact'),
    data: { animation: 'Contact' }
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
    title: pageTitle('Page Not Found')
  },
  { path: '**', redirectTo: '404' }
];
