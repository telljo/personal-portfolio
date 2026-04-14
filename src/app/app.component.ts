import { computed, Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { NavbarComponent } from './pages/navbar/navbar.component';

type SwipeDirection = 'next' | 'previous';
type SwipeSnapshot = {
  coord: [number, number];
  time: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'AngularCV';
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

  constructor(private readonly router: Router) {}

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
}
