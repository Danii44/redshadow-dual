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
    title: 'Feasibility Test',
    description: 'Early-stage concept validation to verify manufacturability, mechanical integrity, and assembly feasibility.',
    keywords: ['feasibility study', 'design validation', 'manufacturability assessment', 'engineering feasibility'],
    tools: ['SolidWorks', 'ANSYS', 'Fusion 360'],
    deliverables: ['Feasibility report', 'Risk analysis', 'Concept validation models'],
    longDescription:
      'Our feasibility test service evaluates concepts before detailed design begins. We analyze manufacturability, mechanical fit, and production risk so you can move forward with confidence.',
    heroImage: '/assets/external/projects/compressor-chamber.png',
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
    title: 'CAD Design',
    description: 'Precision CAD modeling for mechanical, industrial, and product engineering projects, delivered as production-ready geometry.',
    keywords: ['CAD Design Islamabad', 'SolidWorks modeling', 'parametric CAD design', 'engineering CAD services'],
    tools: ['SolidWorks', 'Fusion 360', 'Rhino', 'AutoCAD'],
    deliverables: ['STEP', 'IGES', 'STL', 'DWG', 'PDF drawings'],
    longDescription:
      'We build detailed CAD models that are ready for manufacturing, simulation, and assembly. Every design is created with tolerance control, motion clearance, and technical documentation in mind.',
    heroImage: '/assets/external/projects/open-assembly.png',
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
    title: 'Mechanical Engineering',
    description: 'Engineering-driven design of mechanisms, assemblies, and performance-critical systems for reliable product operation.',
    keywords: ['mechanical engineering', 'DFM engineering', 'mechanism design', 'assembly engineering'],
    tools: ['SolidWorks', 'AutoCAD', 'ANSYS', 'Fusion 360'],
    deliverables: ['Assembly CAD', 'Mechanism diagrams', 'Engineering report'],
    longDescription:
      'We design mechanical systems with a focus on strength, motion, and manufacturability. Our engineering service delivers production-ready assemblies and validated mechanisms.',
    heroImage: '/assets/external/projects/camera-housing.jpg',
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
    title: 'Rapid Prototyping',
    description: 'Fast functional prototypes ready for testing and iteration using additive and subtractive manufacturing geometry.',
    keywords: ['rapid prototyping', 'prototype design', '3D print ready', 'CNC prototype'],
    tools: ['Fusion 360', 'SolidWorks', 'Rhino'],
    deliverables: ['Prototype-ready CAD', 'STL files', '3D printable models'],
    longDescription:
      'We help you move from concept to physical prototype quickly. Our prototype-ready models are optimized for 3D printing, CNC machining, and quick-turn validation.',
    heroImage: '/assets/external/projects/f1-car-keychain.png',
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
    description: 'Print-ready CAD optimization and mesh preparation for SLA, FDM, and SLS prototyping and production.',
    keywords: ['3D printing design', '3D printable model', 'SLA optimization', 'FDM mesh preparation'],
    tools: ['Fusion 360', 'Blender', 'MeshLab'],
    deliverables: ['3D-printable STL', 'Support-ready model', 'Print validation report'],
    longDescription:
      'Our 3D printing service prepares your design for reliable additive manufacturing. We optimize wall thickness, support structure, and fit tolerance for clean prints.',
    heroImage: '/assets/external/projects/bamboo-toothbrush.png',
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
    title: 'Design for Manufacturing',
    description: 'Manufacturing-ready design review and optimization for injection molding, CNC machining, and production assembly.',
    keywords: ['DFM review', 'manufacturing-ready design', 'tooling optimization', 'production design'],
    tools: ['SolidWorks', 'AutoCAD', 'KeyShot'],
    deliverables: ['DFM report', 'Optimized CAD files', 'Manufacturing notes'],
    longDescription:
      'We review designs for production viability and optimize part geometry, draft, tolerances, and assembly to reduce cost and improve manufacturability.',
    heroImage: '/assets/external/projects/bull-lock.png',
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
    title: 'Product Visualization / Renders',
    description: 'Cinematic product visuals and marketing-ready render imagery for packaging, campaigns, and presentations.',
    keywords: ['product visualization', 'marketing renders', 'photorealistic rendering', 'product imagery'],
    tools: ['Blender', 'KeyShot', 'Cinema 4D'],
    deliverables: ['High-res renders', 'PNG / JPEG assets', 'Composite files'],
    longDescription:
      'We create polished product visuals from CAD and concept assets. Our renders are tailored for launch campaigns, investor decks, and digital marketing.',
    heroImage: '/assets/external/projects/hero-render.png',
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
    title: 'Product Animations',
    description: 'Exploded views, turntables, and motion sequences that showcase product function and assembly behavior.',
    keywords: ['product animation', 'turntable video', 'exploded view', 'motion render'],
    tools: ['Blender', 'KeyShot', 'After Effects'],
    deliverables: ['MP4', 'MOV', 'Animated GIFs'],
    longDescription:
      'We bring product designs to life through motion. Our animations explain functionality, assembly, and user experience for pitches and presentations.',
    heroImage: '/assets/external/projects/makeup-stick.png',
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
