import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [GalleryComponent],
  templateUrl: './pages.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  constructor() { }

}
