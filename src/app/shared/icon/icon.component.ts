import { Component, input } from '@angular/core';

export type IconName =
  | 'arrow-right'
  | 'bars'
  | 'check-circle'
  | 'clone'
  | 'cloud'
  | 'code'
  | 'code-fork'
  | 'compass'
  | 'database'
  | 'external-link'
  | 'desktop'
  | 'github'
  | 'linkedin'
  | 'map-marker'
  | 'terminal'
  | 'times'
  | 'whatsapp';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    @switch (name()) {
      @case ('arrow-right') {
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14"></path>
          <path d="m13 5 7 7-7 7"></path>
        </svg>
      }
      @case ('bars') {
        <svg viewBox="0 0 24 24">
          <path d="M4 7h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 17h16"></path>
        </svg>
      }
      @case ('check-circle') {
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="m8.5 12 2.3 2.3 4.7-4.8"></path>
        </svg>
      }
      @case ('clone') {
        <svg viewBox="0 0 24 24">
          <rect x="9" y="9" width="10" height="10" rx="2"></rect>
          <path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
        </svg>
      }
      @case ('cloud') {
        <svg viewBox="0 0 24 24">
          <path d="M7 18a4 4 0 1 1 .8-7.9A5.5 5.5 0 0 1 18 11a3.5 3.5 0 1 1 0 7Z"></path>
        </svg>
      }
      @case ('code') {
        <svg viewBox="0 0 24 24">
          <path d="m8 8-4 4 4 4"></path>
          <path d="m16 8 4 4-4 4"></path>
          <path d="m14 4-4 16"></path>
        </svg>
      }
      @case ('code-fork') {
        <svg viewBox="0 0 24 24">
          <circle cx="6" cy="5" r="2"></circle>
          <circle cx="18" cy="5" r="2"></circle>
          <circle cx="12" cy="19" r="2"></circle>
          <path d="M8 5h5a3 3 0 0 1 3 3v5"></path>
          <path d="M8 5v3a4 4 0 0 0 4 4"></path>
          <path d="M12 17v-5"></path>
        </svg>
      }
      @case ('compass') {
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="m15.5 8.5-2.2 5.2-5.1 2.3 2.2-5.2z"></path>
        </svg>
      }
      @case ('database') {
        <svg viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="7" ry="3"></ellipse>
          <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path>
          <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path>
        </svg>
      }
      @case ('desktop') {
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="12" rx="2"></rect>
          <path d="M8 20h8"></path>
          <path d="M12 16v4"></path>
        </svg>
      }
      @case ('external-link') {
        <svg viewBox="0 0 24 24">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <path d="M15 3h6v6"></path>
          <path d="M10 14L21 3"></path>
        </svg>
      }
      @case ('github') {
        <svg viewBox="0 0 24 24">
          <path d="M9 19c-4.5 1.4-4.5-2.4-6.3-2.9"></path>
          <path d="M15 21v-3.8a3.4 3.4 0 0 0-.9-2.5c3.2-.4 6.6-1.6 6.6-7A5.4 5.4 0 0 0 19.2 4a5 5 0 0 0-.1-3.4s-1.2-.4-4 1.5a13.5 13.5 0 0 0-6.2 0C6.1.2 4.9.6 4.9.6A5 5 0 0 0 4.8 4 5.4 5.4 0 0 0 3.3 7.7c0 5.4 3.4 6.6 6.6 7a3.4 3.4 0 0 0-.9 2.5V21"></path>
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <circle cx="8" cy="8" r="1"></circle>
          <path d="M7 11v6"></path>
          <path d="M11 17v-6"></path>
          <path d="M11 13.7a2.3 2.3 0 0 1 4.6 0V17"></path>
        </svg>
      }
      @case ('map-marker') {
        <svg viewBox="0 0 24 24">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"></path>
          <circle cx="12" cy="10" r="2.5"></circle>
        </svg>
      }
      @case ('terminal') {
        <svg viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="m8 9-2 2 2 2"></path>
          <path d="M11 15h5"></path>
        </svg>
      }
      @case ('times') {
        <svg viewBox="0 0 24 24">
          <path d="m6 6 12 12"></path>
          <path d="M18 6 6 18"></path>
        </svg>
      }
      @case ('whatsapp') {
        <svg viewBox="0 0 24 24">
          <path d="M20 11.5A8.5 8.5 0 0 1 7.7 19L4 20l1.1-3.4A8.5 8.5 0 1 1 20 11.5Z"></path>
          <path d="M9.2 8.9c.2-.5.4-.6.7-.6h.5c.2 0 .5 0 .6.4l.8 2c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .6.3.5.9 1.2 1.7 1.8.9.8 1.7 1.1 2.1 1.2.2.1.4 0 .6-.1l.7-.8c.2-.2.4-.2.7-.1l1.9.9c.3.2.5.3.5.5 0 .6-.3 1.1-.8 1.4-.4.3-.9.4-1.4.4-.8 0-1.8-.3-3.1-.9a9.4 9.4 0 0 1-4.7-4.8c-.5-1-.7-1.8-.7-2.5 0-.9.3-1.6.9-2.1"></path>
        </svg>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        vertical-align: middle;
      }

      svg {
        width: 1em;
        height: 1em;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.85;
      }
    `
  ],
  host: {
    '[attr.aria-hidden]': 'label() ? null : "true"',
    '[attr.aria-label]': 'label()',
    '[attr.role]': 'label() ? "img" : null'
  }
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly label = input<string | null>(null);
}
