import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home' }
})
export class HomeComponent {
  constructor() { }
}

