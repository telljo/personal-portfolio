import { Component } from '@angular/core';
import { NavAnimation } from 'src/animations/slide-in-out';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'navbar' },
  animations: [NavAnimation]
})

export class NavbarComponent {
  animationState = 'out';
  navShow = false;

  constructor() { }

  toggleShow(){
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.navShow = !this.navShow;
  }
}
