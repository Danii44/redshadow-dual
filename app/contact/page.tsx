import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Red Shadow Designs',
  description:
    'Get in touch with Red Shadow Designs — CAD modeling and 3D rendering studio in Islamabad, Pakistan. Email hello@redshadowdesigns.com or call +92 333 891 7021.',
  keywords: [
    'Contact Red Shadow Designs',
    'CAD modeling inquiries',
    '3D rendering quote',
    'Islamabad design studio',
    'product design consultation',
  ],
  authors: [{ name: 'Red Shadow Designs', url: 'https://www.redshadowdesigns.com' }],
  openGraph: {
    title: 'Contact Red Shadow Designs | Islamabad, Pakistan',
    description:
      'Reach out for CAD modeling, 3D rendering, or product design inquiries. Based in Islamabad, Pakistan, with fast response for local and international clients.',
    url: 'https://www.redshadowdesigns.com/contact',
    siteName: 'Red Shadow Designs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Red Shadow Designs | Islamabad, Pakistan',
    description:
      'Reach out for CAD modeling, 3D rendering, or product design inquiries. Based in Islamabad, Pakistan, with fast response for local and international clients.',
    creator: '@redshadowdesigns',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/contact' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
    '@type': 'Organization',
    '@id': 'https://www.redshadowdesigns.com/#organization',
    name: 'Red Shadow Designs',
    url: 'https://www.redshadowdesigns.com',
    logo: 'https://www.redshadowdesigns.com/assets/logo.png',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+92-333-891-7021',
          contactType: 'customer support',
          email: 'hello@redshadowdesigns.com',
          areaServed: 'Worldwide',
          availableLanguage: 'English',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressRegion: 'Islamabad Capital Territory',
        addressCountry: 'PK',
      },
      sameAs: ['https://www.fiverr.com/users/daniyalahmad7'],
    },
    {
      '@type': 'ContactPage',
      url: 'https://www.redshadowdesigns.com/contact',
      name: 'Contact Red Shadow Designs',
      description: 'Contact page for CAD modeling, 3D rendering, industrial design, and engineering services from Islamabad, Pakistan.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-333-891-7021',
        contactType: 'customer support',
        email: 'hello@redshadowdesigns.com',
        areaServed: 'Worldwide',
        availableLanguage: 'English',
      },
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
          name: 'Contact',
          item: 'https://www.redshadowdesigns.com/contact',
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageClient />
    </>
  );
}
