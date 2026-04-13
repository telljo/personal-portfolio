import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home' }
})
export class HomeComponent {
  constructor() { }
}
