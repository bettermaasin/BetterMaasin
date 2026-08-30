import { NavigationItem } from '../types';
import serviceCategories from './service_categories.json';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: (serviceCategories.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services?category=${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
  },
  {
    label: 'Statistics',
    href: '/statistics',
    children: [
      { label: 'General Overview', href: '/statistics/overview' },
      {
        label: 'Flood Control Projects',
        href: '/statistics/flood-control-projects',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        { label: 'About BetterGov.ph', href: 'https://about.bettergov.ph' },
        { label: 'Documentation', href: 'https://docs.bettergov.ph/' },
        { label: 'Project Ideas', href: '/ideas' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Terms of Use', href: '/terms-of-service' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Service Directory', href: '/services' },
        { label: 'Websites', href: '/services/websites' },
        { label: 'Forex', href: '/data/forex' },
        { label: 'Weather', href: '/data/weather' },
        { label: 'Hotlines', href: '/philippines/hotlines' },
        { label: 'Holidays', href: '/philippines/holidays' },
        { label: 'Flood Control Projects', href: '/flood-control-projects' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Official Gov.ph', href: 'https://www.gov.ph' },
        { label: 'Open Data', href: 'https://data.gov.ph' },
        { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
        {
          label: 'Contact Center',
          href: 'https://contactcenterngbayan.gov.ph',
        },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/bettergovph' },
    { label: 'Discord', href: '/discord' },
    // { label: 'Instagram', href: 'https://instagram.com/govph' },
    // { label: 'YouTube', href: 'https://youtube.com/govph' },
  ],
};
