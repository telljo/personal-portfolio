import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skils',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }

  width90 = '90%'; width80 = '80%'; width75 = '75%'; width70 = '70%'; width65 = '65%'; width60 = '60%';
  t1 = '0.6s'; t2 = '0.7s'; t3 = '0.8s'; t4 = '0.9s'; t5 = '1s'; t6 = '1.1s'; t7 ='1.2s'; t8 = '1.3s';

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
