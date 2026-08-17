export type ServiceData = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  tools: string[];
  deliverables: string[];
  longDescription: string;
  heroImage: string;
  faq: { question: string; answer: string }[];
};

export const servicesData: ServiceData[] = [
  {
    slug: 'feasibility-test',
    title: 'Feasibility',
    description: 'Early-stage concept validation for manufacturability, mechanical integrity, and assembly logic.',
    keywords: ['feasibility study', 'design validation', 'manufacturability assessment', 'engineering feasibility'],
    tools: ['SolidWorks', 'PTC Creo'],
    deliverables: ['Feasibility report', 'Risk analysis', 'Concept validation models'],
    longDescription:
      'We evaluate concepts before the costly detailed design phase begins. We analyze mechanical fit, material constraints, and production risks to ensure your idea is physically viable, functionally sound, and economically scalable.',
    heroImage: '/assets/external/projects/compressor-chamber.webp',
    faq: [
      {
        question: 'What is included in a feasibility test?',
        answer: 'We review the concept, identify manufacturing risks, validate key dimensions, and provide a technical report with recommended next steps.',
      },
      {
        question: 'When should I request a feasibility test?',
        answer: 'Request it before detailed CAD work when you need clarity on whether a product idea is viable and manufacturable.',
      },
      {
        question: 'Do you assess production methods?',
        answer: 'Yes. We compare injection molding, CNC machining, and additive manufacturing risks for the proposed design.',
      },
      {
        question: 'Will I receive actionable feedback?',
        answer: 'Yes. You receive clear, prioritized changes to reduce cost, improve assembly, and lower production risk.',
      },
    ],
  },
  {
    slug: 'cad-design',
    title: 'CAD',
    description: 'Precision parametric modeling for mechanical, industrial, and product engineering, delivered as production-ready geometry.',
    keywords: ['CAD Design Islamabad', 'SolidWorks modeling', 'parametric CAD design', 'engineering CAD services'],
    tools: ['SolidWorks', 'PTC Creo'],
    deliverables: ['STEP', 'IGES', 'STL', 'DWG', 'PDF drawings'],
    longDescription:
      'We build detailed, native parametric models utilizing professional software including SolidWorks and PTC Creo. Every design is created with strict tolerance control, motion clearance analysis, and robust feature trees ready for simulation and manufacturing handoffs.',
    heroImage: '/assets/external/projects/open-assembly.webp',
    faq: [
      {
        question: 'What CAD formats do you deliver?',
        answer: 'We deliver STEP, IGES, STL, DWG, and PDF drawings for manufacturing, simulation, and review.',
      },
      {
        question: 'Can you model assemblies with moving parts?',
        answer: 'Yes. We model full assemblies and validate mechanisms, interference, and kinematic motion.',
      },
      {
        question: 'Do you provide manufacturing-ready geometry?',
        answer: 'Yes. Every CAD model is built for production with clean part structures and proper mating conditions.',
      },
      {
        question: 'How detailed are the CAD deliverables?',
        answer: 'Our deliverables include fully constrained part and assembly files, plus annotated drawings when required.',
      },
    ],
  },
  {
    slug: 'mechanical-engineering',
    title: 'Engineering',
    description: 'Engineering-driven design of robust mechanisms, complex assemblies, and performance-critical hardware.',
    keywords: ['mechanical engineering', 'DFM engineering', 'mechanism design', 'assembly engineering'],
    tools: ['SolidWorks', 'PTC Creo'],
    deliverables: ['Assembly CAD', 'Mechanism diagrams', 'Engineering report'],
    longDescription:
      'We engineer dynamic mechanical systems with a focus on load distribution, kinematics, and manufacturability. Our deliverables include production-ready assemblies and comprehensive technical documentation compliant with strict ASME standards.',
    heroImage: '/assets/external/projects/camera-housing.webp',
    faq: [
      {
        question: 'What engineering work do you offer?',
        answer: 'We offer mechanism design, assembly engineering, tolerance analysis, and production-ready technical documentation.',
      },
      {
        question: 'Can you help with moving assemblies?',
        answer: 'Yes. We model motion, kinematics, and load-bearing components to ensure reliable operation.',
      },
      {
        question: 'Do you validate for manufacturing?',
        answer: 'Absolutely. Our engineering reviews include manufacturability checks and assembly guidance.',
      },
      {
        question: 'What format are the engineering deliverables?',
        answer: 'We deliver CAD assemblies, part-level files, and engineering notes that support production release.',
      },
    ],
  },
  {
    slug: 'rapid-prototyping',
    title: 'Prototyping',
    description: 'Fast, functional prototype engineering for physical testing, validation, and iterative development.',
    keywords: ['rapid prototyping', 'prototype design', '3D print ready', 'CNC prototype'],
    tools: ['SolidWorks', 'Blender'],
    deliverables: ['Prototype-ready CAD', 'STL files', '3D-printable models'],
    longDescription:
      'We bridge the gap between digital and physical. Our prototype-ready models are specifically optimized for CNC machining, sheet metal fabrication, and quick-turn hardware validation to accelerate your time-to-market and secure early stakeholder buy-in.',
    heroImage: '/assets/external/projects/f1-car-keychain.webp',
    faq: [
      {
        question: 'What is included in rapid prototyping?',
        answer: 'We prepare models for fast physical builds, checking geometry, fit, and material constraints for prototype manufacturing.',
      },
      {
        question: 'Which prototype methods do you support?',
        answer: 'We support SLA, FDM, SLS, and CNC-ready prototypes with printer-friendly geometry.',
      },
      {
        question: 'Can you refine prototypes after testing?',
        answer: 'Yes. We iterate quickly based on feedback to improve fit, strength, and function.',
      },
      {
        question: 'Do you include assembly-ready prototypes?',
        answer: 'Yes. We prepare prototypes with clearances and assembly fit for functional testing.',
      },
    ],
  },
  {
    slug: '3d-printing',
    title: '3D Printing',
    description: 'Print-ready CAD optimization, mesh preparation, and slicing strategies for SLA, FDM, and SLS additive manufacturing.',
    keywords: ['3D printing design', '3D printable model', 'SLA optimization', 'FDM mesh preparation'],
    tools: ['SolidWorks', 'Blender'],
    deliverables: ['3D-printable STL', 'Support-ready model', 'Print validation report'],
    longDescription:
      'We prepare your geometry for flawless additive manufacturing. We analyze and optimize wall thicknesses, design custom support structures, and adjust fit tolerances to ensure dimensional accuracy and structural integrity on every print.',
    heroImage: '/assets/external/projects/bamboo-toothbrush.webp',
    faq: [
      {
        question: 'Do you prepare models for SLA and FDM printers?',
        answer: 'Yes. We optimize geometry for resin and filament printing with correct wall thickness and support placement.',
      },
      {
        question: 'What makes a model 3D-print ready?',
        answer: 'A print-ready model has clean topology, proper supports, and manufacturable wall thickness for the chosen process.',
      },
      {
        question: 'Do you provide support placement guidance?',
        answer: 'Yes. We deliver models ready for slicing with recommended support structures and print orientation.',
      },
      {
        question: 'Can you validate part tolerances for assemblable prints?',
        answer: 'Absolutely. We verify clearances and tolerances so printed parts fit reliably.',
      },
    ],
  },
  {
    slug: 'design-for-manufacturing',
    title: 'DFM',
    description: 'Rigorous design review and geometry optimization to reduce tooling costs and streamline high-volume production.',
    keywords: ['DFM review', 'manufacturing-ready design', 'tooling optimization', 'production design'],
    tools: ['SolidWorks', 'PTC Creo'],
    deliverables: ['DFM report', 'Optimized CAD files', 'Manufacturing notes'],
    longDescription:
      'We conduct exhaustive engineering reviews to ensure your design is viable for the factory floor. We optimize draft angles for injection molding, apply GD&T, and refine assemblies to minimize manufacturing costs without compromising the end-user experience.',
    heroImage: '/assets/external/projects/bull-lock.webp',
    faq: [
      {
        question: 'What is design for manufacturing?',
        answer: 'It is the process of adjusting product design so it can be made reliably and cost-effectively at scale.',
      },
      {
        question: 'Do you review injection molded parts?',
        answer: 'Yes. We review draft, wall thickness, parting lines, and toolability for molded components.',
      },
      {
        question: 'Will you recommend the best manufacturing method?',
        answer: 'Yes. We suggest the most efficient process based on volume, material, and product requirements.',
      },
      {
        question: 'Do you provide tooling-ready documentation?',
        answer: 'Yes. We deliver optimized CAD and notes for molding, machining, and assembly handoff.',
      },
    ],
  },
  {
    slug: 'product-visualization-renders',
    title: 'Rendering',
    description: 'Cinematic product visuals and marketing-ready imagery for packaging, investor pitch decks, and digital campaigns.',
    keywords: ['product visualization', 'marketing renders', 'photorealistic rendering', 'product imagery'],
    tools: ['Blender', 'KeyShot', 'Adobe Photoshop'],
    deliverables: ['High-res renders', 'PNG / JPEG assets', 'Composite files'],
    longDescription:
      'We create photorealistic, cinematic product visuals using advanced rendering engines like KeyShot and Blender. Our expert lighting and material texturing workflows deliver premium assets designed to drive e-commerce sales and secure funding.',
    heroImage: '/assets/external/projects/hero-render.webp',
    faq: [
      {
        question: 'What is included in product visualization?',
        answer: 'We deliver photorealistic images with realistic materials, lighting, and composition optimized for your brand and use case.',
      },
      {
        question: 'Can you render packaging and hero shots?',
        answer: 'Yes. We create studio-quality hero shots and packaging visuals for product launches.',
      },
      {
        question: 'Do you work from CAD or concept sketches?',
        answer: 'Yes. We can work from sketches, CAD models, or existing 3D data.',
      },
      {
        question: 'What output formats do you deliver?',
        answer: 'We deliver high-resolution PNG, JPEG, TIFF, and layered source files as needed.',
      },
    ],
  },
  {
    slug: 'product-animations',
    title: 'Animation',
    description: 'Exploded views, mechanical turntables, and high-fidelity motion sequences that showcase product functionality.',
    keywords: ['product animation', 'turntable video', 'exploded view', 'motion render'],
    tools: ['Blender', 'Adobe After Effects'],
    deliverables: ['MP4', 'MOV', 'Animated GIFs'],
    longDescription:
      'We bring static assemblies to life through precise mechanical animation. Our motion sequences effectively communicate complex internal mechanisms, step-by-step assembly procedures, and the overall user experience for B2B presentations and launch events.',
    heroImage: '/assets/external/projects/makeup-stick.webp',
    faq: [
      {
        question: 'What types of animations do you create?',
        answer: 'We create turntables, exploded views, assembly sequences, and functional motion videos.',
      },
      {
        question: 'What file formats are delivered?',
        answer: 'We deliver MP4, MOV, and optimized animated GIFs for web or presentations.',
      },
      {
        question: 'Can animations show mechanism behavior?',
        answer: 'Yes. We animate moving parts and mechanisms to clearly communicate product function.',
      },
      {
        question: 'Do you add labels and motion graphics?',
        answer: 'Yes. We can include callouts and simple motion graphics to highlight key features.',
      },
    ],
  },
];

const serviceAliases: Record<string, string> = {
  engineering: 'mechanical-engineering',
  '3d-rendering': 'product-visualization-renders',
};

export const serviceSlugs = [
  ...new Set([...servicesData.map((service) => service.slug), ...Object.keys(serviceAliases)]),
];

export function getServiceBySlug(slug: string) {
  const normalizedSlug = serviceAliases[slug] ?? slug;
  return servicesData.find((service) => service.slug === normalizedSlug) ?? null;
}
