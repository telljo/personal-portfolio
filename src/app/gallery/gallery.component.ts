import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pages-gallery',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {}
