import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { appConfig } from './app.config';

@Component({ selector: 'test-transition-page', template: 'Page' })
class DestinationComponent {}

@Component({ selector: 'test-transition-host', imports: [RouterOutlet], template: '<router-outlet />' })
class RouterHostComponent {}

describe('Interrupted route transitions', () => {
  let fixture: ComponentFixture<RouterHostComponent>;
  let router: Router;
  let previousStartTransition: PropertyDescriptor | undefined;
  let transitions: { finish: () => void }[];

  beforeEach(async () => {
    transitions = [];
    previousStartTransition = Object.getOwnPropertyDescriptor(document, 'startViewTransition');
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: vi.fn((update: () => Promise<void>) => {
        let finish!: () => void;
        const finished = new Promise<void>(resolve => { finish = resolve; });
        transitions.push({ finish });
        queueMicrotask(() => { void update(); });
        return {
          ready: Promise.resolve(),
          updateCallbackDone: Promise.resolve(),
          finished,
          skipTransition: finish
        };
      })
    });
    await TestBed.configureTestingModule({
      imports: [RouterHostComponent],
      providers: appConfig.providers
    }).compileComponents();
    router = TestBed.inject(Router);
    router.resetConfig([
      { path: '', component: DestinationComponent },
      { path: 'experience', component: DestinationComponent },
      { path: 'projects', component: DestinationComponent }
    ]);
    fixture = TestBed.createComponent(RouterHostComponent);
    await fixture.whenStable();
    await router.navigateByUrl('/');
    // The router's initial-transition flag belongs to the shared app providers.
    // Complete any setup transition before testing user navigation.
    for (const transition of transitions) {
      transition.finish();
    }
    await Promise.resolve();
    transitions = [];
  });

  afterEach(async () => {
    for (const transition of transitions) {
      transition.finish();
    }
    await Promise.resolve();
    if (previousStartTransition) {
      Object.defineProperty(document, 'startViewTransition', previousStartTransition);
    } else {
      Reflect.deleteProperty(document, 'startViewTransition');
    }
  });

  it('accepts the next navigation while the previous animation is unfinished', async () => {
    await router.navigateByUrl('/experience');
    await router.navigateByUrl('/projects');

    expect(router.url).toBe('/projects');
    expect(transitions).toHaveLength(2);
    expect(document.documentElement.classList.contains('route-transition--forward')).toBe(true);
  });

  it('keeps the new direction when the interrupted animation finishes', async () => {
    await router.navigateByUrl('/experience');
    await router.navigateByUrl('/');
    expect(document.documentElement.classList.contains('route-transition--backward')).toBe(true);

    transitions[0].finish();
    await Promise.resolve();
    expect(document.documentElement.classList.contains('route-transition--backward')).toBe(true);

    transitions[1].finish();
    await Promise.resolve();
    expect(document.documentElement.classList.contains('route-transition--backward')).toBe(false);
    expect(document.documentElement.classList.contains('route-transition--forward')).toBe(false);
  });
});
