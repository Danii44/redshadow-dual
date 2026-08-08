import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { getServiceBySlug, serviceSlugs, ServiceData } from '../seoServices';

const BASE_URL = 'https://www.redshadowdesigns.com';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service | Red Shadow Designs',
      description: 'Explore premium engineering and design services from Red Shadow Designs in Islamabad, Pakistan.',
      alternates: { canonical: `${BASE_URL}/services/${slug}` },
      openGraph: {
        title: 'Red Shadow Designs | Service',
        description: 'Engineering services, CAD modeling, and 3D rendering from Islamabad, Pakistan.',
        url: `${BASE_URL}/services/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Red Shadow Designs | Service',
        description: 'Engineering services, CAD modeling, and 3D rendering from Islamabad, Pakistan.',
      },
    };
  }

  return {
    title: `${service.title} | Red Shadow Designs`,
    description: `${service.description} Get production-ready CAD, photorealistic renders, and engineering deliverables from Islamabad, Pakistan.`,
    keywords: [...service.keywords, 'Red Shadow Designs', 'Islamabad', 'Pakistan', 'engineering services'],
    alternates: { canonical: `${BASE_URL}/services/${slug}` },
    openGraph: {
      title: `${service.title} | Red Shadow Designs`,
      description: service.description,
      url: `${BASE_URL}/services/${slug}`,
      images: [
        {
          url: `${BASE_URL}${service.heroImage}`,
          width: 1200,
          height: 630,
          alt: `${service.title} | Red Shadow Designs`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Red Shadow Designs`,
      description: service.description,
      images: [`${BASE_URL}${service.heroImage}`],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service: ServiceData | null = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="page-detail-shell min-h-screen pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-24 text-white">
          <h1 className="text-4xl font-bold mb-4">Service not found</h1>
          <p className="text-white/70">The requested service could not be found. Please return to the main services page.</p>
          <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-[#00d4ff] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-detail-shell min-h-screen pb-24">
      <div className="page-detail-hero relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
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
            {service.title}
          </h1>
          <p className="max-w-3xl text-white/70 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-white mb-6">What We Deliver</h2>
            <ul className="space-y-4 text-white/80 text-base">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 space-y-6 text-white/70 text-lg leading-relaxed">
            <p>{service.longDescription}</p>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Core Tools</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {service.tools.map((tool) => (
                  <div key={tool} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Common Questions</h3>
              <div className="space-y-4">
                {service.faq.map((item) => (
                  <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <h4 className="font-semibold text-white mb-2">{item.question}</h4>
                    <p className="text-white/75">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
