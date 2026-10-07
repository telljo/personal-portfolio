import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { contractEngagements } from '../../shared/portfolio-content';

type ProjectEntry = {
  title: string;
  period: string;
  summary: string;
  stack: string[];
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  host: { class: 'projects page-canvas' }
})
export class ProjectsComponent {
  readonly clientWork = contractEngagements;
  readonly projects: readonly ProjectEntry[] = [
    {
      title: 'Footprints',
      period: '2024 — Present',
      summary: 'I built Footprints before a career break to keep a record of trips, places, and stories. It is a Rails application for capturing and sharing travel experiences.',
      stack: ['Ruby on Rails', 'Hotwire'],
      href: 'https://footprints.fly.dev/trips/1',
      image: 'assets/Images/footprints.webp',
      imageWidth: 2906,
      imageHeight: 1412,
      imageAlt: 'Screenshot of the Footprints travel journaling application'
    },
    {
      title: 'Bookshelf',
      period: '2023 — Present',
      summary: 'A catalogue of books I have read and enjoyed. I built it to explore Hotwire, with book cataloguing, reviews, and discovery inspired by Goodreads.',
      stack: ['Ruby on Rails', 'Hotwire'],
      href: 'https://bookshelf.joshtell.dev/',
      image: 'assets/Images/bookshelf.webp',
      imageWidth: 700,
      imageHeight: 285,
      imageAlt: 'Screenshot of the Bookshelf book cataloguing application'
    },
    {
      title: 'Personal Portfolio',
      period: '2020 — Present',
      summary: 'This site started as a way to learn Angular. It has grown alongside my work, and remains a place to experiment with layout, writing, and interaction design.',
      stack: ['Angular', 'TypeScript', 'SCSS'],
      href: 'https://github.com/telljo/personal-portfolio',
      image: 'assets/Images/portfolio.webp',
      imageWidth: 700,
      imageHeight: 316,
      imageAlt: 'Screenshot of an earlier version of Josh Tell’s portfolio'
    },
    {
      title: 'Otago University Squash Club',
      period: '2018 — 2019',
      summary: 'An early web contribution: maintaining and updating a club website while studying, working within an existing CMS and improving its content and structure.',
      stack: ['CMS', 'HTML', 'CSS'],
      href: 'https://www.unisquash.net/',
      image: 'assets/Images/squash.webp',
      imageWidth: 700,
      imageHeight: 350,
      imageAlt: 'Screenshot of the Otago University Squash Club website'
    }
  ];
}
