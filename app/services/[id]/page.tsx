import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

const SERVICE_IDS = [
  'feasibility-test',
  'cad-design',
  'mechanical-engineering',
  'rapid-prototyping',
  '3d-printing',
  'design-for-manufacturing',
  'product-visualization-renders',
  'product-animations',
];

export function generateStaticParams() {
  return SERVICE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Services — Red Shadow Designs`,
    description: `${title} services by Red Shadow Designs — precision engineering and 3D rendering studio in Islamabad, Pakistan.`,
    alternates: { canonical: `https://www.redshadowdesigns.com/services/${id}` },
    openGraph: {
      title: `${title} | Red Shadow Designs`,
      url: `https://www.redshadowdesigns.com/services/${id}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="page-detail-shell min-h-screen pb-24">
      {/* Cinematic Hero */}
      <div className="page-detail-hero relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1614729939124-03290b56c9ce?q=80&w=2574&auto=format&fit=crop" 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten"
        />
        <div className="page-hero-overlay absolute inset-0" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <Link href="/services" className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="inline-flex mb-6 px-4 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff] uppercase tracking-[0.16em] text-[0.66rem] w-fit">
            Service Overview
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-white mb-6 max-w-4xl leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-3xl font-bold text-white md:col-span-1">What We Deliver</h2>
          <div className="md:col-span-2 text-white/70 text-lg leading-relaxed">
            <p className="mb-6">
              Our <strong className="text-[#00d4ff]">{title}</strong> service guarantees rigorous execution and production compliance. Every model and visual asset is tailored specifically to your project dimensions, manufacturing constraints, and visual requirements.
            </p>
            <ul className="space-y-4">
              {[
                "Custom dimensional alignment & tolerance verification",
                "Full source files delivery (STEP, IGES, STL, OBJ, BLEND)",
                "Manufacturing and assembly readiness review",
                "High-resolution 4K photorealistic presentation assets"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white/90 text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
