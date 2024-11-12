import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'navbar' }
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
