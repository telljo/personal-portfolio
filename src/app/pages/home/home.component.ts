import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HomeHighlightsComponent } from './home-highlights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HomeHighlightsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home' }
})
export class HomeComponent {
}
