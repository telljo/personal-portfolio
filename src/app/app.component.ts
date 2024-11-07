import { Component } from '@angular/core';
import { NavAnimation } from '../animations/slide-in-out';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [NavAnimation]
})
export class AppComponent {

  title = 'AngularCV';

  private swipeCoord: [number, number] = [0,0];
  private swipeTime: number = 0;
  private pages: Array<string> = ['', 'experience', 'projects', 'contact'];

  constructor(private router: Router){
  }

// Detects a swipe and navigates to the next page based on swipe direction
swipe(e: TouchEvent, when: string): void {
  const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
  const time = new Date().getTime();

  if (when === 'start') {
    this.swipeCoord = coord;
    this.swipeTime = time;
  } else if (when === 'end') {
    const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
    const duration = time - this.swipeTime;

    if (duration < 1000 //
      && Math.abs(direction[0]) > 30 // Long enough
      && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';

        const currentPage = this.getCurrentPage();

        if(swipe === 'next'){
          if(currentPage != 3){
            this.navigatePage(currentPage, 'next');
          }
        }else{
          if(currentPage != 0){
            this.navigatePage(currentPage, 'previous');
          }
        }
      }
    }
  }

  // Navigates to a page based on swipe direction and page number
  navigatePage(page: number, direction: string){
    if(direction==='next'){
      this.router.navigate(["../"+this.pages[page+1]]);
    }else if(direction ==='previous'){
      this.router.navigate(["../"+this.pages[page-1]]);
    }
  }

  // Gets the current page
  getCurrentPage(): number{

    if(this.router.url === '/' ){
      return 0;
    }else if(this.router.url ==='/experience'){
      return 1;
    }else if(this.router.url ==='/projects'){
      return 2;
    }else{
      return 3
    }
  }
}