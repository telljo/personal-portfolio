import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IconComponent } from '../../shared/icon/icon.component';

type ContactFormModel = { name: string; email: string; message: string };
const draftKey = 'josh-tell-contact-draft';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { class: 'contact page-canvas' }
})
export class ContactComponent {
  readonly emailAddress = 'jtell1997@gmail.com';
  readonly messageMaxLength = 1500;
  readonly contactFormModel: ContactFormModel = { name: '', email: '', message: '' };
  readonly draftStorageAvailable = signal(true);
  readonly isSubmitting = signal(false);
  readonly submissionMessage = signal('');
  readonly submissionState = signal<'idle' | 'success' | 'error'>('idle');

  constructor() {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) ?? 'null');
      if (draft && typeof draft === 'object') {
        for (const field of ['name', 'email', 'message'] as const) {
          if (typeof draft[field] === 'string') {
            this.contactFormModel[field] = draft[field].slice(0, field === 'message' ? this.messageMaxLength : field === 'name' ? 120 : 254);
          }
        }
      }
    } catch {
      this.draftStorageAvailable.set(false);
    }
  }

  saveDraft(): void {
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(this.contactFormModel));
    } catch {
      this.draftStorageAvailable.set(false);
    }
  }

  async sendEmail(form: NgForm): Promise<void> {
    if (this.isSubmitting()) return;
    for (const field of ['name', 'message'] as const) {
      if (!this.contactFormModel[field].trim()) form.controls[field]?.setErrors({ required: true });
    }
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.submissionState.set('idle');
    this.submissionMessage.set('');
    this.saveDraft();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.contactFormModel.name.trim(),
          email: this.contactFormModel.email.trim(),
          subject: 'Portfolio enquiry',
          message: this.contactFormModel.message.trim()
        })
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? 'Your message could not be sent. Please try again or email me directly.');
      form.resetForm({ name: '', email: '', message: '' });
      try { sessionStorage.removeItem(draftKey); } catch { /* Delivery succeeded even if local storage is unavailable. */ }
      this.submissionState.set('success');
      this.submissionMessage.set('Thanks — your message has been sent.');
    } catch {
      this.submissionState.set('error');
      this.submissionMessage.set('Your message could not be sent. Your text is still here. Please try again or email me directly.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
