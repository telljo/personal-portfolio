import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { class: 'not-found' }
})
export class NotFoundComponent {}
