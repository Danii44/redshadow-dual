import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Red Shadow Designs',
  description:
    'Learn about Red Shadow Designs — a premium CAD modeling and 3D rendering studio founded by Daniyal Ahmad. We combine mechanical engineering precision with cinematic artistry.',
  keywords: [
    'About Red Shadow Designs',
    'CAD modeling Islamabad',
    '3D rendering studio Pakistan',
    'industrial design portfolio',
    'mechanical engineering studio',
  ],
  authors: [{ name: 'Red Shadow Designs', url: 'https://www.redshadowdesigns.com' }],
  openGraph: {
    title: 'About Red Shadow Designs | Top-Rated Engineering Studio',
    description:
      'Meet the team behind Red Shadow Designs. Founded by Daniyal Ahmad, a top-rated Fiverr engineer specialising in CAD modeling, 3D rendering, and industrial product design.',
    url: 'https://www.redshadowdesigns.com/about',
    siteName: 'Red Shadow Designs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Red Shadow Designs | Top-Rated Engineering Studio',
    description:
      'Meet the team behind Red Shadow Designs — a top-rated Fiverr engineer delivering CAD modeling, 3D rendering, and product design services from Islamabad.',
    creator: '@redshadowdesigns',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/about' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.redshadowdesigns.com/#organization',
      name: 'Red Shadow Designs',
      url: 'https://www.redshadowdesigns.com',
      logo: 'https://www.redshadowdesigns.com/assets/images/backgrounds/hero-bg.jpg',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+92-333-891-7021',
          contactType: 'customer support',
          areaServed: 'Worldwide',
          availableLanguage: 'English',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
      sameAs: ['https://www.fiverr.com/users/daniyalahmad7'],
    },
    {
      '@type': 'Person',
      name: 'Daniyal Ahmad',
      jobTitle: 'Founder & Lead Designer',
      worksFor: { '@id': 'https://www.redshadowdesigns.com/#organization' },
      url: 'https://www.redshadowdesigns.com/about',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Red Shadow Designs offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs offers CAD modeling, 3D rendering, industrial product design, mechanical engineering, and manufacturing-ready design services.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Red Shadow Designs located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs is based in Islamabad, Pakistan, and serves clients worldwide.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.redshadowdesigns.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://www.redshadowdesigns.com/about',
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AboutPageClient />
    </>
  );
}
