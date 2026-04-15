import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InViewDirective } from '../../shared/directives/in-view.directive';

type ProjectEntry = {
  title: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  href: string;
  image: string;
  highlight?: boolean;
};

type ProjectMode = {
  icon: string;
  title: string;
  summary: string;
  footnote?: string;
  wide?: boolean;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective, RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  host: { class: 'projects' }
})
export class ProjectsComponent {
  readonly projects: readonly ProjectEntry[] = [
    {
      title: 'Footprints',
      period: '2024 — Present',
      summary:
        'A travel journaling product I built in preparation for a career break, designed to help people document trips, places, and stories in a more personal way.',
      bullets: [
        'Built a full Rails application for capturing and sharing travel experiences.',
        'Designed profile, trip, and storytelling flows around real personal use cases.',
        'Used the project as a focused product exercise in speed, usefulness, and polish.'
      ],
      stack: ['Ruby on Rails', 'Hotwire', 'HTML', 'CSS'],
      href: 'https://footprints.fly.dev/trips/1',
      image: 'assets/Images/footprints.png',
      highlight: true
    },
    {
      title: 'Bookshelf',
      period: '2023 — Present',
      summary:
        'A Goodreads-inspired side project built while exploring Hotwire, focused on streamlined book cataloguing, reviewing, and discovery.',
      bullets: [
        'Created a practical learning project tailored to my own reading workflow.',
        'Explored Hotwire patterns through a complete end-to-end application.',
        'Focused on simplicity, responsiveness, and product clarity over feature bloat.'
      ],
      stack: ['Ruby on Rails', 'Hotwire', 'HTML', 'CSS'],
      href: 'https://old-mountain-8141.fly.dev/books',
      image: 'assets/Images/bookshelf.png'
    },
    {
      title: 'Personal Portfolio',
      period: '2020 — Present',
      summary:
        'My long-running portfolio project, originally built to deepen my Angular knowledge and now used as a living space for refining visual systems and front-end craft.',
      bullets: [
        'Designed and developed the site in Angular using HTML and SCSS.',
        'Used the project to translate side-project learning into a polished public presence.',
        'Continues to evolve as a space for experimenting with layout, storytelling, and interaction design.'
      ],
      stack: ['Angular', 'HTML', 'SCSS', 'Git'],
      href: 'https://www.joshtell.dev',
      image: 'assets/Images/portfolio.png'
    },
    {
      title: 'Otago University Squash Club',
      period: '2018 — 2019',
      summary:
        'An early web contribution where I maintained and updated a club site, giving me hands-on experience shaping content and structure in a real community context.',
      bullets: [
        'Maintained and updated the club site while studying as an undergraduate.',
        'Learned to work within an existing CMS and improve content quality over time.',
        'Built confidence in web publishing through practical, user-facing updates.'
      ],
      stack: ['CMS', 'HTML', 'CSS', 'Content Design'],
      href: 'https://www.unisquash.net/',
      image: 'assets/Images/squash.png'
    }
  ];
  readonly projectModes: readonly ProjectMode[] = [
    {
      icon: 'fa-compass',
      title: 'Product Thinking',
      summary:
        'I tend to build from a real user need outward, aiming for products that feel coherent before they feel complex.',
      footnote: 'Usefulness // Simplicity // Momentum',
      wide: true
    },
    {
      icon: 'fa-code-fork',
      title: 'Engineering Range',
      summary:
        'Side projects often double as R&D spaces where I can test frameworks, patterns, and delivery approaches.'
    },
    {
      icon: 'fa-desktop',
      title: 'Interface Craft',
      summary:
        'I care about visual systems, readable interactions, and front-ends that feel intentional rather than assembled.'
    }
  ];
}
