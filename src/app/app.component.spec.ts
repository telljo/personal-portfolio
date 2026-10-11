/// <reference types="jasmine" />

import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ExperienceComponent } from './pages/experience/experience.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [provideZonelessChangeDetection(), provideRouter([])]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose the current year for the footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentYear).toEqual(new Date().getFullYear());
  });

  it('should render the navbar shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('navbar')).not.toBeNull();
  });

  it('uses the destination page title in social metadata after navigation', async () => {
    const previousTitle = document.title;
    const router = TestBed.inject(Router);
    router.resetConfig([{
      path: 'experience',
      component: ExperienceComponent,
      title: 'Experience | Josh Tell',
      data: { description: 'Engineering experience.', canonicalPath: '/experience' }
    }]);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    try {
      await router.navigateByUrl('/experience');
      await fixture.whenStable();
      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Experience | Josh Tell');
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Experience | Josh Tell');
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://joshtell.dev/experience');
    } finally {
      document.title = previousTitle;
    }
  });
});
