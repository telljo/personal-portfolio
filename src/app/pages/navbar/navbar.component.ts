import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, ViewChild, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { IconComponent } from '../../shared/icon/icon.component';

type NavLink = {
  path: string;
  label: string;
};

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'navbar' }
})

export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  readonly navLinks: readonly NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];
  readonly exactMatchOptions = { exact: true };
  readonly navShow = signal(false);
  @ViewChild('navbarShell', { static: true }) private navbarShell!: ElementRef<HTMLElement>;
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  constructor() {
    afterNextRender(() => {
      const shell = this.navbarShell.nativeElement;
      const root = this.document.documentElement;
      const updateHeight = () => {
        root.style.setProperty('--navbar-height', `${shell.getBoundingClientRect().height}px`);
      };
      updateHeight();
      const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateHeight);
      observer?.observe(shell);
      this.destroyRef.onDestroy(() => {
        observer?.disconnect();
        root.style.removeProperty('--navbar-height');
      });
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.closeNav();
      });
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.navShow()) {
      this.closeNav();
      this.menuToggle?.nativeElement.focus();
    }
  }

  toggleNav(): void {
    this.navShow.update(isOpen => !isOpen);
  }

  closeNav(): void {
    this.navShow.set(false);
  }
}
