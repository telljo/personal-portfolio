import { Component } from '@angular/core';
import { InViewDirective } from '../../shared/directives/in-view.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  private birthdate: Date = new Date('1997-01-30');
  private startDate: Date = new Date('2017-11-01');

  calculateDifference(time: string): string {
    const today = new Date();
    let calcDate = new Date();
    if (time === 'age') calcDate = this.birthdate;
    if (time === 'experience') calcDate = this.startDate;
    let difference = today.getFullYear() - calcDate.getFullYear();
    const m = today.getMonth() - calcDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < calcDate.getDate())) {
      difference--;
    }
    return difference.toString();
  }
}
