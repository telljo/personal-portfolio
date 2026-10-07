export type ExperienceEntry = {
  company: string;
  focus?: string;
  title: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  href: string;
  logo: string;
  highlight?: boolean;
  badge?: ExperienceBadge;
};

type ExperienceBadge = {
  title: string;
  colour: 'teal' | 'green' | 'amber';
};


export const contractEngagements: readonly ExperienceEntry[] = [
    {
      company: 'IFSO',
      focus: 'Complaint intake & case management',
      title: 'Software Development Services',
      period: '2026 — Present',
      summary:
        'I built a complaint intake experience for the Insurance & Financial Services Ombudsman Scheme, alongside Salesforce and AI-enabled case-management workflows.',
      bullets: [
        'Built a React and Craft CMS complaint intake experience integrated with Salesforce through AWS Lambda, including conditional workflows and document uploads.',
        'Developed Salesforce and Agentforce solutions for generating draft case notes from case records and supporting documents.',
        'Provided ongoing technical consulting across solution design, requirements discovery, deployment, and stakeholder testing.',
      ],
      stack: [
        'React',
        'TypeScript',
        'Craft CMS',
        'AWS',
        'Salesforce',
        'Agentforce',
        'Consulting',
      ],
      href: 'https://www.ifso.nz/',
      logo: 'assets/Images/ifso.webp',
      highlight: true,
      badge: {
        title: 'Contract',
        colour: 'teal',
      },
    },
    {
      company: 'Banqer',
      focus: 'Financial education software',
      title: 'Software Development Services',
      period: '2025 — Present',
      summary:
        'I work with Banqer as a contractor, providing software development consulting and building features across its Rails platform.',
      bullets: [
        'Delivered targeted feature development and implementation support as a contractor.',
        'Developed specialized platform features across the Rails application stack.',
      ],
      stack: ['Ruby on Rails', 'Angular', 'Consulting'],
      href: 'https://banqer.co/nz/',
      logo: 'assets/Images/banqer.webp',
      badge: {
        title: 'Contract',
        colour: 'teal'
      }
    }
];
