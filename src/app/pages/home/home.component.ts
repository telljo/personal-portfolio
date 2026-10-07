import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';

import { HomeHighlightsComponent } from './home-highlights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HomeHighlightsComponent, IconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  host: { class: 'home page-canvas' }
})
export class HomeComponent {
}
