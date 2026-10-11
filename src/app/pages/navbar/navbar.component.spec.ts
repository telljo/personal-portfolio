import { beforeEach, describe, expect, it } from 'vitest';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({ template: '' })
class DestinationComponent {}

describe('Navigation updates', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let toggle: HTMLButtonElement;
  let links: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: 'projects', component: DestinationComponent }])
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    await fixture.whenStable();
    toggle = fixture.nativeElement.querySelector('.navbar__button');
    links = fixture.nativeElement.querySelector('.navbar__links');
  });

  it('opens the menu and closes it with Escape, returning focus to the toggle', async () => {
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(links.classList.contains('navbar__links--open')).toBe(true);

    (links.querySelector('a') as HTMLAnchorElement).focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(links.classList.contains('navbar__links--open')).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('closes the menu and updates the active link after navigation', async () => {
    toggle.click();
    await fixture.whenStable();
    await TestBed.inject(Router).navigateByUrl('/projects');
    await fixture.whenStable();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(links.classList.contains('navbar__links--open')).toBe(false);
    const activeLink = links.querySelector('.navbar__link--active');
    expect(activeLink?.textContent).toBe('Projects');
    expect(activeLink?.getAttribute('aria-current')).toBe('page');
  });
});
