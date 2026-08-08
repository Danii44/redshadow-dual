import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const PROJECT_IDS = [
  'orbai-spherical-drone',
  'f1-car-keychain',
  'tkr-implant',
  'ketchup-cap',
  'bull-lock',
  'taupe-urn',
  'compressor-chamber',
  'hero-render',
  'makeup-stick',
  'camera-housing',
  'bamboo-toothbrush',
  'open-assembly',
];

export function generateStaticParams() {
  return PROJECT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Portfolio — Red Shadow Designs`,
    description: `View the ${title} project by Red Shadow Designs — precision CAD modeling and 3D rendering studio in Islamabad, Pakistan.`,
    alternates: { canonical: `https://www.redshadowdesigns.com/portfolio/${id}` },
    openGraph: {
      title: `${title} | Red Shadow Designs`,
      description: `Precision-engineered ${title} — CAD modeling and 3D rendering by Red Shadow Designs.`,
      url: `https://www.redshadowdesigns.com/portfolio/${id}`,
    },
  };
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Format the ID into a readable title
  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="page-detail-shell min-h-screen pb-24">
      {/* Cinematic Hero */}
      <div className="page-detail-hero relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1532981358914-7221b2bbbaaa?q=80&w=2670&auto=format&fit=crop" 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="page-hero-overlay absolute inset-0" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <Link href="/#portfolio" className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <div className="inline-flex mb-6 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.16em] text-[0.66rem] w-fit">
            Case Study
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight text-white mb-8 max-w-4xl leading-tight">
            {title}
          </h1>
          
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-white/40 text-sm font-mono uppercase mb-1">Client</p>
              <p className="text-white font-semibold">Undisclosed Partner</p>
            </div>
            <div>
              <p className="text-white/40 text-sm font-mono uppercase mb-1">Services</p>
              <p className="text-white font-semibold">CAD &amp; 3D Render</p>
            </div>
            <div>
              <p className="text-white/40 text-sm font-mono uppercase mb-1">Industry</p>
              <p className="text-white font-semibold">Industrial Tech</p>
            </div>
            <div>
              <p className="text-white/40 text-sm font-mono uppercase mb-1">Year</p>
              <p className="text-white font-semibold">2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 space-y-24">
        
        {/* The Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-3xl font-bold text-white md:col-span-1">The Challenge</h2>
          <div className="md:col-span-2 text-white/70 text-lg leading-relaxed">
            <p>
              For the <strong className="text-[#00d4ff]">{title}</strong> project, we were tasked with engineering a robust mechanical solution that could withstand rigorous environmental factors while maintaining an incredibly sleek aesthetic. The primary challenge was balancing the tight internal packaging constraints with thermal management.
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-3xl font-bold text-white md:col-span-1">The Solution</h2>
          <div className="md:col-span-2 text-white/70 text-lg leading-relaxed">
            <p>
              We initiated the process with precise parametric CAD modeling in SolidWorks, performing multiple kinematic tests to ensure functional integrity. After finalizing the mechanical design, we moved into Cinema 4D to produce photorealistic marketing visualizations that accurately communicated the product's premium build quality.
            </p>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden detail-gallery-cell">
             <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" alt="Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden detail-gallery-cell">
             <img src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=2669&auto=format&fit=crop" alt="Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

      </div>
    </div>
  );
}
