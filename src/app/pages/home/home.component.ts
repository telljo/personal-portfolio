import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home' }
})
export class HomeComponent {
  readonly currentYear = new Date().getFullYear();
}
