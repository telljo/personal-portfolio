import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { IconComponent } from '../../shared/icon/icon.component';

type ContactFormModel = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { class: 'contact' }
})
export class ContactComponent {
  readonly emailAddress = 'jtell1997@gmail.com';
  readonly contactFormModel: ContactFormModel = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  sendEmail(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.contactFormModel;
    const encodedSubject = encodeURIComponent(subject.trim());
    const encodedBody = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );

    window.location.href = `mailto:${this.emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
  }
}
