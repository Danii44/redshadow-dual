import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Red Shadow Designs',
  description:
    'Get in touch with Red Shadow Designs — CAD modeling and 3D rendering studio in Islamabad, Pakistan. Email hello@redshadowdesigns.com or call +92 333 891 7021.',
  openGraph: {
    title: 'Contact Red Shadow Designs | Islamabad, Pakistan',
    description:
      'Reach out for CAD modeling, 3D rendering, or product design inquiries. Based in Islamabad, Pakistan. Response within 24 hours.',
    url: 'https://www.redshadowdesigns.com/contact',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
