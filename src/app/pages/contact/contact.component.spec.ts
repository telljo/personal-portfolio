/// <reference types="jasmine" />
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
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
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => sessionStorage.removeItem(draftKey));

  async function fillForm(message = ' A project to discuss. '): Promise<NgForm> {
    for (const [name, value] of Object.entries({ name: ' Josh ', email: 'josh@example.com', message })) {
      const input = fixture.nativeElement.querySelector(`[name="${name}"]`) as HTMLInputElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
  }

  it('shows field guidance for an empty enquiry without sending it', async () => {
    const send = spyOn(globalThis, 'fetch');
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    await fixture.componentInstance.sendEmail(form);
    fixture.detectChanges();
    expect(send).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelectorAll('.field-error').length).toBe(3);
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse();
  });

  it('rejects a whitespace-only message', async () => {
    const send = spyOn(globalThis, 'fetch');
    const form = await fillForm('   ');
    await fixture.componentInstance.sendEmail(form);
    expect(send).not.toHaveBeenCalled();
    expect(form.controls['message'].hasError('required')).toBeTrue();
  });

  it('restores a draft after leaving and returning to the form', async () => {
    await fillForm();
    fixture.destroy();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.contactFormModel.message).toBe(' A project to discuss. ');
    expect(fixture.nativeElement.querySelector('[name="email"]').value).toBe('josh@example.com');
  });

  it('preserves the draft and offers direct email when delivery fails', async () => {
    spyOn(globalThis, 'fetch').and.resolveTo(new Response('{}', { status: 502 }));
    const form = await fillForm();
    await fixture.componentInstance.sendEmail(form);
    fixture.detectChanges();
    expect(fixture.componentInstance.contactFormModel.message).toBe(' A project to discuss. ');
    expect(sessionStorage.getItem(draftKey)).toContain('A project to discuss.');
    expect(fixture.nativeElement.querySelector('.contact-form__feedback a').href).toBe('mailto:jtell1997@gmail.com');
    expect(fixture.componentInstance.isSubmitting()).toBeFalse();
  });

  it('supplies the backend subject and clears the draft only after success', async () => {
    const send = spyOn(globalThis, 'fetch').and.resolveTo(new Response('{"ok":true}', { status: 200 }));
    const form = await fillForm();
    await fixture.componentInstance.sendEmail(form);
    await fixture.whenStable();
    const payload = JSON.parse(send.calls.mostRecent().args[1]?.body as string);
    expect(payload).toEqual({ name: 'Josh', email: 'josh@example.com', subject: 'Portfolio enquiry', message: 'A project to discuss.' });
    expect(fixture.componentInstance.submissionState()).toBe('success');
    expect(fixture.componentInstance.contactFormModel.message).toBe('');
    expect(sessionStorage.getItem(draftKey)).toBeNull();
  });
});
