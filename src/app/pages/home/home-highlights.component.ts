import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { contractEngagements } from '../../shared/portfolio-content';

@Component({
  selector: 'app-home-highlights',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './home-highlights.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-highlights.component.scss'
})
export class HomeHighlightsComponent {
  readonly clientWork = contractEngagements;
}
