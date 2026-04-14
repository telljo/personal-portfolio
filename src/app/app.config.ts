import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';

const routeOrder: Record<string, number> = {
  '': 0,
  experience: 1,
  projects: 2,
  contact: 3
};

const routeTransitionClasses = [
  'route-transition--forward',
  'route-transition--backward'
] as const;

function getLeafPath(snapshot: ActivatedRouteSnapshot): string {
  let current = snapshot;

  while (current.firstChild) {
    current = current.firstChild;
  }

  return current.routeConfig?.path ?? '';
}

function setRouteTransitionDirection(
  from: ActivatedRouteSnapshot,
  to: ActivatedRouteSnapshot
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.remove(...routeTransitionClasses);

  const fromIndex = routeOrder[getLeafPath(from)];
  const toIndex = routeOrder[getLeafPath(to)];

  root.classList.add(
    fromIndex === undefined || toIndex === undefined || fromIndex === toIndex
      ? 'route-transition--forward'
      : toIndex > fromIndex
        ? 'route-transition--forward'
        : 'route-transition--backward'
  );
}

function resetRouteTransitionDirection(): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.remove(...routeTransitionClasses);
}

function scrollToTopOnTransition(): void {
  if (typeof window === 'undefined' || window.scrollY === 0) {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ from, to, transition }) => {
          setRouteTransitionDirection(from, to);
          scrollToTopOnTransition();

          void transition.finished.finally(() => {
            resetRouteTransitionDirection();
          });
        }
      })
    )
  ]
};
