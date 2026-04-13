import { Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { animation: 'Home' }
      },
      {
        path: 'experience',
        component: ExperienceComponent,
        data: { animation: 'Experience' }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: { animation: 'Projects' }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { animation: 'Contact' }
      }
    ]
  },
  { path: '404', component: HomeComponent },
  { path: '**', redirectTo: '404' }
];
