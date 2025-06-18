import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'navbar' },
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in <=> out', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})

export class NavbarComponent {
  animationState = 'out';
  navShow = false;
  navScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.navScrolled = window.scrollY > 50; // Adjust the value as needed
  }

  constructor() { }

  toggleShow(){
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.navShow = !this.navShow;
  }
}
