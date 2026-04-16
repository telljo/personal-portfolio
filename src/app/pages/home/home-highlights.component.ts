import { Component } from '@angular/core';

import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-home-highlights',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './home-highlights.component.html',
  styleUrl: './home-highlights.component.scss'
})
export class HomeHighlightsComponent {}
