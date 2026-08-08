import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Red Shadow Designs',
  description:
    'Learn about Red Shadow Designs — a premium CAD modeling and 3D rendering studio founded by Daniyal Ahmad. We combine mechanical engineering precision with cinematic artistry.',
  openGraph: {
    title: 'About Red Shadow Designs | Top-Rated Engineering Studio',
    description:
      'Meet the team behind Red Shadow Designs. Founded by Daniyal Ahmad, a top-rated Fiverr engineer specialising in CAD modeling, 3D rendering, and industrial product design.',
    url: 'https://www.redshadowdesigns.com/about',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/about' },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
