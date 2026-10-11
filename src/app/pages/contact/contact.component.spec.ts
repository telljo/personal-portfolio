import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { submit } from '@angular/forms/signals';
import { ContactComponent } from './contact.component';

describe('Contact enquiry', () => {
  let fixture: ComponentFixture<ContactComponent>;
  const draftKey = 'josh-tell-contact-draft';

  beforeEach(async () => {
    sessionStorage.removeItem(draftKey);
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    sessionStorage.removeItem(draftKey);
    vi.restoreAllMocks();
  });

  async function fillForm(message = ' A project to discuss. '): Promise<void> {
    for (const [name, value] of Object.entries({ name: ' Josh ', email: 'josh@example.com', message })) {
      const input = fixture.nativeElement.querySelector(`#${name}`) as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
  }

  it('shows field guidance for an empty enquiry without sending it', async () => {
    const send = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected contact submission'));
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(send).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelectorAll('.field-error').length).toBe(3);
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(false);
  });

  it('rejects a whitespace-only message', async () => {
    const send = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected contact submission'));
    await fillForm('   ');
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(send).not.toHaveBeenCalled();
    expect(fixture.componentInstance.contactForm.message().errors().some(error => error.kind === 'required')).toBe(true);
    expect(fixture.nativeElement.querySelector('#message-error')).not.toBeNull();
  });

  it('restores a draft after leaving and returning to the form', async () => {
    await fillForm();
    fixture.destroy();
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance.contactFormModel().message).toBe(' A project to discuss. ');
    expect(fixture.nativeElement.querySelector('#email').value).toBe('josh@example.com');
  });

  it('preserves the draft and offers direct email when delivery fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 502 }));
    await fillForm();
    await submit(fixture.componentInstance.contactForm);
    await fixture.whenStable();
    expect(fixture.componentInstance.contactFormModel().message).toBe(' A project to discuss. ');
    expect(sessionStorage.getItem(draftKey)).toContain('A project to discuss.');
    expect(fixture.nativeElement.querySelector('.contact-form__feedback a').href).toBe('mailto:jtell1997@gmail.com');
    expect(fixture.componentInstance.contactForm().submitting()).toBe(false);
  });

  it('supplies the backend subject and clears the draft only after success', async () => {
    let resolveResponse!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { resolveResponse = resolve; });
    const send = vi.spyOn(globalThis, 'fetch').mockReturnValue(response);
    await fillForm();
    const submission = submit(fixture.componentInstance.contactForm);
    await fixture.whenStable();
    const submitButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.textContent).toContain('Sending');
    expect(fixture.nativeElement.querySelector('.contact-form__count').textContent).toContain(' A project to discuss. '.length.toString());
    resolveResponse(new Response('{"ok":true}', { status: 200 }));
    await submission;
    await fixture.whenStable();
    const payload = JSON.parse(send.mock.calls.at(-1)?.[1]?.body as string);
    expect(payload).toEqual({ name: 'Josh', email: 'josh@example.com', subject: 'Portfolio enquiry', message: 'A project to discuss.' });
    expect(fixture.componentInstance.submissionFeedback()?.state).toBe('success');
    expect(fixture.componentInstance.contactFormModel().message).toBe('');
    expect(sessionStorage.getItem(draftKey)).toBeNull();
    expect(submitButton.disabled).toBe(false);
    expect(fixture.nativeElement.querySelector('#message').value).toBe('');
    expect(fixture.componentInstance.contactForm().touched()).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('.field-error')).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.contact-form__feedback').textContent).toContain('your message has been sent');
  });

  it('shows validation after blur and clears it as the field is corrected', async () => {
    const input = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    input.value = 'not-an-email';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#email-error')).toBeNull();
    input.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('email-error');
    input.value = 'josh@example.com';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(input.hasAttribute('aria-describedby')).toBe(false);
    expect(fixture.nativeElement.querySelector('#email-error')).toBeNull();
  });

  it.each([
    ['name', '   ', 'Please add your name.'],
    ['email', 'not-an-email', 'Enter a valid email address so I can reply.'],
    ['message', 'x'.repeat(1501), 'Please keep your message to 1500 characters.']
  ])('blocks submission when %s is invalid', async (field, value, guidance) => {
    const send = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected contact submission'));
    await fillForm();
    const input = fixture.nativeElement.querySelector(`#${field}`) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    await submit(fixture.componentInstance.contactForm);
    await fixture.whenStable();
    expect(send).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector(`#${field}-error`).textContent).toContain(guidance);
  });

  it('prevents concurrent requests and allows retrying unchanged input after a delivery failure', async () => {
    let resolveResponse!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { resolveResponse = resolve; });
    const send = vi.spyOn(globalThis, 'fetch').mockReturnValueOnce(response)
      .mockResolvedValueOnce(new Response('{"ok":true}', { status: 200 }));
    await fillForm();
    const first = submit(fixture.componentInstance.contactForm);
    expect(await submit(fixture.componentInstance.contactForm)).toBe(false);
    expect(send).toHaveBeenCalledTimes(1);
    resolveResponse(new Response('{}', { status: 502 }));
    await first;
    await fixture.whenStable();
    expect(fixture.componentInstance.submissionFeedback()?.state).toBe('error');
    await submit(fixture.componentInstance.contactForm);
    await fixture.whenStable();
    expect(send).toHaveBeenCalledTimes(2);
    expect(fixture.componentInstance.submissionFeedback()?.state).toBe('success');
    expect(sessionStorage.getItem(draftKey)).toBeNull();
  });

  it('handles unavailable draft storage without preventing delivery', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    await fillForm();
    expect(fixture.componentInstance.draftStorageAvailable()).toBe(false);
    await submit(fixture.componentInstance.contactForm);
    await fixture.whenStable();
    expect(fixture.componentInstance.submissionFeedback()?.state).toBe('success');
  });

  it('ignores malformed drafts and limits restored field lengths', async () => {
    fixture.destroy();
    sessionStorage.setItem(draftKey, '{invalid');
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#message').value).toBe('');
    fixture.destroy();
    sessionStorage.setItem(draftKey, JSON.stringify({ name: 'x'.repeat(130), email: 42, message: 'y'.repeat(1600) }));
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance.contactFormModel()).toEqual({ name: 'x'.repeat(120), email: '', message: 'y'.repeat(1500) });
  });
});
