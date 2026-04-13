import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home' }
})
export class HomeComponent {
  constructor() { }
}
