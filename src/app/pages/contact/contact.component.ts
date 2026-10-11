import { afterNextRender, Component, effect, signal } from '@angular/core';
import { email, form, FormField, FormRoot, maxLength, required, requiredError, validate } from '@angular/forms/signals';
import { IconComponent } from '../../shared/icon/icon.component';

type ContactFormModel = { name: string; email: string; message: string };
const draftKey = 'josh-tell-contact-draft';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormField, FormRoot, IconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { class: 'contact page-canvas' }
})
export class ContactComponent {
  readonly emailAddress = 'jtell1997@gmail.com';
  readonly messageMaxLength = 1500;
  readonly contactFormModel = signal<ContactFormModel>({ name: '', email: '', message: '' });
  readonly contactForm = form(this.contactFormModel, path => {
    required(path.name, { message: 'Please add your name.' });
    required(path.email, { message: 'Enter a valid email address so I can reply.' });
    required(path.message, { message: 'Add a message about what you have in mind.' });
    email(path.email, { message: 'Enter a valid email address so I can reply.' });
    maxLength(path.name, 120, { message: 'Please keep your name to 120 characters.' });
    maxLength(path.email, 254, { message: 'Please keep your email address to 254 characters.' });
    maxLength(path.message, this.messageMaxLength, { message: 'Please keep your message to 1500 characters.' });
    validate(path.name, ({ value }) => value() && !value().trim()
      ? requiredError({ message: 'Please add your name.' }) : null);
    validate(path.message, ({ value }) => value() && !value().trim()
      ? requiredError({ message: 'Add a message about what you have in mind.' }) : null);
  }, {
    submission: { action: async () => this.sendEmail() }
  });
  readonly draftStorageAvailable = signal(true);
  readonly submissionFeedback = signal<{ state: 'success' | 'error'; message: string } | null>(null);
  private readonly draftRestored = signal(false);

  constructor() {
    afterNextRender(() => {
      this.restoreDraft();
      this.draftRestored.set(true);
    });
    effect(() => {
      if (this.draftRestored()) this.saveDraft();
    });
  }

  private restoreDraft(): void {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey) ?? 'null');
      if (draft && typeof draft === 'object') {
        const model = { ...this.contactFormModel() };
        for (const field of ['name', 'email', 'message'] as const) {
          if (typeof draft[field] === 'string') {
            model[field] = draft[field].slice(0, field === 'message' ? this.messageMaxLength : field === 'name' ? 120 : 254);
          }
        }
        this.contactFormModel.set(model);
      }
    } catch {
      this.draftStorageAvailable.set(false);
    }
  }

  private saveDraft(): void {
    try {
      const model = this.contactFormModel();
      if (Object.values(model).some(value => value.length)) {
        sessionStorage.setItem(draftKey, JSON.stringify(model));
      } else {
        sessionStorage.removeItem(draftKey);
      }
    } catch {
      this.draftStorageAvailable.set(false);
    }
  }

  private async sendEmail(): Promise<void> {
    const model = this.contactFormModel();
    this.submissionFeedback.set(null);
    this.saveDraft();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: model.name.trim(),
          email: model.email.trim(),
          subject: 'Portfolio enquiry',
          message: model.message.trim()
        })
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? 'Your message could not be sent. Please try again or email me directly.');
      this.contactForm().reset({ name: '', email: '', message: '' });
      try { sessionStorage.removeItem(draftKey); } catch { /* Delivery succeeded even if local storage is unavailable. */ }
      this.submissionFeedback.set({ state: 'success', message: 'Thanks — your message has been sent.' });
    } catch {
      // Delivery errors stay separate from validation so valid input can be retried unchanged.
      this.submissionFeedback.set({ state: 'error', message: 'Your message could not be sent. Your text is still here. Please try again or email me directly.' });
    }
  }
}
