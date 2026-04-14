import { Component } from '@angular/core';
import { InViewDirective } from '../../shared/directives/in-view.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  host: { class: 'projects' }
})
export class ProjectsComponent {
}
