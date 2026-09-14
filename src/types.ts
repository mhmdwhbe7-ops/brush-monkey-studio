export type ProjectCategory = 'all' | 'social-media' | 'startup-kit' | 'print-design';

export type CardColorTheme = 'tangerine' | 'cream' | 'forest';

export interface ProjectImage {
  url: string;
  caption: string;
  captionAr?: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  category: 'social-media' | 'startup-kit' | 'print-design';
  categoryLabel: string;
  categoryLabelAr?: string;
  colorTheme: CardColorTheme;
  shortDesc: string;
  shortDescAr?: string;
  fullDesc: string;
  fullDescAr?: string;
  deliverables: string[];
  deliverablesAr?: string[];
  year: string;
  client: string;
  clientAr?: string;
  palette: { name: string; hex: string; isDarkText?: boolean }[];
  highlightMetric?: string;
  highlightMetricAr?: string;
  images?: ProjectImage[];
  quote?: {
    text: string;
    textAr?: string;
    author: string;
    authorAr?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  colorTheme: CardColorTheme;
  description: string;
  descriptionAr?: string;
  deliverables: string[];
  deliverablesAr?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  quoteAr?: string;
  client: string;
  clientAr?: string;
  role: string;
  roleAr?: string;
  company: string;
  companyAr?: string;
  tag: string;
  tagAr?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  titleAr?: string;
  tagline: string;
  taglineAr?: string;
  description: string;
  descriptionAr?: string;
  deliverable: string;
  deliverableAr?: string;
  emoji: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
}
