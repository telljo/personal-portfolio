import { DOCUMENT } from '@angular/common';
import { computed, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { NavbarComponent } from './pages/navbar/navbar.component';
import {
  DEFAULT_ROBOTS,
  DEFAULT_SEO,
  SITE_ALTERNATE_NAME,
  SITE_NAME,
  SITE_URL,
  type ResolvedSeoData,
  type SeoData
} from './seo';

type SwipeDirection = 'next' | 'previous';
type SwipeSnapshot = {
  coord: [number, number];
  time: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly currentYear = new Date().getFullYear();
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly pages: readonly string[] = [
    '/',
    '/experience',
    '/projects',
    '/contact'
  ];
  private readonly swipeStart = signal<SwipeSnapshot | null>(null);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.normalizeUrl(this.router.url)),
      startWith(this.normalizeUrl(this.router.url))
    ),
    { initialValue: this.normalizeUrl(this.router.url) }
  );
  readonly currentPageIndex = computed(() => {
    const pageIndex = this.pages.indexOf(this.currentUrl());
    return pageIndex >= 0 ? pageIndex : 0;
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.resolveSeoData()),
        takeUntilDestroyed()
      )
      .subscribe(seoData => {
        this.applySeoTags(seoData);
      });
  }

  swipe(event: TouchEvent, when: 'start' | 'end'): void {
    if (when === 'start') {
      this.swipeStart.set({
        coord: [event.changedTouches[0].clientX, event.changedTouches[0].clientY],
        time: Date.now()
      });
      return;
    }

    const swipeStart = this.swipeStart();
    if (!swipeStart) {
      return;
    }

    const coord: [number, number] = [
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY
    ];
    const direction = [
      coord[0] - swipeStart.coord[0],
      coord[1] - swipeStart.coord[1]
    ];
    const duration = Date.now() - swipeStart.time;

    if (
      duration < 1000 &&
      Math.abs(direction[0]) > 30 &&
      Math.abs(direction[0]) > Math.abs(direction[1] * 3)
    ) {
      const swipeDirection: SwipeDirection =
        direction[0] < 0 ? 'next' : 'previous';
      this.navigatePage(swipeDirection);
    }

    this.swipeStart.set(null);
  }

  private navigatePage(direction: SwipeDirection): void {
    const currentPage = this.currentPageIndex();
    const destinationIndex =
      direction === 'next' ? currentPage + 1 : currentPage - 1;

    if (destinationIndex < 0 || destinationIndex >= this.pages.length) {
      return;
    }

    void this.router.navigate([this.pages[destinationIndex]]);
  }

  private normalizeUrl(url: string): string {
    return url === '/' ? '/' : url.replace(/\/+$/, '');
  }

  private resolveSeoData(): ResolvedSeoData {
    let currentRoute = this.router.routerState.snapshot.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const routeData = currentRoute.data as Partial<SeoData>;

    return {
      description: routeData.description ?? DEFAULT_SEO.description,
      canonicalPath: routeData.canonicalPath ?? this.currentUrl(),
      robots: routeData.robots ?? DEFAULT_ROBOTS
    };
  }

  private applySeoTags(seoData: ResolvedSeoData): void {
    const canonicalUrl = new URL(seoData.canonicalPath, `${SITE_URL}/`).toString();
    const pageTitle = this.document.title;

    this.meta.updateTag({ name: 'description', content: seoData.description });
    this.meta.updateTag({
      name: 'robots',
      content: seoData.robots === DEFAULT_ROBOTS
        ? `${DEFAULT_ROBOTS}, max-image-preview:large`
        : seoData.robots
    });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });

    let canonicalLink = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
    this.applyStructuredData(seoData, canonicalUrl);
  }

  private applyStructuredData(seoData: ResolvedSeoData, canonicalUrl: string): void {
    const routeName = this.resolveRouteName();

    this.upsertJsonLdScript(
      'website-structured-data',
      seoData.canonicalPath === '/'
        ? {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            alternateName: SITE_ALTERNATE_NAME,
            url: `${SITE_URL}/`
          }
        : null
    );

    this.upsertJsonLdScript(
      'breadcrumb-structured-data',
      seoData.canonicalPath !== '/' && seoData.canonicalPath !== '/404' && routeName
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE_URL}/`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: routeName,
                item: canonicalUrl
              }
            ]
          }
        : null
    );
  }

  private resolveRouteName(): string | null {
    let currentRoute = this.router.routerState.snapshot.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const routeData = currentRoute.data as Partial<SeoData>;
    return routeData.name ?? null;
  }

  private upsertJsonLdScript(id: string, value: Record<string, unknown> | null): void {
    const selector = `script[data-structured-data="${id}"]`;
    const existingScript = this.document.head.querySelector<HTMLScriptElement>(selector);

    if (!value) {
      existingScript?.remove();
      return;
    }

    const script = existingScript ?? this.document.createElement('script');

    script.type = 'application/ld+json';
    script.dataset['structuredData'] = id;
    script.textContent = JSON.stringify(value);

    if (!existingScript) {
      this.document.head.appendChild(script);
    }
  }
}
