import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InViewDirective } from '../../shared/directives/in-view.directive';

type ExperienceEntry = {
  company: string;
  title: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  href: string;
  logo: string;
  highlight?: boolean;
};

type EcosystemHighlight = {
  icon: string;
  title: string;
  summary: string;
  footnote?: string;
  wide?: boolean;
};

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [InViewDirective, RouterLink],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  host: { class: 'experience' }
})
export class ExperienceComponent {
  private birthdate: Date = new Date('1997-01-30');
  private startDate: Date = new Date('2017-11-01');
  readonly yearsOfExperience = this.calculateDifference('experience');
  readonly experienceEntries: readonly ExperienceEntry[] = [
    {
      company: 'Banqer',
      title: 'Senior Software Developer',
      period: '2022 — 2025',
      summary:
        'Built and evolved full-stack applications in the education space, contributing across delivery, architecture, and product quality while growing into a senior role.',
      bullets: [
        'Designed and developed full-stack web applications across the full software development lifecycle.',
        'Progressed from intermediate to senior developer through consistent delivery and growing technical leadership.',
        'Worked across product design, coding, testing, and documentation in a high-impact product environment.'
      ],
      stack: ['Ruby on Rails', 'Angular', 'RxJS', 'HTML', 'SCSS', 'AWS'],
      href: 'https://banqer.co/nz/',
      logo: 'assets/Images/banqer-logo.svg',
      highlight: true
    },
    {
      company: 'DXC Technology',
      title: 'Professional Application Developer',
      period: '2019 — 2022',
      summary:
        'Started in the graduate program and grew into a more independent full-stack engineering role focused on production-grade enterprise applications.',
      bullets: [
        'Selected for the graduate leadership program and progressed to intermediate full-stack development responsibilities.',
        'Designed and delivered object-oriented applications through design, coding, testing, and documentation phases.',
        'Worked with enterprise integration patterns and production support in a large-scale delivery setting.'
      ],
      stack: ['C#', '.NET', 'SQL', 'Angular', 'IIS', 'Web Services'],
      href: 'https://www.dxc.technology/about_us',
      logo: 'assets/Images/dxc-logo.png'
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
      stack: ['VMware AirWatch', 'ServiceNow', 'Compliance', 'Support'],
      href: 'https://www.anz.co.nz/about-us/our-company/anz-new-zealand/',
      logo: 'assets/Images/anz-logo.png'
    },
    {
      company: 'Go Cloud Systems',
      title: 'Junior .NET Software Developer',
      period: '2017 — 2018',
      summary:
        'Worked on a cloud-hosted full-stack web application early in my career, building practical experience with application delivery end to end.',
      bullets: [
        'Designed and developed a full-stack web application hosted on Azure App Services.',
        'Gained hands-on experience across backend, frontend, and database layers.',
        'Built production-ready software in a fast-moving delivery environment.'
      ],
      stack: ['C#', '.NET', 'SQL', 'Azure', 'HTML5'],
      href: 'https://gocloud.systems/',
      logo: 'assets/Images/go-cloud-logo.png'
    },
    {
      company: 'University of Otago',
      title: 'BSc in Computer Science',
      period: '2015 — 2017',
      summary:
        'Completed a computer science degree that grounded my engineering practice in software fundamentals and broad technical curiosity.',
      bullets: [
        'Studied topics including web development, networking, AI, database theory, and object-oriented programming.',
        'Built the technical foundation that shaped my interest in full-stack development.',
        'Graduated in November 2017 with a strong practical and theoretical base.'
      ],
      stack: ['Computer Science', 'Web Development', 'AI', 'Databases'],
      href: 'https://www.otago.ac.nz/',
      logo: 'assets/Images/otago-logo.png'
    }
  ];
  readonly ecosystemHighlights: readonly EcosystemHighlight[] = [
    {
      icon: 'fa-cloud',
      title: 'Infrastructure',
      summary:
        'Orchestrating delivery environments, release flows, and high-availability systems with production pragmatism.',
      footnote: 'AWS // Azure // CI-CD // Cloud delivery',
      wide: true
    },
    {
      icon: 'fa-database',
      title: 'Persistence',
      summary:
        'Working across SQL-backed systems, application data modeling, and the trade-offs of long-lived product data.'
    },
    {
      icon: 'fa-code',
      title: 'Languages',
      summary:
        'A career shaped mainly by Ruby on Rails, C#, TypeScript, and Angular across product and enterprise domains.'
    }
  ];

  calculateDifference(time: string): string {
    const today = new Date();
    let calcDate = new Date();
    if (time === 'age') calcDate = this.birthdate;
    if (time === 'experience') calcDate = this.startDate;
    let difference = today.getFullYear() - calcDate.getFullYear();
    const m = today.getMonth() - calcDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < calcDate.getDate())) {
      difference--;
    }
    return difference.toString();
  }
}
