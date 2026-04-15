import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.in-view') protected inView = false;

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private animationFrameIds: number[] = [];
  private timeoutIds: number[] = [];
  private readonly onWindowLoad = (): void => {
    this.checkAndActivate();
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) {
      this.inView = true;
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        this.deferInView();
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -24px 0px'
      }
    );

    this.observer.observe(this.elementRef.nativeElement);

    this.scheduleInitialChecks();

    if (document.readyState !== 'complete') {
      window.addEventListener('load', this.onWindowLoad, { once: true });
    }
  }

  ngOnDestroy(): void {
    for (const animationFrameId of this.animationFrameIds) {
      window.cancelAnimationFrame(animationFrameId);
    }

    for (const timeoutId of this.timeoutIds) {
      window.clearTimeout(timeoutId);
    }

    window.removeEventListener('load', this.onWindowLoad);
    this.observer?.disconnect();
  }

  private isInViewport(): boolean {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight && rect.bottom > 0;
  }

  private deferInView(): void {
    if (this.inView) {
      return;
    }

    const firstFrameId = window.requestAnimationFrame(() => {
      const secondFrameId = window.requestAnimationFrame(() => {
        this.inView = true;
        this.observer?.disconnect();
      });

      this.animationFrameIds.push(secondFrameId);
    });

    this.animationFrameIds.push(firstFrameId);
  }

  private checkAndActivate(): void {
    if (!this.inView && this.isInViewport()) {
      this.deferInView();
    }
  }

  private scheduleInitialChecks(): void {
    const immediateFrameId = window.requestAnimationFrame(() => {
      this.checkAndActivate();
    });

    this.animationFrameIds.push(immediateFrameId);

    for (const delay of [120, 320, 700]) {
      const timeoutId = window.setTimeout(() => {
        this.checkAndActivate();
      }, delay);

      this.timeoutIds.push(timeoutId);
    }
  }
}
