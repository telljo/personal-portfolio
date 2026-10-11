import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { contractEngagements, type ExperienceEntry } from '../../shared/portfolio-content';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  host: { class: 'experience page-canvas' }
})
export class ExperienceComponent {
  private startDate: Date = new Date('2017-11-01');
  readonly yearsOfExperience = signal(this.calculateDifference());
  readonly experienceEntries: readonly ExperienceEntry[] = [
    ...contractEngagements,
    {
      company: 'Banqer',
      title: 'Senior Software Developer',
      period: '2022 — 2025',
      summary:
        'Built and evolved full stack applications in the financial education space, contributing across delivery, architecture, and product quality while growing into a senior role.',
      bullets: [
        'Designed and developed full stack web applications across the full software development lifecycle.',
        'Progressed from intermediate to senior developer through consistent delivery and growing technical leadership.',
        'Worked across product design, coding, testing, and documentation in a high-impact product environment.'
      ],
      stack: ['Ruby on Rails', 'Angular', 'RxJS', 'AWS'],
      href: 'https://banqer.co/nz/',
      logo: 'assets/Images/banqer.webp',
      badge: {
        title: 'Full-time',
        colour: 'green'
      }
    },
    {
      company: 'DXC Technology',
      title: 'Professional Application Developer',
      period: '2019 — 2022',
      summary:
        'Started in the graduate program and grew into a more independent full stack engineering role focused on production-grade enterprise applications.',
      bullets: [
        'Selected for the graduate leadership program and progressed to intermediate full stack development responsibilities.',
        'Designed and delivered object-oriented applications through design, coding, testing, and documentation phases.',
        'Worked with enterprise integration patterns and production support in a large-scale delivery setting.'
      ],
      stack: ['C#', '.NET', 'SQL', 'Angular'],
      href: 'https://www.dxc.technology/about_us',
      logo: 'assets/Images/dxc-logo.webp',
      badge: {
        title: 'Full-time',
        colour: 'green'
      }
    },
    {
      company: 'ANZ',
      title: 'Global Mobility Services Engineer',
      period: '2018 — 2019',
      summary:
        'Supported a large-scale enterprise mobility environment across ANZ, working directly with operations, compliance, vendors, and end users.',
      bullets: [
        'Provided level 2 mobile support across a large user base throughout ANZ.',
        'Handled device acquisition, compliance management, and vendor coordination.',
        'Resolved ServiceNow tickets through direct technical support and operational follow-through.'
      ],
      stack: ['VMware', 'ServiceNow', 'Support'],
      href: 'https://www.anz.co.nz/about-us/our-company/anz-new-zealand/',
      logo: 'assets/Images/anz-logo.webp',
      badge: {
        title: 'Full-time',
        colour: 'green'
      }
    },
    {
      company: 'Go Cloud Systems',
      title: 'Junior .NET Software Developer',
      period: '2017 — 2018',
      summary:
        'Worked on a cloud-hosted full stack web application early in my career, building practical experience with application delivery end to end.',
      bullets: [
        'Designed and developed a full stack web application hosted on Azure App Services.',
        'Gained hands-on experience across backend, frontend, and database layers.',
        'Built production-ready software in a fast-moving delivery environment.'
      ],
      stack: ['C#', '.NET', 'SQL', 'Azure'],
      href: 'https://gocloud.systems/',
      logo: 'assets/Images/gocloud-logo.webp',
      badge: {
        title: 'Full-time',
        colour: 'green'
      }
    },
    {
      company: 'University of Otago',
      title: 'BSc in Computer Science',
      period: '2015 — 2017',
      summary:
        'Completed a computer science degree that grounded my engineering practice in software fundamentals and broad technical curiosity.',
      bullets: [
        'Studied topics including web development, networking, AI, database theory, and object-oriented programming.',
        'Built the technical foundation that shaped my interest in full stack development.',
        'Graduated in November 2017 with a strong practical and theoretical base.'
      ],
      stack: ['Computer Science', 'Web Development', 'AI', 'Databases'],
      href: 'https://www.otago.ac.nz/',
      logo: 'assets/Images/otago-logo.webp',
      badge: {
        title: 'University',
        colour: 'amber'
      }
    }
  ];
  readonly recentExperience = this.experienceEntries.slice(0, 3);
  readonly earlierExperience = this.experienceEntries.slice(3);

  calculateDifference(): string {
    const today = new Date();
    const calcDate = this.startDate;
    let difference = today.getFullYear() - calcDate.getFullYear();
    const m = today.getMonth() - calcDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < calcDate.getDate())) {
      difference--;
    }
    return difference.toString();
  }
}
