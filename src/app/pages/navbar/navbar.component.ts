import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavLink = {
  path: string;
  label: string;
};

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'navbar' }
})

export class NavbarComponent {
  readonly navLinks: readonly NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];
  readonly exactMatchOptions = { exact: true };
  readonly navShow = signal(false);
  readonly navScrolled = signal(false);

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
