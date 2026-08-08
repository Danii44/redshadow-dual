import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services | Red Shadow Designs — CAD Modeling, 3D Rendering & Industrial Design',
  description:
    `Explore Red Shadow Designs' full range of engineering services: parametric CAD modeling, photorealistic 3D rendering, medical device modeling, product design, and DFM engineering. Based in Islamabad, Pakistan.`,
  openGraph: {
    title: 'Services | Red Shadow Designs',
    description:
      'From CAD modeling to cinematic 3D renders — Red Shadow Designs delivers precision engineering services for clients worldwide.',
    url: 'https://www.redshadowdesigns.com/services',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/services' },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
