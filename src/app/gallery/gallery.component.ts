import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SlideInOutAnimation } from '../../animations/slide-in-out';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'pages-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger('switchState', [
      state(
        'pay',
        style({
          width: '14.9rem',
          marginLeft: 0
        })
      ),
      state(
        'transfer',
        style({
          width: '18.8rem',
          marginLeft: '26.7%'
        })
      ),
      state(
        'dispute',
        style({
          width: '17.1rem',
          marginLeft: '53.7%'
        })
      ),
      state(
        'help',
        style({
          width: '13.8rem',
          marginLeft: '80.2%'
        })
      ),
      transition('* => *', [animate('0.35s')])
    ]),
    SlideInOutAnimation
  ]
})
export class GalleryComponent implements OnInit {
  constructor(private router: Router, private changeRef: ChangeDetectorRef) {}
  subs: Subscription[] = [];

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit() {

  }

  switchState(pageDestination: string) {

    if (window.scrollY > 0) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.scrollY;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 20);
    }
    setTimeout(() => {
      if (window.scrollY > 0) {
        this.switchState(pageDestination);
      }
    },
      20);

    this.router.navigate([pageDestination]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  onActivate(event: any) {
    if (window.scrollY > 0) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.scrollY;
        if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 20);
    }
    setTimeout(() => {
      if (window.scrollY > 0) {
        this.onActivate(event);
      }
    },
      20);
}
}
