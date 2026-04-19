import { Component, HostListener, inject, signal } from '@angular/core';
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
  readonly navLinks: readonly NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];
  readonly exactMatchOptions = { exact: true };
  readonly navShow = signal(false);
  readonly navScrolled = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.closeNav();
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.navScrolled.set(window.scrollY > 50);
  }

  toggleNav(): void {
    this.navShow.update(isOpen => !isOpen);
  }

  closeNav(): void {
    this.navShow.set(false);
  }
}
