import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient'; // Client component


export const metadata: Metadata = {
  title: 'Careers | Red Shadow Designs',
  description:
    'Join the Red Shadow Designs team — a premium CAD modeling and 3D rendering studio in Islamabad, Pakistan. Explore open roles in engineering, design, and visualization. Apply at careers@redshadowdesigns.com.',
  keywords: [
    'careers Red Shadow Designs',
    'jobs CAD modeling Pakistan',
    '3D rendering jobs Islamabad',
    'industrial design careers',
    'product design jobs Pakistan',
    'SolidWorks engineer jobs',
    'Blender artist jobs',
    'Red Shadow Designs hiring',
  ],
  authors: [{ name: 'Red Shadow Designs', url: 'https://www.redshadowdesigns.com' }],
  openGraph: {
    title: 'Careers at Red Shadow Designs | Join Our Studio',
    description:
      'We are looking for talented CAD engineers, 3D artists, and industrial designers to join our growing studio in Islamabad. Apply now.',
    url: 'https://www.redshadowdesigns.com/careers',
    siteName: 'Red Shadow Designs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Red Shadow Designs | Join Our Studio',
    description:
      'We are looking for talented CAD engineers, 3D artists, and industrial designers to join our growing studio in Islamabad. Apply now.',
    creator: '@redshadowdesigns',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/careers' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.redshadowdesigns.com/#organization',
      name: 'Red Shadow Designs',
      url: 'https://www.redshadowdesigns.com',
      logo: 'https://www.redshadowdesigns.com/assets/logo.webp',
    },
    {
      '@type': 'WebPage',
      url: 'https://www.redshadowdesigns.com/careers',
      name: 'Careers at Red Shadow Designs',
      description: 'Explore career opportunities at Red Shadow Designs — a premium CAD and 3D rendering studio in Islamabad, Pakistan.',
      isPartOf: { '@id': 'https://www.redshadowdesigns.com/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.redshadowdesigns.com' },
        { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://www.redshadowdesigns.com/careers' },
      ],
    },
  ],
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersPageClient />
    </>
  );
}
