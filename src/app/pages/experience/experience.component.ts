import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  private birthdate: Date = new Date('1997-01-30');
  private startDate: Date = new Date('2017-11-01');
  constructor() {}

  public CalculateDifference(time: string): string {
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

  ngOnInit() {
    this.loadScript();
  }

  public loadScript() {
    (function () {
      'use strict';

      // define variables
      var items = document.querySelectorAll('.timeline-item');
      var cards = document.querySelectorAll('.timeline-img');

      setTimeout(function () {
        for (var i = 0; i < cards.length; i++) {
          if (isElementInViewport(cards[i])) {
            items[i].classList.add('in-view');
          }
        }
      }, 750);

      // check if an element is in viewport
      function isElementInViewport(el: any) {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.top + 100 <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      function callbackFunc() {
        for (var i = 0; i < cards.length; i++) {
          if (isElementInViewport(cards[i])) {
            items[i].classList.add('in-view');
          }
        }
      }
      // listen for events
      window.addEventListener('resize', callbackFunc);
      window.addEventListener('scroll', callbackFunc);
    })();
  }
}
