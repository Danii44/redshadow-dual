import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import NavigationResponsive from '@/components/NavigationResponsive';
import Footer from '@/components/Footer';
import SessionLoader from '@/components/SessionLoader';
import Chatbot from '@/components/Chatbot';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.redshadowdesigns.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Red Shadow Designs | CAD Modeling, 3D Rendering & Industrial Design – Islamabad, Pakistan',
    template: '%s | Red Shadow Designs',
  },
  description:
    'Red Shadow Designs is a premium industrial design studio. We specialise in parametric CAD modeling, photorealistic 3D rendering, medical device modeling, product design, and engineering visualizations for clients worldwide.',
  authors: [{ name: 'Red Shadow Designs', url: BASE_URL }],
  creator: 'Red Shadow Designs',
  publisher: 'Red Shadow Designs',

  // Open Graph (used by Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Red Shadow Designs',
    title: 'Red Shadow Designs | CAD Modeling, 3D Rendering & Industrial Design – Islamabad, Pakistan',
    description:
      'Premium industrial design studio. Expert CAD modeling, photorealistic 3D rendering, product design, and engineering visualization services.',
    images: [
      {
        url: '/assets/og-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Red Shadow Designs – CAD & 3D Rendering Studio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Red Shadow Designs | CAD Modeling, 3D Rendering & Industrial Design – Islamabad, Pakistan',
    description: 'Premium industrial design studio. Expert CAD modeling, photorealistic 3D rendering, product design, and engineering visualization services.',
    images: ['/assets/og-hero.webp'],
  },

  // Canonical & alternates
  alternates: {
    canonical: BASE_URL,
  },

  // Robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // App & PWA
  applicationName: 'Red Shadow Designs',
  referrer: 'origin-when-cross-origin',
  category: 'Design & Engineering',

};

// JSON-LD Structured Data for AEO / GEO (Answer Engine & Generative AI)
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#organization`,
      name: 'Red Shadow Designs',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo.webp`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-333-891-7021',
        contactType: 'customer service',
        email: 'hello@redshadowdesigns.com',
        areaServed: 'Worldwide',
        availableLanguage: 'English',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
      sameAs: [
        'https://www.fiverr.com/users/daniyalahmad7',
        'https://www.linkedin.com/company/red-shadow-designs/',
        'https://www.behance.net/redshadowdesigns',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Red Shadow Designs',
      description: 'Premium CAD modeling, 3D rendering and industrial design studio.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/portfolio?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#service`,
      name: 'Red Shadow Designs',
      description: 'We provide parametric CAD modeling, photorealistic 3D rendering, industrial product design, medical device modeling, and engineering visualization for clients worldwide.',
      provider: { '@id': `${BASE_URL}/#organization` },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Parametric CAD Modeling' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photorealistic 3D Rendering' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Industrial Product Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Device CAD Modeling' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Animation & Visualization' } },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What CAD software and tools does Red Shadow Designs use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs uses industry-standard engineering tools including SolidWorks, PTC Creo, Autodesk Inventor, AutoCAD, Blender, Cinema 4D, KeyShot, and Unreal Engine 5 to produce precision-engineered 3D CAD models, manufacturing drawings, and photorealistic renders.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Red Shadow Designs located and do you work with international clients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs is based in Islamabad, Pakistan, and works with hardware startups, engineering firms, and product designers worldwide across the United States, Canada, the United Kingdom, Europe, the Middle East, and Australia.',
          },
        },
        {
          '@type': 'Question',
          name: 'What file formats are delivered for manufacturing and 3D printing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We deliver neutral 3D CAD files (STEP, STP, IGES, Parasolid X_T), native CAD files (SolidWorks SLDPRT/SLDASM, Inventor), 3D printing meshes (STL, OBJ, 3MF), and 2D engineering manufacturing drawings with ASME Y14.5 GD&T (PDF, DWG, DXF).',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Red Shadow Designs produce manufacturing-ready (DFM) CAD files?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All CAD models and assemblies are validated for Design for Manufacturing (DFM), including draft angle analysis, uniform wall thickness checks, rib/boss design for injection molding, CNC machining tool access, and sheet metal bend calculations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you sign Non-Disclosure Agreements (NDAs) to protect intellectual property?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We sign mutual NDAs prior to receiving confidential project files. Full, exclusive intellectual property ownership transfers 100% to the client upon project completion.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a typical CAD modeling or 3D rendering project take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard delivery for parametric CAD models and 3D product renders is 4–8 business days depending on complexity. Expedited rush turnaround (24–48 hours) is also available.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        {/* Resource preconnect hints — tell browser to resolve DNS early */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.web3forms.com" />

        {/* JSON-LD Structured Data for SEO, AEO & GEO */}
        {/* Favicon and touch icons (generated) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.webp" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="PK-IS" />
        <meta name="geo.placename" content="Islamabad" />
        <meta name="geo.position" content="33.6844;73.0479" />
        <meta name="ICBM" content="33.6844, 73.0479" />
        {/* Anti-FOWT: apply stored theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('themeMode');var theme='light';if(t==='light'){theme='light';}else if(t==='dark'){theme='dark';}else if(t==='system'){theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';}else{theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';}if(theme==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider defaultTheme="system" switchable={true}>
          <TooltipProvider>
            <SessionLoader />
            <Toaster />
            <NavigationResponsive />
            <div className="flex-1 w-full min-h-screen flex flex-col relative">
              {children}
            </div>
            <Footer />
            <Chatbot />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
