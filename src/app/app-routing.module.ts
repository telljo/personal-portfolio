import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';

const routes: Routes = [
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
        path: 'skills',
        component: SkillsComponent,
        data: { animation: 'Skills' }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { animation: 'Contact' }
      }
    ]
  },
  { path: '404', component: HomeComponent },
  { path: '**', redirectTo: '404' },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
