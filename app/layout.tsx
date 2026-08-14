import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import NavigationResponsive from '@/components/NavigationResponsive';
import Footer from '@/components/Footer';
import SessionLoader from '@/components/SessionLoader';

const BASE_URL = 'https://www.redshadowdesigns.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Red Shadow Designs | CAD Modeling, 3D Rendering & Industrial Design – Islamabad, Pakistan',
    template: '%s | Red Shadow Designs',
  },
  description:
    'Red Shadow Designs is a premium industrial design studio. We specialise in parametric CAD modeling, photorealistic 3D rendering, medical device modeling, product design, and engineering visualizations for clients worldwide.',
  keywords: [
    'CAD modeling Pakistan',
    '3D rendering services',
    'industrial design Islamabad',
    'product design Pakistan',
    'photorealistic rendering',
    'SolidWorks modeling',
    'Blender 3D rendering',
    'mechanical engineering design',
    'medical device CAD',
    'Red Shadow Designs',
    '3D product visualization',
    'engineering design studio',
    'parametric modeling',
    'manufacturing-ready designs',
    'DFM engineering',
  ],
  authors: [{ name: 'Red Shadow Designs', url: BASE_URL }],
  creator: 'Red Shadow Designs',
  publisher: 'Red Shadow Designs',

  // Open Graph (used by Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Red Shadow Designs',
    title: 'Red Shadow Designs | CAD Modeling & 3D Rendering Studio',
    description:
      'Premium industrial design studio. Expert CAD modeling, photorealistic 3D rendering, product design, and engineering visualization services.',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Red Shadow Designs – CAD & 3D Rendering Studio',
      },
    ],
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
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Red Shadow Designs',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo.png`,
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
          name: 'What CAD software does Red Shadow Designs use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs uses industry-leading tools including SolidWorks, AutoCAD, Blender, Cinema 4D, and Unreal Engine to produce precision-engineered models and photorealistic renders.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Red Shadow Designs located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Red Shadow Designs is based in Islamabad, Pakistan, and works with clients globally across North America, Europe, the Middle East, and Asia.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a 3D rendering project take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Typical delivery for a 3D rendering project is 4–8 business days depending on complexity. Rush delivery options are available.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Red Shadow Designs produce manufacturing-ready CAD files?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All CAD assemblies are DFM-validated and delivered as production-ready STEP and STL files compatible with CNC machining and 3D printing.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource preconnect hints — tell browser to resolve DNS early */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.web3forms.com" />

        {/* JSON-LD Structured Data for SEO, AEO & GEO */}
        {/* Favicon and touch icons (generated) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
      <body>
        <ThemeProvider defaultTheme="system" switchable={true}>
          <TooltipProvider>
            <SessionLoader />
            <Toaster />
            <NavigationResponsive />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
