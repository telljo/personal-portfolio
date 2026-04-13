import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { class: 'contact' }
})
export class ContactComponent {

  constructor() {
  }
}
