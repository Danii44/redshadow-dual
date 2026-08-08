import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'Portfolio | Red Shadow Designs — CAD Models & 3D Renders',
  description:
    'Browse 12+ real projects from Red Shadow Designs including drone assemblies, medical implants, product renders, and precision-engineered CAD models. Based in Islamabad, Pakistan.',
  openGraph: {
    title: 'Portfolio | Red Shadow Designs',
    description:
      'Explore our real client projects — CAD models, 3D renders, industrial designs and more from Red Shadow Designs.',
    url: 'https://www.redshadowdesigns.com/portfolio',
  },
  alternates: { canonical: 'https://www.redshadowdesigns.com/portfolio' },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
