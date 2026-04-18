import { Component, signal } from '@angular/core';
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
  readonly subjectMaxLength = 120;
  readonly messageMaxLength = 1500;
  readonly contactFormModel: ContactFormModel = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  readonly isSubmitting = signal(false);
  readonly submissionMessage = signal('');
  readonly submissionState = signal<'idle' | 'success' | 'error'>('idle');

  async sendEmail(form: NgForm): Promise<void> {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submissionState.set('idle');
    this.submissionMessage.set('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.contactFormModel.name.trim(),
          email: this.contactFormModel.email.trim(),
          subject: this.contactFormModel.subject.trim(),
          message: this.contactFormModel.message.trim()
        })
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ??
            'Unable to send your message right now. Please try again shortly.'
        );
      }

      form.resetForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      this.submissionState.set('success');
      this.submissionMessage.set(
        `Thanks for reaching out. Your message has been sent to ${this.emailAddress}.`
      );
    } catch (error) {
      this.submissionState.set('error');
      this.submissionMessage.set(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now. Please try again shortly.'
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
