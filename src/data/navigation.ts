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
    label: 'Legislative',
    href: '#',
    children: [
      {
        label: 'Tax Ordinances',
        href: '#',
        description: 'Business taxes, fees, and charges collected by the city.',
        badge: 'Soon',
      },
      {
        label: 'Regulatory Ordinances',
        href: '#',
        description:
          'Rules on traffic, public order, health, safety, and the environment.',
        badge: 'Soon',
      },
      {
        label: 'Appropriation Ordinances',
        href: '#',
        description: "The city's annual budget and spending authorizations.",
        badge: 'Soon',
      },
    ],
  },
  {
    label: 'Tourism',
    href: '/tourism',
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
        { label: 'Join the Movement', href: '/join-us' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Terms of Use', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        { label: 'Service Directory', href: '/services' },
        { label: 'Websites', href: '/services/websites' },
        { label: 'Hotlines', href: '/hotlines' },
        { label: 'Holidays', href: '/holidays' },
      ],
    },
    {
      title: 'External Resources',
      links: [
        {
          label: 'Official Maasin City Website',
          href: 'https://www.maasincity.gov.ph/',
        },
        {
          label: 'Province of Southern Leyte',
          href: 'https://southernleyte.gov.ph/',
        },
        {
          label: 'Flood Control Map',
          href: '/statistics/flood-control-projects/map',
        },
        {
          label: 'Freedom of Information (FOI)',
          href: 'https://www.foi.gov.ph/',
        },
        { label: 'Open Data PH', href: 'https://data.gov.ph/' },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph/',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: '/redirect?to=facebook' },
    { label: 'Discord', href: '/redirect?to=discord' },
    { label: 'GitHub', href: '/redirect?to=github' },
    // { label: 'Instagram', href: '/redirect?to=instagram' },
    // { label: 'YouTube', href: '/redirect?to=youtube' },
  ],
};
